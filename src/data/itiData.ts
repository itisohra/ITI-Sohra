export interface Trade {
  id: string;
  name: string;
  shortCode: string;
  category: 'Engineering' | 'Non-Engineering';
  duration: string;
  durationYears: number;
  entryQualification: string;
  nsqfLevel: number;
  totalSeats: number;
  affiliatedTo: 'NCVT' | 'SCVT' | 'NCVT / SCVT';
  scheme: 'Craftsmen Training Scheme (CTS)';
  description: string;
  tagline: string;
  keySubjects: string[];
  workshopEquipment: string[];
  careerProspects: string[];
  curriculumOverview: string;
  color: string;
  icon: string;
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  category: 'Admissions' | 'Examinations' | 'Results' | 'General' | 'Tenders' | 'Office Order' | 'Recruitment';
  refNo: string;
  isNew: boolean;
  content: string;
  attachmentName?: string;
  fileSize?: string;
  fileDataUrl?: string;
  fileType?: string;
  isRealUpload?: boolean;
}

export interface StaffMember {
  id: string;
  name: string;
  designation: string;
  trade?: string;
  qualification: string;
  experience: string;
  role: 'Administration' | 'Instructional Staff' | 'Technical Staff';
  email?: string;
  bio: string;
}

export interface Facility {
  id: string;
  name: string;
  category: string;
  description: string;
  highlights: string[];
  capacity: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Campus' | 'Workshops' | 'Events' | 'Activities' | 'Other';
  tag: string;
  caption: string;
  imageUrl?: string;
  date?: string;
  isRealUpload?: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
  category: 'Admission' | 'Certification' | 'Fees' | 'Apprenticeship';
}

export const INSTITUTE_INFO = {
  name: "Government Industrial Training Institute Sohra",
  shortName: "Govt. ITI Sohra",
  khasiName: "Industrial Training Institute (ITI) Sohra, Meghalaya",
  state: "Meghalaya",
  department: "Directorate of Employment & Craftsmen Training (DECT)",
  ministry: "Department of Labour, Government of Meghalaya",
  nationalAffiliation: "Directorate General of Training (DGT), Ministry of Skill Development and Entrepreneurship (MSDE), Government of India",
  accreditation: "NCVT & SCVT Approved Training Partner",
  establishedYear: 2011,
  modernCampusYear: 2021,
  projectSponsors: "Supporting Human Capital Development in Meghalaya (Asian Development Bank - ADB) & ESDI (Enhancing Skill Development Infrastructure)",
  location: "7P6Q+5RJ, Saitsohpen, Sohra, Meghalaya 793108 (Near NIT Meghalaya Campus)",
  address: "7P6Q+5RJ, Saitsohpen, Sohra, Meghalaya 793108",
  plusCode: "7P6Q+5RJ",
  coordinates: "25°17'02\"N, 91°43'16\"E",
  coordinatesDecimal: { lat: 25.283889, lng: 91.721111 },
  district: "East Khasi Hills District",
  pinCode: "793108",
  stateCode: "Meghalaya, India",
  email: "itisohra@gmail.com",
  contactPhone: "7085397421 / 8974018223",
  workingHours: "10:00 AM to 5:00 PM (Monday to Friday, Closed on Weekends & Govt. Holidays)",
  dectPortalUrl: "https://idect.in",
  ncvtMisUrl: "https://ncvtmis.gov.in",
  apprenticeshipUrl: "https://www.apprenticeshipindia.gov.in",
  eDistrictUrl: "https://megedistrict.gov.in",
};

