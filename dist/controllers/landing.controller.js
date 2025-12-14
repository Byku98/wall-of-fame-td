"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderLandingPage = renderLandingPage;
function renderLandingPage(req, res) {
    const dynamicContent = {
        title: "Pszczółki - Wall of Fame",
        logo: "/images/wof-internal/wof-logo-big.png",
        subPages: [
            { label: "Tabela czasów", url: "/leaderboard", style: "success" },
            { label: "Prześlij wynik", url: "/send-result", style: "warning" },
            { label: "Znajdź track-day", url: "/social-media", style: "danger" },
            { label: "FAQ", url: "/faq", style: "primary" },
            { label: "Kontakt", url: "/contact", style: "danger" }
        ],
        socialMedia: [
            { label: "instagram", logo: "/images/media/instagram-logo-full.png", url: "https://www.instagram.com/wof.pszczolki.com.pl/" },
            { label: "facebook", logo: "/images/media/fb-logo.png", url: "https://www.facebook.com/groups/907379607893959" },
            { label: "discord", logo: "/images/media/discord-logo.png", url: "https://www.facebook.com/groups/907379607893959" }
        ]
    };
    res.render("landing", dynamicContent);
}
//# sourceMappingURL=landing.controller.js.map