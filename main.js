import { apiKey } from "./environment/key.js";

let moviesContainer = document.querySelector('.container-movies');

async function getPopularMovies() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
  const fetchResponse = await fetch(url)
  const { results } = await fetchResponse.json()
  return results
} 

window.onload = async function() {
  const movies = await getPopularMovies()
  movies.forEach(movie => renderMovies(movie))
}

function renderMovies(movie) {
    const { title, poster_path, vote_average, release_date, overview } = movie;
    const isFavorited = false;

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