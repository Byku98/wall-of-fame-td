import path from 'path';
import sharp from 'sharp';
import crypto from 'crypto';
import { addLaptimeRepository } from "../repositories/add-laptime.repository";
import { evidencesPlaceholder } from '../config/add-laptime.enums';
import { discordClient } from '../clients/discord.client';

export const addLaptimeService = {
  getAllTracks: async () => {
    return addLaptimeRepository.getAllTracks();
  },

  getAllDevices: async () => {
    return addLaptimeRepository.getAllDevices();
  },

  getAllMotorcycles: async () => {
    return addLaptimeRepository.getAllMotorcycles();
  },

  getAllTyresFront: async () => {
    return addLaptimeRepository.getAllTyresFront();
  },

  getAllTyresRear: async () => {
    return addLaptimeRepository.getAllTyresRear();
  },

  getRidersFromTrack: async (trackName: string) => {
    return addLaptimeRepository.getAllRiders(trackName);
  },

  getOrganizersFromTrack: async (trackName: string) => {
    return addLaptimeRepository.getOrganizersFromTrack(trackName);
  },

  /**
   * Handles the insertion of a new motorcycle into the pending list with token.
   */
  saveNewMotorcycle: async (name: string, year: string, type: string, submissionToken: string) => {
    try {
      const yearInt = parseInt(year, 10);
      return await addLaptimeRepository.insertPendingMotorcycle(name, yearInt, type, submissionToken);
    } catch (error) {
      console.error("Error in saveNewMotorcycle service:", error);
      throw error;
    }
  },

  /**
   * Handles the insertion of new tyres into the pending list with token.
   */
  saveNewTyres: async (frontName: string | null, rearName: string | null, submissionToken: string) => {
    try {
      return await addLaptimeRepository.insertPendingTyres(frontName, rearName, submissionToken);
    } catch (error) {
      console.error("Error in saveNewTyres service:", error);
      throw error;
    }
  },

  saveLaptime: async (formData: any, fileBuffer: Buffer, originalName: string) => {
    // 1. GENERATE TOKEN FIRST - will be used for lap, motorcycle, and tyres
    const submissionToken = crypto.randomBytes(32).toString('hex');

    // 2. Handle Pending Motorcycle if manual fields are provided
    let motorcycleValue = formData.motorcycle;
    let newMotorcycleId: number | null = null;
    
    if (formData.motorcycleNameManual) {
      try {
        newMotorcycleId = await addLaptimeService.saveNewMotorcycle(
          formData.motorcycleNameManual,
          formData.motorcycleYearManual,
          formData.motorcycleTypeManual,
          submissionToken
        );
        motorcycleValue = formData.motorcycleNameManual;
      } catch (err: any) {
        console.error("Failed to save pending motorcycle:", err.message);
        return { 
          success: false, 
          message: `Błąd podczas dodawania nowego motocykla: ${err.message}` 
        };
      }
    }

    // 3. Handle Pending Tyres if manual fields are provided
    let tyreFrontValue = formData.tyreFront;
    let tyreRearValue = formData.tyreRear;
    let newTyreFrontId: number | null = null;
    let newTyreRearId: number | null = null;

    // Only insert tyres if at least one is provided manually
    if (formData.tyreFrontNameManual || formData.tyreRearNameManual) {
      console.log("Manual tyre data detected, attempting to save pending tyres with token:");

      try {
        const tyreResult = await addLaptimeService.saveNewTyres(
          formData.tyreFrontNameManual || null,
          formData.tyreRearNameManual || null,
          submissionToken
        );
        newTyreFrontId = tyreResult.tfId;
        newTyreRearId = tyreResult.trId;
        
        if (formData.tyreFrontNameManual) tyreFrontValue = formData.tyreFrontNameManual;
        if (formData.tyreRearNameManual) tyreRearValue = formData.tyreRearNameManual;
      } catch (err: any) {
        console.error("Failed to save pending tyres:", err.message);
        return { 
          success: false, 
          message: `Błąd podczas dodawania nowych opon: ${err.message}` 
        };
      }
    }

    // 4. Generate Unique Filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(originalName).toLowerCase();
    const filename = `evidence-${uniqueSuffix}${ext}`;
    const proof_image_path = `/evidences/${filename}`;

    // 5. Format lapTime
    let formattedLapTime = formData.lapTime;
    if (formattedLapTime.includes(':')) {
      const colonCount = (formattedLapTime.match(/:/g) || []).length;
      if (colonCount === 1) {
        formattedLapTime = `00:${formattedLapTime}`;
      }
    }

    // 6. Prepare data for Database (NO IDs in laptimeData)
    const laptimeData = { 
      ...formData, 
      motorcycle: motorcycleValue,
      tyreFront: tyreFrontValue,
      tyreRear: tyreRearValue,
      lapTime: formattedLapTime,
      proof_image_path,
      status: 'pending'
    };

    // 7. Call Repository to save the Lap
    const dbResult = await addLaptimeRepository.createLaptime(laptimeData);

    if (!dbResult.success) return dbResult;

    // 8. PROCESS IMAGE FIRST
    try {
      const outputPath = path.join(__dirname, '../..', evidencesPlaceholder, filename);
      await sharp(fileBuffer)
        .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
        .toFile(outputPath);
    } catch (imageError: any) {
      console.error("Sharp Error:", imageError.message);
      return { success: false, message: `Błąd podczas zapisywania zdjęcia: ${imageError.message}` };
    }

    // 9. THEN SAVE TOKEN & NOTIFY DISCORD
    if (dbResult.insertedId) {
      try {
        await addLaptimeRepository.saveLapToken(dbResult.insertedId, formData.contactEmail, submissionToken);
        discordClient.sendLapNotification(
          laptimeData,
          submissionToken,
          dbResult.insertedId,
          newMotorcycleId,
          newTyreFrontId,
          newTyreRearId
        );
      } catch (bgError) {
        console.error("Error in background tasks:", bgError);
      }
    }

    return { ...dbResult, submissionToken }; 
  }
};
