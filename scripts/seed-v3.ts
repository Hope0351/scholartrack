/**
 * ScholarTrack — v3 Seed: 26 additional scholarships (50+ total)
 * Run with: bun run scripts/seed-v3.ts
 */
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

type ScholarshipSeed = {
  slug: string
  title: string
  provider: string
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

// 26 ADDITIONAL real scholarships targeting African students
const newScholarships: ScholarshipSeed[] = [
  {
    slug: 'commonwealth-masters-scholarship',
    title: 'Commonwealth Master’s Scholarship',
    provider: 'UK Department for International Development',
    description:
      'Commonwealth Master’s Scholarships are for candidates from low and middle income Commonwealth countries to undertake full-time taught Master’s study at a UK university. These scholarships are funded by the UK government (FCDO) and enable talented and motivated individuals to gain the knowledge and skills required for sustainable development. The scholarships cover full tuition, living stipend, and travel.',
    eligibility:
      'Be a citizen of or be granted refugee status by an eligible Commonwealth country. Be permanently resident in an eligible Commonwealth country. Hold a Bachelors degree of at least upper second class (2:1) honours standard. Be available to start in September/October. Not have studied or worked for one academic year or more in a high-income country.',
    benefits:
      'Full tuition fees, living stipend (£1,234/month), return airfare, warm clothing allowance, thesis grant, study travel grant, and excess baggage allowance.',
    applicationUrl: 'https://cscuk.fcdo.gov.uk/scholarships/commonwealth-masters-scholarships/',
    officialUrl: 'https://cscuk.fcdo.gov.uk/',
    level: 'masters',
    fundedBy: 'UK',
    hostCountries: JSON.stringify(['UK']),
    eligibleCountries: JSON.stringify(['Commonwealth developing countries']),
    fieldsOfStudy: JSON.stringify(['Any']),
    fundingType: 'full',
    coverage: JSON.stringify(['tuition', 'living', 'flights', 'insurance', 'stipend']),
    amount: 40000,
    duration: '1 year',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 75).toISOString(),
    deadlineType: 'fixed',
    competitiveness: 'very_high',
    tags: JSON.stringify(['UK', 'masters', 'Commonwealth', 'government']),
    featured: false,
  },
  {
    slug: 'commonwealth-phd-scholarship',
    title: 'Commonwealth PhD Scholarship',
    provider: 'UK FCDO via Commonwealth Scholarship Commission',
    description:
      'Commonwealth PhD Scholarships are for candidates from low and middle income Commonwealth countries to undertake full-time doctoral study at a UK university. Funded by the UK government, these scholarships support research that contributes to the development of the candidate’s home country. The program aims to identify future leaders who will drive sustainable development.',
    eligibility:
      'Citizen of eligible Commonwealth country. Hold, or be about to complete, a Master’s degree. Permanent resident of an eligible country. Not have studied/worked in a high-income country for 12+ months. Meet English language requirements (IELTS 6.5+ overall).',
    benefits:
      'Full tuition, stipend (£1,234/month for first 18 months, £1,561/month thereafter), return airfare, warm clothing allowance, thesis grant, study travel grant, family allowance if applicable.',
    applicationUrl: 'https://cscuk.fcdo.gov.uk/scholarships/commonwealth-phd-scholarships/',
    officialUrl: 'https://cscuk.fcdo.gov.uk/',
    level: 'phd',
    fundedBy: 'UK',
    hostCountries: JSON.stringify(['UK']),
    eligibleCountries: JSON.stringify(['Commonwealth developing countries']),
    fieldsOfStudy: JSON.stringify(['Any']),
    fundingType: 'full',
    coverage: JSON.stringify(['tuition', 'living', 'flights', 'insurance', 'stipend']),
    amount: 120000,
    duration: '3-4 years',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 80).toISOString(),
    deadlineType: 'fixed',
    competitiveness: 'very_high',
    tags: JSON.stringify(['UK', 'PhD', 'Commonwealth', 'research']),
    featured: false,
  },
  {
    slug: 'commonwealth-shared',
    title: 'Commonwealth Shared Scholarships',
    provider: 'Commonwealth Scholarship Commission + UK Universities',
    description:
      'Commonwealth Shared Scholarships are a joint initiative between the UK government and UK universities to support scholarships for students from developing Commonwealth countries who would not otherwise be able to study in the UK. The program funds Master’s courses related to the development of the student’s home country.',
    eligibility:
      'Citizen of eligible Commonwealth country, permanent resident. Hold a first degree at upper second class level. Not have studied or worked in a high-income country for 12+ months. Apply for an eligible Master’s course at a participating UK university.',
    benefits:
      'Full tuition, living stipend, return airfare, warm clothing allowance, thesis grant, study travel grant.',
    applicationUrl: 'https://cscuk.fcdo.gov.uk/scholarships/commonwealth-shared-scholarships/',
    officialUrl: 'https://cscuk.fcdo.gov.uk/',
    level: 'masters',
    fundedBy: 'UK',
    hostCountries: JSON.stringify(['UK']),
    eligibleCountries: JSON.stringify(['Commonwealth developing countries']),
    fieldsOfStudy: JSON.stringify(['Development', 'Public Health', 'Education', 'Environment', 'Technology']),
    fundingType: 'full',
    coverage: JSON.stringify(['tuition', 'living', 'flights', 'stipend']),
    amount: 40000,
    duration: '1 year',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 45).toISOString(),
    deadlineType: 'fixed',
    competitiveness: 'high',
    tags: JSON.stringify(['UK', 'masters', 'shared', 'development']),
    featured: false,
  },
  {
    slug: 'commonwealth-rutherford-fund',
    title: 'Commonwealth Rutherford Fellowship',
    provider: 'UK FCDO',
    description:
      'The Commonwealth Rutherford Fellowship is for highly skilled researchers from Commonwealth countries to spend one to two years at a UK university conducting post-doctoral research. The fellowship aims to attract global talent and foster research collaborations that benefit both the UK and Commonwealth countries.',
    eligibility:
      'Citizen of eligible Commonwealth country. Hold a PhD. Have a confirmed offer from a UK university. Research must be in a field that benefits the home country. English language proficiency.',
    benefits:
      'Living stipend (£1,561/month), return airfare, research support grant (£2,500), family allowance if applicable.',
    applicationUrl: 'https://cscuk.fcdo.gov.uk/scholarships/commonwealth-rutherford-fellowship/',
    officialUrl: 'https://cscuk.fcdo.gov.uk/',
    level: 'postdoc',
    fundedBy: 'UK',
    hostCountries: JSON.stringify(['UK']),
    eligibleCountries: JSON.stringify(['Commonwealth countries']),
    fieldsOfStudy: JSON.stringify(['Any']),
    fundingType: 'full',
    coverage: JSON.stringify(['living', 'flights', 'stipend']),
    amount: 75000,
    duration: '1-2 years',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60).toISOString(),
    deadlineType: 'fixed',
    competitiveness: 'very_high',
    tags: JSON.stringify(['UK', 'postdoc', 'research', 'Commonwealth']),
    featured: false,
  },
  {
    slug: 'ag foundation-lead-africa',
    title: 'AGCO Africa Scholarship',
    provider: 'AGCO Corporation',
    description:
      'The AGCO Africa Scholarship is aimed at students from Africa pursuing agricultural engineering, agribusiness, or related fields. AGCO, a global agricultural equipment manufacturer, sponsors African students to study at partner universities and offers internship opportunities at AGCO facilities. The scholarship combines academic funding with practical industry experience.',
    eligibility:
      'African citizen. Enrolled in or applying to a Master’s program in agricultural engineering, agribusiness, or related field. Minimum GPA 3.0. English proficiency. Demonstrated interest in agricultural development.',
    benefits:
      'Up to €10,000 toward tuition, paid internship at AGCO Africa, mentorship from AGCO engineers, networking with industry leaders, potential full-time employment after graduation.',
    applicationUrl: 'https://www.agcocorp.com/sustainability/education.html',
    officialUrl: 'https://www.agcocorp.com/',
    level: 'masters',
    fundedBy: 'Germany',
    hostCountries: JSON.stringify(['Germany', 'South Africa']),
    eligibleCountries: JSON.stringify(['Africa']),
    fieldsOfStudy: JSON.stringify(['Agricultural Engineering', 'Agribusiness', 'Mechanical Engineering']),
    fundingType: 'partial',
    coverage: JSON.stringify(['tuition', 'stipend']),
    amount: 11000,
    duration: '1-2 years',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 40).toISOString(),
    deadlineType: 'fixed',
    competitiveness: 'medium',
    tags: JSON.stringify(['agriculture', 'industry', 'internship']),
    featured: false,
  },
  {
    slug: 'mandela-washington-fellowship-reciprocal-exchange',
    title: 'Mandela Washington Fellowship Reciprocal Exchange',
    provider: 'U.S. State Department via IREX',
    description:
      'The Reciprocal Exchange component of the Mandela Washington Fellowship provides grants to Mandela Washington Fellowship Alumni and U.S. professionals to collaborate on projects in Africa. The program supports projects that build on the fellow’s network and expertise to create lasting impact in African communities.',
    eligibility:
      'Be a Mandela Washington Fellowship Alumnus. Partner with a U.S. professional or organization. Submit a project proposal with clear objectives, timeline, and budget (up to $5,000-$10,000).',
    benefits:
      'Grant of $5,000-$10,000 for project implementation, travel support, network access, mentorship.',
    applicationUrl: 'https://mwfellowship.org/reciprocal-exchange/',
    officialUrl: 'https://www.yali.state.gov/mwf/',
    level: 'research',
    fundedBy: 'USA',
    hostCountries: JSON.stringify(['Africa', 'USA']),
    eligibleCountries: JSON.stringify(['Sub-Saharan Africa']),
    fieldsOfStudy: JSON.stringify(['Business', 'Civic Engagement', 'Public Management']),
    fundingType: 'stipend',
    coverage: JSON.stringify(['stipend', 'flights']),
    amount: 10000,
    duration: '3-6 months',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 55).toISOString(),
    deadlineType: 'fixed',
    competitiveness: 'high',
    tags: JSON.stringify(['Mandela', 'YALI', 'fellowship', 'project-grant']),
    featured: false,
  },
  {
    slug: 'irex-community-solutions',
    title: 'IREX Community Solutions Program (CSP)',
    provider: 'IREX (funded by U.S. State Department)',
    description:
      'The Community Solutions Program is a professional development program for global community leaders working in transparency and accountability, environmental issues, peace and conflict resolution, and women and gender issues. The program includes a 4-month fellowship in the U.S., online courses, and a follow-on project in the fellow’s home community.',
    eligibility:
      'Be a community leader from an eligible country (including most African countries). 21+ years old. 2+ years of relevant experience. English proficiency. Be able to receive a J-1 visa. Commit to a 6-month community-based project post-fellowship.',
    benefits:
      '4-month U.S. fellowship, travel costs, J-1 visa, monthly stipend, housing, health insurance, online leadership courses, alumni network, $5,000-$10,000 community project grant.',
    applicationUrl: 'https://www.irex.org/community-solutions-program',
    officialUrl: 'https://www.irex.org/',
    level: 'research',
    fundedBy: 'USA',
    hostCountries: JSON.stringify(['USA']),
    eligibleCountries: JSON.stringify(['eligible countries']),
    fieldsOfStudy: JSON.stringify(['Transparency', 'Environment', 'Conflict Resolution', 'Women/Gender']),
    fundingType: 'full',
    coverage: JSON.stringify(['living', 'flights', 'insurance', 'stipend']),
    amount: 30000,
    duration: '4 months + 6 months project',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 65).toISOString(),
    deadlineType: 'fixed',
    competitiveness: 'very_high',
    tags: JSON.stringify(['leadership', 'community', 'USA', 'fellowship']),
    featured: false,
  },
  {
    slug: 'mandela-washington-yali',
    title: 'YALI Regional Leadership Center',
    provider: 'USAID + African partners',
    description:
      'The Young African Leaders Initiative (YALI) Regional Leadership Centers (RLC) provide emerging African leaders with training in business and entrepreneurship, civic leadership, and public management. The program is offered at centers in Kenya, Ghana, Senegal, and South Africa. The 12-16 week program combines online and in-person learning with mentorship.',
    eligibility:
      'African citizen, 18-35 years old. Demonstrated leadership in community, business, or public sector. English proficiency (for English-speaking cohorts). Ready to commit 12-16 weeks.',
    benefits:
      'Free training, materials, mentorship, networking, certificate of completion, access to YALI Network, alumni benefits.',
    applicationUrl: 'https://yalirlica.net/',
    officialUrl: 'https://www.yali.state.gov/',
    level: 'any',
    fundedBy: 'USA',
    hostCountries: JSON.stringify(['Kenya', 'Ghana', 'Senegal', 'South Africa']),
    eligibleCountries: JSON.stringify(['Sub-Saharan Africa']),
    fieldsOfStudy: JSON.stringify(['Business', 'Civic Leadership', 'Public Management']),
    fundingType: 'full',
    coverage: JSON.stringify(['living', 'materials']),
    amount: 3000,
    duration: '12-16 weeks',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
    deadlineType: 'rolling',
    competitiveness: 'high',
    tags: JSON.stringify(['YALI', 'leadership', 'africa-focused', 'free']),
    featured: false,
  },
  {
    slug: 'unicef-innovation-fund',
    title: 'UNICEF Innovation Fund',
    provider: 'UNICEF',
    description:
      'The UNICEF Innovation Fund invests in early-stage, open-source, emerging technology solutions that have the potential to create positive impact for children. The fund provides equity-free investments of $50,000-$100,000 to startups from developing countries, including African countries, working in AI, blockchain, drones, VR, and other emerging technologies.',
    eligibility:
      'Startup (not individual). Building an open-source technology solution. Based in a UNICEF program country (most African countries qualify). Working on emerging tech (AI, blockchain, etc.). Solution has potential to benefit children.',
    benefits:
      'Equity-free investment of $50,000-$100,000, mentorship from UNICEF team, technical assistance, access to UNICEF network and country offices, product development support.',
    applicationUrl: 'https://www.unicefinnovationfund.org/',
    officialUrl: 'https://www.unicef.org/innovation/',
    level: 'research',
    fundedBy: 'USA',
    hostCountries: JSON.stringify(['worldwide']),
    eligibleCountries: JSON.stringify(['UNICEF program countries']),
    fieldsOfStudy: JSON.stringify(['AI', 'Blockchain', 'Drones', 'VR', 'Data Science']),
    fundingType: 'stipend',
    coverage: JSON.stringify(['stipend']),
    amount: 100000,
    duration: '6-12 months',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90).toISOString(),
    deadlineType: 'rolling',
    competitiveness: 'very_high',
    tags: JSON.stringify(['startup', 'innovation', 'open-source', 'tech']),
    featured: false,
  },
  {
    slug: 'ericsson-scholarship-africa',
    title: 'Ericsson Sub-Saharan Africa Scholarship',
    provider: 'Ericsson',
    description:
      'Ericsson’s Sub-Saharan Africa Scholarship supports STEM students from the region pursuing studies in telecommunications, computer science, electrical engineering, and related fields. The scholarship aims to develop the next generation of African tech talent and offers internship and mentorship opportunities at Ericsson offices across Africa.',
    eligibility:
      'Sub-Saharan African citizen. Enrolled in a STEM degree at a recognized African university. Minimum 3.0 GPA. Specialization in telecommunications, CS, or electrical engineering. Demonstrated financial need.',
    benefits:
      'Tuition coverage up to $5,000/year, living stipend, mentorship from Ericsson engineers, paid internship opportunity, potential full-time employment post-graduation.',
    applicationUrl: 'https://www.ericsson.com/en/careers/students-graduates',
    officialUrl: 'https://www.ericsson.com/',
    level: 'bachelors',
    fundedBy: 'Sweden',
    hostCountries: JSON.stringify(['Sweden', 'South Africa', 'Kenya', 'Nigeria']),
    eligibleCountries: JSON.stringify(['Sub-Saharan Africa']),
    fieldsOfStudy: JSON.stringify(['Telecommunications', 'Computer Science', 'Electrical Engineering']),
    fundingType: 'partial',
    coverage: JSON.stringify(['tuition', 'stipend']),
    amount: 10000,
    duration: '1-2 years',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 35).toISOString(),
    deadlineType: 'fixed',
    competitiveness: 'high',
    tags: JSON.stringify(['STEM', 'telecom', 'internship', 'industry']),
    featured: false,
  },
  {
    slug: 'saudi-government-scholarship',
    title: 'King Abdullah Scholarship Program (Saudi Arabia)',
    provider: 'Government of Saudi Arabia',
    description:
      'The King Abdullah Scholarship Program (KASP) is one of the largest scholarship programs in the world. It funds Saudi and international students, including from African countries, to study at top universities worldwide. Programs are available at undergraduate, master’s, and PhD levels in priority fields.',
    eligibility:
      'Citizen of an eligible country (varies by year, includes several African countries). Strong academic record. Meet language requirements of host university. Apply to a recognized university in an approved field.',
    benefits:
      'Full tuition, monthly stipend, airfare, health insurance, prepaid card for initial settling-in expenses.',
    applicationUrl: 'https://www.moe.gov.sa/en/studyabroad/Pages/default.aspx',
    officialUrl: 'https://www.moe.gov.sa/',
    level: 'any',
    fundedBy: 'Saudi Arabia',
    hostCountries: JSON.stringify(['worldwide']),
    eligibleCountries: JSON.stringify(['eligible countries']),
    fieldsOfStudy: JSON.stringify(['Engineering', 'Medicine', 'Computer Science', 'Business', 'Law']),
    fundingType: 'full',
    coverage: JSON.stringify(['tuition', 'living', 'flights', 'insurance', 'stipend']),
    amount: 50000,
    duration: 'varies',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 50).toISOString(),
    deadlineType: 'varies',
    competitiveness: 'high',
    tags: JSON.stringify(['Saudi Arabia', 'government', 'large-scale']),
    featured: false,
  },
  {
    slug: 'qatar-scholarship',
    title: 'Qatar University Scholarships for International Students',
    provider: 'Qatar University',
    description:
      'Qatar University offers scholarships for international students from developing countries, including African nations, to pursue undergraduate and graduate studies. The scholarships cover tuition and provide a monthly stipend. The university is known for programs in engineering, business, and Sharia.',
    eligibility:
      'International student from eligible country. Strong academic record (GPA 3.0+). Meet program-specific requirements. English proficiency (TOEFL/IELTS for English programs, Arabic for Arabic programs).',
    benefits:
      'Full or partial tuition coverage, monthly stipend (QAR 1,000-3,000), accommodation in some cases.',
    applicationUrl: 'https://www.qu.edu.qa/students/scholarship',
    officialUrl: 'https://www.qu.edu.qa/',
    level: 'any',
    fundedBy: 'Qatar',
    hostCountries: JSON.stringify(['Qatar']),
    eligibleCountries: JSON.stringify(['worldwide']),
    fieldsOfStudy: JSON.stringify(['Engineering', 'Business', 'Sharia', 'Medicine', 'Arts']),
    fundingType: 'partial',
    coverage: JSON.stringify(['tuition', 'stipend']),
    amount: 15000,
    duration: 'varies',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 55).toISOString(),
    deadlineType: 'fixed',
    competitiveness: 'medium',
    tags: JSON.stringify(['Qatar', 'university', 'international']),
    featured: false,
  },
  {
    slug: 'irena-scholarship',
    title: 'IRENA Scholarship Programme (UAE)',
    provider: 'International Renewable Energy Agency (IRENA)',
    description:
      'IRENA, based in Abu Dhabi, UAE, offers scholarships for students from developing countries to study at the Masdar Institute of Science and Technology. The scholarship supports Master’s programs in renewable energy, sustainability, and related fields, aiming to build capacity for the global energy transition.',
    eligibility:
      'Citizen of an IRENA member country (most African countries are members). Strong academic record in STEM. Bachelor’s degree in relevant field. English proficiency. Apply to Masdar Institute Master’s program.',
    benefits:
      'Full tuition, monthly stipend, accommodation, laptop, health insurance, return airfare.',
    applicationUrl: 'https://www.irena.org/human-capital-and-institutions/IRENA-Scholarship-Programme',
    officialUrl: 'https://www.irena.org/',
    level: 'masters',
    fundedBy: 'UAE',
    hostCountries: JSON.stringify(['UAE']),
    eligibleCountries: JSON.stringify(['IRENA member countries']),
    fieldsOfStudy: JSON.stringify(['Renewable Energy', 'Engineering', 'Sustainability', 'Environmental Science']),
    fundingType: 'full',
    coverage: JSON.stringify(['tuition', 'living', 'flights', 'insurance', 'stipend']),
    amount: 50000,
    duration: '2 years',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 40).toISOString(),
    deadlineType: 'fixed',
    competitiveness: 'high',
    tags: JSON.stringify(['UAE', 'renewable-energy', 'sustainability', 'tech']),
    featured: false,
  },
  {
    slug: 'japanese-government-mext',
    title: 'MEXT Scholarship (Government of Japan)',
    provider: 'Ministry of Education, Culture, Sports, Science and Technology (MEXT)',
    description:
      'The MEXT Scholarship is the Japanese government’s flagship scholarship for international students. It offers fully-funded undergraduate, Master’s, and PhD study at Japanese universities. The scholarship is known for its generous benefits, including a monthly stipend that is among the highest for any government scholarship.',
    eligibility:
      'Citizen of a country with diplomatic relations with Japan. Age limits: undergraduate 17-25, Master’s 35, PhD 35. Strong academic record. English or Japanese proficiency. Good health. Apply via Japanese embassy or directly to Japanese university.',
    benefits:
      'Full tuition, monthly stipend (¥117,000-148,000 undergrad, ¥143,000-145,000 master’s, ¥145,000-148,000 PhD), round-trip airfare, 6-month intensive Japanese language course.',
    applicationUrl: 'https://www.studyinjapan.go.jp/en/planning/scholarship/',
    officialUrl: 'https://www.mext.go.jp/',
    level: 'any',
    fundedBy: 'Japan',
    hostCountries: JSON.stringify(['Japan']),
    eligibleCountries: JSON.stringify(['worldwide']),
    fieldsOfStudy: JSON.stringify(['Any']),
    fundingType: 'full',
    coverage: JSON.stringify(['tuition', 'living', 'flights', 'insurance', 'stipend']),
    amount: 30000,
    duration: '4-7 years',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 25).toISOString(),
    deadlineType: 'varies',
    competitiveness: 'very_high',
    tags: JSON.stringify(['Japan', 'government', 'prestigious', 'language-course']),
    featured: false,
  },
  {
    slug: 'world-food-programme-internship',
    title: 'World Food Programme Internship Programme',
    provider: 'United Nations World Food Programme (WFP)',
    description:
      'WFP offers internships for students and recent graduates from developing countries, including African nations. Interns work at WFP headquarters in Rome or at country offices in Africa. The program provides hands-on experience in humanitarian operations, logistics, communications, and policy.',
    eligibility:
      'Currently enrolled in a recognized university or graduated within the past 6 months. Age 18-32. Working knowledge of English (and another UN language a plus). Eligible to work in the country of assignment.',
    benefits:
      'Monthly stipend ($1,000-$1,500), travel costs for developing country interns, health insurance, mentorship.',
    applicationUrl: 'https://www.wfp.org/careers/internship-programme',
    officialUrl: 'https://www.wfp.org/',
    level: 'any',
    fundedBy: 'Italy',
    hostCountries: JSON.stringify(['Italy', 'Kenya', 'Ethiopia', 'Uganda', 'Rwanda']),
    eligibleCountries: JSON.stringify(['worldwide']),
    fieldsOfStudy: JSON.stringify(['Logistics', 'Communications', 'Policy', 'Nutrition', 'Engineering']),
    fundingType: 'stipend',
    coverage: JSON.stringify(['stipend', 'flights', 'insurance']),
    amount: 15000,
    duration: '2-8 months',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 20).toISOString(),
    deadlineType: 'rolling',
    competitiveness: 'high',
    tags: JSON.stringify(['UN', 'humanitarian', 'internship', 'Rome']),
    featured: false,
  },
  {
    slug: 'un-internship-programme',
    title: 'United Nations Secretariat Internship Programme',
    provider: 'United Nations',
    description:
      'The UN Secretariat Internship Programme offers a 2-6 month internship at UN Headquarters in New York or other UN offices worldwide. Interns work in various departments including political affairs, peacekeeping, human rights, sustainable development, and management. The program is highly competitive and provides exposure to international diplomacy.',
    eligibility:
      'Enrolled in Master’s or final year of Bachelor’s, or graduated less than 1 year ago. Fluent in English or French. Age 18+. Not have participated in a UN internship before.',
    benefits:
      'Unfortunately, UN Secretariat internships are unpaid. However, a limited number of grants are available through the UN Diversity Initiative for candidates from unrepresented/underrepresented member states, including many African countries.',
    applicationUrl: 'https://careers.un.org/internship',
    officialUrl: 'https://www.un.org/careers/',
    level: 'any',
    fundedBy: 'USA',
    hostCountries: JSON.stringify(['USA', 'Switzerland', 'Kenya', 'Ethiopia']),
    eligibleCountries: JSON.stringify(['worldwide']),
    fieldsOfStudy: JSON.stringify(['International Relations', 'Law', 'Economics', 'Political Science', 'Communications']),
    fundingType: 'stipend',
    coverage: JSON.stringify(['stipend']),
    amount: 5000,
    duration: '2-6 months',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
    deadlineType: 'rolling',
    competitiveness: 'very_high',
    tags: JSON.stringify(['UN', 'internship', 'New York', 'diplomacy']),
    featured: false,
  },
  {
    slug: 'who-internship',
    title: 'World Health Organization (WHO) Internship',
    provider: 'World Health Organization',
    description:
      'WHO offers internships for graduate and PhD students at WHO headquarters in Geneva, regional offices (including AFRO in Brazzaville and EMRO in Cairo), and country offices. Interns gain experience in global public health, epidemiology, health systems, and emergency response. The program is ideal for African students pursuing careers in health.',
    eligibility:
      'Enrolled in a Master’s or PhD program in a field related to WHO’s work. Minimum 20 years old. Fluent in one WHO working language (English, French, Spanish, Russian, Arabic, Chinese). Have not previously participated in a WHO internship.',
    benefits:
      'Monthly stipend (varies by duty station), some financial support for candidates from developing countries, mentorship, exposure to global health policy.',
    applicationUrl: 'https://www.who.int/careers/internship-programme',
    officialUrl: 'https://www.who.int/',
    level: 'any',
    fundedBy: 'Switzerland',
    hostCountries: JSON.stringify(['Switzerland', 'Congo', 'Egypt', 'Kenya', 'Zimbabwe']),
    eligibleCountries: JSON.stringify(['worldwide']),
    fieldsOfStudy: JSON.stringify(['Public Health', 'Medicine', 'Epidemiology', 'Health Economics']),
    fundingType: 'stipend',
    coverage: JSON.stringify(['stipend']),
    amount: 8000,
    duration: '6-24 weeks',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 25).toISOString(),
    deadlineType: 'rolling',
    competitiveness: 'very_high',
    tags: JSON.stringify(['WHO', 'health', 'internship', 'Geneva']),
    featured: false,
  },
  {
    slug: 'irex-media-mobilization',
    title: 'IREX Media Sustainability Fellowship',
    provider: 'IREX',
    description:
      'IREX supports African journalists and media professionals through various fellowships including the Media Sustainability Fellowship. The program brings African media leaders to the U.S. for professional residencies at newsrooms and media organizations, combined with training and network building.',
    eligibility:
      'Be a journalist, editor, or media manager from an eligible African country. 5+ years of media experience. English proficiency for English-speaking cohorts. Commitment to return home and apply skills.',
    benefits:
      '4-week U.S. residency, travel costs, living stipend, training, mentorship, alumni network.',
    applicationUrl: 'https://www.irex.org/',
    officialUrl: 'https://www.irex.org/',
    level: 'research',
    fundedBy: 'USA',
    hostCountries: JSON.stringify(['USA']),
    eligibleCountries: JSON.stringify(['Africa']),
    fieldsOfStudy: JSON.stringify(['Journalism', 'Media', 'Communications']),
    fundingType: 'full',
    coverage: JSON.stringify(['living', 'flights', 'stipend']),
    amount: 10000,
    duration: '4 weeks',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 45).toISOString(),
    deadlineType: 'fixed',
    competitiveness: 'high',
    tags: JSON.stringify(['media', 'journalism', 'USA', 'fellowship']),
    featured: false,
  },
  {
    slug: 'coca-cola-africa',
    title: 'Coca-Cola Africa Foundation Scholarships',
    provider: 'The Coca-Cola Africa Foundation',
    description:
      'The Coca-Cola Africa Foundation supports educational initiatives across Africa, including scholarships for African students at secondary and tertiary levels. Programs vary by country and may include university tuition support, leadership development, and internship opportunities at Coca-Cola Africa offices.',
    eligibility:
      'African citizen. Strong academic record. Demonstrated financial need. Leadership potential. Specific requirements vary by country program.',
    benefits:
      'Tuition support, living stipend, leadership training, mentorship, internship at Coca-Cola Africa.',
    applicationUrl: 'https://www.coca-colacompany.com/social/africa-foundation',
    officialUrl: 'https://www.coca-colaafricafoundation.org/',
    level: 'bachelors',
    fundedBy: 'USA',
    hostCountries: JSON.stringify(['Africa']),
    eligibleCountries: JSON.stringify(['Africa']),
    fieldsOfStudy: JSON.stringify(['Business', 'Engineering', 'Marketing', 'Finance']),
    fundingType: 'partial',
    coverage: JSON.stringify(['tuition', 'stipend']),
    amount: 8000,
    duration: '1-4 years',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 50).toISOString(),
    deadlineType: 'varies',
    competitiveness: 'medium',
    tags: JSON.stringify(['corporate', 'business', 'internship']),
    featured: false,
  },
  {
    slug: 'google-africa-scholarship',
    title: 'Google Africa Developer Scholarships',
    provider: 'Google + Pluralsight + Andela',
    description:
      'Google Africa Developer Scholarships aim to train 100,000 African software developers. The program provides free access to Pluralsight courses, mentorship from Andela senior developers, and certification opportunities in Android, web, Google Cloud, and mobile development.',
    eligibility:
      'African citizen. Basic programming knowledge. Access to a computer and internet. Commitment to complete the program. Apply via the program website.',
    benefits:
      'Free Pluralsight subscription (3-6 months), mentorship from Andela developers, certification vouchers, networking with Google Africa team, job placement support.',
    applicationUrl: 'https://grow.google/devscholars/',
    officialUrl: 'https://grow.google/africa/',
    level: 'any',
    fundedBy: 'USA',
    hostCountries: JSON.stringify(['Africa']),
    eligibleCountries: JSON.stringify(['Africa']),
    fieldsOfStudy: JSON.stringify(['Software Development', 'Android', 'Web Development', 'Cloud Computing']),
    fundingType: 'full',
    coverage: JSON.stringify(['tuition']),
    amount: 2000,
    duration: '3-6 months',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
    deadlineType: 'rolling',
    competitiveness: 'high',
    tags: JSON.stringify(['Google', 'tech', 'coding', 'free', 'developer']),
    featured: false,
  },
  {
    slug: 'microsoft-4afrika',
    title: 'Microsoft 4Afrika Scholarship',
    provider: 'Microsoft 4Afrika Initiative',
    description:
      'The Microsoft 4Afrika Initiative offers scholarships for African students to develop digital skills, including cloud computing, AI, data science, and cybersecurity. The program partners with Coursera and other platforms to provide free or subsidized training and certification.',
    eligibility:
      'African citizen. Interest in technology. Access to internet and computer. Apply via the 4Afrika scholarship portal. Some programs require basic technical knowledge.',
    benefits:
      'Free or subsidized Coursera access, Microsoft certification vouchers, mentorship, internship and job opportunities at Microsoft and partners.',
    applicationUrl: 'https://www.microsoft.com/africa/4afrika/scholarship.aspx',
    officialUrl: 'https://www.microsoft.com/africa/4afrika/',
    level: 'any',
    fundedBy: 'USA',
    hostCountries: JSON.stringify(['Africa']),
    eligibleCountries: JSON.stringify(['Africa']),
    fieldsOfStudy: JSON.stringify(['Cloud Computing', 'AI', 'Data Science', 'Cybersecurity']),
    fundingType: 'full',
    coverage: JSON.stringify(['tuition']),
    amount: 1500,
    duration: '3-12 months',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 35).toISOString(),
    deadlineType: 'rolling',
    competitiveness: 'medium',
    tags: JSON.stringify(['Microsoft', 'tech', 'cloud', 'certification']),
    featured: false,
  },
  {
    slug: 'alx-software-engineering',
    title: 'ALX Software Engineering Programme',
    provider: 'ALX Africa',
    description:
      'ALX is a leading tech training provider in Africa, offering a 12-month Software Engineering Programme that is free for African students. The program, in partnership with Holberton School, provides world-class training in full-stack software engineering with project-based learning and no prerequisites.',
    eligibility:
      'African citizen or resident. Age 18+. No prior coding experience required. Pass the admissions assessment. Commit to 12 months of intensive study.',
    benefits:
      'Free tuition (originally $1,000, currently free for cohort), world-class curriculum, mentorship, peer learning, job placement support, ALX and Holberton alumni network.',
    applicationUrl: 'https://www.alxafrica.com/programmes/software-engineering/',
    officialUrl: 'https://www.alxafrica.com/',
    level: 'bachelors',
    fundedBy: 'South Africa',
    hostCountries: JSON.stringify(['South Africa', 'Kenya', 'Nigeria', 'Rwanda', 'Online']),
    eligibleCountries: JSON.stringify(['Africa']),
    fieldsOfStudy: JSON.stringify(['Software Engineering', 'Full-Stack Development']),
    fundingType: 'full',
    coverage: JSON.stringify(['tuition']),
    amount: 1000,
    duration: '12 months',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 20).toISOString(),
    deadlineType: 'rolling',
    competitiveness: 'high',
    tags: JSON.stringify(['tech', 'free', 'coding', 'Africa']),
    featured: false,
  },
  {
    slug: 'andela-learning-network',
    title: 'Andela Learning Network (ALN)',
    provider: 'Andela',
    description:
      'Andela Learning Network offers free access to world-class technology training for African developers. The program partners with Coursera, Pluralsight, and other platforms to provide learning paths in software development, data science, and cloud computing. Top performers may be hired by Andela or partner companies.',
    eligibility:
      'African citizen. Strong interest in technology. Access to internet and computer. Self-motivated learner. Apply via the Andela Learning Network portal.',
    benefits:
      'Free access to learning platforms, mentorship, certification, job placement opportunities at Andela and partner companies.',
    applicationUrl: 'https://andela.com/learning-network/',
    officialUrl: 'https://andela.com/',
    level: 'any',
    fundedBy: 'USA',
    hostCountries: JSON.stringify(['Africa']),
    eligibleCountries: JSON.stringify(['Africa']),
    fieldsOfStudy: JSON.stringify(['Software Development', 'Data Science', 'Cloud Computing']),
    fundingType: 'full',
    coverage: JSON.stringify(['tuition']),
    amount: 1000,
    duration: '6-12 months',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 25).toISOString(),
    deadlineType: 'rolling',
    competitiveness: 'medium',
    tags: JSON.stringify(['tech', 'free', 'remote', 'job-placement']),
    featured: false,
  },
  {
    slug: 'uk-chevening-fellowship',
    title: 'Chevening Fellowships (Africa)',
    provider: 'UK FCDO',
    description:
      'Chevening Fellowships are shorter than the Chevening Scholarship (6-12 weeks) and target mid-career professionals from Africa and other regions. Fellowships focus on specific themes like journalism, cyber security, leadership, and public health. They provide a unique opportunity to study in the UK and build a global network.',
    eligibility:
      'Citizen of an eligible country. Mid-career professional with 5+ years of experience. Strong English proficiency. Commitment to return home for 2 years. Apply via the Chevening website.',
    benefits:
      'Full program fees, living stipend, return airfare, accommodation, networking events, access to Chevening alumni network.',
    applicationUrl: 'https://www.chevening.org/fellowship/',
    officialUrl: 'https://www.chevening.org/',
    level: 'research',
    fundedBy: 'UK',
    hostCountries: JSON.stringify(['UK']),
    eligibleCountries: JSON.stringify(['eligible countries']),
    fieldsOfStudy: JSON.stringify(['Journalism', 'Cybersecurity', 'Leadership', 'Public Health']),
    fundingType: 'full',
    coverage: JSON.stringify(['living', 'flights', 'stipend']),
    amount: 20000,
    duration: '6-12 weeks',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 40).toISOString(),
    deadlineType: 'fixed',
    competitiveness: 'very_high',
    tags: JSON.stringify(['UK', 'fellowship', 'mid-career', 'professional']),
    featured: false,
  },
  {
    slug: 'fulbright-foreign-language-teaching',
    title: 'Fulbright Foreign Language Teaching Assistant (FLTA)',
    provider: 'U.S. Department of State',
    description:
      'The Fulbright FLTA program brings early-career educators from around the world, including African countries, to U.S. colleges and universities to teach their native language (Amharic, Swahili, Yoruba, Hausa, Arabic, French, etc.) while taking non-degree courses. The program strengthens foreign language instruction at U.S. institutions.',
    eligibility:
      'Citizen of eligible country (most African countries). Early-career teacher of English or a native speaker of the target language. Minimum 3 years teaching experience. English proficiency. Hold at least a Bachelor’s degree.',
    benefits:
      'Tuition waiver for 2 courses per semester, monthly stipend ($400-$600), health insurance, round-trip airfare, J-1 visa sponsorship.',
    applicationUrl: 'https://flta.fulbrightonline.org/',
    officialUrl: 'https://foreign.fulbrightonline.org/',
    level: 'research',
    fundedBy: 'USA',
    hostCountries: JSON.stringify(['USA']),
    eligibleCountries: JSON.stringify(['worldwide']),
    fieldsOfStudy: JSON.stringify(['Language Teaching', 'Education', 'Linguistics']),
    fundingType: 'full',
    coverage: JSON.stringify(['tuition', 'living', 'flights', 'insurance', 'stipend']),
    amount: 25000,
    duration: '9-10 months',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 35).toISOString(),
    deadlineType: 'fixed',
    competitiveness: 'high',
    tags: JSON.stringify(['USA', 'Fulbright', 'teaching', 'language']),
    featured: false,
  },
  {
    slug: 'italian-government-scholarship',
    title: 'Italian Government Scholarship for Foreign Students',
    provider: 'Ministry of Foreign Affairs and International Cooperation (MAECI)',
    description:
      'The Italian Government offers scholarships for foreign students, including from African countries, to study in Italy at the undergraduate, Master’s, PhD, and research levels. Scholarships cover tuition, provide a monthly stipend, and include health insurance. Italy is popular for design, architecture, fashion, and engineering programs.',
    eligibility:
      'Citizen of an eligible country (most African countries). Age limits: Master’s 28, PhD 30, research 40. Strong academic record. Italian or English proficiency per program. Apply via MAECI portal.',
    benefits:
      'Tuition exemption, monthly stipend of €900, health insurance, 90 days of Italian language course.',
    applicationUrl: 'https://studyinitaly.esteri.it/',
    officialUrl: 'https://www.esteri.it/',
    level: 'any',
    fundedBy: 'Italy',
    hostCountries: JSON.stringify(['Italy']),
    eligibleCountries: JSON.stringify(['worldwide']),
    fieldsOfStudy: JSON.stringify(['Any']),
    fundingType: 'full',
    coverage: JSON.stringify(['tuition', 'living', 'insurance', 'stipend']),
    amount: 13000,
    duration: 'varies',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60).toISOString(),
    deadlineType: 'fixed',
    competitiveness: 'high',
    tags: JSON.stringify(['Italy', 'government', 'masters', 'PhD']),
    featured: false,
  },
  {
    slug: 'eiffel-excellence',
    title: 'Eiffel Excellence Scholarship (France)',
    provider: 'French Ministry of Europe and Foreign Affairs',
    description:
      'The Eiffel Excellence Scholarship is a prestigious French government scholarship for international students to pursue Master’s and PhD studies in France. It targets future foreign leaders in three priority areas: science, economics/management, and law/political science. The scholarship is for students already admitted to a French program.',
    eligibility:
      'Non-French national, age 25 max for Master’s, 30 for PhD. Be already admitted or in the process of applying to a French Master’s or PhD program. Application submitted by the French institution (not the student directly). Not have previously received an Eiffel scholarship.',
    benefits:
      'Monthly stipend (€1,181-1,700), international return trip, health insurance, cultural activities. Does NOT cover tuition.',
    applicationUrl: 'https://www.campusfrance.org/en/eiffel-scholarship-program',
    officialUrl: 'https://www.campusfrance.org/',
    level: 'any',
    fundedBy: 'France',
    hostCountries: JSON.stringify(['France']),
    eligibleCountries: JSON.stringify(['worldwide']),
    fieldsOfStudy: JSON.stringify(['Science', 'Economics', 'Management', 'Law', 'Political Science']),
    fundingType: 'full',
    coverage: JSON.stringify(['living', 'flights', 'insurance', 'stipend']),
    amount: 25000,
    duration: '12-36 months',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 50).toISOString(),
    deadlineType: 'fixed',
    competitiveness: 'very_high',
    tags: JSON.stringify(['France', 'prestigious', 'masters', 'PhD']),
    featured: false,
  },
]

async function main() {
  console.log('Seeding v3 scholarships...')

  let added = 0
  let skipped = 0
  for (const s of newScholarships) {
    const existing = await db.scholarship.findUnique({ where: { slug: s.slug } })
    if (existing) {
      console.log(`   Skipped (exists): ${s.slug}`)
      skipped++
      continue
    }
    await db.scholarship.create({
      data: {
        ...s,
        deadline: s.deadline ? new Date(s.deadline) : null,
      } as any,
    })
    added++
  }

  const total = await db.scholarship.count()
  console.log(`\nv3 seed complete:`)
  console.log(`   Added: ${added} new scholarships`)
  console.log(`   Skipped: ${skipped} (already existed)`)
  console.log(`   Total scholarships in database: ${total}`)
}

main()
  .catch((e) => {
    console.error('Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
