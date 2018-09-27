let example1Middleware = (req,res,next)=>{
    req.user1={"name":"abc","lastName":"def"};
    next();

}
module.exports={
    example1Middleware:example1Middleware
}