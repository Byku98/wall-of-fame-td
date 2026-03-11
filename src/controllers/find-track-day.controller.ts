import { Request, Response } from 'express';
import * as fs from 'fs/promises'; // NEW: Import fs.promises for async file reading
import * as path from 'path';     // NEW: Import path for path resolution

// Existing controller functions (if any)
// export const getLeaderboard = async (req: Request, res: Response) => { /* ... */ };
// export const getAddLaptime = async (req: Request, res: Response) => { /* ... */ };
// export const getLapDetails = async (req: Request, res: Response) => { /* ... */ };

export const renderFindTrackDayPage = async (req: Request, res: Response) => {
  try {
    const eventsFilePath = path.join(__dirname, '../scripts/events_calendar/events/events.json'); // Correct path to your JSON file
    let events: any[] = [];

    try {
      const fileContent = await fs.readFile(eventsFilePath, 'utf-8');
      events = JSON.parse(fileContent);
    } catch (fileError: any) {
      if (fileError.code === 'ENOENT') {
        console.warn(`events.json not found at ${eventsFilePath}. Returning empty events list.`);
      } else {
        console.error("Error reading or parsing events.json:", fileError);
      }
      events = []; // Ensure events is an empty array on error
    }

    res.render('find-track-day', { 
      title: 'Znajdź Track Day',
      events: events // Pass the events data to the EJS template
    });
  } catch (error) {
    console.error("Error rendering Find Track Day page:", error);
    res.status(500).render('error', { message: 'Wystąpił błąd podczas ładowania kalendarza wydarzeń.' });
  }
};