

// Select elements
const items = document.querySelectorAll(".category img");
const categories = document.querySelectorAll(".category");
const carousel = document.getElementById("carousel");


// Scale effect
function updateScale() {
    if (!carousel) return;


    const carouselRect = carousel.getBoundingClientRect();
    const carouselCenter = carouselRect.left + carouselRect.width / 2;


    items.forEach(item => {
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.left + rect.width / 2;


        const distance = Math.abs(carouselCenter - itemCenter);


        if (distance < 60) {
            item.style.transform = "scale(1.4)";
        } else {
            item.style.transform = "scale(1)";
        }
    });
}


// Event listeners for carousel
if (carousel) {
    carousel.addEventListener("scroll", updateScale);
}


window.addEventListener("resize", updateScale);
updateScale();




// Navigation on click
const pages = {
    "pregnancy": "pregnancy.html",
    "newborn": "newborn.html",
    "one-year": "one-year.html",
    "chalake": "chalake.html",
    "bat-mitzvah": "bat-mitzvah.html",
    "family": "family.html",
    "prints": "prints.html",
    "portrait": "portrait.html"
};


categories.forEach(category => {
    category.addEventListener("click", () => {
        const page = pages[category.id];
        if (page) {
            window.location.href = page;
        }
    });
});


document.querySelectorAll(".category").forEach(category => {
    category.addEventListener("click", function () {
        const id = this.id;


        if (id === "pregnancy") window.location.href = "pregnancy.html";
        if (id === "newborn") window.location.href = "newborn.html";
        if (id === "one-year") window.location.href = "one-year.html";
        if (id === "chalake") window.location.href = "chalake.html";
        if (id === "bat-mitzvah") window.location.href = "bat-mitzvah.html";
        if (id === "family") window.location.href = "family.html";
        if (id === "prints") window.location.href = "prints.html";
        if (id === "portrait") window.location.href = "portrait.html";
    });
});


document.querySelectorAll(".category").forEach(category => {
    category.addEventListener("click", function () {
        window.location.href = this.id + ".html";
    });
});


fetch("/api/home-gallery")
.then(res => res.json())
.then(images => {
    const gallery = document.getElementById("heroSlider");


    if (!gallery || images.length === 0) return;


   const allImages = [
    ...images,
    ...images,
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




