// noinspection JSUnresolvedVariable,JSUnusedGlobalSymbols,JSUnresolvedFunction

const { parseText, searchMovie, searchTv } = require('./tmdb')

window.searchMovie = searchMovie
window.searchTv = searchTv
window.parseText = parseText

window.exports = {
  "tmdb": {
    mode: "list",
    args: {
      // enter: (action, callback) => {},
      search: (action, text, callback) => {
        const parse = window.parseText(text)
        !!parse ? window.searchMovie(parse).then(callback) : callback([])
      },
      select: (action, itemData) => {
        utools.copyText(itemData.title)
        utools.hideMainWindow()
        utools.simulateKeyboardTap('v', 'command')
      },
      placeholder: "从 themoviedb.org 搜索电影信息"
    }
  },
  "tvdb": {
    mode: "list",
    args: {
      // enter: (action, callback) => {},
      search: (action, text, callback) => {
        const parse = window.parseText(text)
        !!parse ? window.searchTv(parse).then(callback) : callback([])
      },
      select: (action, itemData) => {
        utools.copyText(itemData.title)
        utools.hideMainWindow()
        utools.simulateKeyboardTap('v', 'command')
      },
      placeholder: "从 themoviedb.org 搜索剧集信息"
    }
  },
}
