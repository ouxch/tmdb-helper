// noinspection JSUnresolvedVariable,JSUnusedGlobalSymbols,JSUnresolvedFunction

const axios = require('axios')
const API_KEY = '0f2b77f461b2884086fccc2ac6358c9f'

const searchMovie = ({ query, year }) => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=zh&query=${encodeURIComponent(query)}&year=${year}`
  console.log(query, year)
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

window.searchMovie = searchMovie

window.exports = {
  "tmdb": {
    mode: "list",
    args: {
      // enter: (action, callback) => {},
      search: (action, text, callback) => {
        if (!text) {
          callback([])
          console.log('text is empty')
          return
        }

        text.match(/[\w().-]+\.(\d{4})\..*/)
        const match = text.match(/Top\d{3}\.([\u4e00-\u9fa5()]+)\.([\w().]+)\.(\d{4})\..*/) ||
          text.match(/^(..+)\s(\d{4})$/) ||
          text.match(/^(..+)\s\((\d{4})\)$/) ||
          text.match(/([\w().-]+)\.(\d{4})\..*/) ||
          text.match(/([\w().\s-]+)\s(\d{4})\s.*/)

        if (!match) {
          callback([])
          console.log('text not match')
          return
        }

        const [ query, year ] = match.slice(match.length - 2)
        window.searchMovie({
          query: query.replace(/[.\-]/g, ' ').replace('(导演剪辑版)','').replace('aka The Professional Directors Cut').trim(),
          year: year.trim()
        }).then(callback)
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
