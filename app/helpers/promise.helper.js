const handlePromise =(promise)=>{
    return promise
        .then((data)=>[null,data])
        .catch((error)=>[null,data])
};

module.exports=handlePromise;