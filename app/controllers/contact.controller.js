const mongoose=require("mongoose");
const { BadRequestError } = require("../errors");
const Contact= require("../models/contact.model");



exports.create = async (req, res,next) => {
    if(!req.body.name){
        return next(new BadRequestError(400,"Name can not be emty"));
    }
    // create a contact
    const contact = new Contact({
        name: req.body.name,
        email:req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        favorite: req.body.favorite ===true,
        
    });
    try {
        //Save contact in the database
        const document = await contact.save();
        return res.send(document);

    }catch(error){
        return next(
            new BadRequestError(
                500,
                "An error occurred while creating the contact"
            )
        );
    }
};

// retrieve all contacts of a user from the database
exports.findAll = async (req, res,next) => {
    const condition = {};
    const {name}=req.query;
    if(name){
        condition.name={ $regex: new RegExp(name), $options: "i"};
    }
    try{
        const document = await Contact.find(condition);
        return res.send(document);
    }catch (error){
        return next (
            new BadRequestError(
                500,
                "An error occurred while retrieving contacts"
            )
        );
    }
};

// find a single contact with an id

exports.findOne = async (req, res,next) => {
   const { id } = req.params;
   const condition = {
       _id: id && mongoose.isValidObjectId(id) ? id : null,
   };
   try {
       const document = await Contact.findOne(condition);
       if(!document){
           return next (new BadRequestError(404,"Contact not found"));
       }
       return res.send(document);
   }catch (error){
    return next(
        new BadRequestError(
            500,
            'Error retrueving contact with id =${req.params.id}'
        )
    );
   }
};
// update a contact by the id in the request
exports.update =async (req, res, next) =>{
    if(Object.keys(req.body).length===0){
        return next(
            new BadRequestError(400,"Data to the update can not be emty")
          );
        }
        const{ id }= req.params;
        const condition = {
            _id: id && mongoose.isValidObjectId(id) ? id : null,
        };
        try{
            const document = await Contact.findOneAndUpdate(condition,req.body,{
                new: true,
            });
            if(!document){
                return next(new BadRequestError(404,"Contact not found"));
            }
            return res.send({ message: "Contact was update successfully"});
        }catch(error){
            return next(
                new BadRequestError(500,
                        'Error updating contact with id = $(req.params.id}'
                    )
            );
        }
};
exports.delete= async (req,res,next) =>{
    const {id}= req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };
    try{
        const document = await Contact.findOneAndDelete(condition);
        if (!document){
            return next (new BadRequestError(404, "Contact not found"));
        }
        return res.send({ message:"Contact was deleted successfully"});
    }catch (error){
        return next(
            new BadRequestError(
                500,
                'Could not delete contact with id =${req.params.id}'
            )
        );
    }
};
exports.findAllFavorite =async (req, res, next)=>{
    try{
        const document = await Contact.find ({ favorite : true});
        return res.send(document);
    }catch (error){
        return next(
            new BadRequestError(
                500,
                "An error occurred while retrieving favortite contacts"
            )
        );
    }
};
exports.deleteAll = async(req, res, next)=>{
    try{
        const data = await Contact.deleteMany({});
        return res.send({
            message: '$(data.deleteCount} contact were deleted successfully',
        });
    }catch (error){
        return next(
            new BadRequestError(
                500,
                "An error occurred while removing all contacts"
            )
        );
    }
};