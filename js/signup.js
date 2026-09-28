function upData() {
    let name, email, password;
    name = document.getElementById("name").value;
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;

    // location.href = "login.html";

    // localStorage.setItem("name", name);
    // localStorage.setItem("email", email);
    // localStorage.setItem("password", password);

    let user_record = new Array();
    user_record = JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[]
    if(user_record.some((v)=> {
        return v.email==email && v.password==password && v.name==name
    })){
        // alert("already exits");

        let passwordss = document.querySelector("#email").value;

        document.querySelector(".welcome__pass").textContent = passwordss;

    }
    else {
        user_record.push({
            "name":name,
            "email":email,
            "password":password
        })
        localStorage.setItem("users", JSON.stringify(user_record));
        localStorage.setItem("email", email); 
        localStorage.setItem("name", name); 
        localStorage.setItem("password", name); 
    }
}


