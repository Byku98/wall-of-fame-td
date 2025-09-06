import { Request, Response } from "express";

export function renderLeaderboardPage(req: Request, res: Response) {
  const dynamicContent = {
    title: "Pszczółki - Wall of Fame",
    logo: "/assets/images/wof-internal/wof-logo-big.png",
  };

  res.render("leaderboard", dynamicContent);
}