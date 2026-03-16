// Translation data for multi-language support
// Major languages for a Pan-African healthcare NGO

export type Language = {
  code: string
  name: string
  nativeName: string
  flag: string
}

export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇰🇪' },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', flag: '🇪🇹' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
]

export type TranslationKey = keyof typeof translations.en

export const translations = {
  en: {
    // Navigation
    'nav.about': 'About Us',
    'nav.programs': 'Programs',
    'nav.partners': 'Partners & Supporters',
    'nav.news': 'News & Activities',
    'nav.contact': 'Contact',
    'nav.donate': 'Donate',
    'nav.selectLanguage': 'Select language',

    // Hero
    'hero.tag': 'Together for Better Cancer Care',
    'hero.title': 'Strengthening Cancer Care ',
    'hero.subtitle': 'Building capacity, raising awareness, and fostering partnerships for better cancer prevention, detection, and treatment.',
    'hero.cta': 'Learn More',
    'hero.ctaSecondary': 'Donate Now',

    // About
    'about.tag': 'About Us',
    'about.title': 'Driven By Purpose And Impact',
    'about.mission': 'Our Mission',
    'about.missionTitle': 'Together for Lasting Hope and Health',
    'about.missionText': 'Cancer Care Africa Foundation (CanCAF) is committed to strengthening cancer control systems  through capacity building, awareness, advocacy, policy engagement, and strategic partnerships to improve prevention, early detection, treatment, and survivorship.',
    'about.vision': 'Our Vision',
    'about.visionTitle': 'Quality Cancer Care for All Africans',
    'about.visionText': 'A future where every person in Africa has access to quality cancer prevention, early detection, treatment, and compassionate care.',

    // Programs
    'programs.tag': 'Programs',
    'programs.title': 'Transforming Cancer Care ',
    'programs.subtitle': 'Strategic initiatives driving meaningful change in cancer prevention, detection, and treatment.',

    // Partners
    'partners.tag': 'Partners & Supporters',
    'partners.title': 'Building Together For Greater Impact',
    'partners.subtitle': 'Collaborating with leading organizations to strengthen cancer care systems across the continent.',
    'partners.cta': 'Become a Partner',
    'partners.together': 'Together We Can',
    'partners.difference': 'Make a Difference.',

    // Contact
    'contact.tag': 'Contact',
    'contact.title': "Let's Connect And Make A Difference",
    'contact.subtitle': 'We would love to hear from you. Reach out to us anytime.',

    // Donate
    'donate.tag': 'Donate',
    'donate.title': 'Your Support Powers Life-Changing Missions',
    'donate.subtitle': 'Every contribution helps us build stronger cancer care systems and save lives .',

    // Footer
    'footer.tagline': 'Strengthening cancer care capacity .',
    'footer.quickLinks': 'Quick Links',
    'footer.connect': 'Connect With Us',
    'footer.rights': 'All rights reserved.',

    // Common
    'common.learnMore': 'Learn More',
    'common.readMore': 'Read More',
    'common.viewAll': 'View All',
    'common.growing': 'Growing',
    'common.networkPartners': 'Network of partners committed to change',
  },

  fr: {
    // Navigation
    'nav.about': 'À Propos',
    'nav.programs': 'Programmes',
    'nav.partners': 'Partenaires',
    'nav.news': 'Actualités',
    'nav.contact': 'Contact',
    'nav.donate': 'Faire un Don',
    'nav.selectLanguage': 'Choisir la langue',

    // Hero
    'hero.tag': 'Ensemble pour de Meilleurs Soins du Cancer',
    'hero.title': 'Renforcer les Soins du Cancer en Afrique',
    'hero.subtitle': 'Développer les capacités, sensibiliser et favoriser les partenariats pour une meilleure prévention, détection et traitement du cancer.',
    'hero.cta': 'En Savoir Plus',
    'hero.ctaSecondary': 'Faire un Don',

    // About
    'about.tag': 'À Propos',
    'about.title': 'Guidés par Notre Mission et Notre Impact',
    'about.mission': 'Notre Mission',
    'about.missionTitle': 'Ensemble pour un Espoir et une Santé Durables',
    'about.missionText': 'La Fondation Cancer Care Africa (CanCAF) s\'engage à renforcer les systèmes de lutte contre le cancer en Afrique grâce au renforcement des capacités, à la sensibilisation, au plaidoyer, à l\'engagement politique et aux partenariats stratégiques.',
    'about.vision': 'Notre Vision',
    'about.visionTitle': 'Des Soins de Qualité pour Tous les Africains',
    'about.visionText': 'Un avenir où chaque personne en Afrique a accès à des soins de qualité pour la prévention, la détection précoce, le traitement et les soins compassionnels du cancer.',

    // Programs
    'programs.tag': 'Programmes',
    'programs.title': 'Transformer les Soins du Cancer en Afrique',
    'programs.subtitle': 'Des initiatives stratégiques pour un changement significatif dans la prévention et le traitement du cancer.',

    // Partners
    'partners.tag': 'Partenaires',
    'partners.title': 'Construire Ensemble pour un Plus Grand Impact',
    'partners.subtitle': 'Collaborer avec des organisations de premier plan pour renforcer les systèmes de soins du cancer.',
    'partners.cta': 'Devenir Partenaire',
    'partners.together': 'Ensemble Nous Pouvons',
    'partners.difference': 'Faire la Différence.',

    // Contact
    'contact.tag': 'Contact',
    'contact.title': 'Connectons-nous pour Faire la Différence',
    'contact.subtitle': 'Nous serions ravis de vous entendre. Contactez-nous à tout moment.',

    // Donate
    'donate.tag': 'Faire un Don',
    'donate.title': 'Votre Soutien Alimente des Missions Vitales',
    'donate.subtitle': 'Chaque contribution nous aide à renforcer les systèmes de soins du cancer en Afrique.',

    // Footer
    'footer.tagline': 'Renforcer les capacités de soins du cancer en Afrique.',
    'footer.quickLinks': 'Liens Rapides',
    'footer.connect': 'Connectez-vous',
    'footer.rights': 'Tous droits réservés.',

    // Common
    'common.learnMore': 'En Savoir Plus',
    'common.readMore': 'Lire Plus',
    'common.viewAll': 'Voir Tout',
    'common.growing': 'En Croissance',
    'common.networkPartners': 'Réseau de partenaires engagés pour le changement',
  },

  ar: {
    // Navigation
    'nav.about': 'من نحن',
    'nav.programs': 'البرامج',
    'nav.partners': 'الشركاء',
    'nav.news': 'الأخبار',
    'nav.contact': 'اتصل بنا',
    'nav.donate': 'تبرع',
    'nav.selectLanguage': 'اختر اللغة',

    // Hero
    'hero.tag': 'معاً من أجل رعاية أفضل لمرضى السرطان',
    'hero.title': 'تعزيز رعاية السرطان في أفريقيا',
    'hero.subtitle': 'بناء القدرات ورفع الوعي وتعزيز الشراكات من أجل الوقاية والكشف والعلاج الأفضل للسرطان.',
    'hero.cta': 'اعرف المزيد',
    'hero.ctaSecondary': 'تبرع الآن',

    // About
    'about.tag': 'من نحن',
    'about.title': 'مدفوعون بالهدف والتأثير',
    'about.mission': 'مهمتنا',
    'about.missionTitle': 'معاً من أجل أمل وصحة دائمين',
    'about.missionText': 'تلتزم مؤسسة رعاية السرطان في أفريقيا بتعزيز أنظمة مكافحة السرطان في جميع أنحاء أفريقيا من خلال بناء القدرات والتوعية والمناصرة والمشاركة السياسية والشراكات الاستراتيجية.',
    'about.vision': 'رؤيتنا',
    'about.visionTitle': 'رعاية سرطان عالية الجودة لجميع الأفارقة',
    'about.visionText': 'مستقبل يتمتع فيه كل شخص في أفريقيا بإمكانية الوصول إلى الوقاية والكشف المبكر والعلاج والرعاية الرحيمة للسرطان.',

    // Programs
    'programs.tag': 'البرامج',
    'programs.title': 'تحويل رعاية السرطان في أفريقيا',
    'programs.subtitle': 'مبادرات استراتيجية تقود التغيير الهادف في الوقاية من السرطان وعلاجه.',

    // Partners
    'partners.tag': 'الشركاء',
    'partners.title': 'نبني معاً لتأثير أكبر',
    'partners.subtitle': 'التعاون مع المنظمات الرائدة لتعزيز أنظمة رعاية السرطان.',
    'partners.cta': 'كن شريكاً',
    'partners.together': 'معاً نستطيع',
    'partners.difference': 'إحداث الفرق.',

    // Contact
    'contact.tag': 'اتصل بنا',
    'contact.title': 'لنتواصل ونحدث فرقاً',
    'contact.subtitle': 'نحب أن نسمع منك. تواصل معنا في أي وقت.',

    // Donate
    'donate.tag': 'تبرع',
    'donate.title': 'دعمك يدعم مهمات تغير الحياة',
    'donate.subtitle': 'كل مساهمة تساعدنا في بناء أنظمة رعاية سرطان أقوى في أفريقيا.',

    // Footer
    'footer.tagline': 'تعزيز قدرات رعاية السرطان في أفريقيا.',
    'footer.quickLinks': 'روابط سريعة',
    'footer.connect': 'تواصل معنا',
    'footer.rights': 'جميع الحقوق محفوظة.',

    // Common
    'common.learnMore': 'اعرف المزيد',
    'common.readMore': 'اقرأ المزيد',
    'common.viewAll': 'عرض الكل',
    'common.growing': 'متنامي',
    'common.networkPartners': 'شبكة من الشركاء الملتزمين بالتغيير',
  },

  pt: {
    // Navigation
    'nav.about': 'Sobre Nós',
    'nav.programs': 'Programas',
    'nav.partners': 'Parceiros',
    'nav.news': 'Notícias',
    'nav.contact': 'Contacto',
    'nav.donate': 'Doar',
    'nav.selectLanguage': 'Selecionar idioma',

    // Hero
    'hero.tag': 'Juntos por Melhores Cuidados Oncológicos',
    'hero.title': 'Fortalecer os Cuidados Oncológicos em África',
    'hero.subtitle': 'Desenvolver capacidades, sensibilizar e promover parcerias para melhor prevenção, deteção e tratamento do cancro.',
    'hero.cta': 'Saber Mais',
    'hero.ctaSecondary': 'Doar Agora',

    // About
    'about.tag': 'Sobre Nós',
    'about.title': 'Guiados pelo Propósito e Impacto',
    'about.mission': 'Nossa Missão',
    'about.missionTitle': 'Juntos por Esperança e Saúde Duradouras',
    'about.missionText': 'A Fundação Cancer Care Africa (CanCAF) está comprometida em fortalecer os sistemas de controle do câncer em toda a África através do desenvolvimento de capacidades, conscientização, advocacia e parcerias estratégicas.',
    'about.vision': 'Nossa Visão',
    'about.visionTitle': 'Cuidados de Qualidade para Todos os Africanos',
    'about.visionText': 'Um futuro onde cada pessoa em África tenha acesso a prevenção, deteção precoce, tratamento e cuidados compassivos de qualidade.',

    // Programs
    'programs.tag': 'Programas',
    'programs.title': 'Transformar os Cuidados Oncológicos em África',
    'programs.subtitle': 'Iniciativas estratégicas para mudanças significativas na prevenção e tratamento do cancro.',

    // Partners
    'partners.tag': 'Parceiros',
    'partners.title': 'Construir Juntos para Maior Impacto',
    'partners.subtitle': 'Colaborar com organizações líderes para fortalecer os sistemas de cuidados oncológicos.',
    'partners.cta': 'Tornar-se Parceiro',
    'partners.together': 'Juntos Podemos',
    'partners.difference': 'Fazer a Diferença.',

    // Contact
    'contact.tag': 'Contacto',
    'contact.title': 'Vamos Conectar e Fazer a Diferença',
    'contact.subtitle': 'Adoraríamos ouvir de si. Contacte-nos a qualquer momento.',

    // Donate
    'donate.tag': 'Doar',
    'donate.title': 'O Seu Apoio Impulsiona Missões Transformadoras',
    'donate.subtitle': 'Cada contribuição ajuda-nos a construir sistemas de cuidados oncológicos mais fortes em África.',

    // Footer
    'footer.tagline': 'Fortalecer a capacidade de cuidados oncológicos em África.',
    'footer.quickLinks': 'Links Rápidos',
    'footer.connect': 'Conecte-se Connosco',
    'footer.rights': 'Todos os direitos reservados.',

    // Common
    'common.learnMore': 'Saber Mais',
    'common.readMore': 'Ler Mais',
    'common.viewAll': 'Ver Tudo',
    'common.growing': 'Em Crescimento',
    'common.networkPartners': 'Rede de parceiros comprometidos com a mudança',
  },

  sw: {
    // Navigation
    'nav.about': 'Kuhusu Sisi',
    'nav.programs': 'Programu',
    'nav.partners': 'Washirika',
    'nav.news': 'Habari',
    'nav.contact': 'Wasiliana',
    'nav.donate': 'Changia',
    'nav.selectLanguage': 'Chagua lugha',

    // Hero
    'hero.tag': 'Pamoja kwa Huduma Bora za Saratani',
    'hero.title': 'Kuimarisha Huduma za Saratani Afrika',
    'hero.subtitle': 'Kujenga uwezo, kuongeza ufahamu, na kukuza ushirikiano kwa kuzuia, kugundua, na kutibu saratani vizuri zaidi.',
    'hero.cta': 'Jifunze Zaidi',
    'hero.ctaSecondary': 'Changia Sasa',

    // About
    'about.tag': 'Kuhusu Sisi',
    'about.title': 'Tunaongozwa na Madhumuni na Athari',
    'about.mission': 'Dhamira Yetu',
    'about.missionTitle': 'Pamoja kwa Matumaini na Afya ya Kudumu',
    'about.missionText': 'Shirika la Cancer Care Africa (CanCAF) limejitolea kuimarisha mifumo ya kudhibiti saratani kote Afrika kupitia kujenga uwezo, uhamasishaji, utetezi, na ushirikiano wa kimkakati.',
    'about.vision': 'Maono Yetu',
    'about.visionTitle': 'Huduma za Ubora kwa Waafrika Wote',
    'about.visionText': 'Mustakabali ambapo kila mtu Afrika ana ufikiaji wa kuzuia, kugundua mapema, kutibu, na huduma za huruma za ubora.',

    // Programs
    'programs.tag': 'Programu',
    'programs.title': 'Kubadilisha Huduma za Saratani Afrika',
    'programs.subtitle': 'Mipango ya kimkakati inayoongoza mabadiliko yenye maana katika kuzuia na kutibu saratani.',

    // Partners
    'partners.tag': 'Washirika',
    'partners.title': 'Kujenga Pamoja kwa Athari Kubwa',
    'partners.subtitle': 'Kushirikiana na mashirika yanayoongoza kuimarisha mifumo ya huduma za saratani.',
    'partners.cta': 'Kuwa Mshirika',
    'partners.together': 'Pamoja Tunaweza',
    'partners.difference': 'Kuleta Mabadiliko.',

    // Contact
    'contact.tag': 'Wasiliana',
    'contact.title': 'Tuungane na Kuleta Mabadiliko',
    'contact.subtitle': 'Tungependa kusikia kutoka kwako. Wasiliana nasi wakati wowote.',

    // Donate
    'donate.tag': 'Changia',
    'donate.title': 'Msaada Wako Unasaidia Misheni ya Kubadilisha Maisha',
    'donate.subtitle': 'Kila mchango unasaidia kujenga mifumo imara ya huduma za saratani Afrika.',

    // Footer
    'footer.tagline': 'Kuimarisha uwezo wa huduma za saratani Afrika.',
    'footer.quickLinks': 'Viungo vya Haraka',
    'footer.connect': 'Ungana Nasi',
    'footer.rights': 'Haki zote zimehifadhiwa.',

    // Common
    'common.learnMore': 'Jifunze Zaidi',
    'common.readMore': 'Soma Zaidi',
    'common.viewAll': 'Ona Yote',
    'common.growing': 'Inakua',
    'common.networkPartners': 'Mtandao wa washirika waliojitolea mabadiliko',
  },

  am: {
    // Navigation
    'nav.about': 'ስለ እኛ',
    'nav.programs': 'ፕሮግራሞች',
    'nav.partners': 'አጋሮች',
    'nav.news': 'ዜና',
    'nav.contact': 'ያግኙን',
    'nav.donate': 'ይለግሱ',
    'nav.selectLanguage': 'ቋንቋ ይምረጡ',

    // Hero
    'hero.tag': 'ለተሻለ የካንሰር እንክብካቤ በጋራ',
    'hero.title': 'በአፍሪካ የካንሰር እንክብካቤን ማጠናከር',
    'hero.subtitle': 'አቅም መገንባት፣ ግንዛቤ ማሳደግ እና ለተሻለ የካንሰር መከላከያ፣ ማወቂያ እና ህክምና ሽርክናዎችን ማጎልበት።',
    'hero.cta': 'ተጨማሪ ይወቁ',
    'hero.ctaSecondary': 'አሁን ይለግሱ',

    // About
    'about.tag': 'ስለ እኛ',
    'about.title': 'በዓላማ እና ተፅዕኖ የሚመራ',
    'about.mission': 'ተልዕኮአችን',
    'about.missionTitle': 'ለዘላቂ ተስፋ እና ጤና በጋራ',
    'about.missionText': 'የካንሰር እንክብካቤ አፍሪካ ፋውንዴሽን (CanCAF) በአቅም ግንባታ፣ ግንዛቤ፣ ጥብቅና እና ስትራቴጂካዊ ሽርክናዎች በመላው አፍሪካ የካንሰር ቁጥጥር ስርዓቶችን ለማጠናከር ቁርጠኛ ነው።',
    'about.vision': 'ራዕያችን',
    'about.visionTitle': 'ለሁሉም አፍሪካውያን ጥራት ያለው እንክብካቤ',
    'about.visionText': 'በአፍሪካ ውስጥ ያለ ሁሉም ሰው ጥራት ያለው የካንሰር መከላከያ፣ ቀደምት ማወቂያ፣ ህክምና እና ርህራሄ ያለው እንክብካቤ የሚያገኝበት የወደፊት ጊዜ።',

    // Programs
    'programs.tag': 'ፕሮግራሞች',
    'programs.title': 'በአፍሪካ የካንሰር እንክብካቤን መለወጥ',
    'programs.subtitle': 'በካንሰር መከላከል እና ህክምና ውስጥ ትርጉም ያለው ለውጥ የሚያመጡ ስትራቴጂካዊ ተነሳሽነቶች።',

    // Partners
    'partners.tag': 'አጋሮች',
    'partners.title': 'ለትልቅ ተፅዕኖ በጋራ መገንባት',
    'partners.subtitle': 'የካንሰር እንክብካቤ ስርዓቶችን ለማጠናከር ከመሪ ድርጅቶች ጋር መተባበር።',
    'partners.cta': 'አጋር ይሁኑ',
    'partners.together': 'በጋራ እንችላለን',
    'partners.difference': 'ልዩነት ማምጣት።',

    // Contact
    'contact.tag': 'ያግኙን',
    'contact.title': 'እንገናኝ እና ልዩነት እናድርግ',
    'contact.subtitle': 'ከእርስዎ መስማት እንወዳለን። በማንኛውም ጊዜ ያግኙን።',

    // Donate
    'donate.tag': 'ይለግሱ',
    'donate.title': 'ድጋፍዎ ህይወትን የሚቀይሩ ተልዕኮዎችን ያበረታታል',
    'donate.subtitle': 'እያንዳንዱ አስተዋጽኦ በአፍሪካ ጠንካራ የካንሰር እንክብካቤ ስርዓቶችን ለመገንባት ይረዳናል።',

    // Footer
    'footer.tagline': 'በአፍሪካ የካንሰር እንክብካቤ አቅምን ማጠናከር።',
    'footer.quickLinks': 'ፈጣን ማገናኛዎች',
    'footer.connect': 'ይገናኙ',
    'footer.rights': 'ሁሉም መብቶች የተጠበቁ ናቸው።',

    // Common
    'common.learnMore': 'ተጨማሪ ይወቁ',
    'common.readMore': 'ተጨማሪ ያንብቡ',
    'common.viewAll': 'ሁሉንም ይመልከቱ',
    'common.growing': 'እያደገ ያለ',
    'common.networkPartners': 'ለለውጥ ቁርጠኛ የሆኑ አጋሮች አውታረ መረብ',
  },

  es: {
    // Navigation
    'nav.about': 'Sobre Nosotros',
    'nav.programs': 'Programas',
    'nav.partners': 'Socios',
    'nav.news': 'Noticias',
    'nav.contact': 'Contacto',
    'nav.donate': 'Donar',
    'nav.selectLanguage': 'Seleccionar idioma',

    // Hero
    'hero.tag': 'Juntos por una Mejor Atención del Cáncer',
    'hero.title': 'Fortaleciendo la Atención del Cáncer en África',
    'hero.subtitle': 'Desarrollando capacidades, sensibilizando y fomentando alianzas para una mejor prevención, detección y tratamiento del cáncer.',
    'hero.cta': 'Más Información',
    'hero.ctaSecondary': 'Donar Ahora',

    // About
    'about.tag': 'Sobre Nosotros',
    'about.title': 'Impulsados por el Propósito y el Impacto',
    'about.mission': 'Nuestra Misión',
    'about.missionTitle': 'Juntos por una Esperanza y Salud Duraderas',
    'about.missionText': 'La Fundación Cancer Care Africa (CanCAF) está comprometida con el fortalecimiento de los sistemas de control del cáncer en toda África a través del desarrollo de capacidades, concienciación, promoción y alianzas estratégicas.',
    'about.vision': 'Nuestra Visión',
    'about.visionTitle': 'Atención de Calidad para Todos los Africanos',
    'about.visionText': 'Un futuro donde cada persona en África tenga acceso a prevención, detección temprana, tratamiento y atención compasiva de calidad.',

    // Programs
    'programs.tag': 'Programas',
    'programs.title': 'Transformando la Atención del Cáncer en África',
    'programs.subtitle': 'Iniciativas estratégicas que impulsan cambios significativos en la prevención y tratamiento del cáncer.',

    // Partners
    'partners.tag': 'Socios',
    'partners.title': 'Construyendo Juntos para Mayor Impacto',
    'partners.subtitle': 'Colaborando con organizaciones líderes para fortalecer los sistemas de atención del cáncer.',
    'partners.cta': 'Ser Socio',
    'partners.together': 'Juntos Podemos',
    'partners.difference': 'Marcar la Diferencia.',

    // Contact
    'contact.tag': 'Contacto',
    'contact.title': 'Conectemos y Marquemos la Diferencia',
    'contact.subtitle': 'Nos encantaría saber de ti. Contáctanos en cualquier momento.',

    // Donate
    'donate.tag': 'Donar',
    'donate.title': 'Tu Apoyo Impulsa Misiones que Cambian Vidas',
    'donate.subtitle': 'Cada contribución nos ayuda a construir sistemas de atención del cáncer más fuertes en África.',

    // Footer
    'footer.tagline': 'Fortaleciendo la capacidad de atención del cáncer en África.',
    'footer.quickLinks': 'Enlaces Rápidos',
    'footer.connect': 'Conéctate',
    'footer.rights': 'Todos los derechos reservados.',

    // Common
    'common.learnMore': 'Más Información',
    'common.readMore': 'Leer Más',
    'common.viewAll': 'Ver Todo',
    'common.growing': 'En Crecimiento',
    'common.networkPartners': 'Red de socios comprometidos con el cambio',
  },
} as const

export type LanguageCode = keyof typeof translations
