const express = require('express');
const blogController = require('./../controllers/blog.js');
//const example = require('./../middlewares/example')
//const example1 = require('./../middlewares/example1')
let setRoute = (app) => {
    app.get("/hello-world/:abc/:xyz",blogController.helloWorldFunction);
    
    app.get("/example",blogController.printExample);
    app.post("/abc", blogController.myFun);
    app.get("/all",blogController.getAllBlog);
    app.get("/view/:blogId",blogController.viewByBlogId);
    app.post("/create",blogController.createBlog);
    app.put("/:blogId/edit",blogController.editBlog);
    app.get("/:blogId/count/view",blogController.increaseBlogView);
    app.get("/view/by/author/:author",blogController.viewByAuther);
    app.get("/view/by/category/:category",blogController.viewByCategory);
    app.post("/:blogId/delete",blogController.deleteBlog)
}
module.exports = {
    setRoute: setRoute 
}
