const User = require('./../models/user');
const Blog = require('./../models/blog');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const validator = require('validator');
const auth = require('./Helper/authenticate')

module.exports = (router)=>{
    router.post('/createBlog',auth.requireAuth,(req,res)=>{
    if(!req.body.title) return res.json({success:false,message:'Title is Not Provided'}) 
    if(!req.body.body) return res.json({success:false,message:'Body is Not Provided'})        
        
    const blog =new Blog({
       title:req.body.title,
       body:req.body.body,
       createdBy:req.user._id 
    })

    blog.save((err,done)=>{
        if(err){
            if(err.errors.title) return res.json({success:false,message:err.errors.title.message})
            if(err.errors.body) return res.json({success:false,message:err.errors.body.message}) 
        }else{
            res.json({success:true,message:'New Blog Created.'})
        }
    })

    })

    router.get('/getBlogById/:id',auth.requireAuth,(req,res)=>{
        if(!req.params.id) return res.json({success:false,message:'Id is not provided.'})
        Blog.findById({_id:req.params.id})
        .populate({path:'createdBy',select:'username'})
        .exec(function(err,blog){
            if(err) return res.json({success:false,message:err})
            if(!blog) return res.json({success:false,message:'No Blog Found'})
            if(req.user.username !== blog.createdBy.username)  return res.json({success:false,message:'Not Authorized.'})
            res.json({success:true,data:blog})
        })
    })

    router.get('/allBlogs',auth.requireAuth,(req,res)=>{
        Blog.find()
        .populate({path:'createdBy',select:'username'})
        .sort('-CreatedAt')
        .exec(function(err,blogs){
            if(err) return res.json({success:false,message:err})
            if(!blogs) return res.json({success:false,message:'No Blog Found'})
            res.json({success:true,message:blogs})
        })
    })

    router.put('/updateBlog',auth.requireAuth,(req,res)=>{
        if(!req.body._id) return res.json({success:false,message:'Id is not provided.'})
        Blog.findOne({_id:req.body._id})
        .populate({path:'createdBy',select:'username'})
        .exec(function(err,blog){
            if(err) return res.json({success:false,message:err})
            if(!blog) return res.json({success:false,message:'No Blog Found'})
            if(req.user.username !== blog.createdBy.username)  return res.json({success:false,message:'Not Authorized.'})
                blog.title = req.body.title;
                blog.body = req.body.body;
                blog.UpdatedAt = Date.now()
                blog.save((err,done)=>{
                    if(err){
                        if(err.errors.title) return res.json({success:false,message:err.errors.title.message})
                        if(err.errors.body) return res.json({success:false,message:err.errors.body.message}) 
                    }else{
                        res.json({success:true,message:'Blog Updated.'})
                    }
                })
        })
    })

    router.delete('/deleteBlog/:id',auth.requireAuth,(req,res)=>{
        if(!req.body.id) return res.json({success:false,message:'Id is not provided.'})
        Blog.findOne({_id:req.body.id})
        .populate({path:'createdBy',select:'username'})
        .exec(function(err,blog){
            if(err) return res.json({success:false,message:err})
            if(!blog) return res.json({success:false,message:'No Blog Found'})
            if(req.user.username !== blog.createdBy.username)  return res.json({success:false,message:'Not Authorized.'})
                blog.remove((err,done)=>{
                    if(err) return res.json({success:false,message:err})
                    res.json({success:true,message:'Blog Deleted.'})
                })
        })
    })

    router.post('/likeBlog',auth.requireAuth,(req,res)=>{
        if(!req.body.id) return res.json({success:false,message:'Id is not provided.'})
        Blog.findOne({_id:req.body.id})
        .populate({path:'createdBy',select:'username'})
        .exec(function(err,blog){
            if(err) return res.json({success:false,message:err})
            if(!blog) return res.json({success:false,message:'No Blog Found'}) 
            if(req.user.username === blog.createdBy.username)  return res.json({success:false,message:'Cannot like Your own post.'})
            if(blog.likedBy.includes(req.user.username)) return res.json({success:false,message:'you already liked this post.'})
            if(blog.dislikeBy.includes(req.user.username)){
                const arrayIndex  = blog.dislikeBy.indexOf(req.user.username)
                blog.dislikeBy.splice(arrayIndex,1)
                blog.likedBy.push(req.user.username)
                blog.save((err,save)=>{
                    if(err) return res.json({success:false,message:err})
                    res.json({success:true,message:'Blog Liked!'})
                })
            }else{
                blog.likedBy.push(req.user.username)
                blog.save((err,save)=>{
                    if(err) return res.json({success:false,message:err})
                    res.json({success:true,message:'Blog Liked!'})
                }) 
            }

        })
    })

    router.post('/disLikeBlog',auth.requireAuth,(req,res)=>{
        if(!req.body.id) return res.json({success:false,message:'Id is not provided.'})
        Blog.findOne({_id:req.body.id})
        .populate({path:'createdBy',select:'username'})
        .exec(function(err,blog){
            if(err) return res.json({success:false,message:err})
            if(!blog) return res.json({success:false,message:'No Blog Found'}) 
            if(req.user.username === blog.createdBy.username)  return res.json({success:false,message:'Cannot Dislike Your own post.'})
            if(blog.dislikeBy.includes(req.user.username)) return res.json({success:false,message:'you already disliked this post.'})
            if(blog.likedBy.includes(req.user.username)){
                const arrayIndex  = blog.likedBy.indexOf(req.user._id)
                blog.likedBy.splice(arrayIndex,1)
                blog.dislikeBy.push(req.user.username)
                blog.save((err,save)=>{
                    if(err) return res.json({success:false,message:err})
                    res.json({success:true,message:'Blog DisLiked!'})
                })
            }else{
                blog.dislikeBy.push(req.user.username)
                blog.save((err,save)=>{
                    if(err) return res.json({success:false,message:err})
                    res.json({success:true,message:'Blog Liked!'})
                }) 
            }

        })
    })

    return router;
}