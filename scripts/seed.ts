/**
 * ScholarTrack — Seed script
 * Populates the database with real, well-known scholarships for African students,
 * plus a curated resources library.
 *
 * Run with: bun run scripts/seed.ts
 */
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

type ScholarshipSeed = {
  slug: string
  title: string
  provider: string
  providerLogo?: string
  description: string
  eligibility: string
  benefits: string
  applicationUrl: string
  officialUrl?: string
  level: string
  fundedBy?: string
  hostCountries: string
  eligibleCountries?: string
  fieldsOfStudy: string
  fundingType: string
  coverage?: string
  amount?: number
  duration?: string
  deadline?: string
  deadlineType?: string
  competitiveness?: string
  tags?: string
  featured?: boolean
}

const scholarships: ScholarshipSeed[] = [
  {
    slug: 'mastercard-foundation-scholars',
    title: 'Mastercard Foundation Scholars Program',
    provider: 'Mastercard Foundation',
    description:
      'The Mastercard Foundation Scholars Program is a $500 million initiative developing the next generation of African leaders. It provides academically talented yet economically disadvantaged young people from Africa with comprehensive support to pursue secondary and tertiary education. Scholars receive holistic support including leadership development, mentoring, and transition-to-work opportunities. The program partners with 30+ universities and NGOs worldwide and has supported over 45,000 young people since 2012.',
    eligibility:
      'Academically talented young people from Sub-Saharan Africa. Demonstrated financial need (without support, would not be able to access education). Track record of leadership and giving back to community. Age typically 16-29 depending on partner. Each partner university sets its own academic thresholds (usually top 10% of class). Strong English or French proficiency required.',
    benefits:
      'Full tuition coverage, accommodation, books and materials, monthly stipend, transport to and from host country, health insurance, leadership development training, mentoring, internship and career placement support, alumni network access, and transition-to-work funding.',
    applicationUrl: 'https://mastercardfdn.org/all/scholars/',
    officialUrl: 'https://mastercardfdn.org/all/scholars/',
    level: 'any',
    fundedBy: 'Canada',
    hostCountries: JSON.stringify(['USA', 'UK', 'Canada', 'France', 'South Africa', 'Kenya', 'Rwanda', 'Ghana', 'Uganda', 'Ethiopia']),
    eligibleCountries: JSON.stringify(['Sub-Saharan Africa']),
    fieldsOfStudy: JSON.stringify(['Any']),
    fundingType: 'full',
    coverage: JSON.stringify(['tuition', 'living', 'flights', 'insurance', 'books', 'stipend']),
    amount: 80000,
    duration: 'Full program (1-4 years)',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90).toISOString(),
    deadlineType: 'varies',
    competitiveness: 'very_high',
    tags: JSON.stringify(['leadership', 'africa-focused', 'need-based', 'full-ride']),
    featured: true,
  },
  {
    slug: 'chevening-scholarship',
    title: 'Chevening Scholarships (UK)',
    provider: 'UK Foreign, Commonwealth & Development Office',
    description:
      "Chevening is the UK government's international awards scheme aimed at developing global leaders. Funded by the FCDO and partner organizations, it offers outstanding emerging leaders from around the world the opportunity to undertake a one-year master's degree at any UK university. Chevening Scholars become part of a 55,000+ strong global alumni network including presidents, prime ministers, and CEOs. The program emphasizes leadership potential, networking, and returning home to contribute to your country's development.",
    eligibility:
      "Citizen of an eligible Chevening country (all African countries eligible). Hold an undergraduate degree equivalent to UK upper second-class (2:1). At least two years (2,800 hours) of work experience. Apply to three eligible UK university courses, receive at least one unconditional offer by mid-July. Not have previously studied in the UK on a UK government-funded scholarship. Commit to return home for at least two years after the scholarship.",
    benefits:
      "Full tuition fees, monthly living stipend, return economy flights to the UK, arrival allowance, departure allowance, excess baggage allowance, travel grant for academic events, dissertation grant, full access to Chevening network and events.",
    applicationUrl: 'https://www.chevening.org/scholarship/',
    officialUrl: 'https://www.chevening.org/',
    level: 'masters',
    fundedBy: 'UK',
    hostCountries: JSON.stringify(['UK']),
    eligibleCountries: JSON.stringify(['worldwide']),
    fieldsOfStudy: JSON.stringify(['Any']),
    fundingType: 'full',
    coverage: JSON.stringify(['tuition', 'living', 'flights', 'insurance', 'stipend']),
    amount: 60000,
    duration: "1 year (master's)",
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60).toISOString(),
    deadlineType: 'fixed',
    competitiveness: 'very_high',
    tags: JSON.stringify(['leadership', 'masters', 'UK', 'government', 'full-ride']),
    featured: true,
  },
  {
    slug: 'daad-epos-postgraduate',
    title: 'DAAD EPOS Development-Related Postgraduate Courses',
    provider: 'Deutscher Akademischer Austauschdienst (DAAD)',
    description:
      "The DAAD EPOS program offers scholarships for developing countries' professionals to pursue postgraduate degrees in development-related fields at German universities. The program targets individuals who already hold a bachelor's degree, have at least two years of work experience, and aim to contribute to their home country's development after graduation. Germany is one of the most popular destinations for African students due to low/zero tuition at public universities and strong engineering, public health, and sustainability programs.",
    eligibility:
      "Bachelor's degree (usually 4-year or 6-semester equivalent). At least 2 years of relevant work experience. Proficiency in English (IELTS 6.0+ or TOEFL 80+); German for German-taught programs. Citizens of eligible developing countries (most African countries qualify). Demonstrated motivation to contribute to home country development post-graduation.",
    benefits:
      "Monthly stipend of EUR 934 (master's) or EUR 1,300 (PhD), travel allowance, health insurance, personal/liability insurance, rent subsidy, family allowance (if applicable), pre-departure German language course, study and research allowance.",
    applicationUrl: 'https://www.daad.de/en/study-and-research-in-germany/scholarships/epos/',
    officialUrl: 'https://www.daad.de/',
    level: 'masters',
    fundedBy: 'Germany',
    hostCountries: JSON.stringify(['Germany']),
    eligibleCountries: JSON.stringify(['developing countries']),
    fieldsOfStudy: JSON.stringify(['Engineering', 'Public Health', 'Agriculture', 'Environmental Science', 'Economics', 'Governance', 'Education']),
    fundingType: 'full',
    coverage: JSON.stringify(['tuition', 'living', 'flights', 'insurance', 'stipend']),
    amount: 18000,
    duration: '12-24 months',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 120).toISOString(),
    deadlineType: 'varies',
    competitiveness: 'high',
    tags: JSON.stringify(['Germany', 'development', 'postgraduate', 'stipend']),
    featured: true,
  },
  {
    slug: 'fulbright-foreign-student',
    title: 'Fulbright Foreign Student Program (USA)',
    provider: 'U.S. Department of State',
    description:
      "The Fulbright Foreign Student Program enables graduate students, young professionals, and artists from abroad to study and conduct research in the United States. Operating in 155 countries, it is one of the most prestigious academic exchange programs in the world. For African students, Fulbright offers fully-funded master's and PhD study at top U.S. institutions, with a strong emphasis on cross-cultural exchange and returning home to strengthen bilateral relationships.",
    eligibility:
      "Bachelor's degree equivalent. Strong academic record. English proficiency (TOEFL 80+ or IELTS 6.5+). Two letters of recommendation. Personal statement and study objectives. Citizens of eligible African countries (most qualify). For PhD, must have completed or be near completion of master's degree.",
    benefits:
      'Tuition coverage, living stipend, round-trip airfare, health and accident insurance, book and supplies allowance, pre-academic English language training if needed, J-1 visa sponsorship, enrichment activities and conferences.',
    applicationUrl: 'https://foreign.fulbrightonline.org/about/foreign-fulbright',
    officialUrl: 'https://foreign.fulbrightonline.org/',
    level: 'masters',
    fundedBy: 'USA',
    hostCountries: JSON.stringify(['USA']),
    eligibleCountries: JSON.stringify(['worldwide']),
    fieldsOfStudy: JSON.stringify(['Any']),
    fundingType: 'full',
    coverage: JSON.stringify(['tuition', 'living', 'flights', 'insurance', 'books']),
    amount: 50000,
    duration: "1-2 years (master's), up to 5 years (PhD)",
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 75).toISOString(),
    deadlineType: 'varies',
    competitiveness: 'very_high',
    tags: JSON.stringify(['USA', 'government', 'prestigious', 'exchange']),
    featured: true,
  },
  {
    slug: 'mandela-washington-fellowship',
    title: 'Mandela Washington Fellowship for Young African Leaders',
    provider: 'U.S. Department of State',
    description:
      "The Mandela Washington Fellowship is the flagship program of the Young African Leaders Initiative (YALI), started by President Obama in 2014. Each year, 700 African leaders between 25-35 spend six weeks at U.S. universities and colleges, focusing on business, civic engagement, or public management. The fellowship includes leadership institutes, a Summit in Washington DC, and opportunities for continued engagement in Africa. While not a degree program, it is one of the most prestigious and transformational leadership experiences for young African professionals.",
    eligibility:
      'Age 25-35 at application. Citizen of Sub-Saharan Africa. English proficiency. Not a U.S. citizen or permanent resident. Qualify for J-1 visa. Demonstrated leadership in business, civic engagement, or public management. Commitment to return to Africa and apply leadership skills.',
    benefits:
      'Six-week leadership institute at a U.S. university, round-trip airfare to US and within US, domestic US travel, accommodation and meals, leadership programming, networking with US leaders, alumni network access, optional professional development (PDE) in US after fellowship.',
    applicationUrl: 'https://mwfellowship.org/',
    officialUrl: 'https://www.yali.state.gov/mwf/',
    level: 'any',
    fundedBy: 'USA',
    hostCountries: JSON.stringify(['USA']),
    eligibleCountries: JSON.stringify(['Sub-Saharan Africa']),
    fieldsOfStudy: JSON.stringify(['Business', 'Civic Engagement', 'Public Management']),
    fundingType: 'full',
    coverage: JSON.stringify(['flights', 'living', 'insurance']),
    amount: 15000,
    duration: '6 weeks',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 45).toISOString(),
    deadlineType: 'fixed',
    competitiveness: 'very_high',
    tags: JSON.stringify(['leadership', 'short-term', 'USA', 'young-professionals']),
    featured: true,
  },
  {
    slug: 'rhodes-scholarship-global',
    title: 'Rhodes Scholarship (Oxford University)',
    provider: 'Rhodes Trust',
    description:
      "The Rhodes Scholarship is the oldest (founded 1903) and arguably most prestigious international scholarship in the world. It funds outstanding students from around the world to pursue full-time postgraduate study at the University of Oxford. Rhodes Scholars are selected based on academic excellence, energy to use talents to full advantage, truth, courage, devotion to duty, sympathy for and protection of the weak, kindliness, unselfishness, fellowship, moral force of character, and instincts to lead. The scholarship covers full Oxford costs and provides a substantial stipend.",
    eligibility:
      "Age 18-24 (most constituencies) or up to 27 for some African constituencies. Strong undergraduate academic record (typically first-class). Demonstrated leadership and service. English proficiency. Each constituency (Global, East Africa, Southern Africa, West Africa, etc.) has its own eligibility rules.",
    benefits:
      'Full Oxford tuition, GBP 18,180 annual stipend, application fee, two economy class flights, settling-in allowance, Rhodes House access, leadership development programs, lifelong alumni network (over 8,000 scholars since 1903).',
    applicationUrl: 'https://www.rhodeshouse.ox.ac.uk/scholarships/application/',
    officialUrl: 'https://www.rhodeshouse.ox.ac.uk/',
    level: 'masters',
    fundedBy: 'UK',
    hostCountries: JSON.stringify(['UK']),
    eligibleCountries: JSON.stringify(['worldwide']),
    fieldsOfStudy: JSON.stringify(['Any']),
    fundingType: 'full',
    coverage: JSON.stringify(['tuition', 'living', 'flights', 'insurance', 'stipend']),
    amount: 80000,
    duration: '2-3 years (full Oxford course)',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
    deadlineType: 'fixed',
    competitiveness: 'very_high',
    tags: JSON.stringify(['Oxford', 'prestigious', 'leadership', 'full-ride']),
    featured: true,
  },
  {
    slug: 'schwarzman-scholars',
    title: 'Schwarzman Scholars (Tsinghua University)',
    provider: 'Schwarzman Scholars',
    description:
      "Schwarzman Scholars is a highly selective one-year master's program at Tsinghua University in Beijing, designed to prepare the next generation of global leaders. Modeled on the Rhodes Scholarship, it brings together 200 scholars annually from around the world — including a strong African cohort — to study global affairs, leadership, and China. The program includes a fully-funded year in Beijing, a Master of Global Affairs degree, internships, and deep immersion in Chinese culture and policy.",
    eligibility:
      "Undergraduate degree (or first degree) completed by August 1 of enrollment year. Age 18-28. Strong academic record. Demonstrated leadership potential. English proficiency (all instruction in English). No Chinese language requirement. Citizens of any country including mainland China.",
    benefits:
      'Full tuition, room and board at Schwarzman College, travel to and from Beijing, in-country study tours, required course books and supplies, health insurance, personal stipend (~$4,000), laptop and smartphone, access to internships and mentor network.',
    applicationUrl: 'https://www.schwarzmanscholars.org/admissions/',
    officialUrl: 'https://www.schwarzmanscholars.org/',
    level: 'masters',
    fundedBy: 'China',
    hostCountries: JSON.stringify(['China']),
    eligibleCountries: JSON.stringify(['worldwide']),
    fieldsOfStudy: JSON.stringify(['Global Affairs', 'Leadership', 'Public Policy', 'Economics', 'International Relations']),
    fundingType: 'full',
    coverage: JSON.stringify(['tuition', 'living', 'flights', 'insurance', 'books', 'stipend']),
    amount: 70000,
    duration: "1 year (master's)",
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 50).toISOString(),
    deadlineType: 'fixed',
    competitiveness: 'very_high',
    tags: JSON.stringify(['China', 'leadership', 'masters', 'prestigious']),
    featured: true,
  },
  {
    slug: 'knight-hennessy-scholars',
    title: 'Knight-Hennessy Scholars (Stanford)',
    provider: 'Stanford University',
    description:
      "Knight-Hennessy Scholars is Stanford's premier graduate fellowship program, funding 100 scholars per year from around the world to pursue any full-time graduate degree at Stanford. Scholars receive funding for up to three years and join the King Global Leadership Program — a curated set of experiences including lectures, workshops, and global study trips. The program aims to develop a multidisciplinary community of Stanford graduate students dedicated to finding creative solutions to the world's most significant challenges.",
    eligibility:
      "Bachelor's degree received in 2017 or later (within 7 years of applying). Apply separately to a full-time Stanford graduate program. English proficiency. Demonstrated leadership, civic commitment, and academic excellence. Citizens of any country.",
    benefits:
      'Full tuition, living and academic stipend, travel allowance for annual trip home, mentorship from Stanford faculty and external leaders, leadership programming, custom study trips, access to Knight-Hennessy community for life.',
    applicationUrl: 'https://knight-hennessy.stanford.edu/admissions',
    officialUrl: 'https://knight-hennessy.stanford.edu/',
    level: 'any',
    fundedBy: 'USA',
    hostCountries: JSON.stringify(['USA']),
    eligibleCountries: JSON.stringify(['worldwide']),
    fieldsOfStudy: JSON.stringify(['Any']),
    fundingType: 'full',
    coverage: JSON.stringify(['tuition', 'living', 'flights', 'stipend']),
    amount: 100000,
    duration: 'Up to 3 years',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 65).toISOString(),
    deadlineType: 'fixed',
    competitiveness: 'very_high',
    tags: JSON.stringify(['Stanford', 'prestigious', 'graduate', 'leadership']),
    featured: true,
  },
  {
    slug: 'gates-cambridge',
    title: 'Gates Cambridge Scholarship',
    provider: 'Gates Cambridge Trust',
    description:
      "The Gates Cambridge Scholarship program, funded by a $210 million donation from the Bill and Melinda Gates Foundation, supports outstanding applicants from outside the UK to pursue full-time postgraduate study at the University of Cambridge. Around 80 scholarships are awarded each year — approximately 25 in the US and 55 internationally — covering the full cost of studying at Cambridge. Scholars are selected on intellectual ability, leadership capacity, commitment to improving the lives of others, and academic fit with Cambridge.",
    eligibility:
      "Citizen of any country outside the UK. Apply to a full-time residential course of study at Cambridge (PhD, MSc, MPhil, MBA, etc.). Strong academic record. Demonstrated leadership and commitment to improving others' lives. English proficiency per Cambridge requirements.",
    benefits:
      'Full cost of studying at Cambridge: tuition, maintenance allowance (GBP 20,000 for 12 months), discretionary academic development fund, family allowance, fieldwork allowance, hardship funds, travel allowance.',
    applicationUrl: 'https://www.gatescambridge.org/apply/',
    officialUrl: 'https://www.gatescambridge.org/',
    level: 'any',
    fundedBy: 'UK',
    hostCountries: JSON.stringify(['UK']),
    eligibleCountries: JSON.stringify(['worldwide except UK']),
    fieldsOfStudy: JSON.stringify(['Any']),
    fundingType: 'full',
    coverage: JSON.stringify(['tuition', 'living', 'flights', 'stipend']),
    amount: 70000,
    duration: '1-4 years depending on course',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 25).toISOString(),
    deadlineType: 'fixed',
    competitiveness: 'very_high',
    tags: JSON.stringify(['Cambridge', 'prestigious', 'graduate', 'leadership']),
    featured: true,
  },
  {
    slug: 'clarendon-fund-oxford',
    title: 'Clarendon Fund Scholarships (Oxford)',
    provider: 'University of Oxford',
    description:
      "The Clarendon Fund is one of Oxford's largest scholarship schemes, offering around 140 new fully-funded scholarships each year to outstanding graduate applicants from any country. Clarendon Scholars are selected for their academic excellence and potential across all subject areas. The scholarship covers full tuition and college fees and provides a generous grant for living expenses. All applicants who apply by the December deadline are automatically considered — no separate application is needed.",
    eligibility:
      "All applicants for graduate study at Oxford who apply by the relevant December deadline are automatically considered. Strong academic record (typically first-class). Demonstrated research potential. English proficiency per Oxford requirements. Any country of origin.",
    benefits:
      'Full tuition and college fees, annual stipend for living expenses (minimum GBP 18,000), access to Clarendon Scholars community and events, alumni network.',
    applicationUrl: 'https://www.ox.ac.uk/clarendon',
    officialUrl: 'https://www.ox.ac.uk/clarendon',
    level: 'any',
    fundedBy: 'UK',
    hostCountries: JSON.stringify(['UK']),
    eligibleCountries: JSON.stringify(['worldwide']),
    fieldsOfStudy: JSON.stringify(['Any']),
    fundingType: 'full',
    coverage: JSON.stringify(['tuition', 'living', 'stipend']),
    amount: 60000,
    duration: '1-4 years depending on course',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 20).toISOString(),
    deadlineType: 'fixed',
    competitiveness: 'very_high',
    tags: JSON.stringify(['Oxford', 'graduate', 'merit-based']),
    featured: false,
  },
  {
    slug: 'australia-awards-africa',
    title: 'Australia Awards Africa',
    provider: 'Australian Government',
    description:
      "Australia Awards Africa is the Australian Government's flagship scholarship program for Africa, providing postgraduate opportunities to Africans in eligible countries. The program focuses on areas aligned with Australia's development priorities in Africa: agriculture, extractives, public policy, and health. Scholars study at Australian universities and are expected to return home after graduation to contribute to their countries' development.",
    eligibility:
      "Citizen of an eligible African country (varies by year). Minimum 5 years of relevant post-graduate work experience. Bachelor's degree with strong academic record. English proficiency (IELTS 6.5+ overall, no band below 6.0). Commitment to return home for at least 2 years after graduation. Apply for master's level courses in priority sectors.",
    benefits:
      'Full tuition, return air travel, establishment allowance, contribution to living expenses (CLE), Overseas Student Health Cover, Introductory Academic Program, supplementary academic support, fieldwork and reunion travel for eligible scholars.',
    applicationUrl: 'https://www.australiaawardsafrica.org/',
    officialUrl: 'https://www.australiaawardsafrica.org/',
    level: 'masters',
    fundedBy: 'Australia',
    hostCountries: JSON.stringify(['Australia']),
    eligibleCountries: JSON.stringify(['eligible African countries']),
    fieldsOfStudy: JSON.stringify(['Agriculture', 'Extractives', 'Public Policy', 'Health', 'Education']),
    fundingType: 'full',
    coverage: JSON.stringify(['tuition', 'living', 'flights', 'insurance', 'stipend']),
    amount: 80000,
    duration: "2 years (master's)",
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 100).toISOString(),
    deadlineType: 'fixed',
    competitiveness: 'high',
    tags: JSON.stringify(['Australia', 'government', 'masters', 'development']),
    featured: false,
  },
  {
    slug: 'csc-china-government-scholarship',
    title: 'Chinese Government Scholarship (CSC)',
    provider: 'China Scholarship Council',
    description:
      "The Chinese Government Scholarship is one of the largest fully-funded scholarship programs in the world, supporting tens of thousands of international students annually to study at Chinese universities. Programs are available at undergraduate, master's, and PhD levels across all disciplines. CSC scholarships include full tuition, accommodation, monthly stipend, and medical insurance. Many African students choose China for STEM, medicine, and Chinese language programs.",
    eligibility:
      "Citizen of a country with diplomatic relations with China. Age limits: undergraduate 25, master's 35, PhD 40. Strong academic record. HSK certificate for Chinese-taught programs; English proficiency (IELTS 6.0+/TOEFL 80+) for English-taught programs. Good health. Applicants apply via Chinese embassies, designated universities, or CSC online portal.",
    benefits:
      "Full tuition waiver, free on-campus accommodation, monthly stipend (CNY 2,500 undergrad, 3,000 master's, 3,500 PhD), comprehensive medical insurance, predefined intercity travel subsidy once per year.",
    applicationUrl: 'https://studyinchina.csc.edu.cn/',
    officialUrl: 'http://www.campuschina.org/',
    level: 'any',
    fundedBy: 'China',
    hostCountries: JSON.stringify(['China']),
    eligibleCountries: JSON.stringify(['worldwide']),
    fieldsOfStudy: JSON.stringify(['Any']),
    fundingType: 'full',
    coverage: JSON.stringify(['tuition', 'living', 'insurance', 'stipend']),
    amount: 15000,
    duration: "4-5 years undergrad, 2-3 years master's, 3-4 years PhD",
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 80).toISOString(),
    deadlineType: 'fixed',
    competitiveness: 'medium',
    tags: JSON.stringify(['China', 'government', 'large-cohort', 'any-level']),
    featured: false,
  },
  {
    slug: 'stipendium-hungaricum',
    title: 'Stipendium Hungaricum (Hungary)',
    provider: 'Hungarian Government',
    description:
      "The Stipendium Hungaricum program is Hungary's flagship international scholarship scheme, offering thousands of fully-funded scholarships each year to international students. Hungary has bilateral agreements with 80+ countries (most African countries are partners). The program offers bachelor's, master's, and PhD programs across all disciplines in Hungarian or English. It is increasingly popular with African students due to its accessibility and Hungary's central European location.",
    eligibility:
      "Citizen of an eligible partner country (most African countries qualify). Strong academic record. Age 25 max for bachelor's, 35 for master's, 45 for PhD. English or Hungarian language proficiency per program requirements. Application through both the Hungarian online portal and home country's designated authority.",
    benefits:
      'Tuition-free education, monthly stipend (HUF 40,000 for bachelor/master, 140,000 for PhD), accommodation allowance or free dormitory place, medical insurance, small "settlement allowance" on arrival.',
    applicationUrl: 'https://stipendiumhungaricum.hu/',
    officialUrl: 'https://stipendiumhungaricum.hu/',
    level: 'any',
    fundedBy: 'Hungary',
    hostCountries: JSON.stringify(['Hungary']),
    eligibleCountries: JSON.stringify(['partner countries']),
    fieldsOfStudy: JSON.stringify(['Any']),
    fundingType: 'full',
    coverage: JSON.stringify(['tuition', 'living', 'insurance', 'stipend']),
    amount: 12000,
    duration: '2-4 years depending on level',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 70).toISOString(),
    deadlineType: 'fixed',
    competitiveness: 'medium',
    tags: JSON.stringify(['Hungary', 'government', 'accessible']),
    featured: false,
  },
  {
    slug: 'turkiye-burslari',
    title: 'Türkiye Bursları (Turkey Scholarships)',
    provider: 'Republic of Türkiye',
    description:
      "Türkiye Bursları is the Turkish government's comprehensive international scholarship program, providing full funding for international students at undergraduate, master's, and PhD levels. With over 50,000 applications annually from Africa alone, it is one of the most popular programs for African students due to its generous benefits, no application fees, and inclusion of Turkish language training. Programs are available in Turkish and English across all disciplines.",
    eligibility:
      "Citizen of any country except Türkiye. Age 21 max for bachelor's, 30 for master's, 35 for PhD. Minimum GPA 70% (or equivalent). Turkish or English language proficiency per program. Health insurance requirement. Apply through official online portal.",
    benefits:
      'Full tuition, monthly stipend ($160-470 depending on level), free 1-year Turkish language course, accommodation (or stipend), one-time flight ticket, health insurance, residence permit fee waiver.',
    applicationUrl: 'https://www.turkiyeburslari.gov.tr/',
    officialUrl: 'https://www.turkiyeburslari.gov.tr/',
    level: 'any',
    fundedBy: 'Turkey',
    hostCountries: JSON.stringify(['Turkey']),
    eligibleCountries: JSON.stringify(['worldwide']),
    fieldsOfStudy: JSON.stringify(['Any']),
    fundingType: 'full',
    coverage: JSON.stringify(['tuition', 'living', 'flights', 'insurance', 'stipend']),
    amount: 14000,
    duration: "4 years undergrad, 2 master's, 4 PhD",
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 55).toISOString(),
    deadlineType: 'fixed',
    competitiveness: 'high',
    tags: JSON.stringify(['Turkey', 'government', 'accessible', 'language-course']),
    featured: false,
  },
  {
    slug: 'korean-government-scholarship-kgsp',
    title: 'Korean Government Scholarship Program (KGSP/GKS)',
    provider: 'National Institute for International Education (NIIED)',
    description:
      "The Global Korea Scholarship (GKS), formerly KGSP, is the South Korean government's flagship scholarship for international students. It supports around 2,000 students annually across undergraduate, master's, and PhD levels. Korean universities are renowned for engineering, technology, business, and Korean studies. The program includes a year of Korean language study and is highly attractive to African students interested in tech careers.",
    eligibility:
      "Citizen of an eligible country (most African countries eligible). Age 25 max for undergraduate, 40 for graduate. Strong academic record (80%+ or 2.64/4.0 GPA). Good health. Apply through Korean embassy or directly to participating universities.",
    benefits:
      'Full tuition, monthly stipend (KRW 900,000 undergrad, 1,400,000 graduate), one-time settlement allowance, round-trip airfare, Korean language training (1 year), medical insurance, research allowance for PhD candidates, dissertation printing cost.',
    applicationUrl: 'https://www.studyinkorea.go.kr/',
    officialUrl: 'https://www.niied.go.kr/',
    level: 'any',
    fundedBy: 'South Korea',
    hostCountries: JSON.stringify(['South Korea']),
    eligibleCountries: JSON.stringify(['worldwide']),
    fieldsOfStudy: JSON.stringify(['Any']),
    fundingType: 'full',
    coverage: JSON.stringify(['tuition', 'living', 'flights', 'insurance', 'stipend']),
    amount: 25000,
    duration: '4-7 years including language training',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 65).toISOString(),
    deadlineType: 'varies',
    competitiveness: 'high',
    tags: JSON.stringify(['Korea', 'government', 'language-course', 'tech']),
    featured: false,
  },
  {
    slug: 'iccr-india-scholarship',
    title: 'ICCR Africa Scholarship Scheme (India)',
    provider: 'Indian Council for Cultural Relations',
    description:
      "The ICCR Africa Scholarship Scheme is India's dedicated scholarship program for African students, offering around 900 scholarships annually for undergraduate, master's, and PhD study at Indian universities. India is a popular destination for African students in medicine, engineering, IT, pharmacy, and management. The scholarship includes tuition, living allowance, contingency grant, and house rent allowance.",
    eligibility:
      "Citizen of an African country. Age 18-30 for undergrad, up to 45 for PhD. Strong academic record (60%+ equivalent). English proficiency. Apply through Indian High Commission/Embassy in home country. Medical fitness required.",
    benefits:
      'Full tuition, monthly stipend (INR 18,000-25,000), contingency grant, house rent allowance, thesis/dissertation allowance, medical facility access through university.',
    applicationUrl: 'https://aicte.india.gov.in/',
    officialUrl: 'https://iccr.gov.in/',
    level: 'any',
    fundedBy: 'India',
    hostCountries: JSON.stringify(['India']),
    eligibleCountries: JSON.stringify(['Africa']),
    fieldsOfStudy: JSON.stringify(['Any', 'Engineering', 'Medicine', 'IT', 'Management', 'Pharmacy']),
    fundingType: 'full',
    coverage: JSON.stringify(['tuition', 'living', 'stipend']),
    amount: 8000,
    duration: '3-5 years depending on program',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 40).toISOString(),
    deadlineType: 'varies',
    competitiveness: 'medium',
    tags: JSON.stringify(['India', 'government', 'africa-focused']),
    featured: false,
  },
  {
    slug: 'ala-young-leaders',
    title: 'African Leadership Academy (ALA)',
    provider: 'African Leadership Academy',
    description:
      "African Leadership Academy is a premier pan-African boarding school in Johannesburg, South Africa, for 16-19 year olds. ALA identifies the most promising young leaders across Africa and brings them together for a two-year pre-university program focused on leadership, entrepreneurship, and African studies. ALA's network includes graduates who have gone on to top universities worldwide (Ivy League, Oxbridge, etc.) and to lead major African enterprises. Highly selective: ~120 students per year from over 10,000 applicants.",
    eligibility:
      'Age 16-19. African citizen or first-generation African. Strong academic record. Demonstrated leadership potential and community service. English proficiency. Apply through ALA online portal with transcripts, essays, recommendations, and interview.',
    benefits:
      "Tuition, boarding, meals, books, leadership development curriculum, entrepreneurial incubator access, university guidance counseling, lifelong ALA network access. Need-based financial aid covers up to 100% for families below income threshold.",
    applicationUrl: 'https://www.africanleadershipacademy.org/apply/',
    officialUrl: 'https://www.africanleadershipacademy.org/',
    level: 'bachelors',
    fundedBy: 'South Africa',
    hostCountries: JSON.stringify(['South Africa']),
    eligibleCountries: JSON.stringify(['Africa']),
    fieldsOfStudy: JSON.stringify(['Leadership', 'Entrepreneurship', 'Pre-University']),
    fundingType: 'partial',
    coverage: JSON.stringify(['tuition', 'living']),
    amount: 30000,
    duration: '2 years (pre-university)',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 35).toISOString(),
    deadlineType: 'fixed',
    competitiveness: 'very_high',
    tags: JSON.stringify(['leadership', 'pre-university', 'network', 'highly-selective']),
    featured: false,
  },
  {
    slug: 'acces-scholarship-kenya',
    title: 'ACCES Scholarship Program',
    provider: 'African Canadian Continuing Education Society',
    description:
      "ACCES is a Canadian non-profit that has supported post-secondary education for thousands of Kenyan and African students since 1985. The program targets bright but financially disadvantaged youth, providing full or partial scholarships for diploma, undergraduate, and technical training programs. ACCES focuses on sustainability — graduates are expected to give back to their communities through mentorship and support of other students.",
    eligibility:
      'Kenyan or East African citizen. Strong academic record (B+ average or equivalent). Demonstrated financial need (family income below threshold). Letter of admission to a recognized university or technical college. Apply through ACCES partner offices in Kenya.',
    benefits:
      'Full or partial tuition coverage, books and materials allowance, monthly stipend, mentorship, career guidance, alumni network, community service opportunities.',
    applicationUrl: 'https://acces.ca/',
    officialUrl: 'https://acces.ca/',
    level: 'bachelors',
    fundedBy: 'Canada',
    hostCountries: JSON.stringify(['Kenya']),
    eligibleCountries: JSON.stringify(['Kenya', 'Uganda', 'Tanzania']),
    fieldsOfStudy: JSON.stringify(['Any']),
    fundingType: 'partial',
    coverage: JSON.stringify(['tuition', 'books', 'stipend']),
    amount: 6000,
    duration: '2-4 years',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
    deadlineType: 'fixed',
    competitiveness: 'high',
    tags: JSON.stringify(['Kenya', 'need-based', 'community']),
    featured: false,
  },
  {
    slug: 'yyas-yale-young-african-scholars',
    title: 'Yale Young African Scholars (YYAS)',
    provider: 'Yale University',
    description:
      "Yale Young African Scholars is an intensive academic and enrichment program designed for African secondary school students planning to pursue tertiary education and become young leaders on the continent. The 8-day residential program brings together 300+ students annually across three African countries for academic workshops, university guidance, leadership development, and networking. YYAS is free for all admitted students.",
    eligibility:
      'Age 14-18. Currently in secondary school (1st or 2nd year of A-levels, IB, or equivalent). African citizen or refugee. Strong academic record. English proficiency (all programming in English). Demonstrated leadership and community engagement. Apply with essays, transcripts, recommendations.',
    benefits:
      'Free 8-day residential program, all meals and accommodation, travel grants for those with financial need, university application mentoring, standardized test prep, Yale student mentorship, lifelong alumni network.',
    applicationUrl: 'https://africanscholars.yale.edu/',
    officialUrl: 'https://africanscholars.yale.edu/',
    level: 'bachelors',
    fundedBy: 'USA',
    hostCountries: JSON.stringify(['Zimbabwe', 'Kenya', 'Ghana']),
    eligibleCountries: JSON.stringify(['Africa']),
    fieldsOfStudy: JSON.stringify(['Any']),
    fundingType: 'full',
    coverage: JSON.stringify(['living', 'flights']),
    amount: 3000,
    duration: '8 days',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 28).toISOString(),
    deadlineType: 'fixed',
    competitiveness: 'very_high',
    tags: JSON.stringify(['Yale', 'high-school', 'leadership', 'free']),
    featured: false,
  },
  {
    slug: 'russian-government-scholarship',
    title: 'Russian Government Scholarship',
    provider: 'Ministry of Education of Russia',
    description:
      "The Russian Government Scholarship offers around 15,000 fully-funded scholarships annually to international students for undergraduate, specialist, master's, and PhD programs at Russian universities. Programs are available in Russian or English. Russia is particularly popular for African students in medicine, engineering, aerospace, and natural sciences.",
    eligibility:
      "Citizen of any country except Russia. Age 18-25 for undergraduate, 35 for master's, 40 for PhD. Strong academic record. Russian proficiency for Russian-taught programs (preparatory year available); English for English-taught programs. Apply through education-in-russia portal with documents and personal statement.",
    benefits:
      'Full tuition, monthly stipend (rubles 2,144-2,957 stipend + 1,348-3,014 allowance for foreign citizens), Russian language preparatory year, dormitory accommodation, medical insurance.',
    applicationUrl: 'https://education-in-russia.com/',
    officialUrl: 'https://education-in-russia.com/',
    level: 'any',
    fundedBy: 'Russia',
    hostCountries: JSON.stringify(['Russia']),
    eligibleCountries: JSON.stringify(['worldwide']),
    fieldsOfStudy: JSON.stringify(['Any', 'Medicine', 'Engineering', 'Aerospace']),
    fundingType: 'full',
    coverage: JSON.stringify(['tuition', 'living', 'insurance', 'stipend']),
    amount: 10000,
    duration: '4-6 years including preparatory year',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90).toISOString(),
    deadlineType: 'fixed',
    competitiveness: 'medium',
    tags: JSON.stringify(['Russia', 'government', 'medicine']),
    featured: false,
  },
  {
    slug: 'singapore-scholarship',
    title: 'Singapore Government Scholarship (African Students)',
    provider: 'Singapore Government',
    description:
      "Singapore offers government scholarships for international students from Africa through bilateral agreements and partner institutions. Singapore's world-class universities (NUS, NTU, SMU) consistently rank in global top 15, with particular strength in engineering, business, computer science, and public policy. Programs at undergraduate and graduate levels are available.",
    eligibility:
      'African citizen (varies by partner program). Strong academic record (typically top 5-10% of class). English proficiency (IELTS 6.5+, TOEFL 90+). For graduate programs, GRE/GMAT may be required. Apply through Singapore universities or via bilateral MoUs.',
    benefits:
      'Full tuition, monthly stipend, accommodation allowance, medical insurance, travel allowance, book allowance. Specifics vary by program.',
    applicationUrl: 'https://www.nus.edu.sg/admissions',
    officialUrl: 'https://www.moe.gov.sg/',
    level: 'any',
    fundedBy: 'Singapore',
    hostCountries: JSON.stringify(['Singapore']),
    eligibleCountries: JSON.stringify(['worldwide']),
    fieldsOfStudy: JSON.stringify(['Engineering', 'Computer Science', 'Business', 'Public Policy']),
    fundingType: 'full',
    coverage: JSON.stringify(['tuition', 'living', 'flights', 'insurance', 'stipend']),
    amount: 45000,
    duration: "4 years undergrad, 1-2 master's, 4 PhD",
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 110).toISOString(),
    deadlineType: 'varies',
    competitiveness: 'very_high',
    tags: JSON.stringify(['Singapore', 'tech', 'competitive']),
    featured: false,
  },
  {
    slug: 'open-society-fellowships',
    title: 'Open Society Fellowships',
    provider: 'Open Society Foundations',
    description:
      "Open Society Fellowships support individuals who are developing innovative solutions to pressing global challenges including human rights, governance, media freedom, public health, and economic justice. Fellows receive generous stipends to work on full-time projects for 12-18 months. The fellowship is highly competitive and is open to journalists, activists, lawyers, researchers, and public health advocates worldwide including across Africa.",
    eligibility:
      "Open to anyone globally regardless of citizenship or institutional affiliation. Strong track record of relevant work. Original project proposal that addresses an open society issue. No degree requirement. Demonstrated ability to complete project within timeframe.",
    benefits:
      'Monthly stipend ($10,000-15,000 depending on location), project expenses, travel to Open Society events, mentorship and networking, full-time commitment expected.',
    applicationUrl: 'https://www.opensocietyfoundations.org/grants/open-society-fellowships',
    officialUrl: 'https://www.opensocietyfoundations.org/',
    level: 'research',
    fundedBy: 'USA',
    hostCountries: JSON.stringify(['worldwide']),
    eligibleCountries: JSON.stringify(['worldwide']),
    fieldsOfStudy: JSON.stringify(['Human Rights', 'Governance', 'Media', 'Public Health', 'Justice']),
    fundingType: 'full',
    coverage: JSON.stringify(['stipend']),
    amount: 180000,
    duration: '12-18 months',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 200).toISOString(),
    deadlineType: 'fixed',
    competitiveness: 'very_high',
    tags: JSON.stringify(['fellowship', 'professional', 'global']),
    featured: false,
  },
  {
    slug: 'joint-japan-worldbank-scholarship',
    title: 'Joint Japan/World Bank Graduate Scholarship Program (JJ/WBGSP)',
    provider: 'World Bank Group & Government of Japan',
    description:
      "The JJ/WBGSP supports students from World Bank member developing countries to pursue graduate study in development-related fields at partner programs worldwide. Scholars gain skills in economics, public policy, infrastructure, and sustainable development, and commit to returning home to contribute to their country's development after graduation. Over 6,000 scholars from 160 countries have been supported since 1987.",
    eligibility:
      "Citizen of a World Bank borrowing member country (most African countries qualify). Bachelor's degree earned at least 3 years before application deadline. At least 3 years of development-related work experience. Admitted to one of the JJ/WBGSP partner programs (master's level). Not a dual citizen of any developed country. In good health.",
    benefits:
      "Full tuition, monthly living stipend, round-trip airfare, health insurance, travel allowance for academic activities, thesis grant.",
    applicationUrl: 'https://www.worldbank.org/en/programs/scholarships',
    officialUrl: 'https://www.worldbank.org/en/programs/scholarships',
    level: 'masters',
    fundedBy: 'Japan',
    hostCountries: JSON.stringify(['worldwide']),
    eligibleCountries: JSON.stringify(['developing countries']),
    fieldsOfStudy: JSON.stringify(['Development', 'Economics', 'Public Policy', 'Infrastructure', 'Environment']),
    fundingType: 'full',
    coverage: JSON.stringify(['tuition', 'living', 'flights', 'insurance']),
    amount: 50000,
    duration: "1-2 years (master's)",
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 85).toISOString(),
    deadlineType: 'fixed',
    competitiveness: 'high',
    tags: JSON.stringify(['World Bank', 'development', 'masters', 'return-home']),
    featured: false,
  },
  {
    slug: 'mandela-rhodes-scholarship',
    title: 'Mandela-Rhodes Scholarship',
    provider: 'The Mandela Rhodes Foundation',
    description:
      "The Mandela Rhodes Scholarship is a premier African leadership program combining postgraduate study at a South African university with a customized leadership development program. Founded in 2003 by Nelson Mandela and the Rhodes Trust, the scholarship funds one to three years of postgraduate study for African scholars who demonstrate academic excellence, leadership, entrepreneurship, and education. The leadership development components are a hallmark — scholars attend workshops, retreats, and mentoring throughout the year.",
    eligibility:
      "African citizen (any country). Age 19-29. Bachelor's degree (first class or strong upper second). Strong academic record. Demonstrated leadership and commitment to Africa's development. English proficiency. Apply to a South African university for honors or master's program.",
    benefits:
      "Tuition and registration fees, accommodation and meals (or stipend), book allowance, travel allowance, medical aid, leadership development program (5 sessions across year), mentorship, lifelong alumni network.",
    applicationUrl: 'https://www.mandelarhodes.org/apply/',
    officialUrl: 'https://www.mandelarhodes.org/',
    level: 'masters',
    fundedBy: 'South Africa',
    hostCountries: JSON.stringify(['South Africa']),
    eligibleCountries: JSON.stringify(['Africa']),
    fieldsOfStudy: JSON.stringify(['Any']),
    fundingType: 'full',
    coverage: JSON.stringify(['tuition', 'living', 'books', 'insurance', 'stipend']),
    amount: 30000,
    duration: "1-3 years (honors or master's)",
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 22).toISOString(),
    deadlineType: 'fixed',
    competitiveness: 'very_high',
    tags: JSON.stringify(['Mandela', 'Rhodes', 'leadership', 'africa-focused']),
    featured: true,
  },
]

