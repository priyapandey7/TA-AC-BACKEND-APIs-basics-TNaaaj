var express = require('express');
var router = express.Router();

var Books = require('../models/v3Books');
var Comments = require('../models/V1Comments');

router.get('/',async (req,res,next)=> {
    try {
        var books =await Books.find({});
        res.status(200).json({books});
    } catch (error) {
        next(error);
    }
});

// create a book 
router.post('/', async(req,res,next)=> {
    req.body.categories = req.body.categories.trim().split(',');
    req.body.tags = req.body.tags.trim().split(',');
    try {
        console.log("Hey", req.body)
        var addedBook = await Books.create(req.body);

        res.status(200).json({addedBook});
    } catch (error) {
        next(error);
    }
});

router.get('/listallcategories', async (req,res,next)=> {
    try {
        const allCategories = await Books.distinct("categories");
        console.log(allCategories);
        res.status(200).json({allCategories});
    } catch (error) {
        next(error);
    }
})



router.get('/:id', async(req,res,next)=> {
    var id = req.params.id;
    try {
        var singleBook = await Books.findById(id).populate("commentsId");
        res.status(200).json({singleBook});
    } catch (error) {
        next(error)
    }
})

router.put('/:id', async(req,res,next)=> {
    const id = req.params.id;
    req.body.categories = req.body.categories.trim().split(',');
    req.body.tags = req.body.tags.trim().split(',');
    try {   
        const updatedBook =await Books.findByIdAndUpdate(id,req.body);
        res.status(200).json({updatedBook});
    } catch (error) {
        next(error);
    }
})

router.delete('/:id', async(req,res,next)=> {
    const id = req.params.id;
    try {   
        const deletedBook =await Books.findByIdAndDelete(id);
        res.status(200).json({deletedBook});
    } catch (error) {
        next(error);
    }
})

router.post('/:id/addComment', async(req,res,next)=> {
    const id = req.params.id;
    req.body.bookRef = id; 
    console.log(req.body);
    try {
        const addedComment = await Comments.create(req.body);
        const updatedBook = await Books.findByIdAndUpdate(id, {$push : {"commentsId" : addedComment.id}});
        res.status(200).send({addedComment,updatedBook});
    }
     catch (error) {
        next(error)
    }
});

// list all categories


module.exports = router;