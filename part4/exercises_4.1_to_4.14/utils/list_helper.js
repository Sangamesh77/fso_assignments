const ld = require('lodash')

const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {
    if(blogs.length > 0){
    const sum = blogs.reduce((acc, blog) => {
        return acc + blog.likes
    }, 0)
    return sum
} else {
        return 0
    }
} 

const mostLiked = (blogs) => {
    const blogsByAuthor = ld.groupBy(blogs, value => value.author)
    let topLiked = blogs[0].author
    let maxLikes = 0
    for(let author in blogsByAuthor){
        const totalLikes = blogsByAuthor[author].reduce((acc, blog) => acc += blog.likes, 0)
        if(maxLikes < totalLikes){
            topLiked = author
            maxLikes = totalLikes
        }
    }
    return {
        author: topLiked,
        likes: maxLikes
      }
}

const mostBlogs = (blogs) => {
    const blogsByAuthor = ld.countBy(blogs, (value) => value.author)
    let topAuthor = blogs[0].author
    for(let author in blogsByAuthor){
        topAuthor = blogsByAuthor[author] > blogsByAuthor[topAuthor] ? author : topAuthor
    }
    return {"author": topAuthor, "blogs": blogsByAuthor[topAuthor]}
}

  module.exports = {
    dummy,
    totalLikes,
    mostLiked,
    mostBlogs
  }