let tableBody = document.getElementById('tableBody');
let originalUrl = document.getElementById('originalUrl');
let shortUrl = document.getElementById('shortUrl');
let postButton = document.getElementById('postButton');
<<<<<<< HEAD
let qrSection=document.querySelector('.qr-section');
let arrayoflongurls=[];
=======
let rownumber = 0;
let finalShortenUrl = null;
let finalLongUrl = null;
>>>>>>> a9b00b63fc056d1b0ae649ad3ffd3f72b9987b4f
postButton.addEventListener('click', async (event) => {
  let urlValue = document.getElementById('urlValue');
  let longurl = {
    url: urlValue.value
  }
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(longurl)
  }
  try {
    let response = await fetch('https://linkly-wg1q.onrender.com/longUrl', options)
    let data = await response.json();
<<<<<<< HEAD
    createandAppend(data._id,data.shorturl, data.longurl);
    arrayoflongurls.push({
      id:data._id,
      shortUrl : data.shorturl,
      longUrl :data.longurl
    });
    setDataInLocalStorage(arrayoflongurls);
=======
    createandAppend(data.shorturl, data.longurl);
    setTheUrlInStorage(data.shorturl, data.longurl);
>>>>>>> a9b00b63fc056d1b0ae649ad3ffd3f72b9987b4f
  } catch (error) {
    console.log(error);
  }
  urlValue.value = " "
})

<<<<<<< HEAD

function getFromLocalStorage(){
    arrayoflongurls = JSON.parse(localStorage.getItem('mylongurls')) || [];
    for(let ele of arrayoflongurls){
        createandAppend(ele.id,ele.shortUrl,ele.longUrl);
    }

}

function setDataInLocalStorage(array){
    localStorage.setItem("mylongurls",JSON.stringify(array));
}

getFromLocalStorage();



async function deleteRow(deleteId) {
  try{
    let options={
      method:'DELETE'
    }
    let deleteResult=await fetch(`https://linkly-wg1q.onrender.com/id/${deleteId}`,options);
    let data=await deleteResult.json();
    if(data || data===null){
      let deleteElement = document.getElementById(deleteId);
      deleteElement.remove();
      let indexOfdeleteItem=arrayoflongurls.findIndex(obj => obj.id === deleteId);
      arrayoflongurls.splice(indexOfdeleteItem,1);
      setDataInLocalStorage(arrayoflongurls);
    }else{
      alert('Error in deleting');
    }
  }catch(error){
    console.log(error);
  }
}
async function displayQrImage(uniqueId){
    let tableItem=document.getElementById(uniqueId);
    let children=tableItem.getElementsByTagName('td');
    let shorturl=children[1].textContent;
    let shorturlObj={
      url:shorturl,
      id:uniqueId
    }
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(shorturlObj)
    }
    try {
      let response = await fetch('https://linkly-wg1q.onrender.com/qrImage', options)
      let data=await response.blob();
      const objectURL = URL.createObjectURL(data);
      qrSection.src=objectURL;
    } catch (error) {
      console.log(error);
    }
    
}

function createandAppend(uniqueId,shorturl, longurl) {
  tableBody.innerHTML += `
  <tr id="${uniqueId}">
    <td><a class="link-styling" href="${longurl}" target="_blank">${longurl}</a></td>
    <td><a class="link-styling" href="https://linkly-wg1q.onrender.com/${shorturl}" target="_blank">https://linkly-wg1q.onrender.com/${shorturl}</a></td>
    <td><div class="qr-image"><img data-toggle="modal" data-target="#exampleModalCenter" onclick="displayQrImage('${uniqueId}')" src="https://cdn.pixabay.com/photo/2013/07/12/14/45/qr-code-148732_1280.png" alt="No-image"></div>
    <td style="text-align: center;">
    <i class="bi bi-trash" onclick="deleteRow('${uniqueId}')" style="cursor:pointer;"></i>
=======
//set items in local storage 

let setTheUrlInStorage = (shorturl, longurl) => {
  localStorage.setItem(longurl, shorturl);
}

getTheUrlFromStorage();
function getTheUrlFromStorage() {
  const totalItems = { ...localStorage };
  for (let key in totalItems) {
    const value = totalItems[key];
    createandAppend(value, key)
  }
}



async function deleteRow(deleteId, key,longurl) {
  let options={
    method:'DELETE'
  }
  console.log(key);
  let deleteResult=await fetch(`https://linkly-wg1q.onrender.com/id/${key}`,options);
  let data=await deleteResult.json();
  if(data){
    let deleteElement = document.getElementById(deleteId);
    localStorage.removeItem(longurl);
    deleteElement.remove();
  }else{
    alert('Error in deleting');
  }
}
function displayQrImage(){
  alert('This feature is still testing and wait for sometime')
}

function createandAppend(shorturl, longurl) {
  let deleteId = `delete` + rownumber;
  tableBody.innerHTML += `
  <tr id="${deleteId}">
    <th id="rowNumber" scope="row">${++rownumber}</th>
    <td><a class="link-styling" href="${longurl}" target="_blank">${longurl}</a></td>
    <td><a class="link-styling" href="https://linkly-wg1q.onrender.com/${shorturl}" target="_blank">https://linkly-wg1q.onrender.com/${shorturl}</a></td>
    <td><div class="qr-image"><img onclick="displayQrImage()" src="https://cdn.pixabay.com/photo/2013/07/12/14/45/qr-code-148732_1280.png" alt="No-image"></div>
    <td style="text-align: center;">
    <i class="bi bi-trash" onclick="deleteRow('${deleteId}','${shorturl}','${longurl}')" style="cursor:pointer;"></i>
>>>>>>> a9b00b63fc056d1b0ae649ad3ffd3f72b9987b4f
    </td>
  </tr>`
}
