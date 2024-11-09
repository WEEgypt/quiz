const questions = [
    {
        question: "في حالة طلب العميل استرداد مبلغ تأميني كاش يتم انشاء الطلب الاتي علي CSA",
        options: ["Request - Consumer - rate plan - remove suspension", "Request - Consumer - Payment and collection - deposit refund"],
        answer: 1,
    },
    {
        question: "في حالة طلب العميل اعادة تفعيل خط فاتورة موقوف. بعد رفع الاوراق المطلوبه يتم انشاء الطلب الاتي علي CSA",
        options: ["Request - Consumer - rate plan - remove suspension", "Request - Consumer - Deactivation  - We Gold deactivation"],
        answer: 0,
    },
    {
        question: "في حالة طلب العميل الغاء خط فاتورة و بعد رفع الاوراق المطلوبه يتم انشاء الطلب الاتي علي CSA",
        options: ["Request - Consumer - rate plan - remove suspension", "Request - Consumer - Deactivation  - We Gold deactivation "],
        answer: 1,
    },
    {
        question: "تتشابه عدد الوحدات المقدمه (الدقيقه بوحده لكل الشبكات) في كل باقات نظام وي جولد موبايل و وي جولد انترنت منزلي",
        options: ["True", "False"],
        answer: 0,
    },
    {
        question: "بدءًا من WE Gold ................ يمكنك الاستفادة بخاصية تقسيط الهواتف بعد مرور 12 شهرًا",
        options: ["200", "400", "600"],
        answer: 0,
    },
    {
        question: "سيحصل عملاء WE Gold على .............. إنترنت تجوال  في السنة. الباقة صالحة لمدة أسبوع من وقت تفعيل الباقة",
        options: ["3 باقات", "بافه واحده", "باقتين"],
        answer: 2,
    },
    {
        question: "بدءًا من WE Gold ............ ،ستحصل على دقائق دولية شهرية",
        options: ["400", "600", "200"],
        answer: 0,
    },
    {
        question: "قسيمة الشراء المقدمة لباقة وي جولد 1000 هي ................ جنيه",
        options: ["1000", "3000", "5000"],
        answer: 1,
    },
    {
        question: "تقدم باقة وي جولد 1000 انترنت منزلي ............ جيجابايت او وي اير 250",
        options: ["400", "250", "140"],
        answer: 0,
    },
    {
        question: "تقدم باقة نايترو 450 انترنت 50 جيجابايت صالحة لمدة .......",
        options: ["3 شهور", "شهر", "28 يوم"],
        answer: 0,
    },
    {
        question: "يمكن استخدام باقة x Plus 50 علي  مواقع الفيديو والسوشيال و المزيكا",
        options: ["False", "True"],
        answer: 1,
    },
    {
        question: "يحصل عميل كنترول كيكس علي ........ اضافيه عند الاشتراك في باقة نايترو",
        options: ["%50", "%40", "%25"],
        answer: 2,
    },
    {
        question: "خدمة وي باي متاحه للعملاء من سن .........",
        options: ["18 سنه", "15 سنه", "16 سنه"],
        answer: 1,
    },
    {
        question: "يحق للعميل المصري الحصول علي 10 خطوط صوت و ............. داتا",
        options: ["10 خطوط", "5 خطوط", "3 خطوط"],
        answer: 1,
    },
    {
        question: "مسموح استبدال شريحه الموبايل بعد انتهاء الاقامة للعميل الاجنبي",
        options: ["False", "True"],
        answer: 0,
    },
    {
        question: "خدمة شراء صلاحيه للخط لمدة 6 اشهر او 12 شهر تسمي .......",
        options: ["Park your line", "Extend your line"],
        answer: 1,
    },
    {
        question: "رسوم خدمة park your line هي ..........",
        options: ["10 جنيه شهريا", "20 جنيه شهريا", "5 جنيه شهريا"],
        answer: 0,
    },
    {
        question: "تصنف ارقام Super Kix 80 من فئة ارقام",
        options: ["Silver", "Basic", "Golden"],
        answer: 2,
    },
    {
        question: "كنترول تظبيط 110 تقدم ....... دقيقه لكل الشبكات الوحده بدقيقه",
        options: ["90", "75", "45"],
        answer: 0,
    },
    {
        question: "كود باقات We club هو ..........",
        options: ["*617#", "*913#", "*616#"],
        answer: 0,
    },
    {
        question: "باقة سوبر كيكس 45 تحتوي علي .......... وحده",
        options: ["2100", "2800", "4200"],
        answer: 1,
    },
    {
        question: "سعر جهاز وي آير LTE CAT6 router MF296R (WE Air Plus Router)",
        options: ["2100 جنيه", "2000 جنيه", "1400 جنيه"],
        answer: 1,
    },
    {
        question: "باقة وي آير 300 تقدم ............ جيجابايت",
        options: ["105", "120", "140"],
        answer: 0,
    },
    {
        question: "يحق لكل بطاقة رقم قومي فتح 3 محافظ ...........",
        options: ["لدى كل مقدم خدمة", "علي كل رقم مسجل", "علي 3 ارقام مختلفه"],
        answer: 2,
    },
    {
        question: "الحد الأقصى لرصيد حساب المحفظة ...... جنيه مصري",
        options: ["100,000", "200,000", "500,000"],
        answer: 1,
    },
    {
        question: "في حالة ضياع أو سرقة الخط بإمكانك وقف المحفظه عن طريق الإتصال بـ .........",
        options: ["656", "565", "500"],
        answer: 1,
    },
    {
        question: "رسوم تحويل الأموال من محفظة WE Pay إلى محفظة WE Pay ........",
        options: ["لا يوجد رسوم", "1 جنيه كحد أقصى", "5 جنيه كحد أقصى"],
        answer: 1,
    },
    {
        question: "غير متاح الاشتراك في خدمة وي باي لخطوط الداتا",
        options: ["True", "False"],
        answer: 1,
    },
];
