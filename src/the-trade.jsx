import { useState, useEffect } from "react";

const ALL_PLAYERS = [
  { id: 1, name: "Ty Cobb", era: "1910s", pos: "CF", type: "batter", war: 151, ops: 0.945, avg: 0.366, hr: 117, rbi: 1938, sb: 892, obp: 0.433, slg: 0.512, bbRate: 11.8, defRating: 85 },
  { id: 2, name: "Honus Wagner", era: "1900s", pos: "SS", type: "batter", war: 130, ops: 0.858, avg: 0.328, hr: 101, rbi: 1732, sb: 723, obp: 0.391, slg: 0.467, bbRate: 10.5, defRating: 96 },
  { id: 3, name: "Tris Speaker", era: "1910s", pos: "CF", type: "batter", war: 134, ops: 0.928, avg: 0.345, hr: 117, rbi: 1529, sb: 436, obp: 0.428, slg: 0.5, bbRate: 12.5, defRating: 97 },
  { id: 4, name: "Nap Lajoie", era: "1900s", pos: "2B", type: "batter", war: 107, ops: 0.848, avg: 0.338, hr: 83, rbi: 1599, sb: 380, obp: 0.38, slg: 0.467, bbRate: 6.0, defRating: 90 },
  { id: 5, name: "Eddie Collins", era: "1910s", pos: "2B", type: "batter", war: 123, ops: 0.853, avg: 0.333, hr: 47, rbi: 1300, sb: 741, obp: 0.424, slg: 0.429, bbRate: 14.9, defRating: 93 },
  { id: 6, name: "Babe Ruth", era: "1920s", pos: "RF", type: "batter", war: 183, ops: 1.164, avg: 0.342, hr: 714, rbi: 2213, sb: 123, obp: 0.484, slg: 0.69, bbRate: 19.4, defRating: 72 },
  { id: 7, name: "Rogers Hornsby", era: "1920s", pos: "2B", type: "batter", war: 127, ops: 1.01, avg: 0.358, hr: 301, rbi: 1584, sb: 135, obp: 0.434, slg: 0.577, bbRate: 13.1, defRating: 78 },
  { id: 8, name: "George Sisler", era: "1920s", pos: "1B", type: "batter", war: 54, ops: 0.847, avg: 0.34, hr: 102, rbi: 1175, sb: 375, obp: 0.379, slg: 0.468, bbRate: 8.0, defRating: 89 },
  { id: 9, name: "Harry Heilmann", era: "1920s", pos: "RF", type: "batter", war: 59, ops: 0.95, avg: 0.342, hr: 183, rbi: 1539, sb: 113, obp: 0.41, slg: 0.52, bbRate: 10.5, defRating: 75 },
  { id: 10, name: "Sam Rice", era: "1920s", pos: "RF", type: "batter", war: 53, ops: 0.759, avg: 0.322, hr: 34, rbi: 1078, sb: 351, obp: 0.374, slg: 0.385, bbRate: 8.5, defRating: 82 },
  { id: 11, name: "Lou Gehrig", era: "1930s", pos: "1B", type: "batter", war: 180, ops: 1.08, avg: 0.34, hr: 493, rbi: 1995, sb: 102, obp: 0.447, slg: 0.632, bbRate: 14.2, defRating: 80 },
  { id: 12, name: "Jimmie Foxx", era: "1930s", pos: "1B", type: "batter", war: 96, ops: 1.038, avg: 0.325, hr: 534, rbi: 1922, sb: 87, obp: 0.428, slg: 0.609, bbRate: 13.2, defRating: 76 },
  { id: 13, name: "Mel Ott", era: "1930s", pos: "RF", type: "batter", war: 107, ops: 0.947, avg: 0.304, hr: 511, rbi: 1860, sb: 89, obp: 0.414, slg: 0.533, bbRate: 15.3, defRating: 82 },
  { id: 14, name: "Hank Greenberg", era: "1930s", pos: "1B", type: "batter", war: 59, ops: 1.017, avg: 0.313, hr: 331, rbi: 1276, sb: 58, obp: 0.412, slg: 0.605, bbRate: 13.9, defRating: 74 },
  { id: 15, name: "Charlie Gehringer", era: "1930s", pos: "2B", type: "batter", war: 81, ops: 0.884, avg: 0.32, hr: 184, rbi: 1427, sb: 181, obp: 0.404, slg: 0.48, bbRate: 11.9, defRating: 91 },
  { id: 16, name: "Joe Medwick", era: "1930s", pos: "LF", type: "batter", war: 56, ops: 0.915, avg: 0.324, hr: 205, rbi: 1383, sb: 42, obp: 0.362, slg: 0.505, bbRate: 6.0, defRating: 80 },
  { id: 17, name: "Ted Williams", era: "1940s", pos: "LF", type: "batter", war: 123, ops: 1.115, avg: 0.344, hr: 521, rbi: 1839, sb: 24, obp: 0.482, slg: 0.634, bbRate: 20.6, defRating: 74 },
  { id: 18, name: "Stan Musial", era: "1940s", pos: "LF", type: "batter", war: 128, ops: 1.006, avg: 0.331, hr: 475, rbi: 1951, sb: 78, obp: 0.417, slg: 0.559, bbRate: 12.4, defRating: 85 },
  { id: 19, name: "Joe DiMaggio", era: "1940s", pos: "CF", type: "batter", war: 78, ops: 0.977, avg: 0.325, hr: 361, rbi: 1537, sb: 30, obp: 0.398, slg: 0.579, bbRate: 9.4, defRating: 95 },
  { id: 20, name: "Bob Elliott", era: "1940s", pos: "3B", type: "batter", war: 53, ops: 0.829, avg: 0.289, hr: 170, rbi: 1195, sb: 35, obp: 0.389, slg: 0.44, bbRate: 11.2, defRating: 79 },
  { id: 21, name: "Willie Mays", era: "1950s", pos: "CF", type: "batter", war: 156, ops: 0.941, avg: 0.302, hr: 660, rbi: 1903, sb: 338, obp: 0.384, slg: 0.557, bbRate: 11.0, defRating: 98 },
  { id: 22, name: "Mickey Mantle", era: "1950s", pos: "CF", type: "batter", war: 110, ops: 0.977, avg: 0.298, hr: 536, rbi: 1509, sb: 153, obp: 0.421, slg: 0.557, bbRate: 17.3, defRating: 88 },
  { id: 23, name: "Duke Snider", era: "1950s", pos: "CF", type: "batter", war: 66, ops: 0.919, avg: 0.295, hr: 407, rbi: 1333, sb: 99, obp: 0.38, slg: 0.54, bbRate: 11.4, defRating: 90 },
  { id: 24, name: "Eddie Mathews", era: "1950s", pos: "3B", type: "batter", war: 97, ops: 0.885, avg: 0.271, hr: 512, rbi: 1453, sb: 68, obp: 0.376, slg: 0.509, bbRate: 14.2, defRating: 87 },
  { id: 25, name: "Yogi Berra", era: "1950s", pos: "C", type: "batter", war: 60, ops: 0.83, avg: 0.285, hr: 358, rbi: 1430, sb: 30, obp: 0.348, slg: 0.482, bbRate: 6.4, defRating: 94 },
  { id: 26, name: "Roy Campanella", era: "1950s", pos: "C", type: "batter", war: 34, ops: 0.893, avg: 0.276, hr: 242, rbi: 856, sb: 25, obp: 0.36, slg: 0.5, bbRate: 10.0, defRating: 96 },
  { id: 27, name: "Minnie Minoso", era: "1950s", pos: "LF", type: "batter", war: 55, ops: 0.882, avg: 0.298, hr: 186, rbi: 1023, sb: 205, obp: 0.389, slg: 0.459, bbRate: 12.2, defRating: 86 },
  { id: 28, name: "Hank Aaron", era: "1960s", pos: "RF", type: "batter", war: 143, ops: 0.928, avg: 0.305, hr: 755, rbi: 2297, sb: 240, obp: 0.374, slg: 0.555, bbRate: 9.5, defRating: 90 },
  { id: 29, name: "Frank Robinson", era: "1960s", pos: "RF", type: "batter", war: 107, ops: 0.926, avg: 0.294, hr: 586, rbi: 1812, sb: 204, obp: 0.389, slg: 0.537, bbRate: 12.0, defRating: 85 },
  { id: 30, name: "Carl Yastrzemski", era: "1960s", pos: "LF", type: "batter", war: 97, ops: 0.841, avg: 0.285, hr: 452, rbi: 1844, sb: 168, obp: 0.382, slg: 0.462, bbRate: 12.3, defRating: 92 },
  { id: 31, name: "Roberto Clemente", era: "1960s", pos: "RF", type: "batter", war: 95, ops: 0.834, avg: 0.317, hr: 240, rbi: 1305, sb: 83, obp: 0.359, slg: 0.475, bbRate: 6.7, defRating: 97 },
  { id: 32, name: "Billy Williams", era: "1960s", pos: "LF", type: "batter", war: 63, ops: 0.906, avg: 0.29, hr: 426, rbi: 1475, sb: 90, obp: 0.361, slg: 0.492, bbRate: 9.8, defRating: 82 },
  { id: 33, name: "Ron Santo", era: "1960s", pos: "3B", type: "batter", war: 70, ops: 0.872, avg: 0.277, hr: 342, rbi: 1331, sb: 35, obp: 0.362, slg: 0.464, bbRate: 12.0, defRating: 95 },
  { id: 34, name: "Ernie Banks", era: "1960s", pos: "SS", type: "batter", war: 68, ops: 0.886, avg: 0.274, hr: 512, rbi: 1636, sb: 50, obp: 0.33, slg: 0.5, bbRate: 7.5, defRating: 87 },
  { id: 35, name: "Johnny Bench", era: "1970s", pos: "C", type: "batter", war: 75, ops: 0.821, avg: 0.267, hr: 389, rbi: 1376, sb: 68, obp: 0.345, slg: 0.476, bbRate: 9.5, defRating: 99 },
  { id: 36, name: "Joe Morgan", era: "1970s", pos: "2B", type: "batter", war: 101, ops: 0.819, avg: 0.271, hr: 268, rbi: 1133, sb: 689, obp: 0.392, slg: 0.427, bbRate: 14.7, defRating: 94 },
  { id: 37, name: "Mike Schmidt", era: "1970s", pos: "3B", type: "batter", war: 107, ops: 0.908, avg: 0.267, hr: 548, rbi: 1595, sb: 174, obp: 0.384, slg: 0.527, bbRate: 15.2, defRating: 97 },
  { id: 38, name: "Rod Carew", era: "1970s", pos: "2B", type: "batter", war: 83, ops: 0.822, avg: 0.328, hr: 92, rbi: 1015, sb: 353, obp: 0.393, slg: 0.429, bbRate: 10.6, defRating: 80 },
  { id: 39, name: "Pete Rose", era: "1970s", pos: "LF", type: "batter", war: 79, ops: 0.784, avg: 0.303, hr: 160, rbi: 1314, sb: 198, obp: 0.375, slg: 0.409, bbRate: 11.1, defRating: 80 },
  { id: 40, name: "Dave Winfield", era: "1970s", pos: "RF", type: "batter", war: 64, ops: 0.827, avg: 0.283, hr: 465, rbi: 1833, sb: 223, obp: 0.353, slg: 0.475, bbRate: 9.8, defRating: 88 },
  { id: 41, name: "George Brett", era: "1970s", pos: "3B", type: "batter", war: 89, ops: 0.857, avg: 0.305, hr: 317, rbi: 1595, sb: 201, obp: 0.369, slg: 0.487, bbRate: 10.4, defRating: 85 },
  { id: 42, name: "Carl Yastrzemski", era: "1970s", pos: "LF", type: "batter", war: 65, ops: 0.811, avg: 0.28, hr: 452, rbi: 1844, sb: 60, obp: 0.38, slg: 0.43, bbRate: 12.0, defRating: 88 },
  { id: 43, name: "Rickey Henderson", era: "1980s", pos: "LF", type: "batter", war: 111, ops: 0.82, avg: 0.279, hr: 297, rbi: 1115, sb: 1406, obp: 0.401, slg: 0.419, bbRate: 15.2, defRating: 85 },
  { id: 44, name: "Wade Boggs", era: "1980s", pos: "3B", type: "batter", war: 91, ops: 0.858, avg: 0.328, hr: 118, rbi: 1014, sb: 24, obp: 0.415, slg: 0.443, bbRate: 15.6, defRating: 89 },
  { id: 45, name: "Tony Gwynn", era: "1980s", pos: "RF", type: "batter", war: 69, ops: 0.847, avg: 0.338, hr: 135, rbi: 1138, sb: 319, obp: 0.388, slg: 0.459, bbRate: 8.0, defRating: 90 },
  { id: 46, name: "Cal Ripken Jr.", era: "1980s", pos: "SS", type: "batter", war: 96, ops: 0.788, avg: 0.276, hr: 431, rbi: 1695, sb: 36, obp: 0.34, slg: 0.447, bbRate: 8.4, defRating: 91 },
  { id: 47, name: "Ozzie Smith", era: "1980s", pos: "SS", type: "batter", war: 76, ops: 0.724, avg: 0.262, hr: 28, rbi: 793, sb: 580, obp: 0.337, slg: 0.328, bbRate: 9.5, defRating: 99 },
  { id: 48, name: "Tim Raines", era: "1980s", pos: "LF", type: "batter", war: 69, ops: 0.81, avg: 0.294, hr: 170, rbi: 980, sb: 808, obp: 0.385, slg: 0.425, bbRate: 12.5, defRating: 83 },
  { id: 49, name: "Andre Dawson", era: "1980s", pos: "CF", type: "batter", war: 65, ops: 0.823, avg: 0.279, hr: 438, rbi: 1591, sb: 314, obp: 0.323, slg: 0.482, bbRate: 5.5, defRating: 93 },
  { id: 50, name: "Mike Boddicker", era: "1980s", pos: "RF", type: "batter", war: 44, ops: 0.782, avg: 0.261, hr: 200, rbi: 820, sb: 45, obp: 0.321, slg: 0.463, bbRate: 8.0, defRating: 80 },
  { id: 51, name: "Barry Bonds", era: "1990s", pos: "LF", type: "batter", war: 163, ops: 1.051, avg: 0.298, hr: 762, rbi: 1996, sb: 514, obp: 0.444, slg: 0.607, bbRate: 18.2, defRating: 92 },
  { id: 52, name: "Ken Griffey Jr.", era: "1990s", pos: "CF", type: "batter", war: 84, ops: 0.907, avg: 0.284, hr: 630, rbi: 1836, sb: 184, obp: 0.37, slg: 0.568, bbRate: 10.4, defRating: 97 },
  { id: 53, name: "Frank Thomas", era: "1990s", pos: "1B", type: "batter", war: 74, ops: 0.974, avg: 0.301, hr: 521, rbi: 1704, sb: 32, obp: 0.419, slg: 0.555, bbRate: 17.1, defRating: 70 },
  { id: 54, name: "Alex Rodriguez", era: "1990s", pos: "SS", type: "batter", war: 117, ops: 0.939, avg: 0.295, hr: 696, rbi: 2086, sb: 329, obp: 0.38, slg: 0.56, bbRate: 10.5, defRating: 88 },
  { id: 55, name: "Jeff Bagwell", era: "1990s", pos: "1B", type: "batter", war: 80, ops: 0.948, avg: 0.297, hr: 449, rbi: 1529, sb: 202, obp: 0.408, slg: 0.54, bbRate: 14.4, defRating: 83 },
  { id: 56, name: "Larry Walker", era: "1990s", pos: "RF", type: "batter", war: 72, ops: 0.965, avg: 0.313, hr: 383, rbi: 1311, sb: 230, obp: 0.4, slg: 0.565, bbRate: 13.5, defRating: 90 },
  { id: 57, name: "Craig Biggio", era: "1990s", pos: "2B", type: "batter", war: 66, ops: 0.796, avg: 0.281, hr: 291, rbi: 1175, sb: 414, obp: 0.363, slg: 0.433, bbRate: 11.2, defRating: 85 },
  { id: 58, name: "Roberto Alomar", era: "1990s", pos: "2B", type: "batter", war: 67, ops: 0.814, avg: 0.3, hr: 210, rbi: 1134, sb: 474, obp: 0.371, slg: 0.443, bbRate: 10.5, defRating: 96 },
  { id: 59, name: "Chipper Jones", era: "1990s", pos: "3B", type: "batter", war: 85, ops: 0.93, avg: 0.303, hr: 468, rbi: 1623, sb: 150, obp: 0.401, slg: 0.529, bbRate: 13.5, defRating: 86 },
  { id: 60, name: "Mike Piazza", era: "1990s", pos: "C", type: "batter", war: 59, ops: 0.922, avg: 0.308, hr: 427, rbi: 1335, sb: 17, obp: 0.377, slg: 0.545, bbRate: 9.0, defRating: 72 },
  { id: 61, name: "Albert Pujols", era: "2000s", pos: "1B", type: "batter", war: 99, ops: 1.037, avg: 0.328, hr: 700, rbi: 2218, sb: 117, obp: 0.42, slg: 0.617, bbRate: 13.5, defRating: 86 },
  { id: 62, name: "Ichiro Suzuki", era: "2000s", pos: "RF", type: "batter", war: 60, ops: 0.757, avg: 0.311, hr: 117, rbi: 780, sb: 509, obp: 0.355, slg: 0.402, bbRate: 5.7, defRating: 97 },
  { id: 63, name: "David Ortiz", era: "2000s", pos: "DH", type: "batter", war: 55, ops: 0.931, avg: 0.286, hr: 541, rbi: 1768, sb: 17, obp: 0.38, slg: 0.552, bbRate: 12.3, defRating: 60 },
  { id: 64, name: "Chase Utley", era: "2000s", pos: "2B", type: "batter", war: 65, ops: 0.837, avg: 0.282, hr: 259, rbi: 1025, sb: 154, obp: 0.358, slg: 0.479, bbRate: 10.3, defRating: 91 },
  { id: 65, name: "Derek Jeter", era: "2000s", pos: "SS", type: "batter", war: 72, ops: 0.817, avg: 0.31, hr: 260, rbi: 1311, sb: 358, obp: 0.377, slg: 0.44, bbRate: 9.5, defRating: 78 },
  { id: 66, name: "Vladimir Guerrero", era: "2000s", pos: "RF", type: "batter", war: 59, ops: 0.931, avg: 0.318, hr: 449, rbi: 1496, sb: 181, obp: 0.379, slg: 0.553, bbRate: 7.5, defRating: 80 },
  { id: 67, name: "Jim Thome", era: "2000s", pos: "1B", type: "batter", war: 72, ops: 0.956, avg: 0.276, hr: 612, rbi: 1699, sb: 19, obp: 0.402, slg: 0.554, bbRate: 16.5, defRating: 75 },
  { id: 68, name: "Lance Berkman", era: "2000s", pos: "1B", type: "batter", war: 52, ops: 0.932, avg: 0.293, hr: 366, rbi: 1234, sb: 86, obp: 0.406, slg: 0.526, bbRate: 14.5, defRating: 78 },
  { id: 69, name: "Carlos Beltran", era: "2000s", pos: "CF", type: "batter", war: 70, ops: 0.859, avg: 0.282, hr: 435, rbi: 1587, sb: 312, obp: 0.35, slg: 0.5, bbRate: 11.0, defRating: 93 },
  { id: 70, name: "Gary Sheffield", era: "2000s", pos: "RF", type: "batter", war: 61, ops: 0.907, avg: 0.292, hr: 509, rbi: 1676, sb: 253, obp: 0.393, slg: 0.514, bbRate: 14.0, defRating: 72 },
  { id: 71, name: "Mike Trout", era: "2010s", pos: "CF", type: "batter", war: 85, ops: 0.996, avg: 0.299, hr: 379, rbi: 1130, sb: 204, obp: 0.414, slg: 0.582, bbRate: 15.4, defRating: 91 },
  { id: 72, name: "Mookie Betts", era: "2010s", pos: "RF", type: "batter", war: 57, ops: 0.864, avg: 0.291, hr: 239, rbi: 800, sb: 161, obp: 0.364, slg: 0.503, bbRate: 11.0, defRating: 97 },
  { id: 73, name: "Bryce Harper", era: "2010s", pos: "RF", type: "batter", war: 50, ops: 0.9, avg: 0.279, hr: 337, rbi: 1047, sb: 130, obp: 0.388, slg: 0.512, bbRate: 14.2, defRating: 82 },
  { id: 74, name: "Paul Goldschmidt", era: "2010s", pos: "1B", type: "batter", war: 52, ops: 0.891, avg: 0.292, hr: 332, rbi: 1135, sb: 174, obp: 0.389, slg: 0.502, bbRate: 14.0, defRating: 89 },
  { id: 75, name: "Nolan Arenado", era: "2010s", pos: "3B", type: "batter", war: 57, ops: 0.879, avg: 0.293, hr: 332, rbi: 1136, sb: 41, obp: 0.348, slg: 0.53, bbRate: 8.5, defRating: 99 },
  { id: 76, name: "José Altuve", era: "2010s", pos: "2B", type: "batter", war: 52, ops: 0.843, avg: 0.309, hr: 209, rbi: 843, sb: 319, obp: 0.353, slg: 0.49, bbRate: 7.5, defRating: 84 },
  { id: 77, name: "Francisco Lindor", era: "2010s", pos: "SS", type: "batter", war: 42, ops: 0.824, avg: 0.281, hr: 218, rbi: 793, sb: 131, obp: 0.347, slg: 0.477, bbRate: 9.0, defRating: 92 },
  { id: 78, name: "Shohei Ohtani", era: "2020s", pos: "DH", type: "batter", war: 49, ops: 0.979, avg: 0.285, hr: 285, rbi: 704, sb: 149, obp: 0.387, slg: 0.592, bbRate: 13.6, defRating: 75 },
  { id: 79, name: "Freddie Freeman", era: "2020s", pos: "1B", type: "batter", war: 47, ops: 0.906, avg: 0.3, hr: 296, rbi: 1117, sb: 97, obp: 0.394, slg: 0.513, bbRate: 13.2, defRating: 83 },
  { id: 80, name: "Juan Soto", era: "2020s", pos: "RF", type: "batter", war: 45, ops: 0.939, avg: 0.285, hr: 218, rbi: 634, sb: 58, obp: 0.421, slg: 0.519, bbRate: 18.5, defRating: 82 },
  { id: 81, name: "Fernando Tatis Jr.", era: "2020s", pos: "SS", type: "batter", war: 26, ops: 0.895, avg: 0.282, hr: 168, rbi: 476, sb: 113, obp: 0.365, slg: 0.53, bbRate: 10.8, defRating: 85 },
  { id: 82, name: "Yordan Alvarez", era: "2020s", pos: "DH", type: "batter", war: 28, ops: 0.967, avg: 0.293, hr: 185, rbi: 553, sb: 5, obp: 0.393, slg: 0.574, bbRate: 13.5, defRating: 65 },
  { id: 83, name: "Julio Rodríguez", era: "2020s", pos: "CF", type: "batter", war: 20, ops: 0.84, avg: 0.277, hr: 98, rbi: 298, sb: 93, obp: 0.341, slg: 0.499, bbRate: 9.2, defRating: 89 },
  { id: 84, name: "Gunnar Henderson", era: "2020s", pos: "SS", type: "batter", war: 16, ops: 0.89, avg: 0.27, hr: 84, rbi: 247, sb: 38, obp: 0.365, slg: 0.525, bbRate: 12.5, defRating: 90 },
  { id: 85, name: "Cy Young", era: "1900s", pos: "SP", type: "sp", war: 163, era_stat: 2.63, whip: 1.13, k9: 3.5, bb9: 1.5, winPct: 0.62, saves: 0 },
  { id: 86, name: "Walter Johnson", era: "1910s", pos: "SP", type: "sp", war: 164, era_stat: 2.17, whip: 1.06, k9: 5.3, bb9: 1.6, winPct: 0.599, saves: 0 },
  { id: 87, name: "Christy Mathewson", era: "1900s", pos: "SP", type: "sp", war: 95, era_stat: 2.13, whip: 1.06, k9: 5.2, bb9: 1.6, winPct: 0.665, saves: 0 },
  { id: 88, name: "Pete Alexander", era: "1910s", pos: "SP", type: "sp", war: 96, era_stat: 2.56, whip: 1.121, k9: 4.8, bb9: 1.6, winPct: 0.642, saves: 0 },
  { id: 89, name: "Eddie Plank", era: "1900s", pos: "SP", type: "sp", war: 75, era_stat: 2.35, whip: 1.119, k9: 4.4, bb9: 2.0, winPct: 0.627, saves: 0 },
  { id: 90, name: "Lefty Grove", era: "1930s", pos: "SP", type: "sp", war: 90, era_stat: 3.06, whip: 1.179, k9: 6.0, bb9: 3.2, winPct: 0.68, saves: 0 },
  { id: 91, name: "Carl Hubbell", era: "1930s", pos: "SP", type: "sp", war: 64, era_stat: 2.98, whip: 1.166, k9: 5.6, bb9: 2.2, winPct: 0.622, saves: 0 },
  { id: 92, name: "Dizzy Dean", era: "1930s", pos: "SP", type: "sp", war: 43, era_stat: 3.02, whip: 1.258, k9: 6.0, bb9: 3.1, winPct: 0.644, saves: 0 },
  { id: 93, name: "Bob Feller", era: "1940s", pos: "SP", type: "sp", war: 64, era_stat: 3.25, whip: 1.316, k9: 7.0, bb9: 4.0, winPct: 0.621, saves: 0 },
  { id: 94, name: "Warren Spahn", era: "1950s", pos: "SP", type: "sp", war: 92, era_stat: 3.09, whip: 1.195, k9: 5.5, bb9: 2.6, winPct: 0.597, saves: 0 },
  { id: 95, name: "Robin Roberts", era: "1950s", pos: "SP", type: "sp", war: 73, era_stat: 3.41, whip: 1.17, k9: 5.7, bb9: 1.7, winPct: 0.539, saves: 0 },
  { id: 96, name: "Early Wynn", era: "1950s", pos: "SP", type: "sp", war: 55, era_stat: 3.54, whip: 1.33, k9: 5.6, bb9: 3.5, winPct: 0.551, saves: 0 },
  { id: 97, name: "Sandy Koufax", era: "1960s", pos: "SP", type: "sp", war: 53, era_stat: 2.76, whip: 1.106, k9: 9.3, bb9: 2.9, winPct: 0.655, saves: 0 },
  { id: 98, name: "Bob Gibson", era: "1960s", pos: "SP", type: "sp", war: 80, era_stat: 2.91, whip: 1.188, k9: 7.2, bb9: 2.7, winPct: 0.591, saves: 0 },
  { id: 99, name: "Juan Marichal", era: "1960s", pos: "SP", type: "sp", war: 61, era_stat: 2.89, whip: 1.101, k9: 6.7, bb9: 2.0, winPct: 0.631, saves: 0 },
  { id: 100, name: "Tom Seaver", era: "1970s", pos: "SP", type: "sp", war: 97, era_stat: 2.86, whip: 1.121, k9: 7.0, bb9: 2.6, winPct: 0.603, saves: 0 },
  { id: 101, name: "Steve Carlton", era: "1970s", pos: "SP", type: "sp", war: 79, era_stat: 3.22, whip: 1.247, k9: 7.1, bb9: 3.2, winPct: 0.574, saves: 0 },
  { id: 102, name: "Nolan Ryan", era: "1970s", pos: "SP", type: "sp", war: 83, era_stat: 3.19, whip: 1.247, k9: 9.6, bb9: 4.7, winPct: 0.526, saves: 0 },
  { id: 103, name: "Fergie Jenkins", era: "1970s", pos: "SP", type: "sp", war: 84, era_stat: 3.34, whip: 1.142, k9: 7.1, bb9: 1.9, winPct: 0.557, saves: 0 },
  { id: 104, name: "Jim Palmer", era: "1970s", pos: "SP", type: "sp", war: 68, era_stat: 2.86, whip: 1.18, k9: 5.9, bb9: 2.9, winPct: 0.638, saves: 0 },
  { id: 105, name: "Roger Clemens", era: "1980s", pos: "SP", type: "sp", war: 140, era_stat: 3.12, whip: 1.173, k9: 8.6, bb9: 3.0, winPct: 0.658, saves: 0 },
  { id: 106, name: "Dwight Gooden", era: "1980s", pos: "SP", type: "sp", war: 52, era_stat: 3.51, whip: 1.261, k9: 8.7, bb9: 3.2, winPct: 0.577, saves: 0 },
  { id: 107, name: "Jack Morris", era: "1980s", pos: "SP", type: "sp", war: 44, era_stat: 3.9, whip: 1.296, k9: 5.8, bb9: 3.2, winPct: 0.577, saves: 0 },
  { id: 108, name: "Dave Stieb", era: "1980s", pos: "SP", type: "sp", war: 56, era_stat: 3.44, whip: 1.255, k9: 6.1, bb9: 3.2, winPct: 0.567, saves: 0 },
  { id: 109, name: "Bret Saberhagen", era: "1980s", pos: "SP", type: "sp", war: 53, era_stat: 3.34, whip: 1.139, k9: 6.3, bb9: 1.9, winPct: 0.583, saves: 0 },
  { id: 110, name: "Greg Maddux", era: "1990s", pos: "SP", type: "sp", war: 106, era_stat: 3.16, whip: 1.143, k9: 6.1, bb9: 1.8, winPct: 0.61, saves: 0 },
  { id: 111, name: "Randy Johnson", era: "1990s", pos: "SP", type: "sp", war: 101, era_stat: 3.29, whip: 1.171, k9: 10.6, bb9: 3.3, winPct: 0.646, saves: 0 },
  { id: 112, name: "Pedro Martinez", era: "1990s", pos: "SP", type: "sp", war: 87, era_stat: 2.93, whip: 1.054, k9: 10.0, bb9: 2.5, winPct: 0.688, saves: 0 },
  { id: 113, name: "Kevin Brown", era: "1990s", pos: "SP", type: "sp", war: 65, era_stat: 3.28, whip: 1.225, k9: 7.2, bb9: 2.9, winPct: 0.594, saves: 0 },
  { id: 114, name: "John Smoltz", era: "1990s", pos: "SP", type: "sp", war: 66, era_stat: 3.33, whip: 1.175, k9: 8.0, bb9: 3.1, winPct: 0.599, saves: 0 },
  { id: 115, name: "Mike Mussina", era: "1990s", pos: "SP", type: "sp", war: 83, era_stat: 3.68, whip: 1.192, k9: 7.0, bb9: 2.1, winPct: 0.638, saves: 0 },
  { id: 116, name: "Roy Halladay", era: "2000s", pos: "SP", type: "sp", war: 65, era_stat: 3.38, whip: 1.178, k9: 6.9, bb9: 1.9, winPct: 0.659, saves: 0 },
  { id: 117, name: "Johan Santana", era: "2000s", pos: "SP", type: "sp", war: 52, era_stat: 3.2, whip: 1.133, k9: 9.2, bb9: 2.5, winPct: 0.64, saves: 0 },
  { id: 118, name: "CC Sabathia", era: "2000s", pos: "SP", type: "sp", war: 62, era_stat: 3.74, whip: 1.265, k9: 7.7, bb9: 2.7, winPct: 0.605, saves: 0 },
  { id: 119, name: "Tim Hudson", era: "2000s", pos: "SP", type: "sp", war: 57, era_stat: 3.49, whip: 1.305, k9: 5.8, bb9: 2.7, winPct: 0.62, saves: 0 },
  { id: 120, name: "Chris Carpenter", era: "2000s", pos: "SP", type: "sp", war: 51, era_stat: 3.76, whip: 1.262, k9: 7.1, bb9: 2.5, winPct: 0.641, saves: 0 },
  { id: 121, name: "Curt Schilling", era: "2000s", pos: "SP", type: "sp", war: 80, era_stat: 3.46, whip: 1.137, k9: 8.6, bb9: 1.9, winPct: 0.597, saves: 0 },
  { id: 122, name: "Clayton Kershaw", era: "2010s", pos: "SP", type: "sp", war: 81, era_stat: 2.49, whip: 1.003, k9: 9.9, bb9: 2.0, winPct: 0.69, saves: 0 },
  { id: 123, name: "Max Scherzer", era: "2010s", pos: "SP", type: "sp", war: 74, era_stat: 3.16, whip: 1.072, k9: 10.5, bb9: 2.2, winPct: 0.63, saves: 0 },
  { id: 124, name: "Justin Verlander", era: "2010s", pos: "SP", type: "sp", war: 77, era_stat: 3.33, whip: 1.143, k9: 9.1, bb9: 2.6, winPct: 0.64, saves: 0 },
  { id: 125, name: "Zack Greinke", era: "2010s", pos: "SP", type: "sp", war: 75, era_stat: 3.38, whip: 1.165, k9: 8.1, bb9: 2.0, winPct: 0.594, saves: 0 },
  { id: 126, name: "Cole Hamels", era: "2010s", pos: "SP", type: "sp", war: 55, era_stat: 3.43, whip: 1.166, k9: 8.2, bb9: 2.5, winPct: 0.6, saves: 0 },
  { id: 127, name: "Felix Hernandez", era: "2010s", pos: "SP", type: "sp", war: 68, era_stat: 3.42, whip: 1.207, k9: 8.2, bb9: 2.6, winPct: 0.555, saves: 0 },
  { id: 128, name: "David Price", era: "2010s", pos: "SP", type: "sp", war: 58, era_stat: 3.26, whip: 1.143, k9: 8.4, bb9: 2.2, winPct: 0.631, saves: 0 },
  { id: 129, name: "Jon Lester", era: "2010s", pos: "SP", type: "sp", war: 52, era_stat: 3.66, whip: 1.242, k9: 7.9, bb9: 2.7, winPct: 0.603, saves: 0 },
  { id: 130, name: "Gerrit Cole", era: "2020s", pos: "SP", type: "sp", war: 42, era_stat: 3.22, whip: 1.076, k9: 11.1, bb9: 2.6, winPct: 0.649, saves: 0 },
  { id: 131, name: "Shohei Ohtani (P)", era: "2020s", pos: "SP", type: "sp", war: 22, era_stat: 3.01, whip: 1.107, k9: 11.4, bb9: 3.2, winPct: 0.647, saves: 0 },
  { id: 132, name: "Corbin Burnes", era: "2020s", pos: "SP", type: "sp", war: 25, era_stat: 2.94, whip: 0.969, k9: 10.8, bb9: 2.2, winPct: 0.636, saves: 0 },
  { id: 133, name: "Spencer Strider", era: "2020s", pos: "SP", type: "sp", war: 16, era_stat: 3.28, whip: 1.066, k9: 13.5, bb9: 2.8, winPct: 0.618, saves: 0 },
  { id: 134, name: "Zack Wheeler", era: "2020s", pos: "SP", type: "sp", war: 28, era_stat: 2.82, whip: 1.063, k9: 9.7, bb9: 2.1, winPct: 0.588, saves: 0 },
  { id: 135, name: "Dylan Cease", era: "2020s", pos: "SP", type: "sp", war: 19, era_stat: 3.1, whip: 1.119, k9: 11.6, bb9: 3.5, winPct: 0.565, saves: 0 },
  { id: 136, name: "Mariano Rivera", era: "2000s", pos: "CL", type: "rp", war: 56, era_stat: 2.21, whip: 1.0, k9: 8.2, bb9: 2.0, saves: 652, bullpenRating: 99 },
  { id: 137, name: "Trevor Hoffman", era: "1990s", pos: "CL", type: "rp", war: 28, era_stat: 2.87, whip: 1.058, k9: 9.4, bb9: 2.3, saves: 601, bullpenRating: 90 },
  { id: 138, name: "Billy Wagner", era: "2000s", pos: "CL", type: "rp", war: 27, era_stat: 2.31, whip: 0.998, k9: 11.9, bb9: 2.5, saves: 422, bullpenRating: 92 },
  { id: 139, name: "Dennis Eckersley", era: "1990s", pos: "CL", type: "rp", war: 24, era_stat: 3.5, whip: 1.161, k9: 7.4, bb9: 1.4, saves: 390, bullpenRating: 84 },
  { id: 140, name: "Kenley Jansen", era: "2010s", pos: "CL", type: "rp", war: 18, era_stat: 2.43, whip: 1.009, k9: 12.0, bb9: 2.1, saves: 394, bullpenRating: 88 },
  { id: 141, name: "Craig Kimbrel", era: "2010s", pos: "CL", type: "rp", war: 14, era_stat: 2.34, whip: 0.966, k9: 14.0, bb9: 3.5, saves: 394, bullpenRating: 87 },
  { id: 142, name: "Lee Smith", era: "1980s", pos: "CL", type: "rp", war: 29, era_stat: 3.03, whip: 1.256, k9: 8.1, bb9: 3.0, saves: 478, bullpenRating: 80 },
  { id: 143, name: "Rollie Fingers", era: "1970s", pos: "CL", type: "rp", war: 34, era_stat: 2.9, whip: 1.156, k9: 6.2, bb9: 2.8, saves: 341, bullpenRating: 82 },
  { id: 144, name: "Bruce Sutter", era: "1970s", pos: "CL", type: "rp", war: 25, era_stat: 2.83, whip: 1.142, k9: 7.2, bb9: 2.9, saves: 300, bullpenRating: 83 },
  { id: 145, name: "John Franco", era: "1990s", pos: "CL", type: "rp", war: 24, era_stat: 2.89, whip: 1.238, k9: 6.9, bb9: 3.2, saves: 424, bullpenRating: 79 },
  { id: 146, name: "Aroldis Chapman", era: "2010s", pos: "CL", type: "rp", war: 14, era_stat: 2.28, whip: 1.046, k9: 14.7, bb9: 4.2, saves: 298, bullpenRating: 86 },
  { id: 147, name: "Edwin Diaz", era: "2020s", pos: "CL", type: "rp", war: 11, era_stat: 2.67, whip: 0.937, k9: 15.5, bb9: 2.8, saves: 183, bullpenRating: 91 },
  { id: 148, name: "Emmanuel Clase", era: "2020s", pos: "CL", type: "rp", war: 9, era_stat: 1.98, whip: 0.946, k9: 9.2, bb9: 1.7, saves: 178, bullpenRating: 88 },
  { id: 149, name: "Josh Hader", era: "2020s", pos: "CL", type: "rp", war: 13, era_stat: 2.46, whip: 0.874, k9: 15.0, bb9: 3.0, saves: 194, bullpenRating: 89 },
  { id: 150, name: "Hoyt Wilhelm", era: "1950s", pos: "CL", type: "rp", war: 50, era_stat: 2.52, whip: 1.143, k9: 6.3, bb9: 2.7, saves: 227, bullpenRating: 88 },
  { id: 151, name: "Sam Crawford", era: "1900s", pos: "RF", type: "batter", war: 87, ops: 0.857, avg: 0.309, hr: 97, rbi: 1525, sb: 366, obp: 0.362, slg: 0.452, bbRate: 7.2, defRating: 84 },
  { id: 152, name: "Home Run Baker", era: "1910s", pos: "3B", type: "batter", war: 44, ops: 0.836, avg: 0.307, hr: 96, rbi: 987, sb: 235, obp: 0.366, slg: 0.442, bbRate: 8.5, defRating: 86 },
  { id: 153, name: "Shoeless Joe Jackson", era: "1910s", pos: "LF", type: "batter", war: 62, ops: 0.988, avg: 0.356, hr: 54, rbi: 785, sb: 202, obp: 0.423, slg: 0.517, bbRate: 11.0, defRating: 88 },
  { id: 154, name: "Hack Wilson", era: "1920s", pos: "CF", type: "batter", war: 38, ops: 0.941, avg: 0.307, hr: 244, rbi: 1063, sb: 52, obp: 0.395, slg: 0.545, bbRate: 12.5, defRating: 76 },
  { id: 155, name: "Goose Goslin", era: "1920s", pos: "LF", type: "batter", war: 50, ops: 0.875, avg: 0.316, hr: 248, rbi: 1609, sb: 175, obp: 0.387, slg: 0.5, bbRate: 10.8, defRating: 75 },
  { id: 156, name: "Kiki Cuyler", era: "1920s", pos: "RF", type: "batter", war: 47, ops: 0.891, avg: 0.321, hr: 128, rbi: 1065, sb: 328, obp: 0.386, slg: 0.474, bbRate: 10.2, defRating: 85 },
  { id: 157, name: "Earl Averill", era: "1920s", pos: "CF", type: "batter", war: 55, ops: 0.907, avg: 0.318, hr: 238, rbi: 1164, sb: 70, obp: 0.395, slg: 0.534, bbRate: 11.5, defRating: 82 },
  { id: 158, name: "Al Simmons", era: "1920s", pos: "LF", type: "batter", war: 55, ops: 0.906, avg: 0.334, hr: 307, rbi: 1827, sb: 88, obp: 0.38, slg: 0.535, bbRate: 7.2, defRating: 80 },
  { id: 159, name: "Paul Waner", era: "1930s", pos: "RF", type: "batter", war: 73, ops: 0.888, avg: 0.333, hr: 113, rbi: 1309, sb: 104, obp: 0.404, slg: 0.473, bbRate: 12.3, defRating: 86 },
  { id: 160, name: "Arky Vaughan", era: "1930s", pos: "SS", type: "batter", war: 72, ops: 0.859, avg: 0.318, hr: 96, rbi: 926, sb: 118, obp: 0.406, slg: 0.453, bbRate: 14.5, defRating: 87 },
  { id: 161, name: "Bill Terry", era: "1930s", pos: "1B", type: "batter", war: 56, ops: 0.906, avg: 0.341, hr: 154, rbi: 1078, sb: 56, obp: 0.393, slg: 0.506, bbRate: 9.8, defRating: 85 },
  { id: 162, name: "Chuck Klein", era: "1930s", pos: "RF", type: "batter", war: 44, ops: 0.965, avg: 0.32, hr: 300, rbi: 1201, sb: 79, obp: 0.379, slg: 0.543, bbRate: 8.0, defRating: 72 },
  { id: 163, name: "Lloyd Waner", era: "1930s", pos: "CF", type: "batter", war: 26, ops: 0.72, avg: 0.316, hr: 27, rbi: 598, sb: 67, obp: 0.353, slg: 0.353, bbRate: 8.5, defRating: 91 },
  { id: 164, name: "Gabby Hartnett", era: "1930s", pos: "C", type: "batter", war: 54, ops: 0.858, avg: 0.297, hr: 236, rbi: 1179, sb: 28, obp: 0.37, slg: 0.489, bbRate: 10.0, defRating: 93 },
  { id: 165, name: "Ralph Kiner", era: "1940s", pos: "LF", type: "batter", war: 47, ops: 0.946, avg: 0.279, hr: 369, rbi: 1015, sb: 22, obp: 0.398, slg: 0.548, bbRate: 16.2, defRating: 68 },
  { id: 166, name: "Bob Lemon", era: "1940s", pos: "SP", type: "sp", war: 40, era_stat: 3.23, whip: 1.337, k9: 4.8, bb9: 3.5, winPct: 0.618, saves: 0 },
  { id: 167, name: "Enos Slaughter", era: "1940s", pos: "RF", type: "batter", war: 57, ops: 0.844, avg: 0.3, hr: 169, rbi: 1304, sb: 71, obp: 0.382, slg: 0.453, bbRate: 11.5, defRating: 86 },
  { id: 168, name: "Phil Rizzuto", era: "1940s", pos: "SS", type: "batter", war: 40, ops: 0.706, avg: 0.273, hr: 38, rbi: 563, sb: 149, obp: 0.351, slg: 0.355, bbRate: 10.2, defRating: 95 },
  { id: 169, name: "Harmon Killebrew", era: "1950s", pos: "3B", type: "batter", war: 61, ops: 0.884, avg: 0.256, hr: 573, rbi: 1584, sb: 19, obp: 0.376, slg: 0.509, bbRate: 15.8, defRating: 72 },
  { id: 170, name: "Al Kaline", era: "1950s", pos: "RF", type: "batter", war: 93, ops: 0.855, avg: 0.297, hr: 399, rbi: 1583, sb: 137, obp: 0.376, slg: 0.48, bbRate: 11.2, defRating: 95 },
  { id: 171, name: "Nellie Fox", era: "1950s", pos: "2B", type: "batter", war: 53, ops: 0.73, avg: 0.288, hr: 35, rbi: 790, sb: 76, obp: 0.348, slg: 0.363, bbRate: 7.8, defRating: 93 },
  { id: 172, name: "Luis Aparicio", era: "1950s", pos: "SS", type: "batter", war: 56, ops: 0.672, avg: 0.262, hr: 83, rbi: 791, sb: 506, obp: 0.311, slg: 0.343, bbRate: 5.8, defRating: 97 },
  { id: 173, name: "Gil Hodges", era: "1950s", pos: "1B", type: "batter", war: 44, ops: 0.846, avg: 0.273, hr: 370, rbi: 1274, sb: 63, obp: 0.359, slg: 0.487, bbRate: 10.5, defRating: 91 },
  { id: 174, name: "Richie Ashburn", era: "1950s", pos: "CF", type: "batter", war: 63, ops: 0.764, avg: 0.308, hr: 29, rbi: 586, sb: 234, obp: 0.396, slg: 0.382, bbRate: 14.8, defRating: 96 },
  { id: 175, name: "Willie McCovey", era: "1960s", pos: "1B", type: "batter", war: 64, ops: 0.939, avg: 0.27, hr: 521, rbi: 1555, sb: 26, obp: 0.374, slg: 0.515, bbRate: 14.0, defRating: 80 },
  { id: 176, name: "Willie Stargell", era: "1960s", pos: "LF", type: "batter", war: 57, ops: 0.889, avg: 0.282, hr: 475, rbi: 1540, sb: 17, obp: 0.36, slg: 0.529, bbRate: 11.0, defRating: 78 },
  { id: 177, name: "Tony Perez", era: "1960s", pos: "1B", type: "batter", war: 50, ops: 0.82, avg: 0.279, hr: 379, rbi: 1652, sb: 49, obp: 0.341, slg: 0.463, bbRate: 8.5, defRating: 82 },
  { id: 178, name: "Lou Brock", era: "1960s", pos: "LF", type: "batter", war: 46, ops: 0.749, avg: 0.293, hr: 149, rbi: 900, sb: 938, obp: 0.343, slg: 0.41, bbRate: 7.5, defRating: 72 },
  { id: 179, name: "Maury Wills", era: "1960s", pos: "SS", type: "batter", war: 40, ops: 0.667, avg: 0.281, hr: 20, rbi: 458, sb: 586, obp: 0.33, slg: 0.331, bbRate: 7.0, defRating: 88 },
  { id: 180, name: "Curt Flood", era: "1960s", pos: "CF", type: "batter", war: 50, ops: 0.77, avg: 0.293, hr: 85, rbi: 636, sb: 88, obp: 0.34, slg: 0.389, bbRate: 7.8, defRating: 97 },
  { id: 181, name: "Orlando Cepeda", era: "1960s", pos: "1B", type: "batter", war: 51, ops: 0.875, avg: 0.297, hr: 379, rbi: 1365, sb: 142, obp: 0.35, slg: 0.499, bbRate: 7.0, defRating: 76 },
  { id: 182, name: "Reggie Jackson", era: "1970s", pos: "RF", type: "batter", war: 74, ops: 0.846, avg: 0.262, hr: 563, rbi: 1702, sb: 228, obp: 0.356, slg: 0.49, bbRate: 12.8, defRating: 78 },
  { id: 183, name: "Tony Oliva", era: "1970s", pos: "RF", type: "batter", war: 47, ops: 0.862, avg: 0.304, hr: 220, rbi: 947, sb: 86, obp: 0.353, slg: 0.476, bbRate: 7.5, defRating: 80 },
  { id: 184, name: "Bobby Bonds", era: "1970s", pos: "RF", type: "batter", war: 59, ops: 0.83, avg: 0.268, hr: 332, rbi: 1024, sb: 461, obp: 0.353, slg: 0.471, bbRate: 12.5, defRating: 88 },
  { id: 185, name: "Thurman Munson", era: "1970s", pos: "C", type: "batter", war: 46, ops: 0.802, avg: 0.292, hr: 113, rbi: 701, sb: 48, obp: 0.346, slg: 0.41, bbRate: 8.2, defRating: 90 },
  { id: 186, name: "Tony Perez", era: "1970s", pos: "1B", type: "batter", war: 45, ops: 0.815, avg: 0.28, hr: 350, rbi: 1580, sb: 45, obp: 0.34, slg: 0.46, bbRate: 8.5, defRating: 81 },
  { id: 187, name: "Cesar Cedeno", era: "1970s", pos: "CF", type: "batter", war: 55, ops: 0.82, avg: 0.285, hr: 199, rbi: 976, sb: 550, obp: 0.352, slg: 0.443, bbRate: 9.5, defRating: 94 },
  { id: 188, name: "Ken Singleton", era: "1970s", pos: "RF", type: "batter", war: 50, ops: 0.868, avg: 0.282, hr: 246, rbi: 1065, sb: 23, obp: 0.388, slg: 0.436, bbRate: 14.5, defRating: 82 },
  { id: 189, name: "Don Baylor", era: "1970s", pos: "LF", type: "batter", war: 40, ops: 0.806, avg: 0.26, hr: 338, rbi: 1276, sb: 285, obp: 0.342, slg: 0.436, bbRate: 9.0, defRating: 72 },
  { id: 190, name: "Kirby Puckett", era: "1980s", pos: "CF", type: "batter", war: 52, ops: 0.837, avg: 0.318, hr: 207, rbi: 1085, sb: 134, obp: 0.36, slg: 0.477, bbRate: 6.5, defRating: 91 },
  { id: 191, name: "Don Mattingly", era: "1980s", pos: "1B", type: "batter", war: 42, ops: 0.866, avg: 0.307, hr: 222, rbi: 1099, sb: 14, obp: 0.358, slg: 0.471, bbRate: 8.5, defRating: 93 },
  { id: 192, name: "Darryl Strawberry", era: "1980s", pos: "RF", type: "batter", war: 42, ops: 0.896, avg: 0.259, hr: 335, rbi: 1000, sb: 221, obp: 0.359, slg: 0.505, bbRate: 13.5, defRating: 82 },
  { id: 193, name: "Eric Davis", era: "1980s", pos: "CF", type: "batter", war: 40, ops: 0.872, avg: 0.269, hr: 282, rbi: 934, sb: 349, obp: 0.363, slg: 0.482, bbRate: 12.8, defRating: 91 },
  { id: 194, name: "Alan Trammell", era: "1980s", pos: "SS", type: "batter", war: 70, ops: 0.797, avg: 0.285, hr: 185, rbi: 1003, sb: 236, obp: 0.352, slg: 0.415, bbRate: 9.5, defRating: 93 },
  { id: 195, name: "Harold Baines", era: "1980s", pos: "DH", type: "batter", war: 38, ops: 0.82, avg: 0.289, hr: 384, rbi: 1628, sb: 34, obp: 0.356, slg: 0.465, bbRate: 10.5, defRating: 72 },
  { id: 196, name: "Jack Clark", era: "1980s", pos: "RF", type: "batter", war: 45, ops: 0.892, avg: 0.267, hr: 340, rbi: 1180, sb: 77, obp: 0.393, slg: 0.476, bbRate: 16.0, defRating: 77 },
  { id: 197, name: "Dave Parker", era: "1980s", pos: "RF", type: "batter", war: 40, ops: 0.827, avg: 0.29, hr: 339, rbi: 1493, sb: 154, obp: 0.339, slg: 0.471, bbRate: 7.8, defRating: 88 },
  { id: 198, name: "Ryne Sandberg", era: "1980s", pos: "2B", type: "batter", war: 68, ops: 0.795, avg: 0.285, hr: 282, rbi: 1061, sb: 344, obp: 0.344, slg: 0.452, bbRate: 8.5, defRating: 96 },
  { id: 199, name: "John Olerud", era: "1990s", pos: "1B", type: "batter", war: 58, ops: 0.888, avg: 0.295, hr: 255, rbi: 1230, sb: 16, obp: 0.398, slg: 0.465, bbRate: 14.5, defRating: 88 },
  { id: 200, name: "Jim Edmonds", era: "1990s", pos: "CF", type: "batter", war: 60, ops: 0.897, avg: 0.284, hr: 393, rbi: 1199, sb: 67, obp: 0.376, slg: 0.527, bbRate: 13.0, defRating: 97 },
  { id: 201, name: "Edgar Martinez", era: "1990s", pos: "DH", type: "batter", war: 68, ops: 0.933, avg: 0.312, hr: 309, rbi: 1261, sb: 49, obp: 0.418, slg: 0.515, bbRate: 16.0, defRating: 72 },
  { id: 202, name: "Bernie Williams", era: "1990s", pos: "CF", type: "batter", war: 50, ops: 0.858, avg: 0.297, hr: 287, rbi: 1257, sb: 147, obp: 0.381, slg: 0.477, bbRate: 12.8, defRating: 85 },
  { id: 203, name: "Manny Ramirez", era: "1990s", pos: "LF", type: "batter", war: 69, ops: 0.996, avg: 0.312, hr: 555, rbi: 1831, sb: 38, obp: 0.411, slg: 0.585, bbRate: 14.5, defRating: 65 },
  { id: 204, name: "Mo Vaughn", era: "1990s", pos: "1B", type: "batter", war: 33, ops: 0.908, avg: 0.298, hr: 328, rbi: 1064, sb: 15, obp: 0.383, slg: 0.523, bbRate: 12.8, defRating: 68 },
  { id: 205, name: "Will Clark", era: "1990s", pos: "1B", type: "batter", war: 56, ops: 0.88, avg: 0.303, hr: 284, rbi: 1205, sb: 72, obp: 0.384, slg: 0.476, bbRate: 13.0, defRating: 85 },
  { id: 206, name: "Ivan Rodriguez", era: "1990s", pos: "C", type: "batter", war: 68, ops: 0.83, avg: 0.296, hr: 311, rbi: 1332, sb: 127, obp: 0.334, slg: 0.464, bbRate: 5.5, defRating: 99 },
  { id: 207, name: "Jeff Kent", era: "1990s", pos: "2B", type: "batter", war: 55, ops: 0.855, avg: 0.29, hr: 377, rbi: 1518, sb: 94, obp: 0.356, slg: 0.5, bbRate: 7.8, defRating: 79 },
  { id: 208, name: "Shawn Green", era: "1990s", pos: "RF", type: "batter", war: 41, ops: 0.861, avg: 0.283, hr: 328, rbi: 1070, sb: 168, obp: 0.355, slg: 0.472, bbRate: 11.2, defRating: 86 },
  { id: 209, name: "Todd Helton", era: "2000s", pos: "1B", type: "batter", war: 61, ops: 0.953, avg: 0.316, hr: 369, rbi: 1406, sb: 37, obp: 0.414, slg: 0.539, bbRate: 14.5, defRating: 89 },
  { id: 210, name: "Scott Rolen", era: "2000s", pos: "3B", type: "batter", war: 70, ops: 0.855, avg: 0.281, hr: 316, rbi: 1287, sb: 118, obp: 0.364, slg: 0.49, bbRate: 11.0, defRating: 99 },
  { id: 211, name: "Adrian Beltre", era: "2000s", pos: "3B", type: "batter", war: 97, ops: 0.841, avg: 0.286, hr: 477, rbi: 1707, sb: 117, obp: 0.339, slg: 0.48, bbRate: 7.5, defRating: 99 },
  { id: 212, name: "Miguel Cabrera", era: "2000s", pos: "3B", type: "batter", war: 85, ops: 0.963, avg: 0.321, hr: 521, rbi: 1881, sb: 26, obp: 0.394, slg: 0.54, bbRate: 12.2, defRating: 74 },
  { id: 213, name: "Joe Mauer", era: "2000s", pos: "C", type: "batter", war: 55, ops: 0.854, avg: 0.306, hr: 143, rbi: 923, sb: 33, obp: 0.388, slg: 0.439, bbRate: 13.5, defRating: 90 },
  { id: 214, name: "Andruw Jones", era: "2000s", pos: "CF", type: "batter", war: 63, ops: 0.817, avg: 0.254, hr: 434, rbi: 1289, sb: 152, obp: 0.338, slg: 0.48, bbRate: 11.5, defRating: 99 },
  { id: 215, name: "Grady Sizemore", era: "2000s", pos: "CF", type: "batter", war: 38, ops: 0.833, avg: 0.268, hr: 139, rbi: 458, sb: 134, obp: 0.36, slg: 0.479, bbRate: 12.5, defRating: 90 },
  { id: 216, name: "Magglio Ordonez", era: "2000s", pos: "RF", type: "batter", war: 44, ops: 0.897, avg: 0.309, hr: 294, rbi: 1236, sb: 93, obp: 0.368, slg: 0.502, bbRate: 9.5, defRating: 83 },
  { id: 217, name: "Aramis Ramirez", era: "2000s", pos: "3B", type: "batter", war: 43, ops: 0.847, avg: 0.283, hr: 386, rbi: 1417, sb: 18, obp: 0.336, slg: 0.494, bbRate: 7.2, defRating: 87 },
  { id: 218, name: "Ryan Howard", era: "2000s", pos: "1B", type: "batter", war: 29, ops: 0.867, avg: 0.258, hr: 382, rbi: 1194, sb: 5, obp: 0.343, slg: 0.516, bbRate: 12.5, defRating: 72 },
  { id: 219, name: "Buster Posey", era: "2010s", pos: "C", type: "batter", war: 44, ops: 0.841, avg: 0.302, hr: 158, rbi: 733, sb: 26, obp: 0.362, slg: 0.461, bbRate: 10.8, defRating: 92 },
  { id: 220, name: "Andrew McCutchen", era: "2010s", pos: "CF", type: "batter", war: 52, ops: 0.855, avg: 0.282, hr: 256, rbi: 890, sb: 183, obp: 0.373, slg: 0.459, bbRate: 12.5, defRating: 82 },
  { id: 221, name: "Robinson Cano", era: "2010s", pos: "2B", type: "batter", war: 60, ops: 0.836, avg: 0.302, hr: 335, rbi: 1298, sb: 60, obp: 0.355, slg: 0.481, bbRate: 8.5, defRating: 85 },
  { id: 222, name: "Adrian Gonzalez", era: "2010s", pos: "1B", type: "batter", war: 38, ops: 0.867, avg: 0.29, hr: 311, rbi: 1296, sb: 11, obp: 0.358, slg: 0.49, bbRate: 10.5, defRating: 89 },
  { id: 223, name: "Joey Votto", era: "2010s", pos: "1B", type: "batter", war: 63, ops: 0.924, avg: 0.297, hr: 317, rbi: 1024, sb: 62, obp: 0.421, slg: 0.503, bbRate: 18.0, defRating: 84 },
  { id: 224, name: "Ryan Braun", era: "2010s", pos: "LF", type: "batter", war: 56, ops: 0.909, avg: 0.296, hr: 352, rbi: 1154, sb: 205, obp: 0.365, slg: 0.532, bbRate: 9.0, defRating: 79 },
  { id: 225, name: "Evan Longoria", era: "2010s", pos: "3B", type: "batter", war: 56, ops: 0.822, avg: 0.27, hr: 338, rbi: 1135, sb: 50, obp: 0.336, slg: 0.487, bbRate: 9.5, defRating: 92 },
  { id: 226, name: "David Wright", era: "2010s", pos: "3B", type: "batter", war: 49, ops: 0.848, avg: 0.296, hr: 242, rbi: 970, sb: 196, obp: 0.37, slg: 0.482, bbRate: 12.0, defRating: 86 },
  { id: 227, name: "Dustin Pedroia", era: "2010s", pos: "2B", type: "batter", war: 52, ops: 0.793, avg: 0.299, hr: 140, rbi: 725, sb: 141, obp: 0.358, slg: 0.434, bbRate: 11.2, defRating: 91 },
  { id: 228, name: "Carlos Gonzalez", era: "2010s", pos: "LF", type: "batter", war: 38, ops: 0.896, avg: 0.29, hr: 222, rbi: 774, sb: 114, obp: 0.36, slg: 0.534, bbRate: 9.5, defRating: 88 },
  { id: 229, name: "Corey Seager", era: "2020s", pos: "SS", type: "batter", war: 33, ops: 0.876, avg: 0.283, hr: 180, rbi: 578, sb: 14, obp: 0.356, slg: 0.52, bbRate: 10.5, defRating: 82 },
  { id: 230, name: "Trea Turner", era: "2020s", pos: "SS", type: "batter", war: 40, ops: 0.833, avg: 0.298, hr: 167, rbi: 583, sb: 247, obp: 0.349, slg: 0.484, bbRate: 8.5, defRating: 85 },
  { id: 231, name: "Manny Machado", era: "2020s", pos: "3B", type: "batter", war: 47, ops: 0.851, avg: 0.277, hr: 299, rbi: 946, sb: 72, obp: 0.338, slg: 0.487, bbRate: 8.8, defRating: 90 },
  { id: 232, name: "Pete Alonso", era: "2020s", pos: "1B", type: "batter", war: 22, ops: 0.885, avg: 0.255, hr: 235, rbi: 659, sb: 3, obp: 0.352, slg: 0.533, bbRate: 12.0, defRating: 74 },
  { id: 233, name: "Ronald Acuna Jr.", era: "2020s", pos: "RF", type: "batter", war: 34, ops: 0.912, avg: 0.282, hr: 176, rbi: 530, sb: 188, obp: 0.383, slg: 0.529, bbRate: 13.0, defRating: 87 },
  { id: 234, name: "Bobby Witt Jr.", era: "2020s", pos: "SS", type: "batter", war: 14, ops: 0.828, avg: 0.278, hr: 72, rbi: 247, sb: 80, obp: 0.323, slg: 0.505, bbRate: 7.0, defRating: 88 },
  { id: 235, name: "Elly De La Cruz", era: "2020s", pos: "SS", type: "batter", war: 9, ops: 0.792, avg: 0.259, hr: 55, rbi: 157, sb: 114, obp: 0.325, slg: 0.467, bbRate: 9.5, defRating: 83 },
  { id: 236, name: "Three Finger Brown", era: "1900s", pos: "SP", type: "sp", war: 57, era_stat: 2.06, whip: 1.066, k9: 4.8, bb9: 1.9, winPct: 0.648, saves: 0 },
  { id: 237, name: "Rube Waddell", era: "1900s", pos: "SP", type: "sp", war: 45, era_stat: 2.16, whip: 1.108, k9: 7.0, bb9: 2.5, winPct: 0.577, saves: 0 },
  { id: 238, name: "Joe Wood", era: "1910s", pos: "SP", type: "sp", war: 29, era_stat: 2.03, whip: 1.143, k9: 6.1, bb9: 2.5, winPct: 0.671, saves: 0 },
  { id: 239, name: "Hippo Vaughn", era: "1910s", pos: "SP", type: "sp", war: 40, era_stat: 2.49, whip: 1.176, k9: 5.8, bb9: 2.9, winPct: 0.578, saves: 0 },
  { id: 240, name: "Hal Newhouser", era: "1940s", pos: "SP", type: "sp", war: 62, era_stat: 3.06, whip: 1.311, k9: 6.5, bb9: 3.9, winPct: 0.601, saves: 0 },
  { id: 241, name: "Bob Lemon", era: "1940s", pos: "SP", type: "sp", war: 40, era_stat: 3.23, whip: 1.337, k9: 4.8, bb9: 3.5, winPct: 0.618, saves: 0 },
  { id: 242, name: "Whitey Ford", era: "1950s", pos: "SP", type: "sp", war: 54, era_stat: 2.75, whip: 1.216, k9: 6.5, bb9: 2.8, winPct: 0.69, saves: 0 },
  { id: 243, name: "Bob Turley", era: "1950s", pos: "SP", type: "sp", war: 28, era_stat: 3.64, whip: 1.363, k9: 7.6, bb9: 4.2, winPct: 0.571, saves: 0 },
  { id: 244, name: "Denny McLain", era: "1960s", pos: "SP", type: "sp", war: 42, era_stat: 3.39, whip: 1.222, k9: 6.0, bb9: 2.8, winPct: 0.617, saves: 0 },
  { id: 245, name: "Mickey Lolich", era: "1960s", pos: "SP", type: "sp", war: 50, era_stat: 3.44, whip: 1.246, k9: 6.8, bb9: 3.2, winPct: 0.559, saves: 0 },
  { id: 246, name: "Don Sutton", era: "1970s", pos: "SP", type: "sp", war: 67, era_stat: 3.26, whip: 1.142, k9: 6.3, bb9: 2.3, winPct: 0.559, saves: 0 },
  { id: 247, name: "Catfish Hunter", era: "1970s", pos: "SP", type: "sp", war: 37, era_stat: 3.26, whip: 1.134, k9: 5.5, bb9: 2.0, winPct: 0.574, saves: 0 },
  { id: 248, name: "Gaylord Perry", era: "1970s", pos: "SP", type: "sp", war: 90, era_stat: 3.11, whip: 1.18, k9: 5.6, bb9: 2.5, winPct: 0.542, saves: 0 },
  { id: 249, name: "Vida Blue", era: "1970s", pos: "SP", type: "sp", war: 52, era_stat: 3.26, whip: 1.257, k9: 7.5, bb9: 3.7, winPct: 0.58, saves: 0 },
  { id: 250, name: "Luis Tiant", era: "1970s", pos: "SP", type: "sp", war: 66, era_stat: 3.3, whip: 1.201, k9: 6.2, bb9: 2.8, winPct: 0.572, saves: 0 },
  { id: 251, name: "Fernando Valenzuela", era: "1980s", pos: "SP", type: "sp", war: 40, era_stat: 3.54, whip: 1.268, k9: 6.3, bb9: 3.3, winPct: 0.553, saves: 0 },
  { id: 252, name: "Ron Guidry", era: "1980s", pos: "SP", type: "sp", war: 45, era_stat: 3.29, whip: 1.192, k9: 7.2, bb9: 2.8, winPct: 0.651, saves: 0 },
  { id: 253, name: "Frank Viola", era: "1980s", pos: "SP", type: "sp", war: 36, era_stat: 3.73, whip: 1.275, k9: 5.8, bb9: 2.7, winPct: 0.555, saves: 0 },
  { id: 254, name: "Orel Hershiser", era: "1980s", pos: "SP", type: "sp", war: 49, era_stat: 3.48, whip: 1.266, k9: 5.7, bb9: 2.7, winPct: 0.583, saves: 0 },
  { id: 255, name: "Jimmy Key", era: "1980s", pos: "SP", type: "sp", war: 43, era_stat: 3.51, whip: 1.219, k9: 5.9, bb9: 2.1, winPct: 0.603, saves: 0 },
  { id: 256, name: "Bert Blyleven", era: "1970s", pos: "SP", type: "sp", war: 94, era_stat: 3.31, whip: 1.198, k9: 7.6, bb9: 2.6, winPct: 0.534, saves: 0 },
  { id: 257, name: "Barry Zito", era: "2000s", pos: "SP", type: "sp", war: 37, era_stat: 3.55, whip: 1.293, k9: 7.0, bb9: 3.2, winPct: 0.577, saves: 0 },
  { id: 258, name: "Mark Buehrle", era: "2000s", pos: "SP", type: "sp", war: 59, era_stat: 3.81, whip: 1.279, k9: 5.4, bb9: 2.1, winPct: 0.57, saves: 0 },
  { id: 259, name: "Jake Peavy", era: "2000s", pos: "SP", type: "sp", war: 39, era_stat: 3.63, whip: 1.197, k9: 8.9, bb9: 3.0, winPct: 0.573, saves: 0 },
  { id: 260, name: "Brandon Webb", era: "2000s", pos: "SP", type: "sp", war: 32, era_stat: 3.27, whip: 1.248, k9: 6.5, bb9: 2.7, winPct: 0.616, saves: 0 },
  { id: 261, name: "Cliff Lee", era: "2000s", pos: "SP", type: "sp", war: 46, era_stat: 3.52, whip: 1.138, k9: 7.6, bb9: 1.6, winPct: 0.587, saves: 0 },
  { id: 262, name: "Roy Oswalt", era: "2000s", pos: "SP", type: "sp", war: 50, era_stat: 3.36, whip: 1.198, k9: 7.1, bb9: 2.3, winPct: 0.639, saves: 0 },
  { id: 263, name: "Chris Sale", era: "2010s", pos: "SP", type: "sp", war: 51, era_stat: 3.03, whip: 1.068, k9: 11.2, bb9: 2.2, winPct: 0.59, saves: 0 },
  { id: 264, name: "Stephen Strasburg", era: "2010s", pos: "SP", type: "sp", war: 38, era_stat: 3.24, whip: 1.104, k9: 10.0, bb9: 2.6, winPct: 0.626, saves: 0 },
  { id: 265, name: "Madison Bumgarner", era: "2010s", pos: "SP", type: "sp", war: 45, era_stat: 3.26, whip: 1.133, k9: 8.4, bb9: 2.3, winPct: 0.601, saves: 0 },
  { id: 266, name: "Corey Kluber", era: "2010s", pos: "SP", type: "sp", war: 40, era_stat: 3.17, whip: 1.07, k9: 9.2, bb9: 1.8, winPct: 0.603, saves: 0 },
  { id: 267, name: "Carlos Carrasco", era: "2010s", pos: "SP", type: "sp", war: 32, era_stat: 3.51, whip: 1.13, k9: 9.8, bb9: 2.5, winPct: 0.565, saves: 0 },
  { id: 268, name: "Jacob deGrom", era: "2010s", pos: "SP", type: "sp", war: 47, era_stat: 2.52, whip: 1.007, k9: 11.2, bb9: 2.2, winPct: 0.574, saves: 0 },
  { id: 269, name: "Aaron Nola", era: "2010s", pos: "SP", type: "sp", war: 38, era_stat: 3.41, whip: 1.088, k9: 10.0, bb9: 2.1, winPct: 0.582, saves: 0 },
  { id: 270, name: "Luis Severino", era: "2020s", pos: "SP", type: "sp", war: 20, era_stat: 3.33, whip: 1.135, k9: 9.8, bb9: 2.8, winPct: 0.61, saves: 0 },
  { id: 271, name: "Sandy Alcantara", era: "2020s", pos: "SP", type: "sp", war: 19, era_stat: 2.94, whip: 1.126, k9: 9.0, bb9: 2.5, winPct: 0.534, saves: 0 },
  { id: 272, name: "Kevin Gausman", era: "2020s", pos: "SP", type: "sp", war: 22, era_stat: 3.06, whip: 1.064, k9: 10.8, bb9: 2.0, winPct: 0.571, saves: 0 },
  { id: 273, name: "Framber Valdez", era: "2020s", pos: "SP", type: "sp", war: 16, era_stat: 2.91, whip: 1.176, k9: 8.5, bb9: 2.8, winPct: 0.608, saves: 0 },
  { id: 274, name: "Logan Webb", era: "2020s", pos: "SP", type: "sp", war: 15, era_stat: 3.1, whip: 1.155, k9: 8.2, bb9: 2.3, winPct: 0.572, saves: 0 },
  { id: 275, name: "Rich Gossage", era: "1970s", pos: "CL", type: "rp", war: 42, era_stat: 3.01, whip: 1.232, k9: 7.6, bb9: 3.5, saves: 310, bullpenRating: 85 },
  { id: 276, name: "Dan Quisenberry", era: "1980s", pos: "CL", type: "rp", war: 22, era_stat: 2.76, whip: 1.167, k9: 3.5, bb9: 1.5, saves: 244, bullpenRating: 82 },
  { id: 277, name: "Jeff Reardon", era: "1980s", pos: "CL", type: "rp", war: 20, era_stat: 3.16, whip: 1.219, k9: 6.7, bb9: 2.6, saves: 367, bullpenRating: 78 },
  { id: 278, name: "Tom Henke", era: "1980s", pos: "CL", type: "rp", war: 24, era_stat: 2.67, whip: 1.074, k9: 9.6, bb9: 2.8, saves: 311, bullpenRating: 84 },
  { id: 279, name: "Rod Beck", era: "1990s", pos: "CL", type: "rp", war: 17, era_stat: 3.3, whip: 1.183, k9: 7.4, bb9: 2.0, saves: 286, bullpenRating: 77 },
  { id: 280, name: "Roberto Hernandez", era: "1990s", pos: "CL", type: "rp", war: 18, era_stat: 3.45, whip: 1.29, k9: 7.5, bb9: 3.5, saves: 326, bullpenRating: 76 },
  { id: 281, name: "Francisco Rodriguez", era: "2000s", pos: "CL", type: "rp", war: 20, era_stat: 2.67, whip: 1.166, k9: 9.8, bb9: 3.5, saves: 437, bullpenRating: 85 },
  { id: 282, name: "Jonathan Papelbon", era: "2000s", pos: "CL", type: "rp", war: 17, era_stat: 2.44, whip: 1.019, k9: 9.9, bb9: 2.3, saves: 368, bullpenRating: 83 },
  { id: 283, name: "Joe Nathan", era: "2000s", pos: "CL", type: "rp", war: 28, era_stat: 2.87, whip: 1.096, k9: 9.9, bb9: 3.0, saves: 377, bullpenRating: 84 },
  { id: 284, name: "Andrew Miller", era: "2010s", pos: "CL", type: "rp", war: 16, era_stat: 2.45, whip: 1.011, k9: 13.1, bb9: 2.7, saves: 44, bullpenRating: 87 },
  { id: 285, name: "David Robertson", era: "2010s", pos: "CL", type: "rp", war: 14, era_stat: 2.89, whip: 1.103, k9: 11.0, bb9: 3.2, saves: 157, bullpenRating: 82 },
  { id: 286, name: "Zack Britton", era: "2010s", pos: "CL", type: "rp", war: 12, era_stat: 2.75, whip: 1.134, k9: 7.8, bb9: 2.8, saves: 132, bullpenRating: 81 },
  { id: 287, name: "Ryan Pressly", era: "2020s", pos: "CL", type: "rp", war: 10, era_stat: 2.82, whip: 1.024, k9: 10.5, bb9: 2.5, saves: 112, bullpenRating: 83 },
  { id: 288, name: "Alexis Diaz", era: "2020s", pos: "CL", type: "rp", war: 7, era_stat: 2.97, whip: 1.101, k9: 11.2, bb9: 3.5, saves: 65, bullpenRating: 80 },
  { id: 289, name: "Will Smith", era: "2020s", pos: "C", type: "batter", war: 22, ops: 0.835, avg: 0.261, hr: 118, rbi: 375, sb: 12, obp: 0.357, slg: 0.478, bbRate: 13.2, defRating: 85 },
  { id: 290, name: "J.T. Realmuto", era: "2020s", pos: "C", type: "batter", war: 28, ops: 0.802, avg: 0.265, hr: 130, rbi: 470, sb: 72, obp: 0.34, slg: 0.462, bbRate: 9.5, defRating: 94 },
  { id: 291, name: "Adley Rutschman", era: "2020s", pos: "C", type: "batter", war: 16, ops: 0.832, avg: 0.264, hr: 60, rbi: 208, sb: 12, obp: 0.383, slg: 0.449, bbRate: 15.8, defRating: 91 },
  { id: 292, name: "William Contreras", era: "2020s", pos: "C", type: "batter", war: 12, ops: 0.828, avg: 0.272, hr: 72, rbi: 231, sb: 8, obp: 0.355, slg: 0.473, bbRate: 10.5, defRating: 80 },
  { id: 293, name: "Vladimir Guerrero Jr.", era: "2020s", pos: "1B", type: "batter", war: 24, ops: 0.9, avg: 0.289, hr: 153, rbi: 493, sb: 10, obp: 0.369, slg: 0.531, bbRate: 11.8, defRating: 78 },
  { id: 294, name: "Spencer Torkelson", era: "2020s", pos: "1B", type: "batter", war: 8, ops: 0.795, avg: 0.24, hr: 62, rbi: 193, sb: 4, obp: 0.342, slg: 0.453, bbRate: 12.8, defRating: 76 },
  { id: 295, name: "Christian Walker", era: "2020s", pos: "1B", type: "batter", war: 14, ops: 0.82, avg: 0.254, hr: 112, rbi: 351, sb: 22, obp: 0.333, slg: 0.487, bbRate: 10.2, defRating: 88 },
  { id: 296, name: "Marcus Semien", era: "2020s", pos: "2B", type: "batter", war: 30, ops: 0.808, avg: 0.263, hr: 156, rbi: 513, sb: 96, obp: 0.325, slg: 0.483, bbRate: 8.2, defRating: 87 },
  { id: 297, name: "Jeff McNeil", era: "2020s", pos: "2B", type: "batter", war: 17, ops: 0.766, avg: 0.284, hr: 55, rbi: 258, sb: 30, obp: 0.343, slg: 0.423, bbRate: 9.5, defRating: 84 },
  { id: 298, name: "Ozzie Albies", era: "2020s", pos: "2B", type: "batter", war: 24, ops: 0.795, avg: 0.267, hr: 122, rbi: 432, sb: 82, obp: 0.319, slg: 0.476, bbRate: 6.5, defRating: 85 },
  { id: 299, name: "Gleyber Torres", era: "2020s", pos: "2B", type: "batter", war: 16, ops: 0.784, avg: 0.264, hr: 98, rbi: 354, sb: 28, obp: 0.337, slg: 0.447, bbRate: 9.8, defRating: 79 },
  { id: 300, name: "Austin Riley", era: "2020s", pos: "3B", type: "batter", war: 22, ops: 0.873, avg: 0.278, hr: 145, rbi: 487, sb: 13, obp: 0.342, slg: 0.531, bbRate: 8.0, defRating: 86 },
  { id: 301, name: "Jose Ramirez", era: "2020s", pos: "3B", type: "batter", war: 42, ops: 0.873, avg: 0.28, hr: 214, rbi: 773, sb: 176, obp: 0.356, slg: 0.517, bbRate: 10.5, defRating: 90 },
  { id: 302, name: "Matt Chapman", era: "2020s", pos: "3B", type: "batter", war: 24, ops: 0.781, avg: 0.243, hr: 126, rbi: 402, sb: 22, obp: 0.332, slg: 0.449, bbRate: 10.8, defRating: 98 },
  { id: 303, name: "Ke'Bryan Hayes", era: "2020s", pos: "3B", type: "batter", war: 14, ops: 0.741, avg: 0.258, hr: 58, rbi: 228, sb: 44, obp: 0.323, slg: 0.418, bbRate: 9.2, defRating: 95 },
  { id: 304, name: "Alex Bregman", era: "2020s", pos: "3B", type: "batter", war: 29, ops: 0.842, avg: 0.271, hr: 135, rbi: 492, sb: 18, obp: 0.371, slg: 0.471, bbRate: 13.5, defRating: 89 },
  { id: 305, name: "Xander Bogaerts", era: "2020s", pos: "SS", type: "batter", war: 22, ops: 0.814, avg: 0.276, hr: 109, rbi: 398, sb: 42, obp: 0.349, slg: 0.465, bbRate: 10.2, defRating: 82 },
  { id: 306, name: "Willy Adames", era: "2020s", pos: "SS", type: "batter", war: 21, ops: 0.802, avg: 0.25, hr: 120, rbi: 393, sb: 52, obp: 0.336, slg: 0.466, bbRate: 9.8, defRating: 84 },
  { id: 307, name: "Carlos Correa", era: "2020s", pos: "SS", type: "batter", war: 27, ops: 0.836, avg: 0.268, hr: 122, rbi: 432, sb: 22, obp: 0.357, slg: 0.479, bbRate: 11.5, defRating: 90 },
  { id: 308, name: "Bo Bichette", era: "2020s", pos: "SS", type: "batter", war: 19, ops: 0.803, avg: 0.289, hr: 107, rbi: 388, sb: 60, obp: 0.322, slg: 0.481, bbRate: 6.5, defRating: 75 },
  { id: 309, name: "Jeremy Peña", era: "2020s", pos: "SS", type: "batter", war: 12, ops: 0.745, avg: 0.259, hr: 64, rbi: 213, sb: 30, obp: 0.304, slg: 0.441, bbRate: 6.2, defRating: 91 },
  { id: 310, name: "Kyle Tucker", era: "2020s", pos: "RF", type: "batter", war: 30, ops: 0.887, avg: 0.281, hr: 143, rbi: 472, sb: 98, obp: 0.367, slg: 0.52, bbRate: 12.5, defRating: 88 },
  { id: 311, name: "Teoscar Hernandez", era: "2020s", pos: "RF", type: "batter", war: 17, ops: 0.851, avg: 0.267, hr: 143, rbi: 461, sb: 52, obp: 0.323, slg: 0.528, bbRate: 7.8, defRating: 80 },
  { id: 312, name: "Starling Marte", era: "2020s", pos: "CF", type: "batter", war: 16, ops: 0.786, avg: 0.282, hr: 76, rbi: 273, sb: 119, obp: 0.334, slg: 0.452, bbRate: 7.5, defRating: 83 },
  { id: 313, name: "Luis Robert Jr.", era: "2020s", pos: "CF", type: "batter", war: 17, ops: 0.837, avg: 0.26, hr: 102, rbi: 295, sb: 55, obp: 0.319, slg: 0.518, bbRate: 6.8, defRating: 92 },
  { id: 314, name: "Seiya Suzuki", era: "2020s", pos: "RF", type: "batter", war: 13, ops: 0.843, avg: 0.278, hr: 72, rbi: 237, sb: 18, obp: 0.375, slg: 0.468, bbRate: 13.8, defRating: 80 },
  { id: 315, name: "Lourdes Gurriel Jr.", era: "2020s", pos: "LF", type: "batter", war: 11, ops: 0.812, avg: 0.276, hr: 78, rbi: 278, sb: 22, obp: 0.332, slg: 0.48, bbRate: 7.0, defRating: 75 },
  { id: 316, name: "Ian Happ", era: "2020s", pos: "LF", type: "batter", war: 19, ops: 0.813, avg: 0.252, hr: 108, rbi: 353, sb: 38, obp: 0.356, slg: 0.457, bbRate: 13.0, defRating: 85 },
  { id: 317, name: "Michael Harris II", era: "2020s", pos: "CF", type: "batter", war: 12, ops: 0.788, avg: 0.264, hr: 58, rbi: 190, sb: 42, obp: 0.323, slg: 0.465, bbRate: 8.5, defRating: 93 },
  { id: 318, name: "Jarren Duran", era: "2020s", pos: "CF", type: "batter", war: 10, ops: 0.818, avg: 0.282, hr: 55, rbi: 172, sb: 48, obp: 0.334, slg: 0.484, bbRate: 8.8, defRating: 85 },
  { id: 319, name: "Corbin Carroll", era: "2020s", pos: "CF", type: "batter", war: 12, ops: 0.795, avg: 0.255, hr: 56, rbi: 193, sb: 95, obp: 0.344, slg: 0.451, bbRate: 11.2, defRating: 88 },
  { id: 320, name: "Matt Olson", era: "2020s", pos: "1B", type: "batter", war: 22, ops: 0.865, avg: 0.259, hr: 165, rbi: 524, sb: 8, obp: 0.365, slg: 0.5, bbRate: 13.5, defRating: 84 },
  { id: 321, name: "Jazz Chisholm Jr.", era: "2020s", pos: "CF", type: "batter", war: 13, ops: 0.812, avg: 0.253, hr: 72, rbi: 229, sb: 75, obp: 0.322, slg: 0.49, bbRate: 8.8, defRating: 82 },
  { id: 322, name: "Nathaniel Lowe", era: "2020s", pos: "1B", type: "batter", war: 16, ops: 0.796, avg: 0.27, hr: 72, rbi: 278, sb: 14, obp: 0.352, slg: 0.444, bbRate: 12.5, defRating: 82 },
  { id: 323, name: "CJ Abrams", era: "2020s", pos: "SS", type: "batter", war: 10, ops: 0.775, avg: 0.261, hr: 52, rbi: 172, sb: 58, obp: 0.323, slg: 0.452, bbRate: 8.5, defRating: 84 },
  { id: 324, name: "Tarik Skubal", era: "2020s", pos: "SP", type: "sp", war: 14, era_stat: 2.9, whip: 1.042, k9: 10.8, bb9: 1.8, winPct: 0.65, saves: 0 },
  { id: 325, name: "Ranger Suárez", era: "2020s", pos: "SP", type: "sp", war: 12, era_stat: 3.1, whip: 1.165, k9: 8.5, bb9: 2.5, winPct: 0.612, saves: 0 },
  { id: 326, name: "Pablo López", era: "2020s", pos: "SP", type: "sp", war: 13, era_stat: 3.41, whip: 1.13, k9: 9.5, bb9: 2.2, winPct: 0.576, saves: 0 },
  { id: 327, name: "Freddy Peralta", era: "2020s", pos: "SP", type: "sp", war: 13, era_stat: 3.33, whip: 1.09, k9: 11.5, bb9: 2.8, winPct: 0.571, saves: 0 },
  { id: 328, name: "Hunter Brown", era: "2020s", pos: "SP", type: "sp", war: 9, era_stat: 3.4, whip: 1.139, k9: 10.2, bb9: 2.8, winPct: 0.588, saves: 0 },
  { id: 329, name: "Sonny Gray", era: "2020s", pos: "SP", type: "sp", war: 15, era_stat: 3.02, whip: 1.109, k9: 9.8, bb9: 2.5, winPct: 0.6, saves: 0 },
  { id: 330, name: "Chris Bassitt", era: "2020s", pos: "SP", type: "sp", war: 14, era_stat: 3.55, whip: 1.165, k9: 8.8, bb9: 2.2, winPct: 0.57, saves: 0 },
  { id: 331, name: "Cristian Javier", era: "2020s", pos: "SP", type: "sp", war: 10, era_stat: 3.48, whip: 1.088, k9: 10.8, bb9: 3.2, winPct: 0.584, saves: 0 },
  { id: 332, name: "MacKenzie Gore", era: "2020s", pos: "SP", type: "sp", war: 9, era_stat: 3.35, whip: 1.128, k9: 11.0, bb9: 3.2, winPct: 0.565, saves: 0 },
  { id: 333, name: "Tyler Glasnow", era: "2020s", pos: "SP", type: "sp", war: 14, era_stat: 3.02, whip: 1.028, k9: 12.5, bb9: 2.8, winPct: 0.645, saves: 0 },
  { id: 334, name: "Nestor Cortes", era: "2020s", pos: "SP", type: "sp", war: 10, era_stat: 3.23, whip: 1.088, k9: 9.8, bb9: 2.0, winPct: 0.597, saves: 0 },
  { id: 335, name: "Max Fried", era: "2020s", pos: "SP", type: "sp", war: 18, era_stat: 3.01, whip: 1.143, k9: 8.8, bb9: 2.5, winPct: 0.64, saves: 0 },
  { id: 336, name: "Yusei Kikuchi", era: "2020s", pos: "SP", type: "sp", war: 12, era_stat: 3.25, whip: 1.115, k9: 10.5, bb9: 2.8, winPct: 0.56, saves: 0 },
  { id: 337, name: "Blake Snell", era: "2020s", pos: "SP", type: "sp", war: 16, era_stat: 3.12, whip: 1.152, k9: 11.8, bb9: 4.2, winPct: 0.54, saves: 0 },
  { id: 338, name: "Cole Ragans", era: "2020s", pos: "SP", type: "sp", war: 10, era_stat: 3.18, whip: 1.128, k9: 12.0, bb9: 3.5, winPct: 0.56, saves: 0 },
  { id: 339, name: "Mason Miller", era: "2020s", pos: "CL", type: "rp", war: 6, era_stat: 1.96, whip: 0.912, k9: 14.2, bb9: 2.8, saves: 52, bullpenRating: 93 },
  { id: 340, name: "Pete Fairbanks", era: "2020s", pos: "CL", type: "rp", war: 7, era_stat: 2.42, whip: 1.016, k9: 11.8, bb9: 3.2, saves: 58, bullpenRating: 84 },
  { id: 341, name: "Clay Holmes", era: "2020s", pos: "CL", type: "rp", war: 8, era_stat: 2.63, whip: 1.082, k9: 8.5, bb9: 2.8, saves: 68, bullpenRating: 83 },
  { id: 342, name: "Devin Williams", era: "2020s", pos: "CL", type: "rp", war: 9, era_stat: 1.78, whip: 0.883, k9: 13.5, bb9: 2.5, saves: 78, bullpenRating: 93 },
  { id: 343, name: "Tanner Scott", era: "2020s", pos: "CL", type: "rp", war: 7, era_stat: 2.48, whip: 1.102, k9: 12.8, bb9: 4.2, saves: 55, bullpenRating: 82 },
  { id: 344, name: "Paul Sewald", era: "2020s", pos: "CL", type: "rp", war: 6, era_stat: 2.78, whip: 1.035, k9: 11.5, bb9: 2.5, saves: 62, bullpenRating: 81 },
  { id: 345, name: "Camilo Doval", era: "2020s", pos: "CL", type: "rp", war: 7, era_stat: 2.98, whip: 1.148, k9: 10.8, bb9: 3.8, saves: 88, bullpenRating: 80 },
  { id: 346, name: "AJ Minter", era: "2020s", pos: "CL", type: "rp", war: 6, era_stat: 2.88, whip: 1.092, k9: 11.2, bb9: 2.8, saves: 28, bullpenRating: 80 },
];

