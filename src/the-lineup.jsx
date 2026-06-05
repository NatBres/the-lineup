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
function IntroPhase({ onStart, lang, setLang, theme, setTheme, showHtp }) {
  const t = T[lang];
  const th = getTheme(theme);
  const S = makeS(th);
  const [mode, setMode] = useState("classic");

  return (
    <div style={S.app}>
      {/* Header */}
      <div style={S.header}>
        <div style={S.logo}>The <span style={S.red}>Lineup</span></div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <LangSelect lang={lang} setLang={setLang} t={t} th={th}/>
          <ThemeToggle theme={theme} setTheme={setTheme} t={t} th={th}/>
          <button onClick={showHtp} style={{...S.ghostBtn,fontSize:13,padding:"5px 8px"}}>❓</button>
        </div>
      </div>

      {/* Body */}
      <div style={{padding:"32px 20px 40px",maxWidth:480,margin:"0 auto"}}>
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
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// DRAFT — mobile-first: position header + scrollable player cards (2 columns)
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

  // Compact roster strip at the top
  const rosterStrip = (
    <div style={{display:"flex",gap:4,overflowX:"auto",padding:"8px 16px",
      borderBottom:`1px solid ${th.cardBorder}`,WebkitOverflowScrolling:"touch"}}>
      {ROSTER_KEYS.map((k,i) => {
        const p = roster[k];
        const active = i === slotIdx;
        const done   = i < slotIdx;
        return (
          <div key={k} style={{
            flexShrink:0,padding:"5px 10px",borderRadius:8,textAlign:"center",
            background:active?"#dc2626":done?th.doneCard:th.card,
            border:`1px solid ${active?"#dc2626":done?th.doneBorder:th.cardBorder}`,
            minWidth:42,
          }}>
            <div style={{fontSize:10,fontWeight:700,color:active?"#fff":done?"#22c55e":th.textFaint}}>{k}</div>
            {done && <div style={{fontSize:9,color:"#22c55e"}}>✓</div>}
            {active && <div style={{fontSize:9,color:"rgba(255,255,255,0.8)"}}>←</div>}
            {!done && !active && <div style={{fontSize:9,color:th.textGhost}}>—</div>}
          </div>
        );
      })}
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
      <div style={{padding:"12px 12px 32px",overflowY:"auto"}}>
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
                      <StatBar label="OBP" value={player.obp} max={0.55} color="#3b82f6" th={th}/>
                      <StatBar label="SLG" value={player.slg} max={0.75} color="#dc2626" th={th}/>
                      <StatBar label="AVG" value={player.avg} max={0.40} color="#22c55e" th={th}/>
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
function OrderPhase({ roster, mode, lang, setLang, theme, setTheme, showHtp, onComplete }) {
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
        </div>
      </div>
      <div style={{height:3, background:"#dc2626"}}/>

      <div style={{padding:"14px 12px 100px"}}>

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
                      <span>OBP <span style={{color:"#3b82f6", fontWeight:600}}>{player.obp}</span></span>
                      <span>SLG <span style={{color:"#dc2626", fontWeight:600}}>{player.slg}</span></span>
                      <span>AVG <span style={{color:"#22c55e", fontWeight:600}}>{player.avg}</span></span>
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

      {/* Fixed bottom CTA */}
      <div style={{
        position:"fixed", bottom:0, left:0, right:0,
        padding:"12px 16px", paddingBottom:"calc(12px + env(safe-area-inset-bottom))",
        background: th.headerBg, backdropFilter:"blur(12px)",
        borderTop:`1px solid ${th.cardBorder}`,
      }}>
        <button onClick={() => onComplete(order)} style={{
          ...S.btn("linear-gradient(135deg,#dc2626,#991b1b)"),
          width:"100%", fontSize:16, padding:"15px", borderRadius:12,
        }}>{t.simulateBtn}</button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// RESULT — mobile: vertical layout, scrollable stats
// ══════════════════════════════════════════════════════════════════════════════
function ResultPhase({ lineup, simResult, lang, setLang, theme, setTheme, showHtp, onRestart }) {
  const t  = T[lang];
  const th = getTheme(theme);
  const S  = makeS(th);
  const [tab, setTab] = useState("leaders"); // leaders | season | career

  if (!lineup || !simResult) return null;

  const wc  = winColor(simResult.wins);
  const ps  = simResult.playerStats || [];

  const leaders = (t.leaders||[]).map(ld => {
    const best = ps.reduce((acc,p) => {
      return (parseFloat(p[ld.key])||0) > (parseFloat(acc[ld.key])||0) ? p : acc;
    }, ps[0]||{});
    return {...ld, player:best, value: best?best[ld.key]:"—"};
  });

  return (
    <div style={S.app}>
      {/* Header */}
      <div style={{...S.header,padding:"10px 16px"}}>
        <div style={S.logo}>The <span style={S.red}>Lineup</span></div>
        <div style={{display:"flex",gap:6,alignItems:"center"}}>
          <LangSelect lang={lang} setLang={setLang} t={t} th={th}/>
          <ThemeToggle theme={theme} setTheme={setTheme} t={t} th={th}/>
          <button onClick={showHtp} style={{...S.ghostBtn,fontSize:13}}>❓</button>
          <button onClick={onRestart} style={{...S.ghostBtn,fontSize:12}}>{t.newGame}</button>
        </div>
      </div>

      <div style={{padding:"20px 14px 40px"}}>
        {/* Win/Loss hero */}
        <div style={{textAlign:"center",marginBottom:20}}>
          <div style={{fontSize:11,letterSpacing:3,color:th.textDim,marginBottom:6}}>
            {t.resultTitle}
          </div>
          <div style={{fontSize:72,fontWeight:900,color:wc,lineHeight:1,letterSpacing:-2}}>
            {simResult.wins}
            <span style={{fontSize:22,color:th.textFaint,letterSpacing:0}}>
              -{162-simResult.wins}
            </span>
          </div>
          <div style={{fontSize:13,color:th.textMuted,marginTop:6}}>
            {simResult.rpg} {t.rpgLabel}
          </div>
          <div style={{fontSize:15,color:wc,fontWeight:700,marginTop:8}}>
            {winLabel(simResult.wins,t)}
          </div>
        </div>

        {/* Tab bar */}
        <div style={{display:"flex",gap:6,marginBottom:16,
          background:th.tableHead,borderRadius:10,padding:4}}>
          {[["leaders","🏆"],["season","📊"],["career","📋"]].map(([key,icon])=>(
            <button key={key} onClick={()=>setTab(key)} style={{
              flex:1,padding:"9px 4px",borderRadius:8,border:"none",
              background:tab===key?"#dc2626":t.transparent,
              color:tab===key?"#fff":th.textMuted,
              fontSize:12,fontWeight:tab===key?700:400,cursor:"pointer",
              touchAction:"manipulation",transition:"all 0.15s",
            }}>{icon} {key==="leaders"?t.seasonLeaders?.split(" ")[0]||"Leaders":key==="season"?"Stats":"Career"}</button>
          ))}
        </div>

        {/* LEADERS TAB */}
        {tab==="leaders" && ps.length>0 && (
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {leaders.map((ld,i)=>(
              <div key={i} style={{
                background:th.card,border:`1px solid ${th.cardBorder}`,
                borderRadius:12,padding:"12px",
                borderTop:`3px solid ${ld.color}`,
              }}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                  <span style={{fontSize:18}}>{ld.icon}</span>
                  <span style={{fontSize:9,color:th.textDim,letterSpacing:1,fontWeight:600}}>
                    {ld.label.toUpperCase()}
                  </span>
                </div>
                <div style={{fontSize:24,fontWeight:900,color:ld.color,lineHeight:1,marginBottom:4}}>
                  {ld.value}
                </div>
                <div style={{fontSize:12,fontWeight:600,color:th.text,
                  whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
                  {ld.player?.name||"—"}
                </div>
                <div style={{fontSize:10,color:th.textDim}}>
                  {ld.player?.pos} · {ld.player?.era}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SEASON STATS TAB */}
        {tab==="season" && ps.length>0 && (
          <div style={{overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead>
                <tr style={{background:th.tableHead}}>
                  {["#","PLAYER","R","H","HR","RBI","AVG"].map(h=>(
                    <th key={h} style={{padding:"8px 6px",textAlign:h==="PLAYER"?"left":"center",
                      color:th.textDim,fontWeight:600,fontSize:10,whiteSpace:"nowrap",
                      borderBottom:`1px solid ${th.tableBorder}`}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ps.map((p,i)=>{
                  const maxHR = Math.max(...ps.map(x=>x.HR));
                  const maxR  = Math.max(...ps.map(x=>x.R));
                  return (
                    <tr key={i} style={{borderBottom:`1px solid ${th.rowBorder}`}}>
                      <td style={{padding:"8px 6px",color:"#dc2626",fontWeight:700,textAlign:"center"}}>{i+1}</td>
                      <td style={{padding:"8px 6px"}}>
                        <div style={{fontWeight:600,color:th.text,whiteSpace:"nowrap"}}>{p.name}</div>
                        <div style={{fontSize:10,color:"#fbbf24"}}>{p.era}</div>
                      </td>
                      <td style={{padding:"8px 6px",textAlign:"center",
                        color:p.R===maxR?"#22c55e":th.textMuted,
                        fontWeight:p.R===maxR?700:400}}>{p.R}</td>
                      <td style={{padding:"8px 6px",textAlign:"center",color:th.textMuted}}>{p.H}</td>
                      <td style={{padding:"8px 6px",textAlign:"center",
                        color:p.HR===maxHR?"#dc2626":th.textMuted,
                        fontWeight:p.HR===maxHR?700:400}}>{p.HR}</td>
                      <td style={{padding:"8px 6px",textAlign:"center",color:th.textMuted}}>{p.RBI}</td>
                      <td style={{padding:"8px 6px",textAlign:"center",color:"#a78bfa",fontFamily:"monospace"}}>{p.AVG}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* CAREER STATS TAB */}
        {tab==="career" && (
          <div style={{overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead>
                <tr style={{background:th.tableHead}}>
                  {["#","PLAYER","OBP","SLG","AVG"].map(h=>(
                    <th key={h} style={{padding:"8px 6px",textAlign:h==="PLAYER"?"left":"center",
                      color:th.textDim,fontWeight:600,fontSize:10,whiteSpace:"nowrap",
                      borderBottom:`1px solid ${th.tableBorder}`}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lineup.map((p,i)=>(
                  <tr key={i} style={{borderBottom:`1px solid ${th.rowBorder}`}}>
                    <td style={{padding:"8px 6px",color:"#dc2626",fontWeight:700,textAlign:"center"}}>{i+1}</td>
                    <td style={{padding:"8px 6px"}}>
                      <div style={{fontWeight:600,color:th.text,whiteSpace:"nowrap"}}>{p.name}</div>
                      <div style={{fontSize:10,color:"#fbbf24"}}>{p.era} · {p.pos}</div>
                    </td>
                    <td style={{padding:"8px 6px",textAlign:"center",color:"#3b82f6",fontFamily:"monospace"}}>{p.obp}</td>
                    <td style={{padding:"8px 6px",textAlign:"center",color:"#dc2626",fontFamily:"monospace"}}>{p.slg}</td>
                    <td style={{padding:"8px 6px",textAlign:"center",color:"#22c55e",fontFamily:"monospace"}}>{p.avg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <button onClick={onRestart} style={{
          ...S.btn("linear-gradient(135deg,#dc2626,#991b1b)"),
          width:"100%",fontSize:16,padding:"16px",borderRadius:12,marginTop:24,
        }}>{t.playAgain}</button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// HOW TO PLAY — mobile modal, scrollable
// ══════════════════════════════════════════════════════════════════════════════
function HowToPlay({ t, th, onClose }) {
  const h = t.htp;
  return (
    <div style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(0,0,0,0.7)",
      backdropFilter:"blur(4px)",overflowY:"auto",WebkitOverflowScrolling:"touch"}}
      onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{
        background:th.modalBg,borderRadius:"16px 16px 0 0",
        margin:"60px 0 0 0",minHeight:"calc(100vh - 60px)",padding:"20px 16px 40px",
        border:`1px solid ${th.modalBorder}`,
      }}>
        {/* Handle bar */}
        <div style={{width:40,height:4,background:th.cardBorder,borderRadius:2,
          margin:"0 auto 16px",cursor:"pointer"}} onClick={onClose}/>

        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <div style={{fontSize:20,fontWeight:700,color:th.text}}>⚾ {h.title}</div>
          <button onClick={onClose} style={{background:"transparent",border:"none",
            color:th.textDim,fontSize:24,cursor:"pointer",padding:"0 4px"}}>{h.close}</button>
        </div>

        {/* Phases */}
        <div style={{marginBottom:20}}>
          {h.phases.map((p,i)=>(
            <div key={i} style={{display:"flex",gap:12,marginBottom:12,padding:"12px",
              background:th.card,border:`1px solid ${th.cardBorder}`,borderRadius:10}}>
              <div style={{fontSize:22,flexShrink:0}}>{p.icon}</div>
              <div>
                <div style={{fontWeight:700,fontSize:14,color:th.text,marginBottom:4}}>{p.title}</div>
                <div style={{fontSize:13,color:th.textMuted,lineHeight:1.6}}>{p.body}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Scoring */}
        <div style={{marginBottom:20}}>
          <div style={{fontSize:12,fontWeight:700,letterSpacing:1,color:th.textDim,marginBottom:10}}>
            {h.scoring.title.toUpperCase()}
          </div>
          {h.scoring.items.map((item,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
              <div style={{minWidth:36,fontWeight:700,fontSize:12,color:item.color,fontFamily:"monospace"}}>{item.stat}</div>
              <div style={{flex:1,height:4,background:th.statBar,borderRadius:2}}>
                <div style={{height:"100%",width:`${50+i*10}%`,background:item.color,borderRadius:2}}/>
              </div>
              <div style={{fontSize:11,color:th.textMuted,flex:2,lineHeight:1.4}}>{item.desc}</div>
            </div>
          ))}
        </div>

        {/* Win targets */}
        <div style={{marginBottom:20}}>
          <div style={{fontSize:12,fontWeight:700,letterSpacing:1,color:th.textDim,marginBottom:10}}>
            {h.wins.title.toUpperCase()}
          </div>
          {h.wins.items.map((w,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",
              background:th.card,border:`1px solid ${th.cardBorder}`,borderRadius:8,marginBottom:6}}>
              <div style={{fontSize:13,fontWeight:800,color:w.color,minWidth:36,fontFamily:"monospace"}}>{w.threshold}</div>
              <div style={{fontSize:12,color:th.textMuted}}>{w.label}</div>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div>
          <div style={{fontSize:12,fontWeight:700,letterSpacing:1,color:th.textDim,marginBottom:10}}>
            {h.tips.title.toUpperCase()}
          </div>
          {h.tips.items.map((tip,i)=>(
            <div key={i} style={{display:"flex",gap:8,marginBottom:10}}>
              <div style={{color:"#dc2626",flexShrink:0}}>▸</div>
              <div style={{fontSize:13,color:th.textMuted,lineHeight:1.6}}>{tip}</div>
            </div>
          ))}
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
  const handleRestart = () => { setPhase("intro"); setRoster(null); setGameResult(null); };
  const openHtp  = () => setShowHtp(true);
  const closeHtp = () => setShowHtp(false);
  const shared = { lang, setLang, theme, setTheme, showHtp: openHtp };

  return (
    <ErrorBoundary>
      {showHtp && <HowToPlay t={t} th={th} onClose={closeHtp}/>}
      {phase==="intro"  && <IntroPhase  onStart={handleStart}  {...shared}/>}
      {phase==="draft"  && <DraftPhase  mode={mode}            {...shared} onComplete={handleDraft}/>}
      {phase==="order"  && <OrderPhase  roster={roster} mode={mode} {...shared} onComplete={handleOrder}/>}
      {phase==="result" && gameResult && (
        <ResultPhase lineup={gameResult.lineup} simResult={gameResult.simResult}
          {...shared} onRestart={handleRestart}/>
      )}
    </ErrorBoundary>
  );
}
