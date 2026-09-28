

function loginData(){

    let name,password;
    name = document.getElementById("name").value;
    password = document.getElementById("password").value;


    
    let user_records = new Array();
    let contact__sections = document.querySelector(".contact__section");
    let name__ins = document.querySelector("#name__in");
     let sign__succsess = document.querySelector(".sign__inw");



    user_records = JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[]

    if(user_records.some((v)=>{
        return v.name==name && v.password==password
    })){
        // alert("login success");
        let current__user = user_records.filter((v)=>{
            return v.name==name && v.password==password
        })[0]

        localStorage.setItem("name", current__user.name);
        localStorage.setItem("password", current__user.password);

         let namess = document.querySelector("#name").value;

         document.querySelector(".welcome__name").textContent = namess;

         let passwordss = document.querySelector("#email").value;

         document.querySelector(".welcome__pass").textContent = passwordss;

         sign__succsess.innerHTML = namess;

        localStorage.setItem("signin", true);




        // localStorage.setItem("name", true);

        contact__sections.style.display = "none";

        name__ins.style.display = "block";

        window.location.href = '#name__in';

        window.location.href = 'index.html';

    }
    else {
        alert("incorect email or password");
    }

}
  

let eidt__prof = document.querySelector("#eidt__prof");

eidt__prof.addEventListener("click", function() {

    let welcome__pass = document.querySelector(".welcome__pass");

    welcome__pass.style.display = "none";



    let welcome__name = document.querySelector(".welcome__name");

    let welcome__mail = document.querySelector(".welcome__mail");

    let welcome__users = document.querySelector("#welcome__users");
    welcome__users.style.display = "none";

    let user__email = document.querySelector("#user__email");
    user__email.style.display = "none";

    welcome__mail.style.display = "block";

    welcome__mail.disabled = false;

    welcome__mail.focus();

    welcome__name.style.display = "none";

    welcome__mail.style.border = "1px solid #A7A7BB";

    let welcome__namew = document.querySelector(".welcome__namew");

    welcome__namew.style.display = "block";

    welcome__namew.disabled = false;

    welcome__namew.style.border = "1px solid #A7A7BB";

    welcome__namew.focus();

    localStorage.setItem("editName", true);

    let save__prof = document.querySelector("#save__prof");

    save__prof.style.display = "block";
})

let save__prof = document.querySelector("#save__prof");

save__prof.addEventListener("click", function() {

    let welcome__namew = document.querySelector(".welcome__namew");

    save__prof.style.display = "none";

    welcome__namew.disabled = true;

    welcome__namew.style.border = "none";

    welcome__namew.style.backgroundColor = "#fff";

    welcome__namew.style.color = "#747474";

    let welcome__mail = document.querySelector(".welcome__mail");

    welcome__mail.disabled = true;

    welcome__mail.style.border = "none";

    welcome__mail.style.backgroundColor = "#fff";

    welcome__mail.style.textAlign = "center";

    welcome__mail.style.color = "#747474";

    welcome__namew.style.textAlign = "center";


    let welcome__namews = document.querySelector(".welcome__namew").value;
    document.querySelector(".loginIN").innerHTML = welcome__namews;

    let welcome__passs = document.querySelector(".welcome__mail").value;
    document.querySelector("#user__email").innerHTML = welcome__passs;

    localStorage.setItem("welcomeEmail", welcome__passs);


    localStorage.setItem("welcomeName", welcome__namews);

    // welcome__namew.border = "1px solid #fff";
    // welcome__namew.outline = "none";

    localStorage.setItem("saveName", true);

    let sign__inw = document.querySelector(".sign__inw");

    sign__inw.style.display = "none";

    // welcome__namews.innerHTML = "name";


})