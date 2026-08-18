
const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");


const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));


const app = express();


const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));


const siteData = {
    categories: {
        "newborn": {
            title: "ניו בורן",
            description: "",
            fullText: "",
            images: [],
            modals: {
                session: {
                    title: "איך מתבצע הסשן ניו־בורן",
                    text: `<p>הזמן האידיאלי לצילומי ניו־בורן הוא בין היום ה־5 ליום ה־15 לחיי התינוק.<br><br>לכן אנו קובעים מראש תאריך משוער לפי מועד הלידה הצפוי, ומעדכנים אותו לאחר הלידה.<br><br>הדבר החשוב ביותר הוא הבטיחות והנוחות של התינוק וגם של האמא.<br><br>כל התנוחות נעשות בהתאמה מלאה לפיזיולוגיה של התינוק, בעדינות ובכבוד לקצב שלו.<br><br>בסטודיו מחכה לכם סביבה חמימה, שקטה ונעימה עם תאורה רכה.<br><br>משך הסשן הוא כ־3 שעות של רוגע.<br><br>אני מלווה אתכם ודואגת לכל הפרטים כדי לאפשר חוויה נעימה.</p>`
                },
                importantInfo: {
                    title: "חשוב לדעת",
                    text: `<p>לסשן ניו־בורן אין צורך להביא ציוד מיוחד.<br><br>בסטודיו יש מבחר בגדים ואביזרים לתינוק וגם לאמא.<br><br>מומלץ להגיע רגועים ונינוחים.<br><br>צילומי משפחה מומלץ בבגדים בהירים וללא הדפסים.</p>`
                },
                whatToBring: {
                    title: "מה להביא",
                    text: `<ul><li>בקבוקים / חלב אם</li><li>מוצץ (אם התינוק רגיל)</li><li>חיתולים</li><li>חיתולי בד</li><li>מגבונים / מוצרי החתלה</li><li>איפור לתיקונים</li><li>והכי חשוב – החיוך שלכם</li></ul>`
                }
            }
        },


        "pregnancy": {
            title: "צילומי הריון",
            description: "",
            fullText: "",
            images: [],
            modals: {
                session: {
                    title: "איך מתבצע?",
                    text: `<p>התינוק מגיע בקרוב…?<br><br>איזו הרפתקה קסומה, איזו התרגשות!<br><br>כי להפוך לאמא הוא שלב מרגש ומטלטל במיוחד – רגעים שרוצים לזכור לנצח…<br><br>לאסוף יחד איתך את הרגעים המתוקים הראשונים, בצילום אישי שמוקדש לך, לסביבה שלך ולתינוק שבדרך, ולהעצים את התקופה המיוחדת הזו בחיים – זו השליחות שלי.<br><br>אני מציעה צילומי הריון, לרוב בטבע ובחוץ, וכמובן גם בסטודיו במקרה שמזג האוויר לא מאפשר.<br><br>צילומי הריון מתקיימים אידיאלית בין השבוע ה־35 לשבוע ה־38 להריון.<br><br>משך הצילום כ־שעה וחצי, וברשותך מבחר שמלות הריון יפות.<br><br>בן הזוג והאחים הגדולים מוזמנים כמובן להצטרף.</p>`
                },
                importantInfo: {
                    title: "חשוב לדעת",
                    text: `<p>כדי להיראות במיטבך בצילומים, איפור יפה הוא חשוב ומדגיש עוד יותר את היופי הטבעי שלך.<br><br>אל תהססי להדגיש מעט את האיפור, כדי שיבוא לידי ביטוי טוב בצילום.<br><br>צילומי הריון יכולים להיות לפעמים מעט מאתגרים פיזית.<br><br>מומלץ לאכול לפני הצילום ולהביא בקבוק מים.</p>`
                },
                whatToBring: {
                    title: "מה להביא",
                    text: `<ul><li>מים</li><li>נשנוש קטן ומרענן או מתוק</li><li>איפור לתיקונים</li><li>טישו / מגבונים</li><li>צילום אולטרסאונד, נעלי תינוק או אביזר הריון אחר</li></ul><p>כדי להפוך גם את תקופת ההמתנה לרגע קסום, מרחף בזמן…</p>`
                }
            }
        },


        "smashcake": {
            title: "גיל שנה",
            description: "",
            fullText: "",
            images: [],
            modals: {
                session: {
                    title: "איך מתבצע סשן גיל שנה / סמאש קייק?",
                    text: `<p>הבייבי שלכם כבר בן/בת שנה? איך הזמן טס!<br><br>כדי להנציח את הרגע המיוחד הזה, אני מציעה סשני גיל שנה עם תפאורות רכות ומתוקות.<br><br>משך הסשן הוא כשעה עד שעה וחצי.<br><br>בדרך כלל הסשן כולל חלק של סמאש קייק וחלק של אמבטיה / תפאורה נוספת.<br><br>לגבי העוגה – קיימת אפשרות להזמין עוגת מהדרין בצבעי הקונספט הנבחר, בעלות של 120 ₪.<br><br>הסשנים אפשריים גם בחוץ, בטבע, במידה ומזג האוויר מאפשר זאת.</p>`
                },
                importantInfo: {
                    title: "חשוב לדעת",
                    text: `<p>בגיל הזה לשגרה של התינוק יש קצב ברור ומוגדר.<br><br>לכן שעת הצילום חשובה מאוד להצלחת הסשן, ותיקבע בהתאם לשעות השינה של התינוק.</p>`
                },
                whatToBring: {
                    title: "מה להביא",
                    text: `<ul><li>חיתולים / מגבונים / מוצרי החתלה</li><li>מוצץ – במידת הצורך</li><li>מברשת / סיכה לשיער</li><li>בקבוק מים / חטיף או ארוחת ביניים</li></ul><p>כי כל שלב ראשון הוא אבן בבניין של הילד/ה.</p>`
                }
            }
        },


        "family": {
            title: "משפחה",
            description: "",
            fullText: "",
            images: [],
            modals: {
                session: {
                    title: "איך מתבצע?",
                    text: `<p>ומה אם לא נחכה לאירוע מיוחד כדי ליהנות מרגע קסום עם המשפחה ולנצור את הרגעים האלה לנצח?<br><br>למשפחה שלכם מגיע את זה!<br><br>שמחות פשוטות, חיבור מיוחד, צחוק ותחושת רוגע — כל אלה הם המרכיבים של צילומי משפחה מושלמים!!<br><br>כי אתם פשוט אתם, והמשפחה שלכם היא ההשתקפות הכי יפה שלכם.</p>`
                },
                importantInfo: {
                    title: "חשוב לדעת",
                    text: `<p>צילומי המשפחה נמשכים בערך שעה וחצי ומתקיימים בחוץ.<br><br>הלבוש צריך להיות מתואם — לא חייב זהה, אבל דומה בסגנון ובגוונים.<br><br>מומלץ להימנע מצבעים זוהרים או כהים מדי, מהדפסים ומכיתובים.</p>`
                },
                whatToBring: {
                    title: "מה להביא",
                    text: `<ul><li>בגדים ואביזרים</li><li>מים / נשנושים</li><li>טישו / מגבונים</li><li>חיוכים יפים</li><li>אנרגיה טובה והרבה סבלנות</li></ul><p>כי למשפחה שלכם מגיע הכי טוב!</p>`
                }
            }
        },


        "portrait": {
            title: "פורטרט",
            description: "",
            fullText: "",
            images: [],
            modals: {
                session: {
                    title: "על הסשן",
                    text: `<p>ומה אם הפשטות היא מקור כל האלגנטיות?<br><br>לפעמים אין צורך בקישוטים — העיקר כבר נמצא שם, בצורה היפה והטהורה ביותר שלו.<br><br>מדובר בפורטרטים טבעיים, עוצמתיים, בשחור־לבן על רקע שחור, שמבליטים גם כוח וגם רוך בו־זמנית.<br><br>כמו חזרה אל העיקר, חיפוש אחר אמת שמרגישה פשוט טוב.<br><br>הסשנים הללו נמשכים 15 דקות לאדם, עם אפשרות להגיע גם כמשפחה.</p>`
                }
            }
        },


        "upsherin": {
            title: "חלאקה",
            description: "",
            fullText: "",
            images: [],
            modals: {
                session: {
                    title: "איך מתבצע?",
                    text: `<p>מזל טוב, התינוק שלכם כבר ילד גדול שחוגג 3 שנים!!<br><br>ולכבוד האירוע המרגש והכל כך יפה הזה, אני מציעה לכם צילומי חלאקה מלאים במתיקות, בכיף ובהנאה — כדי לשמור זיכרונות יפים מהשיער הארוך, מהצחוקים ומהגאווה הגדולה להיות סוף סוף ילד גדול בן 3!!</p>`
                },
                importantInfo: {
                    title: "חשוב לדעת",
                    text: `<p>צילומי החלאקה נמשכים כשעתיים ומתקיימים בחוץ, תוך דגש על המעבר המיוחד לעולם ה"גדולים".<br><br>כדי לאפשר תנאים מיטביים, חשוב להסביר לילד מראש איך תתנהל החוויה ולהכין אותו לכך.<br><br>אביזרי חלאקה מיוחדים כגון כובעים, קסקטים, טלית, כיפה, ציצית וספר תורה — מסופקים במקום.</p>`
                },
                whatToBring: {
                    title: "מה להביא",
                    text: `<ul><li>מים / נשנוש</li><li>2–3 סטים של בגדים: ספורט / קלאסי / שבתי</li><li>קליפס / גומייה</li><li>מברשת שיער / ספריי</li></ul><p>ולא לשכוח — הוא כבר לא כזה קטן… מקשיבים לו, מבינים אותו ומלווים אותו בעדינות, נהנים איתו, כי עכשיו — הוא כבר גדול!</p>`
                }
            }
        },


        "mitzvah": {
            title: "בת מצווה",
            description: "",
            fullText: "",
            images: [],
            modals: {
                session: {
                    title: "איך מתבצע?",
                    text: `<p>כבר בני 12/13?<br><br>הילד או הילדה שלכם עומדים לעשות את הצעד הגדול אל תוך עולם המבוגרים…<br><br>ומה יכול להיות מתאים יותר מצילומי בת/בר מצווה ובוק מיוחד שישקף באמת את מי שהם, יספר את הסיפור שלהם וידגיש את האישיות הייחודית שלהם?<br><br>רגע מיוחד של כיף, ביטחון עצמי וזיכרונות בלתי נשכחים — תוך כדי הוצאת המיטב מהם.<br><br>צילומי בת/בר המצווה מתקיימים בטבע או בלוקיישנים חיצוניים, במקומות שנבחרים בדיוק בהתאם לאופי ולטעם של כל ילד או ילדה, ונמשכים בדרך כלל כשעתיים.</p>`
                },
                importantInfo: {
                    title: "חשוב לדעת",
                    text: `<p>התחביבים והנושאים האהובים של חתני וכלות המצווה תמיד מוזמנים להשתלב בצילומים, כדי ליצור תמונות אמיתיות ואותנטיות שממש משקפות אותם.</p>`
                },
                whatToBring: {
                    title: "מה להביא",
                    text: `<ul><li>2–3 סטים שונים של בגדים והאביזרים המתאימים</li><li>מים / נשנוש קטן</li><li>מברשת, ספריי לשיער, סיכות, איפור לתיקונים קטנים</li><li>טישו / מגבונים</li><li>אביזרים הקשורים לתחביבים או לתחומי העניין</li></ul><p>והכי חשוב.... המטרה האמיתית היא פשוט ליהנות ולחוות רגע מיוחד יחד… כי לגדול ולגלות מי שהם זה פשוט מתנה ✨</p>`
                }
            }
        }
    }
};


