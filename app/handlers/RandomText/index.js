const querystring = require('querystring')
const axios = require('axios')
const toASCII = require('unidecode')

function getRandomText () {
  const randomTitleQuery = querystring.stringify({
    action: 'query',
    list: 'random',
    rnnamespace: 0,
    nlimit: 1,
    format: 'json'
  })

  const randomTitle = `https://en.wikipedia.org/w/api.php?${randomTitleQuery}`

  return axios.get(randomTitle)
    .then(response => {
      const title = response.data.query.random[0].title
      const articleQuery = querystring.stringify({
        action: 'query',
        titles: title,
        prop: 'extracts',
        exintro: true,
        explaintext: true,
        format: 'json'
      })
      const articleText = `https://en.wikipedia.org/w/api.php?${articleQuery}`
      return axios.get(articleText)
    })
    .then(response => {
      const pages = response.data.query.pages
      const firstPage = Object.values(pages)[0]
      const text = firstPage.extract.replace(/\n/g, '').trim()
      const simplifiedText = toASCII(text)
      return simplifiedText
    })
    .catch(error => {
      console.error(error)
      return ''
    })
}

function getRandomTexts (quantity = 1) {
  const texts = []
  while (quantity > 0) {
    texts.push(getRandomText())
    quantity--
  }
  return Promise.all(texts)
    .then(values => values
      .filter(text => text !== '')
      .join('\n\n'))
}

module.exports = {
  getRandomText,
  getRandomTexts
}
