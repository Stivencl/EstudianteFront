//funcion para crear un nuevo estudiante

async function crearEstudiante(){
    const identif = document.getElementById("identificacion").value;
    const name = document.getElementById("name").value;

    if(!identif || !name){
        alert("Por favor digite le identificación y nombre del estudiante");
        return;

    }
    const estudiante = {id_Estudiante: identif, nombre: name};
    try {
        const response1 = await fetch(
            "https://estudiantes-qhc5.onrender.com/estudiante",
            {
               method: "POST",
               headers: {"Content-Type": "application/json",
                Authorization: "miTokensecreto123",},
               
                body: JSON.stringify(estudiante),
            }
          
        );

        if (response1.ok){
            alert("Estudiante creado exitosamete.");
            document.getElementById("identificacion").value = ""; //ponemos los input vacios para crear un nuevo estudiante
            document.getElementById("name").value = "";
            consultarEstudiante(); //actualiza el listado de estudiantes

        }else{
            alert("¡Lo sentimos! hubo un problema al crear el estudiante.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Hubo un problema en la solicitud.");
    }

}
//funcion para consultar todos los estudiantes en la DB
async function consultarEstudiante(){
    try {
        const response = await fetch(
           "https://estudiantes-qhc5.onrender.com/estudiante", 
        );
        if(!response.ok){
            throw new Error("No se pudo obtener la lista de estudiantes.");

        }
        const estudiante = await response.json();
        const listaEstudiantes = document.getElementById("estudiantelista");
        
        if(estudiante.length > 0){
            let Tablehtml =
            "<table><tr><th>Identificación</th><th>Nombre</th><th>Acciones</th></tr>";
            estudiante.forEach((estudiantes) => {
                Tablehtml += `
                    <tr>
                    <td>${estudiantes.id_Estudiante}</td>
                    <td>${estudiantes.nombre}</td>
                    <td><button class="delete-btn" onclick="eliminarEstudiante('${estudiantes._id}')">Eliminar</button>
                    <button class="update-btn" onclick="openModal('${estudiantes._id}');">Actualizar</button>
                    </td>
                    </tr>`;
            });
            Tablehtml += "</table>";
            listaEstudiantes.innerHTML = Tablehtml;
            
        }else{
            listaEstudiantes.innerHTML = "<p>No hay estudiantes registrados.</p>";
        }
    } catch (error) {
        console.error("Error:",error);
        alert("Hubo un problema la consultar los estudiantes.");
    }
}

//Funcion eliminar estudiante

async function eliminarEstudiante(id){
    if(!confirm("¿Está seguro de eliminar el estudiante")){
        return;
    }
    try {
        const response = await fetch(
            `https://estudiantes-qhc5.onrender.com/${id}`,
            {
                method: "DELETE",
                headers: {Authorization: "miTokensecreto123",},
            }
            
        );
        if(response.ok){
            alert("Estudiante eliminado exitosamente.");
            consultarEstudiante(); //actualiza la tabla

        }else{
            alert("Hubo un problema al eliminar el estudiante.");
        }
    } catch (error) {
        console.error("Error",error);
        alert("Hubo un erro al eliminar");
        
    }

}

//Funcion Actualizar Estudiante

 async function openModal(id){
    
    const modal = document.querySelector("#modal");
    modal.showModal();

    const btnCerrarModal = document.querySelector("#btn-Cerrar");
    btnCerrarModal.addEventListener("click", ()=>{  
    modal.close();
        
    }); 

     const response = await fetch(
       `https://estudiantes-qhc5.onrender.com/${id}`,
       {
        headers: {Authorization: "miTokensecreto123",},
       }
     );

      const EstudianteAct = await response.json();
      document.getElementById("identificacion2").value = `${EstudianteAct.id_Estudiante}`;
      document.getElementById("name2").value =`${EstudianteAct.nombre}`; 
      
      const btnf = document.getElementById("btn-actu");
        const btn = `<button onclick="actualizarEstudiante('${EstudianteAct._id}');">Actualizar</button>`;
        btnf.innerHTML = btn;

 }
     
async function actualizarEstudiante(id) {
    
       const identif2 = document.getElementById("identificacion2").value;
       const name2 = document.getElementById("name2").value; 

       if(!identif2 || !name2){
        alert("Por favor digite le identificación y nombre del estudiante");
        return;
    }


    const estudiante = {id_Estudiante: identif2, nombre: name2};
    try {
        
        const response = await fetch(
            `https://estudiantes-qhc5.onrender.com/${id}`,
            {
               method: "PUT",
               headers: {"Content-Type": "application/json",
               Authorization: "miTokensecreto123",},
              
               body: JSON.stringify(estudiante),
            }
       );
        
       if(!response.ok){
        throw new Error("No se pudo actualizar al estudiante.");
        }else{
            alert("Estudiante actualizado correctamente.");
            modal.close();
        }
         
            consultarEstudiante();
    } catch (error) {
        console.error("Error", error);
        alert("Hubo un problema para actualizar el registro");
    }
         
    
}//fin de la funcion actualizar


//cargar los estudiantes al inicio
document.addEventListener("DOMContentLoaded", consultarEstudiante);