app.get("/api/categories", (req, res) => {
    res.json(Object.keys(siteData.categories).map(key => ({
        id: key,
        title: siteData.categories[key].title,
        description: siteData.categories[key].description
    })));
});


app.get("/api/categories/:id", (req, res) => {
    const categoryId = req.params.id;
    const category = siteData.categories[categoryId];


    if (!category) {
        return res.status(404).json({ message: "קטגוריה לא נמצאה" });
    }


    const directoryPath = path.join(__dirname, "images", categoryId);


    if (!fs.existsSync(directoryPath)) {
        return res.json({ ...category, images: [] });
    }


    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.json({ ...category, images: [] });
        }


        const images = files
            .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
            .map(file => `images/${categoryId}/${file}`);


        res.json({
            ...category,
            images
        });
    });
});




app.get("/api/home-gallery", (req, res) => {
    const directoryPath = path.join(__dirname, "images", "home");


    if (!fs.existsSync(directoryPath)) {
        return res.json([]);
    }


    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.json([]);
        }


        const images = files
            .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
            .map(file => `images/home/${file}`);


        res.json(images);
    });
});




app.post("/api/ai-style", async (req, res) => {
    try {
        const { question, category } = req.body;


        const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "openai/gpt-4o-mini",
                    messages: [
                        {
                            role: "system",
                            content: `
את עוזרת AI באתר של צלמת בשם ברכה מלכי.


מותר לך לענות אך ורק על נושאים שקשורים לצילום ולשירותי האתר:
- בחירת בגדים לצילומים
- צבעים מתאימים לצילום
- לוקיישנים לצילום
- אביזרים לצילום
- טיפים להכנה לסשן
- התאמה לסוגי סשנים: הריון, ניו בורן, גיל שנה, חלאקה, משפחה, בת/בר מצווה, פורטרט
- מידע כללי על חוויית צילום


אם המשתמש שואל שאלה שלא קשורה לצילום או לאתר, אל תעני עליה.
במקום זה תכתבי:
"אני כאן כדי לעזור רק בנושאים שקשורים לצילומים, בגדים, לוקיישנים והכנה לסשן צילום."


הקטגוריה הנוכחית היא: ${category}


תעני בעברית בלבד.
תעני בצורה קצרה, נעימה, מקצועית וברורה.
`
                        },
                        {
                            role: "user",
                            content: question
                        }
                    ]
                })
            }
        );


        const data = await response.json();


        res.json({
            answer:
                data.choices?.[0]?.message?.content ||
                "לא הצלחתי לענות כרגע"
        });


    } catch (error) {
        console.error(error);


        res.status(500).json({
            answer: "אירעה שגיאה בחיבור ל-AI"
        });
    }
});




const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


