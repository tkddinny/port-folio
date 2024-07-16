import projectModel from "../model/project.model.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null, 'public/upload')
  },
  filename: function ( req,file, cb ){
    const filename = `${Date.now()} - ${file.originalname}`
    cb(null, filename)
  }
})
const upload = multer({storage})

// get project 
const projectGet = (req,res) =>{
  try {
    res.render('projectCreate')
  } catch (error) {
    res.status(404).json({error:"projectGet Err:"})    
  }
}

//create user
const createProject = async (req,res) =>{
  try {
    const { title , descripation , url } = req.body;
    if(title === ''){
      res.status(404).json({message:"title field is empty"})
    }

    else if(descripation === ''){
      res.status(404).json({message:"descripation field is empty"})
    }

    else if(url === ''){
      res.status(404).json({message:"url field is empty"})
    }

    else{
      const project = await projectModel.create({
        image: `upload/${req.file.filename}` ,
        title,
        descripation,
        url,
      })
      if(project){
        res.status(200).redirect('/register/admin')
      }
    }
  } catch (error) {
    res.status(500).json({error:"project Create Err:"})
  }
}

//get data
const getProject = async (req,res) =>{
  try {
    const project = await projectModel.find();
    if(project){
      return res.status(200).render("project", { project })
    }
  } catch (error) {
    res.status(500).json({error:"get project Err:"})
  }
}

export { createProject , upload , getProject , projectGet}