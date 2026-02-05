// backend/i18nBase.js

const base = {
  en: {
    auth: {
      logo: 'KAAMWALI.AI',
      welcomeBack: 'Welcome back!',
      createAccount: 'Create your account',
      iAmWorker: 'I am a worker',
      iAmEmployer: 'I am an employer',
      login: 'Log in',
      signup: 'Sign up',
      emailPhone: 'Email / Phone',
      emailPhonePlaceholder: 'Enter your email or phone',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
      forgotPassword: 'Forgot password?',
      loginButton: 'Log in',
      name: 'Name',
      namePlaceholder: 'Enter your name',
      fullNamePlaceholder: 'Enter your full name',
      email: 'Email',
      emailPlaceholder: 'you@example.com',
      phoneNumber: 'Phone number',
      phonePlaceholder: '+91 98XXXXXXX',
      city: 'City',
      cityPlaceholder: 'e.g. Gurugram',
      cityArea: 'City / Area',
      cityAreaPlaceholder: 'e.g. Saket, South Delhi',
      passwordMin: 'Minimum 6 characters',
      workerConsent: 'I agree to share my profile with verified homes.',
      employerConsent: 'I agree to contact workers respectfully and fairly.',
      createAccountButton: 'Create account',
    },
    voiceOnboarding: {
      initialTitle: 'Tell us about yourself using only your voice',
      initialHint:
        'Tap and speak in your language. Your speech will appear as text below.',
      initialContinue: 'Continue',
      askingTitle: 'We need a bit more information',
      back: 'Back',
      next: 'Next',
      saving: 'Saving…',
      finalizingTitle: 'Creating your profile…',
      finalizingSub:
        'We are putting together your answers into a clear profile that employers can understand quickly.',
    },
    questions: {
      name: 'What is your full name? Please say your name clearly.',
      cityArea: 'Which city and area do you live in?',
      age: 'How old are you? Say your age in years, like 25.',
      experienceYears:
        'For how many years have you been doing this work? Say it in numbers, like 3 years.',
      skills:
        'Which tasks can you do well? Cleaning, cooking, childcare, elder care, or something else?',
      expectedSalary:
        'What monthly salary do you expect? Say a number, for example 8000 or 10000 rupees.',
      availability:
        'At what time can you work? Morning, afternoon, or evening? And which days of the week?',
      workType:
        'What kind of work arrangement do you prefer? Full-time, part-time, live-in, or live-out?',
      daysOff:
        'How many days off do you need in a week, and which day do you prefer as your weekly off?',
      medicalConditions:
        'Do you have any medical conditions or allergies, like dust allergy, issues with pets, or difficulty lifting heavy items?',
      willingLateOrTravel:
        'If needed, are you willing to occasionally stay late or travel with the family?',
      previousEmployerRef:
        'Can you share the name and phone number of a previous employer we can talk to?',
      emergencyContact:
        'Who can we call in an emergency? Please say their name and phone number.',
      comfortableWithFamilies:
        'Are you comfortable working with joint or large families? Yes or no.',
      comfortableWithPets:
        'Are you comfortable working in homes with pets like dogs or cats? Yes or no.',
    },
    examples: {
      initialExampleMain:
        '“My name is Sunita. I have 5 years of experience in cleaning and cooking in Bhiwani. I am available from 7am to 11am.”',
    },
    workerDashboard: {
  tagline: 'Voice-first jobs for domestic workers',
  myProfile: 'My profile',
  workOpportunities: 'Work opportunities',
  tryDemo: 'Try demo',

  heroTitle: 'Voice-first hiring for domestic workers',
  heroSubtitle:
    'Keep your profile updated, improve your trust score, and discover better work opportunities in nearby areas.',

  startVoice: 'Start voice onboarding',
  viewProfile: 'View my profile',

  dashboardTitle: 'KaamWali.AI dashboard',
  workerView: 'Worker view',

  city: 'City',
  skill: 'Skill',
  experience: 'Experience',

  yourProfile: 'Your profile',
  completeDetails: 'Complete your details to get more calls',
  profile: 'Profile',
  trustScore: 'Trust score',
  inProgress: 'In progress',

  newOpportunities: 'New opportunities',
  nearbyHomes: 'Homes nearby looking for help',
  nearby: 'Nearby',
  active: 'Active',
  comingSoon: 'Coming soon',

  savedHomes: 'Saved homes',
  likedHomes: 'Homes you liked or worked with',
  repeatWork: 'Repeat work',
  trusted: 'Trusted',
  zeroSaved: '0 saved',

  howItWorks: 'How KaamWali.AI works for you',

  step1Title: 'Speak, don’t type',
  step1Text:
    'You answer simple questions in your native language using your voice.',

  step2Title: 'Profile and trust score',
  step2Text:
    'KaamWali.AI turns your answers into a clear profile with a growing trust score.',

  step3Title: 'Homes find you',
  step3Text:
    'Nearby homes discover you by area and skills and contact you directly.',
},
  },

  hi: {
    auth: {
      logo: 'KAAMWALI.AI',
      welcomeBack: 'वापस स्वागत है!',
      createAccount: 'अपना खाता बनाएं',
      iAmWorker: 'मैं एक कर्मचारी हूं',
      iAmEmployer: 'मैं एक नियोक्ता हूं',
      login: 'लॉग इन',
      signup: 'साइन अप',
      emailPhone: 'ईमेल / फोन',
      emailPhonePlaceholder: 'अपना ईमेल या फोन दर्ज करें',
      password: 'पासवर्ड',
      passwordPlaceholder: 'अपना पासवर्ड दर्ज करें',
      forgotPassword: 'पासवर्ड भूल गए?',
      loginButton: 'लॉग इन',
      name: 'नाम',
      namePlaceholder: 'अपना नाम दर्ज करें',
      fullNamePlaceholder: 'अपना पूरा नाम दर्ज करें',
      email: 'ईमेल',
      emailPlaceholder: 'you@example.com',
      phoneNumber: 'फ़ोन नंबर',
      phonePlaceholder: '+91 98XXXXXXX',
      city: 'शहर',
      cityPlaceholder: 'जैसे गुरुग्राम',
      cityArea: 'शहर / क्षेत्र',
      cityAreaPlaceholder: 'जैसे साकेत, दक्षिण दिल्ली',
      passwordMin: 'न्यूनतम 6 वर्ण',
      workerConsent:
        'मैं सत्यापित घरों के साथ अपनी प्रोफ़ाइल साझा करने के लिए सहमत हूं।',
      employerConsent:
        'मैं कर्मचारियों से सम्मानपूर्वक संपर्क करने के लिए सहमत हूं।',
      createAccountButton: 'खाता बनाएं',
    },
    voiceOnboarding: {
      initialTitle: 'अपनी जानकारी सिर्फ आवाज़ से बताइए',
      initialHint:
        'टैप करें और हिंदी या सिंपल इंग्लिश में बात करें। आपकी आवाज़ नीचे टेक्स्ट में दिखाई देगी।',
      initialContinue: 'आगे बढ़ें',
      askingTitle: 'थोड़ी और जानकारी चाहिए',
      back: 'पीछे',
      next: 'आगे',
      saving: 'सेव हो रहा है…',
      finalizingTitle: 'आपकी प्रोफ़ाइल बन रही है…',
      finalizingSub:
        'हम आपके सभी जवाबों को एक साफ़ और सिंपल प्रोफ़ाइल में डाल रहे हैं जिसे एम्प्लॉयर जल्दी समझ सकें।',
    },
    questions: {
      name: 'आपका पूरा नाम क्या है? कृपया अपना नाम साफ़‑साफ़ बताएं।',
      cityArea: 'आप किस जगह में रहती हैं? शहर और एरिया का नाम बताएं।',
      age: 'आपकी उम्र कितनी है? नंबर में बताएं, जैसे 25 साल।',
      experienceYears:
        'आप कितने साल से घर का काम कर रही हैं? नंबर में बताएं, जैसे 3 साल।',
      skills:
        'आपको कौन‑कौन से काम अच्छे से आते हैं? सफाई, खाना बनाना, बच्चों का ध्यान, बुज़ुर्गों की देखभाल या कुछ और?',
      expectedSalary:
        'आप महीने का कितना पैसा चाहती हैं? नंबर में बताएं, जैसे 8000 या 10000 रुपये।',
      availability:
        'आप किस समय काम कर सकती हैं? सुबह, दोपहर या शाम? हफ़्ते के कौन‑कौन से दिन काम कर सकती हैं?',
      workType:
        'आपको कैसा काम पसंद है? फुल‑टाइम, पार्ट‑टाइम, लाइव‑इन या लाइव‑आउट?',
      daysOff:
        'आपको हफ़्ते में कितने दिन छुट्टी चाहिए? कौन‑सा दिन आप वीकली ऑफ़ लेना पसंद करेंगी?',
      medicalConditions:
        'क्या आपको कोई मेडिकल प्रॉब्लम या एलर्जी है? जैसे धूल से, पालतू जानवरों से, या भारी सामान उठाने में दिक्कत?',
      willingLateOrTravel:
        'ज़रूरत पड़ने पर क्या आप कभी‑कभी देर तक रुकने या परिवार के साथ ट्रैवल करने के लिए तैयार हैं?',
      previousEmployerRef:
        'आपने पहले जहाँ काम किया, उनमें से किसी एक का नाम और फ़ोन नंबर बता सकती हैं?',
      emergencyContact:
        'इमरजेंसी के लिए किसका फ़ोन नंबर दिया जा सकता है? नाम और नंबर बताएं।',
      comfortableWithFamilies:
        'क्या आप जॉइंट फ़ैमिली या बड़े परिवार के साथ काम करने में कंफ़र्टेबल हैं? हाँ या नहीं।',
      comfortableWithPets:
        'क्या आप कुत्ते या बिल्ली जैसे पालतू जानवर वाले घर में काम करने में कंफ़र्टेबल हैं? हाँ या नहीं।',
    },
    examples: {
      initialExampleMain:
        '“मेरा नाम सुनीता है। मैं 5 साल से भिवानी में सफ़ाई और खाना बनाने का काम कर रही हूँ। मैं सुबह 7 से 11 बजे तक काम कर सकती हूँ।”',
    },
    workerDashboard: {
  tagline: 'घरेलू कामगारों के लिए वॉइस-आधारित नौकरियां',
  myProfile: 'मेरी प्रोफाइल',
  workOpportunities: 'काम के अवसर',
  tryDemo: 'डेमो आज़माएं',

  heroTitle: 'घरेलू कामगारों के लिए वॉइस-फर्स्ट हायरिंग',
  heroSubtitle:
    'अपनी प्रोफाइल अपडेट रखें, ट्रस्ट स्कोर बढ़ाएं और अपने आसपास बेहतर काम खोजें।',

  startVoice: 'वॉइस ऑनबोर्डिंग शुरू करें',
  viewProfile: 'मेरी प्रोफाइल देखें',

  dashboardTitle: 'KaamWali.AI डैशबोर्ड',
  workerView: 'वर्कर व्यू',

  city: 'शहर',
  skill: 'कौशल',
  experience: 'अनुभव',

  yourProfile: 'आपकी प्रोफाइल',
  completeDetails: 'अधिक कॉल पाने के लिए अपनी जानकारी पूरी करें',
  profile: 'प्रोफाइल',
  trustScore: 'ट्रस्ट स्कोर',
  inProgress: 'प्रगति में',

  newOpportunities: 'नए अवसर',
  nearbyHomes: 'आस-पास के घर काम ढूंढ रहे हैं',
  nearby: 'नजदीक',
  active: 'सक्रिय',
  comingSoon: 'जल्द आ रहा है',

  savedHomes: 'सेव किए गए घर',
  likedHomes: 'जिन घरों को आपने पसंद किया',
  repeatWork: 'बार-बार काम',
  trusted: 'विश्वसनीय',
  zeroSaved: '0 सेव',

  howItWorks: 'KaamWali.AI आपके लिए कैसे काम करता है',

  step1Title: 'बोलें, टाइप नहीं',
  step1Text:
    'आप अपनी भाषा में आवाज़ से सवालों के जवाब देते हैं।',

  step2Title: 'प्रोफाइल और ट्रस्ट स्कोर',
  step2Text:
    'आपके जवाबों से एक साफ प्रोफाइल और ट्रस्ट स्कोर बनता है।',

  step3Title: 'घर आपको ढूंढते हैं',
  step3Text:
    'आस-पास के घर आपके कौशल देखकर आपसे संपर्क करते हैं।',
},
  },

  // TELUGU
  te: {
    auth: {
      logo: 'KAAMWALI.AI',
      welcomeBack: 'తిరిగి స్వాగతం!',
      createAccount: 'మీ ఖాతా సృష్టించండి',
      iAmWorker: 'నేను వర్కర్‌ని',
      iAmEmployer: 'నేను ఎంప్లాయర్‌ని',
      login: 'లాగిన్',
      signup: 'సైన్ అప్',
      emailPhone: 'ఈమెయిల్ / ఫోన్',
      emailPhonePlaceholder: 'మీ ఈమెయిల్ లేదా ఫోన్‌ను నమోదు చేయండి',
      password: 'పాస్‌వర్డ్',
      passwordPlaceholder: 'మీ పాస్‌వర్డ్‌ను నమోదు చేయండి',
      forgotPassword: 'పాస్‌వర్డ్ మర్చిపోయారా?',
      loginButton: 'లాగిన్',
      name: 'పేరు',
      namePlaceholder: 'మీ పేరు నమోదు చేయండి',
      fullNamePlaceholder: 'మీ పూర్తి పేరు నమోదు చేయండి',
      email: 'ఈమెయిల్',
      emailPlaceholder: 'you@example.com',
      phoneNumber: 'ఫోన్ నంబర్',
      phonePlaceholder: '+91 98XXXXXXX',
      city: 'నగరం',
      cityPlaceholder: 'ఉదా. గురుగ్రామ్',
      cityArea: 'నగరం / ప్రాంతం',
      cityAreaPlaceholder: 'ఉదా. సాకేత్, సౌత్ ఢిల్లీ',
      passwordMin: 'కనీసం 6 అక్షరాలు',
      workerConsent:
        'నా ప్రొఫైల్‌ను ధృవీకరించిన ఇళ్లతో పంచుకోవడానికి నేను అంగీకరిస్తున్నాను.',
      employerConsent:
        'వర్కర్లను గౌరవంగా, న్యాయంగా సంప్రదించేందుకు నేను అంగీకరిస్తున్నాను.',
      createAccountButton: 'ఖాతా సృష్టించండి',
    },
    voiceOnboarding: {
      initialTitle: 'మీ గురించి మీ స్వరంతో మాత్రమే చెప్పండి',
      initialHint:
        'ట్యాప్ చేసి మీ భాషలో మాట్లాడండి. మీ మాటలు కింద టెక్స్ట్‌గా కనిపిస్తాయి.',
      initialContinue: 'కొనసాగించండి',
      askingTitle: 'కొంచం మరిన్ని వివరాలు కావాలి',
      back: 'వెనక్కి',
      next: 'తర్వాత',
      saving: 'సేవ్ అవుతోంది…',
      finalizingTitle: 'మీ ప్రొఫైల్ తయారవుతోంది…',
      finalizingSub:
        'మీ జవాబులను స్పష్టమైన ప్రొఫైల్‌లో మార్చి, ఎంప్లాయర్లు సులభంగా అర్థం చేసుకునేలా చేస్తున్నాం.',
    },
    questions: {
      name: 'మీ పూర్తి పేరు ఏమిటి? దయచేసి స్పష్టంగా చెప్పండి.',
      cityArea: 'మీరు ఏ నగరంలో, ఏ ఏరియాలో ఉంటున్నారు?',
      age: 'మీ వయసెంత? ఉదాహరణకు 25 లాంటి సంఖ్యలో చెప్పండి.',
      experienceYears:
        'ఈ పని మీరు ఎన్ని సంవత్సరాలుగా చేస్తున్నారు? ఉదాహరణకు 3 సంవత్సరాలు.',
      skills:
        'మీకు ఏ పనులు బాగా వస్తాయి? శుభ్రపరచడం, వంట, పిల్లల సంరక్షణ, వృద్ధుల సంరక్షణ లేదా ఇంకేదైనా?',
      expectedSalary:
        'మీకు నెలకు ఎంత జీతం కావాలి? ఉదాహరణకు 8000 లేదా 10000 రూపాయలు.',
      availability:
        'మీరు ఏ సమయానికి పని చేయగలరు? ఉదయం, మధ్యాహ్నం లేదా సాయంత్రం? వారం లో ఏ రోజులు పని చేయగలరు?',
      workType:
        'మీకు ఏ రకం పని ఎక్కువగా నచ్చుతుంది? ఫుల్‑టైమ్, పార్ట్‑టైమ్, లైవ్‑ఇన్ లేదా లైవ్‑ఔట్?',
      daysOff:
        'మీకు వారం లో ఎన్ని రోజుల సెలవు కావాలి? ఏ రోజు వీక్లీ ఆఫ్‌గా కావాలి?',
      medicalConditions:
        'మీకు ఏమైనా ఆరోగ్య సమస్యలు లేదా అలర్జీలు ఉన్నాయా? ధూళి, పెట్స్ లేదా బరువైన సామాను ఎత్తడంలో ఇబ్బంది వంటివి?',
      willingLateOrTravel:
        'అవసరం అయితే కొన్నిసార్లు ఆలస్యంగా ఉండటానికి లేదా కుటుంబంతో ప్రయాణానికి మీరు సిద్ధంగా ఉన్నారా?',
      previousEmployerRef:
        'మీరుముందు పని చేసిన యజమానుల్లో ఎవరి పేరు, ఫోన్ నంబర్ ఇవ్వగలరు?',
      emergencyContact:
        'తక్షణ పరిస్థితిలో ఎవరికి ఫోన్ చేయాలి? వారి పేరు మరియు ఫోన్ నంబర్ చెప్పండి.',
      comfortableWithFamilies:
        'జాయింట్ ఫ్యామిలీ లేదా పెద్ద కుటుంబంలో పని చేయడంలో మీకు సౌకర్యంగా ఉంటుందా? అవును లేదా కాదు.',
      comfortableWithPets:
        'కుక్కలు, పిల్లులు వంటి పెట్స్ ఉన్న ఇళ్లలో పని చేయడంలో మీకు సౌకర్యంగా ఉంటుందా? అవును లేదా కాదు.',
    },
    examples: {
      initialExampleMain:
        '“నా పేరు సునీత. నేను 5 సంవత్సరాలుగా భివానీలో ఇంటి పనులు, శుభ్రపరచడం మరియు వంట పని చేస్తూ ఉన్నాను. నేను ఉదయం 7 నుండి 11 గంటల వరకు పని చేయగలను.”',
    },
    workerDashboard: {
  tagline: 'గృహ కార్మికుల కోసం వాయిస్ ఆధారిత ఉద్యోగాలు',
  myProfile: 'నా ప్రొఫైల్',
  workOpportunities: 'పని అవకాశాలు',
  tryDemo: 'డెమో ప్రయత్నించండి',

  heroTitle: 'గృహ కార్మికుల కోసం వాయిస్ ఆధారిత నియామకం',
  heroSubtitle:
    'మీ ప్రొఫైల్‌ను అప్డేట్ చేయండి, ట్రస్ట్ స్కోర్‌ను మెరుగుపరచండి మరియు మీ సమీపంలో మంచి పనిని కనుగొనండి.',

  startVoice: 'వాయిస్ ఆన్‌బోర్డింగ్ ప్రారంభించండి',
  viewProfile: 'నా ప్రొఫైల్ చూడండి',

  dashboardTitle: 'KaamWali.AI డాష్‌బోర్డ్',
  workerView: 'వర్కర్ వ్యూ',

  city: 'నగరం',
  skill: 'నైపుణ్యం',
  experience: 'అనుభవం',

  yourProfile: 'మీ ప్రొఫైల్',
  completeDetails: 'మరిన్ని కాల్స్ పొందడానికి మీ వివరాలను పూర్తి చేయండి',
  profile: 'ప్రొఫైల్',
  trustScore: 'ట్రస్ట్ స్కోర్',
  inProgress: 'ప్రగతిలో',

  newOpportunities: 'కొత్త అవకాశాలు',
  nearbyHomes: 'సమీప ఇళ్లు పని కోసం చూస్తున్నాయి',
  nearby: 'సమీపంలో',
  active: 'యాక్టివ్',
  comingSoon: 'త్వరలో వస్తుంది',

  savedHomes: 'సేవ్ చేసిన ఇళ్లు',
  likedHomes: 'మీకు నచ్చిన లేదా పనిచేసిన ఇళ్లు',
  repeatWork: 'మళ్లీ పని',
  trusted: 'నమ్మకమైన',
  zeroSaved: '0 సేవ్',

  howItWorks: 'KaamWali.AI మీ కోసం ఎలా పనిచేస్తుంది',

  step1Title: 'టైప్ చేయకుండా మాట్లాడండి',
  step1Text: 'మీ స్వంత భాషలో వాయిస్ ద్వారా ప్రశ్నలకు సమాధానం ఇవ్వండి.',

  step2Title: 'ప్రొఫైల్ మరియు ట్రస్ట్ స్కోర్',
  step2Text: 'మీ సమాధానాలను స్పష్టమైన ప్రొఫైల్‌గా మార్చి ట్రస్ట్ స్కోర్ పెంచుతుంది.',

  step3Title: 'ఇళ్లు మిమ్మల్ని కనుగొంటాయి',
  step3Text: 'సమీప ఇళ్లు మీ నైపుణ్యాల ఆధారంగా మిమ్మల్ని సంప్రదిస్తాయి.',
},
  },

  // KANNADA
  kn: {
    auth: {
      logo: 'KAAMWALI.AI',
      welcomeBack: 'ಮತ್ತೆ ಸ್ವಾಗತ!',
      createAccount: 'ನಿಮ್ಮ ಖಾತೆಯನ್ನು ರಚಿಸಿ',
      iAmWorker: 'ನಾನು ಕೆಲಸಗಾರ',
      iAmEmployer: 'ನಾನು ಉದ್ಯೋಗದಾತ',
      login: 'ಲಾಗಿನ್',
      signup: 'ಸೈನ್ ಅಪ್',
      emailPhone: 'ಇಮೇಲ್ / ಫೋನ್',
      emailPhonePlaceholder: 'ನಿಮ್ಮ ಇಮೇಲ್ ಅಥವಾ ಫೋನ್ ನಮೂದಿಸಿ',
      password: 'ಪಾಸ್‌ವರ್ಡ್',
      passwordPlaceholder: 'ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ',
      forgotPassword: 'ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿರಾ?',
      loginButton: 'ಲಾಗಿನ್',
      name: 'ಹೆಸರು',
      namePlaceholder: 'ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ',
      fullNamePlaceholder: 'ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ',
      email: 'ಇಮೇಲ್',
      emailPlaceholder: 'you@example.com',
      phoneNumber: 'ಫೋನ್ ನಂಬರ್',
      phonePlaceholder: '+91 98XXXXXXX',
      city: 'ನಗರ',
      cityPlaceholder: 'ಉದಾ. ಗುರ್ಗ್ರಾಮ್',
      cityArea: 'ನಗರ / ಪ್ರದೇಶ',
      cityAreaPlaceholder: 'ಉದಾ. ಸಕೇತ್, ಸೌತ್ ದೆಹಲಿ',
      passwordMin: 'ಕನಿಷ್ಠ 6 ಅಕ್ಷರಗಳು',
      workerConsent:
        'ದೃಢೀಕೃತ ಮನೆಗಳೊಂದಿಗೆ ನನ್ನ ಪ್ರೊಫೈಲ್ ಹಂಚಿಕೊಳ್ಳಲು ನಾನು ಒಪ್ಪುತ್ತೇನೆ.',
      employerConsent:
        'ವರ್ಕರ್‌ಗಳನ್ನು ಗೌರವದಿಂದ ಮತ್ತು ನ್ಯಾಯವಾಗಿ ಸಂಪರ್ಕಿಸಲು ನಾನು ಒಪ್ಪುತ್ತೇನೆ.',
      createAccountButton: 'ಖಾತೆ ರಚಿಸಿ',
    },
    voiceOnboarding: {
      initialTitle: 'ನಿಮ್ಮ ಬಗ್ಗೆ ನಿಮ್ಮ ಧ್ವನಿಯಿಂದ ಮಾತ್ರ ಹೇಳಿ',
      initialHint:
        'ಟ್ಯಾಪ್ ಮಾಡಿ ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಮಾತನಾಡಿ. ನಿಮ್ಮ ಮಾತು ಕೆಳಗೆ ಪಠ್ಯವಾಗಿ ಕಾಣುತ್ತದೆ.',
      initialContinue: 'ಮುಂದುವರಿಸಿ',
      askingTitle: 'ಸ್ವಲ್ಪ ಇನ್ನಷ್ಟೂ ಮಾಹಿತಿಯ ಅಗತ್ಯವಿದೆ',
      back: 'ಹಿಂದೆ',
      next: 'ಮುಂದೆ',
      saving: 'ಉಳಿಸುತ್ತಿದೆ…',
      finalizingTitle: 'ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಸಿದ್ಧಗೊಳ್ಳುತ್ತಿದೆ…',
      finalizingSub:
        'ನಿಮ್ಮ ಉತ್ತರಗಳನ್ನು ಸ್ಪಷ್ಟವಾದ ಪ್ರೊಫೈಲ್ ಆಗಿ ರೂಪಿಸುತ್ತಿದ್ದೇವೆ, ώστε ಉದ್ಯೋಗದಾತರು ಬೇಗ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು.',
    },
    questions: {
      name: 'ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು ಏನು? ದಯವಿಟ್ಟು ಸ್ಪಷ್ಟವಾಗಿ ಹೇಳಿ.',
      cityArea: 'ನೀವು ಯಾವ ನಗರ ಮತ್ತು ಪ್ರದೇಶದಲ್ಲಿ ವಾಸಿಸುತ್ತೀರಿ?',
      age: 'ನಿಮ್ಮ ವಯಸ್ಸು ಎಷ್ಟು? ಉದಾಹರಣೆಗೆ 25 ಸಂಖ್ಯೆಯಲ್ಲಿ ಹೇಳಿ.',
      experienceYears:
        'ಈ ಕೆಲಸವನ್ನು ನೀವು ಎಷ್ಟು ವರ್ಷಗಳಿಂದ ಮಾಡುತ್ತಿದ್ದೀರಿ? ಉದಾಹರಣೆಗೆ 3 ವರ್ಷ.',
      skills:
        'ನಿಮಗೆ ಯಾವ ಕೆಲಸಗಳು ಚೆನ್ನಾಗಿ ಬರುತ್ತವೆ? ಸ್ವಚ್ಛತೆ, ಅಡುಗೆ, ಮಕ್ಕಳ ಕಾಳಜಿ, ವೃದ್ಧರ ಕಾಳಜಿ ಅಥವಾ ಇನ್ನಾವುದೇ?',
      expectedSalary:
        'ನೀವು ತಿಂಗಳಿಗೆ ಎಷ್ಟು ಸಂಬಳ ನಿರೀಕ್ಷಿಸುತ್ತೀರಿ? ಉದಾಹರಣೆಗೆ 8000 ಅಥವಾ 10000 ರೂಪಾಯಿ.',
      availability:
        'ನೀವು ಯಾವ ಸಮಯದಲ್ಲಿ ಕೆಲಸ ಮಾಡಬಹುದು? ಬೆಳಿಗ್ಗೆ, ಮಧ್ಯಾಹ್ನ ಅಥವಾ ಸಂಜೆ? ವಾರದಲ್ಲಿ ಯಾವ ದಿನಗಳು ಕೆಲಸ ಮಾಡಬಹುದು?',
      workType:
        'ನಿಮಗೆ ಯಾವ ರೀತಿಯ ಕೆಲಸ ಸೂಕ್ತ? ಫುಲ್‑ಟೈಮ್, ಪಾರ್ಟ್‑ಟೈಮ್, ಲೈವ್‑ಇನ್ ಅಥವಾ ಲೈವ್‑ಔಟ್?',
      daysOff:
        'ನಿಮಗೆ ವಾರದಲ್ಲಿ ಎಷ್ಟು ದಿನ ರಜೆ ಬೇಕು? ಯಾವ ದಿನವನ್ನು ವೀಕ್ಲಿ ಆಫ್ ಆಗಿ ಇಚ್ಛಿಸುತ್ತೀರಿ?',
      medicalConditions:
        'ನಿಮಗೆ ಯಾವುದಾದರೂ ಆರೋಗ್ಯ ಸಮಸ್ಯೆ ಅಥವಾ ಅಲರ್ಜೀ ಇದೆಯೇ? ಧೂಳು, ಪೆಟ್ಸ್ ಅಥವಾ ಭಾರವಾದ ಸಾಮಾನು ಎತ್ತುವ ಸಮಸ್ಯೆ ಹೀಗೆ?',
      willingLateOrTravel:
        'ಅವಶ್ಯಕವಾದರೆ ಕೆಲವೊಮ್ಮೆ ತಡವಾಗಿ ಉಳಿಯಲು ಅಥವಾ ಕುಟುಂಬದೊಂದಿಗೆ ಪ್ರಯಾಣ ಮಾಡಲು ಸಿದ್ಧರಾಗಿದ್ದೀರಾ?',
      previousEmployerRef:
        'ಹಿಂದೆ ಕೆಲಸ ಮಾಡಿದ ಮನೆಗಳಲ್ಲಿ ಯಾರಾದರೂ ಒಬ್ಬರ ಹೆಸರು ಮತ್ತು ಫೋನ್ ನಂಬರ್ ಹೇಳಬಹುದು?',
      emergencyContact:
        'ತುರ್ತು ಪರಿಸ್ಥಿತಿಯಲ್ಲಿ ಯಾರಿಗೆ ಕರೆ ಮಾಡಬೇಕು? ಅವರ ಹೆಸರು ಮತ್ತು ಫೋನ್ ನಂಬರ್ ಹೇಳಿ.',
      comfortableWithFamilies:
        'ಜಂಟಿ ಕುಟುಂಬ ಅಥವಾ ದೊಡ್ಡ ಕುಟುಂಬದೊಂದಿಗೆ ಕೆಲಸ ಮಾಡಲು ನಿಮಗೆ ಅನುಕೂಲವಾಗುತ್ತದೆಯೇ? ಹೌದು ಅಥವಾ ಇಲ್ಲ.',
      comfortableWithPets:
        'ನಾಯಿಗಳು, ಬೆಕ್ಕುಗಳು ಇತ್ಯಾದಿ ಪೆಟ್ಸ್ ಇರುವ ಮನೆಗಳಲ್ಲಿ ಕೆಲಸ ಮಾಡಲು ನಿಮಗೆ ಅನುಕೂಲವಾಗುತ್ತದೆಯೇ? ಹೌದು ಅಥವಾ ಇಲ್ಲ.',
    },
    examples: {
      initialExampleMain:
        '“ನನ್ನ ಹೆಸರನ್ನು ಸುನಿತಾ ಎಂದು. ನಾನು 5 ವರ್ಷಗಳಿಂದ ಭಿವಾನಿಯಲ್ಲಿ ಸ್ವಚ್ಛತೆ ಮತ್ತು ಅಡುಗೆ ಕೆಲಸ ಮಾಡುತ್ತಿದ್ದೇನೆ. ನಾನು ಬೆಳಿಗ್ಗೆ 7 ರಿಂದ 11 ಗಂಟೆಯವರೆಗೆ ಕೆಲಸ ಮಾಡಬಹುದು.”',
    },
    workerDashboard: {
  tagline: 'ಗೃಹಕಾರ್ಮಿಕರಿಗಾಗಿ ಧ್ವನಿ ಆಧಾರಿತ ಕೆಲಸಗಳು',
  myProfile: 'ನನ್ನ ಪ್ರೊಫೈಲ್',
  workOpportunities: 'ಕೆಲಸದ ಅವಕಾಶಗಳು',
  tryDemo: 'ಡೆಮೊ ಪ್ರಯತ್ನಿಸಿ',

  heroTitle: 'ಗೃಹಕಾರ್ಮಿಕರಿಗಾಗಿ ವಾಯ್ಸ್-ಫಸ್ಟ್ ನೇಮಕಾತಿ',
  heroSubtitle:
    'ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ನವೀಕರಿಸಿ, ಟ್ರಸ್ಟ್ ಸ್ಕೋರ್ ಹೆಚ್ಚಿಸಿ ಮತ್ತು ನಿಮ್ಮ ಹತ್ತಿರ ಉತ್ತಮ ಕೆಲಸಗಳನ್ನು ಹುಡುಕಿ.',

  startVoice: 'ವಾಯ್ಸ್ ಆನ್‌ಬೋರ್ಡಿಂಗ್ ಪ್ರಾರಂಭಿಸಿ',
  viewProfile: 'ನನ್ನ ಪ್ರೊಫೈಲ್ ನೋಡಿ',

  dashboardTitle: 'KaamWali.AI ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
  workerView: 'ವರ್ಕರ್ ವೀಕ್ಷಣೆ',

  city: 'ನಗರ',
  skill: 'ಕೌಶಲ್ಯ',
  experience: 'ಅನುಭವ',

  yourProfile: 'ನಿಮ್ಮ ಪ್ರೊಫೈಲ್',
  completeDetails: 'ಹೆಚ್ಚು ಕರೆಗಳನ್ನು ಪಡೆಯಲು ವಿವರಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ',
  profile: 'ಪ್ರೊಫೈಲ್',
  trustScore: 'ಟ್ರಸ್ಟ್ ಸ್ಕೋರ್',
  inProgress: 'ಪ್ರಗತಿಯಲ್ಲಿ',

  newOpportunities: 'ಹೊಸ ಅವಕಾಶಗಳು',
  nearbyHomes: 'ಹತ್ತಿರದ ಮನೆಗಳು ಸಹಾಯ ಹುಡುಕುತ್ತಿವೆ',
  nearby: 'ಹತ್ತಿರ',
  active: 'ಸಕ್ರಿಯ',
  comingSoon: 'ಶೀಘ್ರದಲ್ಲೇ',

  savedHomes: 'ಸೇವ್ ಮಾಡಿದ ಮನೆಗಳು',
  likedHomes: 'ನೀವು ಇಷ್ಟಪಟ್ಟ ಮನೆಗಳು',
  repeatWork: 'ಮತ್ತೆ ಕೆಲಸ',
  trusted: 'ವಿಶ್ವಾಸಾರ್ಹ',
  zeroSaved: '0 ಸೇವ್',

  howItWorks: 'KaamWali.AI ನಿಮ್ಮಿಗಾಗಿ ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ',

  step1Title: 'ಟೈಪ್ ಮಾಡಬೇಡಿ, ಮಾತನಾಡಿ',
  step1Text: 'ನಿಮ್ಮ ಸ್ವಂತ ಭಾಷೆಯಲ್ಲಿ ಧ್ವನಿಯಿಂದ ಉತ್ತರ ನೀಡಿ.',

  step2Title: 'ಪ್ರೊಫೈಲ್ ಮತ್ತು ಟ್ರಸ್ಟ್ ಸ್ಕೋರ್',
  step2Text: 'ನಿಮ್ಮ ಉತ್ತರಗಳನ್ನು ಸ್ಪಷ್ಟ ಪ್ರೊಫೈಲ್ ಆಗಿ ರೂಪಿಸುತ್ತದೆ.',

  step3Title: 'ಮನೆಗಳು ನಿಮ್ಮನ್ನು ಹುಡುಕುತ್ತವೆ',
  step3Text: 'ಹತ್ತಿರದ ಮನೆಗಳು ನಿಮ್ಮ ಕೌಶಲ್ಯ ನೋಡಿ ಸಂಪರ್ಕಿಸುತ್ತವೆ.',
},
  },

  // MARATHI
  mr: {
    auth: {
      logo: 'KAAMWALI.AI',
      welcomeBack: 'परत स्वागत आहे!',
      createAccount: 'आपले खाते तयार करा',
      iAmWorker: 'मी कामगार आहे',
      iAmEmployer: 'मी नियोक्ता आहे',
      login: 'लॉगिन',
      signup: 'साइन अप',
      emailPhone: 'ईमेल / फोन',
      emailPhonePlaceholder: 'आपला ईमेल किंवा फोन टाका',
      password: 'पासवर्ड',
      passwordPlaceholder: 'आपला पासवर्ड टाका',
      forgotPassword: 'पासवर्ड विसरलात?',
      loginButton: 'लॉगिन',
      name: 'नाव',
      namePlaceholder: 'आपले नाव टाका',
      fullNamePlaceholder: 'आपले पूर्ण नाव टाका',
      email: 'ईमेल',
      emailPlaceholder: 'you@example.com',
      phoneNumber: 'फोन नंबर',
      phonePlaceholder: '+91 98XXXXXXX',
      city: 'शहर',
      cityPlaceholder: 'उदा. गुरुग्राम',
      cityArea: 'शहर / भाग',
      cityAreaPlaceholder: 'उदा. साकेत, दक्षिण दिल्ली',
      passwordMin: 'किमान 6 अक्षरे',
      workerConsent:
        'मी माझी प्रोफाइल सत्यापित घरांबरोबर शेअर करण्यास सहमत आहे.',
      employerConsent:
        'मी कामगारांशी आदराने आणि न्यायाने संपर्क करण्यास सहमत आहे.',
      createAccountButton: 'खाते तयार करा',
    },
    voiceOnboarding: {
      initialTitle: 'तुमच्या बद्दल फक्त आवाजातून सांगा',
      initialHint:
        'टॅप करा आणि तुमच्या भाषेत बोला. तुमचे बोललेले खाली मजकूर म्हणून दिसेल.',
      initialContinue: 'पुढे जा',
      askingTitle: 'थोडी अजून माहिती हवी आहे',
      back: 'मागे',
      next: 'पुढे',
      saving: 'सेव्ह होत आहे…',
      finalizingTitle: 'तुमची प्रोफाइल तयार होत आहे…',
      finalizingSub:
        'तुमचे सर्व उत्तर एका सोप्या आणि स्पष्ट प्रोफाइलमध्ये मांडत आहोत जे नियोक्त्यांना पटकन समजेल.',
    },
    questions: {
      name: 'तुमचं पूर्ण नाव काय आहे? कृपया स्पष्टपणे सांगा.',
      cityArea: 'तुम्ही कोणत्या शहरात आणि कोणत्या भागात राहता?',
      age: 'तुमचे वय किती आहे? उदाहरणार्थ २५ असे नंबरमध्ये सांगा.',
      experienceYears:
        'तुम्ही घरकाम किती वर्षांपासून करत आहात? उदाहरणार्थ ३ वर्ष.',
      skills:
        'तुम्हाला कोणकोणती कामं चांगली येतात? साफसफाई, स्वयंपाक, मुलांची काळजी, ज्येष्ठांची काळजी किंवा काही वेगळं?',
      expectedSalary:
        'तुम्हाला महिन्याला किती पगार हवा आहे? उदाहरणार्थ ८००० किंवा १०००० रुपये.',
      availability:
        'तुम्ही कोणत्या वेळेला काम करू शकता? सकाळ, दुपार किंवा संध्याकाळ? आठवड्यात कोणत्या दिवशी काम करू शकता?',
      workType:
        'तुम्हाला कोणत्या प्रकारचं काम आवडेल? फुल‑टाइम, पार्ट‑टाइम, लाईव्ह‑इन किंवा लाईव्ह‑आऊट?',
      daysOff:
        'तुम्हाला आठवड्यात किती दिवस सुट्टी हवी आहे? कोणता दिवस साप्ताहिक सुट्टीसाठी पसंत कराल?',
      medicalConditions:
        'तुम्हाला काही आरोग्याच्या तक्रारी किंवा अॅलर्जी आहेत का? जसे धूळ, पाळीव प्राणी किंवा जड वस्तू उचलण्यात अडचण?',
      willingLateOrTravel:
        'गरज पडल्यास कधी कधी उशिरापर्यंत थांबायला किंवा कुटुंबासोबत प्रवासाला जायला तयार आहात का?',
      previousEmployerRef:
        'ज्या घरात तुम्ही आधी काम केले, त्यांपैकी एखाद्याचे नाव आणि फोन नंबर सांगू शकता का?',
      emergencyContact:
        'इमर्जन्सी साठी कोणाचा फोन नंबर देऊ शकतो? त्यांचं नाव आणि नंबर सांगा.',
      comfortableWithFamilies:
        'जॉइंट फॅमिली किंवा मोठ्या कुटुंबासोबत काम करायला तुम्ही कम्फर्टेबल आहात का? होय किंवा नाही.',
      comfortableWithPets:
        'कुत्रे, मांजरी सारखे पाळीव प्राणी असलेल्या घरात काम करायला तुम्ही कम्फर्टेबल आहात का? होय किंवा नाही.',
    },
    examples: {
      initialExampleMain:
        '“माझं नाव सुनीता आहे. मी 5 वर्षांपासून भिवानीमध्ये साफसफाई आणि स्वयंपाकाचं काम करते. मी सकाळी 7 ते 11 वाजेपर्यंत काम करू शकते.”',
    },
    workerDashboard: {
  tagline: 'घरगुती कामगारांसाठी व्हॉइस-आधारित नोकऱ्या',
  myProfile: 'माझी प्रोफाइल',
  workOpportunities: 'कामाच्या संधी',
  tryDemo: 'डेमो वापरून पहा',

  heroTitle: 'घरगुती कामगारांसाठी व्हॉइस-फर्स्ट हायरिंग',
  heroSubtitle:
    'तुमची प्रोफाइल अपडेट ठेवा, ट्रस्ट स्कोर वाढवा आणि जवळच्या चांगल्या कामाच्या संधी शोधा.',

  startVoice: 'व्हॉइस ऑनबोर्डिंग सुरू करा',
  viewProfile: 'माझी प्रोफाइल पहा',

  dashboardTitle: 'KaamWali.AI डॅशबोर्ड',
  workerView: 'वर्कर व्ह्यू',

  city: 'शहर',
  skill: 'कौशल्य',
  experience: 'अनुभव',

  yourProfile: 'तुमची प्रोफाइल',
  completeDetails: 'जास्त कॉल मिळण्यासाठी माहिती पूर्ण करा',
  profile: 'प्रोफाइल',
  trustScore: 'ट्रस्ट स्कोर',
  inProgress: 'प्रगतीत',

  newOpportunities: 'नवीन संधी',
  nearbyHomes: 'जवळची घरे मदत शोधत आहेत',
  nearby: 'जवळ',
  active: 'सक्रिय',
  comingSoon: 'लवकरच येत आहे',

  savedHomes: 'सेव्ह केलेली घरे',
  likedHomes: 'ज्या घरांना तुम्ही पसंत केले',
  repeatWork: 'पुन्हा काम',
  trusted: 'विश्वासार्ह',
  zeroSaved: '0 सेव्ह',

  howItWorks: 'KaamWali.AI तुमच्यासाठी कसे काम करते',

  step1Title: 'टाइप करू नका, बोला',
  step1Text: 'तुमच्या भाषेत आवाजातून उत्तर द्या.',

  step2Title: 'प्रोफाइल आणि ट्रस्ट स्कोर',
  step2Text: 'तुमच्या उत्तरांपासून स्पष्ट प्रोफाइल तयार होते.',

  step3Title: 'घरे तुम्हाला शोधतात',
  step3Text: 'जवळची घरे तुमच्या कौशल्यावरून संपर्क करतात.',
},
  },

  // BENGALI
  bn: {
    auth: {
      logo: 'KAAMWALI.AI',
      welcomeBack: 'আবার স্বাগতম!',
      createAccount: 'আপনার একাউন্ট তৈরি করুন',
      iAmWorker: 'আমি একজন কর্মী',
      iAmEmployer: 'আমি একজন নিয়োগকর্তা',
      login: 'লগ ইন',
      signup: 'সাইন আপ',
      emailPhone: 'ইমেল / ফোন',
      emailPhonePlaceholder: 'আপনার ইমেল বা ফোন লিখুন',
      password: 'পাসওয়ার্ড',
      passwordPlaceholder: 'আপনার পাসওয়ার্ড লিখুন',
      forgotPassword: 'পাসওয়ার্ড ভুলে গেছেন?',
      loginButton: 'লগ ইন',
      name: 'নাম',
      namePlaceholder: 'আপনার নাম লিখুন',
      fullNamePlaceholder: 'আপনার পূর্ণ নাম লিখুন',
      email: 'ইমেল',
      emailPlaceholder: 'you@example.com',
      phoneNumber: 'ফোন নম্বর',
      phonePlaceholder: '+91 98XXXXXXX',
      city: 'শহর',
      cityPlaceholder: 'যেমন গুরগাঁও',
      cityArea: 'শহর / এলাকা',
      cityAreaPlaceholder: 'যেমন সাকেত, দক্ষিণ দিল্লি',
      passwordMin: 'ন্যূনতম ৬ অক্ষর',
      workerConsent:
        'আমি যাচাই করা বাড়িগুলোর সাথে আমার প্রোফাইল শেয়ার করতে সম্মত।',
      employerConsent:
        'আমি কর্মীদের সাথে সম্মানজনক ও ন্যায্যভাবে যোগাযোগ করতে সম্মত।',
      createAccountButton: 'একাউন্ট তৈরি করুন',
    },
    voiceOnboarding: {
      initialTitle: 'শুধু আপনার কণ্ঠে নিজের কথা বলুন',
      initialHint:
        'ট্যাপ করে আপনার ভাষায় কথা বলুন। আপনার বলা কথা নিচে লেখার মতো দেখা যাবে।',
      initialContinue: 'চালিয়ে যান',
      askingTitle: 'আরও কিছু তথ্য দরকার',
      back: 'পেছনে',
      next: 'পরের ধাপ',
      saving: 'সেভ হচ্ছে…',
      finalizingTitle: 'আপনার প্রোফাইল তৈরি হচ্ছে…',
      finalizingSub:
        'আপনার সব উত্তরকে একটি পরিষ্কার প্রোফাইলে সাজানো হচ্ছে যাতে নিয়োগদাতা দ্রুত বুঝতে পারেন।',
    },
    questions: {
      name: 'আপনার পুরো নাম কী? দয়া করে স্পষ্ট করে বলুন।',
      cityArea: 'আপনি কোন শহরে এবং কোন এলাকায় থাকেন?',
      age: 'আপনার বয়স কত? উদাহরণ হিসেবে ২৫ এর মতো সংখ্যা বলুন।',
      experienceYears:
        'এই ধরনের কাজ আপনি কত বছর ধরে করছেন? উদাহরণ হিসেবে ৩ বছর।',
      skills:
        'আপনি কোন কোন কাজ ভাল পারেন? ঘর পরিষ্কার, রান্না, বাচ্চাদের দেখাশোনা, বৃদ্ধদের দেখাশোনা নাকি অন্য কিছু?',
      expectedSalary:
        'মাসে আপনি কত টাকা বেতন আশা করেন? উদাহরণ হিসেবে ৮০০০ বা ১০০০০ টাকা।',
      availability:
        'আপনি কোন সময়ে কাজ করতে পারবেন? সকাল, দুপুর না সন্ধ্যা? সপ্তাহে কোন কোন দিন কাজ করতে পারবেন?',
      workType:
        'কোন ধরনের কাজের ব্যবস্থা আপনার পছন্দ? ফুল‑টাইম, পার্ট‑টাইম, লাইভ‑ইন নাকি লাইভ‑আউট?',
      daysOff:
        'আপনি সপ্তাহে কতদিন ছুটি চান? কোন দিনটিকে সাপ্তাহিক ছুটি হিসেবে রাখতে চান?',
      medicalConditions:
        'আপনার কি কোনও স্বাস্থ্য সমস্যা বা অ্যালার্জি আছে? যেমন ধূলায় অ্যালার্জি, পোষা প্রাণী, বা ভারী জিনিস তুলতে সমস্যা?',
      willingLateOrTravel:
        'প্রয়োজন হলে কি মাঝে মাঝে দেরি পর্যন্ত থাকতে বা পরিবারের সঙ্গে ভ্রমণে যেতে আপনি রাজি?',
      previousEmployerRef:
        'আপনি পূর্বে যেখানে কাজ করেছেন, সেখানে কারও নাম এবং ফোন নম্বর বলতে পারবেন?',
      emergencyContact:
        'জরুরি অবস্থায় কাকে ফোন করা যাবে? তার নাম এবং ফোন নম্বর বলুন।',
      comfortableWithFamilies:
        'জয়েন্ট ফ্যামিলি বা বড় পরিবারের সঙ্গে কাজ করতে আপনি স্বচ্ছন্দ বোধ করেন? হ্যাঁ বা না।',
      comfortableWithPets:
        'কুকুর, বিড়ালের মতো পোষা প্রাণী থাকা বাড়িতে কাজ করতে আপনি স্বচ্ছন্দ বোধ করেন? হ্যাঁ বা না।',
    },
    examples: {
      initialExampleMain:
        '“আমার নাম সুনীতা। আমি ৫ বছর ধরে ভিওয়ানিতে ঘর পরিষ্কার এবং রান্নার কাজ করছি। আমি সকাল ৭টা থেকে ১১টা পর্যন্ত কাজ করতে পারি।”',
    },
    workerDashboard: {
  tagline: 'গৃহকর্মীদের জন্য ভয়েস-ভিত্তিক কাজ',
  myProfile: 'আমার প্রোফাইল',
  workOpportunities: 'কাজের সুযোগ',
  tryDemo: 'ডেমো চেষ্টা করুন',

  heroTitle: 'গৃহকর্মীদের জন্য ভয়েস-ফার্স্ট নিয়োগ',
  heroSubtitle:
    'আপনার প্রোফাইল আপডেট রাখুন, ট্রাস্ট স্কোর বাড়ান এবং আশেপাশে ভালো কাজ খুঁজে নিন।',

  startVoice: 'ভয়েস অনবোর্ডিং শুরু করুন',
  viewProfile: 'আমার প্রোফাইল দেখুন',

  dashboardTitle: 'KaamWali.AI ড্যাশবোর্ড',
  workerView: 'ওয়ার্কার ভিউ',

  city: 'শহর',
  skill: 'দক্ষতা',
  experience: 'অভিজ্ঞতা',

  yourProfile: 'আপনার প্রোফাইল',
  completeDetails: 'আরও কল পেতে আপনার তথ্য সম্পূর্ণ করুন',
  profile: 'প্রোফাইল',
  trustScore: 'ট্রাস্ট স্কোর',
  inProgress: 'চলছে',

  newOpportunities: 'নতুন সুযোগ',
  nearbyHomes: 'আশেপাশের বাড়িগুলো সাহায্য খুঁজছে',
  nearby: 'কাছাকাছি',
  active: 'সক্রিয়',
  comingSoon: 'শীঘ্রই আসছে',

  savedHomes: 'সংরক্ষিত বাড়ি',
  likedHomes: 'আপনি যে বাড়িগুলো পছন্দ করেছেন',
  repeatWork: 'পুনরায় কাজ',
  trusted: 'বিশ্বস্ত',
  zeroSaved: '0 সংরক্ষিত',

  howItWorks: 'KaamWali.AI কীভাবে আপনার জন্য কাজ করে',

  step1Title: 'টাইপ নয়, কথা বলুন',
  step1Text: 'আপনার ভাষায় ভয়েস দিয়ে প্রশ্নের উত্তর দিন।',

  step2Title: 'প্রোফাইল এবং ট্রাস্ট স্কোর',
  step2Text: 'আপনার উত্তর থেকে একটি পরিষ্কার প্রোফাইল তৈরি হয়।',

  step3Title: 'বাড়িগুলো আপনাকে খুঁজে পায়',
  step3Text: 'আশেপাশের বাড়িগুলো আপনার দক্ষতা দেখে যোগাযোগ করে।',
},
  },
};

export default base;