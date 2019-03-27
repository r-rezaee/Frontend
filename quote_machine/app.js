//cash dom
const quote_img = document.querySelector(".img-box > img");
const quote_text = document.querySelector(".quote");
const quote_author = document.querySelector(".title");

const new_quote = document.getElementById("getQuote");
new_quote.addEventListener('click', function(e){
    showQuote();
    e.preventDefault();
});
const twitt_quote = document.querySelector("#twitt");


// the site wont return more than 10 quotes per request
const url="https://thesimpsonsquoteapi.glitch.me/quotes?count=10";


let quotes = [];


// the api server won't return more than 10 quotes per request
// call fetchQuotes function before user reaches the 
// 10:th quote

function fetchQuotes(){
    fetch(url)
    .then((response) => response.json())
    .then(function(newQuote){
        quotes.push(...newQuote);
        console.log(quotes);
    });
        
}

fetchQuotes();


let randNum = 0;

// show the quote
function showQuote(){
    quote_img.style.transform = null;
    quote_img.src = quotes[randNum].image;
    quote_img.alt = quotes[randNum].character;
    quote_text.innerHTML = quotes[randNum].quote;
    quote_author.innerHTML = quotes[randNum].character;
    console.log(quotes[randNum].characterDirection)
    if(quotes[randNum].characterDirection === "Right"){
        quote_img.style.transform = "scaleX(-1)";
    }

    let tweetUrl = "https://twitter.com/intent/tweet?text=" + quotes[randNum].quote
    + ' - ' + quotes[randNum].character;

    twitt_quote.setAttribute("href", tweetUrl);


    randNum ++;
    
    if(randNum % 10 === 0){
        fetchQuotes();
    }

}
