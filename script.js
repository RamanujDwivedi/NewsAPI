const API_KEY = "e2f92f17caeb4fdb8b88a71c4873c38d";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load" , () => fetchNews("India"));

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardcontainer = document.getElementById("cards-containers");
    const newscardtemplate = document.getElementById("template-news-card");

    cardcontainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardclone = newscardtemplate.content.cloneNode(true);
        fillDataInCard(cardclone, article);
        cardcontainer.appendChild(cardclone);
    });
}

function fillDataInCard(cardclone, article){
    const newsImg = cardclone.querySelector('#news-Img');
    const newsTitle = cardclone.querySelector('#news-title');
    const newsSource = cardclone.querySelector('#news-source');
    const newsDesc = cardclone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
    const date = new Date(article.publishedAt).toLocaleDateString("en-us" ,{ timeZone:"Asia/Jakarta"});

    newsSource.innerHTML = `${article.source.name} . ${date}`;

    cardclone.firstElementChild.addEventListener('click', () => {
        window.open(article.url , "_blank");
    })
}

let curSelectorNav = null;
function onNavClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectorNav?.classList.remove('active');
    curSelectorNav =  navItem;
    curSelectorNav.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const searchtext = document.getElementById('news-input');
searchButton.addEventListener('click', () =>{
    const query = searchtext.value;
    if(!query) return;
    fetchNews(query);
    curSelectorNav?.classList.remove('active');
    curSelectorNav = null;
})