const most_Likedexp = [] //Contiene todas las experiencias ordenadas por likes

//Se ejecutan al in
guardar_Json_inicial()
order_Exp()

function guardar_Json_inicial(){ //Se guardan los valores iniciales en LocalStorage para su posterior uso
  
    if (localStorage.getItem("initial_Load") != 1){

        let variable = JSON.stringify(base_Datos)
        localStorage.setItem("usuarios",variable)
        localStorage.setItem("initial_Load", 1)
        localStorage.setItem("current_user",'""') //Se guardan vacíos para evitar errores en los parse
        localStorage.setItem("saved_Exp","[]")
        localStorage.setItem("presupuesto",0)
        localStorage.setItem("liked_experiences","[]")

    }

}

function order_Exp (){ //Coge todas las experiencias y las ordena por numero de likes

    let experiencias = JSON.parse(localStorage.getItem("usuarios"))

    for (let i = 0; i < experiencias.length; i++)
    {
        for (let k = 0; k < experiencias[i].experiences.length; k++)
        {
            most_Likedexp.push (experiencias[i].experiences[k])//Se guarda en variable global las experiencias ordenadas por likes
        }

    } 
    
    most_Likedexp.sort(compare_Likes)  //Se ordena
}


function compare_Likes(a, b) { //Ordena de Mayor a Menor por número de likes

    if ( a.likes < b.likes ){
      return 1;
    }
    if ( a.likes > b.likes ){
      return -1;
    }

    return 0;
}


function load_Experiences() { //Saca por pantalla el top experiencias en la pantalla principal

    let title_Name
    let description
    let image
    let alt_Text
    let id

    for (let i = 0; i < 20 ; i++)
    {
        if (most_Likedexp[i]) //Si existe
        {

            title_Name = most_Likedexp[i].name
            description = most_Likedexp[i].description
            image = most_Likedexp[i].images_path[0]
            alt_Text = "imagen experiencia " + (i + 1)
            id = most_Likedexp[i].experience_id

            display_Experience (title_Name,description,image,alt_Text,id)
        }

    }

}


function search_Experiences () { //Busca la expoeriencia usando el buscador

    document.getElementById("experiences").innerHTML = ""
    document.getElementById("titulo-top-experiencias").innerHTML = "RESULTADOS DE LA BÚSQUEDA"
    const exptoDisplay = JSON.parse(localStorage.getItem("usuarios"))
    //Variables por parametro si se encuentra algo en la búsqueda
    let matching_description
    let matching_name
    let matching_image
    let alt_Text = "imagen experiencia busqueda "
    let found = false

    if (document.getElementById("search_autor").value == "" && document.getElementById("search_nombre").value == "" && document.getElementById("search_interes").value == "")
    {
        load_Experiences() // Si está todo vacío da igual y se vuelven a mostrar las experiencias top
        found = true
    }

    else
    {
        for (let i = 0; i < exptoDisplay.length; i++) 
        {
        
            if (document.getElementById("search_autor").value.toUpperCase() == "" || 
            document.getElementById("search_autor").value.toUpperCase() == exptoDisplay[i].username.toUpperCase()) //Autor vacío o corresponde
            {
                for (let k = 0; k < exptoDisplay[i].experiences.length; k++) //Vamos a ver las experiencias que tiene cada autor
                {
                    if (document.getElementById("search_nombre").value.toUpperCase() == "" ||
                    document.getElementById("search_nombre").value.toUpperCase() == exptoDisplay[i].experiences[k].name.toUpperCase()) //Corresponde el título o está vacío
                    {
                        for(let z = 0 ; z < exptoDisplay[i].experiences[k].tags.length; z++) //Hay que revisar cada tag
                        {
                            if (document.getElementById("search_interes").value.toUpperCase() == "" ||
                            document.getElementById("search_interes").value.toUpperCase() == exptoDisplay[i].experiences[k].tags[z].toUpperCase()) //Corresponde el tag o está vacío
                            {
                                found = true
                                matching_name = exptoDisplay[i].experiences[k].name
                                matching_description = exptoDisplay[i].experiences[k].description
                                matching_image = exptoDisplay[i].experiences[k].images_path[0]
                                display_Experience(matching_name,matching_description,matching_image,alt_Text + (k + 1),exptoDisplay[i].experiences[k].experience_id)
                                z = exptoDisplay[i].experiences[k].tags.length //Encontrado, no hace falta iterar más
                            }

                        }
                        

                    }
                
                }

            }

        }

    }
    

    if (found == false)
    {

        document.getElementById("experiences").innerHTML = "No se encontraron resultados :("

    }

}

