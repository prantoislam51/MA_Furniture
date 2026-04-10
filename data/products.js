const categories = [
  "cat_001",
  "cat_002",
  "cat_003",
  "cat_004",
  "cat_005",
  "cat_006",
  "cat_007",
  "cat_008"
];

const catalog = {
  cat_001: {
    bn: [
      "রয়্যাল এক্সিকিউটিভ চেয়ার",
      "ক্লাসিক ডাইনিং চেয়ার",
      "নর্ডিক লাউঞ্জ চেয়ার",
      "মহারাজা কাঠের আর্মচেয়ার",
      "স্মার্ট স্টাডি চেয়ার",
      "হেরিটেজ রকিং চেয়ার",
      "এলিট অফিস ভিজিটর চেয়ার"
    ],
    en: [
      "Royal Executive Chair",
      "Classic Dining Chair",
      "Nordic Lounge Chair",
      "Maharaja Wooden Armchair",
      "Smart Study Chair",
      "Heritage Rocking Chair",
      "Elite Office Visitor Chair"
    ],
    material: "সেগুন কাঠ",
    finish: "ম্যাট ওয়ালনাট",
    dimensions: ["65×65×95 সেমি", "58×62×90 সেমি", "72×70×84 সেমি", "60×63×92 সেমি", "56×59×88 সেমি", "68×78×105 সেমি", "57×61×89 সেমি"],
    color: "গাঢ় বাদামী",
    weight: ["14 কেজি", "11 কেজি", "13 কেজি", "15 কেজি", "10 কেজি", "16 কেজি", "12 কেজি"],
    prices: [12500, 9800, 14900, 16800, 8500, 17900, 9200]
  },
  cat_002: {
    bn: [
      "ইম্পেরিয়াল ডাইনিং টেবিল",
      "মডার্ন কফি টেবিল",
      "স্টাডি ডেস্ক প্রো",
      "রয়্যাল সেন্টার টেবিল",
      "সিগনেচার কনসোল টেবিল",
      "মাল্টি-ইউজ ফোল্ডিং টেবিল",
      "প্রিমিয়াম সাইড টেবিল"
    ],
    en: [
      "Imperial Dining Table",
      "Modern Coffee Table",
      "Study Desk Pro",
      "Royal Center Table",
      "Signature Console Table",
      "Multi Use Folding Table",
      "Premium Side Table"
    ],
    material: "গামারি কাঠ",
    finish: "সাটিন টিক",
    dimensions: ["180×95×76 সেমি", "120×60×45 সেমি", "140×70×75 সেমি", "110×110×40 সেমি", "150×45×82 সেমি", "120×60×74 সেমি", "55×55×52 সেমি"],
    color: "ওয়ালনাট ব্রাউন",
    weight: ["42 কেজি", "19 কেজি", "28 কেজি", "21 কেজি", "24 কেজি", "18 কেজি", "8 কেজি"],
    prices: [35500, 14500, 19800, 16200, 17800, 12900, 6800]
  },
  cat_003: {
    bn: [
      "গ্র্যান্ড মেইন ডোর",
      "সিকিউর গ্লাস ডোর",
      "মিনিমাল ইন্টেরিয়র ডোর",
      "ট্র্যাডিশনাল খোদাই দরজা",
      "ওক ফিনিশ রুম ডোর",
      "ডাবল প্যানেল এন্ট্রি ডোর",
      "সাইলেন্ট স্লাইডিং ডোর"
    ],
    en: [
      "Grand Main Door",
      "Secure Glass Door",
      "Minimal Interior Door",
      "Traditional Carved Door",
      "Oak Finish Room Door",
      "Double Panel Entry Door",
      "Silent Sliding Door"
    ],
    material: "সলিড সেগুন + ইঞ্জিনিয়ার্ড উড",
    finish: "ডার্ক ওক পলিশ",
    dimensions: ["96×210 সেমি", "90×210 সেমি", "85×205 সেমি", "100×220 সেমি", "88×208 সেমি", "120×215 সেমি", "90×210 সেমি"],
    color: "চারকোল ব্রাউন",
    weight: ["48 কেজি", "44 কেজি", "39 কেজি", "52 কেজি", "41 কেজি", "58 কেজি", "36 কেজি"],
    prices: [58500, 44500, 31900, 69000, 36500, 72500, 29800]
  },
  cat_004: {
    bn: [
      "প্যানোরামা স্লাইডিং জানালা",
      "প্রিমিয়াম কেসমেন্ট জানালা",
      "ডেকোরেটিভ আর্চ জানালা",
      "ভেন্টিলেশন স্মার্ট উইন্ডো",
      "ডাবল গ্লেজ লাক্স উইন্ডো",
      "ক্লাসিক ফ্রেঞ্চ উইন্ডো",
      "কমপ্যাক্ট সেফটি উইন্ডো"
    ],
    en: [
      "Panorama Sliding Window",
      "Premium Casement Window",
      "Decorative Arch Window",
      "Ventilation Smart Window",
      "Double Glazed Lux Window",
      "Classic French Window",
      "Compact Safety Window"
    ],
    material: "এলুমিনিয়াম + কাঠ কম্পোজিট",
    finish: "অ্যানোডাইজড ম্যাট",
    dimensions: ["180×140 সেমি", "120×120 সেমি", "140×130 সেমি", "100×95 সেমি", "160×130 সেমি", "150×145 সেমি", "90×90 সেমি"],
    color: "স্মোক গ্রে",
    weight: ["26 কেজি", "21 কেজি", "23 কেজি", "16 কেজি", "29 কেজি", "27 কেজি", "13 কেজি"],
    prices: [26800, 19500, 22400, 14900, 31500, 28200, 12800]
  },
  cat_005: {
    bn: [
      "নোয়ার থ্রি-সিটার সোফা",
      "অরোরা এল-শেপ সোফা",
      "সিগনেচার রিক্লাইনার সোফা",
      "কমফোর্ট টু-সিটার",
      "মখমলি চেস্টারফিল্ড",
      "স্টুডিও কমপ্যাক্ট সোফা",
      "রয়্যাল ফ্যামিলি সোফা সেট"
    ],
    en: [
      "Noir Three Seater Sofa",
      "Aurora L Shape Sofa",
      "Signature Recliner Sofa",
      "Comfort Two Seater",
      "Velvet Chesterfield",
      "Studio Compact Sofa",
      "Royal Family Sofa Set"
    ],
    material: "কিলন-ড্রাইড বিচ কাঠ + ফোম",
    finish: "প্রিমিয়াম ফেব্রিক",
    dimensions: ["220×95×88 সেমি", "280×170×90 সেমি", "210×98×95 সেমি", "160×90×85 সেমি", "230×95×82 সেমি", "150×85×80 সেমি", "310×180×92 সেমি"],
    color: "ডিপ চারকোল",
    weight: ["52 কেজি", "79 কেজি", "61 কেজি", "41 কেজি", "58 কেজি", "35 কেজি", "88 কেজি"],
    prices: [46800, 68500, 59200, 35800, 62500, 29900, 84500]
  },
  cat_006: {
    bn: [
      "রয়্যাল কিং সাইজ বেড",
      "স্টোরেজ কুইন বেড",
      "নর্ডিক প্ল্যাটফর্ম বেড",
      "স্লিম হেডবোর্ড বেড",
      "ফ্যামিলি মাস্টার বেড",
      "কিডস কমফোর্ট বেড",
      "হেরিটেজ পোস্টার বেড"
    ],
    en: [
      "Royal King Size Bed",
      "Storage Queen Bed",
      "Nordic Platform Bed",
      "Slim Headboard Bed",
      "Family Master Bed",
      "Kids Comfort Bed",
      "Heritage Poster Bed"
    ],
    material: "সলিড গামারি কাঠ",
    finish: "ওয়ালনাট ভিনিয়ার",
    dimensions: ["198×188×110 সেমি", "205×165×102 সেমি", "200×160×95 সেমি", "195×150×90 সেমি", "210×190×115 সেমি", "185×120×82 সেমি", "210×185×140 সেমি"],
    color: "ওয়ার্ম ব্রাউন",
    weight: ["72 কেজি", "64 কেজি", "56 কেজি", "49 কেজি", "79 কেজি", "42 কেজি", "85 কেজি"],
    prices: [78500, 62500, 54800, 43200, 89500, 28900, 96500]
  },
  cat_007: {
    bn: [
      "গ্র্যান্ড স্লাইডিং ওয়ার্ডরোব",
      "থ্রি-ডোর প্রিমিয়াম আলমারি",
      "মিরর ফিনিশ ওয়ার্ডরোব",
      "কমপ্যাক্ট স্টোরেজ ইউনিট",
      "ফ্যামিলি ড্রেসিং ওয়ার্ডরোব",
      "মডুলার ওপেন ওয়ার্ডরোব",
      "রয়্যাল খোদাই আলমারি"
    ],
    en: [
      "Grand Sliding Wardrobe",
      "Three Door Premium Wardrobe",
      "Mirror Finish Wardrobe",
      "Compact Storage Unit",
      "Family Dressing Wardrobe",
      "Modular Open Wardrobe",
      "Royal Carved Almirah"
    ],
    material: "মেলামাইন বোর্ড + সলিড ফ্রেম",
    finish: "সফট-ম্যাট ল্যাকার",
    dimensions: ["240×60×220 সেমি", "180×55×210 সেমি", "200×58×215 সেমি", "120×45×190 সেমি", "220×58×218 সেমি", "160×50×205 সেমি", "190×62×225 সেমি"],
    color: "ডার্ক অ্যাশ",
    weight: ["108 কেজি", "82 কেজি", "91 কেজি", "53 কেজি", "101 কেজি", "66 কেজি", "114 কেজি"],
    prices: [91500, 64800, 73200, 38900, 85800, 52200, 97500]
  },
  cat_008: {
    bn: [
      "ওয়াল-মাউন্ট বুক শেলফ",
      "প্রিমিয়াম ডিসপ্লে শেলফ",
      "কর্নার মাল্টি-লেয়ার শেলফ",
      "স্টুডিও ওপেন শেলভিং",
      "ডেকোর ভাস্কর্য শেলফ",
      "ফাইল অর্গানাইজার শেলফ",
      "রয়্যাল লাইব্রেরি শেলফ"
    ],
    en: [
      "Wall Mount Book Shelf",
      "Premium Display Shelf",
      "Corner Multi Layer Shelf",
      "Studio Open Shelving",
      "Decor Sculpture Shelf",
      "File Organizer Shelf",
      "Royal Library Shelf"
    ],
    material: "ইঞ্জিনিয়ার্ড উড",
    finish: "অয়েল-ম্যাট কোট",
    dimensions: ["120×25×80 সেমি", "90×35×180 সেমি", "55×55×170 সেমি", "110×30×165 সেমি", "70×30×145 সেমি", "85×30×120 সেমি", "140×35×210 সেমি"],
    color: "স্মোক ওয়ালনাট",
    weight: ["18 কেজি", "26 কেজি", "22 কেজি", "24 কেজি", "19 কেজি", "15 কেজি", "38 কেজি"],
    prices: [16500, 22800, 18900, 21400, 17400, 13200, 34900]
  }
};

