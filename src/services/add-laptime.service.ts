import { addLaptimeRepository } from "../repositories/add-laptime.repository";

export const addLaptimeService = {

  getAllTracks: async () => {
    return addLaptimeRepository.getAllTracks();
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
    return addLaptimeRepository.getRidersFromTrack(trackName);
  },
};
