let pageData = {};

fetch(`/api/categories/${categoryId}`)
.then(res => res.json())
.then(data => {

    pageData = data;

    document.getElementById('title').innerText = data.title;
    document.getElementById('description').innerText = data.fullText;

    const gallery = document.getElementById('gallery');
    gallery.innerHTML = "";

    if (data.images && data.images.length > 0) {
        data.images.forEach(path => {
            const img = document.createElement('img');
            img.src = path;
            gallery.appendChild(img);
        });
    }

})
.catch(err => {
    console.error(err);
    document.getElementById('description').innerText = "שגיאה בטעינת תוכן";
});


// ===== מודל =====
function openModal(type){

const modal = document.getElementById("modal");
const text = document.getElementById("modal-text");

const content = pageData?.modals?.[type];

if(!content){
text.innerHTML = "<p>אין מידע זמין</p>";
modal.style.display = "block";
return;
}

text.innerHTML = `
<h2 style="color:#b76e79; margin-bottom:10px;">${content.title}</h2>
<div style="line-height:1.8;">${content.text}</div>
`;

modal.style.display = "block";
}

function closeModal(){
document.getElementById("modal").style.display = "none";
}

window.onclick = function(event){
const modal = document.getElementById("modal");
if(event.target === modal){
modal.style.display = "none";
}
}

function openAI() {
    document.getElementById("aiModal").style.display = "block";
}

function closeAI() {
    document.getElementById("aiModal").style.display = "none";
}

async function askAI() {

    const question =
        document.getElementById("aiQuestion").value;

    const answerDiv =
        document.getElementById("aiAnswer");

    if (!question.trim()) {
        answerDiv.innerHTML = "נא לכתוב שאלה 🙂";
        return;
    }

    answerDiv.innerHTML = "חושבת... 🤖";

    try {

        const response = await fetch(
          "/api/ai-style",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    question: question,
                    category: document.getElementById("title").innerText
                })
            }
        );

        const data = await response.json();

        answerDiv.innerHTML = data.answer;

    } catch (error) {

        console.error(error);

        answerDiv.innerHTML =
            "אירעה שגיאה בחיבור ל-AI";

    }
}
