const Root = document.getElementById("root");

let isLogged = localStorage.getItem("islogged") === "true";
let currentUser = localStorage.getItem("currentUsername");

function mostraLogin() {
    const DIVForm = document.createElement("div");
    const formLogin = `
    <form id="form_login">
    <input type="text" id="input_username" placeholder="inserisci username">
    <input type="text" id="input_pass" placeholder="inserisci password">
    <button id="btn-log">accedi</button>
   </form>`;
   DIVForm.innerHTML = formLogin;
   Root.appendChild(DIVForm);
}

function mostraHome() {
    const DIVhome = document.createElement("div");
    const homepage = `
    <h1>ultime uscite anime</h1>
    <div id="conteiner_anime_ultimeuscite"></div>

    <h1>anime del momento</h1>
    <div id="card-anime-delmomento"></div>`;
   DIVhome.innerHTML = homepage;
   Root.appendChild(DIVhome);
}

function onclickLogin() {
    const inputUsername = document.getElementById("input_username").value;
    const inputPass = document.getElementById("input_pass").value;
    
    const existingUser = localStorage.getItem(inputUsername); 
    
    if(existingUser) {
        const userObj = JSON.parse(existingUser);
        if(userObj.password === inputPass) {
            isLogged = true;
            localStorage.setItem("islogged", true);
            localStorage.setItem("currentUsername", inputUsername); 
            currentUser = inputUsername; 
            mostraHome();
        } else {
            alert("Password errata");
        }
    } else {
        
        const newUser = {
            username: inputUsername,
            password: inputPass,
            email: "email",
            telefono: "telefono" 
        };
        localStorage.setItem(inputUsername, JSON.stringify(newUser));
        isLogged = true;
        localStorage.setItem("islogged", true);
        localStorage.setItem("currentUsername", inputUsername);
        currentUser = inputUsername; 
        mostraHome();
    }
}

function controlislogged() {
    if(isLogged) {
        mostraHome();
    } else {
        mostraLogin();
        const btnlog = document.getElementById("btn-log");
        btnlog.addEventListener("click", onclickLogin);
    }
}

document.addEventListener("DOMContentLoaded", controlislogged);
