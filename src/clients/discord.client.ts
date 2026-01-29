import { ROUTES } from '../config/routes.config'; // NEW

/**
 * DiscordClient handles all communication with Discord Webhooks.
 */
export const discordClient = {
  /**
   * Sends a rich embed notification about a new lap submission.
   */
  sendLapNotification: async (lapData: any, submissionToken: string, insertedId: number) => {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

    if (!webhookUrl) {
      console.warn("DISCORD_WEBHOOK_URL is missing in .env. Skipping notification.");
      return;
    }

    // Helper to handle empty values
    const val = (value: any) => (value && value.toString().trim() !== "") ? value : "---";

    // Construct URLs using the centralized ROUTES config
    const modifyUrl = `${baseUrl}${ROUTES.API.LAPS.MODIFY}/${insertedId}?token=${submissionToken}`;
    const approveUrl = `${baseUrl}${ROUTES.API.LAPS.APPROVE}/${insertedId}?token=${submissionToken}`;

    const payload = {
      username: "Leaderboard Notifier",
      embeds: [{
        title: "🏎️ Nowy czas okrążenia do weryfikacji!",
        color: 0x00ff00, // Green
        fields: [
          { name: "👤 Zawodnik", value: val(lapData.riderName), inline: true },
          { name: "🏁 Tor", value: val(lapData.trackName), inline: true },
          { name: "⏱️ Czas", value: val(lapData.lapTime), inline: true },
          { name: "📅 Data", value: val(lapData.lapDate), inline: true },
          { name: "🏍️ Motocykl", value: val(lapData.motorcycle), inline: true },
          { name: "🤝 Organizator", value: val(lapData.organizer), inline: true },
          { name: "📱 Urządzenie", value: val(lapData.device), inline: true },
          { name: "📧 Kontakt", value: val(lapData.contactEmail), inline: true },
          { name: "📊 Telemetria", value: val(lapData.deviceRecordedLap), inline: false },
          { name: "🔘 Opona Przód", value: val(lapData.tyreFront), inline: true },
          { name: "🔘 Opona Tył", value: val(lapData.tyreRear), inline: true },
          { name: "📺 Link YouTube", value: val(lapData.youtubeProof), inline: false },
          { name: "🖼️ Zdjęcie przejazdu", value: `${baseUrl}${lapData.proof_image_path}`, inline: false },
          { name: "🔍 Modyfikacja przejazdu", value: `[Kliknij aby zmodyfikować](${modifyUrl})`, inline: true },
          { name: "✅ Akceptuj", value: `[Kliknij aby zaakceptować](${approveUrl})`, inline: true }
        ],
        footer: { text: `ID Systemowe: ${insertedId}` },
        timestamp: new Date().toISOString()
      }]
    };

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (error) {
      console.error("Failed to send Discord notification:", error);
    }
  }
};