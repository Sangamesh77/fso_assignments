const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const allBlogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
  response.json(allBlogs)
})
  
blogsRouter.post('/', async ( request, response) => {
  if(request.body.likes === undefined){
    request.body = {...request.body, likes: 0}
  }
  if(!request.body.hasOwnProperty('title') || !request.body.hasOwnProperty('url')){
    response.status(400).send({ error: "No title or URL"})
  } else {

  if (!request.user) {    
    response.status(401).json({ error: 'token invalid' })  
  }

  const user = await User.findById(request.user)
  const blog = new Blog({
    ...request.body,
    user: user.id
  })
  user.blogs = user.blogs.concat(blog.id)
  await user.save()

  response.status(201).json(await blog.save())
  }
})

blogsRouter.delete('/:id', async ( request, response ) => {
  try{
    if (!request.user) {    
      response.status(401).json({ error: 'token invalid' })  
    }
    const blog = await Blog.findById(request.params.id)
    console.log("Blog:", blog)
    console.log("Blog user ID", blog.user.toString())
    console.log("Token ID", request.user)
    if(blog.user.toString() === request.user){
      await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
    } else {
      response.status(401).json({ error: 'user not authorised' })
    }
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