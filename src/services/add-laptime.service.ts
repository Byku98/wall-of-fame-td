import path from 'path';
import sharp from 'sharp';
import crypto from 'crypto';
import { addLaptimeRepository } from "../repositories/add-laptime.repository";
import { evidencesPlaceholder } from '../config/add-laptime.enums';
import { discordClient } from '../clients/discord.client'; // NEW

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

  saveLaptime: async (formData: any, fileBuffer: Buffer, originalName: string) => {
    // 1. Generate Unique Filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(originalName).toLowerCase();
    const filename = `evidence-${uniqueSuffix}${ext}`;
    const proof_image_path = `/evidences/${filename}`; 
    const status = null;

    // Generate a secure random token for this lap
    const submissionToken = crypto.randomBytes(32).toString('hex');

    // Format lapTime
    let formattedLapTime = formData.lapTime;
    if (formattedLapTime.includes(':')) {
      const colonCount = (formattedLapTime.match(/:/g) || []).length;
      if (colonCount === 1) {
        formattedLapTime = `00:${formattedLapTime}`;
      }
    }

    let contactEmail = formData.contactEmail || null;

    // 2. Prepare data for Database
    const laptimeData = { 
      ...formData, 
      lapTime: formattedLapTime,
      proof_image_path,
      status
    };

    // 3. Call Repository to save the Lap
    const dbResult = await addLaptimeRepository.createLaptime(laptimeData);

    if (!dbResult.success) {
      return dbResult; 
    }

    // 4. Save the token and Notify Discord
    if (dbResult.insertedId) {
      try {
        await addLaptimeRepository.saveLapToken(dbResult.insertedId, contactEmail, submissionToken);
        
        // NEW: Send Discord Notification (Background task)
        discordClient.sendLapNotification(laptimeData, submissionToken, dbResult.insertedId);
        
      } catch (tokenError) {
        console.error("Error in background tasks (token/discord):", tokenError);
      }
    }

    // 5. Process the image
    try {
      const outputPath = path.join(__dirname, '../..', evidencesPlaceholder, filename);
      await sharp(fileBuffer)
        .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
        .toFile(outputPath);
      
      return { ...dbResult, submissionToken }; 
    } catch (imageError: any) {
      console.error("Sharp Error:", imageError.message);
      return { success: false, message: `Błąd podczas zapisywania zdjęcia: ${imageError.message}` };
    }
  }
};
