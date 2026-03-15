import { Request, Response } from 'express';

export const renderCookiesRequiredPage = async (req: Request, res: Response) => {
  try {
    res.render('cookie-required', { 
      title: 'Cookies Required'  // Assumes cookie-required.ejs is in src/views/; adjust if in partials/
    });
  } catch (error) {
    console.error("Error rendering Cookies Required page:", error);
    res.status(500).render('error', { message: 'Wystąpił błąd podczas ładowania strony wymaganej zgody na cookies.' });
  }
};