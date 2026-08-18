// ניווט מדף הבית לעמודי הקטגוריות
const pages = {
    "Maternity": "pregnancy.html",
    "newborn": "newborn.html",
    "Smashcake": "one-year.html",
    "chalake": "chalake.html",
    "batmitzvah": "bat-mitzvah.html",
    "family": "family.html",
    "prints": "prints.html",
    "portrait": "portrait.html"
};


document.querySelectorAll(".category").forEach(category => {
    category.addEventListener("click", () => {
        const page = pages[category.id];


        if (page) {
            window.location.href = page;
        }
    });
});


// גלילה חלקה בתפריט העליון
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();


        const target = document.querySelector(this.getAttribute("href"));


        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});


// גלריית תמונות זזה בדף הבית
fetch('/api/home-gallery')
.then(res => res.json())
.then(images => {
    const gallery = document.getElementById("heroSlider");


    if (!gallery || images.length === 0) return;


    const allImages = [
        ...images,
        ...images,
        ...images,
        ...images
    ];


    allImages.forEach(path => {
        const img = document.createElement("img");
        img.src = path;
        img.className = "slide";
        gallery.appendChild(img);
    });
})
.catch(err => {
    console.error("שגיאה בטעינת גלריית הבית:", err);
});






