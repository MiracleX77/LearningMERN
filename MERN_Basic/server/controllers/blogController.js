const slugify = require("slugify")
const Blogs = require("../models/blogs")
const {v4:uuidv4} = require("uuid")
//บันถึงข้อมูล
exports.create =  async (req,res) =>{
    const {title,content,author} = req.body
    let slug = slugify(title) || uuidv4()

    //validate
    switch(true){
        case !title:
            return res.status(400).json({error : "กรุณาป้อนชื่อบทความ"})
            break;
        case !content:
            return res.status(400).json({error : "กรุณาป้อนเนื้อหาบทความ"})
            break;        
    }

    try{
        const dataBlog = await Blogs.create({title,content,author,slug})
        res.json(dataBlog)
    }
    catch (err){
        res.status(400).json({error:"ชื่อบทความซ้ำกัน"})
    }
}

exports.getAllblogs= async (req,res) =>{
    try{
        const dataBlogs = await Blogs.find({}).exec()
        res.json(dataBlogs)
    }
    catch(err){
        res.json(err)
    }
}

exports.getSingleBlog = async (req,res)=>{
    try{
        const {slug} = req.params
        const datablog =  await Blogs.findOne({slug}).exec()
        res.json(datablog)
    }
    catch (err){
        res.json(err)
    }
}

exports.removeBlog = async(req,res) =>{
    try{
        const {slug} = req.params
        await Blogs.findOneAndRemove({slug}).exec()
        res.json({message:"remove complete"})
    }
    catch (err){
        res.json(err)
    }
}

exports.updateBlog= async (req,res)=>{
    const {slug} = req.params
    const {title,content,author} = req.body
    try{
        const dataBlog = await Blogs.findOneAndUpdate({slug},{title,content,author},{new:true}).exec()
        res.json(dataBlog)
    }
    catch (err){
        res.json(err)
    }
}