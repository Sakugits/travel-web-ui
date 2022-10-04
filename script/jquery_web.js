$(document).ready(function(){

    //Variable que representa si el menu drop-down esta siendo mostrado
    let drop_down = false 

    // Abre el form para iniciar sesion al pulsar el boton correspondiente en la cabecera
    $("#sign-in").click(function(){ 
        $("#login-form").fadeIn("fast") 
      });

  $("#popup-exp-flecha").click(function(){
    $("#popup-exp-extra").slideToggle("fast")
  })
    // Abre el form para registrarse al pulsar el boton correspondiente en la cabecera
    $("#register").click(function(){ 
        $("#register-form").fadeIn("fast") 
      });
    //Abre el form para registrarse desde el boton correspondiente en el formulario de login
    $("#register-from-login").click(function(){ 
        $("#login-form").hide()
        $("#register-form").fadeIn("fast") 
      });
    //Cierra los formularios al hacer click en la cruz roja
    $(".close-button").click(function(){ 
        $("#login-form").hide("fast")
        $("#register-form").hide("fast")
        $("#my-experiences-form").hide("fast")
        $("#popup-exp").hide("fast")  
        $("#popup-exp-extra").slideUp("fast")
      });
    //Registra a un usuario
    $("#submit-register").click(function(){
        let result = registerUser();
        if (result == true){
          $("#register-form").hide("fast")
          $("#login-form").hide("fast")
          $(".right-nav-user-container").show("fast")
          $(".right-nav-guest").hide()
          changeHeader()
        } 
    })
    //Inicia sesion
    $("#submit-login").click(function(){
        drop_down = false 
        let result = logIn()
        if (result == true){
          $("#login-form").hide("fast")
          $(".right-nav-user-container").show("fast")
          $(".right-nav-guest").hide()
          changeHeader()
        }
    });
   
    // Menu drop-down
    $("#drop-down-icon").click(function(){ 
      if (drop_down == false){
        $("#drop-down-menu").slideDown()
        drop_down = true
      } else {
        $("#drop-down-menu").slideUp()
        drop_down = false
      }
    });
    // Cerrar sesion
    $("#menu-logout").click(function(){ 
      $(".right-nav-user-container").hide()
      $(".right-nav-guest").show("fast")
      noCurrentUser()
      $(location).prop('href', 'index.html')
    });
    // Carga el usuario logeado al refrescar la pagina
    $(window).ready(function() {
      drop_down = false
      result = checkCurrentUser()
      if (result == true){
        $("#login-form").hide("fast")
        $(".right-nav-user-container").show("fast")
        $(".right-nav-guest").hide()
        changeHeader()
      } else {
        $("#right-nav-guest").show("fast")
        $("#right-nav-user-container").hide()
      }

    });
    //Abre el formulario para añadir nuevas experiencias
    $("#add-experience").click(function(){ 
      $("#my-experiences-form").show("fast") 
    });
    //Añade una experiencia
    $("#submit-experience").click(function(){ 
      let result = addExperience()
      if (result == true){
        $("#my-experiences-form").hide("fast")
      }
    });

    $(".delete-exp").click(function(){ 
      $("#popup-exp").hide("fast") 
    });

})


