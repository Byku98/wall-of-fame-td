import { Request, Response } from "express";
import { lapDetailsService } from "../services/lap-datails.service";
import { translateObject } from "../utils/translations";
import { formatLapTime, convertMysqlToDate } from "../utils/formatters";
import { LapDetails } from "../types/lap-details"; // Import shared interface

// Module-level variables accessible to all functions in this file
const title = "Szczegóły okrążenia";
const chooseTrack = "Wybierz inny tor";
const resultsHistory = "Historia wyników";

export const getLapDetails = async (req: Request, res: Response) => {
  // Destructure parameters to match leaderboard.service.ts::getLapDetails signature
  const { lapTime, riderName, motorcycle, lap_date } = req.params as {
    lapTime: string;
    riderName: string;
    motorcycle: string;
    lap_date: string;
  };

  console.log("Fetching lap details for:", {
    lapTime,
    riderName,
    motorcycle,
    lap_date,
  });

  try {
    // Call the service with the extracted parameters (convert lap_date to Date as per service signature)
    let lapDetails: LapDetails | null = await lapDetailsService.getLapDetails(
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

    if (!lapDetails) {
      throw new Error("Lap details not found after translation");
    }

    // Format lap_time server-side for consistent display
    lapDetails.lap_time = formatLapTime(lapDetails.lap_time);
    lapDetails.lap_date = convertMysqlToDate(lapDetails.lap_date);
    lapDetails = translateObject(lapDetails, ["sex"], "pl");

    res.render("lap-details", {
      lapDetails,
      title,
      chooseTrack,
      resultsHistory,
    });
  } catch (error) {
    res
      .status(404)
      .render("error", { title: "Błąd", message: "Okrążenie nie znalezione" });
  }
};
