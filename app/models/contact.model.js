const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, " Contact name is required"],
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
        },
        address: String,
        phone: String,
        favorite: Boolean,
    },
    { timestamps: true}
);
schema.method("toJSON", function(){
    const {__v, _id, ...Object }= this.toObject();
    Object.id= _id;
    return Object;
});

module.exports = mongoose.model("contact", schema);