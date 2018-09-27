let errorHandler = (err,req,res,next)=>{
    console.log("application error handler called");
    console.log(err);
    res.send("application error handler called");

}

let notFoundHandler = (req,res,next)=>{
    console.log("Global not found handler called");
    res.status(404).send("Route not found in application");
}
module.exports={
    errorHandler:errorHandler,
    notFoundHandler:notFoundHandler
}