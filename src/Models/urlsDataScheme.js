
const mongoose=require('mongoose');


const urlDataSchema = new mongoose.Schema({
    longurl: String,
    shorturl: String,
  }, {
    timestamps: true
});

const EachUrl=mongoose.model("EachUrl",urlDataSchema);


module.exports={
  EachUrl
};