function display_Experience (name,description,img,alt_text,id){
    //Se pone la funcion que luego usaremos para enseñar el popup
    let experience = `
                    <div class="experience" onclick="displayPopup(` + id + `)"> 
                        <div class="experience-content">
                            <h3>` + name + `</h3>
                            <img src="` + img + `" alt="` + alt_text+ `"></img>
                            <p>` + description + `</p>
                        </div>
                    </div>
                    `
    
    document.getElementById("experiences").innerHTML += experience
    
}

function displayPopup(id){ //Rellena el popup con toda la información

    document.getElementById("popup-exp").style.display = "block"
    document.getElementById("popup-exp-comentarios").innerHTML = ""
    let experiencias = JSON.parse(localStorage.getItem("usuarios"))

    let experience_title
    let experience_author
    let experience_pimg
    let experience_description
    let experience_simage1
    let experience_simage2
    let experience_likes
    let experience_doc_desc
    let experience_doc_cant
    let experience_cost_desc
    let experience_cost_cant
    let experience_edad_desc
    let experience_edad_cant
    let experience_tags
    let found

    for (let i = 0; i < experiencias.length ; i++)
    {
        for(let k = 0; k < experiencias[i].experiences.length ; k++)
        {
            if (id == experiencias[i].experiences[k].experience_id)
            {
                found = true
                experience_author = experiencias[i].username
                experience_title = experiencias[i].experiences[k].name
                experience_pimg = experiencias[i].experiences[k].images_path[0]
                experience_description = experiencias[i].experiences[k].description
                experience_simage1 = experiencias[i].experiences[k].images_path[1]
                experience_simage2 = experiencias[i].experiences[k].images_path[2]
                experience_likes = experiencias[i].experiences[k].likes
                experience_doc_desc = experiencias[i].experiences[k].add_info_doc[0]
                experience_doc_cant = experiencias[i].experiences[k].add_info_doc[1]
                experience_cost_desc = experiencias[i].experiences[k].add_info_coste[0]
                experience_cost_cant = experiencias[i].experiences[k].add_info_coste[1]
                experience_edad_desc = experiencias[i].experiences[k].add_info_edad[0]
                experience_edad_cant = experiencias[i].experiences[k].add_info_edad[1]
                experience_tags = experiencias[i].experiences[k].tags
                

            }
            

        }
        
        
    }
    
    let tags = ""
    for (let i = 0; i < experience_tags.length - 1; i++){
        tags += experience_tags[i]
        tags += ", "
    }
    
    tags += experience_tags[experience_tags.length - 1]

    if (found == true)
    {
        document.getElementById("popup-exp-title").innerHTML = experience_title
        document.getElementById("popup-exp-author").innerHTML = experience_author
        document.getElementById("popup-exp-description").innerHTML = experience_description
        document.getElementById("popup-exp-pimage").src = experience_pimg
        document.getElementById("popup-exp-simage1").src = experience_simage1
        document.getElementById("popup-exp-simage2").src = experience_simage2
        document.getElementById("popup-exp-likes").innerHTML = experience_likes
        document.getElementById("popup-exp-extra-doc-desc").innerHTML = experience_doc_desc
        document.getElementById("popup-exp-extra-doc-cant").innerHTML = experience_doc_cant
        document.getElementById("popup-exp-extra-cost-desc").innerHTML = experience_cost_desc
        document.getElementById("popup-exp-extra-cost-cant").innerHTML = experience_cost_cant
        document.getElementById("popup-exp-extra-edad-desc").innerHTML = experience_edad_desc
        document.getElementById("popup-exp-extra-edad-cant").innerHTML = experience_edad_cant
        document.getElementById("popup-tags").innerHTML = tags
        display_Comentarios(id)
    }

}

function save_User_Creator(){//Esta función sirve para mostrar las experiencias de cada usuario en una página aparte, las guarda y cuandos se ingresa en la otra página se muestran

    let username = document.getElementById("popup-exp-author").innerHTML
    let experiencias = JSON.parse(localStorage.getItem("usuarios"))
    let current_user_seeing

    for ( let i = 0 ; i < experiencias.length ; i++ )
    {
        if (experiencias[i].username.toUpperCase() == username.toUpperCase())
        {
            current_user_seeing = experiencias[i]
        }
    }

    localStorage.setItem("current-user-seeing" , JSON.stringify(current_user_seeing))
}

