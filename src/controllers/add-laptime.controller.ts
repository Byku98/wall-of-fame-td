import { Request, Response } from "express";
import { addLaptimeService } from "../services/add-laptime.service";
// import * as addLaptimeService from '../services/add-laptime.service'; // Uncomment when service is implemented

export async function getAddLaptime(req: Request, res: Response) {
  try {
    const trackList = await addLaptimeService.getAllTracks(); // Only fetch tracks for initial render
    const devicesList = await addLaptimeService.getAllDevices(); // Only fetch devices which measures time

    const dynamicContent = {
      title: "Dodaj Czas Okrążenia",
      trackList,
      devicesList
    };

    res.render("add-laptime", dynamicContent);
  } catch (error) {
    console.error("Error rendering add-laptime page:", error);
    res
      .status(500)
      .render("error", { message: "Failed to load add-laptime page" });
  }
}

// Controller function to get motorcycles as JSON
export async function getMotorcyclesJson(req: Request, res: Response) {
  try {
    const motorcycleList = await addLaptimeService.getAllMotorcycles();
    res.json(motorcycleList);
  } catch (error) {
    console.error("Error fetching motorcycles JSON:", error);
    res.status(500).json({ message: "Failed to fetch motorcycles" });
  }
}

// Controller function to get front tyres as JSON
export async function getTyresFrontJson(req: Request, res: Response) {
  try {
    const tyreFrontList = await addLaptimeService.getAllTyresFront();
    res.json(tyreFrontList);
  } catch (error) {
    console.error("Error fetching front tyres JSON:", error);
    res.status(500).json({ message: "Failed to fetch front tyres" });
  }
}

// Controller function to get rear tyres as JSON
export async function getTyresRearJson(req: Request, res: Response) {
  try {
    const tyreRearList = await addLaptimeService.getAllTyresRear();
    res.json(tyreRearList);
  } catch (error) {
    console.error("Error fetching rear tyres JSON:", error);
    res.status(500).json({ message: "Failed to fetch rear tyres" });
  }
}

export async function getRidersFromTrackJson(req: Request, res: Response) {
  const { trackName } = req.params as {
    trackName: string;
  };

  try {
    const ridersList = await addLaptimeService.getRidersFromTrack(trackName);
    console.log("Fetched riders for track", trackName, ":", ridersList);
    res.json(ridersList);
  } catch (error) {
    console.error("Error fetching riders from track JSON:", error);
    res.status(500).json({ message: "Failed to fetch riders from track" });
  }
}

// Controller function to get organizers by track as JSON
export async function getOrganizersByTrackJson(req: Request, res: Response) {
  try {
    const { trackName } = req.params;
    const organizersList = await addLaptimeService.getOrganizersFromTrack(trackName);
    res.json(organizersList);
  } catch (error) {
    console.error("Error fetching organizers by track JSON:", error);
    res.status(500).json({ message: "Failed to fetch organizers for track" });
  }
}
