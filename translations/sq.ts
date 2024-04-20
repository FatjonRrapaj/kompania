export default {
  navigation: {
    back: "Back",
    login: "Login",
    register: "Register",
    forgotPassword: "Forgot password",
    newPackage: "Pako e re",
    packageFor: "Pako për",
  },
  form: {
    isRequired: "kërkohet",
    mustBeAtLeast: "duhet të jetë të paktën",
    characters: "karaktere",
    mustBeAMaximum: "duhet të jetë maksimumi",
    doesNotMatch: "nuk përputhet",
    isInvalid: "nuk është i saktë",
  },
  login: {
    loginTitle: "Hyr në (Kompania)",
    enterInfo: "Plotëso informacionin më poshtë",
    enterEmail: "Vendos E-mailin",
    enterPassword: "Vendos Fjalëkalimin",
    email: "E-maili",
    password: "Fjalëkalimi",
    forgotPassword: "Harrove Fjalëkalimin?",
    login: "Hyr",
    orLoginWith: "Ose hyr me",
    notOurMember: "Nuk je i regjistruar akoma?",
    registerNow: "Regjistrohu Tani",
  },
  home: {
    goodMorning: "Mirëmëngjes",
    goodDay: "Mirëdita",
    goodEvening: "Mirëmbrëma",
    allPackages: "Të gjitha pakot",
    completed: "dorëzuar",
    inProcess: "në proçes",
    problematic: "problematike",
    newPackage: "Pako e re",
    scanPackage: "Skano pako",
    latest: "Të fundit",
    seeAll: "Shiko të gjitha",
    noPackages: "Ju nuk keni akoma asnjë pako",
  },
  package: {
    pending: "Në pritje",
    completed: "Përfunduar",
    problematic: "Problematike",
    client: "Klienti: ",
    available: "Gati",
    accepted: "Pranuar",
    picked: "Marrë",
    delivered: "Dorëzuar",
    returned: "Kthyer",
  },
  createPackage: {
    receiverDetails: "Detajet e Marrësit",
    receiverNamePlaceHolder: "Emri i Marrësit (sugjerim automatik)",
    receiverPhoneNumberPlaceholder: "Numri i Telefonit (sugjerim automatik)",
    profileLink: "Linku i Profilit",
    addressPlaceholder: "Adresa",
    notesForReceiverPlaceholder: "Shënime për marrësin",
    packageDetails: "Detajet e Pakos",
    packageIdScanPlaceholder: "ID e Pakos (skanim)",
    packageNamePlaceholder: "Emri i Pakos",
    standard: "Standarte",
    other: "Tjetër",
    weightPlaceholder: "Pesha (kg)",
    lenPlaceholder: "Gjat. (cm)",
    widPlaceholder: "Gjer. (cm)",
    heiPlaceholder: "Lart. (cm)",
    fragile: "Delikate",
    canBeOpened: "Mund të hapet",
    paymentAmountPlaceholder: "Vlera e Pagesës",
    shippingCostPlaceholder: "Kostoja e Transportit",
    cashOnDeliveryPlaceholder: "Pagesa në Dorëzim",
    notesForPackagePlaceholder: "Shënime për paketën",
    publishNow: "Publiko Tani",
    publishLater: "Publiko Më Vonë",
    publishAt: "Publiko në",
    packageCreated: "Pakoja është krijuar me sukses",
    couriersNotified: "Korrierët tanë janë njoftuar",
    view: "Shiko pakon",
    currency: "Monedha",
    receiverName: "Emri i marrësit",
    receiverPhone: "Numri i telefonit",
    receiverLink: "Linku i profilit",
    address: "Adresa",
    notesForReceiver: "Shënimi për klientin",
    packageId: "ID e pakos",
    packageName: "Emri i pakos",
    weight: "Pesha",
    len: "Gjatësia",
    wid: "Gjerësia",
    hei: "Lartësia",
    paymentAmount: "Vlera e pagesës",
    shippingCost: "Tarifa postare",
    cashOnDelivery: "Pagesa në dorëzim",
    notesForPackage: "Shënimi për pakon",
  },
  firebaseErrors: {
    "auth/operation-not-allowed": {
      text1: "Kjo veprim nuk lejohet.",
      text2: "Ju lutem kontaktoni suportin për ndihmë.",
    },
    "auth/requires-recent-login": {
      text1: "Ju lutem kyçuni përsëri për të përfunduar veprimin",
      text2: "Për arsye sigurie kërkohet një kyçje e fundit",
    },
    "auth/provider-already-linked": {
      text1: "Ky furnizues është tashmë i lidhur me llogarinë tuaj.",
      text2: "",
    },
    "auth/invalid-credential": {
      text1: "Kredencialet e dhëna janë të pavlefshme ose kanë skaduar.",
      text2: "Ju lutem provoni një të re",
    },
    "auth/credential-already-in-use": {
      text1: "Kredencialet janë tashmë në përdorim.",
      text2: "Ju lutem provoni një tjetër",
    },
    "auth/email-already-in-use": {
      text1: "Adresa email është tashmë në përdorim",
      text2: "Ju lutem kyçuni ose jepni një të re",
    },
    "auth/invalid-email": {
      text1: "Adresa email e dhënë nuk është e vlefshme.",
      text2: "Ju lutem jepni një adresë emaili të vlefshme.",
    },
    "auth/wrong-password": {
      text1: "Fjalëkalimi është i pasaktë.",
      text2: "Ju lutem kontrolloni përsëri fjalëkalimin tuaj.",
    },
    "auth/invalid-verification-code": {
      text1: "Kodi i verifikimit është i pavlefshëm.",
      text2: "Ju lutem kontrolloni dhe provoni përsëri.",
    },
    "auth/invalid-verification-id": {
      text1: "ID-ja e verifikimit është e pavlefshme.",
      text2: "Ju lutem kontrolloni dhe provoni përsëri.",
    },
    "auth/user-mismatch": {
      text1: "Kredencialet e dhëna nuk përputhen me përdoruesin.",
      text2: "Ju lutem provoni një tjetër",
    },
    "auth/user-not-found": {
      text1:
        "Nuk u gjet asnjë përdorues për kodin e rindërtimit të fjalëkalimit të dhënë.",
      text2: "Sigurohuni që të dhënat që jepni janë të sakta",
    },
    "auth/missing-ios-bundle-id": {
      text1:
        "Ju lutem jepni një iOS Bundle ID nëse është dhënë një ID e Aplikacionit në App Store.",
      text2: "Ju lutem kontaktoni suportin",
    },
    "auth/invalid-continue-uri": {
      text1: "URL-ja e vazhdimit e dhënë në kërkesë nuk është e vlefshme.",
      text2: "Ju lutem kontaktoni suportin",
    },
    "auth/unauthorized-continue-uri": {
      text1: "Domeni i URL-së së vazhdimit nuk është i lejuar.",
      text2: "Ju lutem kontaktoni suportin",
    },
    "auth/no-such-provider": {
      text1:
        "Furnizuesi nuk është i lidhur me llogarinë tuaj ose nuk ekziston.",
      text2: "Ju lutem kontaktoni suportin",
    },
    "auth/weak-password": {
      text1: "Fjalëkalimi nuk është i mjaftueshëm i fortë.",
      text2: "Duhet të jetë më i gjatë dhe të përmbajë karaktere speciale.",
    },
    "auth/invalid-phone-number": {
      text1: "Formati i numrit të telefonit është i pavlefshëm.",
      text2: "Ju lutem jepni një numër të vlefshëm të telefonit.",
    },
    "auth/missing-phone-number": {
      text1: "Numri i telefonit mungon.",
      text2: "Ju lutem jepni një numër telefoni.",
    },
    "auth/quota-exceeded": {
      text1: "Kuota e SMS për projektin Firebase është tejkaluar.",
      text2: "Ju lutem kontaktoni suportin",
    },
    "auth/user-disabled": {
      text1:
        "Përdoruesi i lidhur me kodin e rindërtimit të fjalëkalimit është çaktivizuar.",
      text2: "Ju lutem krijo një të re ose kontaktoni suportin",
    },
    "auth/custom-token-mismatch": {
      text1: "Tokeni i përshtatur për një Aplikacion Firebase tjetër.",
      text2: "Ju lutem kontaktoni suportin",
    },
    "auth/invalid-custom-token": {
      text1: "Formati i tokenit të përshtatur është i pasaktë.",
      text2: "Ju lutem kontaktoni suportin",
    },
    "auth/account-exists-with-different-credential": {
      text1: "Një llogari me këtë adresë emaili ekziston tashmë.",
      text2: "Ju lutem kyçuni ose jepni një email të ri",
    },
    "auth/argument-error": {
      text1: "Ndodhi një gabim.",
      text2: "Ju lutem provoni përsëri më vonë.",
    },
    "auth/expired-action-code": {
      text1: "Kodi i rindërtimit të fjalëkalimit ka skaduar.",
      text2: "Ju lutem kërko një të ri.",
    },

    "auth/invalid-action-code": {
      text1:
        "Kodi i rindërtimit të fjalëkalimit është i pavlefshëm ose është përdorur më parë.",
      text2:
        "Ju lutem kërkoni një të ri, ose kontaktoni suportin nëse nuk keni qenë ju",
    },
    "auth/keychain-error": {
      text1: "Ndodhi një gabim gjatë qasjes në keychain.",
      text2: "Ju lutem kontaktoni suportin",
    },
    "auth/app-deleted": {
      text1: "Aplikacioni Firebase është fshirë.",
      text2: "Ju lutem kontaktoni suportin për ndihmë.",
    },
    "auth/app-not-authorized": {
      text1: "Aplikacioni nuk është i autorizuar për Autentikim në Firebase.",
      text2:
        "Ju lutem rishikoni konfigurimin e aplikacionit tuaj në Konsollën Firebase.",
    },
    "auth/invalid-api-key": {
      text1: "Çelësi i API-së i dhënë është i pavlefshëm.",
      text2:
        "Ju lutem verifikoni se e keni kopjuar saktësisht nga Konsolla Firebase.",
    },
    "auth/invalid-user-token": {
      text1: "Kredencialet e përdoruesit nuk janë më të vlefshme.",
      text2: "Përdoruesi duhet të kyçet përsëri për të zgjidhur këtë problem.",
    },
    "auth/invalid-tenant-id": {
      text1: "ID-ja e dhenë e qirasit nuk është e vlefshme.",
      text2: "Ju lutem sigurohuni që keni dhënë një ID qiraje të vlefshme.",
    },
    "auth/network-request-failed": {
      text1: "Një gabim rrjeti ka ndodhur.",
      text2:
        "Ju lutem kontrolloni lidhjen tuaj të rrjetit dhe provoni përsëri.",
    },
    "auth/too-many-requests": {
      text1: "Ka shumë kërkesa duke u bërë nga ky pajisje.",
      text2: "Ju lutem prisni për disa kohë dhe provoni përsëri më vonë.",
    },
    "auth/unauthorized-domain": {
      text1: "Domeni i aplikacionit nuk është autorizuar për operacione OAuth.",
      text2:
        "Ju lutem konfiguroni domainet e autorizuara në Konsollën Firebase.",
    },
    "auth/user-token-expired": {
      text1: "Kredencialet e përdoruesit kanë skaduar.",
      text2: "Ju lutem dilni dhe kyçuni përsëri për të zgjidhur këtë problem.",
    },
    "auth/web-storage-unsupported": {
      text1: "Ruajtja në internet nuk është e mbështetur nga shfletuesi.",
      text2:
        "Ju lutem aktivizoni ruajtjen në internet ose provoni një shfletues tjetër në internet.",
    },
    "auth/claims-too-large": {
      text1:
        "Paketa e pretendimeve të përshtatura kalon madhësinë maksimale të lejuar.",
      text2: "Ju lutem zvogëloni madhësinë e pretendimeve të përshtatura.",
    },

    "auth/id-token-expired": {
      text1: "Tokeni ID Firebase i dhënë ka skaduar.",
      text2: "Ju lutem dilni dhe kyçuni përsëri për të marrë një token të ri.",
    },
    "auth/id-token-revoked": {
      text1: "Tokeni ID Firebase i dhënë është anuluar.",
      text2: "Ju lutem dilni dhe kyçuni përsëri për të marrë një token të ri.",
    },
    "auth/insufficient-permission": {
      text1: "SDK-ja e Adminit ka leje të pamjaftueshme.",
      text2: "Ju lutem konfiguroni SDK-në e Adminit me lejet e duhura.",
    },
    "auth/internal-error": {
      text1: "Ndodhi një gabim i papritur në serverin e Autentikimit.",
      text2:
        "Ju lutem raportoni problem në kanalin tonë të mbështetjes nëse vazhdon.",
    },
    "auth/invalid-argument": {
      text1: "U dhënë një argument i pavlefshëm për një metodë Autentikimi.",
      text2: "Ju lutem kontrolloni argumentet e dhëna dhe provoni përsëri.",
    },
    "auth/invalid-claims": {
      text1: "Atributet e pretendimeve të përshtatura janë të pavlefshme.",
      text2:
        "Ju lutem kontrolloni atributet e pretendimeve të përshtatura të dhëna.",
    },
    "auth/invalid-email-verified": {
      text1: "Vlera emailVerified është e pavlefshme.",
      text2: "Ju lutem sigurohuni që është një vlerë booleane.",
    },
    "auth/invalid-hash-algorithm": {
      text1: "Algoritmi i hash-it nuk është i mbështetur.",
      text2: "Ju lutem përdorni një algoritem të mbështetur hashimi.",
    },
    "auth/invalid-hash-block-size": {
      text1: "Madhësia e bllokut të hash-it është e pavlefshme.",
      text2: "Ju lutem jepni një numër të vlefshëm për madhësinë e bllokut.",
    },
    "auth/invalid-hash-derived-key-length": {
      text1: "Gjatësia e çelësit të përdorur për hashim është e pavlefshme.",
      text2: "Ju lutem jepni një numër të vlefshëm për gjatësinë e çelësit.",
    },
    "auth/invalid-hash-key": {
      text1: "Çelësi i hash-it është i pavlefshëm.",
      text2:
        "Ju lutem jepni një buffer të vlefshëm byte për çelësin e hash-it.",
    },
    "auth/invalid-hash-memory-cost": {
      text1: "Kostoja e memorjes së hash-it është e pavlefshme.",
      text2: "Ju lutem jepni një numër të vlefshëm për koston e memorjes.",
    },
    "auth/invalid-hash-parallelization": {
      text1: "Paralelizimi i hash-it është i pavlefshëm.",
      text2: "Ju lutem jepni një numër të vlefshëm për paralelizimin.",
    },
    "auth/invalid-hash-rounds": {
      text1: "Vlera e rrotullimeve të hash-it është e pavlefshme.",
      text2: "Ju lutem jepni një numër të vlefshëm rrotullimesh.",
    },
    "auth/invalid-hash-salt-separator": {
      text1: "Separatori i kripës për algoritmin e hash-it është i pavlefshëm.",
      text2:
        "Ju lutem jepni një buffer të vlefshëm byte për separatorin e kripës.",
    },
    "auth/invalid-id-token": {
      text1: "Tokeni ID i dhënë nuk është një token ID Firebase i vlefshëm.",
      text2: "Ju lutem sigurohuni që po përdorni një token të vlefshëm ID.",
    },
    "auth/invalid-last-sign-in-time": {
      text1: "Koha e fundit e kyçjes është e pavlefshme.",
      text2:
        "Ju lutem jepni një varg datash UTC të vlefshme për kohën e fundit të kyçjes.",
    },
    "auth/invalid-page-token": {
      text1: "Tokeni i faqes së dhënë është i pavlefshëm.",
      text2: "Ju lutem jepni një varg të vlefshëm jo-bosh për tokenin e faqes.",
    },
    "auth/invalid-password": {
      text1: "Fjalëkalimi i dhënë është i pavlefshëm.",
      text2: "Ju lutem jepni një fjalëkalim me të paktën gjashtë karaktere.",
    },
    "auth/invalid-password-hash": {
      text1: "Hashi i fjalëkalimit është i pavlefshëm.",
      text2:
        "Ju lutem jepni një buffer të vlefshëm byte për hashin e fjalëkalimit.",
    },
    "auth/invalid-password-salt": {
      text1: "Kripa e fjalëkalimit është e pavlefshme.",
      text2:
        "Ju lutem jepni një buffer të vlefshëm byte për kripën e fjalëkalimit.",
    },
    "auth/invalid-photo-url": {
      text1: "PhotoURL e dhënë është e pavlefshme.",
      text2: "Ju lutem jepni një URL string të vlefshëm për PhotoURL.",
    },
    "auth/invalid-provider-data": {
      text1: "Dhënia e furnizuesit është e pavlefshme.",
      text2: "Ju lutem jepni një varg të vlefshëm të objekteve UserInfo.",
    },
    "auth/invalid-provider-id": {
      text1: "ID e furnizuesit është e pavlefshme.",
      text2:
        "Ju lutem jepni një string identifikues të vlefshëm të furnizuesit të mbështetur.",
    },
    "auth/invalid-oauth-responsetype": {
      text1: "Konfigurimi i responseType OAuth i pavlefshëm.",
      text2:
        "Ju lutem konfiguroni vetëm një responseType OAuth që të jetë vendosur në true.",
    },
    "auth/invalid-session-cookie-duration": {
      text1: "Koha e gjatësisë së cookies së sesionit është e pavlefshme.",
      text2:
        "Ju lutem jepni një numër të vlefshëm në milidetë nga 5 minuta deri në 2 javë.",
    },
    "auth/invalid-uid": {
      text1: "UID e dhënë është e pavlefshme.",
      text2:
        "Ju lutem jepni një string jo-bosh me të palingët 128 karaktere për UID.",
    },
    "auth/invalid-user-import": {
      text1: "Regjistrimi i përdoruesit për import është i pavlefshëm.",
      text2:
        "Ju lutem kontrolloni regjistrimin e dhënë të përdoruesit për import.",
    },
    "auth/maximum-user-count-exceeded": {
      text1:
        "Numri maksimal i lejuar i përdoruesve për importim është tejkaluar.",
      text2:
        "Ju lutem sigurohuni që nuk tejkaloni numrin maksimal të përdoruesve për importim.",
    },
    "auth/missing-android-pkg-name": {
      text1: "Emri i Paketës Android mungon.",
      text2: "Ju lutem jepni një Emër Pakete Android nëse është e nevojshme.",
    },
    "auth/missing-continue-uri": {
      text1: "Mungon një URL vazhdimi i vlefshëm.",
      text2: "Ju lutem jepni një URL vazhdimi të vlefshëm në kërkesë.",
    },
    "auth/missing-hash-algorithm": {
      text1: "Algoritmi i hash-it dhe parametrat e tij mungojnë.",
      text2:
        "Ju lutem jepni algoritmin e kërkuar të hash-it dhe parametrat për importim përdoruesi.",
    },
    "auth/missing-uid": {
      text1: "Mungon UID-ja.",
      text2: "Ju lutem jepni një identifikues UID për operacionin aktual.",
    },
    "auth/missing-oauth-client-secret": {
      text1: "Sekreti i klientit OAuth mungon.",
      text2:
        "Ju lutem jepni sekretin e detyrueshëm të klientit OAuth për të mundësuar rrjedhën e kodit OIDC.",
    },
    "auth/phone-number-already-exists": {
      text1:
        "Numri i dhënë i telefonit është tashmë në përdorim nga një përdorues ekzistues.",
      text2: "Secili përdorues duhet të ketë një numër telefoni unik.",
    },
    "auth/project-not-found": {
      text1: "Nuk u gjet projekt Firebase për kredencialet e dhëna.",
      text2:
        "Ju lutem sigurohuni që keni kredencialet e duhura të projektit Firebase.",
    },
    "auth/reserved-claims": {
      text1:
        "Një ose më shumë pretendimet e përdoruesit të përshtatura janë të rezervuara.",
      text2:
        "Ju lutem shmangni përdorimin e pretendimeve të rezervuara për pretendimet e përdoruesit të përshtatura",
    },
    "auth/uid-already-exists": {
      text1:
        "UID i dhënë është tashmë në përdorim nga një përdorues ekzistues.",
      text2: "Secili përdorues duhet të ketë një UID unik.",
    },
    "storage/unknown": {
      text1: "Ndodhi një gabim i panjohur.",
      text2: "Kontaktoni për ndihmë.",
    },
    "storage/object-not-found": {
      text1: "Nuk ekziston objekt në referencën e dëshiruar.",
      text2: "Kontrolloni referencën dhe provoni përsëri.",
    },
    "storage/bucket-not-found": {
      text1: "Nuk është konfiguruar ndonjë kovë për Depozitim në Cloud.",
      text2: "Ju lutem kontaktoni për ndihmë.",
    },
    "storage/project-not-found": {
      text1: "Nuk është konfiguruar ndonjë projekt për Depozitim në Cloud.",
      text2: "Konfiguroni një projekt dhe provoni përsëri.",
    },
    "storage/quota-exceeded": {
      text1: "Kuota në kovën tuaj për Depozitim në Cloud është tejkaluar.",
      text2: "Ju lutem kontaktoni për ndihmë.",
    },
    "storage/unauthenticated": {
      text1: "Ju lutem rikyçuni për të përfunduar këtë veprim",
      text2: "Sigurohuni që jeni i autentikuar dhe provoni veprimin përsëri.",
    },
    "storage/unauthorized": {
      text1: "Ju nuk keni autorizim për të kryer veprimin e dëshiruar.",
      text2:
        "Kontrolloni rregullat tuaja të sigurisë për të siguruar që janë të saktë.",
    },
    "storage/retry-limit-exceeded": {
      text1: "Koha maksimale e kufizuar për një veprim është tejkaluar.",
      text2: "Ju lutem provoni veprimin përsëri.",
    },
    "storage/invalid-checksum": {
      text1:
        "Dosja në klient nuk përputhet me checksumin e dosjes\nmarrë nga serveri.",
      text2: "Provo ngarkimin e dosjes përsëri.",
    },
    "storage/canceled": {
      text1: "Veprimi u anulua.",
      text2: "Ju lutem nisni veprimin përsëri nëse është e nevojshme.",
    },
    "storage/invalid-event-name": {
      text1: "Ndodhi një gabim",
      text2: "Emër i pavlefshëm i ngjarjes është dhënë.",
    },
    "storage/invalid-url": {
      text1: "URL i pavlefshëm i dhënë.",
      text2: "Ju lutem kontaktoni për ndihmë.",
    },
    "storage/invalid-argument": {
      text1: "Argument i pavlefshëm i dhënë",
      text2: "Ne do ta ndreqim këtë gabim së shpejti.",
    },
    "storage/no-default-bucket": {
      text1: "Ndodhi një gabim", //  "Nuk është konfiguruar ndonjë kovë në pronat e konfiguruar storageBucket të konfigurimit tuaj.",

      text2: "Ju lutem kontaktoni për ndihmë.",
    },
    "storage/cannot-slice-blob": {
      text1: "Ndodh zakonisht kur dosja lokale është ndryshuar.",
      text2:
        "Provo ngarkimin e dosjes përsëri pasi të verifikosh se ajo nuk është ndryshuar.",
    },
    "storage/server-file-wrong-size": {
      text1:
        "Dosja në klient nuk përputhet me madhësinë e dosjes\nmarrë nga serveri.",
      text2: "Provo ngarkimin e dosjes përsëri.",
    },
  },
  toastMessages: {
    userNotLoggedIn: "Përdoruesi nuk është i kyçur.",
    userDocumentNotFound: "Dokumenti i përdoruesit nuk u gjet.",
    companyDocumentNotFound: "Dokumenti i kompanisë nuk u gjet.",
    companyIdNotFound:
      "CompanyId nuk u gjet në të dhënat e përdoruesit nuk janë saktë.",
    failedToGetUserCompany: "Marrja e kompanisë së përdoruesit dështoi",
    failedToAddPackage: "Shtimi i pakos dështoi.",
    somethingWrongText1: "Diçka shkoi keq",
    somethingWrongText2: "Ne nuk mundëm të përpunojmë kërkesën tuaj",
    verifyEmailSentText1: "Emaili i verifikimit është dërguar",
    checkEmailText2: "Ju lutemi kontrolloni emailin tuaj",
    passwordResetEmailSentText1:
      "Emaili i rivendosjes së fjalëkalimit është dërguar",
    updateNameSuccess: "Emri u përditësua me sukses",
    updatePhoneSuccess: "Numri i telefonit u përditësua me sukses",
    changePasswordSuccess: "Fjalëkalimi u ndryshua me sukses",
    passwordIncorrect: "Fjalëkalimi i dhënë është i pasaktë",
    pleaseTryAgainText2: "Ju lutemi provoni përsëri",
  },
};
