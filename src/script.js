let prompt=document.querySelector(".prompt")
let container=document.querySelector(".container")
let chatContainer=document.querySelector(".chat-container")
let btn=document.querySelector(".btn")
let userMessage=null

let Api_url='https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyA8DWot6TLAFsza-nEamzRuOU7eb3wrZOo'

//const Api_url=paste here your api url , you can watch it on my video
function createChatBox(html,className){
const div=document.createElement("div")
div.classList.add(className)
div.innerHTML=html;

setTimeout(() => {
  div.classList.add("show"); // Add 'show' class to trigger animation
}, 50);

return div
}
async function generateApiResponse(aiChatBox){
const textElement=aiChatBox.querySelector(".text")
try{
const response=await fetch(Api_url,{
  method:"POST",
  headers:{"Content-Type": "application/json"},
  body:JSON.stringify({
    contents:[{
      "role": "user",
      "parts":[{text:`${userMessage} in 10 words`}]
    }]
  })
})
const data=await response.json()
const apiResponse=data?.candidates[0].content.parts[0].text.trim();
textElement.innerText=apiResponse

}
catch(error){
  console.log(error)
}
finally{
  aiChatBox.querySelector(".loading").style.display="none"
}
}
function showLoading(){
  const html=` <div id="img">
        <img src="chatbot-image.png" alt="">
    </div>
    <div class="text">
    </div>
    <img src="loading.gif" alt="" height="50" class="loading">`
    let aiChatBox=createChatBox(html,"ai-chat-box")
 chatContainer.appendChild(aiChatBox)
generateApiResponse(aiChatBox)

}

btn.addEventListener("click",()=>{
    userMessage=prompt.value;
    if(prompt.value=""){
      container.style.display="flex"
    }else{
       container.style.display="none"
    }
    if(!userMessage)return;
  const html=` <div id="img">
        <img src="user-image.png" alt="">
    </div>
    <div class="text">
    </div>`
 let userChatBox=createChatBox(html,"user-chat-box")
 userChatBox.querySelector(".text").innerText=userMessage
 chatContainer.appendChild(userChatBox)
 prompt.value=""
 setTimeout(showLoading,500)

})
