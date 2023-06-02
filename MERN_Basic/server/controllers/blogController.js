const slugify = require("slugify")
//บันถึงข้อมูล
exports.create = (req,res) =>{
    const {title,content,author} = req.body
    const slug = slugify(title)
    //validate
    switch(true){
        case !title:
            return res.status(400).json({error : "กรุณาป้อนชื่อบทความ"})
            break;
        case !content:
            return res.status(400).json({error : "กรุณาป้อนเนื้อหาบทความ"})
            break;

    }
    res.json({
        data:{title,content,author,slug}
    })
}