export const TRADES_LIST: Trade[] = [
  {
    id: "copa",
    name: "Computer Operator & Programming Assistant (COPA)",
    shortCode: "COPA",
    category: "Non-Engineering",
    duration: "1 Year",
    durationYears: 1,
    entryQualification: "Passed 10th Class (SSLC / Matriculation) examination or equivalent",
    nsqfLevel: 3,
    totalSeats: 24,
    affiliatedTo: "NCVT / SCVT",
    scheme: "Craftsmen Training Scheme (CTS)",
    description: "Equips students with comprehensive digital literacy, modern office automation, hardware maintenance, web application basics, Python programming, accounting software, and cybersecurity practices.",
    tagline: "Master modern computer skills, IT operations, and corporate software tools.",
    keySubjects: [
      "Computer Fundamentals & OS (Windows/Linux)",
      "Office Productivity (Word, Excel, PowerPoint, Access)",
      "Database Management & SQL Queries",
      "Python Scripting & Object-Oriented Basics",
      "HTML5, CSS3, JavaScript Web Development",
      "Accounting & Tally Prime Essentials",
      "Cyber Safety & Network Security"
    ],
    workshopEquipment: [
      "High-spec i5/i7 Desktop Computer Terminals",
      "Gigabit LAN & Fiber Broadband Network",
      "Interactive Smart Board & Audio-Visual Projector",
      "LaserJet & Multifunction Heavy-Duty Printers",
      "Hardware Dismantling & Assembly Workbench",
      "Licensed Productivity & Programming Suites"
    ],
    careerProspects: [
      "Data Entry Operator in Government & Private Offices",
      "Junior Programmer / Assistant Web Developer",
      "Computer Lab Assistant / System Support Executive",
      "E-Governance Kendra Operator in Meghalaya",
      "Self-employed DTP & IT Services Provider"
    ],
    curriculumOverview: "The COPA syllabus follows the DGT NSQF aligned model. Trainees spend 80% time on hands-on practical lab sessions building websites, handling spreadsheets, database queries, and hardware troubleshooting.",
    color: "from-blue-600 to-indigo-700",
    icon: "Monitor"
  },
  {
    id: "wireman",
    name: "Wireman (Electrical Trades)",
    shortCode: "WIREMAN",
    category: "Engineering",
    duration: "2 Years",
    durationYears: 2,
    entryQualification: "Passed 8th Class examination",
    nsqfLevel: 3,
    totalSeats: 20,
    affiliatedTo: "NCVT / SCVT",
    scheme: "Craftsmen Training Scheme (CTS)",
    description: "Professional training in domestic, commercial, and industrial electrical installation, conduit wiring, distribution boards, Earthing systems, transformer upkeep, and basic solar energy integration.",
    tagline: "Certified electrical installation, safety switchgears, and power distribution.",
    keySubjects: [
      "Trade Theory & Electrical Principles (AC/DC)",
      "Concealed & Casing Conduit Wiring Systems",
      "Earthing Methods (Pipe, Plate, Chemical)",
      "Single-Phase & 3-Phase Distribution Switchgear",
      "Motor Starter Connections (DOL, Star-Delta)",
      "Inverter & Battery Bank Installation",
      "Workshop Calculation, Science & Engineering Drawing"
    ],
    workshopEquipment: [
      "Wiring Simulation Cubicles & Test Benches",
      "Digital Multimeters, Meggers & Earth Testers",
      "AC/DC Motor Demonstration Setup",
      "Three-Phase Overhead Line Simulator",
      "Safety Harnesses, Insulated Tools & PPE Kits",
      "Conduit Bending & Pipe Threading Stations"
    ],
    careerProspects: [
      "Certified Wireman in MeECL (Meghalaya Energy Corp)",
      "Licensed Electrical Contractor Assistant",
      "Building Maintenance Electrician in Hotels & Resorts",
      "PWD / Public Health Engineering Electrician",
      "Independent Electrical Contracting Business"
    ],
    curriculumOverview: "Comprehensive 2-year journey imparting safe high-voltage and low-voltage practices, electrical wiring codes (IS standards), and practical diagnostic skills for residential and industrial complexes.",
    color: "from-amber-600 to-orange-700",
    icon: "Zap"
  },
  {
    id: "plumber",
    name: "Plumber",
    shortCode: "PLUMBER",
    category: "Engineering",
    duration: "1 Year",
    durationYears: 1,
    entryQualification: "Passed 8th Class examination",
    nsqfLevel: 3,
    totalSeats: 24,
    affiliatedTo: "NCVT / SCVT",
    scheme: "Craftsmen Training Scheme (CTS)",
    description: "Hands-on mastery of water supply distribution, pipe laying, PPR/CPVC fusion welding, sanitary fixtures, solar water heater installation, leak diagnosis, and modern drainage systems.",
    tagline: "Essential engineering skill for sustainable water infrastructure and sanitary systems.",
    keySubjects: [
      "Types of Pipes (GI, CI, PVC, CPVC, PPR)",
      "Pipe Bending, Threading, Jointing & Solvent Fusion",
      "Sanitary Fixtures (Washbasins, Cisterns, EWC/IWC)",
      "Rainwater Harvesting System Layout & Gravity Flow",
      "Water Pump Installation & Pressure Tank Testing",
      "Septic Tank, Soak Pit & Drainage Network Design",
      "Plumbing Drawings & Blueprint Reading"
    ],
    workshopEquipment: [
      "Pipe Threading Machine & Die Sets",
      "PPR Hot Melt Electro-Fusion Welder",
      "Pressure Hydrostatic Testing Pump",
      "Pipe Vices, Trenching & Cutting Equipment",
      "Full-scale Sanitary Display Bathroom Setup",
      "Water Tank Float & Submersible Pump Rig"
    ],
    careerProspects: [
      "PHE (Public Health Engineering) Dept. Technician",
      "Plumbing Maintenance in Tourism & Hospitality sector",
      "Municipal Corporation Water Board Technician",
      "Commercial Building Plumbing Supervisor",
      "Self-employed Plumbing Contractor"
    ],
    curriculumOverview: "Given Sohra's unique climate and rainwater management needs, our plumbing lab features dedicated practical modules on gravity water lines, rainwater catchment pipelines, and eco-friendly sanitary installations.",
    color: "from-cyan-600 to-blue-700",
    icon: "Droplets"
  },
  {
    id: "mason",
    name: "Mason (Building Constructor)",
    shortCode: "MASON",
    category: "Engineering",
    duration: "1 Year",
    durationYears: 1,
    entryQualification: "Passed 8th Class examination",
    nsqfLevel: 3,
    totalSeats: 24,
    affiliatedTo: "NCVT / SCVT",
    scheme: "Craftsmen Training Scheme (CTS)",
    description: "Trains craftsmen in modern masonry, brickwork bonds, reinforced concrete (RCC), stone masonry for hilly terrain, tile laying, plastering, waterproofing, and basic site surveying.",
    tagline: "Master civil construction, hillside foundations, and stone masonry.",
    keySubjects: [
      "Brick & Concrete Block Bonds (English, Flemish)",
      "Stone Masonry & Hillside Retaining Walls",
      "Shuttering, Formwork & RCC Beam/Slab Casting",
      "Wall Plastering, Pointing & Exterior Renderings",
      "Floor Tile, Mosaic & Granite Laying",
      "Waterproofing & Damp Proof Course (DPC)",
      "Simple Site Leveling & Theodolite/Level Reading"
    ],
    workshopEquipment: [
      "Concrete Mixer & Mortar Troughs",
      "Dumpy Level & Auto-Level Survey Sets",
      "Tile Cutter & Diamond Blade Saws",
      "Vibrating Tamping Tools for Concrete",
      "Masonry Trowels, Plumb Bobs & Spirit Levels",
      "Brick & Stone Testing Compression Rig"
    ],
    careerProspects: [
      "Construction Supervisor with PWD Meghalaya Contractors",
      "Masonry Specialist in Hill-Station Eco-Resorts",
      "Building Finishing & Tiling Specialist",
      "Disaster-Resilient Housing Artisan",
      "Independent Building Contractor"
    ],
    curriculumOverview: "Focuses on building durable, earthquake-resistant and moisture-resistant masonry structures adapted to Meghalaya's wet climate and undulating topography.",
    color: "from-emerald-600 to-teal-800",
    icon: "Layers"
  },
  {
    id: "catering",
    name: "Catering & Hospitality Assistant",
    shortCode: "HOSPITALITY",
    category: "Non-Engineering",
    duration: "1 Year",
    durationYears: 1,
    entryQualification: "Passed 10th Class (SSLC / Matriculation) examination",
    nsqfLevel: 4,
    totalSeats: 20,
    affiliatedTo: "NCVT / SCVT",
    scheme: "Craftsmen Training Scheme (CTS)",
    description: "Designed specifically to tap into Sohra's world-renowned tourism sector. Covers front office handling, commercial culinary arts, bakery, table service, eco-resort guest relations, and food hygiene.",
    tagline: "Lead hospitality, culinary arts, and guest experiences in the eco-tourism hub.",
    keySubjects: [
      "Food Production Principles & Commercial Cookery",
      "Indian, Continental & Regional Khasi Delicacies",
      "Bakery & Confectionery Essentials",
      "Food & Beverage Service Etiquette",
      "Front Office Management & Reservation Systems",
      "Housekeeping & Room Amenities Maintenance",
      "HACCP Food Safety & Hygiene Standards"
    ],
    workshopEquipment: [
      "Commercial Training Kitchen & Multi-Burner Ranges",
      "Convection Baking Ovens & Dough Mixers",
      "Mock Dining Room with Fine Cutlery & Table Settings",
      "Front Desk Reception Desk Simulation Station",
      "Refrigerated Cold Storage & Pantry Units",
      "Barista Coffee Machine & Beverage Service Carts"
    ],
    careerProspects: [
      "Commis Chef in Hotels & Fine Dining Restaurants",
      "Guest Service Associate in Cherrapunjee Resorts",
      "Food & Beverage Steward on Cruise/Aviation/Rail",
      "Homestay & Eco-Tourism Entrepreneur",
      "Institutional Catering Supervisor"
    ],
    curriculumOverview: "Trainees benefit from live practical shifts in institutional catering and field internships in prominent hotels and resorts across Sohra, Dawki, and Shillong.",
    color: "from-purple-600 to-pink-700",
    icon: "UtensilsCrossed"
  }
];

