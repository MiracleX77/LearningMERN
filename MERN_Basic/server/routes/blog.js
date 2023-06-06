const express = require('express')
const router = express.Router()
const {create,getAllblogs,getSingleBlog,removeBlog,updateBlog} =require('../controllers/blogController')

router.post('/create',create)
router.get("/blogs",getAllblogs)
router.get("/blog/:slug",getSingleBlog)
router.delete('/blog/:slug',removeBlog)
router.put('/blog/:slug',updateBlog)

module.exports = router