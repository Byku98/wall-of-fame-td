import { Request, Response } from "express";

export function renderLandingPage(req: Request, res: Response) {
  const dynamicContent = {
    title: "Dynamic Landing Page",
    subtitle: "Powered by TypeScript + Express + EJS 🚀",
    features: ["Fast", "Scalable", "SEO-friendly"],
    user: { name: "Tomasz" }
  };

  res.render("landing", dynamicContent);
}