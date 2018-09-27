const express = require('express');
const mongoose =require('mongoose');
const shortid = require('shortid');
const response = require('./../libs/responsiveLib.js');
let BlogModel = mongoose.model('Blog');
let helloWorldFunction =(req,res) =>{
    console.log(req.params);
    console.log(req.query);
    res.send("hello world from controller");
}
let printExample = (req,res) =>{
    console.log(req.query);
    res.send("Example data");
}
let myFun = (req,res) =>{
    console.log("inside myFun");
    console.log(req.body);
    res.send("my function");
}
let getAllBlog = (req,res) =>{
    console.log("inside getAllBlog controller");
    var host = req.headers['host']; 
    console.log(host);
    console.log(req.ip);
    BlogModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) =>{
            if(err){
                console.log(err);
                res.send(err);
            }else if(!result){
                const p = abc.generate("No blog found","custom message",10,null);
                console.log("No blog found"+p);
                res.send("No blog found");
            }else{
                const p = response.generate("No blog found","custom message",10,null);
                console.log("No blog found"+JSON.stringify(p));
                res.send(result);
            }
        })

}
let viewByBlogId = (req,res) =>{
    //console.log(req.user);
    //console.log(req.user1);
    console.log("inside viewByBlogId"+req.params.blogId);
    BlogModel.findOne({'blogId':req.params.blogId},(err,result)=>{
        if(err){
            console.log("err");
            res.send(err);
        } else if(result == "undefined" || result == "" || result == null){
            console.log("No blog found");
            res.send("No blog found");
        }else{
            console.log(result);
            res.send(result);
        }
    })

}
let viewByAuther =(req,res)=>{
    console.log("inside view by aurther blog");
    BlogModel.findOne({"author":req.params.author},(err,result)=>{
        if(err){
            console.log("err");
            res.send(err);
        } else if(result == "undefined" || result == "" || result == null){
            console.log("No blog found with this author");
            res.send("No blog found with this author");
        }else{
            console.log(result);
            res.send(result);
        }
    })
}
let viewByCategory =(req,res)=>{
    console.log("inside view by Category blog");
    BlogModel.findOne({"Category":req.params.Category},(err,result)=>{
        if(err){
            console.log("err");
            res.send(err);
        } else if(result == "undefined" || result == "" || result == null){
            console.log("No blog found with this Category");
            res.send("No blog found with this Category");
        }else{
            console.log(result);
            res.send(result);
        }
    })
}
let createBlog =(req,res) =>{
    console.log("inside create blog function");
    var today= Date.now();
    let blogId= shortid.generate();
    let newBlog =new BlogModel({
        blogId:blogId,
        title: req.body.title,
        description:req.body.description,
        bodyHtml:req.body.bodyHtml,
        ispublished:req.body.ispublished,
        category:req.body.category,
        author:req.body.author,
        created:today,
        lastModified:today
    });
    let tags = (req.body.tags!= undefined || req.body.tags!=null || req.body.tags!= "")? req.body.tags.split(","): [];
    newBlog.tags=tags
    newBlog.save((err,result)=>{
        if(err){
            console.log("record not saved");
            res.send(err);
        }else{
            console.log("recod saved");
            res.send(result);
        }

    })
}
let editBlog =(req,res) =>{
    let option=req.body;
    BlogModel.update({'blogId':req.params.blogId}, option ,{ multi:true}).exec((err,result)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else if(result == "undfined"|| result =="" || result==null){
            console.log("result is null");
            res.send(result);
        }else{
            console.log("data updated");
            res.send(result);
        }

    })

}
let increaseBlogView =(req,res)=>{
    BlogModel.update({'blogId':req.params.blogId},{$inc : {'views' : 1}}).exec((err,result)=>{
        if(err){
            console.log("err");
            res.send(err);
        }else{
            console.log("no error");
            res.send(result);
        }

    })
}
let deleteBlog=(req,res)=>{
    BlogModel.remove({"blogId":req.params.blogId},(err,result)=>{
        if(err){
            console.log("error");
            res.send(err);
        }else if(result=="undefined" || result=="" || result == null){
            console.log("no record found");
            res.send("no record found");
        }else{
            console.log("removed");
            res.send(result);
        }

    })
}
module.exports ={
    helloWorldFunction : helloWorldFunction,
    printExample :printExample,
    myFun: myFun,
    getAllBlog:getAllBlog,
    viewByBlogId:viewByBlogId,
    createBlog:createBlog,
    editBlog:editBlog,
    increaseBlogView:increaseBlogView,
    viewByAuther:viewByAuther,
    viewByCategory:viewByCategory,
    deleteBlog:deleteBlog
}