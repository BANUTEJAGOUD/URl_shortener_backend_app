const express = require('express');
const cors = require('cors');
const {fetchTheLongUrl}=require('../helpers/common')
const router=express.Router();
const {longurlisPresent}=require('../helpers/common');
const shortid = require('shortid');
const {EachUrl}=require('../Models/urlsDataScheme');
const {deleteFromDatabase}=require('../helpers/common');
const {isLongUrlPresent}=require('../helpers/common')
const QRCode=require('qrcode');
const path = require('path');
const fs = require('fs');

// To redirect to the original url when the user clicks on the shorten url
router.get('/',(req,res)=>{
  res.send("The app is working");
});
router.get('/:shortenId',async(req,res)=>{
    const shortId = req.params.shortenId;
    let data = await fetchTheLongUrl(shortId);
    if (data && data.longUrl) {
        res.redirect(data.longUrl);
    } else {
        res.status(404).send('Not Found');
    }
});


router.post('/longUrl', async (req, res) => {
    const longurl = req.body.url;
    let existingurl=await isLongUrlPresent(longurl);
    if(existingurl){
      res.send(existingurl);
    }
    else{
      try {
        let shortId = shortid.generate();
        const EachUrl1 = new EachUrl({
          longurl: longurl,
          shorturl: shortId
        })
        let result = await EachUrl1.save();
        if (result) {
          res.send(result);
        } else {
          res.status(500).send("Internal server error");
        }
      } catch (error) {
        res.json(error);
      }
    }
});

//generation of qr Image


router.post('/qrImage', async (req, res) => {
  const shorturl = req.body.url;
  const id=req.body.id;
  QRCode.toFile(path.join(__dirname, 'public', 'images', `${id}.png`), shorturl, async(err) => {
      if(err){
        res.status(404).send("qr code generation failed")
      }else{
        let filePath=`C:/Users/Banuteja/Desktop/Url_shortener_complete_express_app-master/src/public/images/${id}.png`
        let result = await  res.sendFile(filePath,(err)=>{
          if(err){
            res.send(err);
          }
          else{
            fs.unlink(filePath, (err) => {
              if (err) {
                console.error('Error deleting file:', err);
              } else {
                console.log('File deleted successfully');
              }
            });
          }
        });
        
      }
  })
});


router.delete('/id/:key',async(req,res)=>{
    let key=req.params.key;
    let result=await deleteFromDatabase(key);
    res.json(result).status(200);
})

module.exports=router;