function display_User_seeing(){ //Muestra las experiencias de cada usuario en una página aparte

    let current_user = JSON.parse(localStorage.getItem("current-user-seeing"))
    
    document.getElementById("current-seeing-user").innerHTML = current_user.username

    let my_experiences = current_user["experiences"]

    my_experiences.sort(function (exp1, exp2) { //Se ordenan de más likes a menos
    if (exp1["likes"] < exp2["likes"]) {
      return 1;
    }
    if (exp1["likes"] > exp2["likes"]) {
      return -1;
    }
    return 0;
    });
    while (my_experiences.length > 9){
    my_experiences.pop()
    }

    for (let i=0; i< my_experiences.length; i++){
        let id = my_experiences[i]["experience_id"]
        let name = my_experiences[i]["name"]
        let img = my_experiences[i]["images_path"][0]
        let alt_text = "imagen experiencia de usuario " + (i + 1)
        let description = my_experiences[i]["description"]
        let experience = `
        <div class="experience" onclick="displayPopup(` + id + `)">
            <div class="experience-content">
                <h3>` + name + `</h3>
                <img src="` + img + `" alt="` + alt_text +  id + `"></img>
                <p>` + description + `</p>
            </div>
        </div>
        `
        document.getElementById("my-experiences").innerHTML += experience
    }
}


function Most_Liked_Users(){ //Coge los usuarios con más likes sumando todos los likes de cada experiencia

    const experiencias = JSON.parse(localStorage.getItem("usuarios"))
    experiencias.sort(compare_Most_Liked_User)
    let username
    let likes

    for (let i = 0; i < experiencias.length ; i++)
    {
        if (i <= 20) //Solo top 20 usuarios
        {
            username = experiencias[i].username
            likes = get_User_Likes(experiencias[i])
            
            display_Most_Liked_Users(i+1,username,likes)

        }

    }
    
}

function compare_Most_Liked_User(a,b){ //Comparacion de los users por likes

    if ( get_User_Likes(a) < get_User_Likes(b) ){
        return 1;
    }

    if ( get_User_Likes(a) > get_User_Likes(b) ){
        return -1;
    }
  
    return 0;

}

function get_User_Likes(user){ //Obtiene los likes del usuario

    let totalLikes = 0

    for (let i = 0; i < user.experiences.length; i++)
    {
        totalLikes += user.experiences[i].likes
    }

    return totalLikes
    
}

function display_Most_Liked_Users(ranked,name,likes){ //Muestra los usuarios con más likes en el ranking

    let likedUser = `
    <div class="ranking-user">
        <div class="ranking-number">
            <p>` + ranked + `</p>
        </div>
        <div class="ranking-name">
            <p>` + name + `</p>
        </div>
        <div class="ranking-likes">
            <p>` + likes + `</p>
        </div>
        <div class="ranking-heart">
            <img src="images/heart.png" alt="heart">
        </div>
    </div>
    `

    document.getElementById("user-ranking").innerHTML += likedUser

}


function save_Experience_Planificador (id){ //Cuando le pasan el id de la experiencia la guarda en el planificador
    
    let experiencias = JSON.parse(localStorage.getItem("usuarios"))

    let saved_Exp = JSON.parse(localStorage.getItem("saved_Exp"))

    for (let i = 0; i < experiencias.length; i++)
    {
        for (let k = 0; k < experiencias[i].experiences.length; k++)
        {
            if (experiencias[i].experiences[k].experience_id == id)
            saved_Exp.push (experiencias[i].experiences[k])
        }

    }

    localStorage.setItem("saved_Exp",JSON.stringify(saved_Exp))

    alert("Experiencia guardada con éxito")
    
}

function pass_Save_Experience_id(){ //Al clickar en el boton se busca la experiencia por nombre y user y se obtiene el id que se usa para guardar la experiencia

    let experiencias = JSON.parse(localStorage.getItem("usuarios"))
    let saved_Exp = JSON.parse(localStorage.getItem("saved_Exp"))
    let autor_name = document.getElementById("popup-exp-author").innerHTML
    let experience_name = document.getElementById("popup-exp-title").innerHTML
    let id

    for (let i = 0; i < experiencias.length; i++) 
    {
        if (experiencias[i].username.toUpperCase() == autor_name.toUpperCase())
        {
            for (let k = 0; k < experiencias[i].experiences.length; k++) 
            {
                if(experiencias[i].experiences[k].name.toUpperCase() == experience_name.toUpperCase())
                {
                    id = experiencias[i].experiences[k].experience_id

                    for (let z = 0; z < saved_Exp.length; z++)//Checkeamos si ya está guardada 
                    {
                        if(saved_Exp[z].experience_id == id)
                        {
                            alert ("No puedes guardar dos veces la misma experiencia")
                            return -1
                        }    
                    }
                }        
            }
        }
        
    }

    save_Experience_Planificador(id)
}

function display_SavedExperience_Planificador(){ //Muestra la experiencia guardada pasando por parametro a otra funcion

    document.getElementById("experiences-saved").innerHTML =""
    let saved_Exp = JSON.parse(localStorage.getItem("saved_Exp"))
    let name
    let description
    let img
    let alt_text
    let id
    
    for (let i = 0 ; i < saved_Exp.length; i++)
    {   
        if (saved_Exp[i]){

            id = saved_Exp[i].experience_id
            name = saved_Exp[i].name
            description = saved_Exp[i].description
            img = saved_Exp[i].images_path[0]
            alt_text = "imagen experiencia guardada " + (i+1)

            display_SavedExperience_Planificador_AUX(name,description,img,alt_text,id)
        }
    }
}