const ROSTER_SLOTS = [
  { key: "c", label: "C", name: "Catcher", type: "batter", required: true },
  { key: "1b", label: "1B", name: "First Base", type: "batter", required: true },
  { key: "2b", label: "2B", name: "Second Base", type: "batter", required: true },
  { key: "3b", label: "3B", name: "Third Base", type: "batter", required: true },
  { key: "ss", label: "SS", name: "Shortstop", type: "batter", required: true },
  { key: "lf", label: "LF", name: "Left Field", type: "batter", required: true },
  { key: "cf", label: "CF", name: "Center Field", type: "batter", required: true },
  { key: "rf", label: "RF", name: "Right Field", type: "batter", required: true },
  { key: "dh", label: "DH", name: "Designated Hitter", type: "batter", required: true },
  { key: "sp1", label: "SP1", name: "Ace", type: "sp", required: true },
  { key: "sp2", label: "SP2", name: "2nd Starter", type: "sp", required: true },
  { key: "sp3", label: "SP3", name: "3rd Starter", type: "sp", required: true },
  { key: "sp4", label: "SP4", name: "4th Starter", type: "sp", required: false },
  { key: "cl", label: "CL", name: "Closer", type: "rp", required: true },
  { key: "rp1", label: "RP", name: "Setup Man", type: "rp", required: false },
];

