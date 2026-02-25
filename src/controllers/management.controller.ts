import { Request, Response } from "express";
import { managementService } from "../services/management.service";
import { MOTORCYCLE_TYPES } from "../config/add-laptime.enums"; // Import MOTORCYCLE_TYPES

export { 
  approveLap, 
  getRejectLapPage, 
  postRejectLap,
  manageMotorcycle,
  postModifyMotorcycle,
  getManageTyrePage, // Export the new function
  postManageTyre // Export the new function
};

async function approveLap(req: Request, res: Response) {
  const { id } = req.params;
  const { token } = req.query;

  if (!token) {
    return res
      .status(400)
      .render("laps-management/management-error", {
        error: "Brak tokenu autoryzacyjnego.",
      });
  }

  try {
    const result = await managementService.approveLap(id, token as string);
    res.render("laps-management/management-success", {
      title: "Okrążenie Zatwierdzone",
      header: "✅ Okrążenie Zatwierdzone",
      message:
        "Pomyślnie zatwierdzono wynik. Zawodnik został poinformowany drogą mailową.",
      lap_id: result.lap_id,
      contact: result.contact,
    });
  } catch (error: any) {
    res
      .status(403)
      .render("laps-management/management-error", { error: error.message });
  }
}

/**
 * Renders the rejection form page.
 * GET /api/laps/reject/:id?token=...
 */
async function getRejectLapPage(req: Request, res: Response) {
  const { id } = req.params;
  const { token } = req.query;

  if (!token) {
    return res
      .status(400)
      .render("laps-management/management-error", {
        error: "Brak tokenu autoryzacyjnego.",
      });
  }

  const reasons = [
    {
      group: "Czas i Data",
      items: ["Błędny czas okrążenia", "Niepoprawna data przejazdu"],
    },
    {
      group: "Pojazd i Opony",
      items: ["Błędna marka/model motocykla", "Błędna specyfikacja opon"],
    },
    {
      group: "Dowody i Linki",
      items: [
        "Nieczytelne zdjęcie laptimera",
        "Błędny link do telemetrii",
        "Błędny link do nagrania YouTube",
        "Brak wymaganego zdjęcia dowodu",
      ],
    },
    {
      group: "Inne",
      items: ["Błędny tor lub organizator", "Błędne dane zawodnika", "JESTEŚ ZA GRUBY!!!!"],
    },
  ];

  res.render("laps-management/management-reject", { id, token, reasons });
}

/**
 * Processes the rejection form submission.
 * POST /api/laps/reject/:id
 */
async function postRejectLap(req: Request, res: Response) {
  const { id } = req.params;
  const { token, reason } = req.body; // Captured from the form body

  if (!token) {
    return res
      .status(400)
      .render("laps-management/management-error", {
        error: "Brak tokenu autoryzacyjnego.",
      });
  }

  try {
    const reasonText = Array.isArray(reason)
      ? reason.join(", ")
      : (reason as string);

    if (!reasonText) {
      throw new Error("Musisz wybrać przynajmniej jeden powód odrzucenia.");
    }

    const result = await managementService.rejectLap(
      id,
      token as string,
      reasonText
    );

    res.render("laps-management/management-success", {
      title: "Okrążenie Odrzucone",
      header: "❌ Okrążenie Odrzucone",
      message: `Okrążenie zostało odrzucone z powodów: ${reasonText}.`,
      lap_id: result.lap_id,
      contact: result.contact,
    });
  } catch (error: any) {
    res
      .status(403)
      .render("laps-management/management-error", { error: error.message });
  }
}

/**
 * Manages pending motorcycle approvals/deletions/modifications.
 * GET /api/management/motorcycle/:id?token=...&action=approve|delete|modify&name=...&year=...&type=...
 */
async function manageMotorcycle(req: Request, res: Response) {
  const { id } = req.params;
  const { token, action, name, year, type } = req.query; // Extract name, year, type

  if (!token) {
    return res
      .status(400)
      .render("laps-management/management-error", {
        error: "Brak tokenu autoryzacyjnego.",
      });
  }

  if (!action || (action !== "approve" && action !== "delete" && action !== "modify")) {
    return res
      .status(400)
      .render("laps-management/management-error", {
        error: "Nieprawidłowa akcja. Dozwolone akcje to 'approve', 'delete' lub 'modify'.",
      });
  }

  if (action === "modify") {
    // Render the modification form with pre-filled values
    return res.render("laps-management/management-modify-motorcycle", {
      id,
      token,
      motorcycleName: name || '',
      motorcycleYear: year || '',
      motorcycleType: type || '',
      motorcycleTypes: MOTORCYCLE_TYPES // Pass the enum for the dropdown
    });
  }

  try {
    const result = await managementService.managePendingMotorcycle(
      id,
      token as string,
      action as "approve" | "delete"
    );

    res.render("laps-management/management-success", {
      title: `Motocykl ${action === "approve" ? "Zatwierdzony" : "Usunięty"}`,
      header: `🏍️ Motocykl ${action === "approve" ? "Zatwierdzony" : "Usunięty"}`,
      message: `Pomyślnie ${action === "approve" ? "zatwierdzono" : "usunięto"} motocykl.`
    });
  } catch (error: any) {
    res
      .status(403)
      .render("laps-management/management-error", { error: error.message });
  }
}

/**
 * Processes the modification form submission for a pending motorcycle.
 * POST /api/management/motorcycle/:id
 */