function display_SavedExperience_Planificador_AUX(name,description,img,alt_text,id){ //Muestra la experiencia guardada en el planificador

    let experience = `
    <div class="experience">
        <div class="experience-content" onclick="displayPopup(` + id + `)">
            <h3>` + name + `</h3>
            <img src="` + img + `" alt="` + alt_text + `"></img>
            <p>` + description + `</p>
        </div>
        <button class="delete-experience" onclick=remove_from_SavedExp(` + id + `)>Quitar del Plan</button>
    </div>
    `
    
    document.getElementById("experiences-saved").innerHTML += experience
    
}

function send_Mail(){ //Envía un correo animando a buscar la experiencia en la web

    let current_user = JSON.parse(localStorage.getItem("current_user"))

    if (current_user == "")
    {
        window.alert("No puedes ejecutar esta acción si no estas registrado")
        return -1
    }

    var mail = "mailto:no-one@snai1mai1.com?"
    mail += 'subject=¡Mira la experiencia que he encontrado!'
    mail += '&body=¡Busca la experiencia "' + document.getElementById("popup-exp-title").innerHTML + '" de ' + document.getElementById("popup-exp-author").innerHTML + ' en nuestra web y descubre miles más!'
    document.getElementById("send-experience").href = mail
}

function recomend_Exp (){ //Busca experiencias con los mismos tags para recomendar y contiunación muestra las experiencias de toda la web ordenadas por likes

    let experiencias = JSON.parse(localStorage.getItem("usuarios"))
    saved_Exp = JSON.parse(localStorage.getItem("saved_Exp"))
    const recomended_Exp = []
    const recomended_Exp_notag = []
    let counter = 0
    let tagues = []

    if(saved_Exp == null){
        saved_Exp = []
    }
    for(let i = 0; i< saved_Exp.length; i++){ //Loop Experiencias Guardadas
        
        try{

            for (let j = 0; j< saved_Exp[i].tags.length; j++){ //Loop experiencias guardadas tags
                
                counter = 0
                
                for(let k = 0; k<tagues.length ;k++){ //Loop por la matriz de tags guardadas

                    if(tagues[k].toUpperCase() == saved_Exp[i].tags[j].toUpperCase()){ //Si encuentras una tag igual en las guardadas no se repite al guardarla
                       counter = 1 
                    }
                    
                }

                if (counter==0){ //Si no se encuentra, significa que no está y se guarda

                    tagues.push(saved_Exp[i].tags[j])
                
                }
                
            }
        }

        catch(error){
            console.log("saved vacio")
        }

    }

    counter = 0
    let current_tag

    for (let i = 0; i < experiencias.length; i++)
    {
        for(let k = 0; k < experiencias[i].experiences.length;k++)
        {
            for (let z = 0; z < experiencias[i].experiences[k].tags.length; z++) 
            {
                current_tag = experiencias[i].experiences[k].tags[z]

                for (let j = 0; j < tagues.length; j++) 
                {
                    if(is_in_savedExp(experiencias[i].experiences[k].experience_id) == 0)
                    {
                        if(tagues[j].toUpperCase() == current_tag.toUpperCase() && counter == 0) //Si coincide la tag la guardamos
                        {
                            recomended_Exp.push(experiencias[i].experiences[k])
                            counter = 1 //Guardada, no la repetimos
                        }

                    }
                    
                }
                
            }

            if(is_in_savedExp(experiencias[i].experiences[k].experience_id) == 0)
            {
                if(counter == 0) //Si no se ha guardado significa que la tag no interesaba y se guarda en otra array
                {
                    recomended_Exp_notag.push(experiencias[i].experiences[k])
                }
            
            }

            counter = 0      
        }

    }
    recomended_Exp.sort(compare_Likes)//Ordenamos por likes
    recomended_Exp_notag.sort(compare_Likes)

    load_Recomended_Experiences(recomended_Exp)
    load_Recomended_Experiences(recomended_Exp_notag)//A continuacion ponemos las que no interesan tanto
}

function is_in_savedExp(id){ //Funcion para saber si la exp ya está en las guardadas

    saved_Exp = JSON.parse(localStorage.getItem("saved_Exp"))
    let found = 0
    if(saved_Exp == null){
        saved_Exp = []
    }
    for (let i = 0; i < saved_Exp.length; i++) 
    {
        if(saved_Exp[i].experience_id == id)
        {
            found = 1
        }

    }

    return found
}



