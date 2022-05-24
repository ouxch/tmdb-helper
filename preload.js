// noinspection JSUnresolvedVariable,JSUnusedGlobalSymbols,JSUnresolvedFunction

const { parseText, searchMovie } = require('./tmdb')

window.searchMovie = searchMovie
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
      placeholder: "从TMDB搜索电影信息，格式：name year"
    }
  }
}
