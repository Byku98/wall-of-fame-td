import { Request, Response } from 'express';

export const renderPrivacyPolicyPage = async (req: Request, res: Response) => {
  try {
    res.render('privacy-policy', { 
      title: 'Polityka Prywatności'
    });
  } catch (error) {
    console.error("Error rendering Privacy Policy page:", error);
    res.status(500).render('error', { message: 'Wystąpił błąd podczas ładowania strony polityki prywatności.' });
  }
};
