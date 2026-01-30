import { Request, Response } from "express";
import { managementService } from "../services/management.service";

/**
 * Handles the approval of a lap time.
 * GET /api/laps/approve/:id?token=...
 */
export async function approveLap(req: Request, res: Response) {
  const { id } = req.params;
  const { token } = req.query;

  if (!token) {
    return res.status(400).send("<h1>❌ Błąd</h1><p>Brak tokenu autoryzacyjnego.</p>");
  }

  try {
    const result = await managementService.approveLap(id, token as string);
    
    res.status(200).send(`
      <div style="font-family: sans-serif; padding: 20px; text-align: center;">
        <h1 style="color: #28a745;">✅ Okrążenie Zatwierdzone</h1>
        <p style="font-size: 1.2rem;">Pomyślnie zatwierdzono wynik dla:</p>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; display: inline-block; text-align: left; min-width: 250px;">
          <p><strong>ID Okrążenia:</strong> ${result.lap_id}</p>
          <p><strong>Kontakt:</strong> ${result.contact}</p>
        </div>
        <p style="margin-top: 20px; color: #6c757d;">Zawodnik został poinformowany drogą mailową.</p>
      </div>
    `);
  } catch (error: any) {
    console.error("[Management Controller] Approval Error:", error.message);
    
    res.status(403).send(`
      <div style="font-family: sans-serif; padding: 20px; text-align: center;">
        <h1 style="color: #dc3545;">❌ Błąd Operacji</h1>
        <p style="font-size: 1.1rem;">Nie udało się zatwierdzić okrążenia.</p>
        <div style="background: #fff3f3; color: #721c24; padding: 10px; border: 1px solid #f5c6cb; border-radius: 4px; display: inline-block;">
          <strong>Powód:</strong> ${error.message}
        </div>
      </div>
    `);
  }
}

/**
 * Handles the rejection of a lap time.
 * GET /api/laps/reject/:id?token=...
 */
export async function rejectLap(req: Request, res: Response) {
  const { id } = req.params;
  const { token, reason } = req.query;

  if (!token) {
    return res.status(400).send("<h1>❌ Błąd</h1><p>Brak tokenu autoryzacyjnego.</p>");
  }

  if (!reason) {
    // Show a checklist form for multiple reasons
    const reasons = [
      { group: "Czas i Data", items: ["Błędny czas okrążenia", "Niepoprawna data przejazdu"] },
      { group: "Pojazd i Opony", items: ["Błędna marka/model motocykla", "Błędna specyfikacja opon"] },
      { group: "Dowody i Linki", items: ["Nieczytelne zdjęcie laptimera", "Błędny link do telemetrii", "Błędny link do nagrania YouTube", "Brak wymaganego zdjęcia dowodu"] },
      { group: "Inne", items: ["Błędny tor lub organizator", "Błędne dane zawodnika"] }
    ];

    let checklistHtml = reasons.map(group => `
      <div style="margin-bottom: 15px; text-align: left; display: inline-block; width: 350px;">
        <strong style="color: #666;">${group.group}</strong><br>
        ${group.items.map(item => `
          <label style="display: block; padding: 5px 0; cursor: pointer;">
            <input type="checkbox" name="reason" value="${item}"> ${item}
          </label>
        `).join('')}
      </div>
    `).join('<br>');

    return res.send(`
      <div style="font-family: sans-serif; padding: 20px; text-align: center;">
        <h3>Wybierz powody odrzucenia okrążenia ID: ${id}</h3>
        <form action="/api/laps/reject/${id}" method="GET">
          <input type="hidden" name="token" value="${token}">
          <div style="max-width: 400px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px; background: #f9f9f9;">
            ${checklistHtml}
          </div>
          <br>
          <button type="submit" style="padding: 12px 24px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
            Odrzuć i wyślij e-mail
          </button>
        </form>
      </div>
    `);
  }

  try {
    // Handle multiple reasons (Express parses multiple checkboxes with same name as an array)
    const reasonText = Array.isArray(reason) ? reason.join(", ") : reason as string;

    await managementService.rejectLap(id, token as string, reasonText);
    
    res.status(200).send(`
      <div style="font-family: sans-serif; padding: 20px; text-align: center;">
        <h1 style="color: #dc3545;">❌ Okrążenie Odrzucone</h1>
        <p>Okrążenie o ID ${id} zostało odrzucone z powodów: <br><strong>${reasonText}</strong>.</p>
        <p>Zawodnik został poinformowany o decyzji.</p>
      </div>
    `);
  } catch (error: any) {
    console.error("[Management Controller] Rejection Error:", error.message);
    res.status(403).send(`<h1>❌ Błąd</h1><p>${error.message}</p>`);
  }
}
