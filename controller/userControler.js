 const bcrypt = require("bcrypt");

const User = require("./../model/userModel");

exports.register = ((req, res, next) => {

      User.find({ email: req.body.email })
        .then((result) => {
          if (result.length < 1) { 
  
            
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            next(err);
        } else {
            const user = new User({
                userName: req.body.userName,
                email: req.body.email,
                password: hash,
            });
            user
                .save()
                .then((response) => {
                    console.log(response);
                    res
                        .status(200)
                        .json({ message: "User Created Successfully" });
                })
                .catch((err) => {
                    next({message:"err"});
                });
        }
    });
  
          } else {           
            res.status(200).json({message:"User Is Already Created Before"})
          }
        })
        .catch((err) => {
          next(err);
        });

});


exports.login = ((req, res, next) => {

    User.find({ email: req.body.email })
        .then((user) => {
            if(user.length >0){
                 bcrypt.compare(req.body.password,  user[0].password, (err, result) => {
                if (err) {
                    next(err);
                } else if (result) {
                    res.status(200).json({ message: {"message" :"login sucess"  , "userData" :user}  })
                } else {
                    res.status(200).json({ message: "Password does not match" })

                }
            }); 
            }
            else{
                res.status(200).json({message:"User Not Found!"})
            }
          
        }).catch((err) => {
            next(err);
        })
})



    ;
