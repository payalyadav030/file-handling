const ProfileController = {};

//const Model = require('./../models/');

ProfileController.register = function(request, response){
    console.log(request.body);
    console.log(request.files, request.file);

    //response.send("registered successfully")
    //console.log("resgisterd successfully");

    return response.render('avatar',{
        success: true,
        message: "successfully uploaded",
        data: request.body
    })
}
ProfileController.uploadPictures = function(request, response){
    console.log(request.files);
    console.log(request.body);

    return response.json({
        status : true
    })
}
ProfileController.uploadFiles = function(request, response){
    console.log(request.files);
    console.log(request.body);

    return response.json({
        status : true
    })
}

module.exports = ProfileController;