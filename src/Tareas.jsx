import { useEffect, useState } from "react";
import Formulario from "./Formulario";
import Tarea from "./Tarea";

function Tareas(){
    
    let [tareas,setTareas] = useState([]);
    
        useEffect(()=>{
            fetch("https://api-tareas-mongo.onrender.com/tareas")
            .then(respuesta => respuesta.json())
            .then(tareas => setTareas(tareas));            
        },[]);

    function crearTarea(tarea){
        setTareas([...tareas,tarea])
    }
    
    
    function modificarTarea(id,texto){
        setTareas( tareas.map( tarea =>{
            if(tarea.id == id){
                tarea.tarea = texto;
            }
            return tarea;
        } ))
    }

    function cambiarEstado(id){
        setTareas( tareas.map( tarea =>{
            if(tarea.id == id){
                tarea.terminada = !tarea.terminada;
            }
            return tarea;
        } ))
    }
    function borrarTarea(id){
        setTareas(tareas.filter(tarea => tarea.id != id))
    }
    
    
    
    return(
        <>
        <Formulario crearTarea={crearTarea}></Formulario>

        { tareas.map( ({id,tarea,terminada}) =><Tarea   key={id} 
                                                        id={id}
                                                        tarea={tarea}
                                                        terminada={terminada}
                                                        modificarTarea={modificarTarea}
                                                        cambiarEstado={cambiarEstado}
                                                        borrarTarea={borrarTarea}
        
        >
        </Tarea>)}
        </>
    )
}

export default Tareas;