const productDescriptions = [
  "সর্বোচ্চ মানের কাঠ ও দক্ষ কারিগরের হাতে তৈরি এই ডিজাইনটি আপনার ঘরে আনে আভিজাত্য ও দীর্ঘস্থায়ী ব্যবহার।",
  "আরাম, স্টাইল এবং টেকসই নির্মাণের সমন্বয়ে তৈরি প্রিমিয়াম কালেকশনের একটি অনন্য সংযোজন।",
  "নান্দনিক ফিনিশ ও শক্তিশালী কাঠামোর কারণে এটি আধুনিক ও ক্লাসিক দু ধরনের ইন্টেরিয়রের জন্য আদর্শ।",
  "প্রতিদিনের ব্যবহার ও প্রিমিয়াম লুক বজায় রাখার জন্য বিশেষভাবে পরিকল্পিত এই ডিজাইনটি কাস্টম অর্ডারেও পাওয়া যায়।",
  "ডিটেইলিং, ভারসাম্যপূর্ণ অনুপাত এবং আরামদায়ক ফর্ম ফ্যাক্টরের মাধ্যমে এটি আপনাকে দেয় দীর্ঘমেয়াদি মূল্য।",
  "স্টাইলিশ প্রোফাইল, স্মার্ট স্পেস ব্যবস্থাপনা এবং উন্নত ফিনিশিং এই পণ্যটিকে করে তুলেছে বেস্টসেলার।",
  "উচ্চ মানের উপাদান ও কারিগরি মান বজায় রেখে তৈরি এই পণ্যটি আপনার ঘরের সৌন্দর্য দ্বিগুণ করবে।"
];