export const NOTICES_LIST: Notice[] = [];

export const STAFF_MEMBERS: StaffMember[] = [
  {
    id: "staff-01",
    name: "Shri. P. Lyngdoh",
    designation: "Vice-Principal / Superintendent i/c",
    qualification: "B.Tech (Electrical Engg.), M.Tech, NCVT Certified",
    experience: "16+ Years in Technical Education & Administration",
    role: "Administration",
    email: "superintendent.itisohra@gmail.com",
    bio: "Guiding ITI Sohra towards excellence in technical vocational training, industry partnerships, and human capital development in the Khasi Hills."
  },
  {
    id: "staff-02",
    name: "Smti. E. Nongrum",
    designation: "Senior Instructor - COPA",
    trade: "Computer Operator & Programming Assistant",
    qualification: "MCA, B.Sc (Computer Science), CITS Certified",
    experience: "11+ Years teaching IT & Programming",
    role: "Instructional Staff",
    email: "copa.itisohra@gmail.com",
    bio: "Passionate about bridging digital skills, office automation, web design, and computational thinking for rural and suburban youth."
  },
  {
    id: "staff-03",
    name: "Shri. B. Kharbuki",
    designation: "Trade Instructor - Wireman",
    trade: "Wireman / Electrical",
    qualification: "Diploma in Electrical Engg., NTC & CITS Certified",
    experience: "14+ Years in Electrical Systems & Wiring Safety",
    role: "Instructional Staff",
    email: "wireman.itisohra@gmail.com",
    bio: "Expertise in commercial wiring, MeECL line procedures, solar off-grid systems, and workshop safety standards."
  },
  {
    id: "staff-04",
    name: "Shri. M. Syiemlieh",
    designation: "Trade Instructor - Plumber",
    trade: "Plumber",
    qualification: "NTC Plumber, CITS Certified, Advanced Piping Diploma",
    experience: "9+ Years in Water Supply Engineering",
    role: "Instructional Staff",
    email: "plumber.itisohra@gmail.com",
    bio: "Specialist in high-pressure plumbing, PPR pipe fusion, and rainwater harvesting infrastructure tailored to Sohra."
  },
  {
    id: "staff-05",
    name: "Shri. D. Marbaniang",
    designation: "Trade Instructor - Mason",
    trade: "Mason (Building Constructor)",
    qualification: "Diploma in Civil Engg., CITS Certified",
    experience: "12+ Years in Hillside Construction & Masonry",
    role: "Instructional Staff",
    email: "mason.itisohra@gmail.com",
    bio: "Specialist in durable stone masonry, seismic-resilient RCC construction, and traditional Meghalaya mountain architecture."
  },
  {
    id: "staff-06",
    name: "Smti. K. Mawlong",
    designation: "Trade Instructor - Catering & Hospitality",
    trade: "Catering & Hospitality Assistant",
    qualification: "Degree in Hotel Management & Catering Tech (BHMCT)",
    experience: "8+ Years in Luxury Eco-Resorts & Culinary Arts",
    role: "Instructional Staff",
    email: "hospitality.itisohra@gmail.com",
    bio: "Training candidates to become top-tier hospitality managers, pastry chefs, and tour facilitators in the Meghalaya travel sector."
  },
  {
    id: "staff-07",
    name: "Shri. R. Khongwir",
    designation: "Workshop Attendant & Lab Assistant",
    qualification: "NTC Certified, First Aid Certified",
    experience: "7+ Years in Tool Maintenance & Inventory",
    role: "Technical Staff",
    bio: "Oversees lab machine maintenance, tool calibration, student PPE issuance, and workshop emergency preparedness."
  },
  {
    id: "staff-08",
    name: "Smti. B. Diengdoh",
    designation: "Head Assistant & Accounts In-Charge",
    qualification: "M.Com, PGDCA",
    experience: "10+ Years in Meghalaya State Educational Administration",
    role: "Administration",
    bio: "Manages student admissions verification, stipend disbursals, state scholarship portals, and RTI inquiries."
  }
];

