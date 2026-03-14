import nodemailer from 'nodemailer';

/**
 * MailClient handles sending emails using Gmail OAuth2.
 */
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USER,
    clientId: process.env.MAIL_CLIENT_ID,
    clientSecret: process.env.MAIL_CLIENT_SECRET,
    refreshToken: process.env.MAIL_REFRESH_TOKEN
  }
});

export const mailClient = {
  /**
   * Sends an approval email to the rider for their lap time.
   */
  sendApprovalEmail: async (to: string) => {
    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: to,
      subject: "Twój czas okrążenia został zatwierdzony! ✅",
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h2>Cześć!</h2>
          <p>Mamy świetną wiadomość! Twoje okrążenie został zweryfikowane i zatwierdzone.</p>
          <p>Możesz go teraz zobaczyć na oficjalnej tablicy wyników.</p>
          <br>
          <p>Pozdrawiamy,<br>Zespół Pszczółki Wall of Fame</p>
        </div>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`[Mail] Lap approval sent to ${to}`);
    } catch (error) {
      console.error("[Mail] Error sending lap approval email:", error);
    }
  },

  /**
   * Sends a rejection email to the rider for their lap time with the reason.
   */
  sendRejectionEmail: async (to: string, reason: string) => {
    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: to,
      subject: "Informacja o Twoim zgłoszeniu czasu okrążenia ❌",
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h2>Cześć!</h2>
          <p>Niestety Twoje zgłoszenie czasu okrążenia nie mogło zostać zatwierdzone.</p>
          <div style="background: #fff3f3; padding: 15px; border-left: 4px solid #dc3545; margin: 20px 0;">
            <strong>Powód odrzucenia:</strong><br>
            ${reason}
          </div>
          <p>Prosimy o poprawienie danych i ponowne wysłanie formularza.</p>
          <br>
          <p>Pozdrawiamy,<br>Zespół Pszczółki Wall of Fame</p>
        </div>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`[Mail] Lap rejection sent to ${to}`);
    } catch (error) {
      console.error("[Mail] Error sending lap rejection email:", error);
    }
  },

  /**
   * Sends an approval email to the rider for their profile.
   */
  sendRiderApprovalEmail: async (to: string) => {
    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: to,
      subject: "Twój profil zawodnika został zatwierdzony! ✅",
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h2>Cześć!</h2>
          <p>Mamy świetną wiadomość! Twój profil zawodnika został zweryfikowany i zatwierdzony.</p>
          <p>Możesz teraz zgłaszać swoje czasy okrążeń.</p>
          <br>
          <p>Pozdrawiamy,<br>Zespół Pszczółki Wall of Fame</p>
        </div>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`[Mail] Rider approval sent to ${to}`);
    } catch (error) {
      console.error("[Mail] Error sending rider approval email:", error);
    }
  },

  /**
   * Sends a rejection email to the rider for their profile with the reason.
   */
  sendRiderRejectionEmail: async (to: string, reason: string) => {
    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: to,
      subject: "Informacja o Twoim profilu zawodnika ❌",
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h2>Cześć!</h2>
          <p>Niestety Twój profil zawodnika nie mógł zostać zatwierdzony.</p>
          <div style="background: #fff3f3; padding: 15px; border-left: 4px solid #dc3545; margin: 20px 0;">
            <strong>Powód odrzucenia:</strong><br>
            ${reason}
          </div>
          <p>Prosimy o poprawienie danych i ponowne zgłoszenie.</p>
          <br>
          <p>Pozdrawiamy,<br>Zespół Pszczółki Wall of Fame</p>
        </div>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`[Mail] Rider rejection sent to ${to}`);
    } catch (error) {
      console.error("[Mail] Error sending rider rejection email:", error);
    }
  }
};