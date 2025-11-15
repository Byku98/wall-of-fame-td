import { Request, Response } from "express";
import { lapDetailsService } from "../services/lap-datails.service";
import { translateObject } from "../utils/translations";
import  { formatLapTime } from "../utils/formatters"; // Use require for JS file

// Module-level variables accessible to all functions in this file
const title = "Szczegóły okrążenia";
const chooseTrack = "Wybierz inny tor";
const resultsHistory = "Historia wyninków";

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
    let lapDetails = await lapDetailsService.getLapDetails(
      lapTime,
      riderName,
      motorcycle,
      lap_date
    );

    // const lapDetails = lapDetailsArray[0];

    console.log("Lap details retrieved:", lapDetails);

    lapDetails = translateObject(lapDetails, ["sex"], "pl");

    console.log("Lap details after transalation:", lapDetails);

    // if (!lapDetails) {
    //   throw new Error("Lap details not found");
    // }

    // lapDetails.sex = translate('sex', lapDetails.sex, 'pl');

    lapDetails.lap_time = formatLapTime(lapDetails.lap_time);

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
