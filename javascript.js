const API_KEY = 'api_key=3e8cb92173300dc3cd1ec1811185bc7a&language=ko&page=1'
const BASE_URL = 'https://api.themoviedb.org/3'
const API_URL = BASE_URL + '/movie/popular?' + API_KEY;
const IMG_URL ='https://image.tmdb.org/t/p/w500'
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;


//메인
const main = document.getElementById('main');
//찾기
const form = document.getElementById('form');
//찾기
const search = document.getElementById('search');




getmovie(API_URL)

function getmovie(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        showmovies(data.results);
    })
}


//카드 페이지
function showmovies(data) {
        main.innerHTML='';

    data.forEach(movie => {
        const {original_title, poster_path, vote_average, overview} = movie;
        //터미널에서 따옴
        const moviestar = document.createElement('div');
        moviestar.classList.add('movie');
        moviestar.innerHTML = `
        <img src= "${IMG_URL + poster_path}" alt="${original_title}">

        <div class="movie_info">
            <h2>${original_title}</h2>
            <span class="${getcolor(vote_average)}">${fixe(vote_average)}</span>
        </div>
        <div class="review">
        <h2>${original_title}</h2>
        ${overview}
        </div>
        `

        main.appendChild(moviestar);


        

    });
}



//점수 따라 색 바꾸기
function getcolor(vote){
    if(vote>8){
        return 'green'
    } else if(vote>5){
        return 'orange'
    }else{
        return 'red'
    }
}


function fixe(vote){
    return vote.toFixed(1);
}


//찾기기능
form.addEventListener('submit',(e) =>{
    e.preventDefault();

    const searchall = search.value;

    if(searchall){
    getmovie(SEARCH_URL+'&query='+searchall)
}else{getmovie(API_URL)}
})