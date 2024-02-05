<<<<<<< HEAD
const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./src/config/db')
const {EachUrl}=require('./src/Models/urlsDataScheme');
const QRCode=require('qrcode');

const allRoutes=require('./src/Routes/routes');

require('dotenv').config();
const app=express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.set("view engine","ejs");
app.set('views','./src/views')
app.use(express.static('./src/public'));


connectToDatabase();

const dbConfig={
    port:process.env.PORT || 3000
}

app.get('/',(req,res)=>{
  res.render("index");
});

app.get('/:shortenId',allRoutes);

app.post('/longUrl',allRoutes);

app.post('/qrImage',allRoutes);

app.delete('/id/:key',allRoutes);

app.listen(dbConfig.port, () => {
  console.log(`Example app listening on port ${dbConfig.port}`)
})



=======
const express = require('express');
const cors = require('cors');
const conn=require('./src/config/db');
const {EachUrl}=require('./src/Models/urlsDataScheme');
const QRCode=require('qrcode');

const allRoutes=require('./src/Routes/routes');

require('dotenv').config();
const app=express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.set("view engine","ejs");
app.set('views','./src/views')
app.use(express.static('./src/public'));
conn();

const dbConfig={
    port:process.env.PORT || 3000
}

app.get('/',(req,res)=>{
  res.render("index");
});

app.get('/:shortenId',allRoutes);

app.post('/longUrl',allRoutes);

app.delete('/id/:key',allRoutes);

app.listen(dbConfig.port, () => {
  console.log(`Example app listening on port ${dbConfig.port}`)
})
>>>>>>> a9b00b63fc056d1b0ae649ad3ffd3f72b9987b4f
