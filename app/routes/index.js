const router=require('./contact.routes');
const { BadRequestError,errorHandler }=require("../errors");

function route(app){
    app.use("/api/contacts",router);
    // handle 404 reponse
app.use((req, res, next) => {
    //code ở đây sẽ chạy khi không có route được dinh nghĩa nào
    // khớp với yêu cầu. Gọi next() để chuyern sang middleware xử lý lỗi
    next(new BadRequestError(404, "Resource not found"));
});

// define error-handling middleware last, after other app.use() and route calls
app.use((err, req, res, next)=>{
    //Middleware xử lí lỗi tập trung.
    //Trong các đoạn code xử lý ở route , gọi next(eror)
    // sẽ chuyển về middleware xử lý lỗi này
    errorHandler.handleError(err,res);
});
       
}

module.exports=route;