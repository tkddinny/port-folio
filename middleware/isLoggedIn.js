import jwt from 'jsonwebtoken'
import registerModel from '../model/register.Model.js'

const jsonVerify = async ( req, res, next ) =>{
  if(!req.cookies.token){
    return res.redirect('/')
  }

  try {
    const decode = jwt.verify(req.cookies.token , process.env.SECRET_KEY)
    const user = await registerModel.findOne({email: decode.email}).select("-password")
    req.user = user;
    next();
  } catch (error) {
    res.redirect('/')
  }
}

export default jsonVerify;