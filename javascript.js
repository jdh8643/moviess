const API_KEY = 'api_key=3e8cb92173300dc3cd1ec1811185bc7a&language=ko&page=1';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/movie/popular?' + API_KEY;
const IMG_URL ='https://image.tmdb.org/t/p/w500';
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;

// 메인 컨테이너
const main = document.getElementById('main');
// 찾기 기능
const form = document.getElementById('form');
const search = document.getElementById('search');

// 모달 관련 요소들
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const movieTitle = document.getElementById('movieTitle');
const movieContent = document.getElementById('movieContent');
const modalDate = document.getElementById('modalDate');
const modalRating = document.getElementById('modalRating');
const closeBtn = document.querySelector('.close');

// 영화 목록 가져오기
getMovies(API_URL);

function getMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data.results);
            showMovies(data.results);
        });
}

// 영화 카드 생성 및 표시
function showMovies(data) {
    main.innerHTML = ''; // 기존 콘텐츠 초기화

    data.forEach(movie => {
        const { original_title, poster_path, vote_average, overview, release_date } = movie;
        
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src="${IMG_URL + poster_path}" alt="${original_title}">
            <div class="movie_info">
                <h2>${original_title}</h2>
                <span class="${getColor(vote_average)}">${vote_average.toFixed(1)}</span>
            </div>
            <div class="review">
                <h2>${original_title}</h2>
                ${overview}
            </div>
        `;

        // 클릭 시 모달 창 열기
        movieEl.addEventListener('click', () => {
            openModal(movie);
        });

        main.appendChild(movieEl);
    });
}

// 평점에 따른 색상 반환
function getColor(vote) {
    if (vote > 8) {
        return 'green';
    } else if (vote > 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

// 모달 창 열기
function openModal(movie) {
    modalImage.src = IMG_URL + movie.poster_path;
    movieTitle.innerText = movie.original_title;
    movieContent.innerText = movie.overview;
    modalDate.innerText = movie.release_date;
    modalRating.innerText = movie.vote_average.toFixed(1);

    modal.style.display = 'block'; // 모달을 보이도록 설정
}

// 모달 닫기 버튼 클릭 시 모달 닫기
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none'; // 모달을 숨김
});

// 모달 외부 클릭 시 닫기
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// 검색 기능
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCH_URL + '&query=' + searchTerm);
    } else {
        getMovies(API_URL);
    }
});
