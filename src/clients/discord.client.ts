import { ROUTES } from '../config/routes.config';
import { formatLapTime } from '../utils/formatters';

/**
 * DiscordClient handles all communication with Discord Webhooks.
 */
export const discordClient = {
  /**
   * Sends a rich embed notification about a new lap submission.
   */
  sendLapNotification: async (
    lapData: any, 
    submissionToken: string, 
    insertedId: number,
    newMotorcycleId: number | null = null,
    newTyreFrontId: number | null = null,
    newTyreRearId: number | null = null
  ) => {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

    if (!webhookUrl) {
      console.warn("DISCORD_WEBHOOK_URL is missing in .env. Skipping notification.");
      return;
    }

    // Helper to handle empty values
    const val = (value: any) => (value && value.toString().trim() !== "") ? value : "---";

    // Construct URLs using the centralized ROUTES config
    const approveLapUrl = `${baseUrl}${ROUTES.API.LAPS.APPROVE}/${insertedId}?token=${submissionToken}`;
    const rejectLapUrl = `${baseUrl}${ROUTES.API.LAPS.REJECT}/${insertedId}?token=${submissionToken}`;

    // Build fields array
    const fields = [
      { name: "👤 Zawodnik", value: val(lapData.riderName), inline: true },
      { name: "🏁 Tor", value: val(lapData.trackName), inline: true },
      { name: "⏱️ Czas", value: formatLapTime(lapData.lapTime), inline: true },
      { name: "📅 Data", value: val(lapData.lapDate), inline: true },
      { name: "🏍️ Motocykl", value: val(lapData.motorcycle), inline: true },
      { name: "🤝 Organizator", value: val(lapData.organizer), inline: true },
      { name: "📱 Urządzenie pomiarowe", value: val(lapData.device), inline: true },
      { name: "📧 Kontakt", value: val(lapData.contactEmail), inline: true },
      { name: "📊 Telemetria", value: val(lapData.deviceRecordedLap), inline: false },
      { name: "🔘 Opona Przód", value: val(lapData.tyreFront), inline: true },
      { name: "🔘 Opona Tył", value: val(lapData.tyreRear), inline: true },
      { name: "📺 Link YouTube", value: val(lapData.youtubeProof), inline: false },
      { name: "🖼️ Zdjęcie przejazdu", value: `${baseUrl}${lapData.proof_image_path}`, inline: false }
    ];

    // Add lap approval at the end
    fields.push(
      { name: "✅ Akceptuj", value: `[Kliknij aby zaakceptować okrążenie](${approveLapUrl})`, inline: true },
      { name: "❌ Odrzuć", value: `[Kliknij aby odrzucić okrążenie](${rejectLapUrl})`, inline: true }
    );

    // Add new motorcycle approval field if new motorcycle was submitted (MOVED TO BOTTOM)
    if (newMotorcycleId) {
      const motorcycleApproveUrl = `${baseUrl}${ROUTES.API.MANAGEMENT.MOTORCYCLE}/${newMotorcycleId}?token=${submissionToken}&action=approve`;
      const motorcycleDeleteUrl = `${baseUrl}${ROUTES.API.MANAGEMENT.MOTORCYCLE}/${newMotorcycleId}?token=${submissionToken}&action=delete`;
      
      // NEW: Add name, year, type as query parameters for modify action
      const modifyQueryParams = new URLSearchParams();
      if (lapData.motorcycleNameManual) modifyQueryParams.append('name', lapData.motorcycleNameManual);
      if (lapData.motorcycleYearManual) modifyQueryParams.append('year', lapData.motorcycleYearManual);
      if (lapData.motorcycleTypeManual) modifyQueryParams.append('type', lapData.motorcycleTypeManual);

      const motorcycleModifyUrl = `${baseUrl}${ROUTES.API.MANAGEMENT.MOTORCYCLE}/${newMotorcycleId}?token=${submissionToken}&action=modify&${modifyQueryParams.toString()}`;
      
      const motorcycleDetails = `${val(lapData.motorcycleNameManual)} (${val(lapData.motorcycleYearManual)}) - ${val(lapData.motorcycleTypeManual)}`;

      // Add separators for better visibility
      fields.push(
        { name: "---", value: "---", inline: false }, // Separator line
        {
          name: `🏍️ NOWY MOTOCYKL DO ZATWIERDZENIA: ${motorcycleDetails}`, // More prominent title
          value: `[✅ Zatwierdź](${motorcycleApproveUrl})\n[❌ Usuń](${motorcycleDeleteUrl})\n[✏️ Modyfikuj](${motorcycleModifyUrl})`, // Changed to use \n for new lines
          inline: false
        }
      );
    }

    // Add combined tyre approval field if new tyres were submitted
    if (newTyreFrontId || newTyreRearId) {
      const tfIdParam = newTyreFrontId ? `${newTyreFrontId}` : 'null';
      const trIdParam = newTyreRearId ? `${newTyreRearId}` : 'null';
      
      const tyreApproveUrl = `${baseUrl}${ROUTES.API.MANAGEMENT.TYRE}/${tfIdParam}/${trIdParam}?token=${submissionToken}&action=approve`;
      const tyreRejectUrl = `${baseUrl}${ROUTES.API.MANAGEMENT.TYRE}/${tfIdParam}/${trIdParam}?token=${submissionToken}&action=delete`; // Changed action to 'delete' as per SP
      
      // NEW: Add name query parameters for modify action
      const modifyTyreQueryParams = new URLSearchParams();
      if (lapData.tyreFrontNameManual) modifyTyreQueryParams.append('nameTf', lapData.tyreFrontNameManual);
      if (lapData.tyreRearNameManual) modifyTyreQueryParams.append('nameTr', lapData.tyreRearNameManual);

      const tyreModifyUrl = `${baseUrl}${ROUTES.API.MANAGEMENT.TYRE}/${tfIdParam}/${trIdParam}?token=${submissionToken}&action=modify&${modifyTyreQueryParams.toString()}`;

      const tyreDetails = `${val(lapData.tyreFrontNameManual)} / ${val(lapData.tyreRearNameManual)}`;

      fields.push(
        { name: "---", value: "---", inline: false }, // Separator
        {
          name: `🔘 NOWE OPONY DO ZATWIERDZENIA: ${tyreDetails}`,
          value: `[✅ Zatwierdź](${tyreApproveUrl})\n[❌ Usuń](${tyreRejectUrl})\n[✏️ Modyfikuj](${tyreModifyUrl})`, // Split into lines
          inline: false
        }
      );
    }

    const payload = {
      username: "Leaderboard Notifier",
      embeds: [{
        title: "🏎️ Nowy czas okrążenia do weryfikacji!",
        color: 0x00ff00,
        fields: fields,
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