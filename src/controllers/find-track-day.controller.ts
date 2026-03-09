import { Request, Response } from 'express';

export const renderFindTrackDayPage = async (req: Request, res: Response) => {
  try {
    const events: any[] = []; // placeholder, replace with DB query
    res.render('find-track-day', {
      title: 'Znajdź Track Day',
      events,
    });
  } catch (err) {
    console.error('error rendering track‑day page', err);
    res.status(500).render('error', {
      message: 'Wystąpił błąd podczas ładowania kalendarza wydarzeń.',
    });
  }
};