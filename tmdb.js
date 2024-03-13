const axios = require('axios')
const API_KEY = '0f2b77f461b2884086fccc2ac6358c9f'

const searchMovie = ({ query, year }) => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=zh&query=${encodeURIComponent(query)}&year=${year}`
  console.log(url)
  return axios.get(url)
    .then(({ status, data }) => {
      if (status === 200 && !!data?.results?.length) {
        return data.results.map(({ title, original_title, release_date, overview: description }) => {
          return { title: `${title || original_title} (${release_date.split('-')[0]})`, description }
        })
      }
      return []
    })
    .catch(() => [])
}

const searchTv = ({ query, year }) => {
  const url = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=zh&query=${encodeURIComponent(query)}&first_air_date_year=${year}`
  console.log(url)
  return axios.get(url)
    .then(({ status, data }) => {
      if (status === 200 && !!data?.results?.length) {
        return data.results.map(({ name, original_name, first_air_date, overview: description }) => {
          return { title: `${name || original_name} (${first_air_date.split('-')[0]})`, description }
        })
      }
      return []
    })
    .catch(() => [])
}

const parseText = (text) => {
  console.log(text)
  if (!text) {
    console.log('text is empty')
    return
  }

  // Extract title and year from the filename
  const match = text.match(/(.+?)\.(\d{4})\./)
  if (match) {
    // Replace underscores with spaces for the title
    const title = match[1].replace(/\./g, ' ')
    const year = match[2]
    const parse = {
      query: title,
      year: year
    }
    console.log(parse)
    return parse
  }
  console.log('text not match')
}

module.exports = {
  searchMovie, searchTv, parseText
}
