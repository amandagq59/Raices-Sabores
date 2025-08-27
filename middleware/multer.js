const multer = require('multer');

const uploadFile = (folder)=>{
    
    const storage = multer.diskStorage({
        destination: `public/images/${folder}`,
        filename : function(req, file, cb) {
            let imageName =  Date.now() + '-' + file.originalname;
            cb(null, imageName);
        }
    })

    const upload = multer({storage: storage}).single("img");
    return upload;

}

module.exports = uploadFile;


