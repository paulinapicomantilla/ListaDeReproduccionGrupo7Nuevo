
    function login() {  
   
       
       var user, correo, clave;
   
       user = document.getElementById("txtusuario").value;
       correo = document.getElementById("txtcorreo").value;
       clave = document.getElementById("txtpassword").value;
   
       if (user=="grupo07" && correo=="grupo07@hotmail.com" && clave=="grupo07"){
   
           window.location="page.html"; //no se me vincula con page.html
       } else if(user=="johana" && correo=="johanna_pilatasig@outlook.es" && clave=="johana"){
           window.location="page.html";
       }
       else if(user=="monica" && correo=="monica_cabrera.c@hotmail.com" && clave=="monica"){
        window.location="page.html";
    }
    else if(user=="victoria" && correo=="vickyamaguana@gmail.com" && clave=="victoria"){
        window.location="page.html";
    }
    else if(user=="paulina" && correo=="paulina_pico@hotmail.com" && clave=="paulina"){
        window.location="page.html";
    }
       else{
           window.alert("Datos mal ingresados vuelva a intentarlo");
       }   
       
       if (localStorage.getItem('isLogged')) {
        const form = document.getElementById('loginForm')
        form.innerHTML = `<button id="logout">Logout<button>
              <a href="page.html">
              <i class="bi bi-arrow-left"></i> Back
            </a>`
      
        const logoutBtn = document.getElementById('logout')
        logoutBtn.addEventListener('click', () => {
          localStorage.removeItem('isLogged')
          window.location.href = 'page.html'
        })

    }
    
    }