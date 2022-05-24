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

const parseText = (text) => {
  console.log(text)
  if (!text) {
    console.log('text is empty')
    return
  }
  const name = text.replace(/[.\-]/g, ' ')
    .replace(/\(.*版\)/, '')
    .replace('aka The Professional Directors Cut', '')
    .replace('Director\'s.Cut', '')

  const match = name.match(/([\u4e00-\u9fa5]+)[.\s]+.*[.\s]+(\d{4})[.\s]+/) ||
    name.match(/([\u4e00-\u9fa5]+)[.\s]+(\d{4})[.\s]+/) ||
    name.match(/[.\s]+([a-zA-Z.\sⅠⅡⅢⅣⅤⅥⅦⅧⅨ\d]+)[.\s]+(\d{4})[.\s]+/)

  const length = match?.length ?? 0
  if (length === 3 || length === 4) {
    console.log([ ...match ])
    const query = match[1]
    const year = match[length - 1]
    const parse = {
      query: query.trim(),
      year: year.trim()
    }
    console.log(parse)
    return parse
  } else {
    console.log('text not match')
  }
}

module.exports = {
  searchMovie, parseText
}
