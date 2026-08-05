import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendEmailVerification } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const auth = getAuth();

function registrar(){
    var email=document.getElementById("email-register").value;
    var password=document.getElementById("password-register").value;

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log("Usuario registrado")
        verificar()
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
    });
    console.log("Funciona btn registrar")
}

function ingresar(){
    var email=document.getElementById("email-sign").value;
    var password=document.getElementById("password-sign").value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("Ingreso exitoso")
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
    });
    console.log(email)
    console.log(password)
    console.log("Funciona btn ingresar")
}

function observador(){
    onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("existe usuario activo")
        console.log(user)
        aparece(user)
        const uid = user.uid;
    } else {
        contenido.innerHTML=`
        
        `
    }
    });
}

function aparece(user){
    var user = user;
    var contenido=document.getElementById("contenido");

    if(user.emailVerified){
        contenido.innerHTML=`
        <div class="container mt-5">
        <div class="alert alert-success" role="alert">
            <h4 class="alert-heading">Bienvenidos! ${user.email}</h4>
            <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
            <hr>
            <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
        </div>

        <button id="btnCerrarsesion" class="btn btn-danger">Cerrar Sesion</button>
        <li><a href="respositorio.html">Repositorio Github</a></li>
        </div>
        `
        document.getElementById("btnCerrarsesion").addEventListener("click", cerrar);
    }
}

function cerrar(){
    signOut(auth)
    .then(() => {
    console.log("saliendo...")
    })
    .catch((error) => {
    console.log(error)
    });
}

function verificar(){
    sendEmailVerification(auth.currentUser)
    .then(() => {
        console.log("Enviando Email...")
    })
    .catch((error)=> {
    console.log(error)
    });
}

observador();
document.getElementById("btnRegistrar").addEventListener("click", registrar);
document.getElementById("btnLogin").addEventListener("click", ingresar);