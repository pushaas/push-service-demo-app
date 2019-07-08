import React from 'react'

function ReadArticle({ match }) {
  return (
    <div>
      {match.params.id}
    </div>
  )
}

export default ReadArticle
