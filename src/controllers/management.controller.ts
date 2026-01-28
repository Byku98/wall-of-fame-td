import { Request, Response } from "express";
import { managementService } from "../services/management.service";

/**
 * Handles the approval of a lap time.
 * GET /api/laps/approve/:id?token=...
 */
export async function approveLap(req: Request, res: Response) {
  const { id } = req.params;
  const { token } = req.query;

  console.log(`[Management] Attempting to APPROVE lap ID: ${id} with token: ${token}`);

  if (!token) {
    return res.status(400).send("Błąd: Brak tokenu autoryzacyjnego.");
  }

  try {
    await managementService.approveLap(id, token as string);
    res.status(200).send("<h1>Sukces</h1><p>Okrążenie zatwierdzone, e-mail wysłany do zawodnika.</p>");
  } catch (error) {
    res.status(403).send("Błąd: Nieprawidłowy token lub ID.");
  }
}

/**
 * Handles the rejection/deletion of a lap time.
 * GET /api/laps/reject/:id?token=...
 */
export async function rejectLap(req: Request, res: Response) {
  const { id } = req.params;
  const { token, reason } = req.query; // Reason can be passed in query for simple links

  console.log(`[Management] Attempting to REJECT lap ID: ${id} with token: ${token}`);

  if (!token) {
    return res.status(400).send("Błąd: Brak tokenu autoryzacyjnego.");
  }

  if (!reason) {
    // If no reason, show a simple HTML form to provide one
    return res.send(`
      <form action="/api/laps/reject/${id}" method="GET">
        <input type="hidden" name="token" value="${token}">
        <h3>Podaj powód odrzucenia:</h3>
        <select name="reason" required>
          <option value="Błędny czas">Błędny czas</option>
          <option value="Nieczytelne zdjęcie">Nieczytelne zdjęcie</option>
          <option value="Brak dowodu">Brak dowodu</option>
          <option value="Inny">Inny</option>
        </select>
        <button type="submit">Odrzuć i wyślij e-mail</button>
      </form>
    `);
  }

  try {
    await managementService.rejectLap(id, token as string, reason as string);
    res.status(200).send(`<h1>Odrzucono</h1><p>Powód: ${reason}. Zawodnik został poinformowany.</p>`);
  } catch (error) {
    res.status(403).send("Błąd: Nieprawidłowy token lub ID.");
  }
}

/**
 * Renders the page to modify a lap time.
 * GET /api/laps/modify/:id?token=...
 */

////TODO !!!!!!!!!!!!
export async function getModifyLapPage(req: Request, res: Response) {
  const { id } = req.params;
  const { token } = req.query;

  console.log(`[Management] Loading MODIFY page for lap ID: ${id}`);

  if (!token) {
    return res.status(400).render("error", { message: "Brak tokenu autoryzacyjnego." });
  }

  try {
    // TODO: Fetch lap data from DB to populate the form
    // const lapData = await managementService.getLapForEdit(id, token);

    res.render("modify-lap", { 
      title: "Modyfikacja Okrążenia",
      id,
      token,
      // lapData 
    });
  } catch (error) {
    console.error("Error in getModifyLapPage:", error);
    res.status(500).render("error", { message: "Nie udało się załadować strony edycji." });
  }
}

/**
 * Handles the submission of modified lap time data.
 * POST /api/laps/modify/:id
 */
////TODO !!!!!!!!!!!!
export async function postModifyLap(req: Request, res: Response) {
  const { id } = req.params;
  const { token } = req.body; // Token usually sent in body for POST
  const updatedData = req.body;

  console.log(`[Management] Processing MODIFICATION for lap ID: ${id}`);

  try {
    // TODO: Verify token and update DB with updatedData
    // await managementService.updateLap(id, token, updatedData);

    res.status(200).json({ success: true, message: "Zmiany zostały zapisane." });
  } catch (error) {
    console.error("Error in postModifyLap:", error);
    res.status(500).json({ success: false, message: "Błąd podczas zapisywania zmian." });
  }
}