function load_Recomended_Experiences(recomended_Exp) { //Muestra las experiencias recomendadas

    for (let i = 0; i < 8 ; i++)
    {
        
        if (recomended_Exp[i])
        {

            let title_Name = recomended_Exp[i].name
            let description = recomended_Exp[i].description
            let image = recomended_Exp[i].images_path[0]
            let alt_Text = "imagen experiencia recomendada" + (i + 1)
            let id  = recomended_Exp[i].experience_id

            display_recomended_Experience (title_Name,description,image,alt_Text,id)
        }

    }

}

function display_recomended_Experience (name,description,img,alt_text,id){ //Muestra las experiencias recomendadas

    let experience = `
    <div class="experience" onclick="displayPopup(` + id + `)">
        <div class="experience-content">
            <h3>` + name + `</h3>
            <img src="` + img + `" alt="` + alt_text + `" alt="experience number ` + id + `" ></img>
            <p>` + description + `</p>
        </div>
    </div>
    `
    
    document.getElementById("experiences").innerHTML += experience
    
}

function update_cost() //Actualiza el coste de las experiencias mirando en las guardadas
{
    let newcost = 0
    let presupuesto = localStorage.getItem("presupuesto") //guardamos el presupuesto en local storage
    document.getElementById("presupuesto_numero").innerHTML = presupuesto
    let saved_Exp = JSON.parse(localStorage.getItem("saved_Exp"))

    for (let i = 0; i < saved_Exp.length; i++) 
    {
        
        newcost += saved_Exp[i].cost
        
    }

    document.getElementById("presupuesto_coste").innerHTML = newcost
    
    if (newcost > document.getElementById("presupuesto_numero").innerHTML) //Si es mayor el coste que el presupuesto se pone rojo
    {
        document.getElementById("presupuesto_coste").style.color = "red"
    }

    return newcost

}

function update_Presupuesto(){ //Actualiza el presupuesto según especifique el usuario en la caja de texto
    
    let coste = update_cost()
    let nuevo_presupuesto = document.getElementById("nuevo_presupuesto").value
    console.log(nuevo_presupuesto)
    document.getElementById("presupuesto_numero").innerHTML = nuevo_presupuesto
    localStorage.setItem("presupuesto",nuevo_presupuesto)
    //Según si supera el presupuesto se cambia el color de los numeros
    if (coste < nuevo_presupuesto)
    {
        document.getElementById("presupuesto_coste").style.color = "#0c9666"
    }

    else
    {
        document.getElementById("presupuesto_coste").style.color = "rgba(158, 10, 10, 0.781)"
    }

}

function display_Comentarios(id) //Se mira en la array de comentarios y se muestran en el popup
{
    document.getElementById("popup-exp-comentarios").innerHTML = ""

    let experiencias = JSON.parse(localStorage.getItem("usuarios"))
    let comentario
    let comentario_texto
    let usuario
    let usuario_pic
    let comentario_print

    for (let i = 0; i < experiencias.length; i++) 
    {
        for (let k = 0; k < experiencias[i].experiences.length; k++) 
        {
            if(experiencias[i].experiences[k].experience_id == id)
            {

                for (let z = 0; z < experiencias[i].experiences[k].comentarios.length; z++) 
                {
                    comentario = experiencias[i].experiences[k].comentarios[z]
                    comentario_texto = comentario.texto

                    for (let h = 0; h < experiencias.length;h++)
                    {
                        if (comentario.user_id == experiencias[h].user_id)
                        {
                            usuario = experiencias[h].username
                            usuario_pic = experiencias[h].profile_picture
                        }

                    }

                    comentario_print = ` <div class="comentario"` + usuario_pic +`>
                                            <img src=`+usuario_pic+` alt = "avatar-comentario ` + (z + 1) + `" class="comment-image"></img>
                                            <p class="comment-username">` + usuario + `</p>
                                            <div class="comment-content">
                                                <p>` + comentario_texto + `</p>
                                            </div>
                                          </div>
                                            `
                    document.getElementById("popup-exp-comentarios").innerHTML += comentario_print
                
                }

            }
            
        }
        
    }

}

