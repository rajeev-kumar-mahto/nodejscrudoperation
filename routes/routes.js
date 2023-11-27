const express = require('express');
const router = express.Router();
const User = require('../models/users');
const multer = require('multer');

// image upload 

var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads');
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});
//milddleware
var upload = multer({
    storage:storage,
}).single('image');

// insert a user into a database
router.post('/add',upload,(req,res)=>{
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        image:req.file.filename,
       
    });
    user.save().then(()=>{
        req.session.message= {
                            type:'success',
                        message:'User added Successfully'
                    };
                      res.redirect('/');
                      
    });
//         (err)=>{
//         if(err){
//             res.json({message:err.message,type:'danger'});

//         }else{
//             req.session.message= {
//                 type:'success',
//                 message:'User added Successfully'
//             };
//             res.redirect('/');
//         }
//     });
 });



router.get("/add",(req,res)=>{
    res.render("add_users",{title:"Add Users"})
});
// Get all Users Route

router.get("/",(req,res)=>{
   User.find().exec().then((users)=>{
    // if(err){
    //     res.json({message:err.message,type:'danger'});
    // }else{.then(() => {
  
        res.render('index',{
            title:'Homepage',
            users: users,
        }) ;
    
   });
});

// edit an user route

router.get("/edit/:id",(req,res)=>{
    let id = req.params.id;
    // user.findById(id,(err,user)=>{
    //     if(err){
    //         res.redirect('/');
    //     }else{
    //         if(user == null){
    //             res.redirect('/');
    //         }else{
    //             res.redirect('edit_users',{
    //                 title:"Add Users",
    //                 user : user,
    //             });
    //         }
     //     }
    // })
    // res.render("add_users",{title:"Add Users"})
});

// update 
router.post('/update/:id',upload,(req,res)=>{
    let id = req.params.id;
    let new_image = "";
});

//delete
router.post('/delete/:id',(req,res)=>{
    let id = req.params.id;
     User.findByIdAndRemove(id);
    // ,(result)=>{
    //     req.session.message = {
    //         type: "info",
    //         message:"User Delete successfully",
    //     };
        res.redirect('/');
    // });
});

module.exports = router;