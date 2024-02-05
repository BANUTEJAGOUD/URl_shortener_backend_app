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
  const id = req.body.id;
  try {
    const qrCodeBuffer = await QRCode.toBuffer(shorturl);
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', `attachment; filename="${id}.png"`);
    res.send(qrCodeBuffer);
  } catch (err) {
    console.error('QR code generation failed:', err);
    res.status(500).send("Internal Server Error");
  }
});


router.delete('/id/:key',async(req,res)=>{
    let key=req.params.key;
    let result=await deleteFromDatabase(key);
    res.json(result).status(200);
})

module.exports=router;