const demoImagePool = [
  "/img/chair%2001.jpg",
  "/img/chair%2002.jpg",
  "/img/chair%2003.jpg",
  "/img/chair%2004.jpg",
  "/img/door%2001.jpg",
  "/img/door%2002.jpg",
  "/img/sofa%2001.jpg",
  "/img/sofa%2002.jpg",
  "/img/window%2001.jpg",
  "/img/window%2002.jpg",
  "/img/window%2003.jpg"
];

const categoryImagePool = {
  cat_001: ["/img/chair%2001.jpg", "/img/chair%2002.jpg", "/img/chair%2003.jpg", "/img/chair%2004.jpg"],
  cat_002: ["/img/sofa%2001.jpg", "/img/window%2001.jpg", "/img/door%2001.jpg"],
  cat_003: ["/img/door%2001.jpg", "/img/door%2002.jpg", "/img/window%2001.jpg"],
  cat_004: ["/img/window%2001.jpg", "/img/window%2002.jpg", "/img/window%2003.jpg"],
  cat_005: ["/img/sofa%2001.jpg", "/img/sofa%2002.jpg", "/img/chair%2004.jpg"],
  cat_006: ["/img/sofa%2001.jpg", "/img/chair%2001.jpg", "/img/window%2003.jpg"],
  cat_007: ["/img/door%2002.jpg", "/img/window%2002.jpg", "/img/chair%2002.jpg"],
  cat_008: ["/img/chair%2003.jpg", "/img/window%2001.jpg", "/img/door%2001.jpg"]
};

