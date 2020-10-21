
/*
student name: chaeeun kim
student number: 301060073
filename:assignment1
date:2020,10.03
*/


/*fuction that interact with user in form
when user click cancle button, user will be directed to home page.
when user click submit button, we can see what user type in console*/
(function(){

 function Start()
 {
 console.log("app satarted..");

  if(document.title=="Contact me")
  {
    let sendbutton= document.getElementById("sendButton");
    let canclebutton=document.getElementById("cancleButton");
    let form = document.forms[0];
 
    sendbutton.addEventListener("click",(event)=> {
        event.preventDefault();
        let fullname=document.getElementById("fullName").value;
        let eamiladdress=document.getElementById("emailAddress").value;
        let contactnumber=document.getElementById("contactNumber").value;
        let message =document.getElementById("message").value;

        confirm('Fullname:'+fullname+'\n'+'Emailaddress:'+ eamiladdress+'\n'+'Contactnumber:'+ contactnumber+'\n'+'message:'+ message);
        form.reset();
        fullname="";
        eamiladdress="";
        contactnumber="";
        message="";
        console.log("sendbutton is used");

 });

 canclebutton.addEventListener("click",(event)=> {
event.preventDefault();
if(confirm("Are you sure?"))
{
location.href="/";

}});
  }
} window.addEventListener('load',Start);
})();


/*fuction that redirects user to aboutme page when clicking button*/
(function(){
function redirection()
{ if(document.title="Home")
{ let directbutton= document.getElementById("directButton");
directbutton.addEventListener("click",(event)=> {
    event.preventDefault();
   location.href="/aboutme"});

}
}
window.addEventListener('load',redirection);
}
)();


(function(){

  function Start()
  {
      console.log("App Started...");

      let deleteButtons = document.querySelectorAll('.btn-danger');
      
      for(button of deleteButtons)
      {
          button.addEventListener('click', (event)=>{
              if(!confirm("Are you sure?")) 
              {
                  event.preventDefault();
                  window.location.assign('/contacts-list');
              }
          });
      }
  }

  window.addEventListener("load", Start);

})();








