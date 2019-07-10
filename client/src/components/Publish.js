import React, { Fragment, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'

import articlesService from '../services/articlesService'

const useFormInput = (initial) => {
  const [value, setValue] = useState(initial)
  const handleChange = (e) => setValue(e.target.value)
  return [value, setValue, handleChange]
}

function Publish({ location }) {
  const { article = {} } = location.state || {}
  const isCreating = !article.id

  const [redirect, setRedirect] = useState(false)
  const [title, setTitle, handleTitleChange] = useFormInput(isCreating ? '' : article.title) // eslint-disable-line no-unused-vars
  const [text, setText, handleTextChange] = useFormInput(isCreating ? '' : article.text) // eslint-disable-line no-unused-vars

  const handleSubmit = e => e.preventDefault()

  if (redirect) {
    return (
      <Redirect to="/read"/>
    )
  }

  const getArticleData = () => {
    if (!title) {
      toast.error('Title is required')
      return null
    }

    if (!text) {
      toast.error('Text is required')
      return null
    }

    return {
      title,
      text,
    }
  }

  const handleDelete = () => {
    articlesService.deleteArticle(article.id)
      .then(() => setRedirect(true))
      .catch((err) => {
        toast.error('Failed to delete article. Ensure that both the push-service-demo-app and the push-api are running')
        console.error('Failed to delete article', err)
      })
  }

  const handleUpdate = () => {
    const data = getArticleData()
    if (!data) return

    articlesService.putArticle(article.id, data)
      .then(() => setRedirect(true))
      .catch((err) => {
        toast.error('Failed to update article. Ensure that both the push-service-demo-app and the push-api are running')
        console.error('Failed to update article', err)
      })
  }

  const handleCreate = () => {
    const data = getArticleData()
    if (!data) return

    articlesService.postArticle(data)
      .then(() => setRedirect(true))
      .catch((err) => {
        toast.error('Failed to create article. Ensure that both the push-service-demo-app and the push-api are running')
        console.error('Failed to create article', err)
      })
  }

  const createActions = () => {
    return (
      <Fragment>
        <button type="button" className="Publish-button" onClick={handleCreate}>Publish</button>
      </Fragment>
    )
  }

  const updateActions = () => {
    return (
      <Fragment>
        <button type="button" className="Publish-button" onClick={handleDelete}>Delete</button>
        <button type="button" className="Publish-button" onClick={handleUpdate}>Update</button>
      </Fragment>
    )
  }

  const actions = isCreating ? createActions() : updateActions()

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

        <div className="Publish-actions">
          {actions}
        </div>
      </form>
    </div>
  )
}

export default Publish
