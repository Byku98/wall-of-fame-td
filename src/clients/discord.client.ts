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
    const lapWebhookUrl = process.env.LAP_DISCORD_WEBHOOK_URL;
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

    if (!lapWebhookUrl) {
      console.warn("LAP_DISCORD_WEBHOOK_URL is missing in .env. Skipping lap notification.");
      return;
    }

    // Helper to handle empty values
    const val = (value: any) => (value && value.toString().trim() !== "") ? value : "---";

    // Construct URLs using the centralized ROUTES config
    const approveLapUrl = `${baseUrl}${ROUTES.API.LAPS.APPROVE}/${insertedId}?token=${submissionToken}`;
    const rejectLapUrl = `${baseUrl}${ROUTES.API.LAPS.REJECT}/${insertedId}?token=${submissionToken}`;

    // Build fields array for LAP notification
    const lapFields = [
      { name: "👤 Zawodnik", value: val(lapData.riderName), inline: true },
      { name: "🏁 Tor", value: val(lapData.trackName), inline: true },
      { name: "⏱️ Czas", value: formatLapTime(lapData.lapTime), inline: true },
      { name: "📅 Data", value: val(lapData.lapDate), inline: true },
      { name: "🏍️ Motocykl", value: val(lapData.motorcycle), inline: true },
      { name: "🤝 Organizator", value: val(lapData.organizer), inline: true },
      { name: "📱 Urządzenie pomiarowe", value: val(lapData.device), inline: true },
      { name: "📧 Kontakt", value: val(lapData.contactEmail), inline: true },
      { name: "🔗 Profil Społecznościowy", value: lapData.socialProfile ? `[Link](${lapData.socialProfile})` : 'Brak', inline: false },
      { name: "📊 Telemetria", value: val(lapData.deviceRecordedLap), inline: false },
      { name: "🔘 Opona Przód", value: val(lapData.tyreFront), inline: true },
      { name: "🔘 Opona Tył", value: val(lapData.tyreRear), inline: true },
      { name: "📺 Link YouTube", value: val(lapData.youtubeProof), inline: false },
      { name: "🖼️ Zdjęcie przejazdu", value: `${baseUrl}${lapData.proof_image_path}`, inline: false }
    ];

    // Add lap approval at the end
    lapFields.push(
      { name: "✅ Akceptuj", value: `[Kliknij aby zaakceptować okrążenie](${approveLapUrl})`, inline: true },
      { name: "❌ Odrzuć", value: `[Kliknij aby odrzucić okrążenie](${rejectLapUrl})`, inline: true }
    );

    // Add new motorcycle approval field if new motorcycle was submitted
    if (newMotorcycleId) {
      const motorcycleApproveUrl = `${baseUrl}${ROUTES.API.MANAGEMENT.MOTORCYCLE}/${newMotorcycleId}?token=${submissionToken}&action=approve`;
      const motorcycleDeleteUrl = `${baseUrl}${ROUTES.API.MANAGEMENT.MOTORCYCLE}/${newMotorcycleId}?token=${submissionToken}&action=delete`;
      
      const modifyQueryParams = new URLSearchParams();
      if (lapData.motorcycleNameManual) modifyQueryParams.append('name', lapData.motorcycleNameManual);
      if (lapData.motorcycleYearManual) modifyQueryParams.append('year', lapData.motorcycleYearManual);
      if (lapData.motorcycleTypeManual) modifyQueryParams.append('type', lapData.motorcycleTypeManual);

      const motorcycleModifyUrl = `${baseUrl}${ROUTES.API.MANAGEMENT.MOTORCYCLE}/${newMotorcycleId}?token=${submissionToken}&action=modify&${modifyQueryParams.toString()}`;
      
      const motorcycleDetails = `${val(lapData.motorcycleNameManual)} (${val(lapData.motorcycleYearManual)}) - ${val(lapData.motorcycleTypeManual)}`;

      lapFields.push(
        {
          name: `---\n🏍️ NOWY MOTOCYKL DO ZATWIERDZENIA: ${motorcycleDetails}\n\u200b`,
          value: `[✅ Zatwierdź](${motorcycleApproveUrl})\n[❌ Usuń](${motorcycleDeleteUrl})\n[✏️ Modyfikuj](${motorcycleModifyUrl})`,
          inline: false
        },
      );
    }

    // Add combined tyre approval field if new tyres were submitted
    if (newTyreFrontId || newTyreRearId) {
      const tfIdParam = newTyreFrontId ? `${newTyreFrontId}` : 'null';
      const trIdParam = newTyreRearId ? `${newTyreRearId}` : 'null';
      
      const tyreApproveUrl = `${baseUrl}${ROUTES.API.MANAGEMENT.TYRE}/${tfIdParam}/${trIdParam}?token=${submissionToken}&action=approve`;
      const tyreRejectUrl = `${baseUrl}${ROUTES.API.MANAGEMENT.TYRE}/${tfIdParam}/${trIdParam}?token=${submissionToken}&action=delete`;
      
      const modifyTyreQueryParams = new URLSearchParams();
      if (lapData.tyreFrontNameManual) modifyTyreQueryParams.append('nameTf', lapData.tyreFrontNameManual);
      if (lapData.tyreRearNameManual) modifyTyreQueryParams.append('nameTr', lapData.tyreRearNameManual);

      const tyreModifyUrl = `${baseUrl}${ROUTES.API.MANAGEMENT.TYRE}/${tfIdParam}/${trIdParam}?token=${submissionToken}&action=modify&${modifyTyreQueryParams.toString()}`;

      const tyreDetails = `${val(lapData.tyreFrontNameManual)} / ${val(lapData.tyreRearNameManual)}`;

      lapFields.push(
        {
          name: `---\n🔘 NOWE OPONY DO ZATWIERDZENIA: ${tyreDetails}\n\u200b`,
          value: `[✅ Zatwierdź](${tyreApproveUrl})\n[❌ Usuń](${tyreRejectUrl})\n[✏️ Modyfikuj](${tyreModifyUrl})`,
          inline: false
        },
      );
    }

    const payload = {
      username: "Leaderboard Notifier",
      embeds: [{
        title: "🏎️ Nowy czas okrążenia do weryfikacji!",
        color: 0x00ff00,
        fields: lapFields,
        footer: { text: `ID Systemowe: ${insertedId}` },
        timestamp: new Date().toISOString()
      }]
    };

    try {
      await fetch(lapWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (error) {
      console.error("Failed to send Discord lap notification:", error);
    }
  },

  /**
   * Sends a rich embed notification about a new rider submission.
   */
  sendNewRiderNotification: async (
    riderData: {
      riderNameManual: string;
      riderSex: string;
      riderInstagram: string | null;
      riderFacebook: string | null;
      contactEmail: string; // Assuming contact email is also available for rider
    },
    submissionToken: string,
    newRiderId: number
  ) => {
    const riderWebhookUrl = process.env.RIDER_DISCORD_WEBHOOK_URL;
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

    if (!riderWebhookUrl) {
      console.warn("RIDER_DISCORD_WEBHOOK_URL is missing in .env. Skipping new rider notification.");
      return;
    }

    const val = (value: any) => (value && value.toString().trim() !== "") ? value : "---";

    const riderApproveUrl = `${baseUrl}${ROUTES.API.MANAGEMENT.RIDER}/${newRiderId}?token=${submissionToken}&action=approve`;
    const riderRejectUrl = `${baseUrl}${ROUTES.API.MANAGEMENT.RIDER}/${newRiderId}?token=${submissionToken}&action=delete`;
    
    // Map 'male'/'female' to Polish display text for Discord
    const displaySex = riderData.riderSex === 'male' ? 'Mężczyzna' : (riderData.riderSex === 'female' ? 'Kobieta' : '---');

    const riderFields = [
      { name: "👤 Imię i Nazwisko", value: val(riderData.riderNameManual), inline: true },
      { name: "🚻 Płeć", value: displaySex, inline: true },
      { name: "📸 Instagram", value: riderData.riderInstagram ? `[Link](${riderData.riderInstagram})` : 'Brak', inline: false },
      { name: "👍 Facebook", value: riderData.riderFacebook ? `[Link](${riderData.riderFacebook})` : 'Brak', inline: false },
      { name: "📧 Kontakt Zgłaszającego", value: val(riderData.contactEmail), inline: false },
      { name: "✅ Zatwierdź", value: `[Kliknij aby zatwierdzić zawodnika](${riderApproveUrl})`, inline: true },
      { name: "❌ Odrzuć", value: `[Kliknij aby odrzucić zawodnika](${riderRejectUrl})`, inline: true }
    ];

    const riderPayload = {
      username: "New Rider Notifier",
      embeds: [{
        title: "🆕 Nowy zawodnik do weryfikacji!",
        color: 0x0000ff, // Blue color for new rider
        fields: riderFields,
        footer: { text: `ID Systemowe: ${newRiderId}` },
        timestamp: new Date().toISOString()
      }]
    };

    try {
      await fetch(riderWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(riderPayload)
      });
    } catch (error) {
      console.error("Failed to send Discord new rider notification:", error);
    }
  }
};