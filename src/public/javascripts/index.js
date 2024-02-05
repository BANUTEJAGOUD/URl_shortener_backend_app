let tableBody = document.getElementById('tableBody');
let originalUrl = document.getElementById('originalUrl');
let shortUrl = document.getElementById('shortUrl');
let postButton = document.getElementById('postButton');
let qrSection=document.querySelector('.qr-section');
let arrayoflongurls=[];
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
    let response = await fetch('https://linkly-obng.onrender.com/longUrl', options)
    let data = await response.json();
    createandAppend(data._id,data.shorturl, data.longurl);
    arrayoflongurls.push({
      id:data._id,
      shortUrl : data.shorturl,
      longUrl :data.longurl
    });
    setDataInLocalStorage(arrayoflongurls);
  } catch (error) {
    console.log(error);
  }
  urlValue.value = " "
})


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
    let deleteResult=await fetch(`https://linkly-obng.onrender.com/id/${deleteId}`,options);
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
      let response = await fetch('https://linkly-obng.onrender.com/qrImage', options)
      let data=await response.arrayBuffer();
      const bolb=new Blob([data],{type:'image/png'});
      const objectURL = URL.createObjectURL(bolb);
      qrSection.src=objectURL;
    } catch (error) {
      console.log(error);
    }
    
}

function createandAppend(uniqueId,shorturl, longurl) {
  tableBody.innerHTML += `
  <tr id="${uniqueId}">
    <td><a class="link-styling" href="${longurl}" target="_blank">${longurl}</a></td>
    <td><a class="link-styling" href="https://linkly-obng.onrender.com/${shorturl}" target="_blank">https://linkly-obng.onrender.com/${shorturl}</a></td>
    <td><div class="qr-image"><img data-toggle="modal" data-target="#exampleModalCenter" onclick="displayQrImage('${uniqueId}')" src="https://cdn.pixabay.com/photo/2013/07/12/14/45/qr-code-148732_1280.png" alt="No-image"></div>
    <td style="text-align: center;">
    <i class="bi bi-trash" onclick="deleteRow('${uniqueId}')" style="cursor:pointer;"></i>
    </td>
  </tr>`
}
