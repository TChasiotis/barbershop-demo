import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Sweeping old data...");
  await prisma.product.deleteMany();
  await prisma.service.deleteMany();

  console.log("Starting database seed...");

  // --- SERVICES ---
  const services = [
    {
      name: "Ανδρικό κούρεμα",
      nameEn: "Men's Haircut",
      duration: "30 min",
      price: "$15",
      sortOrder: 1,
    },
    {
      name: "Ανδρικό κούρεμα + Γένια",
      nameEn: "Men's Haircut + Beard Trim",
      duration: "30 min",
      price: "$20",
      sortOrder: 2,
    },
    {
      name: "Κούρεμα ψαλίδι",
      nameEn: "Scissors Cut",
      duration: "1 h",
      price: "$22",
      sortOrder: 3,
    },
    {
      name: "Κούρεμα ψαλίδι + Γένια",
      nameEn: "Scissors Cut + Beard Trim",
      duration: "1 h",
      price: "$28",
      sortOrder: 4,
    },
    {
      name: "Περιποίηση Γενειάδας",
      nameEn: "Beard Care",
      duration: "15 min",
      price: "$10",
      sortOrder: 5,
    },
    {
      name: "Παιδικό κούρεμα",
      nameEn: "Kids Haircut",
      duration: "30 min",
      price: "$12",
      sortOrder: 6,
    },
    {
      name: "Αποτρίχωση μύτης",
      nameEn: "Nose Waxing",
      duration: "15 min",
      price: "$5",
      sortOrder: 7,
    },
    {
      name: "Περιποίηση φρυδιών",
      nameEn: "Eyebrow Grooming",
      duration: "15 min",
      price: "$5",
      sortOrder: 8,
    },
    {
      name: "Περμανάντ - Permanent",
      nameEn: "Permanent",
      duration: "1 h, 30 min",
      price: "from $45",
      sortOrder: 9,
    },
    {
      name: "Ανταύγειες Silver (Men)",
      nameEn: "Silver Highlights (Men)",
      duration: "2 h",
      price: "from $40",
      sortOrder: 10,
    },
    {
      name: "Silver color 🧊(Men)",
      nameEn: "Silver Color (Men)",
      duration: "2 h",
      price: "from $50",
      sortOrder: 11,
    },
  ];

  for (const service of services) {
    await prisma.service.create({
      data: service,
    });
  }

  // --- PRODUCTS ---
  const products = [
    // --- PREP & VOLUME ---
    {
      name: "Poppin' Yang Sea Salt Spray",
      desc: "Σπρέι αλατιού για όγκο και φυσικό styling.",
      descEn: "Sea salt spray for volume and natural styling.",
      price: "$18",
      img: "./products/poppin_yang_sea_salt_spray.png",
      category: "prep",
      sortOrder: 1,
    },
    {
      name: "Lavish Care Hair Grooming Tonic",
      desc: "Ιδανικό για προετοιμασία styling με πιστολάκι.",
      descEn: "Ideal for pre-styling with a blow dryer.",
      price: "$15",
      img: "./products/lc_care_hair_grooming_tonic.png",
      category: "prep",
      sortOrder: 2,
    },
    {
      name: "Poppin' Yang Texture Powder",
      desc: "Πούδρα για μέγιστο όγκο στις ρίζες.",
      descEn: "Texture powder for maximum volume at the roots.",
      price: "$18",
      img: "./products/poppin_yang_texture_powder.png",
      category: "prep",
      sortOrder: 3,
    },

    // --- POMADES, CLAYS, PASTES ---
    {
      name: "Lavish Care Matte Cream Paste",
      desc: "Κρέμα για φυσικό αποτέλεσμα χωρίς γυαλάδα.",
      descEn: "Cream paste for a natural look without shine.",
      price: "$16",
      img: "./products/matte_cream_paste.png",
      category: "pomades",
      sortOrder: 4,
    },
    {
      name: "Lavish Care Clay Pomade",
      desc: "Πομάδα αργίλου για δυνατό κράτημα και ματ υφή.",
      descEn: "Clay pomade for strong hold and matte finish.",
      price: "$16",
      img: "./products/lc_clay_pomade.png",
      category: "pomades",
      sortOrder: 5,
    },
    {
      name: "Lavish Care Styling Mud",
      desc: "Λάσπη φορμαρίσματος για ελαστικό κράτημα.",
      descEn: "Styling mud for flexible hold.",
      price: "$16",
      img: "./products/lc_styling_mud.png",
      category: "pomades",
      sortOrder: 6,
    },
    {
      name: "Lavish Care Strong Hold Deluxe",
      desc: "Κλασική πομάδα για πολύ δυνατό κράτημα & λάμψη.",
      descEn: "Classic pomade for strong hold and shine.",
      price: "$16",
      img: "./products/lc_strong_hold_deluxe.png",
      category: "pomades",
      sortOrder: 7,
    },

    // --- WAXES ---
    {
      name: "Innovation Detreu Cream Wax 05",
      desc: "Κρεμώδες κερί για φυσικό στυλ.",
      descEn: "Cream wax for a natural style.",
      price: "$14",
      img: "./products/innovation_detreu_cream_wax_05_natural_strong_soft.png",
      category: "waxes",
      sortOrder: 8,
    },
    {
      name: "Innovation Detreu Aqua Wax 07",
      desc: "Κερί νερού για εξαιρετικά δυνατό κράτημα.",
      descEn: "Aqua wax for exceptional hold.",
      price: "$14",
      img: "./products/innovation_detreu_aqua_hair_wax_07_extra_strong_crazy.png",
      category: "waxes",
      sortOrder: 9,
    },
    {
      name: "Innovation Detreu Aqua Wax 08",
      desc: "Απόλυτος έλεγχος με εφέ δροσιάς.",
      descEn: "Ultimate control with a cool finish.",
      price: "$14",
      img: "./products/innovation_detreu_aqua_hair_wax_08_ultra_strong_cool.png",
      category: "waxes",
      sortOrder: 10,
    },
    {
      name: "Red One Bright White Aqua Hair Wax",
      desc: "Full force maximum control, καθαρό αποτέλεσμα.",
      descEn: "Full force maximum control, clean result.",
      price: "$12",
      img: "./products/red_one_bright_white_aqua_hair_wax_full_force_maximum_control.png",
      category: "waxes",
      sortOrder: 11,
    },

    // --- CARE & SHAMPOOS ---
    {
      name: "Lavish Care Siberian Hunter",
      desc: "Αναζωογονητικό σαμπουάν για μαλλιά και σώμα.",
      descEn: "Revitalizing shampoo for hair and body.",
      price: "$16",
      img: "./products/lc_siberian_hunter.png",
      category: "care",
      sortOrder: 12,
    },
    {
      name: "Lavish Care Siberian Healer",
      desc: "Δροσιστικό σαμπουάν για βαθύ καθαρισμό.",
      descEn: "Cooling shampoo for deep cleansing.",
      price: "$16",
      img: "./products/lc_siberian_healer.png",
      category: "care",
      sortOrder: 13,
    },
    {
      name: "Poppin' Yang Beard Cream",
      desc: "Κρέμα για μαλακά γένια και ενυδάτωση δέρματος.",
      descEn: "Cream for soft beards and skin hydration.",
      price: "$18",
      img: "./products/poppin_yang_beard_cream.png",
      category: "care",
      sortOrder: 14,
    },

    // --- COLOGNE / AFTER SHAVE ---
    {
      name: "Red One Natural Cologne Thunderbolt",
      desc: "Κολόνια για έντονη φρεσκάδα μετά το κούρεμα.",
      descEn: "Cologne for intense freshness after styling.",
      price: "$15",
      img: "./products/red_one_natural_cologne_pure_by_nature_thunderbolt.png",
      category: "cologne",
      sortOrder: 15,
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log(
    "Success! All services and products have been added to the database.",
  );
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