type ResourceSeed = {
  slug: string
  title: string
  category: string
  type: string
  summary: string
  content: string
  readMinutes?: number
  tags?: string[]
  featured?: boolean
}

const resources: ResourceSeed[] = [
  {
    slug: 'sop-masters-guide',
    title: "Writing a Winning Statement of Purpose for Master's Programs",
    category: 'essays',
    type: 'guide',
    summary:
      "A step-by-step framework for crafting a statement of purpose that gets noticed by admissions committees. Covers structure, themes, common mistakes, and worked examples from successful applicants to top programs.",
    content: `# Writing a Winning Statement of Purpose

The Statement of Purpose (SOP) is the single most important document in your graduate school application. A strong SOP can compensate for a mediocre GPA; a weak SOP can sink a perfect application.

## The 5-Paragraph Structure

### Paragraph 1: The Hook + Your Trajectory
Open with a specific moment, project, or question that ignited your interest in the field. Avoid cliches like "Ever since I was a child..." Instead: "When I built a low-cost soil moisture sensor for my uncle's farm in Oromia, I didn't realize I was starting my career at the intersection of IoT and agriculture."

End the paragraph with your trajectory: where you've been, where you're going, and why this program is the bridge.

### Paragraph 2: Academic Foundation
Demonstrate that you have the intellectual preparation for graduate work. Mention relevant coursework, research projects, and skills acquired. Be specific.

### Paragraph 3: Professional/Research Experience
Show, don't tell. Describe 1-2 substantive experiences: what problem, your specific contribution, what you learned.

### Paragraph 4: Why THIS Program
This is where most applicants fail. Name 2-3 faculty members whose research aligns with yours and cite their recent papers. Mention specific courses, labs, or centers.

### Paragraph 5: Career Vision
What will you do after graduation? Be ambitious but realistic. Connect to applying skills in your home country.

## Common Mistakes
1. Quoting famous people
2. Listing achievements (your CV does that)
3. Negative tone about past institutions
4. Generic program fit (if you can swap university names, you've failed)
5. Length violations
6. Cliche openings
7. Excuses without context

Use ScholarTrack's AI Essay Assistant for instant feedback on structure, tone, and specificity — but always iterate with human reviewers.`,
    readMinutes: 8,
    tags: ['SOP', 'graduate', 'application', 'essay'],
    featured: true,
  },
  {
    slug: 'recommendation-letters-guide',
    title: 'How to Get Outstanding Recommendation Letters',
    category: 'recommendations',
    type: 'guide',
    summary:
      'Strategies for identifying, approaching, and supporting recommenders to write letters that strengthen — not just verify — your application.',
    content: `# How to Get Outstanding Recommendation Letters

A great recommendation letter does more than confirm you did well in a class. It tells a story about your potential.

## Choose Recommenders Strategically
- Faculty who taught you in junior/senior year, with major projects
- Supervisors of research or significant work (6+ months)
- People who can speak to specific qualities: intellectual curiosity, leadership, resilience

## Approach 8-10 Weeks Before Deadline
Send a thoughtful email — not a Slack message. Include your CV, transcript, draft SOP, and program summary.

## Provide a Recommender Briefing
1. Program overview
2. Why this program
3. Specific things they might address (suggest themes)
4. Submission logistics
5. Your contact info

## What Strong Letters Look Like
- Open with a specific anecdote
- Compare the student to peers ("top 5% in 15 years")
- Provide concrete evidence for each claim
- Discuss intellectual growth over time
- Address potential weaknesses constructively
- 1-2 pages long

## Red Flags
- "Did what was asked"
- "Pleasant to have in class"
- Brief letters
- Letters that restate your CV
- Late or rushed letters`,
    readMinutes: 7,
    tags: ['recommendation', 'letter', 'faculty'],
    featured: true,
  },
  {
    slug: 'toefl-ielts-guide',
    title: 'TOEFL vs IELTS: Which to Take and How to Score 100+/7.0+',
    category: 'tests',
    type: 'guide',
    summary:
      'A practical comparison of TOEFL and IELTS for African applicants, with targeted preparation strategies, free resources, and a 4-week study plan.',
    content: `# TOEFL vs IELTS: Choosing and Conquering

## Quick Comparison
| Feature | TOEFL iBT | IELTS Academic |
|---|---|---|
| Format | Internet-based, ~3 hours | Paper or computer, ~2h45min |
| Speaking | Recorded to microphone | Live with examiner |
| Accent | North American | British/Australian |
| Scoring | 0-120 | 0-9.0 (bands) |
| Typical "good" score | 100+ | 7.0+ |
| Cost (Africa) | ~$185 USD | ~$230 USD |
| Validity | 2 years | 2 years |

## Which to Choose?
- **TOEFL**: applying mainly to US programs, prefer multiple-choice, get nervous with live speaking
- **IELTS**: applying mainly to UK/Australia/Canada, prefer human interaction, stronger in British English

## Score Targets by Program Tier
- Top-20 universities (US/UK): TOEFL 110+ / IELTS 7.5+
- Top-50 universities: TOEFL 100+ / IELTS 7.0+
- Government scholarships (Chevening, Fulbright): TOEFL 100+ / IELTS 7.0+
- Most other programs: TOEFL 80+ / IELTS 6.5+

## Free Resources
**TOEFL**: ETS free practice tests, Magoosh TOEFL flashcards, EdX TOEFL prep, Notefull YouTube
**IELTS**: British Council free practice tests, IELTS Liz YouTube, Cambridge IELTS 1-18 PDFs, BBC Learning English

## 4-Week Study Plan
**Week 1**: Diagnostic + foundation
**Week 2**: Target weaknesses
**Week 3**: Full section mastery
**Week 4**: Test simulation

## Common Pitfalls for African Test-Takers
1. Speaking section timing
2. Spelling consistency (British OR American, not both)
3. Avoid informal idioms
4. Handwriting (paper IELTS)
5. British vs American accent in listening`,
    readMinutes: 9,
    tags: ['TOEFL', 'IELTS', 'english'],
    featured: true,
  },
  {
    slug: 'visa-application-f1',
    title: 'F-1 Student Visa Application Guide (USA)',
    category: 'visa',
    type: 'guide',
    summary:
      'Complete walkthrough of the F-1 student visa application process for African students heading to the United States, including DS-160 tips, interview prep, and common denial reasons.',
    content: `# F-1 Student Visa Application Guide (USA)

## Step 1: Receive Your I-20
After university admission, your school issues a Form I-20. Verify name spelling, program dates, financials, and signatures. Pay SEVIS I-901 fee ($350).

## Step 2: Complete DS-160
- Save application ID frequently
- Upload 2x2 inch photo on white background
- Be 100% honest
- List actual funding source
- Save confirmation page with barcode

## Step 3: Pay Visa Fee and Schedule Interview
- Visa fee: $185 (MRV fee), non-refundable
- Schedule through US embassy portal
- Wait times vary: 2 days to 6 months

## Step 4: Prepare Documents
Required: passport, DS-160 confirmation, visa fee receipt, signed I-20, SEVIS fee receipt, photo, admission letter, financial evidence
Recommended: transcripts, test scores, resume, SOP, ties to home country

## Step 5: The Interview (3-5 minutes)
Common questions: Why this university? Why this program? Who is funding? What will you do after?

**Principles:**
1. Brief answers (30-60 seconds)
2. Demonstrate ties to home country
3. Be ready to discuss return intentions
4. Honesty above all
5. Dress professionally

## Common Denial Reasons (Section 214(b))
Failure to overcome presumption of immigrant intent.

**Things that help:**
- Specific post-graduation job offer
- Family business or property
- Strong academic record
- Return-required scholarships (Fulbright, etc.)
- Older applicants with established careers

## After Approval
- Visa printed in 3-7 days
- Enter US up to 30 days before program start
- Maintain full-time enrollment
- On-campus work: 20 hrs/week; off-campus requires authorization`,
    readMinutes: 11,
    tags: ['visa', 'USA', 'F-1', 'interview'],
    featured: true,
  },
  {
    slug: 'scholarship-interview-prep',
    title: 'Scholarship Interview Preparation: Questions, Frameworks, and Mock Practice',
    category: 'interviews',
    type: 'guide',
    summary:
      'A comprehensive preparation guide for competitive scholarship interviews (Chevening, Fulbright, Rhodes, etc.) with common questions, response frameworks, and a mock interview checklist.',
    content: `# Scholarship Interview Preparation

## What Interviewers Evaluate
1. Intellectual depth
2. Leadership
3. Self-awareness
4. Fit with scholarship values
5. Communication
6. Future trajectory

## Common Question Categories
- Personal Background (5-10 min)
- Academic/Professional (10-15 min)
- Leadership & Impact (10-15 min)
- Scholarship Fit (5-10 min)
- Current Events/Big Questions (5-10 min)

## Response Frameworks

### STAR Method (behavioral)
- Situation: brief context
- Task: your responsibility
- Action: what YOU did (not "we")
- Result: outcomes + lessons

### Why-What-How (opinion questions)
- Why this matters
- What I believe
- How I'd approach it

### Past-Present-Future (trajectory questions)

## The "Tell Me About Yourself" Answer
Craft a 90-second response:
1. 30 sec: who you are, where you're from
2. 30 sec: most significant achievement
3. 30 sec: why this scholarship, this program, this moment

## Difficult Question Strategies
**"Biggest weakness?"** — real weakness not core to role, show improvement
**"Why choose you?"** — 2-3 unique qualities, don't disparage others
**"What if you don't get it?"** — resilience and alternative plans

## Day-of Tips
- Dress one notch above expected
- Arrive 30 minutes early
- Bring water, notepad, application copies
- Silence phone (off, not vibrate)
- Take deep breaths before answering

## Common Pitfalls
1. Over-prepared, robotic answers
2. Speaking too long (60-90 sec max)
3. Name-dropping
4. Negativity about home country
5. No questions for them`,
    readMinutes: 12,
    tags: ['interview', 'preparation', 'scholarship'],
    featured: true,
  },
  {
    slug: 'financial-planning-international-students',
    title: "Financial Planning for International Students: Beyond Tuition",
    category: 'finances',
    type: 'guide',
    summary:
      "Hidden costs of studying abroad that scholarships don't cover, plus strategies for managing money, finding part-time work, and building credit in your host country.",
    content: `# Financial Planning for International Students

## The "Hidden" Costs

### Pre-Arrival
- Visa application fees ($150-500)
- Medical exams and vaccinations ($100-400)
- Police clearance certificates ($20-100)
- Document authentication/apostille ($50-200)
- Translation of documents ($50-300)
- Initial flight booking

### Arrival
- First and last month rent deposit ($1,500-4,000)
- Utility setup fees
- Furniture/household items
- Winter clothing ($500-1,500 for cold climate)
- Mobile phone setup
- Bank account opening minimums

### Ongoing (Often Uncovered)
- Health expenses not covered by insurance (dental, vision)
- Conference travel
- Books beyond allowance
- Family visits home (typically 1x/year)
- Professional association dues
- Laptop and software
- Visa renewal fees

## Realistic Annual Budgets

### USA
- New York, SF, Boston: $35,000-50,000/year
- Chicago, DC: $25,000-35,000/year
- Midwest/South: $18,000-25,000/year

### UK
- London: $25,000-35,000/year
- Oxford/Cambridge: $20,000-28,000/year
- Other cities: $15,000-22,000/year

### Germany
- Munich, Frankfurt: $14,000-18,000/year
- Berlin: $12,000-16,000/year
- Smaller cities: $10,000-14,000/year

## Part-Time Work Rules

### USA (F-1)
- On-campus: 20 hours/week during semester
- Off-campus: requires authorization (CPT/OPT)
- Annual earnings: $8,000-15,000

### UK (Tier 4 visa)
- 20 hours/week during semester
- Full-time during breaks
- Annual earnings: GBP 6,000-10,000

### Germany
- 140 full days OR 280 half days per year
- Minijob: EUR 538/month tax-free

### Canada
- 20 hours/week during semester
- Full-time during breaks
- Spouses of graduate students can work full-time

## Building Credit
**USA**: Secured credit card ($200-500 deposit), pay in full monthly, apply for student card after 6-12 months
**UK**: Open UK bank account, apply for "credit builder" card, register on electoral roll if eligible
**Canada**: Secured card from RBC, TD, or CIBC; keep utilization under 30%

## Banking Setup
Open a local bank account within the first week. Required: passport, visa, university enrollment letter, proof of address, initial deposit.

## Sending Money Home
- Wise (TransferWise): lowest fees, mid-market rate
- Remitly: fast, slight markup
- WorldRemit: good for mobile money in Africa
- Western Union: most locations, highest fees
- Bank wire: expensive, slow

## Emergency Fund
Build $2,000-3,000 in first 6 months. Sources: save 10% of stipend, summer internship savings, tax refunds, family support.

This fund covers medical emergencies, family emergencies requiring travel, visa issues, laptop/phone replacement, stipend delays.`,
    readMinutes: 10,
    tags: ['finances', 'budgeting', 'work', 'banking'],
    featured: false,
  },
]

