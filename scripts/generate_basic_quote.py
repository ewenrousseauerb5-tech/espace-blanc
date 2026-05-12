from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    Image,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "Devis_Espace_Blanc_IMPULSA.pdf"
LOGO = ROOT / "assets" / "impulsa-logo.jpg"

NAVY = colors.HexColor("#132B49")
MUTED = colors.HexColor("#667789")
LINE = colors.HexColor("#D9E1EA")
SOFT = colors.HexColor("#F6F8FB")
GOLD = colors.HexColor("#B99A5D")


def p(text, style):
    return Paragraph(text, style)


def build_pdf():
    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        rightMargin=20 * mm,
        leftMargin=20 * mm,
        topMargin=18 * mm,
        bottomMargin=18 * mm,
        title="Devis Espace Blanc - IMPULSA",
    )

    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="SmallMuted",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=8,
            leading=11,
            textColor=MUTED,
        )
    )
    styles.add(
        ParagraphStyle(
            name="TitleNavy",
            parent=styles["Title"],
            fontName="Helvetica-Bold",
            fontSize=22,
            leading=27,
            textColor=NAVY,
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="SectionTitle",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=12,
            leading=15,
            textColor=NAVY,
            spaceBefore=14,
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Body",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=9.5,
            leading=14,
            textColor=colors.HexColor("#1E2A36"),
        )
    )
    styles.add(
        ParagraphStyle(
            name="BodyBold",
            parent=styles["Body"],
            fontName="Helvetica-Bold",
        )
    )

    story = []

    logo = Image(str(LOGO), width=52 * mm, height=20 * mm)
    header = Table(
        [
            [
                logo,
                p(
                    "Devis estimatif<br/>Projet digital Espace Blanc<br/>11 mai 2026",
                    styles["SmallMuted"],
                ),
            ]
        ],
        colWidths=[95 * mm, 60 * mm],
    )
    header.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("ALIGN", (1, 0), (1, 0), "RIGHT"),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
                ("LINEBELOW", (0, 0), (-1, -1), 0.6, LINE),
            ]
        )
    )
    story.append(header)
    story.append(Spacer(1, 12 * mm))

    story.append(p("Devis estimatif", styles["TitleNavy"]))
    story.append(
        p(
            "Refonte du site vitrine, conception d'un espace client privé et mise en place "
            "d'un back-office de gestion pour Espace Blanc.",
            styles["Body"],
        )
    )

    story.append(p("Client", styles["SectionTitle"]))
    story.append(
        p(
            "<b>Espace Blanc</b><br/>Vider votre logement au fil des événements de votre vie",
            styles["Body"],
        )
    )

    story.append(p("Périmètre inclus", styles["SectionTitle"]))
    scope_data = [
        ["Site vitrine", "Refonte visuelle, structure des pages, responsive design, formulaire de contact."],
        ["Espace client", "Connexion sécurisée, tableau de bord, suivi du dossier, documents privés."],
        ["Back-office", "Création de clients, gestion des dossiers, statuts, notes et dépôt de fichiers."],
        ["Accompagnement", "Cadrage, direction artistique, tests, mise en ligne et prise en main."],
    ]
    scope = Table(scope_data, colWidths=[38 * mm, 117 * mm])
    scope.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.white),
                ("TEXTCOLOR", (0, 0), (0, -1), NAVY),
                ("FONTNAME", (0, 0), (0, -1), "Helvetica-Bold"),
                ("FONTNAME", (1, 0), (1, -1), "Helvetica"),
                ("FONTSIZE", (0, 0), (-1, -1), 9),
                ("LEADING", (0, 0), (-1, -1), 12),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("GRID", (0, 0), (-1, -1), 0.4, LINE),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    story.append(scope)

    story.append(p("Budget", styles["SectionTitle"]))
    price_data = [
        ["Offre", "Contenu", "Montant HT"],
        ["Essentiel", "Site vitrine premium + espace client simple", "9 800 EUR"],
        ["Professionnel", "Site complet + espace client avancé + back-office sur mesure", "14 900 EUR"],
        ["Signature", "Version avancée avec notifications, exports PDF et galerie d'objets", "19 500 EUR"],
    ]
    prices = Table(price_data, colWidths=[32 * mm, 88 * mm, 35 * mm])
    prices.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), NAVY),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("BACKGROUND", (0, 2), (-1, 2), SOFT),
                ("TEXTCOLOR", (0, 2), (0, 2), NAVY),
                ("FONTNAME", (0, 2), (-1, 2), "Helvetica-Bold"),
                ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
                ("FONTSIZE", (0, 0), (-1, -1), 9),
                ("LEADING", (0, 0), (-1, -1), 12),
                ("GRID", (0, 0), (-1, -1), 0.4, LINE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("ALIGN", (2, 1), (2, -1), "RIGHT"),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    story.append(prices)
    story.append(Spacer(1, 3 * mm))
    story.append(
        p(
            "Offre recommandée: <b>Professionnel - 14 900 EUR HT</b>.",
            styles["BodyBold"],
        )
    )

    story.append(p("Planning estimatif", styles["SectionTitle"]))
    story.append(
        p(
            "Durée estimée: <b>8 à 10 semaines</b> après validation du périmètre, réception "
            "des contenus nécessaires et lancement du projet.",
            styles["Body"],
        )
    )

    story.append(p("Conditions", styles["SectionTitle"]))
    story.append(
        p(
            "Montants indicatifs hors TVA. Le devis définitif pourra être ajusté après cadrage "
            "fonctionnel, validation des contenus, choix de l'hébergement, services tiers et "
            "niveau exact de personnalisation souhaité.",
            styles["Body"],
        )
    )

    story.append(Spacer(1, 12 * mm))
    footer = Table(
        [[p("IMPULSA", styles["BodyBold"]), p("Proposition confidentielle - usage interne et client.", styles["SmallMuted"])]],
        colWidths=[45 * mm, 110 * mm],
    )
    footer.setStyle(
        TableStyle(
            [
                ("LINEABOVE", (0, 0), (-1, -1), 0.6, LINE),
                ("TOPPADDING", (0, 0), (-1, -1), 10),
                ("ALIGN", (1, 0), (1, 0), "RIGHT"),
            ]
        )
    )
    story.append(footer)

    doc.build(story)


if __name__ == "__main__":
    build_pdf()
    print(OUTPUT)
