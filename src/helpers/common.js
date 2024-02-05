

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
}