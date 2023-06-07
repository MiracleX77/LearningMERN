const express = require('express')
const router = express.Router()
const {create,getAllblogs,getSingleBlog,removeBlog,updateBlog} =require('../controllers/blogController')
const {requireLogin} = require("../controllers/authController")

router.get("/blogs",getAllblogs)
router.get("/blog/:slug",getSingleBlog)
router.delete('/blog/:slug',requireLogin,removeBlog)
router.put('/blog/:slug',requireLogin,updateBlog)
router.post('/create',requireLogin,create)


module.exports = router