export const FACILITIES_LIST: Facility[] = [
  {
    id: "comp-lab",
    name: "Advanced IT & Computer Center",
    category: "Information Technology",
    description: "An air-conditioned laboratory housing 30+ interconnected high-performance desktop systems with high-speed leased line internet, smart interactive projector, and licensed industry software.",
    highlights: ["Individual workstation for each trainee", "Dedicated Python & Web development environment", "Tally Prime & Office 365 setups", "Uninterrupted online UPS power backup"],
    capacity: "35 Students simultaneous seating"
  },
  {
    id: "electrical-bay",
    name: "Electrical & Wireman Workshop",
    category: "Engineering Trade Bay",
    description: "Spacious workshop equipped with specialized cubicles for domestic concealed wiring, 3-phase industrial switchgear simulators, winding equipment, and digital insulation testers.",
    highlights: ["Individual wiring cubicles with circuit breakers", "AC/DC motor testing bench", "Earth resistance testing ground pit", "Safety mats and high-voltage isolation gear"],
    capacity: "25 Trainees per practical session"
  },
  {
    id: "plumbing-yard",
    name: "Piping & Sanitary Practical Yard",
    category: "Civil & Mechanical Bay",
    description: "Equipped for cutting, reaming, threading of steel pipes, thermo-fusion of PPR/CPVC lines, and a full-scale simulated bathroom display with modern sanitary fixtures.",
    highlights: ["Pipe threading machinery & motorized cutters", "Rainwater catchment simulation tank", "Hydrostatic pressure testing apparatus", "Underground drainage layout pit"],
    capacity: "20 Trainees per session"
  },
  {
    id: "masonry-yard",
    name: "Civil & Masonry Construction Bay",
    category: "Civil Construction",
    description: "Dedicated practical yard for stone dressing, bricklaying bonds, plastering practice, tile setting, and hillside retaining wall demonstration.",
    highlights: ["Brick & stone masonry demonstration bays", "Auto-level & theodolite survey stations", "Tile laying and plastering mock walls", "Mortar & concrete mixing platform"],
    capacity: "20 Trainees per session"
  },
  {
    id: "hospitality-lab",
    name: "Training Kitchen & Hospitality Suite",
    category: "Services & Hospitality",
    description: "A commercial-grade training kitchen with stainless steel multi-burner stoves, convection baking ovens, cutlery, dining etiquette setups, and mock front-office reception counter.",
    highlights: ["Commercial gas manifold system", "Bakery and pastry section", "Mock restaurant service dining area", "Front office software practice terminal"],
    capacity: "25 Trainees"
  }
];

