export type Language = 'en';

export interface TranslationSchema {
  label: string;
  home: string;
  impact: string;
  transparency: string;
  csr: string;
  donate: string;
  heroHeading: string;
  heroSub: string;
  ourWork: string;
  eduTitle: string;
  eduDesc: string;
  hygieneTitle: string;
  hygieneDesc: string;
  teamTitle: string;
  teamSub: string;
  donationTitle: string;
  donationSub: string;
  taxBenefit: string;
  scanToDonate: string;
  footerTag: string;
  viewGallery: string;
  gallery: string;
  galleryTitle: string;
  galleryDesc: string;
  allContributions: string;
  stories: string;
  contactUs: string;
  selectLanguage: string;
  transparencyTitle: string;
  transparencyDesc: string;
  csrTitle: string;
  csrDesc: string;
  formName: string;
  formEmail: string;
  formPhone: string;
  formMessage: string;
  formSubmit: string;
  donationFormTitle: string;
  donationFormSub: string;
  addressLabel: string;
  phoneLabel: string;
  emailLabel: string;
  bankTransfer: string;
  monthlyDonor: string;
  corporateCsr: string;
  secureContribution: string;
  receiptAvailable: string;
  supportRural: string;
  learnMore: string;
  close: string;
  prev: string;
  next: string;
  slides: {
    title: string;
    sub: string;
  }[];
}

export const translations: Record<Language, TranslationSchema> = {
  en: {
    label: "English",
    home: "Home",
    impact: "Our Impact",
    transparency: "Transparency",
    csr: "CSR Portal",
    donate: "Donate Now",
    heroHeading: "Empowering Rural Karnataka Through Education & Health",
    heroSub: "We are committed to quality education and hygiene for every student. Join us in building a sustainable future for rural communities.",
    ourWork: "Our Mission",
    eduTitle: "Quality Education for All",
    eduDesc: "Bridging the gap in rural education by providing essential learning tools and modern infrastructure to underprivileged students.",
    hygieneTitle: "Health, Hygiene & Sanitation",
    hygieneDesc: "Implementing clean water solutions and robust sanitation facilities to ensure a healthy learning environment in every village.",
    teamTitle: "Our Dedicated Team",
    teamSub: "Meet the visionary leaders and social workers behind Shri Padmavati Grameen Abhivruddhi Sansthe.",
    donationTitle: "Direct Impact",
    donationSub: "Scan the QR code to contribute instantly via any UPI app.",
    taxBenefit: "80G Tax Benefits Available",
    scanToDonate: "Scan to Donate",
    footerTag: "Shri Padmavati Grameen Abhivruddhi Sansthe (PGAS)",
    viewGallery: "View Gallery",
    gallery: "Gallery",
    galleryTitle: "Radical Impact. Captured in Action.",
    galleryDesc: "Moments of learning, empowerment, and community hygiene workshops from Shri Padmavati Grameen Abhivruddhi Sansthe (PGAS) in rural Karnataka.",
    allContributions: "All Contributions",
    stories: "Impact Stories",
    contactUs: "Contact Us",
    selectLanguage: "Select Language",
    transparencyTitle: "Transparency & Trust",
    transparencyDesc: "Our commitment to ethical governance and public accountability.",
    csrTitle: "Corporate Social Responsibility",
    csrDesc: "Partner with us to drive sustainable rural development.",
    formName: "Full Name",
    formEmail: "Email Address",
    formPhone: "Phone Number",
    formMessage: "Your Message",
    formSubmit: "Submit",
    donationFormTitle: "Donation Details",
    donationFormSub: "Please share your details before scanning the QR code.",
    addressLabel: "Address",
    phoneLabel: "Phone",
    emailLabel: "Email",
    bankTransfer: "Bank Transfer",
    monthlyDonor: "Become Monthly Donor",
    corporateCsr: "Corporate CSR Partner",
    secureContribution: "Secure Contribution",
    receiptAvailable: "Donation Receipt Available",
    supportRural: "Support Rural Karnataka",
    learnMore: "Learn More",
    close: "Close",
    prev: "Previous",
    next: "Next",
    slides: [
      {
        title: "Every Child Deserves Quality Education",
        sub: "Thousands of rural children in Athani dream of high-quality learning, modern resources, and better career pathways."
      },
      {
        title: "Empowering Rural Villages & Communities",
        sub: "Fostering active leadership, sustainable development models, and digital opportunities at the grassroots."
      },
      {
        title: "Improving Hygiene Facilities",
        sub: "Driving school sanitation campaigns, community wellness workshops, and handwashing awareness."
      },
      {
        title: "Nurturing Future Leaders & Entrepreneurs",
        sub: "Investing in youth skill programs, computer literacy, and digital skill training for rural girl students."
      }
    ]
  }
};
