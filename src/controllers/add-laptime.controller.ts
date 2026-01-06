import { Request, Response } from "express";
import { addLaptimeService } from "../services/add-laptime.service";
// import * as addLaptimeService from '../services/add-laptime.service'; // Uncomment when service is implemented

export async function getAddLaptime(req: Request, res: Response) {
  try {
    const trackList = await addLaptimeService.getAllTracks(); // Only fetch tracks for initial render

    const dynamicContent = {
      title: "Dodaj Czas Okrążenia",
      trackList,
      // motorcycleList, tyresFrontList, tyresRearList are NO LONGER PASSED HERE
    };

    res.render("add-laptime", dynamicContent);
  } catch (error) {
    console.error("Error rendering add-laptime page:", error);
    res
      .status(500)
      .render("error", { message: "Failed to load add-laptime page" });
  }
}

// NEW: Controller function to get motorcycles as JSON
export async function getMotorcyclesJson(req: Request, res: Response) {
  try {
    const motorcycleList = await addLaptimeService.getAllMotorcycles();
    res.json(motorcycleList);
  } catch (error) {
    console.error("Error fetching motorcycles JSON:", error);
    res.status(500).json({ message: "Failed to fetch motorcycles" });
  }
}

// NEW: Controller function to get front tyres as JSON
export async function getTyresFrontJson(req: Request, res: Response) {
  try {
    const tyreFrontList = await addLaptimeService.getAllTyresFront();
    res.json(tyreFrontList);
  } catch (error) {
    console.error("Error fetching front tyres JSON:", error);
    res.status(500).json({ message: "Failed to fetch front tyres" });
  }
}

// NEW: Controller function to get rear tyres as JSON
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