export const FEE_STRUCTURE = [
  { item: "Admission / Registration Fee", amount: "₹ 500 (One Time)", remark: "Nominal Government fee" },
  { item: "Workshop Caution Deposit", amount: "₹ 1,000 (One Time)", remark: "100% Refundable upon course completion" },
  { item: "AITT Final Examination Fee", amount: "As per DGT Norms", remark: "Paid directly via DGT/NCVT CBT Exam portal" }
];

export const ADMISSION_STEPS = [
  {
    step: 1,
    title: "Check Trade Eligibility",
    description: "Review age (minimum 14 years, no upper age limit) and educational qualifications (Class 8th or Class 10th pass) for your desired trade."
  },
  {
    step: 2,
    title: "Submit Online or Offline Application",
    description: "Apply online at dectmeg.nic.in / megedistrict.gov.in or obtain and submit the physical admission form directly at ITI Sohra Campus, Saitsohpen."
  },
  {
    step: 3,
    title: "Document Verification",
    description: "Submit original certificates (Mark sheets, ST/SC Caste certificate, Permanent Residential Certificate - PRC, Epic/Aadhaar card, 4 passport photos)."
  },
  {
    step: 4,
    title: "Merit List Declaration & Counseling",
    description: "Merit lists are prepared based on marks scored in qualifying exams. Shortlisted candidates attend seat allotment counseling at the institute."
  },
  {
    step: 5,
    title: "Admission Confirmation & Fee Payment",
    description: "Pay the nominal government fee, collect your trainee admission receipt, uniform guidelines, and academic calendar."
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [];

export const FAQS: FAQ[] = [
  {
    category: "Admission",
    question: "What is the minimum age to apply for courses at ITI Sohra?",
    answer: "The candidate must have completed at least 14 years of age as on the 1st of August of the admission year. There is no upper age limit for applying to Craftsmen Training Scheme (CTS) courses."
  },
  {
    category: "Admission",
    question: "Can Class 8 pass students apply to ITI Sohra?",
    answer: "Yes! Several trades including Wireman (2-Year), Plumber (1-Year), and Mason (1-Year) accept candidates with minimum Class 8 pass qualification."
  },
  {
    category: "Certification",
    question: "What certificate is awarded after course completion?",
    answer: "Successful trainees who clear the All India Trade Test (AITT) conducted by the Directorate General of Training (DGT), Ministry of Skill Development & Entrepreneurship, Govt. of India, receive the National Trade Certificate (NTC) or State Trade Certificate (STC), which is recognized worldwide."
  },
  {
    category: "Fees",
    question: "Are there scholarships or stipends available for trainees?",
    answer: "Yes, eligible Scheduled Tribe (ST) and Scheduled Caste (SC) trainees from Meghalaya are entitled to state post-matric scholarships and monthly vocational training stipends under the Directorate of Employment & Craftsmen Training (DECT) schemes."
  },
  {
    category: "Apprenticeship",
    question: "Does ITI Sohra assist with apprenticeship and jobs?",
    answer: "Yes, our active Training & Placement Cell assists all pass-out trainees in registering on the National Apprenticeship Promotion Scheme (NAPS) portal (apprenticeshipindia.gov.in) and connects them with government bodies (MeECL, PWD, PHE) and private industrial units."
  }
];
