import { Request, Response } from "express";
import { leaderboardService } from "../services/leaderboard.service";

export async function renderLeaderboardPage(req: Request, res: Response) {
  try {
    const trackList = await leaderboardService.getAllTracks();
    let leaderboard: any[] = [];

    const dynamicContent = {
      title: "Wall of Fame - Leaderbaord",
      logo: "/images/wof-internal/wof-logo-big.png",
      trackList,
      leaderboard,
    };

    res.render("leaderboard", dynamicContent);
  } catch (err) {
    console.log("Error fetching track list: ", err);
    res.status(500).send("Internal Server Error");
  }
}

export const getFilteredLeaderboardData = async (req: Request, res: Response) => {
    const { trackName } = req.query; // Change from trackId
    if (!trackName || typeof trackName !== 'string') {
      return res.status(400).json({ error: 'Invalid trackName' });
    }
    try {
      const laps = await leaderboardService.getLeaderboardByTrack(trackName); // Update service to accept string
      res.json(laps);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
};