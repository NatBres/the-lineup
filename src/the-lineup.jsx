import React, { useState, useEffect } from "react";
// ── Error Boundary — catches render errors and shows them visibly ─────────────
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

// ── Traductions ──────────────────────────────────────────────────────────────
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
          { roll: "r < OBP × 0.22",                 result: "Walk / HBP → batter reaches 1st, runners advance", color: "#a78bfa" },
          { roll: "+ SLG × 0.10",                   result: "Home Run → all baserunners + batter score", color: "#dc2626" },
          { roll: "+ AVG × 0.35",                   result: "Single → batter to 1st, runners advance by 1 base", color: "#22c55e" },
          { roll: "+ BB% × 0.008",                  result: "Extra walk → same as walk, adds OBP pressure", color: "#3b82f6" },
          { roll: "else",                            result: "Out — stolen base attempt possible if runner on 1st (SB/1500 chance)", color: "#f59e0b" },
        ],
        rulesTitle: "Base Advancement Rules",
        rules: [
          "On a walk or single: runner on 3rd scores, all others advance one base.",
          "On a home run: batter + all baserunners score immediately.",
          "Each game lasts exactly 27 outs (9 innings × 3 outs).",
          "The batting order rotates continuously — the 9th batter wraps back to the 1st.",
        ],
        formulaTitle: "Wins Formula",
        formula: "wins = 50 + (runs_per_game − 4.0) × 14",
        formulaNote: "A team averaging 4 runs/game wins ~50% of games (≈81 wins). Each additional run/game adds ~14 wins. The result is capped at 162.",
        examplesTitle: "Examples",
        examples: [
          { rpg: "3.5 R/G", wins: "43 W",  label: "Well below league average" },
          { rpg: "4.5 R/G", wins: "57 W",  label: "Slightly above average" },
          { rpg: "5.5 R/G", wins: "71 W",  label: "Competitive offense" },
          { rpg: "6.5 R/G", wins: "85 W",  label: "Playoff-caliber lineup" },
          { rpg: "8.0 R/G", wins: "106 W", label: "All-time great offense" },
          { rpg: "9.5 R/G", wins: "127 W", label: "Legendary, near-historic" },
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
          { roll: "r < OBP × 0.22",                 result: "But-sur-balles / HBP → frappeur sur 1re, coureurs avancent", color: "#a78bfa" },
          { roll: "+ SLG × 0.10",                   result: "Home Run → tous les coureurs + frappeur marquent", color: "#dc2626" },
          { roll: "+ MOY × 0.35",                   result: "Coup sûr → frappeur sur 1re, coureurs avancent d'une base", color: "#22c55e" },
          { roll: "+ BB% × 0.008",                  result: "Walk supplémentaire → même effet qu'un BB", color: "#3b82f6" },
          { roll: "sinon",                           result: "Retrait — tentative de vol possible si coureur sur 1re (SB/1500)", color: "#f59e0b" },
        ],
        rulesTitle: "Règles d'avancement",
        rules: [
          "Sur un walk ou coup sûr : le coureur sur 3e marque, les autres avancent d'une base.",
          "Sur un home run : frappeur + tous les coureurs sur les bases marquent immédiatement.",
          "Chaque match dure exactement 27 retraits (9 manches × 3 retraits).",
          "L'ordre de frappe tourne en continu — le 9e frappeur recommence à partir du 1er.",
        ],
        formulaTitle: "Formule de victoires",
        formula: "victoires = 50 + (points_par_match − 4.0) × 14",
        formulaNote: "Une équipe qui marque 4 points par match gagne environ 50% de ses matchs (≈81 victoires). Chaque point supplémentaire par match ajoute environ 14 victoires. Le résultat est plafonné à 162.",
        examplesTitle: "Exemples",
        examples: [
          { rpg: "3.5 pts/m", wins: "43 V",  label: "En dessous de la moyenne" },
          { rpg: "4.5 pts/m", wins: "57 V",  label: "Légèrement au-dessus" },
          { rpg: "5.5 pts/m", wins: "71 V",  label: "Attaque compétitive" },
          { rpg: "6.5 pts/m", wins: "85 V",  label: "Niveau playoffs" },
          { rpg: "8.0 pts/m", wins: "106 V", label: "Grande attaque historique" },
          { rpg: "9.5 pts/m", wins: "127 V", label: "Légendaire, proche du record" },
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
          { roll: "r < OBP × 0.22",                 result: "Base por bolas / HBP → bateador a 1ª, corredores avanzan", color: "#a78bfa" },
          { roll: "+ SLG × 0.10",                   result: "Jonrón → bateador + todos los corredores anotan", color: "#dc2626" },
          { roll: "+ AVG × 0.35",                   result: "Hit sencillo → bateador a 1ª, corredores avanzan una base", color: "#22c55e" },
          { roll: "+ BB% × 0.008",                  result: "Base extra por bolas → mismo efecto que BB", color: "#3b82f6" },
          { roll: "si no",                          result: "Out — intento de robo posible si corredor en 1ª (BS/1500)", color: "#f59e0b" },
        ],
        rulesTitle: "Reglas de avance en bases",
        rules: [
          "En BB o hit sencillo: corredor en 3ª anota, los demás avanzan una base.",
          "En jonrón: bateador + todos los corredores anotan inmediatamente.",
          "Cada partido dura exactamente 27 outs (9 entradas × 3 outs).",
          "El batting order rota continuamente — el 9º bateador vuelve al 1º.",
        ],
        formulaTitle: "Fórmula de victorias",
        formula: "victorias = 50 + (carreras_por_partido − 4.0) × 14",
        formulaNote: "Un equipo que anota 4 carreras/partido gana ~50% de sus partidos (≈81 victorias). Cada carrera adicional añade ~14 victorias. El resultado se limita a 162.",
        examplesTitle: "Ejemplos",
        examples: [
          { rpg: "3.5 C/P", wins: "43 V",  label: "Por debajo de la media" },
          { rpg: "4.5 C/P", wins: "57 V",  label: "Ligeramente por encima" },
          { rpg: "5.5 C/P", wins: "71 V",  label: "Ataque competitivo" },
          { rpg: "6.5 C/P", wins: "85 V",  label: "Nivel playoffs" },
          { rpg: "8.0 C/P", wins: "106 V", label: "Gran ataque histórico" },
          { rpg: "9.5 C/P", wins: "127 V", label: "Legendario, casi récord" },
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

function simulateSeason(lineup) {
  if (!lineup || lineup.length < 9) return { wins: 0, rpg: "0.00", playerStats: [] };

  // Per-player stat accumulators
  const stats = lineup.map(() => ({ R:0, H:0, HR:0, RBI:0, BB:0, SB:0, AB:0, PA:0 }));

  let totalRuns = 0;

  for (let g = 0; g < 162; g++) {
    let outs = 0, bases = [0,0,0]; // bases[0]=1st, [1]=2nd, [2]=3rd  — value = batter index+1
    let bi = 0;

    while (outs < 27) {
      const idx = bi % 9;
      const b   = lineup[idx];
      if (!b) { outs++; bi++; continue; }

      const st     = stats[idx];
      const obp    = Number(b.obp)    || 0;
      const slg    = Number(b.slg)    || 0;
      const avg    = Number(b.avg)    || 0;
      const bbRate = Number(b.bbRate) || 0;
      const sbProp = Number(b.sb)     || 0;
      const r = Math.random();

      st.PA++;

      if (r < obp * 0.22) {
        // Walk / HBP — no AB
        st.BB++;
        const scored = bases[2] ? 1 : 0;
        if (bases[2]) { stats[bases[2]-1].R++; totalRuns++; }
        bases = [idx+1, bases[0], bases[1]];

      } else if (r < obp*0.22 + slg*0.10) {
        // Home run — batter + all on base score
        st.AB++; st.H++; st.HR++;
        const onBase = bases.filter(Boolean).length;
        st.RBI += onBase + 1;
        st.R++;
        totalRuns += onBase + 1;
        // Score all baserunners
        bases.forEach(slot => { if (slot) { stats[slot-1].R++; } });
        bases = [0,0,0];

      } else if (r < obp*0.22 + slg*0.10 + avg*0.35) {
        // Single
        st.AB++; st.H++;
        if (bases[2]) { stats[bases[2]-1].R++; totalRuns++; st.RBI++; }
        bases = [idx+1, bases[0], bases[1]];

      } else if (r < obp*0.22 + slg*0.10 + avg*0.35 + bbRate*0.008) {
        // Extra walk
        st.BB++;
        if (bases[2]) { stats[bases[2]-1].R++; totalRuns++; }
        bases = [idx+1, bases[0], bases[1]];

      } else {
        // Out
        st.AB++;
        outs++;
        // Stolen base attempt if runner on 1st
        if (Math.random() < sbProp / 1500 && bases[0]) {
          st.SB++;
          bases = [0, bases[0], bases[1]]; // advance to 2nd
        }
      }
      bi++;
    }
    // End of game — clear leftover runners (they don't score)
    bases = [0,0,0];
  }

  const rpg  = totalRuns / 162;
  const wins = isNaN(rpg) ? 0 : Math.min(162, Math.round(50 + (rpg - 4) * 14));

  // Compute derived stats per player
  const playerStats = lineup.map((p, i) => {
    const s = stats[i];
    const simAVG = s.AB > 0 ? (s.H / s.AB).toFixed(3) : ".000";
    const simOBP = s.PA > 0 ? ((s.H + s.BB) / s.PA).toFixed(3) : ".000";
    return {
      name: p.name, pos: p.pos, era: p.era,
      R:   s.R,
      H:   s.H,
      HR:  s.HR,
      RBI: s.RBI,
      BB:  s.BB,
      SB:  s.SB,
      AB:  s.AB,
      AVG: simAVG,
      OBP: simOBP,
    };
  });

  return {
    wins,
    rpg: isNaN(rpg) ? "0.00" : rpg.toFixed(2),
    totalRuns,
    playerStats,
  };
}

function winLabel(wins, t) {
  return (t.winLabels.find(([min]) => wins >= min) || t.winLabels[t.winLabels.length-1])[1];
}

const winColor = w => w>=140?"#22c55e":w>=110?"#84cc16":w>=90?"#eab308":w>=75?"#f97316":"#ef4444";

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

// ── Safe theme getter — always returns a valid theme object ─────────────────
function getTheme(theme) {
  return THEMES[theme] || THEMES.dark;
}

// ── Style factory (theme-aware) ───────────────────────────────────────────────
function makeS(th) {
  return {
    app: { minHeight:"100vh", background:th.bg, color:th.text, fontFamily:"'Georgia',serif", backgroundImage:th.bgGrad },
    header: { background:th.headerBg, padding:"16px 24px", borderBottom:`1px solid ${th.headerBorder}`, display:"flex", alignItems:"center", justifyContent:"space-between", backdropFilter:"blur(8px)" },
    logo:  { fontSize:20, fontWeight:700, letterSpacing:3, textTransform:"uppercase" },
    red:   { color:"#dc2626" },
    badge: { background:"rgba(220,38,38,0.15)", border:"1px solid rgba(220,38,38,0.3)", color:"#fca5a5", borderRadius:4, padding:"3px 10px", fontSize:11, letterSpacing:2 },
    btn:   bg => ({ background:bg, color:"#fff", border:"none", borderRadius:8, padding:"12px 28px", fontSize:14, fontWeight:700, cursor:"pointer", letterSpacing:1 }),
    ghostBtn: { background:th.ghostBtn.bg, border:`1px solid ${th.ghostBtn.border}`, color:th.ghostBtn.color, borderRadius:6, padding:"6px 14px", cursor:"pointer", fontSize:13 },
  };
}

// ── StatBar ───────────────────────────────────────────────────────────────────
function StatBar({ label, value, max, color, th }) {
  return (
    <div style={{marginBottom:4}}>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:th.textMuted,marginBottom:2}}>
        <span>{label}</span><span style={{color:th.text}}>{value}</span>
      </div>
      <div style={{height:3,background:th.statBar,borderRadius:2}}>
        <div style={{height:"100%",width:`${Math.min(100,(value/max)*100)}%`,background:color,borderRadius:2,transition:"width 0.5s"}}/>
      </div>
    </div>
  );
}

