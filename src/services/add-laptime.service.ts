import path from 'path';
import sharp from 'sharp';
import { addLaptimeRepository } from "../repositories/add-laptime.repository";
import { evidencesPlaceholder } from '../config/add-laptime.enums';

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

    // Format lapTime - prepend 00: only if minutes are present (contains a colon)
    let formattedLapTime = formData.lapTime;
    if (formattedLapTime.includes(':')) {
      // Check if it already has hours (two colons)
      const colonCount = (formattedLapTime.match(/:/g) || []).length;
      if (colonCount === 1) {
        formattedLapTime = `00:${formattedLapTime}`;
      }
    }

    // 2. Prepare data for Database
    const laptimeData = { 
      ...formData, 
      lapTime: formattedLapTime,
      proof_image_path
    };

    // 1. Call Repository
    const dbResult = await addLaptimeRepository.createLaptime(laptimeData);

    // CRITICAL: If DB failed, return the error object immediately
    if (!dbResult.success) {
      return dbResult; 
    }

    // 2. Only if DB was successful, process the image
    try {

      const outputPath = path.join(__dirname, '../..', evidencesPlaceholder, filename);
      
      // console.log("Saving image to:", outputPath); // Debug log to verify path

      await sharp(fileBuffer)
        .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
        .toFile(outputPath);
      
      return dbResult; 
    } catch (imageError: any) {
      console.error("Sharp Error:", imageError.message);
      return { success: false, message: `Błąd podczas zapisywania zdjęcia: ${imageError.message}` };
    }
  }
};
