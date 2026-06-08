import React, { useState, useEffect } from "react";

// ── Error Boundary ────────────────────────────────────────────────────────────
class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(err) { return { error: err }; }
  componentDidCatch(err, info) { console.error("TheLineup error:", err, info); }
  render() {
    if (this.state.error) {
      return (
        <div style={{ minHeight:"100vh", background:"#0a0e17", color:"#e2e8f0",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontFamily:"monospace", padding:32, flexDirection:"column", gap:16 }}>
          <div style={{ fontSize:24 }}>⚾ Something went wrong</div>
          <div style={{ background:"rgba(220,38,38,0.15)", border:"1px solid #dc2626",
            borderRadius:8, padding:16, maxWidth:600, fontSize:13, lineHeight:1.6,
            color:"#fca5a5", whiteSpace:"pre-wrap" }}>
            {this.state.error.toString()}
          </div>
          <button onClick={() => this.setState({ error: null })}
            style={{ background:"#dc2626", color:"#fff", border:"none",
              borderRadius:6, padding:"10px 24px", cursor:"pointer", fontSize:14 }}>
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

import { PLAYERS } from "./players.js";

// ── T object (translations) ───────────────────────────────────────────────────
const T = {
  en: {
    title: "The Lineup",
    subtitle: "Build the Perfect Lineup",
    tagline: "MLB ALL-TIME",
    introPara: "Phase 1 — Draft 9 legends position by position, chosen from the best of all eras. Phase 2 — Set your batting order. Simulation — 162 games.",
    chooseMode: "CHOOSE YOUR MODE",
    modeClassic: "📊 Classic",
    modeClassicDesc: "Stats visible — make informed picks",
    modeScout: "🔍 Scout Mode",
    modeScoutDesc: "Stats hidden — draft from memory",
    playBall: "Play Ball →",
    langLabel: "Language",
    phase1Label: "Draft — ",
    phase1Sub: "Phase 1 · Draft by Position",
    rosterLabel: "ROSTER",
    posLabel: "POSITION",
    allEras: "All eras",
    loading: "LOADING…",
    tipLabel: "Tip:",
    draftBtn: "DRAFT",
    statsHidden: "Stats hidden",
    phase2Label: "Phase 2 · Batting Order",
    phase2Title: "SET YOUR BATTING ORDER",
    phase2Hint: "Drag & drop or use arrows ↑↓",
    simulateBtn: "⚾ Simulate Season →",
    resultTitle: "SEASON SIMULATION — 162 GAMES",
    rpgLabel: "runs/game avg",
    newGame: "New Game",
    playAgain: "PLAY AGAIN",
    winLabels: [
      [140, "🏆 LEGENDARY — Hall of Fame Season!"],
      [110, "🔥 ELITE — Playoff contender!"],
      [90,  "✅ SOLID — Wild Card territory"],
      [75,  "⚠️ AVERAGE — Rebuilding year"],
      [0,   "❌ WEAK — Back to the draft board"],
    ],
    slotRoles: ["Leadoff","2nd","3rd","Cleanup","5th","6th","7th","8th","9th"],
    slotTips:  ["OBP & Speed","Contact & OBP","Best all-around","Pure Power","Power & RBI","Balanced","Defense/Contact","Speed & Base","Utility / Speed"],
    slotIcons: ["⚡","🎯","⭐","💥","🔥","⚖️","🛡️","🏃","🔄"],
    posNames: { C:"Catcher", "1B":"First Base", "2B":"Second Base", "3B":"Third Base", SS:"Shortstop", LF:"Left Field", CF:"Center Field", RF:"Right Field", DH:"Designated Hitter" },
    posTips:  { C:"Framing & power", "1B":"Power & contact", "2B":"Contact & speed", "3B":"Power & defense", SS:"All-around", LF:"Power", CF:"Speed & defense", RF:"Contact & arm", DH:"Best hitter" },
    posIcons: { C:"🎯", "1B":"💪", "2B":"⚡", "3B":"🔥", SS:"🌟", LF:"💥", CF:"🏃", RF:"🎯", DH:"⭐" },
    colHeaders: ["#","POS","PLAYER","OBP","SLG","AVG","SB"],
    inProgress: "← Drafting",
    done: "✓",
    eraLabel: "Era",
    seasonStatsTitle: "SIMULATED SEASON STATS",
    seasonLeaders: "SEASON LEADERS",
    seasonStatsHeaders: ["#","PLAYER","POS","R","H","HR","RBI","BB","SB","AVG","OBP"],
    leaders: [
      { key:"R",   label:"Most Runs",    icon:"🏃", color:"#22c55e" },
      { key:"HR",  label:"Most Home Runs",icon:"💥", color:"#dc2626" },
      { key:"RBI", label:"Most RBI",     icon:"🔥", color:"#f97316" },
      { key:"H",   label:"Most Hits",    icon:"🎯", color:"#3b82f6" },
      { key:"AVG", label:"Best AVG",     icon:"📊", color:"#a78bfa" },
      { key:"OBP", label:"Best OBP",     icon:"⚡", color:"#fbbf24" },
      { key:"SB",  label:"Most SB",      icon:"💨", color:"#06b6d4" },
      { key:"BB",  label:"Most Walks",   icon:"🛡️", color:"#84cc16" },
    ],
    themeToggle: { dark: "🌙 Dark", light: "☀️ Light" },
    howToPlayBtn: "How to Play",
    donateBtn: "☕ Buy me a coffee",
    donateMsg: "Enjoying the game? Support it!",
    shareBtn: "📤 Share my lineup",
    shareTitle: "My Lineup — The Lineup",
    shareCopied: "✓ Copied to clipboard!",
    hofTitle: "🏆 Hall of Fame",
    hofEmpty: "No lineups saved yet. Play a game to set your first record!",
    hofBest: "Personal Best",
    hofSave: "Save to Hall of Fame",
    hofSaved: "✓ Saved!",
    hofClear: "Clear",
    anecdoteTitle: "Did you know?",
    tabLeaders: "Leaders",
    tabSeason:  "Stats",
    tabCareer:  "Career",
    lbYou:      "← YOU",
    lbRefresh:  "↺ Refresh",
    lbRetry:    "Retry",

    lbTitle: "🌍 Global Leaderboard",
    lbEnterName: "Enter your name",
    lbNamePlaceholder: "Your name (max 15 chars)",
    lbSubmit: "Submit score",
    lbSubmitting: "Submitting...",
    lbSubmitted: "✓ Score submitted!",
    lbTab: "🌍 Leaderboard",
    lbEmpty: "No scores yet. Be the first!",
    lbYou: "← YOU",
    lbRank: "Rank",
    lbSkip: "Skip",
    feedbackTitle: "Your feedback",
    feedbackSub: "How would you rate The Lineup?",
    feedbackPlaceholder: "Tell us what you think... (optional)",
    feedbackSend: "Send feedback",
    feedbackThanks: "Thank you!",
    feedbackThanksMsg: "Your feedback helps make the game better.",
    feedbackBtn: "💬 Feedback",
    htp: {
      title: "How to Play",
      close: "✕ Close",
      phases: [
        { icon: "1️⃣", title: "Phase 1 — Draft by Position", body: "You draft 9 players, one per position (C, 1B, 2B, 3B, SS, LF, CF, RF, DH). Each turn, 5 random players from across all eras are presented. Pick the one that fits best." },
        { icon: "2️⃣", title: "Phase 2 — Batting Order", body: "Arrange your 9 players into the optimal batting order. Drag & drop cards to reorder. High OBP up top, power in the middle, speed at the bottom." },
        { icon: "3️⃣", title: "Simulation — 162 Games", body: "The engine simulates a full 162-game season using real career stats. Every game plays out using probability models based on OBP, SLG, AVG, BB% and SB." },
      ],
      scoring: {
        title: "Scoring System",
        body: "Each plate appearance uses the batter's career stats to determine the outcome:",
        items: [
          { stat: "OBP",  color: "#3b82f6", desc: "On-Base % — probability of reaching base (walk, HBP, or single)" },
          { stat: "SLG",  color: "#dc2626", desc: "Slugging % — power factor driving extra-base hits and home runs" },
          { stat: "AVG",  color: "#22c55e", desc: "Batting Average — probability of a contact hit" },
          { stat: "BB%",  color: "#a78bfa", desc: "Walk Rate — extra walks boost OBP contribution" },
          { stat: "SB",   color: "#f59e0b", desc: "Stolen Bases — career total used for baserunning aggression" },
        ],
      },
      engine: {
        title: "How Runs Are Calculated",
        intro: "The engine simulates every plate appearance of all 162 games using a random roll (0–1) compared against each batter's probabilities:",
        outcomes: [
          { roll: "r < OBP × 0.283",  result: "Walk / HBP → force-advance logic: only scores if bases loaded", color: "#a78bfa" },
          { roll: "+ SLG × 0.085",    result: "Home Run → batter + all baserunners score", color: "#dc2626" },
          { roll: "+ AVG × 0.195",    result: "Double → batter to 2nd, runners advance 2 bases", color: "#3b82f6" },
          { roll: "+ AVG × 0.638",    result: "Single → batter to 1st, runners advance 1 base", color: "#22c55e" },
          { roll: "else",             result: "Out — stolen base attempt possible (SB/1500 chance per PA)", color: "#f59e0b" },
        ],
        rulesTitle: "Base Advancement Rules",
        rules: [
          "Walk: force-advance only — runner on 3rd scores only if bases are loaded.",
          "Single: runner on 3rd scores, others advance 1 base.",
          "Double: runners on 2nd and 3rd score, runner on 1st goes to 3rd.",
          "Home Run: everyone scores. Bases reset to empty.",
          "Bases clear at end of each inning (every 3 outs).",
        ],
        formulaTitle: "Wins Formula",
        formula: "wins = 50 + (runs_per_game − 4.0) × 14",
        formulaNote: "Calibrated to real MLB: an average team scores 4.19 R/G → 81 wins. Each extra run/game adds ~17 wins. 162-0 is the holy grail — achievable only with the perfect lineup AND perfect batting order. Most elite lineups land around 155-160W.",
        examplesTitle: "Benchmarks",
        examples: [
          { rpg: "4.2 R/G", wins: "81 W",  label: "MLB average team" },
          { rpg: "5.0 R/G", wins: "95 W",  label: "Playoff contender" },
          { rpg: "6.0 R/G", wins: "112 W", label: "Great offense" },
          { rpg: "7.5 R/G", wins: "137 W", label: "Historic lineup" },
          { rpg: "9.4 R/G", wins: "162 W", label: "The holy grail 🏆" },
        ],
      },
      wins: {
        title: "Win Targets",
        items: [
          { threshold: "140+", label: "🏆 Legendary — Hall of Fame season", color: "#22c55e" },
          { threshold: "110+", label: "🔥 Elite — Playoff contender",       color: "#84cc16" },
          { threshold: "90+",  label: "✅ Solid — Wild Card territory",      color: "#eab308" },
          { threshold: "75+",  label: "⚠️ Average — Rebuilding year",        color: "#f97316" },
          { threshold: "<75",  label: "❌ Weak — Back to the draft board",   color: "#ef4444" },
        ],
      },
      modes: {
        title: "Game Modes",
        items: [
          { name: "📊 Classic", desc: "Stats visible on every card — data-driven picks." },
          { name: "🔍 Scout Mode", desc: "Stats hidden — draft from memory and baseball knowledge." },
        ],
      },
      tips: {
        title: "Pro Tips",
        items: [
          "Highest OBP player goes leadoff to maximize scoring chances.",
          "Best power hitters in slots 3 & 4 — they bat with runners on base.",
          "Speed pays off at the bottom of the order.",
          "DH accepts 1B, LF, RF, CF or DH primary positions.",
          "Dead Ball era (1900s–1910s): lower HR but higher AVG — great for contact lineups.",
        ],
      },
    },
  },
  fr: {
    title: "The Lineup",
    subtitle: "Construis le Lineup Parfait",
    tagline: "MLB LÉGENDES",
    introPara: "Phase 1 — Drafts 9 légendes poste par poste, parmi les meilleurs de toutes les ères. Phase 2 — Arrange ton batting order. Simulation — 162 matchs.",
    chooseMode: "CHOISIS TON MODE",
    modeClassic: "📊 Classic",
    modeClassicDesc: "Stats visibles — choix éclairés",
    modeScout: "🔍 Scout Mode",
    modeScoutDesc: "Stats cachées — joue de mémoire",
    playBall: "Play Ball →",
    langLabel: "Langue",
    phase1Label: "Draft — ",
    phase1Sub: "Phase 1 · Draft par Poste",
    rosterLabel: "ROSTER",
    posLabel: "POSTE",
    allEras: "Toutes ères",
    loading: "SÉLECTION…",
    tipLabel: "Tip :",
    draftBtn: "DRAFT",
    statsHidden: "Stats cachées",
    phase2Label: "Phase 2 · Batting Order",
    phase2Title: "ARRANGE TON BATTING ORDER",
    phase2Hint: "Glisse-dépose ou utilise les flèches ↑↓",
    simulateBtn: "⚾ Simuler la saison →",
    resultTitle: "SIMULATION — 162 MATCHS",
    rpgLabel: "runs/match en moyenne",
    newGame: "Nouveau jeu",
    playAgain: "REJOUER",
    winLabels: [
      [140, "🏆 LÉGENDAIRE — Saison Hall of Fame !"],
      [110, "🔥 ÉLITE — Favori aux playoffs !"],
      [90,  "✅ SOLIDE — Wild Card territory"],
      [75,  "⚠️ MOYEN — Saison de reconstruction"],
      [0,   "❌ FAIBLE — Retour à la draft !"],
    ],
    slotRoles: ["Leadoff","2ème","3ème","Cleanup","5ème","6ème","7ème","8ème","9ème"],
    slotTips:  ["OBP & Vitesse","Contact & OBP","Meilleur all-around","Puissance pure","Power & RBI","Équilibré","Défense & Contact","Vitesse & Base","Utility / Speed"],
    slotIcons: ["⚡","🎯","⭐","💥","🔥","⚖️","🛡️","🏃","🔄"],
    posNames: { C:"Receveur", "1B":"Première Base", "2B":"Deuxième Base", "3B":"Troisième Base", SS:"Arrêt-Court", LF:"Champ Gauche", CF:"Champ Centre", RF:"Champ Droit", DH:"Frappeur Désigné" },
    posTips:  { C:"Réception & puissance", "1B":"Puissance & contact", "2B":"Contact & vitesse", "3B":"Puissance & défense", SS:"All-around", LF:"Puissance", CF:"Vitesse & défense", RF:"Contact & bras", DH:"Meilleur frappeur" },
    posIcons: { C:"🎯", "1B":"💪", "2B":"⚡", "3B":"🔥", SS:"🌟", LF:"💥", CF:"🏃", RF:"🎯", DH:"⭐" },
    colHeaders: ["#","POS","JOUEUR","OBP","SLG","MOY","BS"],
    inProgress: "← En cours",
    done: "✓",
    eraLabel: "Ère",
    seasonStatsTitle: "STATS DE SAISON SIMULÉE",
    seasonLeaders: "LEADERS DE LA SAISON",
    seasonStatsHeaders: ["#","JOUEUR","POS","R","H","HR","RBI","BB","BS","MOY","OBP"],
    leaders: [
      { key:"R",   label:"Plus de Runs",      icon:"🏃", color:"#22c55e" },
      { key:"HR",  label:"Plus de Home Runs", icon:"💥", color:"#dc2626" },
      { key:"RBI", label:"Plus de RBI",       icon:"🔥", color:"#f97316" },
      { key:"H",   label:"Plus de Coups sûrs",icon:"🎯", color:"#3b82f6" },
      { key:"AVG", label:"Meilleure Moyenne", icon:"📊", color:"#a78bfa" },
      { key:"OBP", label:"Meilleur OBP",      icon:"⚡", color:"#fbbf24" },
      { key:"SB",  label:"Plus de Buts volés",icon:"💨", color:"#06b6d4" },
      { key:"BB",  label:"Plus de BB",        icon:"🛡️", color:"#84cc16" },
    ],
    themeToggle: { dark: "🌙 Sombre", light: "☀️ Clair" },
    howToPlayBtn: "Comment jouer",
    donateBtn: "☕ Offre-moi un café",
    donateMsg: "Le jeu te plaît ? Soutiens-le !",
    shareBtn: "📤 Partager mon lineup",
    shareTitle: "Mon Lineup — The Lineup",
    shareCopied: "✓ Copié dans le presse-papier !",
    hofTitle: "🏆 Hall of Fame",
    hofEmpty: "Aucun lineup sauvegardé. Joue une partie pour établir ton premier record !",
    hofBest: "Meilleur perso",
    hofSave: "Sauvegarder",
    hofSaved: "✓ Sauvegardé !",
    hofClear: "Effacer",
    anecdoteTitle: "Le savais-tu ?",
    tabLeaders: "Leaders",
    tabSeason:  "Stats",
    tabCareer:  "Carrière",
    lbYou:      "← MOI",
    lbRefresh:  "↺ Actualiser",
    lbRetry:    "Réessayer",

    lbTitle: "🌍 Classement mondial",
    lbEnterName: "Entre ton nom",
    lbNamePlaceholder: "Ton pseudo (15 max)",
    lbSubmit: "Soumettre le score",
    lbSubmitting: "Envoi...",
    lbSubmitted: "✓ Score soumis !",
    lbTab: "🌍 Classement",
    lbEmpty: "Aucun score pour l'instant. Sois le premier !",
    lbYou: "← TOI",
    lbRank: "Rang",
    lbSkip: "Passer",
    feedbackTitle: "Ton avis",
    feedbackSub: "Comment évalues-tu The Lineup ?",
    feedbackPlaceholder: "Dis-nous ce que tu penses... (optionnel)",
    feedbackSend: "Envoyer",
    feedbackThanks: "Merci !",
    feedbackThanksMsg: "Ton avis nous aide à améliorer le jeu.",
    feedbackBtn: "💬 Feedback",
    htp: {
      title: "Comment jouer",
      close: "✕ Fermer",
      phases: [
        { icon: "1️⃣", title: "Phase 1 — Draft par poste", body: "Tu draftes 9 joueurs, un par poste (C, 1B, 2B, 3B, SS, LF, CF, RF, DH). À chaque tour, 5 joueurs aléatoires de toutes les ères sont proposés. Choisis celui qui correspond le mieux." },
        { icon: "2️⃣", title: "Phase 2 — Batting Order", body: "Arrange tes 9 joueurs dans l'ordre de frappe optimal. Glisse-dépose les cartes pour les réordonner. OBP élevé en haut, puissance au milieu, vitesse en bas." },
        { icon: "3️⃣", title: "Simulation — 162 matchs", body: "Le moteur simule une saison complète de 162 matchs avec les vraies stats de carrière. Chaque match est simulé à partir des probabilités OBP, SLG, MOY, BB% et BS." },
      ],
      scoring: {
        title: "Système de score",
        body: "Chaque passage au bâton utilise les stats de carrière du frappeur pour déterminer l'issue :",
        items: [
          { stat: "OBP",  color: "#3b82f6", desc: "On-Base % — probabilité d'atteindre une base (BB, HBP ou coup sûr)" },
          { stat: "SLG",  color: "#dc2626", desc: "Slugging % — facteur puissance pour les extra-bases et home runs" },
          { stat: "MOY",  color: "#22c55e", desc: "Moyenne au bâton — probabilité d'un coup sûr au contact" },
          { stat: "BB%",  color: "#a78bfa", desc: "Taux de BB — les walks supplémentaires boostent l'OBP" },
          { stat: "BS",   color: "#f59e0b", desc: "Buts volés — total carrière pour l'agressivité sur les bases" },
        ],
      },
      engine: {
        title: "Comment les points sont calculés",
        intro: "Le moteur simule chaque passage au bâton de la saison de 162 matchs via un tirage aléatoire (0–1) comparé aux probabilités de chaque frappeur :",
        outcomes: [
          { roll: "r < OBP × 0.283",  result: "But-sur-balles → avancement forcé : coureur sur 3e marque seulement si les buts sont pleins", color: "#a78bfa" },
          { roll: "+ SLG × 0.085",    result: "Home Run → frappeur + tous les coureurs marquent", color: "#dc2626" },
          { roll: "+ MOY × 0.195",    result: "Double → frappeur sur 2e, coureurs avancent de 2 bases", color: "#3b82f6" },
          { roll: "+ MOY × 0.638",    result: "Coup sûr → frappeur sur 1re, coureurs avancent d'une base", color: "#22c55e" },
          { roll: "sinon",            result: "Retrait — tentative de vol possible (SB/1500 par PA)", color: "#f59e0b" },
        ],
        rulesTitle: "Règles d'avancement",
        rules: [
          "Walk : avancement forcé uniquement — le coureur sur 3e marque seulement si buts pleins.",
          "Coup sûr : coureur sur 3e marque, les autres avancent d'une base.",
          "Double : coureurs sur 2e et 3e marquent, coureur sur 1re va sur 3e.",
          "Home Run : tout le monde marque. Buts vidés.",
          "Les bases sont vidées à la fin de chaque manche (tous les 3 retraits).",
        ],
        formulaTitle: "Formule de victoires",
        formula: "victoires = 50 + (points_par_match − 4.0) × 14",
        formulaNote: "Calé sur la vraie MLB : une équipe moyenne marque 4.19 pts/match → 81 victoires. Chaque point supplémentaire ajoute ~17 victoires. 162-0 est le Graal — atteignable uniquement avec le lineup parfait ET le bon ordre de frappe. La plupart des lineups élites atteignent 155-160 victoires.",
        examplesTitle: "Références",
        examples: [
          { rpg: "4.2 pts/m", wins: "81 V",  label: "Équipe MLB moyenne" },
          { rpg: "5.0 pts/m", wins: "95 V",  label: "Niveau playoffs" },
          { rpg: "6.0 pts/m", wins: "112 V", label: "Grande attaque" },
          { rpg: "7.5 pts/m", wins: "137 V", label: "Lineup historique" },
          { rpg: "9.4 pts/m", wins: "162 V", label: "Le Graal 🏆" },
        ],
      },
      wins: {
        title: "Objectifs de victoires",
        items: [
          { threshold: "140+", label: "🏆 Légendaire — Saison Hall of Fame", color: "#22c55e" },
          { threshold: "110+", label: "🔥 Élite — Favori aux playoffs",      color: "#84cc16" },
          { threshold: "90+",  label: "✅ Solide — Wild Card territory",      color: "#eab308" },
          { threshold: "75+",  label: "⚠️ Moyen — Saison de reconstruction", color: "#f97316" },
          { threshold: "<75",  label: "❌ Faible — Retour à la draft !",      color: "#ef4444" },
        ],
      },
      modes: {
        title: "Modes de jeu",
        items: [
          { name: "📊 Classic", desc: "Stats visibles sur chaque carte — choix éclairés." },
          { name: "🔍 Scout Mode", desc: "Stats cachées — drafts de mémoire et de connaissance baseball." },
        ],
      },
      tips: {
        title: "Conseils de pro",
        items: [
          "Le joueur avec le meilleur OBP va en leadoff pour maximiser les occasions de marquer.",
          "Tes meilleurs frappeurs de puissance vont aux slots 3 et 4 — ils frappent avec des coureurs en jeu.",
          "La vitesse est plus utile en bas du lineup.",
          "Le DH accepte les postes 1B, LF, RF, CF ou DH.",
          "Les années Dead Ball (1900s–1910s) : moins de home runs mais meilleure moyenne — idéal pour un lineup de contact.",
        ],
      },
    },
  },
  es: {
    title: "The Lineup",
    subtitle: "Construye el Lineup Perfecto",
    tagline: "MLB LEGENDS",
    introPara: "Fase 1 — Elige 9 leyendas posición por posición, entre los mejores de todas las épocas. Fase 2 — Ordena tu batting order. Simulación — 162 partidos.",
    chooseMode: "ELIGE TU MODO",
    modeClassic: "📊 Clásico",
    modeClassicDesc: "Estadísticas visibles — elige con criterio",
    modeScout: "🔍 Modo Scout",
    modeScoutDesc: "Estadísticas ocultas — juega de memoria",
    playBall: "¡A Jugar! →",
    langLabel: "Idioma",
    phase1Label: "Draft — ",
    phase1Sub: "Fase 1 · Draft por Posición",
    rosterLabel: "EQUIPO",
    posLabel: "POSICIÓN",
    allEras: "Todas las épocas",
    loading: "SELECCIONANDO…",
    tipLabel: "Consejo:",
    draftBtn: "ELEGIR",
    statsHidden: "Stats ocultas",
    phase2Label: "Fase 2 · Batting Order",
    phase2Title: "ORDENA TU BATTING ORDER",
    phase2Hint: "Arrastra y suelta o usa las flechas ↑↓",
    simulateBtn: "⚾ Simular Temporada →",
    resultTitle: "SIMULACIÓN — 162 PARTIDOS",
    rpgLabel: "carreras/partido de media",
    newGame: "Nuevo Juego",
    playAgain: "JUGAR DE NUEVO",
    winLabels: [
      [140, "🏆 LEGENDARIO — ¡Temporada Hall of Fame!"],
      [110, "🔥 ÉLITE — ¡Candidato a playoffs!"],
      [90,  "✅ SÓLIDO — En la Wild Card"],
      [75,  "⚠️ REGULAR — Temporada de reconstrucción"],
      [0,   "❌ DÉBIL — ¡Vuelve al draft!"],
    ],
    slotRoles: ["Bateador 1","2do","3ro","Cleanup","5to","6to","7mo","8vo","9no"],
    slotTips:  ["OBP & Velocidad","Contacto & OBP","El mejor all-around","Potencia pura","Potencia & RBI","Equilibrado","Defensa & Contacto","Velocidad & Base","Utilidad / Speed"],
    slotIcons: ["⚡","🎯","⭐","💥","🔥","⚖️","🛡️","🏃","🔄"],
    posNames: { C:"Receptor", "1B":"Primera Base", "2B":"Segunda Base", "3B":"Tercera Base", SS:"Shortstop", LF:"Jardín Izquierdo", CF:"Jardín Central", RF:"Jardín Derecho", DH:"Bateador Designado" },
    posTips:  { C:"Recepción & poder", "1B":"Potencia & contacto", "2B":"Contacto & velocidad", "3B":"Potencia & defensa", SS:"All-around", LF:"Potencia", CF:"Velocidad & defensa", RF:"Contacto & brazo", DH:"Mejor bateador" },
    posIcons: { C:"🎯", "1B":"💪", "2B":"⚡", "3B":"🔥", SS:"🌟", LF:"💥", CF:"🏃", RF:"🎯", DH:"⭐" },
    colHeaders: ["#","POS","JUGADOR","OBP","SLG","AVG","BS"],
    inProgress: "← Eligiendo",
    done: "✓",
    eraLabel: "Época",
    seasonStatsTitle: "ESTADÍSTICAS DE TEMPORADA SIMULADA",
    seasonLeaders: "LÍDERES DE TEMPORADA",
    seasonStatsHeaders: ["#","JUGADOR","POS","R","H","HR","RBI","BB","BS","AVG","OBP"],
    leaders: [
      { key:"R",   label:"Más Carreras",       icon:"🏃", color:"#22c55e" },
      { key:"HR",  label:"Más Jonrones",       icon:"💥", color:"#dc2626" },
      { key:"RBI", label:"Más RBI",            icon:"🔥", color:"#f97316" },
      { key:"H",   label:"Más Hits",           icon:"🎯", color:"#3b82f6" },
      { key:"AVG", label:"Mejor Promedio",     icon:"📊", color:"#a78bfa" },
      { key:"OBP", label:"Mejor OBP",          icon:"⚡", color:"#fbbf24" },
      { key:"SB",  label:"Más Bases Robadas",  icon:"💨", color:"#06b6d4" },
      { key:"BB",  label:"Más Bases por Bolas",icon:"🛡️", color:"#84cc16" },
    ],
    themeToggle: { dark: "🌙 Oscuro", light: "☀️ Claro" },
    howToPlayBtn: "Cómo jugar",
    donateBtn: "☕ Invítame un café",
    donateMsg: "¿Disfrutando el juego? ¡Apóyalo!",
    shareBtn: "📤 Compartir mi lineup",
    shareTitle: "Mi Lineup — The Lineup",
    shareCopied: "✓ ¡Copiado al portapapeles!",
    hofTitle: "🏆 Hall of Fame",
    hofEmpty: "Sin lineups guardados. ¡Juega una partida para establecer tu primer récord!",
    hofBest: "Mejor personal",
    hofSave: "Guardar",
    hofSaved: "✓ ¡Guardado!",
    hofClear: "Borrar",
    anecdoteTitle: "¿Sabías que?",
    tabLeaders: "Líderes",
    tabSeason:  "Stats",
    tabCareer:  "Carrera",
    lbYou:      "← TÚ",
    lbRefresh:  "↺ Actualizar",
    lbRetry:    "Reintentar",

    lbTitle: "🌍 Clasificación mundial",
    lbEnterName: "Introduce tu nombre",
    lbNamePlaceholder: "Tu nombre (máx 15 car.)",
    lbSubmit: "Enviar puntuación",
    lbSubmitting: "Enviando...",
    lbSubmitted: "✓ ¡Puntuación enviada!",
    lbTab: "🌍 Clasificación",
    lbEmpty: "Sin puntuaciones aún. ¡Sé el primero!",
    lbYou: "← TÚ",
    lbRank: "Pos.",
    lbSkip: "Saltar",
    feedbackTitle: "Tu opinión",
    feedbackSub: "¿Cómo valorarías The Lineup?",
    feedbackPlaceholder: "Cuéntanos qué piensas... (opcional)",
    feedbackSend: "Enviar",
    feedbackThanks: "¡Gracias!",
    feedbackThanksMsg: "Tu opinión nos ayuda a mejorar el juego.",
    feedbackBtn: "💬 Feedback",
    htp: {
      title: "Cómo jugar",
      close: "✕ Cerrar",
      phases: [
        { icon: "1️⃣", title: "Fase 1 — Draft por posición", body: "Eliges 9 jugadores, uno por posición (C, 1B, 2B, 3B, SS, LF, CF, RF, DH). En cada turno se presentan 5 jugadores aleatorios de todas las épocas. Elige el que mejor se adapte." },
        { icon: "2️⃣", title: "Fase 2 — Batting Order", body: "Ordena tus 9 jugadores en el batting order óptimo. Arrastra y suelta las tarjetas. Mayor OBP arriba, potencia en el centro, velocidad abajo." },
        { icon: "3️⃣", title: "Simulación — 162 partidos", body: "El motor simula una temporada completa de 162 partidos con estadísticas reales de carrera usando modelos de probabilidad basados en OBP, SLG, AVG, BB% y BS." },
      ],
      scoring: {
        title: "Sistema de puntuación",
        body: "Cada turno al bate usa las estadísticas de carrera del bateador para determinar el resultado:",
        items: [
          { stat: "OBP",  color: "#3b82f6", desc: "On-Base % — probabilidad de llegar a base (BB, HBP o hit)" },
          { stat: "SLG",  color: "#dc2626", desc: "Slugging % — factor potencia para extra-bases y jonrones" },
          { stat: "AVG",  color: "#22c55e", desc: "Promedio de bateo — probabilidad de hit al contacto" },
          { stat: "BB%",  color: "#a78bfa", desc: "Tasa de BB — bases por bolas extra mejoran el OBP" },
          { stat: "BS",   color: "#f59e0b", desc: "Bases robadas — total de carrera para la agresividad" },
        ],
      },
      engine: {
        title: "Cómo se calculan las carreras",
        intro: "El motor simula cada turno al bate de los 162 partidos mediante un número aleatorio (0–1) comparado con las probabilidades de cada bateador:",
        outcomes: [
          { roll: "r < OBP × 0.283",  result: "Base por bolas → avance forzado: corredor en 3ª anota solo si bases llenas", color: "#a78bfa" },
          { roll: "+ SLG × 0.085",    result: "Jonrón → bateador + todos los corredores anotan", color: "#dc2626" },
          { roll: "+ AVG × 0.195",    result: "Doble → bateador a 2ª, corredores avanzan 2 bases", color: "#3b82f6" },
          { roll: "+ AVG × 0.638",    result: "Sencillo → bateador a 1ª, corredores avanzan 1 base", color: "#22c55e" },
          { roll: "si no",            result: "Out — intento de robo posible (BS/1500 por turno)", color: "#f59e0b" },
        ],
        rulesTitle: "Reglas de avance en bases",
        rules: [
          "Base por bolas: avance forzado — corredor en 3ª anota solo si las bases están llenas.",
          "Sencillo: corredor en 3ª anota, los demás avanzan 1 base.",
          "Doble: corredores en 2ª y 3ª anotan, corredor en 1ª va a 3ª.",
          "Jonrón: todos anotan. Bases vacías.",
          "Las bases se vacían al final de cada entrada (cada 3 outs).",
        ],
        formulaTitle: "Fórmula de victorias",
        formula: "victorias = 50 + (carreras_por_partido − 4.0) × 14",
        formulaNote: "Calibrado con la MLB real: un equipo promedio anota 4.19 C/P → 81 victorias. Cada carrera extra añade ~17 victorias. 162-0 es el objetivo supremo — solo alcanzable con el lineup perfecto Y el batting order perfecto. La mayoría de lineups élite llegan a 155-160 victorias.",
        examplesTitle: "Referencias",
        examples: [
          { rpg: "4.2 C/P", wins: "81 V",  label: "Equipo MLB promedio" },
          { rpg: "5.0 C/P", wins: "95 V",  label: "Nivel playoffs" },
          { rpg: "6.0 C/P", wins: "112 V", label: "Gran ataque" },
          { rpg: "7.5 C/P", wins: "137 V", label: "Lineup histórico" },
          { rpg: "9.4 C/P", wins: "162 V", label: "El santo grial 🏆" },
        ],
      },
      wins: {
        title: "Objetivos de victorias",
        items: [
          { threshold: "140+", label: "🏆 Legendario — Temporada Hall of Fame", color: "#22c55e" },
          { threshold: "110+", label: "🔥 Élite — Candidato a playoffs",         color: "#84cc16" },
          { threshold: "90+",  label: "✅ Sólido — Wild Card territory",           color: "#eab308" },
          { threshold: "75+",  label: "⚠️ Regular — Temporada de reconstrucción", color: "#f97316" },
          { threshold: "<75",  label: "❌ Débil — ¡Vuelve al draft!",              color: "#ef4444" },
        ],
      },
      modes: {
        title: "Modos de juego",
        items: [
          { name: "📊 Clásico", desc: "Estadísticas visibles en cada tarjeta — elecciones informadas." },
          { name: "🔍 Modo Scout", desc: "Estadísticas ocultas — elige de memoria y conocimiento beisbolero." },
        ],
      },
      tips: {
        title: "Consejos pro",
        items: [
          "El jugador con mayor OBP va primero para maximizar oportunidades de anotar.",
          "Tus mejores bateadores de potencia van en los slots 3 y 4 con corredores en base.",
          "La velocidad es más valiosa en la parte baja del lineup.",
          "El DH acepta posiciones principales 1B, LF, RF, CF o DH.",
          "Era Dead Ball (1900s–1910s): menos jonrones pero mejor promedio — ideal para lineups de contacto.",
        ],
      },
    },
  },
};

// ── Constants & helpers ───────────────────────────────────────────────────────
// ── Constantes ───────────────────────────────────────────────────────────────
const ROSTER_KEYS = ["C","1B","2B","3B","SS","LF","CF","RF","DH"];
const POS_GROUPS  = { C:["C"], "1B":["1B"], "2B":["2B"], "3B":["3B"], SS:["SS"], LF:["LF"], CF:["CF"], RF:["RF"], DH:["DH","1B","LF","RF","CF"] };
function getPlayersForSlot(posGroup, usedNames) {
  if (!PLAYERS) return [];
  const all = Object.values(PLAYERS).flat();
  if (!all.length) return [];
  const matching = all.filter(p => posGroup.includes(p.pos) && !usedNames.has(p.name));
  const pool = matching.length >= 5 ? matching : all.filter(p => !usedNames.has(p.name));
  return [...pool].sort(() => Math.random() - 0.5).slice(0, 5);
}

function getEra(name) {
  if (!PLAYERS || !name) return "";
  for (const [era, arr] of Object.entries(PLAYERS))
    if (arr.some(p => p.name === name)) return era;
  return "";
}


// ── Player anecdotes ─────────────────────────────────────────────────────────
const ANECDOTES = {
  "Babe Ruth":        { en:"Ruth started his career as a pitcher and had a 2.28 ERA before switching to outfield. He hit 714 HR — a record that stood for 39 years.", fr:"Ruth a commencé comme lanceur avec une ERA de 2.28 avant de devenir frappeur. Ses 714 HR ont constitué un record pendant 39 ans.", es:"Ruth comenzó como pitcher con 2.28 ERA antes de convertirse en bateador. Sus 714 jonrones fueron récord durante 39 años." },
  "Ted Williams":     { en:"Williams was the last player to bat .400, hitting .406 in 1941. He also missed nearly 5 seasons serving as a fighter pilot in two wars.", fr:"Williams est le dernier joueur à avoir frappé .400 (en 1941). Il a aussi manqué près de 5 saisons comme pilote de chasse dans deux guerres.", es:"Williams fue el último en batear .400 (1941). Perdió casi 5 temporadas como piloto de caza en dos guerras." },
  "Lou Gehrig":       { en:"Gehrig played 2,130 consecutive games, earning the nickname 'Iron Horse'. He retired at 36 after being diagnosed with ALS, the disease that now bears his name.", fr:"Gehrig a joué 2 130 matchs consécutifs. Il a pris sa retraite à 36 ans après un diagnostic de SLA, maladie qui porte désormais son nom.", es:"Gehrig jugó 2.130 partidos consecutivos. Se retiró a los 36 tras ser diagnosticado con ELA, enfermedad que lleva su nombre." },
  "Willie Mays":      { en:"Mays' 'The Catch' in the 1954 World Series is considered the greatest defensive play in baseball history — a full-speed, over-the-shoulder grab at the warning track.", fr:"La 'The Catch' de Mays en 1954 est considérée comme la meilleure action défensive de l'histoire du baseball.", es:"El 'The Catch' de Mays en 1954 es considerada la mejor jugada defensiva en la historia del béisbol." },
  "Mickey Mantle":    { en:"Mantle hit a 565-foot home run in 1953 — still one of the longest ever measured. He played most of his career on a severely damaged knee.", fr:"Mantle a frappé un home run de 172 mètres en 1953, l'un des plus longs jamais mesurés. Il a joué la plupart de sa carrière avec un genou gravement endommagé.", es:"Mantle bateó un jonrón de 172 metros en 1953. Jugó casi toda su carrera con una rodilla gravemente dañada." },
  "Hank Aaron":       { en:"Aaron received death threats before breaking Ruth's HR record in 1974. He hit his 715th HR on April 8, 1974, and finished with 755.", fr:"Aaron a reçu des menaces de mort avant de battre le record de Ruth en 1974. Il a terminé avec 755 HR.", es:"Aaron recibió amenazas de muerte antes de superar el récord de Ruth en 1974. Terminó con 755 jonrones." },
  "Barry Bonds":      { en:"Bonds' 2001 season is statistically the greatest offensive season ever: .863 SLG, .515 OBP, 73 HR. He was intentionally walked 120 times that year.", fr:"La saison 2001 de Bonds est statistiquement la meilleure offensive de tous les temps: .863 SLG, .515 OBP, 73 HR.", es:"La temporada 2001 de Bonds es estadísticamente la mejor ofensiva de la historia: .863 SLG, .515 OBP, 73 HR." },
  "Rogers Hornsby":   { en:"Hornsby batted .424 in 1924 — the highest single-season average in modern baseball history. He refused to watch movies to protect his eyesight.", fr:"Hornsby a frappé .424 en 1924, la meilleure moyenne sur une saison dans l'histoire moderne. Il refusait de regarder des films pour protéger sa vue.", es:"Hornsby bateó .424 en 1924, el mejor promedio de una temporada en la historia moderna. Se negaba a ver películas para proteger su visión." },
  "Ty Cobb":          { en:"Cobb's .366 career batting average is the highest in MLB history. He stole home 54 times and held the stolen base record for 47 years.", fr:"La moyenne de carrière de Cobb (.366) est la plus élevée de l'histoire de la MLB. Il a volé le marbre 54 fois.", es:"El promedio de carrera de Cobb (.366) es el más alto en la historia de la MLB. Robó home 54 veces." },
  "Honus Wagner":     { en:"Wagner's 1909 baseball card (T206) sold for $7.25 million in 2021, making it the most valuable sports card ever. He demanded it be pulled from production himself.", fr:"La carte baseball 1909 de Wagner (T206) s'est vendue 7,25 millions de dollars en 2021. Il avait lui-même exigé qu'elle soit retirée de la production.", es:"La tarjeta de béisbol de 1909 de Wagner se vendió por 7,25 millones de dólares en 2021. Él mismo exigió que se retirara de la producción." },
  "Joe Morgan":       { en:"Morgan's 'chicken flap' elbow pump became one of baseball's most iconic batting stances. He won back-to-back MVP awards in 1975–76 with the Big Red Machine.", fr:"Le mouvement de coude de Morgan est l'une des postures les plus iconiques du baseball. Il a remporté deux MVP consécutifs en 1975-76.", es:"El movimiento del codo de Morgan es una de las posturas más icónicas del béisbol. Ganó dos MVP consecutivos en 1975-76." },
  "Mike Trout":       { en:"Trout won AL MVP 3 times before turning 29. His career WAR pace through age 29 is the highest of any position player in baseball history.", fr:"Trout a remporté 3 fois le MVP AL avant ses 29 ans. Son rythme de WAR de carrière est le plus élevé de l'histoire pour un joueur de position.", es:"Trout ganó 3 veces el MVP de la AL antes de los 29 años. Su ritmo de WAR de carrera es el más alto de la historia." },
  "Shohei Ohtani":    { en:"Ohtani is the only player since Babe Ruth to be a legitimate ace pitcher AND a power-hitting cleanup batter at the same time, making him perhaps the greatest two-way player ever.", fr:"Ohtani est le seul joueur depuis Ruth à être simultanément un excellent lanceur et un frappeur de puissance, le rendant peut-être le meilleur joueur bidirectionnel de tous les temps.", es:"Ohtani es el único jugador desde Ruth en ser simultáneamente un excelente pitcher y bateador de potencia, posiblemente el mejor jugador de doble función de la historia." },
  "Alex Rodriguez":   { en:"A-Rod was the highest-paid player in baseball history, earning over $400 million in career contracts. He hit 696 HR — 3rd all-time.", fr:"A-Rod était le joueur le mieux payé de l'histoire du baseball avec plus de 400 millions de dollars de contrats. Il a frappé 696 HR.", es:"A-Rod fue el jugador mejor pagado de la historia con más de 400 millones en contratos. Bateó 696 jonrones, 3º de todos los tiempos." },
  "Rickey Henderson": { en:"Henderson stole 1,406 bases — more than any player in history, and 468 more than the 2nd-place player. He was also a leadoff hitter with 297 career home runs.", fr:"Henderson a volé 1 406 bases, plus que tout autre joueur dans l'histoire. Il a aussi frappé 297 HR en tant que frappeur en tête de l'ordre.", es:"Henderson robó 1.406 bases, más que cualquier jugador en la historia. También bateó 297 jonrones como bateador inicial." },
  "Stan Musial":      { en:"'Stan the Man' collected exactly 1,815 hits at home and 1,815 hits on the road. He was a 7-time batting champion and never received a single MVP vote below 4th place.", fr:"Musial a obtenu exactement 1 815 coups sûrs à domicile et 1 815 à l'extérieur. Il a remporté 7 titres de champion frappeur.", es:"Musial obtuvo exactamente 1.815 hits en casa y 1.815 de visitante. Ganó 7 títulos de bateo." },
  "Mike Schmidt":     { en:"Schmidt won 10 Gold Gloves at 3B and hit 548 HR — widely considered the greatest third baseman in MLB history.", fr:"Schmidt a remporté 10 Gants d'or au 3B et frappé 548 HR. Il est largement considéré comme le meilleur troisième but de l'histoire.", es:"Schmidt ganó 10 Guantes de Oro en 3B y bateó 548 HR. Es considerado el mejor tercera base de la historia." },
  "Josh Gibson":      { en:"Negro Leagues legend Josh Gibson reportedly hit over 800 home runs in his career. Some estimates put his batting average above .350 career.", fr:"La légende des Negro Leagues Josh Gibson aurait frappé plus de 800 home runs. Certaines estimations placent sa moyenne de carrière au-dessus de .350.", es:"La leyenda de las Ligas Negras Josh Gibson supuestamente bateó más de 800 jonrones. Su promedio de carrera se estima por encima de .350." },
  "Johnny Bench":     { en:"Bench revolutionized catching with the one-handed catching technique. He was so dominant that he won the Gold Glove 10 consecutive years.", fr:"Bench a révolutionné la technique de réception à une main. Il a remporté le Gant d'or 10 années consécutives.", es:"Bench revolucionó la técnica de recepción con una mano. Ganó el Guante de Oro 10 años consecutivos." },
  "Ken Griffey Jr.":  { en:"'The Kid' hit 630 career HR and was selected to 13 All-Star Games. He was elected to the Hall of Fame with 99.3% of the vote — the highest ever at the time.", fr:"'The Kid' a frappé 630 HR et a été sélectionné pour 13 All-Star Games. Il a été élu au Hall of Fame avec 99,3% des votes.", es:"'The Kid' bateó 630 HR y fue seleccionado para 13 Juegos de Estrellas. Fue elegido al Salón de la Fama con el 99,3% de los votos." },
  "Pedro Martinez":   { en:"In 1999-2000, Pedro was so dominant that his ERA+ of 291 in 2000 is the highest single-season mark in baseball history. He once hit 3 batters intentionally to send a message.", fr:"En 1999-2000, Pedro était si dominant que son ERA+ de 291 en 2000 est le record de tous les temps sur une saison.", es:"En 1999-2000, Pedro fue tan dominante que su ERA+ de 291 en 2000 es el récord de todos los tiempos en una temporada." },
  "Mariano Rivera":   { en:"Rivera threw almost exclusively the cutter — a pitch he discovered by accident. He's the only player unanimously elected to the Hall of Fame (100% of votes).", fr:"Rivera lançait presque exclusivement la balle coupée, qu'il a découverte par accident. Il est le seul joueur élu unanimement au Hall of Fame.", es:"Rivera lanzaba casi exclusivamente el cutter, que descubrió por accidente. Es el único jugador elegido unánimemente al Salón de la Fama." },
  "Albert Pujols":    { en:"Pujols hit .330 or better in each of his first 10 seasons — a feat matched only by Ty Cobb and Rogers Hornsby in the live-ball era.", fr:"Pujols a frappé .330 ou mieux lors de chacune de ses 10 premières saisons, un exploit égalé seulement par Cobb et Hornsby.", es:"Pujols bateó .330 o mejor en cada una de sus primeras 10 temporadas, hazaña igualada solo por Cobb y Hornsby." },
  "Wade Boggs":       { en:"Boggs was so disciplined at the plate that he ate chicken before every game — a ritual he maintained throughout his entire career. He batted .300 or better in 13 straight seasons.", fr:"Boggs mangeait du poulet avant chaque match — un rituel qu'il a maintenu toute sa carrière. Il a frappé .300 ou mieux 13 saisons consécutives.", es:"Boggs comía pollo antes de cada partido, ritual que mantuvo toda su carrera. Bateó .300 o mejor durante 13 temporadas consecutivas." },
};

// Get 1 random anecdote from a lineup (pick player with known anecdote)
function getAnecdote(lineup, lang) {
  if (!lineup) return null;
  const withAnecdote = lineup.filter(p => ANECDOTES[p.name]);
  if (!withAnecdote.length) return null;
  const player = withAnecdote[Math.floor(Math.random() * withAnecdote.length)];
  const fact = ANECDOTES[player.name];
  return { name: player.name, text: fact[lang] || fact.en };
}


// ── Supabase config ───────────────────────────────────────────────────────────
const SUPABASE_URL = "https://mhdldnmljxqscbhdvqfj.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oZGxkbm1sanhxc2NiaGR2cWZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4NTI1OTYsImV4cCI6MjA5NjQyODU5Nn0.MCOOMoY4sfITU9mPSKfYLktTiXzng_gIF_HkOuJ5YVc";

async function lbFetch(path, method = "GET", body = null, extraHeaders = {}) {
  const headers = {
    "apikey":        SUPABASE_KEY,
    "Authorization": `Bearer ${SUPABASE_KEY}`,
    "Content-Type":  "application/json",
    ...extraHeaders,
  };
  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, opts);
  if (!res.ok) throw new Error(await res.text());
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

async function lbGetTop(limit = 20) {
  return lbFetch(
    `leaderboard?select=id,name,wins,rpg,lineup,created_at&order=wins.desc,rpg.desc&limit=${limit}`
  );
}

async function lbInsert(name, wins, rpg, lineup) {
  const lineupStr = JSON.stringify(lineup.map(p => ({ name: p.name, pos: p.pos })));
  const res = await lbFetch(
    "leaderboard",
    "POST",
    { name, wins, rpg: parseFloat(rpg), lineup: lineupStr },
    { "Prefer": "return=representation" }
  );
  return Array.isArray(res) ? res[0] : res;
}

// ── Stat formatter: always 3 decimal places (.240 not .24) ──────────────────
function fmt3(val) {
  const n = Number(val);
  if (isNaN(n)) return String(val || ".000");
  return n.toFixed(3);
}

function simulateSeason(lineup) {
  if (!lineup || lineup.length < 9) return { wins: 0, rpg: "0.00", playerStats: [] };

  const stats = lineup.map(() => ({ R:0, H:0, HR:0, RBI:0, BB:0, SB:0, AB:0, PA:0 }));
  let totalRuns = 0;

  // ── Realistic MLB engine ────────────────────────────────────────────────────
  // PA outcome probabilities (calibrated to real MLB averages):
  //   P(walk)   = OBP  × 0.283  → ~9%  for avg player (.318 OBP)
  //   P(HR)     = power curve: max(0, SLG−AVG−0.12)^1.3 × 0.55
  //               Isolates true HR power — fixes weak hitter HR inflation
  //   P(double) = AVG  × 0.195  → ~5%  for avg player
  //   P(single) = AVG  × 0.638  → ~16% for avg player
  //   P(out)    = remainder      → ~66%
  // Walk: proper force-advance logic
  // Double: batter to 2nd, runners advance 2 bases
  // Inning resets: bases clear every 3 outs
  // Wins: 81 + (rpg − 4.19) × 13  →  MLB avg team = 81W

  for (let g = 0; g < 162; g++) {
    let outs = 0, bases = [0,0,0], bi = 0;

    while (outs < 27) {
      const idx = bi % 9;
      const b   = lineup[idx];
      if (!b) { outs++; bi++; continue; }

      const st     = stats[idx];
      const obp    = Number(b.obp) || 0;
      const slg    = Number(b.slg) || 0;
      const avg    = Number(b.avg) || 0;
      const sbProp = Number(b.sb)  || 0;

      const netPower = Math.max(0, slg - avg - 0.06);
      const p_hr     = Math.pow(netPower, 1.4) * 0.50;
      const p_walk   = obp * 0.283;
      const p_double = avg * 0.195;
      const p_single = avg * 0.638;

      st.PA++;
      const r = Math.random();

      if (r < p_walk) {
        st.BB++;
        if (bases[0] && bases[1] && bases[2]) {
          stats[bases[2]-1].R++; totalRuns++; st.RBI++;
          bases[2] = bases[1]; bases[1] = bases[0];
        } else if (bases[0] && bases[1]) {
          bases[2] = bases[1]; bases[1] = bases[0];
        } else if (bases[0]) {
          bases[1] = bases[0];
        }
        bases[0] = idx + 1;

      } else if (r < p_walk + p_hr) {
        st.AB++; st.H++; st.HR++;
        const runs = 1 + bases.filter(Boolean).length;
        st.RBI += runs; st.R++;
        bases.forEach(slot => { if (slot) stats[slot-1].R++; });
        totalRuns += runs;
        bases = [0, 0, 0];

      } else if (r < p_walk + p_hr + p_double) {
        st.AB++; st.H++;
        let scored = 0;
        if (bases[2]) { stats[bases[2]-1].R++; totalRuns++; scored++; }
        if (bases[1]) { stats[bases[1]-1].R++; totalRuns++; scored++; }
        st.RBI += scored;
        bases = [0, idx + 1, bases[0]];

      } else if (r < p_walk + p_hr + p_double + p_single) {
        st.AB++; st.H++;
        if (bases[2]) { stats[bases[2]-1].R++; totalRuns++; st.RBI++; }
        bases = [idx + 1, bases[0], bases[1]];

      } else {
        st.AB++;
        outs++;
        if (Math.random() < sbProp / 1500 && bases[0]) {
          st.SB++;
          bases = [0, bases[0], bases[1]];
        }
        if (outs % 3 === 0) bases = [0, 0, 0];
      }
      bi++;
    }
  }

  const rpg  = totalRuns / 162;
  const wins = isNaN(rpg) ? 0 : Math.min(162, Math.max(0, Math.round(81 + (rpg - 4.19) * 17)));

  const playerStats = lineup.map((p, i) => {
    const s = stats[i];
    return {
      name: p.name, pos: p.pos, era: p.era,
      R:   s.R,  H:   s.H,  HR:  s.HR, RBI: s.RBI,
      BB:  s.BB, SB:  s.SB, AB:  s.AB,
      AVG: s.AB > 0 ? (s.H / s.AB).toFixed(3) : ".000",
      OBP: s.PA > 0 ? ((s.H + s.BB) / s.PA).toFixed(3) : ".000",
    };
  });

  return { wins, rpg: isNaN(rpg) ? "0.00" : rpg.toFixed(2), totalRuns, playerStats };
}

function winLabel(wins, t) {
  return (t.winLabels.find(([min]) => wins >= min) || t.winLabels[t.winLabels.length-1])[1];
}

const winColor = w => w>=140?"#22c55e":w>=110?"#84cc16":w>=90?"#eab308":w>=75?"#f97316":"#ef4444";

// ── Theme ─────────────────────────────────────────────────────────────────────
// ── Theme ─────────────────────────────────────────────────────────────────────
const THEMES = {
  dark: {
    bg:          "#0a0e17",
    bgGrad:      "radial-gradient(ellipse at 20% 50%,rgba(16,40,80,0.4) 0%,transparent 60%),radial-gradient(ellipse at 80% 20%,rgba(80,16,40,0.3) 0%,transparent 50%)",
    headerBg:    "linear-gradient(180deg,#0d1526 0%,transparent 100%)",
    headerBorder:"rgba(255,255,255,0.06)",
    text:        "#e2e8f0",
    textMuted:   "#94a3b8",
    textDim:     "#64748b",
    textFaint:   "#475569",
    textGhost:   "#334155",
    card:        "rgba(255,255,255,0.03)",
    cardBorder:  "rgba(255,255,255,0.08)",
    cardHover:   "rgba(220,38,38,0.08)",
    cardHoverB:  "#dc2626",
    activeCard:  "rgba(220,38,38,0.1)",
    activeB:     "rgba(220,38,38,0.35)",
    doneCard:    "rgba(255,255,255,0.04)",
    doneBorder:  "rgba(255,255,255,0.07)",
    statBar:     "#1e293b",
    ghostBtn:    { bg:"rgba(255,255,255,0.05)", border:"rgba(255,255,255,0.1)", color:"#94a3b8" },
    select:      { bg:"rgba(255,255,255,0.06)", border:"rgba(255,255,255,0.12)", color:"#e2e8f0" },
    modalBg:     "#0f172a",
    modalBorder: "rgba(255,255,255,0.1)",
    progressBg:  "#0f172a",
    slotEmpty:   "#1e293b",
    slotEmptyTxt:"#334155",
    legend:      "rgba(255,255,255,0.02)",
    legendBorder:"rgba(255,255,255,0.05)",
    tableHead:   "rgba(255,255,255,0.03)",
    tableRow:    "rgba(255,255,255,0.04)",
    tableRowB:   "rgba(255,255,255,0.04)",
    tableBorder: "rgba(255,255,255,0.07)",
    rowBorder:   "rgba(255,255,255,0.04)",
  },
  light: {
    bg:          "#f1f5f9",
    bgGrad:      "radial-gradient(ellipse at 20% 50%,rgba(200,220,255,0.35) 0%,transparent 60%),radial-gradient(ellipse at 80% 20%,rgba(255,200,200,0.2) 0%,transparent 50%)",
    headerBg:    "linear-gradient(180deg,#ffffff 0%,rgba(241,245,249,0.9) 100%)",
    headerBorder:"rgba(0,0,0,0.08)",
    text:        "#0f172a",
    textMuted:   "#475569",
    textDim:     "#64748b",
    textFaint:   "#94a3b8",
    textGhost:   "#cbd5e1",
    card:        "#ffffff",
    cardBorder:  "rgba(0,0,0,0.08)",
    cardHover:   "rgba(220,38,38,0.06)",
    cardHoverB:  "#dc2626",
    activeCard:  "rgba(220,38,38,0.07)",
    activeB:     "rgba(220,38,38,0.4)",
    doneCard:    "rgba(0,0,0,0.03)",
    doneBorder:  "rgba(0,0,0,0.07)",
    statBar:     "#e2e8f0",
    ghostBtn:    { bg:"rgba(0,0,0,0.05)", border:"rgba(0,0,0,0.12)", color:"#475569" },
    select:      { bg:"#ffffff", border:"rgba(0,0,0,0.15)", color:"#0f172a" },
    modalBg:     "#ffffff",
    modalBorder: "rgba(0,0,0,0.12)",
    progressBg:  "#e2e8f0",
    slotEmpty:   "#e2e8f0",
    slotEmptyTxt:"#cbd5e1",
    legend:      "rgba(0,0,0,0.02)",
    legendBorder:"rgba(0,0,0,0.06)",
    tableHead:   "rgba(0,0,0,0.04)",
    tableRow:    "rgba(0,0,0,0.02)",
    tableRowB:   "rgba(0,0,0,0.03)",
    tableBorder: "rgba(0,0,0,0.08)",
    rowBorder:   "rgba(0,0,0,0.04)",
  },
};

function getTheme(theme) { return THEMES[theme] || THEMES.dark; }

// ── Mobile-first style factory ────────────────────────────────────────────────
function makeS(th) {
  return {
    app:      { minHeight:"100vh", background:th.bg, color:th.text,
                fontFamily:"'Georgia',serif", backgroundImage:th.bgGrad,
                overflowX:"hidden", WebkitTapHighlightColor:"transparent" },
    header:   { background:th.headerBg, padding:"12px 16px",
                borderBottom:`1px solid ${th.headerBorder}`,
                display:"flex", alignItems:"center", justifyContent:"space-between",
                backdropFilter:"blur(8px)", position:"sticky", top:0, zIndex:100 },
    logo:     { fontSize:18, fontWeight:700, letterSpacing:2, textTransform:"uppercase" },
    red:      { color:"#dc2626" },
    badge:    { background:"rgba(220,38,38,0.15)", border:"1px solid rgba(220,38,38,0.3)",
                color:"#fca5a5", borderRadius:4, padding:"2px 8px", fontSize:10, letterSpacing:1 },
    btn:      bg => ({ background:bg, color:"#fff", border:"none", borderRadius:10,
                       padding:"14px 24px", fontSize:15, fontWeight:700, cursor:"pointer",
                       letterSpacing:1, WebkitTapHighlightColor:"transparent",
                       touchAction:"manipulation" }),
    ghostBtn: { background:th.ghostBtn.bg, border:`1px solid ${th.ghostBtn.border}`,
                color:th.ghostBtn.color, borderRadius:6, padding:"6px 10px",
                cursor:"pointer", fontSize:12, touchAction:"manipulation",
                WebkitTapHighlightColor:"transparent" },
  };
}

// ── Reusable small components ─────────────────────────────────────────────────
function StatBar({ label, value, max, color, th }) {
  return (
    <div style={{marginBottom:5}}>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:th.textMuted,marginBottom:2}}>
        <span>{label}</span><span style={{color:th.text,fontWeight:600}}>{value}</span>
      </div>
      <div style={{height:4,background:th.statBar,borderRadius:2}}>
        <div style={{height:"100%",width:`${Math.min(100,(value/max)*100)}%`,
          background:color,borderRadius:2,transition:"width 0.5s"}}/>
      </div>
    </div>
  );
}

function HeaderBar({ left, right }) {
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",
      gap:8,flexWrap:"wrap"}}>
      {left}
      <div style={{display:"flex",gap:6,alignItems:"center",flexShrink:0}}>{right}</div>
    </div>
  );
}

