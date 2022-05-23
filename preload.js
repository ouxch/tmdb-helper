// noinspection JSUnresolvedVariable,JSUnusedGlobalSymbols,JSUnresolvedFunction

const axios = require('axios')
const API_KEY = '0f2b77f461b2884086fccc2ac6358c9f'

const searchMovie = ({ query, year }) => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=zh&query=${encodeURIComponent(query)}&year=${year}`
  return axios.get(url)
    .then(({ status, data }) => {
      if (status === 200 && !!data?.results?.length) {
        return data.results.map(({ title, original_title, release_date }) => {
          return { title: `${title || original_title} (${release_date.split('-')[0]})` }
        })
      }
      return []
    })
    .catch(() => [])
}

window.searchMovie = searchMovie

window.exports = {
  "tmdb": {
    mode: "list",
    args: {
      // enter: (action, callback) => {},
      search: (action, text, callback) => {
        if (!text) {
          callback([])
          return
        }

        text.match(/[\w().-]+\.(\d{4})\..*/)
        const match = text.match(/(..+) (\d{4})/) ||
          text.match(/(..+) \((\d{4})\)/) ||
          text.match(/Top\d{3}\.([^\x00-\xff]+)\.([\w().]+)\.(\d{4})\..*/)

        if (!!match) {
          const [ query, year ] = match.slice(match.length - 2)
          window.searchMovie({
            query: query.replace(/\./g, ' ').trim(),
            year: year.trim()
          }).then(callback)
        }
      },
      select: (action, itemData) => {
        utools.copyText(itemData.title)
        utools.hideMainWindow()
        utools.simulateKeyboardTap('v', 'command')
      },
      placeholder: "从TMDB搜索电影信息，格式：name year"
    }
  }
}
