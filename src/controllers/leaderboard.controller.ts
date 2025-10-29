import { Request, Response } from "express";
import { leaderboardService } from "../services/leaderboard.service";

export async function renderLeaderboardPage(req: Request, res: Response) {
  try {
    const trackList = await leaderboardService.getAllTracks();
    let leaderboard: any[] = [];
    let trackId_selected: number | null = null;

    // Determine the trackId to use for initial load
    let trackIdToLoad: number | undefined;

    // 1. Check if a trackId is provided in the query string
    if (req.query.trackId) {
      const parsedTrackId = parseInt(req.query.trackId as string, 10);
      if (!isNaN(parsedTrackId)) {
        trackIdToLoad = parsedTrackId;
      }
    }
    
    // 2. If no trackId from query, use the first track from the trackList as default
    // if (!trackIdToLoad && trackList.length > 0) {
      // trackIdToLoad = (trackList[0] as any).track_id; // Assuming track_id is on the first item
    // }

    // console.log(trackList);

    const dynamicContent = {
      title: "Wall of Fame - Leaderbaord",
      logo: "/images/wof-internal/wof-logo-big.png",
      trackList,
      leaderboard,
      selectedTrackId: trackId_selected
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
}

export const getLapDetails = async (req: Request, res: Response) => {
  // Destructure parameters to match leaderboard.service.ts::getLapDetails signature
  const { lapTime, riderName, motorcycle, lap_date } = req.params;
  if (!lapTime || !riderName || !motorcycle || !lap_date) {
    return res.status(400).json({ message: "Invalid parameters" });
  }
  try {
    // Call the service with the extracted parameters (convert lap_date to Date as per service signature)
    const lapDetails = await leaderboardService.getLapDetails(lapTime, riderName, motorcycle, new Date(lap_date));
    res.render('lap-details', { title: 'Szczegóły Okrążenia', lapDetails });
  } catch (error) {
    res.status(404).render('error', { title: 'Błąd', message: 'Okrążenie nie znalezione' });
  }
};