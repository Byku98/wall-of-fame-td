import { Request, Response, NextFunction } from 'express';

export const cookieConsentMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const consent = req.cookies.cookieConsent;

  // Skip middleware for the rejection page to avoid redirect loops
  if (req.path === '/cookies-required') {
    return next();
  }

  if (consent === 'accepted') {
    // User has accepted; proceed and hide the banner
    res.locals.showCookieBanner = false;
    return next();
  } else if (consent === 'rejected') {
    // User has rejected; redirect to rejection page
    return res.redirect('/cookies-required');
  } else {
    // Not set or invalid; show the banner
    res.locals.showCookieBanner = true;
    return next();
  }
};