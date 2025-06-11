import { OriginalTrailData } from "./types/trails";

export const trailsData = [
  {
    name: "Pacific Crest Trail",
    subtitle: "PCT",
    country: "USA",
    flag: "https://flagcdn.com/us.svg",
    image:
      "https://cdn.outsideonline.com/wp-content/uploads/2020/09/22/naches-peak-loop-trail-lead_h.jpg?crop=16:9&width=960&enable=upscale&quality=100",
    distance: "4,265 km",
    physicalDifficulty: "4/5",
    adventureDifficulty: "3/5",
    sceneryRating: "5/5",
    landscape: "Deserts • Mountains • Forests",
    specificity: "Legendary West Coast Trail",
    idealWindow: "April/May",
    estimatedDuration: "4-6 months",
    budget: "€920-€2,300/month", // Updated based on research
    social: "Very Social",
    terrain: "Mountainous, Desert, Forested",
    dangers: ["Snow (Sierra)", "Fires", "River Crossings"],
    budgetLevel: 3,
    why: "Because it's a grand, scenic rollercoaster of extremes where you'll find both yourself and a whole new family.",
    socialScale: 5, // Very Social
    wildernessScale: 4, // Mostly Wild, some towns
    highestPoint: "Forester Pass (4,009 m / 13,153 ft)",
    regionsTraversed: ["California", "Oregon", "Washington"],
  },
  {
    name: "Appalachian Trail",
    subtitle: "AT",
    country: "USA",
    flag: "https://flagcdn.com/us.svg",
    image: "https://img.peapix.com/41819d806e6a4ea48cc00157c6a7d545_UHD.jpg",
    distance: "3,500 km",
    physicalDifficulty: "5/5",
    adventureDifficulty: "2/5",
    sceneryRating: "3/5",
    landscape: "Forests • History • Culture",
    specificity: "The oldest long-distance trail",
    idealWindow: "March/April",
    estimatedDuration: "5-7 months",
    budget: "€550-€1800/month", // Updated based on research
    social: "Very Social",
    terrain: "Muddy, Rooty, Rocky",
    dangers: ["Ticks", "Bears", "Storms"],
    budgetLevel: 2,
    why: "If you want to walk through an endless green tunnel of roots and rocks, forge unbreakable bonds, and learn how much rain a human can actually withstand.",
    socialScale: 5, // Very Social
    wildernessScale: 3, // Green tunnel, but never far from civilization
    highestPoint: "Kuwohi (formerly Clingmans Dome) (2,025 m / 6,643 ft)",
    regionsTraversed: [
      "Georgia",
      "North Carolina",
      "Tennessee",
      "Virginia",
      "West Virginia",
      "Maryland",
      "Pennsylvania",
      "New Jersey",
      "New York",
      "Connecticut",
      "Massachusetts",
      "Vermont",
      "New Hampshire",
      "Maine",
    ],
  },
  {
    name: "Continental Divide Trail",
    subtitle: "CDT",
    country: "USA",
    flag: "https://flagcdn.com/us.svg",
    image:
      "https://www.halfwayanywhere.com/wp-content/uploads/2021/04/CDT-Colorado-12-Snow-Trail.jpg",
    distance: "5,000 km",
    physicalDifficulty: "5/5",
    adventureDifficulty: "5/5",
    sceneryRating: "5/5",
    landscape: "Wild Rockies • High Plains • Deserts", // Updated based on research
    specificity: "The ultimate Rockies adventure",
    idealWindow: "June",
    estimatedDuration: "5-7 months",
    budget: "€920-€1,380/month", // Updated based on research
    social: "Very Solitary",
    terrain: "High Mountain, Off-trail, Variable", // Updated based on research
    dangers: [
      "Navigation",
      "Isolation",
      "Dangerous Wildlife",
      "River Crossings",
      "Snow",
    ], // Updated based on research
    budgetLevel: 4,
    why: "For an unmatched blend of breathtaking beauty and pure, unadulterated solitude where the biggest challenge is often just finding the trail.",
    socialScale: 2, // Very Solitary - Confirmed
    wildernessScale: 5, // Pure Wild - Confirmed
    highestPoint: "Grays Peak (4,352 m / 14,278 ft)",
    regionsTraversed: ["New Mexico", "Colorado", "Wyoming", "Idaho", "Montana"],
  },
  {
    name: "Te Araroa",
    subtitle: "NZ",
    country: "New Zealand",
    flag: "https://flagcdn.com/nz.svg",
    image:
      "https://images.squarespace-cdn.com/content/v1/6513fec59a2356315a19625a/1695810065822-7G9Y7FO0WYBNIOE0DZ84/Te-Araroa-Lake-Constance-e1603374801559.jpg?format=1500w",
    distance: "3,000 km",
    physicalDifficulty: "4/5",
    adventureDifficulty: "4/5",
    sceneryRating: "5/5",
    landscape: "Coasts • Volcanoes • Fjords • Forests • Urban Sections", // Updated based on research
    specificity: "Spectacular New Zealand diversity",
    idealWindow: "Oct/Nov",
    estimatedDuration: "3-5 months",
    budget: "€1,360-€1,700/month", // Updated based on research
    social: "Social",
    terrain: "Coastal, Mountains, Volcanic, River Crossings, Forests", // Updated based on research
    dangers: [
      "River Crossings",
      "Unpredictable Weather",
      "Navigation",
      "Sandflies",
    ], // Updated based on research
    budgetLevel: 3,
    why: "Where else can you hike active volcanoes, paddle rivers, and then walk pristine beaches, all while battling epic weather in one unforgettable journey?",
    socialScale: 4, // Social - Confirmed
    wildernessScale: 4, // Diverse, often wild - Confirmed
    highestPoint: "Stag Saddle (1,925 m / 6,315 ft)",
    regionsTraversed: [
      "Northland",
      "Auckland",
      "Waikato",
      "Bay of Plenty",
      "Manawatu-Wanganui",
      "Wellington",
      "Nelson",
      "Marlborough",
      "Canterbury",
      "Otago",
      "Southland",
    ],
  },
  {
    name: "Hexatrek",
    subtitle: "FR",
    country: "France",
    flag: "https://flagcdn.com/fr.svg",
    image:
      "https://img.oastatic.com/img2/70934327/max/variant.jpg?revbust=38b01229",
    distance: "3,034 km",
    physicalDifficulty: "5/5",
    adventureDifficulty: "4/5",
    sceneryRating: "4/5",
    landscape: "Massifs • Parks • Heritage",
    specificity: "Tour de France of mountain ranges",
    idealWindow: "June/July",
    estimatedDuration: "3-4 months",
    budget: "€800-€1,200/month", // Confirmed from previous research
    social: "Moderately Social",
    terrain: "Mountainous, Forested",
    dangers: ["Storms (Montagne)", "Heat (Sud)", "Snow (early/late season)"], // Added based on context
    budgetLevel: 2,
    why: "To conquer France's majestic mountain ranges and discover hidden regional gems, proving there's more to France than just Paris and baguettes.",
    socialScale: 3, // Moderately Social
    wildernessScale: 3, // Mix of mountain and villages
    highestPoint: "Mont Thabor (3,178 m / 10,427 ft)",
    regionsTraversed: [
      "Grand Est (Vosges)",
      "Bourgogne-Franche-Comté (Jura)",
      "Auvergne-Rhône-Alpes (Northern Alps: Vanoise, Beaufortain; Southern Alps: Écrins, Vercors, Belledonne)",
      "Occitanie (Cévennes, Tarn)",
      "Nouvelle-Aquitaine / Occitanie (Pyrenees)",
    ],
  },
  {
    name: "Ruta de los Parques",
    subtitle: "CL",
    country: "Chile",
    flag: "https://flagcdn.com/cl.svg",
    image:
      "https://www.rutadelosparques.org/en/wp-content/uploads/2020/11/DSC03829-2.jpg",
    distance: "2,800 km",
    physicalDifficulty: "4/5",
    adventureDifficulty: "5/5",
    sceneryRating: "5/5",
    landscape: "Patagonia • Glaciers • Fjords • Forests • Steppe", // Updated based on research
    specificity: "Wild and authentic Patagonia",
    idealWindow: "Nov/Dec",
    estimatedDuration: "2-4 months",
    budget:
      "€1,000-€1,800/month (potentially higher due to remoteness and specific logistics)", // Adjusted to reflect potential higher costs
    social: "Very Solitary",
    terrain: "Glacial, Fjords, Mountainous, River Crossings, Remote", // Updated based on research
    dangers: ["Extreme Weather", "Isolation", "Water Crossings", "Navigation"], // Confirmed
    budgetLevel: 4,
    why: "If you dream of untouched wilderness, massive glaciers, and truly earning your Patagonian vistas, this is where you disappear (happily).",
    socialScale: 1, // Very Solitary - Confirmed
    wildernessScale: 5, // Very Wild - Confirmed
    highestPoint:
      "Mount San Valentín (3,910 m / 12,828 ft) - *highest peak in Patagonia, though not directly on the main hiking route, it's a significant point of interest accessible via the route.*",
    regionsTraversed: [
      "Los Lagos Region",
      "Aysén Region (e.g., Cerro Castillo NP, Patagonia NP)",
      "Magallanes Region (e.g., Torres del Paine NP, Kawésqar NP, Bernardo O'Higgins NP)",
    ],
  },
  {
    name: "Great Divide Trail",
    subtitle: "GDT",
    country: "Canada",
    flag: "https://flagcdn.com/ca.svg",
    image:
      "https://pushbikegirl.com/wp-content/uploads/2017/01/Nr62-Kanada-14.jpg",
    distance: "1,130 km",
    physicalDifficulty: "5/5",
    adventureDifficulty: "5/5",
    sceneryRating: "5/5",
    landscape: "Canadian Rockies • Remote Wilderness • Alpine",
    specificity: "Challenging wilderness route along the Continental Divide",
    idealWindow: "July/August",
    estimatedDuration: "6-8 weeks",
    budget: "€920-€1,840/month", // Updated based on research
    social: "Very Solitary",
    terrain: "Rugged Mountain, Forest, River Crossings, Off-trail sections", // Added based on research
    dangers: [
      "Grizzly Bears",
      "River Crossings",
      "Snow (early/late season)",
      "Remote Sections",
      "Navigation Challenges",
    ],
    budgetLevel: 3,
    why: "Because true wilderness means navigating unmarked trails, dodging grizzly bears, and crossing rivers that might make your heart skip a beat.",
    socialScale: 1, // Very Solitary - Confirmed
    wildernessScale: 5, // Very Wild - Confirmed
    highestPoint:
      "Unnamed Pass (often referred to as Michelle Lakes Pass) (2,578 m / 8,458 ft)",
    regionsTraversed: ["Alberta", "British Columbia"],
  },
  {
    name: "Arizona Trail",
    subtitle: "AZT",
    country: "USA",
    flag: "https://flagcdn.com/us.svg",
    image:
      "https://cdn.outsideonline.com/wp-content/uploads/2022/11/ghc-atz-thru-hike-cow-scaled.jpg?width=730",
    distance: "1,287 km",
    physicalDifficulty: "4/5",
    adventureDifficulty: "3/5",
    sceneryRating: "4/5",
    landscape: "Deserts • Canyons • Mountains • Forests",
    specificity:
      "Traverses Arizona from Mexico to Utah, including Grand Canyon",
    idealWindow: "March/April (NOBO) or Oct/Nov (SOBO)",
    estimatedDuration: "6-8 weeks",
    budget: "€736-€1,104/month", // Updated based on research
    social: "Social",
    terrain: "Desert, Mountainous, Canyons, Varied", // Confirmed
    dangers: ["Heat", "Water Scarcity", "Rattlesnakes", "Flash Floods"],
    budgetLevel: 2,
    why: "To discover that Arizona is far more than just desert – it's a surprisingly diverse odyssey that culminates in *that* Canyon view.",
    socialScale: 4, // Social - Confirmed
    wildernessScale: 3, // Mix of wilderness and access points - Confirmed
    highestPoint:
      "Kaibab Plateau (approx. 2,900 m / 9,600 ft) or San Francisco Peaks (on a proposed section)",
    regionsTraversed: ["Arizona"],
  },
  {
    name: "Hayduke Trail",
    subtitle: "HDT",
    country: "USA",
    flag: "https://flagcdn.com/us.svg",
    image:
      "https://travelingnaturejournal.com/wp-content/uploads/2023/09/HaydukeTrail_VeggieScrambling-1024x601.jpg",
    distance: "1,290 km",
    physicalDifficulty: "5/5",
    adventureDifficulty: "5/5",
    sceneryRating: "5/5",
    landscape: "Desert Canyons • Red Rock • Wilderness • Geological Formations", // Updated based on research
    specificity:
      "Unmarked, challenging route through Southern Utah and Northern Arizona's canyons",
    idealWindow: "April/May or Sept/Oct",
    estimatedDuration: "8-10 weeks",
    budget:
      "€920-€1,380/month (Highly variable due to remoteness and specialized gear)", // Adjusted to reflect more general remote trail budget
    social: "Very Solitary",
    terrain: "Canyon Country, Off-trail, Scrambling, Remote", // Confirmed
    dangers: [
      "Navigation",
      "Water Caches",
      "Exposure",
      "Extreme Heat/Cold",
      "Flash Floods",
      "Technical sections",
    ], // Confirmed and expanded
    budgetLevel: 3,
    why: "You're looking for a route that actively tries to lose you, demanding every ounce of your skill to navigate an otherworldly red rock labyrinth.",
    socialScale: 1, // Very Solitary - Confirmed
    wildernessScale: 5, // Extremely Wild - Confirmed
    highestPoint: "Mount Ellen in the Henry Mountains (3,481 m / 11,419 ft)",
    regionsTraversed: ["Utah", "Arizona"],
  },
  {
    name: "Via Alpina",
    subtitle: "European Alps",
    country: "Europe (8 Alpine countries)",
    flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/1024px-Flag_of_Europe.svg.png",
    image:
      "https://images.squarespace-cdn.com/content/v1/5c7be58cb7c92c5aeea73009/5e7a1223-a283-4fdc-ac07-3c1375d232fd/A+spectacular+view+up+Lauterbrunnental+as+you+descend+from+Wengen+%281%29+%281%29.jpg",
    distance: "5,000 km (entire network)",
    physicalDifficulty: "4/5",
    adventureDifficulty: "3/5",
    sceneryRating: "5/5",
    landscape:
      "Alpine Peaks • Valleys • Villages • Glaciers (High Routes) • Diverse Alpine Culture", // Updated based on research
    specificity:
      "Network of 5 long-distance trails across the entire Alpine arc",
    idealWindow: "June-September",
    estimatedDuration: "4-6 months (for a full route)",
    budget: "€1,300-€2,500/month", // Updated based on research
    social: "Moderately Social (can be solitary on less popular sections)",
    terrain:
      "Mountainous, Well-marked (mostly), Some steep sections, Varied terrain", // Confirmed
    dangers: [
      "Thunderstorms",
      "Snowfields (early season)",
      "Altitude",
      "Rockfall",
    ], // Confirmed
    budgetLevel: 4,
    why: "Walk across an entire continent's mountainous spine, experiencing a dizzying blend of languages, cultures, and eye-watering Alpine grandeur.",
    socialScale: 3, // Moderately Social (can vary greatly by section) - Confirmed
    wildernessScale: 3, // Mix of true wilderness and developed areas/huts - Confirmed
    highestPoint:
      "Niederjoch pass (3,019 m / 9,905 ft) or Hohtürli (2,778 m / 9,114 ft)", // Providing both as context varies
    regionsTraversed: [
      "Slovenia",
      "Italy (Friuli-Venezia Giulia, Veneto, Trentino-Alto Adige, Lombardy, Piedmont, Liguria)",
      "Austria",
      "Germany (Bavaria)",
      "Liechtenstein",
      "Switzerland",
      "France",
      "Monaco",
    ],
  },
  {
    name: "Sentiero Italia",
    subtitle: "SI",
    country: "Italy",
    flag: "https://flagcdn.com/it.svg",
    image:
      "https://cdn.prod.website-files.com/5e25c985b2b645fe961750ff/61e6f5e056f0f1f9dec80a4a_campania-vasentiero-sentiero-italia-cover.jpg",
    distance: "7,850 km",
    physicalDifficulty: "4/5",
    adventureDifficulty: "3/5",
    sceneryRating: "4/5",
    landscape:
      "Mountains • Hills • Coastlines • Historical Towns • Diverse Cultural Landscapes", // Updated based on research
    specificity: "Covers Italy's entire mountainous spine and islands",
    idealWindow: "May-June or Sept-Oct",
    estimatedDuration: "8-12 months (or section by section)",
    budget: "€1,050-€1,800/month", // Updated based on research
    social: "Moderately Social",
    terrain: "Varied, Mountainous, Forested, Coastal, Historical Paths", // Confirmed
    dangers: [
      "Heat (South)",
      "Isolation (some sections)",
      "Logistics (resupply/water)",
      "Thunderstorms",
    ], // Confirmed and expanded
    budgetLevel: 3,
    why: "Because it's a walking feast for the senses, taking you through Italy's wild heart, historic villages, and straight to the best pasta you'll ever earn.",
    socialScale: 3, // Moderately Social, touches many towns - Confirmed
    wildernessScale: 2, // Less wild, more cultural/historical - Confirmed
    highestPoint:
      "Punta La Marmora (Sardinia) (1,834 m / 6,017 ft) or generally around 3,098m in the Alps (on specific high sections)", // Providing both as context varies
    regionsTraversed: [
      "Sardinia",
      "Sicily",
      "Calabria",
      "Basilicata",
      "Puglia",
      "Campania",
      "Molise",
      "Abruzzo",
      "Lazio",
      "Umbria",
      "Marche",
      "Tuscany",
      "Emilia-Romagna",
      "Liguria",
      "Piedmont",
      "Valle d'Aosta",
      "Lombardy",
      "Trentino-Alto Adige",
      "Veneto",
      "Friuli-Venezia Giulia",
    ],
  },
  {
    name: "Michinoku Coastal Trail",
    subtitle: "MCT",
    country: "Japan",
    flag: "https://flagcdn.com/jp.svg",
    image: "https://rawtravel.com/wp-content/uploads/2023/12/MCT_Kuji007.jpg",
    distance: "1,000 km",
    physicalDifficulty: "3/5",
    adventureDifficulty: "2/5",
    sceneryRating: "4/5",
    landscape:
      "Coastal Cliffs • Beaches • Fishing Villages • Forests • Wetlands", // Updated based on research
    specificity: "Reconstruction and scenic trail along Japan's Tohoku coast",
    idealWindow: "April-June or Sept-Nov",
    estimatedDuration: "6-8 weeks",
    budget: "€1,800-€2,400/month", // Updated based on research
    social: "Social (local interaction, many guesthouses)",
    terrain: "Coastal paths, Forest trails, Urban sections, Some elevation", // Confirmed
    dangers: [
      "Bears (some areas)",
      "Tsunamis (awareness needed)",
      "Logistics (language/planning)",
      "Steep ascents/descents",
    ],
    budgetLevel: 3,
    why: "For a uniquely Japanese blend of stunning coastal beauty, profound resilience, and the joy of discovering hidden culinary delights in small fishing towns.",
    socialScale: 3, // Social, as it goes through many towns - Confirmed
    wildernessScale: 2, // Primarily coastal, less deep wilderness - Confirmed
    highestPoint: "Mount Hashikamidake (740 m / 2,428 ft)",
    regionsTraversed: [
      "Aomori Prefecture",
      "Iwate Prefecture",
      "Miyagi Prefecture",
      "Fukushima Prefecture",
    ],
  },
];
