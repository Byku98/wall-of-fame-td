export const mailClient = {
  sendApprovalEmail: async (to: string, riderName: string, lapTime: string) => {
    console.log(`[Mail] Sending APPROVAL email to ${to} for ${riderName} (${lapTime})`);
    // TODO: Implement nodemailer logic here
  },

  sendRejectionEmail: async (to: string, riderName: string, reason: string) => {
    console.log(`[Mail] Sending REJECTION email to ${to}. Reason: ${reason}`);
    // TODO: Implement nodemailer logic here
  }
};