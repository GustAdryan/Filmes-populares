import { inputSearch, renderMovies, cleanAllMovies } from "../main.js"
import { apiKey } from "../environment/key.js"

export async function movieSearch() {
  const inputValue = inputSearch.value
  if (inputValue != '') {
    cleanAllMovies()
    const movies = await searchMovieByName(inputValue)
    movies.forEach(movie => renderMovies(movie))
  }
}

async function searchMovieByName(title) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${title}&language=en-US&page=1`
  const fetchResponse = await fetch(url)
  const { results } = await fetchResponse.json()
  return results
}