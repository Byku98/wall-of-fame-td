import { Request, Response } from "express";
import { leaderboardService } from "../services/leaderboard.service";

export async function renderLeaderboardPage(req: Request, res: Response) {
  try {
    const trackList = await leaderboardService.getAllTracks();

    console.log(trackList);

    const dynamicContent = {
      title: "Pszczółki - Wall of Fame",
      logo: "/assets/images/wof-internal/wof-logo-big.png",
      trackList,
    };

    res.render("leaderboard", dynamicContent);
  } catch (err) {
    console.log("Error fetching track list: ", err);
    res.status(500).send("Internal Server Error");
  }
}
