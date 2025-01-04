const Blog = require("../models/blog")
const mongoose = require('mongoose')

const listWith3Blogs = [
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      _id: "6778c9d0c1564b24dc880a0a"
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      _id: "6778c9d0c1564b24dc880a0b"
    }]

const listWith3BlogsResponse = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        id: "6778c9d0c1564b24dc880a0a"
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        id: "6778c9d0c1564b24dc880a0b"
    }]

const rePopulateBlogs = async () => {
        await Blog.deleteMany({})
      
        const promisesList = listWith3Blogs.map(blog => {
          const blogToSave = new Blog(blog)
          return blogToSave.save()
        })
      
        await Promise.all(promisesList)
}

module.exports = {
    listWith3Blogs, listWith3BlogsResponse, rePopulateBlogs
}