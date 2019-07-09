import React from 'react'

function ReadArticle({ location: { state: { article }} }) {
  return (
    <div className="ReadArticle">
      <div className="ReadArticle-articles">
        <h3 className="ReadArticle-title">{article.title}</h3>
        <p className="ReadArticle-text">{article.text}</p>
      </div>
    </div>
  )
}

export default ReadArticle