const products = [];
let serial = 1;

for (const categoryId of categories) {
  const profile = catalog[categoryId];

  for (let i = 0; i < 7; i += 1) {
    const id = `PRD-${String(serial).padStart(3, "0")}`;
    const name = profile.bn[i];
    const nameEn = profile.en[i];
    const price = profile.prices[i];
    const originalPrice = Math.round(price * (1.18 + (i % 3) * 0.05));
    const pool = categoryImagePool[categoryId] || demoImagePool;
    const mainImage = pool[i % pool.length];
    const galleryImages = [
      pool[(i + 1) % pool.length],
      pool[(i + 2) % pool.length],
      pool[(i + 3) % pool.length]
    ];

    products.push({
      id,
      name,
      nameEn,
      categoryId,
      price,
      originalPrice,
      image: mainImage,
      images: galleryImages,
      description: productDescriptions[i],
      material: profile.material,
      finish: profile.finish,
      dimensions: profile.dimensions[i],
      color: profile.color,
      weight: profile.weight[i],
      inStock: i !== 5,
      isFeatured: i < 2 || i === 6,
      isTopSelling: i === 0 || i === 1 || i === 4,
      isNew: i === 2 || i === 3,
      rating: Number((4.3 + (i % 4) * 0.15).toFixed(1)),
      reviewCount: 14 + i * 5 + (serial % 11),
      tags: [
        profile.en[i].split(" ")[0].toLowerCase(),
        "premium",
        "furniture",
        categoryId,
        "bangladesh"
      ]
    });

    serial += 1;
  }
}

module.exports = products;