function add_Comment(){ //Añadir comentario a la base de datos

    let experiencias = JSON.parse(localStorage.getItem("usuarios"))
    let current_user = JSON.parse(localStorage.getItem("current_user"))

    if (current_user == "")
    {
        window.alert("No puedes ejecutar esta acción si no estas registrado")
        return -1
    }
    //Cogemos los datos necesarios para encontrar la experiencia
    let autor_name = document.getElementById("popup-exp-author").innerHTML
    let experience_name = document.getElementById("popup-exp-title").innerHTML
    let id
    let texto = document.getElementById("popup-add-comment-text").value //Comentario per se

    if (texto.length <= 0){
        alert("El comentario no puede estar vacío")
        return -1
    }
    if (texto.length > 140){
        alert("El comentario no debe exceder los 140 caracteres")
        return -1
    }
    let comentario = {"user_id": current_user.user_id, "texto":document.getElementById("popup-add-comment-text").value}

    for (let i = 0; i < experiencias.length; i++) 
    {
        if (experiencias[i].username.toUpperCase() == autor_name.toUpperCase())
        {
            for (let k = 0; k < experiencias[i].experiences.length; k++) 
            {
                if(experiencias[i].experiences[k].name.toUpperCase() == experience_name.toUpperCase())
                {
                    for (let z = 0; z < experiencias[i].experiences[k].comentarios.length; z++)
                    {
                        if(current_user.user_id == experiencias[i].experiences[k].comentarios[z].user_id) //Si el comentario ya existía se aborta la función
                        {
                            alert("Ya has comentado anteriormente")
                            return -1
                        }
                        
                    }
                    
                    id = experiencias[i].experiences[k].experience_id
                    experiencias[i].experiences[k].comentarios.push(comentario)
                }        
            }
        }
        
    }

    let save = JSON.stringify(experiencias)
    localStorage.setItem("usuarios",save)

    display_Comentarios(id)

}

function update_Likes(){ //Función para dar like a las experiencias


    let experiencias = JSON.parse(localStorage.getItem("usuarios")) 
    let liked_experiences = JSON.parse(localStorage.getItem("liked_experiences")) //Nos guardamos las experiencias a las que se ha dado like
    let current_user = JSON.parse(localStorage.getItem("current_user"))

    if (current_user == "")
    {
        window.alert("No puedes ejecutar esta acción si no estas registrado")
        return -1
    }

    let autor_name = document.getElementById("popup-exp-author").innerHTML
    let experience_name = document.getElementById("popup-exp-title").innerHTML
    let id 

    for (let i = 0; i < experiencias.length; i++) 
    {
        if (experiencias[i].username.toUpperCase() == autor_name.toUpperCase())
        {
            for (let k = 0; k < experiencias[i].experiences.length; k++) 
            {
                if(experiencias[i].experiences[k].name.toUpperCase() == experience_name.toUpperCase())
                {
                    id = experiencias[i].experiences[k].experience_id

                    for (let z = 0; z < liked_experiences.length; z++) { //Comprobamos que ya no se haya puntuado esa experiencia
                        
                        if (id == liked_experiences[z])
                        {
                            console.log(liked_experiences[z])
                            window.alert("Ya puntuaste esta experiencia anteriormente")
                            return -1
                        }
                        
                    }

                    experiencias[i].experiences[k].likes ++
                    document.getElementById("popup-exp-likes").innerHTML = experiencias[i].experiences[k].likes
                    liked_experiences.push(id)
                }        
            }
        }
        
    }

    localStorage.setItem("usuarios",JSON.stringify(experiencias))
    localStorage.setItem("liked_experiences",JSON.stringify(liked_experiences))
}

function remove_from_SavedExp(id){ //En el planificador, para quitar la experiencia del plan actual

    let saved_Exp = JSON.parse(localStorage.getItem("saved_Exp"))

    if(saved_Exp.length > 1)
    {
        for (let i = 0; i < saved_Exp.length; i++) 
        {
            if (id == saved_Exp[i]["experience_id"]){
                index_to_remove = i
            }
        }

        saved_Exp.splice(index_to_remove, 1)
  
        localStorage.setItem("saved_Exp",JSON.stringify(saved_Exp))
    
    }

    else
    {
        localStorage.setItem("saved_Exp","[]")
    }
  

    // Refresca la pagina
    location.reload()
}