const TOTAL_BUDGET = 1150;

function simulate(roster) {
  const players = Object.values(roster).filter(Boolean);
  const batters = players.filter(p => p.type === "batter");
  const sps = players.filter(p => p.type === "sp");
  const rps = players.filter(p => p.type === "rp");

  if (batters.length < 5 || sps.length < 2) return null;

  const offScore = batters.reduce((s, p) => s + p.ops * 100, 0) / batters.length;
  const pitchScore = sps.reduce((s, p) => s + (6 - p.era_stat) * 10 + p.k9 * 2, 0) / sps.length;
  const bullpenScore = rps.length > 0 ? rps.reduce((s, p) => s + (p.bullpenRating || 70), 0) / rps.length : 65;
  const defScore = batters.reduce((s, p) => s + (p.defRating || 80), 0) / batters.length;

  const baseWins = (offScore * 0.30 + pitchScore * 0.35 + bullpenScore * 0.20 + defScore * 0.15);
  const rawWins = Math.round(30 + baseWins * 0.95 + Math.random() * 6 - 3);
  const wins = Math.min(155, Math.max(40, rawWins));
  const losses = 162 - wins;

  const offRating = Math.min(100, Math.round(offScore * 1.1));
  const pitchRating = Math.min(100, Math.round(pitchScore * 2.2));
  const bullpenRating = Math.min(100, Math.round(bullpenScore));
  const defRating = Math.min(100, Math.round(defScore));

  return { wins, losses, offRating, pitchRating, bullpenRating, defRating };
}

