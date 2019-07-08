import React, { useState } from 'react'
import { toast } from 'react-toastify'

import articlesService from '../services/articlesService'

const useFormInput = (initial) => {
  const [value, setValue] = useState(initial)
  const handleChange = (e) => setValue(e.target.value)
  return [value, setValue, handleChange]
}

function Publish() {
  const [title, setTitle, handleTitleChange] = useFormInput('')
  const [text, setText, handleTextChange] = useFormInput('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title) {
      alert('Title is required')
      return
    }

    if (!text) {
      alert('Text is required')
      return
    }

    const articleData = {
      title,
      text,
    }

    articlesService.postArticle(articleData)
      .then(() => {
        setTitle('')
        setText('')
      })
      .catch((err) => {
        toast.error('Failed to post article. Ensure that both the push-service-demo-app and the push-api are running')
        console.error('Failed to post article', err)
      })
  }

  return (
    <div className="Publish">
      <h2 className="App-subtitle">Publish Articles</h2>
      <form className="Publish-form" autoComplete="off" onSubmit={handleSubmit}>
        <div className="Publish-field">
          <label htmlFor="title">Title</label>
          <input name="title" value={title} onChange={handleTitleChange} />
        </div>
        <div className="Publish-field">
          <label htmlFor="text">Text</label>
          <textarea name="title" value={text} onChange={handleTextChange} />
        </div>

        <div className="Publish-field">
          <button type="submit" className="Publish-button">Publish</button>
        </div>
      </form>
    </div>
  )
}

export default Publish