// ── LangSelect ────────────────────────────────────────────────────────────────
function LangSelect({ lang, setLang, t, th }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:6}}>
      <span style={{fontSize:11,color:th.textFaint}}>{t.langLabel}:</span>
      <select value={lang} onChange={e=>setLang(e.target.value)} style={{
        background:th.select.bg, border:`1px solid ${th.select.border}`,
        color:th.select.color, borderRadius:5, padding:"3px 8px", fontSize:12, cursor:"pointer", outline:"none",
      }}>
        <option value="en">🇬🇧 English</option>
        <option value="fr">🇫🇷 Français</option>
        <option value="es">🇪🇸 Español</option>
      </select>
    </div>
  );
}

// ── ThemeToggle ───────────────────────────────────────────────────────────────
function ThemeToggle({ theme, setTheme, t, th }) {
  const isDark = theme === "dark";
  return (
    <button onClick={() => setTheme(isDark ? "light" : "dark")} style={{
      background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)",
      border: `1px solid ${isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"}`,
      color: th.textMuted, borderRadius:6, padding:"4px 10px",
      fontSize:12, cursor:"pointer", fontFamily:"inherit",
    }}>
      {isDark ? t.themeToggle.light : t.themeToggle.dark}
    </button>
  );
}

// ── HowToPlay modal ───────────────────────────────────────────────────────────
function HowToPlay({ t, th, onClose }) {
  const h = t.htp;
  return (
    <div style={{
      position:"fixed", inset:0, zIndex:1000,
      background:"rgba(0,0,0,0.6)", backdropFilter:"blur(4px)",
      display:"flex", alignItems:"flex-start", justifyContent:"center",
      padding:"24px 16px", overflowY:"auto",
    }} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{
        background:th.modalBg, border:`1px solid ${th.modalBorder}`,
        borderRadius:14, width:"100%", maxWidth:680, padding:28,
        boxShadow:"0 24px 60px rgba(0,0,0,0.4)",
      }}>
        {/* Header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
          <div style={{fontSize:22,fontWeight:700,color:th.text}}>⚾ {h.title}</div>
          <button onClick={onClose} style={{background:"transparent",border:"none",color:th.textDim,fontSize:14,cursor:"pointer"}}>{h.close}</button>
        </div>

        {/* Phases */}
        <div style={{marginBottom:24}}>
          {h.phases.map((p,i)=>(
            <div key={i} style={{display:"flex",gap:14,marginBottom:14,padding:"14px 16px",background:th.card,border:`1px solid ${th.cardBorder}`,borderRadius:10}}>
              <div style={{fontSize:24,flexShrink:0}}>{p.icon}</div>
              <div>
                <div style={{fontWeight:700,fontSize:14,color:th.text,marginBottom:4}}>{p.title}</div>
                <div style={{fontSize:13,color:th.textMuted,lineHeight:1.6}}>{p.body}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Scoring — stats */}
        <div style={{marginBottom:24}}>
          <div style={{fontSize:13,fontWeight:700,letterSpacing:1,color:th.textDim,marginBottom:10}}>{h.scoring.title.toUpperCase()}</div>
          <div style={{fontSize:13,color:th.textMuted,marginBottom:12,lineHeight:1.6}}>{h.scoring.body}</div>
          {h.scoring.items.map((item,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
              <div style={{minWidth:38,fontWeight:700,fontSize:12,color:item.color,fontFamily:"monospace"}}>{item.stat}</div>
              <div style={{flex:1,height:3,background:th.statBar,borderRadius:2}}>
                <div style={{height:"100%",width:`${55+i*8}%`,background:item.color,borderRadius:2}}/>
              </div>
              <div style={{fontSize:12,color:th.textMuted,flex:2}}>{item.desc}</div>
            </div>
          ))}
        </div>

        {/* Engine — how runs are calculated */}
        <div style={{marginBottom:24,padding:"18px 20px",background:th.card,border:`1px solid ${th.cardBorder}`,borderRadius:12}}>
          <div style={{fontSize:13,fontWeight:700,letterSpacing:1,color:th.textDim,marginBottom:10}}>{h.engine.title.toUpperCase()}</div>
          <div style={{fontSize:13,color:th.textMuted,marginBottom:14,lineHeight:1.6}}>{h.engine.intro}</div>

          {/* Plate appearance outcomes */}
          <div style={{marginBottom:16}}>
            {h.engine.outcomes.map((o,i)=>(
              <div key={i} style={{
                display:"flex",alignItems:"flex-start",gap:10,marginBottom:6,
                padding:"8px 12px",borderRadius:8,
                background:th.legend,border:`1px solid ${th.legendBorder}`,
              }}>
                <div style={{
                  minWidth:160,fontSize:11,fontFamily:"monospace",fontWeight:600,
                  color:o.color,flexShrink:0,paddingTop:1,
                }}>{o.roll}</div>
                <div style={{fontSize:12,color:th.textMuted,lineHeight:1.5}}>→ {o.result}</div>
              </div>
            ))}
          </div>

          {/* Base rules */}
          <div style={{marginBottom:16}}>
            <div style={{fontSize:12,fontWeight:700,color:th.textDim,marginBottom:8,letterSpacing:0.5}}>{h.engine.rulesTitle}</div>
            {h.engine.rules.map((r,i)=>(
              <div key={i} style={{display:"flex",gap:8,marginBottom:5}}>
                <div style={{color:"#dc2626",flexShrink:0,fontSize:12}}>▸</div>
                <div style={{fontSize:12,color:th.textMuted,lineHeight:1.5}}>{r}</div>
              </div>
            ))}
          </div>

          {/* Wins formula */}
          <div style={{marginBottom:16}}>
            <div style={{fontSize:12,fontWeight:700,color:th.textDim,marginBottom:8,letterSpacing:0.5}}>{h.engine.formulaTitle}</div>
            <div style={{
              fontFamily:"monospace",fontSize:14,fontWeight:700,color:"#dc2626",
              padding:"10px 14px",background:th.legend,border:`1px solid ${th.legendBorder}`,
              borderRadius:8,marginBottom:8,letterSpacing:0.5,
            }}>{h.engine.formula}</div>
            <div style={{fontSize:12,color:th.textMuted,lineHeight:1.6}}>{h.engine.formulaNote}</div>
          </div>

          {/* Examples table */}
          <div>
            <div style={{fontSize:12,fontWeight:700,color:th.textDim,marginBottom:8,letterSpacing:0.5}}>{h.engine.examplesTitle}</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6}}>
              {h.engine.examples.map((ex,i)=>{
                const w = parseInt(ex.wins);
                const col = w>=120?"#22c55e":w>=100?"#84cc16":w>=85?"#eab308":w>=70?"#f97316":"#ef4444";
                return (
                  <div key={i} style={{padding:"8px 10px",background:th.legend,border:`1px solid ${th.legendBorder}`,borderRadius:8,textAlign:"center"}}>
                    <div style={{fontSize:11,color:th.textFaint,marginBottom:2}}>{ex.rpg}</div>
                    <div style={{fontSize:16,fontWeight:800,color:col,lineHeight:1}}>{ex.wins}</div>
                    <div style={{fontSize:10,color:th.textMuted,marginTop:2,lineHeight:1.3}}>{ex.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Win targets */}
        <div style={{marginBottom:24}}>
          <div style={{fontSize:13,fontWeight:700,letterSpacing:1,color:th.textDim,marginBottom:10}}>{h.wins.title.toUpperCase()}</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
            {h.wins.items.map((w,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",background:th.card,border:`1px solid ${th.cardBorder}`,borderRadius:8}}>
                <div style={{fontSize:13,fontWeight:800,color:w.color,minWidth:36,fontFamily:"monospace"}}>{w.threshold}</div>
                <div style={{fontSize:12,color:th.textMuted}}>{w.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Modes */}
        <div style={{marginBottom:24}}>
          <div style={{fontSize:13,fontWeight:700,letterSpacing:1,color:th.textDim,marginBottom:10}}>{h.modes.title.toUpperCase()}</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            {h.modes.items.map((m,i)=>(
              <div key={i} style={{padding:"10px 14px",background:th.card,border:`1px solid ${th.cardBorder}`,borderRadius:8}}>
                <div style={{fontWeight:700,fontSize:13,color:th.text,marginBottom:4}}>{m.name}</div>
                <div style={{fontSize:12,color:th.textMuted}}>{m.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div>
          <div style={{fontSize:13,fontWeight:700,letterSpacing:1,color:th.textDim,marginBottom:10}}>{h.tips.title.toUpperCase()}</div>
          {h.tips.items.map((tip,i)=>(
            <div key={i} style={{display:"flex",gap:10,marginBottom:8}}>
              <div style={{color:"#dc2626",flexShrink:0,marginTop:1}}>▸</div>
              <div style={{fontSize:13,color:th.textMuted,lineHeight:1.55}}>{tip}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}





// ══════════════════════════════════════════════════════════════════════════════
// INTRO
// ══════════════════════════════════════════════════════════════════════════════
function IntroPhase({ onStart, lang, setLang, theme, setTheme, showHtp }) {
  const t = T[lang];
  const th = getTheme(theme);
  const S = makeS(th);
  const [mode, setMode] = useState("classic");
  return (
    <div style={S.app}>
      <div style={S.header}>
        <div style={S.logo}>The <span style={S.red}>Lineup</span></div>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <LangSelect lang={lang} setLang={setLang} t={t} th={th}/>
          <button onClick={showHtp} style={{...S.ghostBtn,fontSize:12}}>❓ {t.howToPlayBtn}</button>
          <ThemeToggle theme={theme} setTheme={setTheme} t={t} th={th}/>
          <div style={S.badge}>{t.tagline}</div>
        </div>
      </div>
      <div style={{maxWidth:540,margin:"0 auto",padding:"56px 24px",textAlign:"center"}}>
        <div style={{fontSize:66,marginBottom:10}}>⚾</div>
        <h1 style={{fontSize:34,fontWeight:700,letterSpacing:1,marginBottom:12,lineHeight:1.2}}>
          {t.subtitle.split(" ").slice(0,-1).join(" ")}<br/>
          <span style={{color:"#dc2626"}}>{t.subtitle.split(" ").slice(-1)}</span>
        </h1>
        <p style={{color:"#94a3b8",fontSize:15,lineHeight:1.75,marginBottom:24}}>{t.introPara}</p>
        <div style={{background:th.card,border:`1px solid ${th.cardBorder}`,borderRadius:12,padding:20,marginBottom:28,textAlign:"left"}}>
          <div style={{fontSize:11,letterSpacing:2,color:"#64748b",marginBottom:10}}>{t.chooseMode}</div>
          {[["classic",t.modeClassic,t.modeClassicDesc],["scout",t.modeScout,t.modeScoutDesc]].map(([val,label,desc])=>(
            <div key={val} onClick={()=>setMode(val)} style={{
              display:"flex",alignItems:"center",gap:12,padding:"10px 14px",borderRadius:8,marginBottom:6,cursor:"pointer",
              background:mode===val?th.activeCard:th.card,
              border:`1px solid ${mode===val?th.activeB:th.cardBorder}`,
              transition:"all 0.2s",
            }}>
              <div style={{fontSize:18}}>{label.split(" ")[0]}</div>
              <div>
                <div style={{fontWeight:600,fontSize:14}}>{label.slice(3)}</div>
                <div style={{fontSize:12,color:th.textDim}}>{desc}</div>
              </div>
              {mode===val&&<div style={{marginLeft:"auto",color:"#dc2626",fontSize:18}}>✓</div>}
            </div>
          ))}
        </div>
        <button onClick={()=>onStart(mode)} style={S.btn("linear-gradient(135deg,#dc2626,#991b1b)")}>{t.playBall}</button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// DRAFT
// ══════════════════════════════════════════════════════════════════════════════
function DraftPhase({ mode, lang, setLang, theme, setTheme, showHtp, onComplete }) {
  const t = T[lang];
  const th = getTheme(theme);
  const S = makeS(th);
  const [slotIdx,   setSlotIdx]   = useState(0);
  const [roster,    setRoster]    = useState({});
  const [usedNames, setUsedNames] = useState(new Set());
  const [options,   setOptions]   = useState(null);
  const [fadeIn,    setFadeIn]    = useState(false);

  const key      = ROSTER_KEYS[slotIdx];
  const posGroup = POS_GROUPS[key];
  const progressPct = (slotIdx / ROSTER_KEYS.length) * 100;

  useEffect(() => {
    setOptions(null); setFadeIn(false);
    const t1 = setTimeout(() => {
      setOptions(getPlayersForSlot(posGroup, usedNames));
      setTimeout(() => setFadeIn(true), 40);
    }, 550);
    return () => clearTimeout(t1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slotIdx]);

  function selectPlayer(player) {
    const era = getEra(player.name);
    const newRoster = {...roster, [key]: {...player, era}};
    const newUsed   = new Set([...usedNames, player.name]);
    setRoster(newRoster); setUsedNames(newUsed);
    if (slotIdx+1 >= ROSTER_KEYS.length) onComplete(newRoster);
    else setSlotIdx(slotIdx+1);
  }

  return (
    <div style={S.app}>
      <div style={S.header}>
        <div style={S.logo}>The <span style={S.red}>Lineup</span></div>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <LangSelect lang={lang} setLang={setLang} t={t} th={th}/>
          <button onClick={showHtp} style={{...S.ghostBtn,fontSize:12}}>❓ {t.howToPlayBtn}</button>
          <ThemeToggle theme={theme} setTheme={setTheme} t={t} th={th}/>
          <div style={S.badge}>{mode==="scout"?"SCOUT":"CLASSIC"}</div>
          <div style={{fontSize:12,color:th.textDim}}>{t.phase1Label}{slotIdx+1}/9</div>
        </div>
      </div>
      <div style={{height:3,background:th.progressBg}}>
        <div style={{height:"100%",width:`${progressPct}%`,background:"#dc2626",transition:"width 0.4s"}}/>
      </div>

      <div style={{maxWidth:1080,margin:"0 auto",padding:"18px 16px",display:"grid",gridTemplateColumns:"190px 1fr",gap:18}}>

        {/* Roster sidebar */}
        <div>
          <div style={{fontSize:11,letterSpacing:2,color:"#64748b",marginBottom:8}}>{t.rosterLabel}</div>
          {ROSTER_KEYS.map((k,i)=>{
            const p=roster[k], active=i===slotIdx, done=i<slotIdx;
            return (
              <div key={k} style={{display:"flex",alignItems:"center",gap:7,padding:"6px 9px",borderRadius:6,marginBottom:3,
                background:active?th.activeCard:done?th.doneCard:"transparent",
                border:`1px solid ${active?th.activeB:done?th.doneBorder:"rgba(0,0,0,0.02)"}`,
                transition:"all 0.3s"}}>
                <div style={{fontSize:12}}>{t.posIcons[k]}</div>
                <div style={{width:24,fontSize:10,fontWeight:700,color:active?"#dc2626":th.textFaint,fontFamily:"monospace"}}>{k}</div>
                <div style={{flex:1,minWidth:0}}>
                  {p ? (<>
                    <div style={{fontSize:12,fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{p.name}</div>
                    <div style={{fontSize:10,color:"#fbbf24"}}>{p.era}</div>
                  </>) : (
                    <div style={{fontSize:11,color:active?"#dc2626":th.textGhost}}>{active?t.inProgress:t.posNames[k]}</div>
                  )}
                </div>
                {done&&<div style={{color:"#22c55e",fontSize:13}}>{t.done}</div>}
              </div>
            );
          })}
        </div>

        {/* Draft area */}
        <div>
          <div style={{background:th.card,border:`1px solid ${th.cardBorder}`,borderRadius:12,padding:"14px 18px",marginBottom:12,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div>
              <div style={{fontSize:11,letterSpacing:2,color:"#64748b"}}>{t.posLabel}</div>
              <div style={{fontSize:22,fontWeight:700}}>{t.posIcons[key]} {t.posNames[key]}</div>
              <div style={{fontSize:13,color:"#94a3b8"}}>{t.tipLabel} <span style={{color:"#fbbf24"}}>{t.posTips[key]}</span></div>
            </div>
            <div style={{fontSize:11,color:th.textFaint}}>{t.allEras}</div>
          </div>

          {!options ? (
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:200}}>
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:30,animation:"spin 0.7s linear infinite"}}>⚾</div>
                <div style={{fontSize:12,color:th.textFaint,letterSpacing:2,marginTop:10}}>{t.loading}</div>
              </div>
              <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
            </div>
          ) : (
            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10,opacity:fadeIn?1:0,transform:fadeIn?"translateY(0)":"translateY(8px)",transition:"opacity 0.3s,transform 0.3s"}}>
              {options.map((player,i)=>{
                const era=getEra(player.name);
                return (
                  <div key={i}
                    onClick={()=>selectPlayer(player)}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=th.cardHoverB;e.currentTarget.style.background=th.cardHover;}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor=th.cardBorder;e.currentTarget.style.background=th.card;}}
                    style={{background:th.card,border:`1px solid ${th.cardBorder}`,borderRadius:10,padding:12,cursor:"pointer",transition:"all 0.15s"}}>
                    <div style={{fontSize:10,color:"#fbbf24",fontWeight:600,marginBottom:1,letterSpacing:1}}>{era}</div>
                    <div style={{fontSize:10,color:th.textDim,marginBottom:4}}>{player.pos}</div>
                    <div style={{fontSize:13,fontWeight:700,marginBottom:10,lineHeight:1.3,minHeight:32}}>{player.name}</div>
                    {mode==="classic" ? (<>
                      <StatBar label="OBP" value={player.obp}              max={0.55} color="#3b82f6" th={th}/>
                      <StatBar label="SLG" value={player.slg}              max={0.75} color="#dc2626" th={th}/>
                      <StatBar label="AVG" value={player.avg}              max={0.40} color="#22c55e" th={th}/>
                      <StatBar label="BB%" value={player.bbRate}           max={22}   color="#a78bfa" th={th}/>
                      <StatBar label="SB"  value={Math.min(player.sb,500)} max={500}  color="#f59e0b" th={th}/>
                    </>) : (
                      <div style={{fontSize:11,color:th.textFaint,fontStyle:"italic",textAlign:"center",paddingTop:8}}>{t.statsHidden}</div>
                    )}
                    <button style={{width:"100%",marginTop:10,padding:"7px 0",background:"linear-gradient(135deg,#dc2626,#991b1b)",color:"#fff",border:"none",borderRadius:5,fontSize:12,fontWeight:600,cursor:"pointer"}}>{t.draftBtn}</button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ORDER — drag & drop batting order
// Layout: left = numbered slots (drop targets), right = bench (drag sources)
// A player can also be dragged from one slot to another to swap directly.
// ══════════════════════════════════════════════════════════════════════════════
function OrderPhase({ roster, mode, lang, setLang, theme, setTheme, showHtp, onComplete }) {
  const t = T[lang];
  const th = getTheme(theme);
  const S = makeS(th);

  // slots[0..8] = player or null  |  bench = unassigned players
  const initial = ROSTER_KEYS.map(k => roster[k]);
  const [slots,   setSlots]   = useState(initial);   // length-9 array
  const [bench,   setBench]   = useState([]);         // always empty at start (all pre-filled)

  // drag state: { from: "slot"|"bench", index: number }
  const [dragSrc,  setDragSrc]  = useState(null);
  const [dropTarget, setDropTarget] = useState(null); // { to: "slot"|"bench", index }

  // ── helpers ──────────────────────────────────────────────────────────────
  const allFilled = slots.every(s => s !== null);

  function startDrag(from, index) {
    setDragSrc({ from, index });
  }

  function enterTarget(to, index) {
    setDropTarget({ to, index });
  }

  function clearDrag() {
    setDragSrc(null);
    setDropTarget(null);
  }

  function handleDrop(to, toIndex) {
    if (!dragSrc) return;
    const { from, index: fromIndex } = dragSrc;
    const newSlots = [...slots];
    const newBench = [...bench];

    if (from === "slot" && to === "slot") {
      // Swap two slots
      [newSlots[fromIndex], newSlots[toIndex]] = [newSlots[toIndex], newSlots[fromIndex]];
    } else if (from === "bench" && to === "slot") {
      // Place bench player into slot; if slot occupied, push displaced to bench
      const displaced = newSlots[toIndex];
      newSlots[toIndex] = newBench[fromIndex];
      newBench.splice(fromIndex, 1);
      if (displaced) newBench.push(displaced);
    } else if (from === "slot" && to === "bench") {
      // Move slot player to bench
      newBench.push(newSlots[fromIndex]);
      newSlots[fromIndex] = null;
    } else if (from === "bench" && to === "bench") {
      // Reorder bench (no-op for our use case)
    }

    setSlots(newSlots);
    setBench(newBench);
    clearDrag();
  }

  // Click a bench player → place into first empty slot
  function placeBenchPlayer(bIdx) {
    const emptySlot = slots.findIndex(s => s === null);
    if (emptySlot === -1) return;
    const newSlots = [...slots];
    const newBench = [...bench];
    newSlots[emptySlot] = newBench[bIdx];
    newBench.splice(bIdx, 1);
    setSlots(newSlots);
    setBench(newBench);
  }

  // Click a slot player → remove to bench
  function removeFromSlot(slotIdx) {
    const newBench = [...bench, slots[slotIdx]];
    const newSlots = [...slots];
    newSlots[slotIdx] = null;
    setSlots(newSlots);
    setBench(newBench);
  }

  const isDraggingFrom = (from, idx) => dragSrc && dragSrc.from === from && dragSrc.index === idx;
  const isDropTarget   = (to, idx)   => dropTarget && dropTarget.to === to && dropTarget.index === idx;

  // Slot background/border based on state
  function slotStyle(i) {
    const occupied  = slots[i] !== null;
    const dragging  = isDraggingFrom("slot", i);
    const targeted  = isDropTarget("slot", i);
    return {
      display: "flex", alignItems: "stretch", borderRadius: 10, minHeight: 68,
      border: `2px solid ${targeted ? "#dc2626" : dragging ? "rgba(255,255,255,0.25)" : occupied ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)"}`,
      background: targeted ? "rgba(220,38,38,0.12)" : dragging ? th.doneCard : occupied ? th.card : th.legend,
      opacity: dragging ? 0.5 : 1,
      transition: "border 0.12s, background 0.12s",
      overflow: "hidden",
      cursor: occupied ? "grab" : "default",
    };
  }

  return (
    <div style={S.app}>
      <div style={S.header}>
        <div style={S.logo}>The <span style={S.red}>Lineup</span></div>
        <div style={{display:"flex", gap:10, alignItems:"center"}}>
          <LangSelect lang={lang} setLang={setLang} t={t} th={th}/>
          <button onClick={showHtp} style={{...S.ghostBtn, fontSize:12}}>❓ {t.howToPlayBtn}</button>
          <ThemeToggle theme={theme} setTheme={setTheme} t={t} th={th}/>
          <div style={S.badge}>{mode==="scout"?"SCOUT":"CLASSIC"}</div>
          <div style={{fontSize:12, color:th.textDim}}>{t.phase2Label}</div>
        </div>
      </div>
      <div style={{height:3, background:"#dc2626"}}/>

      <div style={{maxWidth:980, margin:"0 auto", padding:"20px 16px"}}>

        {/* Title */}
        <div style={{textAlign:"center", marginBottom:18}}>
          <div style={{fontSize:12, color:th.textDim, letterSpacing:2, marginBottom:3}}>{t.phase2Title}</div>
          <div style={{fontSize:13, color:th.textFaint}}>{t.phase2Hint}</div>
        </div>

        <div style={{display:"grid", gridTemplateColumns:"1fr 260px", gap:16, alignItems:"start"}}>

          {/* ── LEFT: 9 numbered slots ── */}
          <div>
            <div style={{fontSize:10, letterSpacing:2, color:th.textFaint, marginBottom:8}}>BATTING ORDER</div>
            <div style={{display:"flex", flexDirection:"column", gap:6}}>
              {slots.map((player, i) => (
                <div
                  key={i}
                  style={slotStyle(i)}
                  onDragOver={e => e.preventDefault()}
                  onDragEnter={() => enterTarget("slot", i)}
                  onDragLeave={() => setDropTarget(null)}
                  onDrop={() => handleDrop("slot", i)}
                >
                  {/* Slot number badge */}
                  <div style={{
                    minWidth: 52, display:"flex", flexDirection:"column",
                    alignItems:"center", justifyContent:"center",
                    background: th.tableHead,
                    borderRight: `1px solid ${th.cardBorder}`,
                    padding: "8px 4px",
                  }}>
                    <div style={{fontSize:24, fontWeight:900, color: player ? "#dc2626" : "#1e293b", lineHeight:1}}>{i+1}</div>
                    <div style={{fontSize:9, color:"#475569", marginTop:2, textAlign:"center", lineHeight:1.2}}>{t.slotRoles[i]}</div>
                  </div>

                  {/* Player card or empty drop zone */}
                  {player ? (
                    <div
                      draggable
                      onDragStart={() => startDrag("slot", i)}
                      onDragEnd={clearDrag}
                      style={{flex:1, display:"flex", alignItems:"center", gap:10, padding:"8px 12px", cursor:"grab"}}
                    >
                      {/* Drag handle */}
                      <div style={{color:th.textGhost, fontSize:14, userSelect:"none", flexShrink:0}}>⠿</div>

                      {/* Player info */}
                      <div style={{flex:1, minWidth:0}}>
                        <div style={{fontWeight:700, fontSize:14, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{player.name}</div>
                        <div style={{fontSize:11, color:th.textDim}}>
                          {player.pos}
                          {" · "}<span style={{color:"#fbbf24"}}>{player.era}</span>
                          {" · "}<span style={{color:"#94a3b8"}}>{player.team}</span>
                        </div>
                        {mode === "classic" && (
                          <div style={{fontSize:11, marginTop:2, display:"flex", gap:10}}>
                            <span>OBP <span style={{color:"#3b82f6"}}>{player.obp}</span></span>
                            <span>SLG <span style={{color:"#dc2626"}}>{player.slg}</span></span>
                            <span>AVG <span style={{color:"#22c55e"}}>{player.avg}</span></span>
                          </div>
                        )}
                      </div>

                      {/* Slot hint */}
                      <div style={{textAlign:"center", flexShrink:0, marginRight:4}}>
                        <div style={{fontSize:16}}>{t.slotIcons[i]}</div>
                        <div style={{fontSize:9, color:th.textFaint, maxWidth:50, lineHeight:1.3}}>{t.slotTips[i]}</div>
                      </div>

                      {/* Remove button */}
                      <button
                        onClick={() => removeFromSlot(i)}
                        title="Remove"
                        style={{
                          background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)",
                          color:th.textFaint, borderRadius:5, width:22, height:22, fontSize:13,
                          cursor:"pointer", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center",
                          lineHeight:1,
                        }}
                      >×</button>
                    </div>
                  ) : (
                    <div
                      onDragOver={e => e.preventDefault()}
                      style={{
                        flex:1, display:"flex", alignItems:"center", justifyContent:"center",
                        color: isDropTarget("slot",i) ? "#dc2626" : th.slotEmptyTxt,
                        fontSize:12, letterSpacing:1, fontStyle:"italic",
                        transition:"color 0.12s",
                      }}
                    >
                      {isDropTarget("slot",i) ? "DROP HERE" : "— empty —"}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: bench + simulate button ── */}
          <div style={{position:"sticky", top:16}}>
            <div style={{fontSize:10, letterSpacing:2, color:th.textFaint, marginBottom:8}}>
              {bench.length > 0 ? `BENCH (${bench.length})` : "ALL PLAYERS PLACED"}
            </div>

            {/* Bench drop zone */}
            <div
              onDragOver={e => e.preventDefault()}
              onDragEnter={() => enterTarget("bench", 0)}
              onDragLeave={() => setDropTarget(null)}
              onDrop={() => handleDrop("bench", 0)}
              style={{
                minHeight: 60, borderRadius:10, marginBottom:8,
                border: `2px dashed ${isDropTarget("bench",0) ? "#dc2626" : th.cardBorder}`,
                background: isDropTarget("bench",0) ? "rgba(220,38,38,0.06)" : "transparent",
                transition:"all 0.12s", padding: bench.length ? 0 : "0",
                display: bench.length ? "flex" : (isDropTarget("bench",0) ? "flex" : "none"),
                flexDirection:"column", gap:4, padding:"6px",
              }}
            >
              {bench.map((player, bIdx) => (
                <div
                  key={player.name}
                  draggable
                  onDragStart={() => startDrag("bench", bIdx)}
                  onDragEnd={clearDrag}
                  onClick={() => placeBenchPlayer(bIdx)}
                  style={{
                    display:"flex", alignItems:"center", gap:8,
                    padding:"8px 10px", borderRadius:8, cursor:"grab",
                    background: isDraggingFrom("bench",bIdx) ? th.doneCard : th.card,
                    border:`1px solid ${isDraggingFrom("bench",bIdx) ? th.cardBorder : th.cardBorder}`,
                    opacity: isDraggingFrom("bench",bIdx) ? 0.4 : 1,
                    transition:"all 0.1s",
                  }}
                >
                  <div style={{color:th.textGhost, fontSize:13, userSelect:"none"}}>⠿</div>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{fontSize:13, fontWeight:600, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{player.name}</div>
                    <div style={{fontSize:10, color:th.textDim}}>{player.pos} · <span style={{color:"#fbbf24"}}>{player.era}</span></div>
                  </div>
                  <div style={{fontSize:10, color:th.textGhost}}>tap to place</div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div style={{
              background:th.legend, border:`1px solid ${th.legendBorder}`,
              borderRadius:8, padding:"10px 12px", marginBottom:12, fontSize:11, color:th.textFaint, lineHeight:1.8,
            }}>
              <div>⠿ Drag a card to reorder</div>
              <div>× Remove from slot → bench</div>
              <div>↙ Tap bench card → first empty slot</div>
              <div>↔ Drag slot to slot → swap</div>
            </div>

            {/* Simulate button */}
            <button
              onClick={() => allFilled && onComplete(slots)}
              style={{
                ...S.btn(allFilled
                  ? "linear-gradient(135deg,#dc2626,#991b1b)"
                  : "rgba(255,255,255,0.04)"),
                width:"100%", opacity: allFilled ? 1 : 0.4,
                cursor: allFilled ? "pointer" : "not-allowed",
                border: allFilled ? "none" : `1px solid ${th.cardBorder}`,
              }}
            >
              {allFilled ? t.simulateBtn : `Fill all 9 slots (${slots.filter(Boolean).length}/9)`}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// RESULT
// ══════════════════════════════════════════════════════════════════════════════
function ResultPhase({ lineup, simResult, lang, setLang, theme, setTheme, showHtp, onRestart }) {
  const t  = T[lang];
  const th = getTheme(theme);
  const S  = makeS(th);

  // Safety net — root guarantees both are non-null before mounting ResultPhase
  if (!lineup || !simResult) return null;

  const wc = winColor(simResult.wins);
  const ps = simResult.playerStats || [];
  const [sh0,sh1,sh2,sh3,sh4,sh5,sh6,sh7,sh8,sh9,sh10] = t.seasonStatsHeaders;

  // Compute leaders
  const leaders = (t.leaders || []).map(ld => {
    const best = ps.reduce((acc, p) => {
      const val = parseFloat(p[ld.key]) || 0;
      return val > (parseFloat(acc[ld.key]) || 0) ? p : acc;
    }, ps[0] || {});
    const val = best ? best[ld.key] : "—";
    return { ...ld, player: best, value: val };
  });

  return (
    <div style={S.app}>
      <div style={S.header}>
        <div style={S.logo}>The <span style={S.red}>Lineup</span></div>
        <div style={{display:"flex", gap:10, alignItems:"center"}}>
          <LangSelect lang={lang} setLang={setLang} t={t} th={th}/>
          <button onClick={showHtp} style={{...S.ghostBtn, fontSize:12}}>❓ {t.howToPlayBtn}</button>
          <ThemeToggle theme={theme} setTheme={setTheme} t={t} th={th}/>
          <button onClick={onRestart} style={S.ghostBtn}>{t.newGame}</button>
        </div>
      </div>

      <div style={{maxWidth:900, margin:"0 auto", padding:"24px 16px"}}>

        {/* ── Win/Loss banner ── */}
        <div style={{textAlign:"center", marginBottom:28}}>
          <div style={{fontSize:11, letterSpacing:3, color:th.textDim, marginBottom:8}}>{t.resultTitle}</div>
          <div style={{fontSize:76, fontWeight:900, color:wc, lineHeight:1, letterSpacing:-2}}>
            {simResult.wins}
            <span style={{fontSize:24, color:th.textFaint, letterSpacing:0}}>-{162 - simResult.wins}</span>
          </div>
          <div style={{fontSize:13, color:th.textMuted, marginTop:6}}>
            {simResult.rpg} {t.rpgLabel}
            {" · "}
            <span style={{color:th.textDim}}>{simResult.totalRuns?.toLocaleString()} total runs</span>
          </div>
          <div style={{fontSize:17, color:wc, fontWeight:600, marginTop:10}}>{winLabel(simResult.wins, t)}</div>
        </div>

        {/* ── Season Leaders grid ── */}
        {ps.length > 0 && (
          <div style={{marginBottom:24}}>
            <div style={{fontSize:11, letterSpacing:2, color:th.textDim, marginBottom:12}}>{t.seasonLeaders}</div>
            <div style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8}}>
              {leaders.map((ld, i) => (
                <div key={i} style={{
                  background: th.card,
                  border: `1px solid ${th.cardBorder}`,
                  borderRadius: 10, padding:"12px 14px",
                  borderTop: `3px solid ${ld.color}`,
                }}>
                  <div style={{display:"flex", alignItems:"center", gap:6, marginBottom:6}}>
                    <span style={{fontSize:16}}>{ld.icon}</span>
                    <span style={{fontSize:10, color:th.textDim, letterSpacing:1, fontWeight:600}}>{ld.label.toUpperCase()}</span>
                  </div>
                  <div style={{fontSize:22, fontWeight:900, color:ld.color, lineHeight:1, marginBottom:4}}>
                    {String(ld.value).startsWith("0.") ? ld.value : ld.value}
                  </div>
                  <div style={{fontSize:12, fontWeight:600, color:th.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>
                    {ld.player?.name || "—"}
                  </div>
                  <div style={{fontSize:10, color:th.textDim}}>{ld.player?.pos} · {ld.player?.era}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Full season stats table ── */}
        {ps.length > 0 && (
          <div style={{marginBottom:24}}>
            <div style={{fontSize:11, letterSpacing:2, color:th.textDim, marginBottom:10}}>{t.seasonStatsTitle}</div>
            <div style={{background:th.legend, border:`1px solid ${th.tableBorder}`, borderRadius:12, overflow:"hidden"}}>
              {/* Header */}
              <div style={{
                padding:"8px 14px", background:th.tableHead,
                borderBottom:`1px solid ${th.tableBorder}`,
                display:"grid",
                gridTemplateColumns:"22px 1fr 32px 40px 40px 40px 44px 40px 40px 52px 52px",
                gap:6, fontSize:10, letterSpacing:1, color:th.textDim,
              }}>
                {[sh0,sh1,sh2,sh3,sh4,sh5,sh6,sh7,sh8,sh9,sh10].map((h,i)=>(
                  <div key={i} style={{textAlign: i>2?"center":"left"}}>{h}</div>
                ))}
              </div>
              {/* Rows — sorted by batting order */}
              {ps.map((p, i) => (
                <div key={i} style={{
                  padding:"9px 14px",
                  borderBottom:`1px solid ${th.rowBorder}`,
                  display:"grid",
                  gridTemplateColumns:"22px 1fr 32px 40px 40px 40px 44px 40px 40px 52px 52px",
                  gap:6, alignItems:"center",
                }}>
                  <div style={{fontSize:12, fontWeight:700, color:"#dc2626"}}>{i+1}</div>
                  <div>
                    <div style={{fontWeight:600, fontSize:13, color:th.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{p.name}</div>
                    <div style={{fontSize:10, color:"#fbbf24"}}>{p.era}</div>
                  </div>
                  <div style={{fontSize:10, color:th.textDim, fontFamily:"monospace", textAlign:"center"}}>{p.pos}</div>
                  {/* R */}
                  <div style={{textAlign:"center", fontSize:13, fontWeight: p.R===Math.max(...ps.map(x=>x.R))?700:400, color: p.R===Math.max(...ps.map(x=>x.R))?"#22c55e":th.textMuted}}>{p.R}</div>
                  {/* H */}
                  <div style={{textAlign:"center", fontSize:13, fontWeight: p.H===Math.max(...ps.map(x=>x.H))?700:400, color: p.H===Math.max(...ps.map(x=>x.H))?"#3b82f6":th.textMuted}}>{p.H}</div>
                  {/* HR */}
                  <div style={{textAlign:"center", fontSize:13, fontWeight: p.HR===Math.max(...ps.map(x=>x.HR))?700:400, color: p.HR===Math.max(...ps.map(x=>x.HR))?"#dc2626":th.textMuted}}>{p.HR}</div>
                  {/* RBI */}
                  <div style={{textAlign:"center", fontSize:13, fontWeight: p.RBI===Math.max(...ps.map(x=>x.RBI))?700:400, color: p.RBI===Math.max(...ps.map(x=>x.RBI))?"#f97316":th.textMuted}}>{p.RBI}</div>
                  {/* BB */}
                  <div style={{textAlign:"center", fontSize:13, color:th.textMuted}}>{p.BB}</div>
                  {/* SB */}
                  <div style={{textAlign:"center", fontSize:13, color:th.textMuted}}>{p.SB}</div>
                  {/* AVG */}
                  <div style={{textAlign:"center", fontSize:12, fontFamily:"monospace", color:"#a78bfa"}}>{p.AVG}</div>
                  {/* OBP */}
                  <div style={{textAlign:"center", fontSize:12, fontFamily:"monospace", color:"#fbbf24"}}>{p.OBP}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Lineup card stats (career) ── */}
        <div style={{marginBottom:24}}>
          <div style={{fontSize:11, letterSpacing:2, color:th.textDim, marginBottom:10}}>CAREER STATS</div>
          <div style={{background:th.legend, border:`1px solid ${th.tableBorder}`, borderRadius:12, overflow:"hidden"}}>
            <div style={{padding:"8px 14px", background:th.tableHead, borderBottom:`1px solid ${th.tableBorder}`, display:"grid", gridTemplateColumns:"22px 30px 1fr 58px 58px 58px 50px", gap:8, fontSize:10, letterSpacing:1, color:th.textDim}}>
              <div>#</div><div>POS</div><div>{t.seasonStatsHeaders[1]}</div>
              <div style={{textAlign:"center"}}>OBP</div>
              <div style={{textAlign:"center"}}>SLG</div>
              <div style={{textAlign:"center"}}>{t.colHeaders[5]}</div>
              <div style={{textAlign:"center"}}>{t.colHeaders[6]}</div>
            </div>
            {lineup.map((p, i) => (
              <div key={i} style={{padding:"9px 14px", borderBottom:`1px solid ${th.rowBorder}`, display:"grid", gridTemplateColumns:"22px 30px 1fr 58px 58px 58px 50px", gap:8, alignItems:"center"}}>
                <div style={{fontSize:13, fontWeight:900, color:"#dc2626"}}>{i+1}</div>
                <div style={{fontSize:10, color:th.textDim, fontFamily:"monospace"}}>{p.pos}</div>
                <div>
                  <div style={{fontWeight:600, fontSize:13, color:th.text}}>{p.name}</div>
                  <div style={{fontSize:10, color:"#fbbf24"}}>{p.era}</div>
                </div>
                <div style={{textAlign:"center", fontSize:13, color:"#3b82f6"}}>{p.obp}</div>
                <div style={{textAlign:"center", fontSize:13, color:"#dc2626"}}>{p.slg}</div>
                <div style={{textAlign:"center", fontSize:13, color:"#22c55e"}}>{p.avg}</div>
                <div style={{textAlign:"center", fontSize:13, color:"#f59e0b"}}>{p.sb}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{textAlign:"center", marginBottom:16}}>
          <button onClick={onRestart} style={S.btn("linear-gradient(135deg,#dc2626,#991b1b)")}>{t.playAgain}</button>
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
  // Store lineup + simResult together so they're always in sync
  const [gameResult, setGameResult] = useState(null); // { lineup, simResult }

  const t  = T[lang];
  const th = getTheme(theme);

  const handleStart   = m => { setMode(m); setPhase("draft"); };
  const handleDraft   = r => { setRoster(r); setPhase("order"); };
  const handleOrder   = o => {
    // Compute and commit everything in ONE state update, then change phase
    const result = simulateSeason(o);
    setGameResult({ lineup: o, simResult: result });
    setPhase("result");
  };
  const handleRestart = () => {
    setPhase("intro");
    setRoster(null);
    setGameResult(null);
  };
  const openHtp  = () => setShowHtp(true);
  const closeHtp = () => setShowHtp(false);

  const shared = { lang, setLang, theme, setTheme, showHtp: openHtp };

  return (
    <ErrorBoundary>
      {showHtp && <HowToPlay t={t} th={th} onClose={closeHtp}/>}
      {phase === "intro"  && <IntroPhase onStart={handleStart} {...shared}/>}
      {phase === "draft"  && <DraftPhase mode={mode} {...shared} onComplete={handleDraft}/>}
      {phase === "order"  && <OrderPhase roster={roster} mode={mode} {...shared} onComplete={handleOrder}/>}
      {phase === "result" && gameResult  && (
        <ResultPhase
          lineup={gameResult.lineup}
          simResult={gameResult.simResult}
          {...shared}
          onRestart={handleRestart}
        />
      )}
    </ErrorBoundary>
  );
}