export default function TheTrade() {
  const [roster, setRoster] = useState({});
  const [activeSlot, setActiveSlot] = useState(null);
  const [filterType, setFilterType] = useState("batter");
  const [simResult, setSimResult] = useState(null);
  const [phase, setPhase] = useState("build"); // build | result
  const [search, setSearch] = useState("");

  const usedWAR = Object.values(roster).filter(Boolean).reduce((s, p) => s + p.war, 0);
  const remaining = TOTAL_BUDGET - usedWAR;
  const budgetPct = (usedWAR / TOTAL_BUDGET) * 100;

  const usedIds = Object.values(roster).filter(Boolean).map(p => p.id);

  const filteredPlayers = ALL_PLAYERS.filter(p =>
    p.type === filterType &&
    !usedIds.includes(p.id) &&
    (search === "" || p.name.toLowerCase().includes(search.toLowerCase()))
  ).sort((a, b) => b.war - a.war);

  function assignPlayer(player) {
    if (!activeSlot) return;
    if (player.war > remaining + (roster[activeSlot]?.war || 0)) return;
    setRoster(prev => ({ ...prev, [activeSlot]: player }));
    setActiveSlot(null);
    setSearch("");
  }

  function removePlayer(slotKey) {
    setRoster(prev => { const n = {...prev}; delete n[slotKey]; return n; });
  }

  function runSim() {
    const result = simulate(roster);
    if (result) { setSimResult(result); setPhase("result"); }
  }

  function restart() {
    setRoster({}); setActiveSlot(null); setSimResult(null); setPhase("build"); setSearch("");
  }

  const slotType = activeSlot ? ROSTER_SLOTS.find(s => s.key === activeSlot)?.type : null;
  const effectiveFilter = slotType || filterType;

  const filledRequired = ROSTER_SLOTS.filter(s => s.required).every(s => roster[s.key]);

  const getWinColor = (w) => w >= 130 ? "#22c55e" : w >= 100 ? "#84cc16" : w >= 85 ? "#eab308" : w >= 70 ? "#f97316" : "#ef4444";
  const getRatingColor = (r) => r >= 85 ? "#22c55e" : r >= 70 ? "#84cc16" : r >= 55 ? "#eab308" : "#ef4444";

  const styles = {
    app: {
      minHeight: "100vh",
      background: "#060d1a",
      fontFamily: "'Trebuchet MS', sans-serif",
      color: "#e2e8f0",
      backgroundImage: "radial-gradient(ellipse at 70% 10%, rgba(16,60,30,0.35) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(10,40,80,0.3) 0%, transparent 50%)",
    },
    header: {
      background: "rgba(6,13,26,0.9)", backdropFilter: "blur(12px)",
      padding: "16px 28px", borderBottom: "1px solid rgba(255,255,255,0.06)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      position: "sticky", top: 0, zIndex: 10,
    },
  };

  if (phase === "result" && simResult) {
    const wc = getWinColor(simResult.wins);
    return (
      <div style={styles.app}>
        <div style={styles.header}>
          <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>
            The <span style={{ color: "#16a34a" }}>Trade</span>
          </div>
          <button onClick={restart} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#94a3b8", borderRadius: 6, padding: "6px 16px", cursor: "pointer", fontSize: 13 }}>← Rebuild</button>
        </div>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 20px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 11, letterSpacing: 3, color: "#64748b", marginBottom: 8 }}>SEASON PROJECTION</div>
            <div style={{ fontSize: 88, fontWeight: 900, color: wc, lineHeight: 1, letterSpacing: -2 }}>
              {simResult.wins}<span style={{ fontSize: 32, color: "#475569", letterSpacing: 0 }}>-{simResult.losses}</span>
            </div>
            <div style={{ fontSize: 18, color: wc, fontWeight: 600, marginTop: 8 }}>
              {simResult.wins >= 130 ? "🏆 DYNASTY — Unstoppable force" :
               simResult.wins >= 100 ? "🔥 PLAYOFF LOCK — Elite roster" :
               simResult.wins >= 85 ? "✅ CONTENDER — Wild Card threat" :
               simResult.wins >= 70 ? "⚠️ BUBBLE TEAM — Needs upgrades" :
               "❌ REBUILDING — Back to the drawing board"}
            </div>
            <div style={{ fontSize: 13, color: "#64748b", marginTop: 6 }}>WAR Spent: {usedWAR} / {TOTAL_BUDGET} · {TOTAL_BUDGET - usedWAR} remaining</div>
          </div>

          {/* Ratings */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 40 }}>
            {[
              { label: "Offense", val: simResult.offRating, icon: "🏏" },
              { label: "Pitching", val: simResult.pitchRating, icon: "⚾" },
              { label: "Bullpen", val: simResult.bullpenRating, icon: "🔥" },
              { label: "Defense", val: simResult.defRating, icon: "🛡️" },
            ].map(r => (
              <div key={r.label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "16px 12px", textAlign: "center" }}>
                <div style={{ fontSize: 22 }}>{r.icon}</div>
                <div style={{ fontSize: 32, fontWeight: 900, color: getRatingColor(r.val), lineHeight: 1.1 }}>{r.val}</div>
                <div style={{ fontSize: 11, color: "#64748b", letterSpacing: 1 }}>{r.label.toUpperCase()}</div>
              </div>
            ))}
          </div>

          {/* Roster summary */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ padding: "10px 16px", background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)", fontSize: 11, letterSpacing: 2, color: "#64748b" }}>
              FINAL ROSTER
            </div>
            {ROSTER_SLOTS.map(slot => {
              const p = roster[slot.key];
              if (!p) return null;
              return (
                <div key={slot.key} style={{ display: "flex", alignItems: "center", padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.04)", gap: 12 }}>
                  <div style={{ width: 36, fontSize: 11, fontWeight: 700, color: "#16a34a", fontFamily: "monospace" }}>{slot.label}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: "#64748b" }}>{p.era}</div>
                  </div>
                  <div style={{ fontSize: 13, color: "#fbbf24", fontWeight: 700 }}>{p.war} WAR</div>
                  {p.type === "batter" && <div style={{ fontSize: 12, color: "#94a3b8" }}>OPS {p.ops}</div>}
                  {p.type === "sp" && <div style={{ fontSize: 12, color: "#94a3b8" }}>ERA {p.era_stat}</div>}
                  {p.type === "rp" && <div style={{ fontSize: 12, color: "#94a3b8" }}>{p.saves} SV</div>}
                </div>
              );
            })}
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <button onClick={restart} style={{
              background: "linear-gradient(135deg, #16a34a, #15803d)",
              color: "#fff", border: "none", borderRadius: 8, padding: "14px 44px",
              fontSize: 15, fontWeight: 700, cursor: "pointer", letterSpacing: 2,
            }}>NEW ROSTER</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>
          The <span style={{ color: "#16a34a" }}>Trade</span>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ fontSize: 12 }}>
            <span style={{ color: "#64748b" }}>Budget: </span>
            <span style={{ color: remaining < 20 ? "#ef4444" : "#fbbf24", fontWeight: 700 }}>{remaining}</span>
            <span style={{ color: "#475569" }}> / {TOTAL_BUDGET} WAR</span>
          </div>
          {filledRequired && (
            <button onClick={runSim} style={{
              background: "linear-gradient(135deg, #16a34a, #15803d)",
              color: "#fff", border: "none", borderRadius: 6, padding: "8px 20px",
              fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: 1,
            }}>Run Season →</button>
          )}
        </div>
      </div>

      {/* Budget bar */}
      <div style={{ height: 3, background: "#0f172a" }}>
        <div style={{
          height: "100%", width: `${budgetPct}%`,
          background: budgetPct > 85 ? "#ef4444" : budgetPct > 60 ? "#eab308" : "#16a34a",
          transition: "width 0.4s ease",
        }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", minHeight: "calc(100vh - 56px)" }}>

        {/* Left: Roster */}
        <div style={{ borderRight: "1px solid rgba(255,255,255,0.06)", padding: "16px", overflowY: "auto" }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: "#64748b", marginBottom: 12 }}>YOUR ROSTER</div>
          {["batter", "sp", "rp"].map(type => (
            <div key={type} style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 10, letterSpacing: 2, color: "#334155", marginBottom: 6 }}>
                {type === "batter" ? "⚡ POSITION PLAYERS" : type === "sp" ? "⚾ STARTING ROTATION" : "🔥 BULLPEN"}
              </div>
              {ROSTER_SLOTS.filter(s => s.type === type).map(slot => {
                const player = roster[slot.key];
                const isActive = activeSlot === slot.key;
                return (
                  <div key={slot.key}
                    onClick={() => { setActiveSlot(isActive ? null : slot.key); setFilterType(slot.type); setSearch(""); }}
                    style={{
                      display: "flex", alignItems: "center", gap: 8, padding: "8px 10px",
                      borderRadius: 7, marginBottom: 3, cursor: "pointer",
                      background: isActive ? "rgba(22,163,74,0.12)" : player ? "rgba(255,255,255,0.03)" : "transparent",
                      border: `1px solid ${isActive ? "rgba(22,163,74,0.4)" : player ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)"}`,
                      transition: "all 0.15s",
                    }}>
                    <div style={{ width: 32, fontSize: 10, fontWeight: 700, color: "#16a34a", fontFamily: "monospace" }}>{slot.label}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {player ? (
                        <>
                          <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{player.name}</div>
                          <div style={{ fontSize: 10, color: "#64748b" }}>{player.era} · {player.war}W</div>
                        </>
                      ) : (
                        <div style={{ fontSize: 12, color: isActive ? "#16a34a" : "#334155" }}>
                          {slot.required ? "← Click to fill" : "Optional"}
                        </div>
                      )}
                    </div>
                    {player && (
                      <div onClick={e => { e.stopPropagation(); removePlayer(slot.key); }} style={{ color: "#475569", fontSize: 16, cursor: "pointer", padding: "0 4px" }}>×</div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}

          {!filledRequired && (
            <div style={{ fontSize: 12, color: "#475569", textAlign: "center", padding: "12px 0", fontStyle: "italic" }}>
              Fill all required slots to simulate
            </div>
          )}
        </div>

        {/* Right: Player pool */}
        <div style={{ padding: "16px", overflowY: "auto" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 16, alignItems: "center" }}>
            <div style={{ fontSize: 11, letterSpacing: 2, color: "#64748b", marginRight: 4 }}>
              {activeSlot ? `PICK FOR ${activeSlot.toUpperCase()}` : "PLAYER POOL"}
            </div>
            {!activeSlot && ["batter","sp","rp"].map(t => (
              <button key={t} onClick={() => setFilterType(t)} style={{
                background: filterType === t ? "rgba(22,163,74,0.15)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${filterType === t ? "rgba(22,163,74,0.4)" : "rgba(255,255,255,0.08)"}`,
                color: filterType === t ? "#86efac" : "#64748b",
                borderRadius: 5, padding: "4px 12px", fontSize: 11, cursor: "pointer", letterSpacing: 1,
              }}>
                {t === "batter" ? "BATTERS" : t === "sp" ? "STARTERS" : "RELIEVERS"}
              </button>
            ))}
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search player..." style={{
              marginLeft: "auto", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
              color: "#e2e8f0", borderRadius: 6, padding: "5px 12px", fontSize: 13, width: 160, outline: "none",
            }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
            {(activeSlot ? ALL_PLAYERS.filter(p => p.type === slotType && !usedIds.includes(p.id) && (search === "" || p.name.toLowerCase().includes(search.toLowerCase()))).sort((a,b)=>b.war-a.war) : filteredPlayers).map(player => {
              const canAfford = player.war <= remaining + (roster[activeSlot]?.war || 0);
              const isTarget = activeSlot !== null;
              return (
                <div key={player.id}
                  onClick={() => isTarget && canAfford ? assignPlayer(player) : null}
                  style={{
                    background: "rgba(255,255,255,0.03)", border: `1px solid ${isTarget && canAfford ? "rgba(22,163,74,0.2)" : "rgba(255,255,255,0.07)"}`,
                    borderRadius: 10, padding: 14, cursor: isTarget && canAfford ? "pointer" : "default",
                    opacity: isTarget && !canAfford ? 0.35 : 1,
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={e => { if (isTarget && canAfford) { e.currentTarget.style.borderColor = "#16a34a"; e.currentTarget.style.background = "rgba(22,163,74,0.07)"; }}}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = isTarget && canAfford ? "rgba(22,163,74,0.2)" : "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{player.name}</div>
                      <div style={{ fontSize: 11, color: "#64748b" }}>{player.era} · {player.pos}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 16, fontWeight: 900, color: "#fbbf24" }}>{player.war}</div>
                      <div style={{ fontSize: 10, color: "#64748b" }}>WAR</div>
                    </div>
                  </div>
                  {player.type === "batter" && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, fontSize: 11 }}>
                      {[["OPS", player.ops], ["AVG", player.avg], ["HR", player.hr]].map(([k,v]) => (
                        <div key={k} style={{ textAlign: "center", background: "rgba(255,255,255,0.03)", borderRadius: 4, padding: "3px 0" }}>
                          <div style={{ color: "#64748b" }}>{k}</div>
                          <div style={{ fontWeight: 600, color: "#e2e8f0" }}>{v}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {player.type === "sp" && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, fontSize: 11 }}>
                      {[["ERA", player.era_stat], ["K/9", player.k9], ["WHIP", player.whip]].map(([k,v]) => (
                        <div key={k} style={{ textAlign: "center", background: "rgba(255,255,255,0.03)", borderRadius: 4, padding: "3px 0" }}>
                          <div style={{ color: "#64748b" }}>{k}</div>
                          <div style={{ fontWeight: 600, color: "#e2e8f0" }}>{v}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {player.type === "rp" && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, fontSize: 11 }}>
                      {[["ERA", player.era_stat], ["K/9", player.k9], ["SV", player.saves]].map(([k,v]) => (
                        <div key={k} style={{ textAlign: "center", background: "rgba(255,255,255,0.03)", borderRadius: 4, padding: "3px 0" }}>
                          <div style={{ color: "#64748b" }}>{k}</div>
                          <div style={{ fontWeight: 600, color: "#e2e8f0" }}>{v}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {isTarget && canAfford && (
                    <div style={{ marginTop: 8, textAlign: "center", fontSize: 11, color: "#16a34a", fontWeight: 600 }}>
                      + Assign to {activeSlot?.toUpperCase()}
                    </div>
                  )}
                  {isTarget && !canAfford && (
                    <div style={{ marginTop: 8, textAlign: "center", fontSize: 11, color: "#ef4444" }}>
                      Over budget
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
