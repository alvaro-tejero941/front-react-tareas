import { useState } from "react";

function Tarea(tarea){

    let [editando,setEditando] = useState(false);
    let [modificado,setModificado] = useState("");

    return(
        <>
        <div className="tarea">
            <h2 className={ !editando ? "visible" : ""}>{[tarea.tarea].toString()}</h2>

            <input type="text" onChange={evento => setModificado(evento.target.value)} className={ editando ? "visible" : ""} defaultValue={[tarea.tarea].toString()} />
            
            <button className="boton" onClick={ async ()=> {
                if(editando){
                    if(modificado.trim() != "" && modificado.trim() != tarea.tarea){

                        let {error} = await fetch(`https://api-tareas-mongo.onrender.com/tareas/actualizar/${tarea.id}/1`,{
                            method: "PUT",
                            body : JSON.stringify({tarea : modificado}),
                            headers : {
                                "content-type" : "application/json"
                            }
                        }).then(respuesta => respuesta.json());
                        
                        if(!error){
                            console.log(tarea.id,modificado);                            
                            setEditando(false);                            
                            return tarea.modificarTarea(tarea.id,modificado);                            
                         }
                        
                        console.log("error");
                        setEditando(false);
                    }
                    setEditando(false);
                }else{
                    setEditando(true);
                }
            }}>{ !editando ? "editar" : "guardar"}</button>


            <button className="boton" onClick={() =>{
                fetch(`https://api-tareas-mongo.onrender.com/tareas/borrar/${tarea.id}`,{
                    method: "DELETE"
                })
                .then(resultado => resultado.json())
                .then(({error}) => {
                    if(!error){
                       return tarea.borrarTarea(tarea.id);
                    }
                });
            }}>borrar</button>


            <button className={`estado ${ tarea.terminada ? "terminada" : ""}`} onClick={ ()=> { 

                    fetch(`https://api-tareas-mongo.onrender.com/tareas/actualizar/${tarea.id}/2`,{
                        method: "PUT"
                    })
                    .then(resultado => resultado.json())
                    .then(({error}) => {
                        if(!error){
                            return tarea.cambiarEstado(tarea.id);
                        }
                    });
                }}>
            <span></span></button>
        </div>
        </>
    )
}
export default Tarea;