async function postModifyMotorcycle(req: Request, res: Response) {
  const { id } = req.params;
  const { token, motorcycleName, motorcycleYear, motorcycleType } = req.body;

  if (!token) {
    return res
      .status(400)
      .render("laps-management/management-error", {
        error: "Brak tokenu autoryzacyjnego.",
      });
  }

  if (!motorcycleName || !motorcycleYear || !motorcycleType) {
    return res
      .status(400)
      .render("laps-management/management-error", {
        error: "Wszystkie pola motocykla (nazwa, rok, typ) są wymagane.",
      });
  }

  try {
    const result = await managementService.managePendingMotorcycle(
      id,
      token as string,
      "approve", // CORRECTED: Action is 'modify'
      motorcycleName as string,
      parseInt(motorcycleYear as string, 10),
      motorcycleType as string
    );

    res.render("laps-management/management-success", {
      title: "Motocykl Zmodyfikowany",
      header: "🏍️ Motocykl Zmodyfikowany",
      message: `Pomyślnie zmodyfikowano motocykl o ID: ${id}.`,
    });
  } catch (error: any) {
    res
      .status(403)
      .render("laps-management/management-error", { error: error.message });
  }
}

/**
 * Renders the management page for pending tyres (approve/delete/modify).
 * GET /api/management/tyre/:tfId?/:trId??token=...&action=...&nameTf=...&nameTr=...
 */
async function getManageTyrePage(req: Request, res: Response) {
  // Convert "null" string from URL params to actual null
  const tfId = req.params.tfId === 'null' ? null : req.params.tfId;
  const trId = req.params.trId === 'null' ? null : req.params.trId;
  const { token, action, nameTf, nameTr } = req.query;

  if (!token) {
    return res
      .status(400)
      .render("laps-management/management-error", {
        error: "Brak tokenu autoryzacyjnego.",
      });
  }

  if (!tfId && !trId) {
    return res
      .status(400)
      .render("laps-management/management-error", {
        error: "Brak ID opony przedniej lub tylnej do zarządzania.",
      });
  }

  if (!action || (action !== "approve" && action !== "delete" && action !== "modify")) {
    return res
      .status(400)
      .render("laps-management/management-error", {
        error: "Nieprawidłowa akcja. Dozwolone akcje to 'approve', 'delete' lub 'modify'.",
      });
  }

  try {
    if (action === "modify") {
      // Render modification form
      return res.render("laps-management/management-modify-tyre", {
        tfId: tfId, // Pass the converted null/string
        trId: trId, // Pass the converted null/string
        token,
        tyreFrontName: nameTf || "",
        tyreRearName: nameTr || "",
      });
    } else { // action is 'approve' or 'delete'
      // Perform action directly
      const result = await managementService.managePendingTyres(
        tfId, // Pass the converted null/string
        trId, // Pass the converted null/string
        token as string,
        action as "approve" | "delete" // Pass 'approve' or 'delete'
      );
      const tyreType = (tfId && trId) ? "Opony" : (tfId ? "Opona Przednia" : "Opona Tylna");
      const actionText = action === "approve" ? "Zatwierdzone" : "Usunięte";

      res.render("laps-management/management-success", {
        title: `${tyreType} ${actionText}`,
        header: `🔘 ${tyreType} ${actionText}`,
        message: `Pomyślnie ${action === "approve" ? "zatwierdzono" : "usunięto"} ${tyreType.toLowerCase()}.`,
        lap_id: result.id, 
        contact: result.contact,
      });
    }
  } catch (error: any) {
    res
      .status(403)
      .render("laps-management/management-error", { error: error.message });
  }
}

/**
 * Handles POST requests for managing pending tyres (e.g., modify form submission).
 * POST /api/management/tyre/:tfId?/:trId?
 */
async function postManageTyre(req: Request, res: Response) {
  // Convert "null" string from URL params to actual null
  const tfId = req.params.tfId === 'null' ? null : req.params.tfId;
  const trId = req.params.trId === 'null' ? null : req.params.trId;
  const { token, action, tyreFrontName, tyreRearName } = req.body;

  if (!token) {
    return res
      .status(400)
      .render("laps-management/management-error", {
        error: "Brak tokenu autoryzacyjnego.",
      });
  }

  if (!action || action !== "approve") { // CORRECTED: Action is 'approve' for this form submission
    return res
      .status(400)
      .render("laps-management/management-error", {
        error: "Nieprawidłowa akcja POST dla opon. Oczekiwano 'approve'."
      });
  }

  // Validation for modify action
  if ((tfId && !tyreFrontName) || (trId && !tyreRearName)) {
    return res
      .status(400)
      .render("laps-management/management-error", {
        error: "Brak nazwy dla opony przedniej lub tylnej do modyfikacji.",
      });
  }

  try {
    const result = await managementService.managePendingTyres(
      tfId, // Pass the converted null/string
      trId, // Pass the converted null/string
      token as string,
      "approve", // CORRECTED: Action is 'approve'
      tyreFrontName as string,
      tyreRearName as string
    );
    const tyreType = (tfId && trId) ? "obie opony" : (tfId ? "oponę przednią" : "oponę tylną");

    res.render("laps-management/management-success", {
      title: `${tyreType} Zmodyfikowane`,
      header: `🔘 ${tyreType} Zmodyfikowane`,
      message: `Pomyślnie zmodyfikowano ${tyreType.toLowerCase()}.`,
      lap_id: result.id, 
      contact: result.contact,
    });
  } catch (error: any) {
    res
      .status(403)
      .render("laps-management/management-error", { error: error.message });
  }
}
