const AWS= require('aws-sdk');
const multerS3=require('multer-s3')
const multer=require('multer')

const s3=new AWS.S3({
    accessKeyId: process.env.BUCKETEER_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.BUCKETEER_AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1'
});

const upload=multer({storage: multerS3({
    s3: s3,
    acl: 'public-read',
    bucket: process.env.BUCKETEER_BUCKET_NAME
})});

module.exports=upload