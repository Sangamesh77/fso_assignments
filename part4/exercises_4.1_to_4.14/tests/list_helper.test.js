const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const listHelper = require('../utils/list_helper')
const testHelper = require('./test_helper')
const mongoose = require('mongoose')

const app = require("../app")
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(testHelper.rePopulateBlogs())

test('get all blogs', async () => {
  const allBlogs = await api.get("/api/blogs")
  assert.strictEqual(allBlogs.body.length, 2)
})

test('ensure contentes are accurate including id parameter', async () => {
  const allBlogs = await api.get("/api/blogs")
  assert.deepStrictEqual(testHelper.listWith3BlogsResponse, allBlogs.body)
})

test('Add a blog post', async () => {
  const newBlog = {
      title: "New React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns-NEW.com/",
      likes: 12,
      id: "6778c9d0c1564b24dc880123"
  }
  await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
  const allBlogs = await api.get("/api/blogs")
  await testHelper.rePopulateBlogs()
  assert.strictEqual(allBlogs.body.length, 3)
})

test('Adding blog without likes parameter defaults it to 0', async () => {
  const newBlog = {
    title: "New React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns-NEW.com/",
    _id: "6778c9d0c1564b24dc880124"
  }
  await api
  .post("/api/blogs")
  .send(newBlog)
  .expect(201)
  
  const requiredBlog = await Blog.findById("6778c9d0c1564b24dc880124")
  assert.strictEqual(requiredBlog.likes, 0)
})

test('Adding blog without url parameter returns 400', async () => {
  const newBlog = {
    title: "New React patterns",
    author: "Michael Chan",
    _id: "6778c9d0c1564b24dc880125"
  }
  const resp = await api
  .post("/api/blogs")
  .send(newBlog)
  //.expect(400)

  assert.strictEqual(resp.statusCode, 400)
})

describe("delete and update blogs", () => {
  
  test('Delete a blog', async () => {
    await api.delete("/api/blogs/6778c9d0c1564b24dc880124").expect(204)
    
    const requiredBlog = await Blog.findById("6778c9d0c1564b24dc880124")
    assert.equal(requiredBlog, undefined)
  })

  test("Update a blog", async () => {
    const updatedBlog = {
      title: "React patterns new",
      author: "Michael",
      url: "https://reactpatternsNEW.com/",
      likes: 17
    }
    await api
          .put('/api/blogs/6778c9d0c1564b24dc880a0a')
          .send(updatedBlog)
          .expect(201)
    const requiredBlog = await Blog.findById("6778c9d0c1564b24dc880a0a")
    for(let key in updatedBlog){
      assert.strictEqual(requiredBlog[key], updatedBlog[key])
    }
  })

})

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ]
  const listWith3Blogs = [
        {
          _id: "5a422a851b54a676234d17f7",
          title: "React patterns",
          author: "Michael Chan",
          url: "https://reactpatterns.com/",
          likes: 7,
          __v: 0
        },
        {
          _id: "5a422aa71b54a676234d17f8",
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          likes: 5,
          __v: 0
        },
        {
          _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 12,
          __v: 0
        }]

    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      assert.strictEqual(result, 5)
    })

    test('when list has multiple blogs, equals sum of likes', () => {
        const result = listHelper.totalLikes(listWith3Blogs)
        assert.strictEqual(result, 24)
      })
    
      test('when list has 0 blogs, equals 0 likes', () => {
        const result = listHelper.totalLikes([])
        assert.strictEqual(result, 0)
      })
  })

  describe('top author', () => {
    const listWith6Blogs = [
        {
          _id: "5a422a851b54a676234d17f7",
          title: "React patterns",
          author: "Michael Chan",
          url: "https://reactpatterns.com/",
          likes: 7,
          __v: 0
        },
        {
          _id: "5a422aa71b54a676234d17f8",
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          likes: 5,
          __v: 0
        },
        {
          _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 12,
          __v: 0
        },
        {
          _id: "5a422b891b54a676234d17fa",
          title: "First class tests",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
          likes: 10,
          __v: 0
        },
        {
          _id: "5a422ba71b54a676234d17fb",
          title: "TDD harms architecture",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
          likes: 0,
          __v: 0
        },
        // {
        //   _id: "5a422bc61b54a676234d17fc",
        //   title: "Type wars",
        //   author: "Robert C. Martin",
        //   url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        //   likes: 2,
        //   __v: 0
        // }  
      ]
    test('when list has multiple blogs, equals any blog with highest likes', () => {
        const result = listHelper.mostBlogs(listWith6Blogs)
        assert.deepStrictEqual(result, {"author": listWith6Blogs[2].author, "blogs": 2})
    })
})

describe('most liked', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]
const listWith3Blogs = [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
      },
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 7,
        __v: 0
      }]



 

    test('when list has only one blog, equals the same one', () => {
      const result = listHelper.mostLiked(listWithOneBlog)
      assert.deepStrictEqual(result, {"author": listWithOneBlog[0].author, "likes": listWithOneBlog[0].likes})
    })

    test('when list has multiple blogs, equals any blog with highest likes', () => {
        const result = listHelper.mostLiked(listWith3Blogs)
        assert.deepStrictEqual(result, {"author": "Edsger W. Dijkstra", "likes": 12})
      })
  })

  after(async () => {
    await mongoose.connection.close()
  })
