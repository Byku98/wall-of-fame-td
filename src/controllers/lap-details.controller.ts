import { Request, Response } from "express";
import { lapDetailsService } from "../services/lap-datails.service";
import { translateObject } from "../utils/translations";
import { formatLapTime, convertMysqlToDate } from "../utils/formatters";
import { LapDetails, riderHistory } from "../types/lap-details"; // Import shared interface

export const getLapDetails = async (req: Request, res: Response) => {
  // Destructure parameters to match leaderboard.service.ts::getLapDetails signature
  const { lapTime, riderName, motorcycle, lap_date, trackName } = req.params as {
    lapTime: string;
    riderName: string;
    motorcycle: string;
    lap_date: string;
    trackName: string;
  };

  console.log("Fetching lap details for:", {
    lapTime,
    riderName,
    motorcycle,
    lap_date,
  });

  let lapDetails: LapDetails | null = null;
  let riderHistory: riderHistory[] | null = null;

  // First try: Fetch and process lapDetails
  try {
    lapDetails = await lapDetailsService.getLapDetails(
      lapTime,
      riderName,
      motorcycle,
      lap_date
    );

    console.log("Lap details retrieved:", lapDetails);

    if (!lapDetails) {
      throw new Error("Lap details not found");
    }

    console.log("Lap details after translation:", lapDetails);

    // Format lap_time server-side for consistent display
    lapDetails.lap_time = formatLapTime(lapDetails.lap_time);
    lapDetails.lap_date = convertMysqlToDate(lapDetails.lap_date);
    lapDetails = translateObject(lapDetails, ["sex"], "pl");
  } catch (error) {
    res
      .status(404)
      .render("error", { title: "Błąd", message: "Okrążenie nie znalezione" });
    return; // Exit early on lapDetails failure
  }

  // Second try: Fetch and process riderHistory (optional, don't throw on failure)
  try {
    riderHistory = await lapDetailsService.getRiderLapHistory(riderName, trackName);

    if (riderHistory) {
      // Format each lap_time and lap_date for display
      riderHistory.forEach(lap => {
        lap.lap_time = formatLapTime(lap.lap_time);
        lap.lap_date = convertMysqlToDate(lap.lap_date);
      });
    }
  } catch (error) {
    console.log("Historia nie znaleziona:");
    riderHistory = null; // Set to null to allow rendering without history
  }

  // Render with both (riderHistory may be null)
  res.render("lap-details", {
    lapDetails,
    riderHistory,
  });
};

export const getRiderLapHistory = async (req: Request, res: Response) => {
  const { riderName, trackName } = req.params as { riderName: string, trackName: string };

  console.log("Fetching lap history for rider:", riderName);

  try {
    const lapHistory: riderHistory[] = await lapDetailsService.getRiderLapHistory(riderName, trackName);

    if (!lapHistory || lapHistory.length === 0) {
      throw new Error("Historia nie znaleziona");
    }

    // Format each lap_time and lap_date for display
    lapHistory.forEach(lap => {
      lap.lap_time = formatLapTime(lap.lap_time);
      lap.lap_date = convertMysqlToDate(lap.lap_date);
    });

    // Return JSON for dynamic loading into a div
    res.json({ lapHistory, riderName });
  } catch (error) {
    res.status(404).json({ error: "Historia nie znaleziona" });
  }
};