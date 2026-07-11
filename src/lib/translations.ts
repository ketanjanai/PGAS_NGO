export type Language = 'en' | 'kn' | 'hi';

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
    heroHeading: "Every Child Deserves Quality Education",
    heroSub: "Thousands of children in rural Karnataka dream of becoming doctors, teachers, and leaders. Your ₹100 donation can help change a life.",
    ourWork: "Our Work",
    eduTitle: "Contribution to Rural Education",
    eduDesc: "Providing textbooks, stationery, and learning materials to underprivileged students across 25 villages in Karnataka.",
    hygieneTitle: "Improving Hygiene Facilities",
    hygieneDesc: "Promoting hygiene awareness, school sanitation programs, and community health initiatives across villages of Athani.",
    teamTitle: "Leadership Team",
    teamSub: "Meet the dedicated board members guiding our mission in Athani, Belagavi.",
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
  },
  kn: {
    label: "ಕನ್ನಡ",
    home: "ಮುಖಪುಟ",
    impact: "ನಮ್ಮ ಪ್ರಭಾವ",
    transparency: "ಪಾರದರ್ಶಕತೆ",
    csr: "ಸಿಎಸ್‌ಆರ್ ಪೋರ್ಟಲ್",
    donate: "ಈಗಲೇ ದೇಣಿಗೆ ನೀಡಿ",
    heroHeading: "ಪ್ರತಿ ಮಗುವೂ ಗುಣಮಟ್ಟದ ಶಿಕ್ಷಣಕ್ಕೆ ಅರ್ಹ",
    heroSub: "ಗ್ರಾಮೀಣ ಕರ್ನಾಟಕದ ಸಾವಿರಾರು ಮಕ್ಕಳು ವೈದ್ಯರು, ಶಿಕ್ಷಕರು ಮತ್ತು ನಾಯಕರಾಗುವ ಕನಸು ಕಾಣುತ್ತಿದ್ದಾರೆ. ನಿಮ್ಮ ₹100 ದೇಣಿಗೆ ಜೀವನವನ್ನು ಬದಲಾಯಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
    ourWork: "ನಮ್ಮ ಕೆಲಸ",
    eduTitle: "ಗ್ರಾಮೀಣ ಶಿಕ್ಷಣ ಕೊಡುಗೆ",
    eduDesc: "ಕರ್ನಾಟಕದ 25 ಹಳ್ಳಿಗಳ ಹಿಂದುಳಿದ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಪಠ್ಯಪುಸ್ತಕಗಳು, ಸ್ಟೇಷನರಿ ಮತ್ತು ಕಲಿಕಾ ಸಾಮಗ್ರಿಗಳನ್ನು ಒದಗಿಸುವುದು.",
    hygieneTitle: "ನೈರ್ಮಲ್ಯ ಸೌಲಭ್ಯಗಳ ಸುಧಾರಣೆ",
    hygieneDesc: "ಅಥಣಿ ತಾಲೂಕಿನ ಹಳ್ಳಿಗಳಲ್ಲಿ ನೈರ್ಮಲ್ಯ ಜಾಗೃತಿ, ಶಾಲಾ ಸ್ವಚ್ಛತೆ ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಸಮುದಾಯ ಆರೋಗ್ಯ ಉಪಕ್ರಮಗಳನ್ನು ಉತ್ತೇಜಿಸುವುದು.",
    teamTitle: "ನಾಯಕತ್ವ ತಂಡ",
    teamSub: "ಅಥಣಿ, ಬೆಳಗಾವಿಯಲ್ಲಿ ನಮ್ಮ ಮಿಷನ್ ಅನ್ನು ಮುನ್ನಡೆಸುತ್ತಿರುವ ಸಮರ್ಪಿತ ಮಂಡಳಿ ಸದಸ್ಯರನ್ನು ಭೇಟಿ ಮಾಡಿ.",
    donationTitle: "ನೇರ ಪ್ರಭಾವ",
    donationSub: "ಯಾವುದೇ UPI ಅಪ್ಲಿಕೇಶನ್ ಮೂಲಕ ತಕ್ಷಣವೇ ದೇಣಿಗೆ ನೀಡಲು QR ಕೋಡ್ ಅನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ.",
    taxBenefit: "80G ತೆರಿಗೆ ಪ್ರಯೋಜನಗಳು ಲಭ್ಯವಿದೆ",
    scanToDonate: "ದಾನ ಮಾಡಲು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
    footerTag: "ಶ್ರೀ ಪದ್ಮಾವತಿ ಗ್ರಾಮೀಣ ಅಭಿವೃದ್ಧಿ ಸಂಸ್ಥೆ (PGAS)",
    viewGallery: "ಗ್ಯಾಲರಿ ವೀಕ್ಷಿಸಿ",
    gallery: "ಗ್ಯಾಲರಿ",
    galleryTitle: "ತೀವ್ರ ಪ್ರಭಾವ. ಕ್ರಿಯೆಯಲ್ಲಿ ಸೆರೆಹಿಡಿಯಲಾಗಿದೆ.",
    galleryDesc: "ಶ್ರೀ ಪದ್ಮಾವತಿ ಗ್ರಾಮೀಣ ಅಭಿವೃದ್ಧಿ ಸಂಸ್ಥೆ (PGAS) ವತಿಯಿಂದ ಗ್ರಾಮೀಣ ಕರ್ನಾಟಕದಲ್ಲಿ ಕಲಿಕೆ, ಸಬಲೀಕರಣ ಮತ್ತು ಸಮುದಾಯ ನೈರ್ಮಲ್ಯ ಕಾರ್ಯಾಗಾರಗಳ ಕ್ಷಣಗಳು.",
    allContributions: "ಎಲ್ಲಾ ಕೊಡುಗೆಗಳು",
    stories: "ಪರಿಣಾಮದ ಕಥೆಗಳು",
    contactUs: "ಸಂಪರ್ಕಿಸಿ",
    selectLanguage: "ಭಾಷೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿ",
    transparencyTitle: "ಪಾರದರ್ಶಕತೆ ಮತ್ತು ನಂಬಿಕೆ",
    transparencyDesc: "ನೈತಿಕ ಆಡಳಿತ ಮತ್ತು ಸಾರ್ವಜನಿಕ ಹೊಣೆಗಾರಿಕೆಗೆ ನಮ್ಮ ಬದ್ಧತೆ.",
    csrTitle: "ಕಾರ್ಪೊರೇಟ್ ಸಾಮಾಜಿಕ ಹೊಣೆಗಾರಿಕೆ",
    csrDesc: "ಸುಸ್ಥಿರ ಗ್ರಾಮೀಣ ಅಭಿವೃದ್ಧಿಯನ್ನು ಉತ್ತೇಜಿಸಲು ನಮ್ಮೊಂದಿಗೆ ಪಾಲುದಾರರಾಗಿ.",
    formName: "ಪೂರ್ಣ ಹೆಸರು",
    formEmail: "ಇಮೇಲ್ ವಿಳಾಸ",
    formPhone: "ದೂರವಾಣಿ ಸಂಖ್ಯೆ",
    formMessage: "ನಿಮ್ಮ ಸಂದೇಶ",
    formSubmit: "ಸಲ್ಲಿಸಿ",
    donationFormTitle: "ದೇಣಿಗೆ ವಿವರಗಳು",
    donationFormSub: "QR ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡುವ ಮೊದಲು ದಯವಿಟ್ಟು ನಿಮ್ಮ ವಿವರಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ.",
    addressLabel: "ವಿಳಾಸ",
    phoneLabel: "ದೂರವಾಣಿ",
    emailLabel: "ಇಮೇಲ್",
    bankTransfer: "ಬ್ಯಾಂಕ್ ವರ್ಗಾವಣೆ",
    monthlyDonor: "ಮಾಸಿಕ ದಾನಿಯಾಗಿ",
    corporateCsr: "ಕಾರ್ಪೊರೇಟ್ ಸಿಎಸ್‌ಆರ್ ಪಾಲುದಾರರು",
    secureContribution: "ಸುರಕ್ಷಿತ ಕೊಡುಗೆ",
    receiptAvailable: "ದೇಣಿಗೆ ರಶೀದಿ ಲಭ್ಯವಿದೆ",
    supportRural: "ಗ್ರಾಮೀಣ ಕರ್ನಾಟಕವನ್ನು ಬೆಂಬಲಿಸಿ",
    learnMore: "ಹೆಚ್ಚು ತಿಳಿಯಿರಿ",
    close: "ಮುಚ್ಚಿ",
    prev: "ಹಿಂದಿನ",
    next: "ಮುಂದಿನ",
    slides: [
      {
        title: "ಪ್ರತಿ ಮಗುವೂ ಗುಣಮಟ್ಟದ ಶಿಕ್ಷಣಕ್ಕೆ ಅರ್ಹ",
        sub: "ಅಥಣಿಯ ಸಾವಿರಾರು ಗ್ರಾಮೀಣ ಮಕ್ಕಳು ಉನ್ನತ ಗುಣಮಟ್ಟದ ಕಲಿಕೆ, ಆಧುನಿಕ ಸಂಪನ್ಮೂಲಗಳು ಮತ್ತು ಉತ್ತಮ ವೃತ್ತಿಜೀವನದ ಕನಸು ಕಾಣುತ್ತಿದ್ದಾರೆ."
      },
      {
        title: "ಗ್ರಾಮೀಣ ಗ್ರಾಮಗಳು ಮತ್ತು ಸಮುದಾಯಗಳ ಸಬಲೀಕರಣ",
        sub: "ಸಕ್ರಿಯ ನಾಯಕತ್ವ, ಸುಸ್ಥಿರ ಅಭಿವೃದ್ಧಿ ಮಾದರಿಗಳು ಮತ್ತು ತಳಮಟ್ಟದಲ್ಲಿ ಡಿಜಿಟಲ್ ಅವಕಾಶಗಳನ್ನು ಪೋಷಿಸುವುದು."
      },
      {
        title: "ನೈರ್ಮಲ್ಯ ಸೌಲಭ್ಯಗಳ ಸುಧಾರಣೆ",
        sub: "ಶಾಲಾ ನೈರ್ಮಲ್ಯ ಅಭಿಯಾನಗಳು, ಸಮುದಾಯ ಕ್ಷೇಮ ಕಾರ್ಯಾಗಾರಗಳು ಮತ್ತು ಕೈ ತೊಳೆಯುವ ಜಾಗೃತಿ ಮೂಡಿಸುವುದು."
      },
      {
        title: "ಭವಿಷ್ಯದ ನಾಯಕರು ಮತ್ತು ಉದ್ಯಮಿಗಳನ್ನು ಬೆಳೆಸುವುದು",
        sub: "ಗ್ರಾಮೀಣ ಹೆಣ್ಣು ಮಕ್ಕಳಿಗಾಗಿ ಯುವ ಕೌಶಲ್ಯ ಕಾರ್ಯಕ್ರಮಗಳು, ಕಂಪ್ಯೂಟರ್ ಸಾಕ್ಷರತೆ ಮತ್ತು ಡಿಜಿಟಲ್ ಕೌಶಲ್ಯ ತರಬೇತಿಯಲ್ಲಿ ಹೂಡಿಕೆ."
      }
    ]
  },
  hi: {
    label: "हिन्दी",
    home: "होम",
    impact: "हमारा प्रभाव",
    transparency: "पारदर्शिता",
    csr: "सीएसआर पोर्टल",
    donate: "अभी दान करें",
    heroHeading: "हर बच्चा गुणवत्तापूर्ण शिक्षा का हकदार है",
    heroSub: "ग्रामीण कर्नाटक के हजारों बच्चे डॉक्टर, शिक्षक और नेता बनने का सपना देखते हैं। आपका ₹100 का दान जीवन बदलने में मदद कर सकता है।",
    ourWork: "हमारा कार्य",
    eduTitle: "ग्रामीण शिक्षा में योगदान",
    eduDesc: "कर्नाटक के 25 गांवों के वंचित छात्रों को पाठ्यपुस्तकें, स्टेशनरी और शिक्षण सामग्री प्रदान करना।",
    hygieneTitle: "स्वच्छता सुविधाओं में सुधार",
    hygieneDesc: "अथानी के गांवों में स्वच्छता जागरूकता, स्कूल स्वच्छता कार्यक्रम और सामुदायिक स्वास्थ्य पहल को बढ़ावा देना।",
    teamTitle: "नेतृत्व टीम",
    teamSub: "अथानी, बेलगावी में हमारे मिशन का मार्गदर्शन करने वाले समर्पित बोर्ड सदस्यों से मिलें।",
    donationTitle: "सीधा प्रभाव",
    donationSub: "किसी भी UPI ऐप के माध्यम से तुरंत योगदान करने के लिए QR कोड स्कैन करें।",
    taxBenefit: "80G टैक्स लाभ उपलब्ध है",
    scanToDonate: "दान करने के लिए स्कैन करें",
    footerTag: "श्री पद्मावती ग्रामीण अभिवृद्धि संस्थे (PGAS)",
    viewGallery: "गैलरी देखें",
    gallery: "गैलरी",
    galleryTitle: "गहन प्रभाव। सक्रिय रूप में कैद।",
    galleryDesc: "ग्रामीण कर्नाटक में श्री पद्मावती ग्रामीण अभिवृद्धि संस्थे (PGAS) द्वारा सीखने, सशक्तिकरण और सामुदायिक स्वच्छता कार्यशालाओं के क्षण।",
    allContributions: "सभी योगदान",
    stories: "प्रभाव की कहानियां",
    contactUs: "संपर्क करें",
    selectLanguage: "भाषा चुनें",
    transparencyTitle: "पारदर्शिता और विश्वास",
    transparencyDesc: "नैतिक शासन और सार्वजनिक जवाबदेही के प्रति हमारी प्रतिबद्धता।",
    csrTitle: "कॉरपोरेट सामाजिक उत्तरदायित्व",
    csrDesc: "सतत ग्रामीण विकास को गति देने के लिए हमारे साथ भागीदार बनें।",
    formName: "पूरा नाम",
    formEmail: "ईमेल पता",
    formPhone: "फ़ोन नंबर",
    formMessage: "आपका संदेश",
    formSubmit: "जमा करें",
    donationFormTitle: "दान का विवरण",
    donationFormSub: "क्यूआर कोड स्कैन करने से पहले कृपया अपना विवरण साझा करें।",
    addressLabel: "पता",
    phoneLabel: "फ़ोन",
    emailLabel: "ईमेल",
    bankTransfer: "बैंक ट्रांसफर",
    monthlyDonor: "मासिक दाता बनें",
    corporateCsr: "कॉरपोरेट सीएसआर पार्टनर",
    secureContribution: "सुरक्षित योगदान",
    receiptAvailable: "दान रसीद उपलब्ध है",
    supportRural: "ग्रामीण कर्नाटक का समर्थन करें",
    learnMore: "अधिक जानें",
    close: "बंद करें",
    prev: "पिछला",
    next: "अगला",
    slides: [
      {
        title: "हर बच्चा गुणवत्तापूर्ण शिक्षा का हकदार है",
        sub: "अथानी के हजारों ग्रामीण बच्चे उच्च गुणवत्ता वाली शिक्षा, आधुनिक संसाधनों और बेहतर करियर के अवसर का सपना देखते हैं।"
      },
      {
        title: "ग्रामीण गांवों और समुदायों का सशक्तिकरण",
        sub: "सक्रिय नेतृत्व, सतत विकास मॉडल और जमीनी स्तर पर डिजिटल अवसरों को बढ़ावा देना।"
      },
      {
        title: "स्वच्छता सुविधाओं में सुधार",
        sub: "स्कूल स्वच्छता अभियान, सामुदायिक कल्याण कार्यशालाएं और हाथ धोने के प्रति जागरूकता अभियान चलाना।"
      },
      {
        title: "भविष्य के नेताओं और उद्यमियों को तैयार करना",
        sub: "ग्रामीण छात्राओं के लिए युवा कौशल कार्यक्रमों, कंप्यूटर साक्षरता और डिजिटल कौशल प्रशिक्षण में निवेश।"
      }
    ]
  }
};
