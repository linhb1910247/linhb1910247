const router=require('./contact.routes');


function route(app){
    app.use("/api/contacts",router);
       
}
module.exports=route;