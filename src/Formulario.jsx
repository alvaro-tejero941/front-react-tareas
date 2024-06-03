import { useState } from "react";

function Formulario({crearTarea}){
    
    let [textoInput,setTextoInput] = useState("");

    return(
        <form onSubmit={ async evento => {
            evento.preventDefault();
            if(textoInput.trim() != ""){
                let {id,error} = await fetch("https://api-tareas-mongo.onrender.com/tareas/nueva",{
                    method : "POST",
                    body : JSON.stringify({tarea:textoInput}),
                    headers : {
                        "content-type" : "application/json"
                    }
                })
                .then(respuesta => respuesta.json())
                if(!error){                    
                    crearTarea({
                        id: id,
                        tarea: textoInput.trim(),
                        estado: false
                    });
                }
                setTextoInput("");
            }
        }}>
        <input type="text" 
        placeholder="¿Que hay que hacer?"
        value={textoInput}
        onChange={(evento) => setTextoInput(evento.target.value)}
        />
        <input type="submit" value="crear tarea"/>
    </form>
    )
}

export default Formulario;