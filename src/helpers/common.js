

const {EachUrl}=require('../Models/urlsDataScheme')

let fetchTheLongUrl=async(shortId)=>{
    let data=await getTheLongUrlFromDatabase(shortId);
    return data;
}

let getTheLongUrlFromDatabase=async(shortid)=>{
    const result = await EachUrl.findOne({ shorturl: shortid });
    if(result){
      return {longUrl:result.longurl}
    }else{
      return null;
    }
}

<<<<<<< HEAD
let isLongUrlPresent=async(longurl)=>{
  return EachUrl.findOne({longurl:longurl});
}

let deleteFromDatabase=async(key)=>{
   return EachUrl.findOneAndDelete({_id:key});
}
module.exports={
  fetchTheLongUrl,
  deleteFromDatabase,
  isLongUrlPresent
=======
let longurlisPresent=async(longurl)=>{
  return EachUrl.find({longurl})
}

let deleteFromDatabase=async(key)=>{
   return EachUrl.findOneAndDelete({shorturl:key});
}
module.exports={
  fetchTheLongUrl,
  longurlisPresent,
  deleteFromDatabase
>>>>>>> a9b00b63fc056d1b0ae649ad3ffd3f72b9987b4f
}