async function main() {
  console.log('Seeding ScholarTrack database...')

  await db.activity.deleteMany()
  await db.essay.deleteMany()
  await db.document.deleteMany()
  await db.application.deleteMany()
  await db.savedScholarship.deleteMany()
  await db.resource.deleteMany()
  await db.scholarship.deleteMany()
  await db.studentProfile.deleteMany()
  await db.user.deleteMany()
  console.log('   Cleared existing data')

  for (const s of scholarships) {
    await db.scholarship.create({
      data: {
        ...s,
        deadline: s.deadline ? new Date(s.deadline) : null,
      } as any,
    })
  }
  console.log(`   Inserted ${scholarships.length} scholarships`)

  for (const r of resources) {
    await db.resource.create({
      data: {
        ...r,
        tags: r.tags ? JSON.stringify(r.tags) : null,
      } as any,
    })
  }
  console.log(`   Inserted ${resources.length} resources`)

  const demoUser = await db.user.create({
    data: {
      email: 'demo@scholartrack.africa',
      name: 'Demo Student',
      profile: {
        create: {
          fullName: 'Demo Student',
          country: 'Ethiopia',
          city: 'Addis Ababa',
          gender: 'prefer_not_to_say',
          educationLevel: 'undergraduate',
          currentSchool: 'Addis Ababa University',
          fieldOfStudy: 'Computer Science',
          gpa: 3.7,
          graduationYear: 2026,
          targetCountries: JSON.stringify(['USA', 'UK', 'Germany', 'Canada']),
          targetDegree: 'masters',
          targetField: 'Computer Science',
          startTerm: 'Fall 2026',
          financialNeed: 'high',
          budget: 5000,
          languages: JSON.stringify(['Amharic', 'English']),
          onboardingComplete: true,
        },
      },
    },
    include: { profile: true },
  })

  const featuredScholarships = await db.scholarship.findMany({ take: 3 })
  for (const s of featuredScholarships) {
    await db.savedScholarship.create({
      data: { userId: demoUser.id, scholarshipId: s.id },
    }).catch(() => {})
  }

  if (featuredScholarships.length >= 2) {
    await db.application.create({
      data: {
        userId: demoUser.id,
        scholarshipId: featuredScholarships[0].id,
        status: 'preparing',
        progress: 35,
        notes: 'Working on SOP. Need to request transcripts.',
        matchScore: 87,
        matchReasons: JSON.stringify([
          'Strong academic match (CS to CS)',
          'Target country aligned (USA)',
          'Financial need profile matches program',
          'GPA exceeds minimum threshold',
        ]),
      },
    }).catch(() => {})

    await db.application.create({
      data: {
        userId: demoUser.id,
        scholarshipId: featuredScholarships[1].id,
        status: 'researching',
        progress: 15,
        notes: 'Researching faculty fit.',
        matchScore: 78,
        matchReasons: JSON.stringify([
          'Eligible country (Ethiopia qualifies)',
          'Degree level aligned',
          'Need to verify English test scores',
        ]),
      },
    }).catch(() => {})
  }
  console.log(`   Created demo user with profile, applications, saved scholarships`)

  await db.activity.create({
    data: {
      userId: demoUser.id,
      type: 'profile_completed',
      description: 'Completed student profile',
      metadata: JSON.stringify({ completion: 100 }),
    },
  })
  await db.activity.create({
    data: {
      userId: demoUser.id,
      type: 'ai_match_run',
      description: 'Ran AI Scholarship Matcher',
      metadata: JSON.stringify({ matchesFound: 24 }),
    },
  })
  await db.activity.create({
    data: {
      userId: demoUser.id,
      type: 'essay_created',
      description: 'Started SOP draft',
      metadata: JSON.stringify({ essayId: 'seeded' }),
    },
  })
  console.log(`   Created activity feed`)

  console.log('\nSeed complete!')
  console.log(`   ${scholarships.length} scholarships`)
  console.log(`   ${resources.length} resources`)
  console.log(`   1 demo user with profile, applications, saved scholarships, and activity`)
}

main()
  .catch((e) => {
    console.error('Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
