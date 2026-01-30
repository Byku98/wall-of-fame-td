import { Request, Response } from "express";
import { managementService } from "../services/management.service";

export async function approveLap(req: Request, res: Response) {
  const { id } = req.params;
  const { token } = req.query;

  if (!token) {
    return res.status(400).render("laps-management/management-error", { error: "Brak tokenu autoryzacyjnego." });
  }

  try {
    const result = await managementService.approveLap(id, token as string);
    res.render("laps-management/management-success", {
      title: "Okrążenie Zatwierdzone",
      header: "✅ Okrążenie Zatwierdzone",
      message: "Pomyślnie zatwierdzono wynik. Zawodnik został poinformowany drogą mailową.",
      lap_id: result.lap_id,
      contact: result.contact
    });
  } catch (error: any) {
    res.status(403).render("laps-management/management-error", { error: error.message });
  }
}

export async function rejectLap(req: Request, res: Response) {
  const { id } = req.params;
  const { token, reason } = req.query;

  if (!token) {
    return res.status(400).render("laps-management/management-error", { error: "Brak tokenu autoryzacyjnego." });
  }

  if (!reason) {
    const reasons = [
      { group: "Czas i Data", items: ["Błędny czas okrążenia", "Niepoprawna data przejazdu"] },
      { group: "Pojazd i Opony", items: ["Błędna marka/model motocykla", "Błędna specyfikacja opon"] },
      { group: "Dowody i Linki", items: ["Nieczytelne zdjęcie laptimera", "Błędny link do telemetrii", "Błędny link do nagrania YouTube", "Brak wymaganego zdjęcia dowodu"] },
      { group: "Inne", items: ["Błędny tor lub organizator", "Błędne dane zawodnika"] }
    ];
    return res.render("laps-management/management-reject", { id, token, reasons });
  }

  try {
    const reasonText = Array.isArray(reason) ? reason.join(", ") : reason as string;
    const result = await managementService.rejectLap(id, token as string, reasonText);
    
    res.render("laps-management/management-success", {
      title: "Okrążenie Odrzucone",
      header: "❌ Okrążenie Odrzucone",
      message: `Okrążenie zostało odrzucone z powodów: ${reasonText}.`,
      lap_id: result.lap_id,
      contact: result.contact
    });
  } catch (error: any) {
    res.status(403).render("laps-management/management-error", { error: error.message });
  }
}
