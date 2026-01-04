import { Request, Response } from "express";
import { leaderboardService } from "../services/leaderboard.service";
// import * as addLaptimeService from '../services/add-laptime.service'; // Uncomment when service is implemented

export async function getAddLaptime(req: Request, res: Response) {
  try {
    
    const trackList = await leaderboardService.getAllTracks();

    const dynamicContent = {
      title: "Dodaj Czas Okrążenia",
      trackList
    };

    res.render("add-laptime", dynamicContent);
  } catch (error) {
    console.error("Error rendering add-laptime page:", error);
    res
      .status(500)
      .render("error", { message: "Failed to load add-laptime page" });
  }
}

// You might add other functions here for handling form submissions (POST requests)
// export const postAddLaptime = async (req: Request, res: Response) => {
//   try {
//     // Handle form submission logic here
//     // await addLaptimeService.saveLaptime(req.body);
//     res.redirect('/leaderboard'); // Redirect after successful submission
//   } catch (error) {
//     console.error('Error adding laptime:', error);
//     res.status(500).render('error', { message: 'Failed to add laptime' });
//   }
// };