function LangSelect({ lang, setLang, t, th }) {
  return (
    <select value={lang} onChange={e=>setLang(e.target.value)} style={{
      background:th.select.bg, border:`1px solid ${th.select.border}`,
      color:th.select.color, borderRadius:6, padding:"5px 6px",
      fontSize:13, cursor:"pointer", outline:"none", touchAction:"manipulation",
    }}>
      <option value="en">🇬🇧</option>
      <option value="fr">🇫🇷</option>
      <option value="es">🇪🇸</option>
    </select>
  );
}

function ThemeToggle({ theme, setTheme, t, th }) {
  return (
    <button onClick={()=>setTheme(theme==="dark"?"light":"dark")} style={{
      background:th.ghostBtn.bg, border:`1px solid ${th.ghostBtn.border}`,
      color:th.ghostBtn.color, borderRadius:6, padding:"5px 8px",
      fontSize:14, cursor:"pointer", touchAction:"manipulation",
    }}>
      {theme==="dark"?"☀️":"🌙"}
    </button>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// INTRO — full screen, vertical, mobile-optimized
// ══════════════════════════════════════════════════════════════════════════════
function IntroPhase({ onStart, lang, setLang, theme, setTheme, showHtp, showFeedback }) {
  const t = T[lang];
  const th = getTheme(theme);
  const S = makeS(th);
  const [mode, setMode]   = useState("classic");
  const [tab,  setTab]    = useState("play");    // play | leaderboard
  const [board, setBoard] = useState([]);
  const [lbLoading, setLbLoading] = useState(false);
  const [lbError,   setLbError]   = useState(null);

  async function loadBoard() {
    setLbLoading(true);
    setLbError(null);
    try {
      const rows = await lbGetTop(20);
      setBoard(rows || []);
    } catch(e) {
      setLbError(e.message);
    }
    setLbLoading(false);
  }

  // Load leaderboard when tab is selected
  function switchTab(t) {
    setTab(t);
    if (t === "leaderboard" && board.length === 0 && !lbLoading) loadBoard();
  }

  function medal(i) {
    return i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i+1}`;
  }

  return (
    <div style={S.app}>
      {/* Header */}
      <div style={S.header}>
        <div style={S.logo}>The <span style={S.red}>Lineup</span></div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <LangSelect lang={lang} setLang={setLang} t={t} th={th}/>
          <ThemeToggle theme={theme} setTheme={setTheme} t={t} th={th}/>
          <button onClick={showHtp} style={{...S.ghostBtn,fontSize:13,padding:"5px 8px"}}>❓</button>
            <button onClick={showFeedback} style={{...S.ghostBtn, fontSize:13}}>💬</button>
            <a href="https://ie.linkedin.com/in/nathan-br%C3%A8s/en" target="_blank" rel="noopener noreferrer" style={{...S.ghostBtn, fontSize:11, fontWeight:700, textDecoration:"none", display:"inline-flex", alignItems:"center", padding:"5px 8px"}}>in</a>
        </div>
      </div>

      {/* Tab switcher */}
      <div style={{display:"flex",gap:0,borderBottom:`1px solid ${th.cardBorder}`,
        background:th.headerBg,backdropFilter:"blur(8px)"}}>
        {[["play","⚾ Play"],["leaderboard",`🌍 ${t.lbTitle}`]].map(([key,label])=>(
          <button key={key} onClick={()=>switchTab(key)} style={{
            flex:1,padding:"12px 8px",border:"none",
            background:"transparent",
            color:tab===key?"#dc2626":th.textMuted,
            fontSize:13,fontWeight:tab===key?700:400,
            borderBottom:tab===key?"2px solid #dc2626":"2px solid transparent",
            cursor:"pointer",touchAction:"manipulation",transition:"all 0.15s",
          }}>{label}</button>
        ))}
      </div>

      {/* ── PLAY TAB ── */}
      {tab === "play" && (
        <div style={{padding:"32px 20px 80px",maxWidth:480,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:28}}>
            <div style={{fontSize:56,marginBottom:8}}>⚾</div>
            <div style={{fontSize:28,fontWeight:700,lineHeight:1.2,marginBottom:10}}>
              Build the Perfect<br/><span style={{color:"#dc2626"}}>Lineup</span>
            </div>
            <div style={{fontSize:14,color:th.textMuted,lineHeight:1.7}}>
              {t.introPara}
            </div>
          </div>

          {/* Mode selector */}
          <div style={{marginBottom:24}}>
            <div style={{fontSize:11,letterSpacing:2,color:th.textDim,marginBottom:10}}>{t.chooseMode}</div>
            {[["classic",t.modeClassic,t.modeClassicDesc],["scout",t.modeScout,t.modeScoutDesc]].map(([val,label,desc])=>(
              <div key={val} onClick={()=>setMode(val)} style={{
                display:"flex",alignItems:"center",gap:12,padding:"14px 16px",
                borderRadius:12,marginBottom:10,cursor:"pointer",
                background:mode===val?th.activeCard:th.card,
                border:`2px solid ${mode===val?th.activeB:th.cardBorder}`,
                transition:"all 0.2s",touchAction:"manipulation",
              }}>
                <div style={{fontSize:22}}>{label.split(" ")[0]}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600,fontSize:15,color:th.text}}>{label.slice(3)}</div>
                  <div style={{fontSize:13,color:th.textDim,marginTop:2}}>{desc}</div>
                </div>
                <div style={{width:22,height:22,borderRadius:11,border:`2px solid ${mode===val?"#dc2626":th.cardBorder}`,
                  background:mode===val?"#dc2626":"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  {mode===val&&<div style={{width:8,height:8,borderRadius:4,background:"#fff"}}/>}
                </div>
              </div>
            ))}
          </div>

          <button onClick={()=>onStart(mode)} style={{
            ...S.btn("linear-gradient(135deg,#dc2626,#991b1b)"),
            width:"100%",fontSize:17,padding:"16px",borderRadius:12,
          }}>{t.playBall}</button>

          {/* Disclaimer */}
          <div style={{marginTop:20,textAlign:"center",fontSize:10,
            color:th.textGhost,lineHeight:1.6,padding:"0 8px"}}>
            This is an independent fan project. Not affiliated with, endorsed by,
            or connected to Major League Baseball (MLB) or any of its teams.
            Player stats sourced from public historical records.
          </div>
        </div>
      )}

      {/* ── LEADERBOARD TAB ── */}
      {tab === "leaderboard" && (
        <div style={{padding:"16px 14px 90px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div style={{fontSize:13,fontWeight:700,color:th.textDim,letterSpacing:1}}>
              {t.lbTitle}
            </div>
            <button onClick={loadBoard} style={{
              ...S.ghostBtn, fontSize:11,
            }}>{t.lbRefresh}</button>
          </div>

          {lbLoading ? (
            <div style={{textAlign:"center",padding:"48px 0",color:th.textDim}}>
              <div style={{fontSize:32,marginBottom:10,
                display:"inline-block",animation:"spin 0.8s linear infinite"}}>⚾</div>
              <div style={{fontSize:13,letterSpacing:1}}>{t.loading}</div>
              <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
            </div>
          ) : lbError ? (
            <div style={{textAlign:"center",padding:"40px 16px"}}>
              <div style={{fontSize:32,marginBottom:10}}>⚠️</div>
              <div style={{fontSize:13,color:"#f87171",marginBottom:16}}>{lbError}</div>
              <button onClick={loadBoard} style={{
                padding:"10px 20px",borderRadius:8,border:"none",
                background:"#dc2626",color:"#fff",cursor:"pointer",fontSize:13,
              }}>{t.lbRetry}</button>
            </div>
          ) : board.length === 0 ? (
            <div style={{textAlign:"center",padding:"60px 0",color:th.textMuted}}>
              <div style={{fontSize:40,marginBottom:12}}>🏆</div>
              <div style={{fontSize:14}}>{t.lbEmpty}</div>
            </div>
          ) : (
            <div style={{display:"flex",flexDirection:"column",gap:7}}>
              {board.map((row,i) => {
                const players = (() => { try { return JSON.parse(row.lineup); } catch { return []; } })();
                return (
                  <div key={row.id} style={{
                    display:"flex",alignItems:"center",gap:10,
                    padding:"11px 12px",borderRadius:12,
                    background:i<3?"rgba(251,191,36,0.06)":th.card,
                    border:`1px solid ${i<3?"rgba(251,191,36,0.2)":th.cardBorder}`,
                  }}>
                    <div style={{minWidth:34,textAlign:"center",
                      fontSize:i<3?20:13,fontWeight:700,
                      color:i===0?"#fbbf24":i===1?"#9ca3af":i===2?"#b45309":th.textDim}}>
                      {medal(i)}
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontWeight:700,fontSize:14,color:th.text}}>{row.name}</div>
                      <div style={{fontSize:10,color:th.textFaint,marginTop:2,
                        whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
                        {players.map(p=>`${p.pos} ${p.name.split(" ").pop()}`).join(" · ")}
                      </div>
                    </div>
                    <div style={{textAlign:"right",flexShrink:0}}>
                      <div style={{fontSize:16,fontWeight:900,color:winColor(row.wins)}}>{row.wins}W</div>
                      <div style={{fontSize:10,color:th.textDim}}>{row.rpg} R/G</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// DRAFT — mobile-first: position header + scrollable player cards (2 columns)
// ══════════════════════════════════════════════════════════════════════════════
function DraftPhase({ mode, lang, setLang, theme, setTheme, showHtp, showFeedback, onComplete }) {
  const t = T[lang];
  const th = getTheme(theme);
  const S = makeS(th);
  const [slotIdx,   setSlotIdx]   = useState(0);
  const [roster,    setRoster]    = useState({});
  const [usedNames, setUsedNames] = useState(new Set());
  const [options,   setOptions]   = useState(null);
  const [fadeIn,    setFadeIn]    = useState(false);

  const key       = ROSTER_KEYS[slotIdx];
  const posGroup  = POS_GROUPS[key];
  const progress  = ((slotIdx) / ROSTER_KEYS.length) * 100;

  useEffect(() => {
    setOptions(null); setFadeIn(false);
    const t1 = setTimeout(() => {
      setOptions(getPlayersForSlot(posGroup, usedNames));
      setTimeout(() => setFadeIn(true), 40);
    }, 500);
    return () => clearTimeout(t1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slotIdx]);

  function selectPlayer(player) {
    const era = getEra(player.name);
    const newRoster  = {...roster, [key]: {...player, era}};
    const newUsed    = new Set([...usedNames, player.name]);
    setRoster(newRoster); setUsedNames(newUsed);
    if (slotIdx+1 >= ROSTER_KEYS.length) onComplete(newRoster);
    else setSlotIdx(slotIdx+1);
  }

  // Progress indicator: dot row (fully visible, no scroll)
  const rosterStrip = (
    <div style={{padding:"8px 16px 6px",borderBottom:`1px solid ${th.cardBorder}`}}>
      {/* Dot row */}
      <div style={{display:"flex",alignItems:"center",gap:0,marginBottom:5}}>
        {ROSTER_KEYS.map((k,i) => {
          const active = i === slotIdx;
          const done   = i < slotIdx;
          return (
            <React.Fragment key={k}>
              {/* Connector line */}
              {i > 0 && (
                <div style={{flex:1,height:2,
                  background: done ? "#22c55e" : th.cardBorder,
                  transition:"background 0.3s"}}/>
              )}
              {/* Dot */}
              <div style={{
                width: active ? 28 : 20, height: active ? 28 : 20,
                borderRadius:"50%",
                background: active ? "#dc2626" : done ? "#22c55e" : th.card,
                border: `2px solid ${active ? "#dc2626" : done ? "#22c55e" : th.cardBorder}`,
                display:"flex",alignItems:"center",justifyContent:"center",
                transition:"all 0.3s",flexShrink:0,
                boxShadow: active ? "0 0 0 3px rgba(220,38,38,0.25)" : "none",
              }}>
                {done
                  ? <span style={{fontSize:10,color:"#fff",fontWeight:700}}>✓</span>
                  : <span style={{fontSize:8,color:active?"#fff":th.textFaint,fontWeight:700}}>{k}</span>
                }
              </div>
            </React.Fragment>
          );
        })}
      </div>
      {/* Position labels */}
      <div style={{display:"flex",alignItems:"center",gap:0}}>
        {ROSTER_KEYS.map((k,i) => {
          const active = i === slotIdx;
          const done   = i < slotIdx;
          return (
            <React.Fragment key={k}>
              {i > 0 && <div style={{flex:1}}/>}
              <div style={{
                width:20,textAlign:"center",
                fontSize:8,fontWeight:active?700:400,
                color:active?"#dc2626":done?"#22c55e":th.textGhost,
                transition:"color 0.3s",
              }}>{k}</div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );

  return (
    <div style={S.app}>
      {/* Header */}
      <div style={{...S.header,flexDirection:"column",gap:0,padding:0}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",
          padding:"10px 16px",width:"100%",boxSizing:"border-box"}}>
          <div style={S.logo}>The <span style={S.red}>Lineup</span></div>
          <div style={{display:"flex",gap:6,alignItems:"center"}}>
            <LangSelect lang={lang} setLang={setLang} t={t} th={th}/>
            <ThemeToggle theme={theme} setTheme={setTheme} t={t} th={th}/>
            <button onClick={showHtp} style={{...S.ghostBtn,fontSize:13}}>❓</button>
            <button onClick={showFeedback} style={{...S.ghostBtn, fontSize:13}}>💬</button>
            <div style={S.badge}>{mode==="scout"?"SCOUT":"PRO"}</div>
          </div>
        </div>
        {/* Progress bar */}
        <div style={{height:3,background:th.progressBg,width:"100%"}}>
          <div style={{height:"100%",width:`${progress}%`,background:"#dc2626",transition:"width 0.4s"}}/>
        </div>
        {/* Roster strip */}
        {rosterStrip}
      </div>

      {/* Current position header */}
      <div style={{padding:"12px 16px",background:th.card,
        borderBottom:`1px solid ${th.cardBorder}`}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{fontSize:32}}>{t.posIcons[key]}</div>
          <div>
            <div style={{fontSize:18,fontWeight:700,color:th.text}}>{t.posNames[key]}</div>
            <div style={{fontSize:12,color:th.textMuted}}>
              {t.tipLabel} <span style={{color:"#fbbf24"}}>{t.posTips[key]}</span>
              <span style={{color:th.textDim}}> · {t.allEras}</span>
            </div>
          </div>
          <div style={{marginLeft:"auto",fontSize:13,fontWeight:700,color:"#dc2626"}}>
            {slotIdx+1}/9
          </div>
        </div>
      </div>

      {/* Player cards — 2-column grid, scrollable */}
      <div style={{padding:"12px 12px 80px",overflowY:"auto"}}>
        {!options ? (
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",
            justifyContent:"center",padding:"60px 0",gap:12}}>
            <div style={{fontSize:36,animation:"spin 0.7s linear infinite"}}>⚾</div>
            <div style={{fontSize:13,color:th.textFaint,letterSpacing:2}}>{t.loading}</div>
            <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
          </div>
        ) : (
          <div style={{
            display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,
            opacity:fadeIn?1:0,transform:fadeIn?"translateY(0)":"translateY(10px)",
            transition:"opacity 0.3s,transform 0.3s",
          }}>
            {options.map((player,i) => {
              const era = getEra(player.name);
              return (
                <div key={i} onClick={()=>selectPlayer(player)} style={{
                  background:th.card,border:`1px solid ${th.cardBorder}`,
                  borderRadius:12,padding:"14px 12px",cursor:"pointer",
                  touchAction:"manipulation",WebkitTapHighlightColor:"rgba(220,38,38,0.1)",
                  transition:"transform 0.1s, border-color 0.1s",
                  active:{transform:"scale(0.97)"},
                }}>
                  {/* Era badge */}
                  <div style={{fontSize:10,color:"#fbbf24",fontWeight:700,
                    letterSpacing:1,marginBottom:2}}>{era}</div>
                  {/* Position */}
                  <div style={{fontSize:10,color:th.textDim,marginBottom:4}}>{player.pos}</div>
                  {/* Name */}
                  <div style={{fontSize:14,fontWeight:700,lineHeight:1.3,
                    marginBottom:10,color:th.text,minHeight:38}}>{player.name}</div>
                  {/* Stats or hidden */}
                  {mode==="classic" ? (
                    <div>
                      <StatBar label="OBP" value={fmt3(player.obp)} max={0.55} color="#3b82f6" th={th}/>
                      <StatBar label="SLG" value={fmt3(player.slg)} max={0.75} color="#dc2626" th={th}/>
                      <StatBar label="AVG" value={fmt3(player.avg)} max={0.40} color="#22c55e" th={th}/>
                      <StatBar label="BB%" value={player.bbRate} max={22} color="#a78bfa" th={th}/>
                      <StatBar label="SB"  value={Math.min(player.sb,500)} max={500} color="#f59e0b" th={th}/>
                    </div>
                  ) : (
                    <div style={{fontSize:12,color:th.textFaint,fontStyle:"italic",
                      textAlign:"center",padding:"8px 0"}}>{t.statsHidden}</div>
                  )}
                  {/* Draft button */}
                  <button style={{
                    width:"100%",marginTop:10,padding:"10px 0",
                    background:"linear-gradient(135deg,#dc2626,#991b1b)",
                    color:"#fff",border:"none",borderRadius:8,
                    fontSize:13,fontWeight:700,cursor:"pointer",
                    touchAction:"manipulation",letterSpacing:1,
                  }}>{t.draftBtn}</button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ORDER — mobile touch reorder
// Tap ↑↓ arrows OR tap a player then tap another to swap
// Long-press visual feedback for selection
// ══════════════════════════════════════════════════════════════════════════════
function OrderPhase({ roster, mode, lang, setLang, theme, setTheme, showHtp, showFeedback, onComplete }) {
  const t = T[lang];
  const th = getTheme(theme);
  const S = makeS(th);

  const [order,    setOrder]    = useState(ROSTER_KEYS.map(k => roster[k]));
  const [selected, setSelected] = useState(null); // selected slot index

  function tap(i) {
    if (selected === null) {
      setSelected(i);
    } else if (selected === i) {
      setSelected(null);
    } else {
      const o = [...order];
      [o[selected], o[i]] = [o[i], o[selected]];
      setOrder(o);
      setSelected(null);
    }
  }

  function move(i, dir) {
    const ni = i + dir;
    if (ni < 0 || ni >= order.length) return;
    const o = [...order];
    [o[i], o[ni]] = [o[ni], o[i]];
    setOrder(o);
    if (selected === i) setSelected(ni);
  }

  return (
    <div style={S.app}>
      {/* Header */}
      <div style={{...S.header, padding:"10px 16px"}}>
        <div style={S.logo}>The <span style={S.red}>Lineup</span></div>
        <div style={{display:"flex", gap:6, alignItems:"center"}}>
          <LangSelect lang={lang} setLang={setLang} t={t} th={th}/>
          <ThemeToggle theme={theme} setTheme={setTheme} t={t} th={th}/>
          <button onClick={showHtp} style={{...S.ghostBtn, fontSize:13}}>❓</button>
            <button onClick={showFeedback} style={{...S.ghostBtn, fontSize:13}}>💬</button>
        </div>
      </div>
      <div style={{height:3, background:"#dc2626"}}/>

      <div style={{padding:"14px 12px 150px"}}>

        {/* Instruction banner */}
        <div style={{
          textAlign:"center", marginBottom:14, padding:"10px 14px",
          background: selected !== null ? "rgba(220,38,38,0.12)" : th.card,
          border: `1px solid ${selected !== null ? "rgba(220,38,38,0.4)" : th.cardBorder}`,
          borderRadius:10, transition:"all 0.2s",
        }}>
          <div style={{fontSize:12, fontWeight:700, color: selected !== null ? "#dc2626" : th.textDim, letterSpacing:1}}>
            {t.phase2Title}
          </div>
          <div style={{fontSize:12, color: th.textMuted, marginTop:3}}>
            {selected !== null
              ? `⚡ ${order[selected]?.name} — tap another slot to swap`
              : "Tap a player to select · ↑↓ to move"}
          </div>
        </div>

        {/* Slots */}
        <div style={{display:"flex", flexDirection:"column", gap:7}}>
          {order.map((player, i) => {
            const isSel = selected === i;
            const isSwapTarget = selected !== null && selected !== i;
            return (
              <div key={i} style={{
                display:"flex", alignItems:"stretch",
                borderRadius:12, overflow:"hidden",
                border:`2px solid ${isSel ? "#dc2626" : isSwapTarget ? "rgba(220,38,38,0.3)" : th.cardBorder}`,
                background: isSel ? "rgba(220,38,38,0.08)" : th.card,
                transition:"all 0.15s", cursor:"pointer",
                boxShadow: isSel ? "0 0 0 3px rgba(220,38,38,0.15)" : "none",
              }}>

                {/* Slot number — tap to select/swap */}
                <div onClick={() => tap(i)} style={{
                  minWidth:50, display:"flex", flexDirection:"column",
                  alignItems:"center", justifyContent:"center",
                  padding:"10px 4px",
                  background: isSel ? "rgba(220,38,38,0.2)" : th.tableHead,
                  borderRight:`1px solid ${th.cardBorder}`,
                  touchAction:"manipulation",
                }}>
                  <div style={{fontSize:22, fontWeight:900, color:"#dc2626", lineHeight:1}}>{i+1}</div>
                  <div style={{fontSize:9, color: isSel ? "#dc2626" : th.textFaint, marginTop:2, textAlign:"center"}}>
                    {t.slotRoles[i]}
                  </div>
                  {isSel && <div style={{fontSize:11, marginTop:3}}>✓</div>}
                </div>

                {/* Player info — tap to select/swap */}
                <div onClick={() => tap(i)} style={{
                  flex:1, padding:"10px 12px", minWidth:0,
                  touchAction:"manipulation",
                }}>
                  <div style={{fontWeight:700, fontSize:15, color:th.text,
                    whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>
                    {player.name}
                  </div>
                  <div style={{fontSize:11, color:th.textDim, marginTop:2}}>
                    <span style={{fontFamily:"monospace"}}>{player.pos}</span>
                    {" · "}<span style={{color:"#fbbf24"}}>{player.era}</span>
                  </div>
                  {mode === "classic" && (
                    <div style={{fontSize:11, color:th.textMuted, marginTop:3, display:"flex", gap:8}}>
                      <span>OBP <span style={{color:"#3b82f6", fontWeight:600}}>{fmt3(player.obp)}</span></span>
                      <span>SLG <span style={{color:"#dc2626", fontWeight:600}}>{fmt3(player.slg)}</span></span>
                      <span>AVG <span style={{color:"#22c55e", fontWeight:600}}>{fmt3(player.avg)}</span></span>
                    </div>
                  )}
                </div>

                {/* Role hint */}
                <div style={{display:"flex", flexDirection:"column", alignItems:"center",
                  justifyContent:"center", padding:"0 6px",
                  borderLeft:`1px solid ${th.cardBorder}`, minWidth:28}}>
                  <div style={{fontSize:15}}>{t.slotIcons[i]}</div>
                </div>

                {/* Up/Down arrows */}
                <div style={{display:"flex", flexDirection:"column",
                  borderLeft:`1px solid ${th.cardBorder}`}}>
                  <button onClick={e=>{e.stopPropagation(); move(i,-1);}} disabled={i===0}
                    style={{
                      flex:1, width:40, border:"none",
                      background: i===0 ? "transparent" : th.doneCard,
                      color: i===0 ? th.textGhost : th.text,
                      fontSize:16, cursor: i===0 ? "default" : "pointer",
                      borderBottom:`1px solid ${th.cardBorder}`,
                      touchAction:"manipulation",
                      display:"flex", alignItems:"center", justifyContent:"center",
                    }}>↑</button>
                  <button onClick={e=>{e.stopPropagation(); move(i,1);}} disabled={i===order.length-1}
                    style={{
                      flex:1, width:40, border:"none",
                      background: i===order.length-1 ? "transparent" : th.doneCard,
                      color: i===order.length-1 ? th.textGhost : th.text,
                      fontSize:16, cursor: i===order.length-1 ? "default" : "pointer",
                      touchAction:"manipulation",
                      display:"flex", alignItems:"center", justifyContent:"center",
                    }}>↓</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fixed bottom CTA — sits above the donate bar (~60px) */}
      <div style={{
        position:"fixed", bottom:"calc(60px + env(safe-area-inset-bottom))", left:0, right:0,
        padding:"10px 16px",
        background: th.headerBg, backdropFilter:"blur(12px)",
        borderTop:`1px solid ${th.cardBorder}`,
        zIndex:150,
      }}>
        <button onClick={() => onComplete(order)} style={{
          ...S.btn("linear-gradient(135deg,#dc2626,#991b1b)"),
          width:"100%", fontSize:16, padding:"15px", borderRadius:12,
        }}>{t.simulateBtn}</button>
      </div>
    </div>
  );
}


// ── Hall of Fame (localStorage) ──────────────────────────────────────────────
const HOF_KEY = "thelineup_hof";

function hofLoad() {
  try {
    const data = localStorage.getItem(HOF_KEY);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
}

function hofSave(entries) {
  try { localStorage.setItem(HOF_KEY, JSON.stringify(entries)); } catch {}
}

function hofAdd(lineup, simResult) {
  const entries = hofLoad();
  const entry = {
    date: new Date().toLocaleDateString(),
    wins: simResult.wins,
    rpg: simResult.rpg,
    players: lineup.map(p => ({ name: p.name, pos: p.pos, era: p.era })),
  };
  // Keep only top 5 by wins
  entries.push(entry);
  entries.sort((a, b) => b.wins - a.wins);
  const top5 = entries.slice(0, 5);
  hofSave(top5);
  return top5;
}

// ══════════════════════════════════════════════════════════════════════════════
// RESULT — share + anecdote + hall of fame + stats
// ══════════════════════════════════════════════════════════════════════════════
function ResultPhase({ lineup, simResult, lang, setLang, theme, setTheme, showHtp, showFeedback, onRestart }) {
  const t   = T[lang];
  const th  = getTheme(theme);
  const S   = makeS(th);
  const [tab,       setTab]       = useState("leaders");
  const [copied,    setCopied]    = useState(false);
  const [hofList,   setHofList]   = useState(() => hofLoad());
  const [hofSaved,  setHofSaved]  = useState(false);
  const [anecdote]                = useState(() => getAnecdote(lineup, lang));
  const [showLb,    setShowLb]    = useState(false);

  if (!lineup || !simResult) return null;

  const wc      = winColor(simResult.wins);
  const ps      = simResult.playerStats || [];
  const maxHR   = ps.length ? Math.max(...ps.map(x=>x.HR)) : 0;
  const maxR    = ps.length ? Math.max(...ps.map(x=>x.R))  : 0;

  const leaders = (t.leaders||[]).map(ld => {
    const best = ps.reduce((acc,p) =>
      (parseFloat(p[ld.key])||0) > (parseFloat(acc[ld.key])||0) ? p : acc,
      ps[0]||{});
    return {...ld, player:best, value: best?best[ld.key]:"—"};
  });

  // ── Share ──────────────────────────────────────────────────────────────────
  function handleShare() {
    const label = winLabel(simResult.wins, t).replace(/[🏆🔥✅⚠️❌]/g,"").trim();
    const lines = [
      `⚾ The Lineup — ${simResult.wins}-${162-simResult.wins}`,
      `${simResult.rpg} runs/game · ${label}`,
      ``,
      ...lineup.map((p,i) => `${i+1}. ${p.name} (${p.pos})`),
      ``,
      `🔗 https://the-lineup-nu.vercel.app`,
    ];
    const text = lines.join("\n");
    if (navigator.share) {
      navigator.share({ title: t.shareTitle, text }).catch(()=>{});
    } else {
      navigator.clipboard?.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  }

  // ── Save to HoF ────────────────────────────────────────────────────────────
  function handleHofSave() {
    const updated = hofAdd(lineup, simResult);
    setHofList(updated);
    setHofSaved(true);
    setTimeout(() => setHofSaved(false), 2000);
  }

  return (
    <div style={S.app}>
      {showLb && (
        <LeaderboardScreen
          t={t} th={th}
          wins={simResult.wins}
          rpg={simResult.rpg}
          lineup={lineup}
          onClose={()=>setShowLb(false)}
        />
      )}
      {/* Header */}
      <div style={{...S.header, padding:"10px 16px"}}>
        <div style={S.logo}>The <span style={S.red}>Lineup</span></div>
        <div style={{display:"flex", gap:6, alignItems:"center"}}>
          <LangSelect lang={lang} setLang={setLang} t={t} th={th}/>
          <ThemeToggle theme={theme} setTheme={setTheme} t={t} th={th}/>
          <button onClick={showHtp} style={{...S.ghostBtn, fontSize:13}}>❓</button>
            <button onClick={showFeedback} style={{...S.ghostBtn, fontSize:13}}>💬</button>
          <button onClick={onRestart} style={{...S.ghostBtn, fontSize:12}}>{t.newGame}</button>
        </div>
      </div>

      <div style={{padding:"16px 14px 90px"}}>

        {/* ── Win/Loss hero ── */}
        <div style={{textAlign:"center", marginBottom:16}}>
          <div style={{fontSize:11, letterSpacing:3, color:th.textDim, marginBottom:4}}>
            {t.resultTitle}
          </div>
          <div style={{fontSize:70, fontWeight:900, color:wc, lineHeight:1, letterSpacing:-2}}>
            {simResult.wins}
            <span style={{fontSize:20, color:th.textFaint, letterSpacing:0}}>
              -{162-simResult.wins}
            </span>
          </div>
          <div style={{fontSize:13, color:th.textMuted, marginTop:4}}>
            {simResult.rpg} {t.rpgLabel}
          </div>
          <div style={{fontSize:15, color:wc, fontWeight:700, marginTop:6}}>
            {winLabel(simResult.wins, t)}
          </div>
        </div>

        {/* ── Action buttons: Share + Save + Leaderboard ── */}
        <div style={{display:"flex", gap:8, marginBottom:16, flexWrap:"wrap"}}>
          <button onClick={handleShare} style={{
            flex:1, padding:"11px 0", borderRadius:10, border:"none", cursor:"pointer",
            background:"linear-gradient(135deg,#1d4ed8,#1e40af)",
            color:"#fff", fontSize:13, fontWeight:700, touchAction:"manipulation",
            minWidth:100,
          }}>
            {copied ? t.shareCopied : t.shareBtn}
          </button>
          <button onClick={()=>setShowLb(true)} style={{
            flex:1, padding:"11px 0", borderRadius:10, border:"none", cursor:"pointer",
            background:"linear-gradient(135deg,#f59e0b,#d97706)",
            color:"#fff", fontSize:13, fontWeight:700, touchAction:"manipulation",
            minWidth:100,
          }}>
            {t.lbTab}
          </button>
          <button onClick={handleHofSave} style={{
            flex:1, padding:"11px 0", borderRadius:10, cursor:"pointer",
            background: hofSaved ? "rgba(34,197,94,0.15)" : th.card,
            border: `1px solid ${hofSaved ? "#22c55e" : th.cardBorder}`,
            color: hofSaved ? "#22c55e" : th.textMuted,
            fontSize:13, fontWeight:700, touchAction:"manipulation",
            minWidth:100,
          }}>
            {hofSaved ? t.hofSaved : t.hofSave}
          </button>
        </div>

        {/* ── Anecdote ── */}
        {anecdote && (
          <div style={{
            marginBottom:16, padding:"12px 14px",
            background:"rgba(251,191,36,0.07)",
            border:"1px solid rgba(251,191,36,0.25)",
            borderRadius:12, borderLeft:"3px solid #fbbf24",
          }}>
            <div style={{fontSize:10, fontWeight:700, color:"#fbbf24",
              letterSpacing:1, marginBottom:5}}>{t.anecdoteTitle} — {anecdote.name}</div>
            <div style={{fontSize:13, color:th.textMuted, lineHeight:1.6}}>
              {anecdote.text}
            </div>
          </div>
        )}

        {/* ── Hall of Fame ── */}
        {hofList.length > 0 && (
          <div style={{marginBottom:16}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8}}>
              <div style={{fontSize:12, fontWeight:700, color:th.textDim, letterSpacing:1}}>{t.hofTitle}</div>
              <button onClick={()=>{ hofSave([]); setHofList([]); }} style={{
                background:"transparent", border:"none", color:th.textFaint,
                fontSize:11, cursor:"pointer", touchAction:"manipulation",
              }}>{t.hofClear}</button>
            </div>
            <div style={{display:"flex", flexDirection:"column", gap:6}}>
              {hofList.map((entry, i) => (
                <div key={i} style={{
                  display:"flex", alignItems:"center", gap:10,
                  padding:"10px 12px", borderRadius:10,
                  background: i===0 ? "rgba(251,191,36,0.08)" : th.card,
                  border:`1px solid ${i===0 ? "rgba(251,191,36,0.3)" : th.cardBorder}`,
                }}>
                  <div style={{fontSize:18, flexShrink:0}}>
                    {i===0?"🥇":i===1?"🥈":i===2?"🥉":"⚾"}
                  </div>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{display:"flex", gap:8, alignItems:"baseline"}}>
                      <span style={{fontSize:17, fontWeight:900,
                        color: winColor(entry.wins)}}>{entry.wins}W</span>
                      <span style={{fontSize:11, color:th.textDim}}>{entry.rpg} R/G</span>
                      <span style={{fontSize:10, color:th.textFaint, marginLeft:"auto"}}>{entry.date}</span>
                    </div>
                    <div style={{fontSize:11, color:th.textMuted, marginTop:2,
                      whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>
                      {entry.players.map(p=>p.name).join(" · ")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Tab bar ── */}
        <div style={{display:"flex", gap:4, marginBottom:12,
          background:th.tableHead, borderRadius:10, padding:4}}>
          {[["leaders","🏆"],["season","📊"],["career","📋"]].map(([key,icon])=>(
            <button key={key} onClick={()=>setTab(key)} style={{
              flex:1, padding:"9px 4px", borderRadius:8, border:"none",
              background:tab===key?"#dc2626":"transparent",
              color:tab===key?"#fff":th.textMuted,
              fontSize:12, fontWeight:tab===key?700:400,
              cursor:"pointer", touchAction:"manipulation", transition:"all 0.15s",
            }}>{icon} {key==="leaders"?t.tabLeaders:key==="season"?t.tabSeason:t.tabCareer}</button>
          ))}
        </div>

        {/* ── LEADERS ── */}
        {tab==="leaders" && ps.length>0 && (
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8}}>
            {leaders.map((ld,i)=>(
              <div key={i} style={{
                background:th.card, border:`1px solid ${th.cardBorder}`,
                borderRadius:12, padding:"11px", borderTop:`3px solid ${ld.color}`,
              }}>
                <div style={{display:"flex", alignItems:"center", gap:5, marginBottom:5}}>
                  <span style={{fontSize:16}}>{ld.icon}</span>
                  <span style={{fontSize:9, color:th.textDim, letterSpacing:1, fontWeight:600}}>
                    {ld.label.toUpperCase()}
                  </span>
                </div>
                <div style={{fontSize:22, fontWeight:900, color:ld.color, lineHeight:1, marginBottom:3}}>
                  {ld.value}
                </div>
                <div style={{fontSize:12, fontWeight:600, color:th.text,
                  whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>
                  {ld.player?.name||"—"}
                </div>
                <div style={{fontSize:10, color:th.textDim}}>
                  {ld.player?.pos} · {ld.player?.era}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── SEASON STATS ── */}
        {tab==="season" && ps.length>0 && (
          <div style={{overflowX:"auto", WebkitOverflowScrolling:"touch"}}>
            <table style={{width:"100%", borderCollapse:"collapse", fontSize:12}}>
              <thead>
                <tr style={{background:th.tableHead}}>
                  {["#","PLAYER","R","H","HR","RBI","SB","AVG"].map(h=>(
                    <th key={h} style={{padding:"7px 6px", textAlign:h==="PLAYER"?"left":"center",
                      color:th.textDim, fontWeight:600, fontSize:10, whiteSpace:"nowrap",
                      borderBottom:`1px solid ${th.tableBorder}`}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ps.map((p,i)=>(
                  <tr key={i} style={{borderBottom:`1px solid ${th.rowBorder}`}}>
                    <td style={{padding:"7px 6px", color:"#dc2626", fontWeight:700, textAlign:"center"}}>{i+1}</td>
                    <td style={{padding:"7px 6px"}}>
                      <div style={{fontWeight:600, color:th.text, whiteSpace:"nowrap"}}>{p.name}</div>
                      <div style={{fontSize:10, color:"#fbbf24"}}>{p.era}</div>
                    </td>
                    <td style={{padding:"7px 6px", textAlign:"center",
                      color:p.R===maxR?"#22c55e":th.textMuted,
                      fontWeight:p.R===maxR?700:400}}>{p.R}</td>
                    <td style={{padding:"7px 6px", textAlign:"center", color:th.textMuted}}>{p.H}</td>
                    <td style={{padding:"7px 6px", textAlign:"center",
                      color:p.HR===maxHR?"#dc2626":th.textMuted,
                      fontWeight:p.HR===maxHR?700:400}}>{p.HR}</td>
                    <td style={{padding:"7px 6px", textAlign:"center", color:th.textMuted}}>{p.RBI}</td>
                    <td style={{padding:"7px 6px", textAlign:"center", color:"#22c55e", fontFamily:"monospace"}}>{p.SB}</td>
                    <td style={{padding:"7px 6px", textAlign:"center", color:"#a78bfa", fontFamily:"monospace"}}>{p.AVG}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── CAREER STATS ── */}
        {tab==="career" && (
          <div style={{overflowX:"auto", WebkitOverflowScrolling:"touch"}}>
            <table style={{width:"100%", borderCollapse:"collapse", fontSize:12}}>
              <thead>
                <tr style={{background:th.tableHead}}>
                  {["#","PLAYER","OBP","SLG","AVG"].map(h=>(
                    <th key={h} style={{padding:"7px 6px", textAlign:h==="PLAYER"?"left":"center",
                      color:th.textDim, fontWeight:600, fontSize:10, whiteSpace:"nowrap",
                      borderBottom:`1px solid ${th.tableBorder}`}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lineup.map((p,i)=>(
                  <tr key={i} style={{borderBottom:`1px solid ${th.rowBorder}`}}>
                    <td style={{padding:"7px 6px", color:"#dc2626", fontWeight:700, textAlign:"center"}}>{i+1}</td>
                    <td style={{padding:"7px 6px"}}>
                      <div style={{fontWeight:600, color:th.text, whiteSpace:"nowrap"}}>{p.name}</div>
                      <div style={{fontSize:10, color:"#fbbf24"}}>{p.era} · {p.pos}</div>
                    </td>
                    <td style={{padding:"7px 6px", textAlign:"center", color:"#3b82f6", fontFamily:"monospace"}}>{fmt3(p.obp)}</td>
                    <td style={{padding:"7px 6px", textAlign:"center", color:"#dc2626", fontFamily:"monospace"}}>{fmt3(p.slg)}</td>
                    <td style={{padding:"7px 6px", textAlign:"center", color:"#22c55e", fontFamily:"monospace"}}>{fmt3(p.avg)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <button onClick={onRestart} style={{
          ...S.btn("linear-gradient(135deg,#dc2626,#991b1b)"),
          width:"100%", fontSize:16, padding:"15px", borderRadius:12, marginTop:20,
        }}>{t.playAgain}</button>

      </div>
    </div>
  );
}


// ── Leaderboard screen (arcade style) ────────────────────────────────────────
function LeaderboardScreen({ t, th, wins, rpg, lineup, onClose }) {
  const S = makeS(th);
  const [step,       setStep]       = useState("enter"); // enter | board
  const [name,       setName]       = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [board,      setBoard]      = useState([]);
  const [loading,    setLoading]    = useState(false);
  const [myId,       setMyId]       = useState(null);
  const [error,      setError]      = useState(null);

  // Load leaderboard — returns the rows so caller can use them directly
  async function loadBoard() {
    setLoading(true);
    setError(null);
    try {
      const rows = await lbGetTop(20);
      setBoard(rows || []);
      return rows || [];
    } catch(e) {
      const msg = e.message || "Network error";
      console.error("Load error:", msg);
      setError(msg);
      setBoard([]);
      return [];
    } finally {
      setLoading(false);
    }
  }

  // Submit → switch to board step (loading=true) → fetch → done
  async function handleSubmit() {
    if (!name.trim()) return;
    setSubmitting(true);

    // Switch to board with loading spinner IMMEDIATELY (before any async work)
    setStep("board");
    setLoading(true);

    let insertedId = null;
    try {
      const inserted = await lbInsert(name.trim(), wins, rpg, lineup);
      insertedId = inserted?.id || null;
      setMyId(insertedId);
    } catch(e) {
      console.error("Insert error:", e.message);
      // Continue to show board even if insert failed
    }

    // Small delay to let Supabase commit the insert before we read it back
    await new Promise(r => setTimeout(r, 600));

    try {
      const rows = await lbGetTop(20);
      setBoard(rows || []);
    } catch(e) {
      console.error("Load error:", e.message);
      setError(`Failed to load leaderboard: ${e.message}`);
      setBoard([]);
    }

    setLoading(false);
    setSubmitting(false);
  }

  // Skip — switch to board with spinner immediately
  async function handleSkip() {
    setStep("board");
    await loadBoard();
  }

  function medal(i) {
    return i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i+1}`;
  }

  return (
    <div style={{
      position:"fixed", inset:0, zIndex:800,
      background:"rgba(0,0,0,0.85)", backdropFilter:"blur(6px)",
      display:"flex", alignItems:"flex-end",
    }} onClick={step==="board" && !loading ? onClose : undefined}>
      <div onClick={e=>e.stopPropagation()} style={{
        width:"100%", background:th.modalBg,
        borderRadius:"20px 20px 0 0",
        border:`1px solid ${th.modalBorder}`,
        maxHeight:"90vh", display:"flex", flexDirection:"column",
      }}>
        {/* Handle */}
        <div style={{width:36,height:4,background:th.cardBorder,borderRadius:2,
          margin:"12px auto 0",flexShrink:0}}/>

        {/* Header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",
          padding:"14px 16px 10px",flexShrink:0}}>
          <div style={{fontSize:18,fontWeight:700,color:th.text}}>{t.lbTitle}</div>
          <button onClick={onClose} style={{background:th.card,border:`1px solid ${th.cardBorder}`,
            color:th.textDim,fontSize:18,cursor:"pointer",borderRadius:8,
            width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        </div>

        {/* Your score badge */}
        <div style={{margin:"0 16px 12px",padding:"10px 14px",
          background:"rgba(220,38,38,0.1)",border:"1px solid rgba(220,38,38,0.3)",
          borderRadius:10,display:"flex",alignItems:"center",gap:12,flexShrink:0}}>
          <div style={{fontSize:28,fontWeight:900,color:winColor(wins),lineHeight:1}}>{wins}W</div>
          <div style={{fontSize:13,color:th.textMuted}}>{rpg} runs/game</div>
          <div style={{marginLeft:"auto",fontSize:12,color:th.textDim,overflow:"hidden",textOverflow:"ellipsis",maxWidth:160}}>
            {lineup.slice(0,3).map(p=>p.name.split(" ").pop()).join(" · ")}...
          </div>
        </div>

        {/* ── ENTER NAME ── */}
        {step === "enter" && (
          <div style={{padding:"0 16px 24px",flexShrink:0}}>
            <div style={{fontSize:14,color:th.textMuted,marginBottom:12}}>{t.lbEnterName}</div>
            <input
              value={name}
              onChange={e=>setName(e.target.value.slice(0,15))}
              onKeyDown={e=>e.key==="Enter" && name.trim() && handleSubmit()}
              placeholder={t.lbNamePlaceholder}
              maxLength={15}
              autoFocus
              style={{
                width:"100%",boxSizing:"border-box",
                background:th.card,border:`2px solid ${name?"#dc2626":th.cardBorder}`,
                borderRadius:10,padding:"12px 14px",
                color:th.text,fontSize:16,outline:"none",
                fontFamily:"inherit",marginBottom:10,
                textAlign:"center",letterSpacing:2,fontWeight:700,
              }}
            />
            <div style={{display:"flex",gap:8}}>
              <button onClick={handleSkip} style={{
                flex:1,padding:"12px",borderRadius:10,
                border:`1px solid ${th.cardBorder}`,
                background:th.card,color:th.textMuted,
                fontSize:14,cursor:"pointer",touchAction:"manipulation",
              }}>{t.lbSkip}</button>
              <button onClick={handleSubmit} disabled={!name.trim()||submitting} style={{
                flex:2,padding:"12px",borderRadius:10,border:"none",
                background:name.trim()&&!submitting?"linear-gradient(135deg,#dc2626,#991b1b)":th.card,
                color:name.trim()&&!submitting?"#fff":th.textFaint,
                fontSize:14,fontWeight:700,
                cursor:name.trim()&&!submitting?"pointer":"default",
                touchAction:"manipulation",
              }}>
                {submitting?t.lbSubmitting:t.lbSubmit}
              </button>
            </div>
          </div>
        )}

        {/* ── BOARD ── */}
        {step === "board" && (
          <div style={{overflowY:"auto",flex:1,WebkitOverflowScrolling:"touch",
            padding:"0 12px 32px"}}>
            {loading ? (
              <div style={{textAlign:"center",padding:"48px 0",color:th.textDim}}>
                <div style={{fontSize:32,marginBottom:10,
                  display:"inline-block",animation:"spin 0.8s linear infinite"}}>⚾</div>
                <div style={{fontSize:13,letterSpacing:1}}>{t.loading}</div>
                <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
              </div>
            ) : error ? (
              <div style={{textAlign:"center",padding:"40px 16px"}}>
                <div style={{fontSize:32,marginBottom:10}}>⚠️</div>
                <div style={{fontSize:13,color:"#f87171",marginBottom:16}}>{error}</div>
                <button onClick={loadBoard} style={{
                  padding:"10px 20px",borderRadius:8,border:"none",
                  background:"#dc2626",color:"#fff",cursor:"pointer",fontSize:13,
                }}>{t.lbRetry}</button>
              </div>
            ) : board.length === 0 ? (
              <div style={{textAlign:"center",padding:"40px 0",color:th.textMuted,fontSize:14}}>
                {t.lbEmpty}
              </div>
            ) : (
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                {board.map((row,i) => {
                  const isMe = myId && row.id === myId;
                  const players = (() => { try { return JSON.parse(row.lineup); } catch { return []; } })();
                  return (
                    <div key={row.id} style={{
                      display:"flex",alignItems:"center",gap:10,
                      padding:"10px 12px",borderRadius:12,
                      background:isMe?"rgba(220,38,38,0.1)":i<3?"rgba(251,191,36,0.06)":th.card,
                      border:`1px solid ${isMe?"rgba(220,38,38,0.4)":i<3?"rgba(251,191,36,0.2)":th.cardBorder}`,
                      boxShadow:isMe?"0 0 0 2px rgba(220,38,38,0.2)":"none",
                    }}>
                      <div style={{minWidth:32,textAlign:"center",
                        fontSize:i<3?20:13,fontWeight:700,
                        color:i===0?"#fbbf24":i===1?"#9ca3af":i===2?"#b45309":th.textDim}}>
                        {medal(i)}
                      </div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{display:"flex",alignItems:"center",gap:6}}>
                          <span style={{fontWeight:700,fontSize:14,
                            color:isMe?"#dc2626":th.text}}>{row.name}</span>
                          {isMe&&<span style={{fontSize:10,color:"#dc2626",
                            fontWeight:700,background:"rgba(220,38,38,0.15)",
                            padding:"1px 5px",borderRadius:4}}>{t.lbYou}</span>}
                        </div>
                        <div style={{fontSize:10,color:th.textFaint,marginTop:2,
                          whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
                          {players.map(p=>`${p.pos} ${p.name.split(" ").pop()}`).join(" · ")}
                        </div>
                      </div>
                      <div style={{textAlign:"right",flexShrink:0}}>
                        <div style={{fontSize:16,fontWeight:900,color:winColor(row.wins)}}>{row.wins}W</div>
                        <div style={{fontSize:10,color:th.textDim}}>{row.rpg} R/G</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


// ── DonateBar — fixed bottom strip ───────────────────────────────────────────
function DonateBar({ t, th }) {
  const [visible, setVisible] = React.useState(true);
  if (!visible) return null;
  return (
    <div style={{
      position:"fixed", bottom:0, left:0, right:0, zIndex:200,
      background: th.bg === "#0a0e17" ? "rgba(10,14,23,0.97)" : "rgba(241,245,249,0.97)",
      backdropFilter:"blur(12px)",
      borderTop:"1px solid rgba(220,38,38,0.25)",
      padding:"8px 12px",
      paddingBottom:"calc(8px + env(safe-area-inset-bottom))",
      display:"flex", alignItems:"center", gap:8,
    }}>
      <div style={{flex:1, fontSize:12, color:th.textMuted, overflow:"hidden",
        textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{t.donateMsg}</div>
      <a href="https://revolut.me/nathanb7mj" target="_blank" rel="noopener noreferrer"
        style={{
          flexShrink:0, background:"linear-gradient(135deg,#dc2626,#991b1b)",
          color:"#fff", borderRadius:8, padding:"7px 12px",
          fontSize:12, fontWeight:700, textDecoration:"none",
          touchAction:"manipulation", whiteSpace:"nowrap",
        }}>{t.donateBtn}</a>
      <button onClick={()=>setVisible(false)} style={{
        background:"transparent", border:"none", color:th.textFaint,
        fontSize:18, cursor:"pointer", padding:"0 2px", flexShrink:0,
        touchAction:"manipulation", lineHeight:1,
      }}>×</button>
    </div>
  );
}

// ── FeedbackModal ─────────────────────────────────────────────────────────────
function FeedbackModal({ t, th, onClose }) {
  const [step, setStep]       = React.useState("form"); // form | thanks
  const [rating, setRating]   = React.useState(0);
  const [comment, setComment] = React.useState("");

  function submit() {
    if (rating === 0) return;
    // Send to Formspree (free tier, no backend needed)
    fetch("https://formspree.io/f/meeweavy", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ rating, comment, lang: t.langLabel }),
    }).catch(() => {}); // silent fail — user still sees thanks
    setStep("thanks");
  }

  return (
    <div style={{position:"fixed", inset:0, zIndex:500,
      background:"rgba(0,0,0,0.65)", backdropFilter:"blur(4px)",
      display:"flex", alignItems:"flex-end"}}
      onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{
        width:"100%", background:th.modalBg, borderRadius:"20px 20px 0 0",
        padding:"16px 16px calc(24px + env(safe-area-inset-bottom))",
        border:`1px solid ${th.modalBorder}`,
      }}>
        <div style={{width:36,height:4,background:th.cardBorder,borderRadius:2,
          margin:"0 auto 16px"}}/>

        {step === "form" ? (<>
          <div style={{fontSize:17,fontWeight:700,color:th.text,marginBottom:4}}>
            {t.feedbackTitle}
          </div>
          <div style={{fontSize:13,color:th.textMuted,marginBottom:16}}>
            {t.feedbackSub}
          </div>

          {/* Star rating */}
          <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:16}}>
            {[1,2,3,4,5].map(n=>(
              <button key={n} onClick={()=>setRating(n)} style={{
                fontSize:32, background:"transparent", border:"none",
                cursor:"pointer", opacity: n<=rating ? 1 : 0.3,
                transition:"opacity 0.15s", touchAction:"manipulation",
              }}>⭐</button>
            ))}
          </div>

          {/* Comment */}
          <textarea
            value={comment}
            onChange={e=>setComment(e.target.value)}
            placeholder={t.feedbackPlaceholder}
            rows={3}
            style={{
              width:"100%", boxSizing:"border-box",
              background:th.card, border:`1px solid ${th.cardBorder}`,
              borderRadius:10, padding:"10px 12px",
              color:th.text, fontSize:13, resize:"none", outline:"none",
              fontFamily:"inherit", marginBottom:12,
            }}
          />

          <button onClick={submit} disabled={rating===0} style={{
            width:"100%", padding:"13px", borderRadius:10, border:"none",
            background: rating>0 ? "linear-gradient(135deg,#dc2626,#991b1b)" : th.card,
            color: rating>0 ? "#fff" : th.textFaint,
            fontSize:14, fontWeight:700, cursor: rating>0 ? "pointer" : "default",
            touchAction:"manipulation",
          }}>{t.feedbackSend}</button>
        </>) : (
          <div style={{textAlign:"center",padding:"20px 0"}}>
            <div style={{fontSize:40,marginBottom:10}}>🙏</div>
            <div style={{fontSize:17,fontWeight:700,color:th.text,marginBottom:6}}>
              {t.feedbackThanks}
            </div>
            <div style={{fontSize:13,color:th.textMuted,marginBottom:20}}>
              {t.feedbackThanksMsg}
            </div>
            <button onClick={onClose} style={{
              padding:"11px 24px", borderRadius:10, border:`1px solid ${th.cardBorder}`,
              background:th.card, color:th.text, fontSize:13,
              cursor:"pointer", touchAction:"manipulation",
            }}>{t.newGame}</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// HOW TO PLAY — mobile bottom sheet, full content + engine + donate
// ══════════════════════════════════════════════════════════════════════════════
function Section({ title, children, th }) {
  return (
    <div style={{marginBottom:22}}>
      <div style={{fontSize:11,fontWeight:700,letterSpacing:2,color:th.textDim,
        marginBottom:10,paddingBottom:6,borderBottom:`1px solid ${th.cardBorder}`}}>
        {title}
      </div>
      {children}
    </div>
  );
}

function HowToPlay({ t, th, onClose }) {
  const h = t.htp;
  const eng = h.engine;
  return (
    <div style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(0,0,0,0.65)",
      backdropFilter:"blur(4px)",overflowY:"auto",WebkitOverflowScrolling:"touch"}}
      onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{
        background:th.modalBg,borderRadius:"20px 20px 0 0",
        margin:"40px 0 0 0",minHeight:"calc(100vh - 40px)",
        padding:"0 16px 60px",border:`1px solid ${th.modalBorder}`,
      }}>
        {/* Handle */}
        <div style={{width:36,height:4,background:th.cardBorder,borderRadius:2,
          margin:"12px auto 0",cursor:"pointer"}} onClick={onClose}/>

        {/* Header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",
          padding:"16px 0 14px"}}>
          <div style={{fontSize:19,fontWeight:700,color:th.text}}>⚾ {h.title}</div>
          <button onClick={onClose} style={{background:th.card,border:`1px solid ${th.cardBorder}`,
            color:th.textDim,fontSize:18,cursor:"pointer",borderRadius:8,
            width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        </div>

        {/* ── Phases ── */}
        <Section title="HOW IT WORKS" th={th}>
          {h.phases.map((p,i)=>(
            <div key={i} style={{display:"flex",gap:12,marginBottom:10,padding:"12px",
              background:th.card,border:`1px solid ${th.cardBorder}`,borderRadius:10}}>
              <div style={{fontSize:20,flexShrink:0}}>{p.icon}</div>
              <div>
                <div style={{fontWeight:700,fontSize:13,color:th.text,marginBottom:3}}>{p.title}</div>
                <div style={{fontSize:12,color:th.textMuted,lineHeight:1.6}}>{p.body}</div>
              </div>
            </div>
          ))}
        </Section>

        {/* ── Stats explained ── */}
        <Section title={h.scoring.title.toUpperCase()} th={th}>
          <div style={{fontSize:12,color:th.textMuted,marginBottom:10,lineHeight:1.6}}>{h.scoring.body}</div>
          {h.scoring.items.map((item,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:8,marginBottom:9}}>
              <div style={{minWidth:34,fontWeight:700,fontSize:12,color:item.color,fontFamily:"monospace"}}>{item.stat}</div>
              <div style={{width:60,height:4,background:th.statBar,borderRadius:2,flexShrink:0}}>
                <div style={{height:"100%",width:`${50+i*9}%`,background:item.color,borderRadius:2}}/>
              </div>
              <div style={{fontSize:11,color:th.textMuted,lineHeight:1.4,flex:1}}>{item.desc}</div>
            </div>
          ))}
        </Section>

        {/* ── Engine: how runs are calculated ── */}
        <Section title={eng.title.toUpperCase()} th={th}>
          <div style={{fontSize:12,color:th.textMuted,marginBottom:10,lineHeight:1.6}}>{eng.intro}</div>

          {/* Plate appearance outcomes */}
          <div style={{marginBottom:12}}>
            {eng.outcomes.map((o,i)=>(
              <div key={i} style={{display:"flex",gap:8,marginBottom:6,padding:"8px 10px",
                background:th.legend,border:`1px solid ${th.legendBorder}`,borderRadius:8}}>
                <div style={{fontSize:10,fontFamily:"monospace",fontWeight:600,color:o.color,
                  flexShrink:0,paddingTop:1,minWidth:130}}>{o.roll}</div>
                <div style={{fontSize:11,color:th.textMuted,lineHeight:1.5}}>→ {o.result}</div>
              </div>
            ))}
          </div>

          {/* Base rules */}
          <div style={{marginBottom:12}}>
            <div style={{fontSize:11,fontWeight:700,color:th.textDim,marginBottom:6}}>{eng.rulesTitle}</div>
            {eng.rules.map((r,i)=>(
              <div key={i} style={{display:"flex",gap:8,marginBottom:6}}>
                <div style={{color:"#dc2626",flexShrink:0,fontSize:11}}>▸</div>
                <div style={{fontSize:11,color:th.textMuted,lineHeight:1.5}}>{r}</div>
              </div>
            ))}
          </div>

          {/* Formula */}
          <div style={{marginBottom:10}}>
            <div style={{fontSize:11,fontWeight:700,color:th.textDim,marginBottom:6}}>{eng.formulaTitle}</div>
            <div style={{fontFamily:"monospace",fontSize:13,fontWeight:700,color:"#dc2626",
              padding:"10px 12px",background:th.legend,border:`1px solid ${th.legendBorder}`,
              borderRadius:8,marginBottom:6}}>{eng.formula}</div>
            <div style={{fontSize:11,color:th.textMuted,lineHeight:1.6}}>{eng.formulaNote}</div>
          </div>

          {/* Examples grid */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6}}>
            {eng.examples.map((ex,i)=>{
              const w=parseInt(ex.wins);
              const col=w>=120?"#22c55e":w>=100?"#84cc16":w>=85?"#eab308":w>=70?"#f97316":"#ef4444";
              return (
                <div key={i} style={{padding:"8px 6px",background:th.legend,
                  border:`1px solid ${th.legendBorder}`,borderRadius:8,textAlign:"center"}}>
                  <div style={{fontSize:10,color:th.textFaint}}>{ex.rpg}</div>
                  <div style={{fontSize:17,fontWeight:800,color:col,lineHeight:1.1}}>{ex.wins}</div>
                  <div style={{fontSize:9,color:th.textMuted,lineHeight:1.3}}>{ex.label}</div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* ── Win targets ── */}
        <Section title={h.wins.title.toUpperCase()} th={th}>
          {h.wins.items.map((w,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",
              background:th.card,border:`1px solid ${th.cardBorder}`,borderRadius:8,marginBottom:6}}>
              <div style={{fontSize:12,fontWeight:800,color:w.color,minWidth:34,fontFamily:"monospace"}}>{w.threshold}</div>
              <div style={{fontSize:12,color:th.textMuted}}>{w.label}</div>
            </div>
          ))}
        </Section>

        {/* ── Tips ── */}
        <Section title={h.tips.title.toUpperCase()} th={th}>
          {h.tips.items.map((tip,i)=>(
            <div key={i} style={{display:"flex",gap:8,marginBottom:10}}>
              <div style={{color:"#dc2626",flexShrink:0}}>▸</div>
              <div style={{fontSize:12,color:th.textMuted,lineHeight:1.6}}>{tip}</div>
            </div>
          ))}
        </Section>

        {/* ── Donate ── */}
        <div style={{
          background:"linear-gradient(135deg,rgba(220,38,38,0.1),rgba(220,38,38,0.05))",
          border:"1px solid rgba(220,38,38,0.25)",borderRadius:14,
          padding:"18px 16px",textAlign:"center",
        }}>
          <div style={{fontSize:22,marginBottom:6}}>☕</div>
          <div style={{fontSize:15,fontWeight:700,color:th.text,marginBottom:4}}>
            Enjoying The Lineup?
          </div>
          <div style={{fontSize:12,color:th.textMuted,marginBottom:14,lineHeight:1.6}}>
            The game is free and always will be.<br/>
            If you enjoy it, a coffee helps keep it alive!
          </div>
          <a href="https://revolut.me/nathanb7mj" target="_blank" rel="noopener noreferrer"
            style={{
              display:"inline-flex",alignItems:"center",gap:8,
              background:"#dc2626",color:"#fff",borderRadius:10,
              padding:"12px 24px",fontSize:14,fontWeight:700,
              textDecoration:"none",letterSpacing:0.5,
            }}>
            ☕ Buy me a coffee
          </a>
          <div style={{fontSize:10,color:th.textFaint,marginTop:10}}>
            via Revolut · @nathanb7mj
          </div>
        </div>

      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ROOT
// ══════════════════════════════════════════════════════════════════════════════
export default function TheLineup() {
  const [phase,      setPhase]      = useState("intro");
  const [mode,       setMode]       = useState("classic");
  const [lang,       setLang]       = useState("en");
  const [theme,      setTheme]      = useState("dark");
  const [showHtp,    setShowHtp]    = useState(false);
  const [roster,     setRoster]     = useState(null);
  const [gameResult, setGameResult] = useState(null);

  const t  = T[lang];
  const th = getTheme(theme);

  const handleStart   = m => { setMode(m); setPhase("draft"); };
  const handleDraft   = r => { setRoster(r); setPhase("order"); };
  const handleOrder   = o => {
    const result = simulateSeason(o);
    setGameResult({ lineup: o, simResult: result });
    setPhase("result");
  };
  const handleRestart   = () => { setPhase("intro"); setRoster(null); setGameResult(null); };
  const openHtp         = () => setShowHtp(true);
  const closeHtp        = () => setShowHtp(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const openFeedback    = () => setShowFeedback(true);
  const closeFeedback   = () => setShowFeedback(false);
  const shared = { lang, setLang, theme, setTheme, showHtp: openHtp, showFeedback: openFeedback };

  return (
    <ErrorBoundary>
      {showHtp      && <HowToPlay      t={t} th={th} onClose={closeHtp}/>}
      {showFeedback && <FeedbackModal  t={t} th={th} onClose={closeFeedback}/>}
      {phase==="intro"  && <IntroPhase  onStart={handleStart}  {...shared}/>}
      {phase==="draft"  && <DraftPhase  mode={mode}            {...shared} onComplete={handleDraft}/>}
      {phase==="order"  && <OrderPhase  roster={roster} mode={mode} {...shared} onComplete={handleOrder}/>}
      {phase==="result" && gameResult && (
        <ResultPhase lineup={gameResult.lineup} simResult={gameResult.simResult}
          {...shared} onRestart={handleRestart}/>
      )}
      <DonateBar t={t} th={th}/>
    </ErrorBoundary>
  );
}
