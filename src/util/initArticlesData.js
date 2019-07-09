const articlesService = require('../services/articlesService')
const pushService = require('../services/pushService')

const articles = [
  {
    id: '0985dff2-9ab4-44ea-a9d0-f9720892a421',
    title: 'USA wins Women\'s Soccer World Cup',
    text: "For the fourth time in history and second time in a row, the United States women's national team is the world's best. In Lyon, France on Sunday, the Americans beat the Netherlands 2-0 in the final at the 2019 Women's World Cup. Megan Rapinoe and Rose Lavelle both scored in the second half, and Jill Ellis remained unbeaten in World Cup play, becoming the first manager to win the tournament twice.",
  },
  {
    id: '5ca53580-8ba0-4a85-8fbe-70a32d967632',
    title: 'Age Of Empires 2 Definitive Edition is comming',
    text: "After the massive success that was Age of Empires: Definitive Edition, it's no surprise that developer Forgotten Empires has chosen to celebrate the series' 20th anniversary by releasing a remastered version of Age of Empires II. \n\nWhat we didn't expect, however, was just how much content we'd get: The Definitive Edition includes the base game and every Age of Empires expansion to date for $19.99 - that's over 20 years of content. That means you get 35 civilizations in total, equating to over 200 hours of content.",
  },
]

const initData = async () => {
  const promises = []

  articles.forEach((article) => {
    promises.push(articlesService.create(article))
    promises.push(pushService.ensureArticleChannel(article))
  })

  return Promise.all(promises)
}

module.exports = initData