function deleteExp(id){
    let current_user = JSON.parse(localStorage.getItem("current_user"))
    let my_experiences = current_user["experiences"]
    let index_to_remove = 0
    let usuarios = JSON.parse(localStorage.getItem("usuarios"))
    // Busca la experiencia en current_user
    for (let i=0; i< my_experiences.length; i++){
      if (id == my_experiences[i]["experience_id"]){
        index_to_remove = i    
      }
    }
    // Lista de experiencias actualizada
    my_experiences.splice(index_to_remove, 1)
    //console.log(my_experiences)
    // Actualiza los id de las experiencias
    for (let i=0; i< my_experiences.length; i++){
      my_experiences[i]["experience_id"] = i+1
    }
    
    // Actualiza current_user
    current_user["experiences"] = my_experiences
    localStorage.setItem("current_user", JSON.stringify(current_user))
    // Actualiza el usuario en la base de datos
    for(let i = 0; i < usuarios.length; i++){
      if (current_user["username"] == usuarios[i]["username"]){
        usuarios[i]["experiences"] = my_experiences
        localStorage.setItem("usuarios", JSON.stringify(usuarios))
      }
    }
  
    let saved_Exp = JSON.parse(localStorage.getItem("saved_Exp"))
  
    if(saved_Exp.length > 1)
    {
      for (let i = 0; i < saved_Exp.length; i++) 
      {
        if (id == saved_Exp[i]["experience_id"]){
          //console.log(my_experiences[i]["name"])
          index_to_remove = i
        }
      }
  
      saved_Exp.splice(index_to_remove, 1)
    
      localStorage.setItem("saved_Exp",JSON.stringify(saved_Exp))
      
    }
  
    else
    {
      localStorage.setItem("saved_Exp","[]")
    }
    
  
    // Refresca la pagina
    location.reload()
  
  }
  function showMyExperiences(){
    //Muestra el top 8 experiencias del usuario en la sección "Mis Experiencias" del perfil del usuario
    document.getElementById("my-experiences").innerHTML = ""
    let current_user = JSON.parse(localStorage.getItem("current_user"))
  
    let my_experiences = current_user["experiences"]
    // Ordena el array de experiencias segun el numero de experiencias de mayor a menor
    my_experiences.sort(function (exp1, exp2) {
      if (exp1["likes"] < exp2["likes"]) {
        return 1;
      }
      if (exp1["likes"] > exp2["likes"]) {
        return -1;
      }
      return 0;
    });
    
    // Muestra las experiencias del usuario
    for (let i=0; i< my_experiences.length; i++){
      let id = my_experiences[i]["experience_id"]
      let name = my_experiences[i]["name"]
      let img = my_experiences[i]["images_path"][0]
      let alt_text = "imagen mi experiencia " + (i+1)
      let description = my_experiences[i]["description"]
      let experience = `
                          <div class="experience" >
                              <div class="experience-content" onclick="displayPopup(` + id + `)">
                                  <h3>` + name + `</h3>
                                  <img src="` + img + `" alt="` + alt_text + `"></img>
                                  <p>` + description + `</p>
                                  
                              </div>
                              <button class="delete-experience" onclick=deleteExp(` + id + `)>Borrar Experiencia</button>
                          </div>
                          `
      document.getElementById("my-experiences").innerHTML += experience
    }
    
  }
  
  function addExperience(){
    //Añade una experiencia
    let title = document.getElementById("experience-title").value;
    let exp_description = document.getElementById("experience-description").value;
    let main_picture = document.getElementById("experience-main-picture").value;
    let picture_1 = document.getElementById("experience-picture-1").value;
    let picture_2 = document.getElementById("experience-picture-2").value;
    let tags = document.getElementById("experience-tags").value;
  
    let exp_cost = document.getElementById("experience-cost").value;
    
    var regex_cost = /^[0-9]*$/
    if (regex_cost.test(exp_cost) == false){
        alert("El coste debe ser un numero entero")
        return false;
    }
    let info_doc_1 = document.getElementById("experience-doc-1").value;
    if (info_doc_1 == ""){
      info_doc_1 = "-"
    }
    let info_doc_2 = document.getElementById("experience-doc-2").value;
    if (info_doc_2 == ""){
      info_doc_2 = "-"
    }
    let info_age_1 = document.getElementById("experience-age-1").value;
    if (info_age_1 == ""){
      info_age_1 = "-"
    }
    let info_age_2 = document.getElementById("experience-age-2").value;
    if (info_age_2 == ""){
      info_age_2 = "-"
    }
    let info_cost_1 = document.getElementById("experience-cost-1").value;
    if (info_cost_1 == ""){
      info_cost_1 = "-"
    }
    
    
    let current_user = JSON.parse(localStorage.getItem("current_user"))
    let usuarios = JSON.parse(localStorage.getItem("usuarios"))
  
  
  
    let new_experience_id = most_Likedexp.length + 1
  
    if (tags == "" || title == "" || main_picture == "" || exp_description == "" || exp_cost == "" || picture_1 == "" || picture_2 == ""){
      return false
    }
  
    // Crea la lista con las fotos de la experiencia
    let experience_images = [main_picture]
    if (picture_1 != ""){
      experience_images.push(picture_1)
    }
    if (picture_2 != ""){
      experience_images.push(picture_2)
    }
    // Crea la lista con los tags de la experiencia
    let experience_tags = tags.split(",")
    // Crea las listas con info extra
    let experience_info_doc = [info_doc_1,info_doc_2]
    let experience_info_age = [info_age_1,info_age_2]
    let experience_info_cost = [info_cost_1,exp_cost]
    
    // Crea la experiencia
    let experience = {
      experience_id: new_experience_id,
      name: title,
      description: exp_description,
      images_path: experience_images,
      tags: experience_tags,
      likes: 0,
      cost: exp_cost,
      add_info_doc: experience_info_doc,
      add_info_edad: experience_info_age,
      add_info_coste: experience_info_cost,
      comentarios: []
    }
    // Comprueba que el usuario no tenga una experiencia
    for(let i = 0; i < current_user["experiences"].length; i++){
      if (title == current_user["experiences"][i]["name"]){
        alert("Ya tienes una experiencia con ese nombre")
        return false
      }
      
    }
  
    // Reemplaza la experiencia en el usuario actual
    current_user["experiences"].push(experience)
    localStorage.setItem("current_user", JSON.stringify(current_user))
    
    // Reemplaza la experiencia en la base de datos de usuarios. Comprueba ademas que 
  
    for(let i = 0; i < usuarios.length; i++){
      if (current_user["username"] == usuarios[i]["username"]){
        usuarios[i]["experiences"].push(experience)
        localStorage.setItem("usuarios", JSON.stringify(usuarios))
      }
    }
    // Recarga la pagina para que se muestre la nueva experiencia (solo se mostrara si esta en el top 8 de experiencias del usuario por likes)
    location.reload()
    return true
  }
  
  function checkCurrentUser(){
    //Comprueba si existe un usuario logeado al refrescar la pagina
    let current_user = JSON.parse(localStorage.getItem("current_user"))
    if (current_user == "" || current_user == 0){
      return false
    }
    return true
  }
  
  function noCurrentUser(){
    //Borra el usuario actual al cerrar sesion
    let current_user = ""
    localStorage.setItem("current_user",JSON.stringify(current_user));
  }
  
  function changeHeader(){
    //Primero borra lo que habia antes en los 2 divs
    document.getElementById("user-menu").innerHTML = "";
    document.getElementById("user-pic").innerHTML = "";
  
    //Introduce el nombre de usuario y su foto de perfil
    let current_user = JSON.parse(localStorage.getItem("current_user"))
    let name = current_user["username"]
  
    let profile_picture = current_user["profile_picture"]
    
    const t = document.createElement("p")
  
    const node = document.createTextNode(name)
    var img = document.createElement("img");
    img.src = profile_picture;
    img.alt = "avatar"
    t.appendChild(node)
  
    
    const element = document.getElementById("user-menu")
    var src= document.getElementById("user-pic")
    element.appendChild(t)
    src.appendChild(img)
    img.setAttribute("alt","avatar");
  }
    
  function registerUser(){
    // Registra a un usuario
    let username = document.getElementById("username-register").value;
    let password = document.getElementById("password-register").value;
    let email = document.getElementById("email-register").value;
    let date = document.getElementById("birthdate-register").value;
    let profile_picture = document.getElementById("profile-picture-register").value;
  
    if (username.length < 1){
        return false;
    }

    if (password == "" || email == "" || date == ""){
        return false;
    }
    var regex_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (regex_email.test(email) == false){
        alert("El formato del correo electrónico es incorrecto")
        return false;
    }

    if (username.length > 12){
      alert("El nombre de usuario no debe exceder los 12 caracteres")
      return false;
    }
    var regex_date = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    if (regex_date.test(date) == false && date != false){
      alert("Formato de la fecha incorrecto")
      return false;
    }
    
    //Añade una foto de perfil por defecto si el usuario no ha elegido una foto de perfil
    if (profile_picture == ""){ 
      profile_picture = "https://pluspng.com/img-png/png-user-icon-circled-user-icon-2240.png"
    }
    // Se crea el nuevo usuario
    let usuarios = JSON.parse(localStorage.getItem("usuarios"))
    // Comprueba que el nombre de usuario y el email no esten ya registrados
    for(let i = 0; i < usuarios.length; i++){
      if (username.toUpperCase() == usuarios[i]["username"].toUpperCase()){
        alert("El nombre de usuario que has introducido ya esta registrado")
        return false
      }
      if (email.toUpperCase() == usuarios[i]["email"].toUpperCase()){
        alert("El email has introducido ya esta registrado")
        return false
      }
    }
    // Se crea e introduce el nuevo usuario
    let new_user_id = usuarios.length + 1
    let new_user = {
      user_id: new_user_id,
      username: username,
      password: password,
      birthdate: date,
      email: email,
      rest_of_data: "...",
      profile_picture: profile_picture,
      experiences: [],
    }
    usuarios.push(new_user)
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("current_user",JSON.stringify(new_user));
    
    return true
  }
  
  function logIn(){
    let username = document.getElementById("username-login").value;
    let password = document.getElementById("password-login").value;  
    let user_found = false
    
    // Se comprueba si el nombre de usuario y contraseña son correctos
    let usuarios = JSON.parse(localStorage.getItem("usuarios"))
    for(let i = 0; i < usuarios.length; i++){
      if (username == usuarios[i]["username"] && password == usuarios[i]["password"]){
        user_found = true
        current_user = usuarios[i]
      }
    }
    if (user_found == false){ 
      alert("Datos incorrectos")
      return false
    }
  
    localStorage.setItem("current_user", JSON.stringify(current_user))
  
    return true
  
  }