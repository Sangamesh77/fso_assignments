const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const allBlogs = await Blog.find({})
  response.json(allBlogs)
})
  
blogsRouter.post('/', async ( request, response) => {
  if(request.body.likes === undefined){
    request.body = {...request.body, likes: 0}
  }
  if(!request.body.hasOwnProperty('title') || !request.body.hasOwnProperty('url')){
    response.status(400).send({ error: "No title or URL"})
  } else {
  const blog = new Blog(request.body)
  response.status(201).json(await blog.save())
  }
})

blogsRouter.delete('/:id', async ( request, response ) => {
  try{
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch(exception){
    console.log(exception)
  }

  blogsRouter.put('/:id', async ( request, response ) => {
    try{
      const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, {new: true})
      response.status(201).json(updatedBlog)
    } catch(exception){
      console.log(exception)
    }
  })
})

module.exports = blogsRouter