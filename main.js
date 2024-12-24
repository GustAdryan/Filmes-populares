import { apiKey } from "./environment/key.js";
import { movieSearch } from "./js/search.js";

export const moviesContainer = document.querySelector('.container-movies');
export const inputSearch = document.querySelector('#search');
const searchBtn = document.querySelector('.iconSearch');
const inputcheckbox = document.querySelector('#MoviesFav');

inputcheckbox.addEventListener('change', checkCheckboxStatus)

searchBtn.addEventListener('click', movieSearch);
inputSearch.addEventListener('keyup', function(event) {
  console.log(event.key)
  if (event.keyCode == 13) {
    movieSearch()
    return
  }
})

function checkCheckboxStatus() {
  const isChecked = inputcheckbox.checked
  if (isChecked) {
    cleanAllMovies()
    const movies = getFavoriteMovies() || []
    movies.forEach(movie => renderMovies(movie))
  } else {
    cleanAllMovies()
    getAllPopularMovies()
  }
}

async function getPopularMovies() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
  const fetchResponse = await fetch(url)
  const { results } = await fetchResponse.json()
  console.log(results)
  return results
} 

function favoriteButtonPressed(event, movie) {
  const favoriteState = {
    favorited: 'img/Vector.svg',
    notFavorited: 'img/Heart.svg'
  }

  if(event.target.src.includes(favoriteState.notFavorited)) {
    // aqui ele será favoritado
    event.target.src = favoriteState.favorited
    saveToLocalStorage(movie)
  } else {
    // aqui ele será desfavoritado
    event.target.src = favoriteState.notFavorited
    removeFromLocalStorage(movie.id)
  }
}

function getFavoriteMovies() {
  return JSON.parse(localStorage.getItem('favoriteMovies'))
}

function saveToLocalStorage(movie) {
  const movies = getFavoriteMovies() || []
  movies.push(movie)
  const moviesJSON = JSON.stringify(movies)
  localStorage.setItem('favoriteMovies', moviesJSON)
}

function checkMovieIsFavorited(id) {
  const movies = getFavoriteMovies() || []
  return movies.find(movie => movie.id == id)
  console.log(id)
}

function removeFromLocalStorage(id) {
  const movies = getFavoriteMovies() || []
  const findMovie = movies.find(movie => movie.id == id)
  const newMovies = movies.filter(movie => movie.id != findMovie.id)
  localStorage.setItem('favoriteMovies', JSON.stringify(newMovies))
} 

async function getAllPopularMovies() {
  const movies = await getPopularMovies()
  movies.forEach(movie => renderMovies(movie))
}

window.onload = async function() {
  getAllPopularMovies()
}


export function renderMovies(movie) {
    const { id, title, poster_path, vote_average, release_date, overview } = movie;
    const isFavorited = checkMovieIsFavorited(id);

    const year = new Date(release_date).getFullYear()
    const image = `https://image.tmdb.org/t/p/w500${poster_path}`

    //container principal do filme
    const movies_card = document.createElement('li');
    movies_card.classList.add('movies-card');
    moviesContainer.appendChild(movies_card);

    //Imagem do filme
    const moviesImage = document.createElement('img');
    moviesImage.classList.add('card-img');
    moviesImage.src = image;
    movies_card.appendChild(moviesImage);

    //div principal
    const card_name = document.createElement('div');
    card_name.classList.add('card-name');
    movies_card.appendChild(card_name);

        /// dentro da div principal ////

        ///Titulo
        const name = document.createElement('h6');
        name.classList.add('name');
        name.textContent = `${title}(${year})`;
        card_name.appendChild(name);

        ///div rating e favoritos ///
        const rating_container = document.createElement('div');
        rating_container.classList.add('rating-container');
        card_name.appendChild(rating_container);

            /// div rating
            const ratinggg = document.createElement('div');
            rating_container.appendChild(ratinggg);
            const ratingImage = document.createElement('img');
            ratingImage.src = './img/Star.svg';
            const ratingSpan = document.createElement('span');
            ratingSpan.textContent = vote_average;
            ratinggg.appendChild(ratingImage);
            ratinggg.appendChild(ratingSpan);

            ///div favoritar
            const favoritar = document.createElement('div');
            rating_container.appendChild(favoritar);
            const favoritarImage = document.createElement('img');
            favoritarImage.src = isFavorited ? './img/Vector.svg' : './img/Heart.svg';
            favoritarImage.addEventListener('click', (event) => favoriteButtonPressed(event, movie) )
            const favoritarSpan = document.createElement('span');
            favoritarSpan.textContent = 'Favoritar';
            favoritar.appendChild(favoritarImage);
            favoritar.appendChild(favoritarSpan);

            

    //descrição do filme
    const card_story = document.createElement('p');
    card_story.textContent = overview;
    card_story.classList.add('card-story');
    movies_card.appendChild(card_story);

}