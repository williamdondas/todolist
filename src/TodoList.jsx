import React,{useState, useEffect} from 'react';
import './TodoList.css';
import Icone from './assets/icon.png';


function TodoList(){

    const listaStorage = localStorage.getItem('lista');

    const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []);
    const [novoItem, setNovoItem] = useState("");

    useEffect(()=>{
        localStorage.setItem('lista', JSON.stringify(lista));
    },[lista])

    function adicionaItem(form){
        form.preventDefault();
        if(!novoItem){
            return;
        }
        setLista([...lista, {text:novoItem, isCompleted:false}]);
        setNovoItem("");
        document.getElementById("input-entrada").focus();
    }

    function clicou(index){
        const listaAux = [...lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux);
    }

    function deleta(index){
        const listaAux = [...lista];
        listaAux.splice(index,1);
        setLista(listaAux);
    }

    function deletaTudo(){
        setLista([]);
    }

    return(
        <div>
            <h1>Lista de Tarefas!</h1>
            <form onSubmit={adicionaItem}>
                <input 
                    id="input-entrada"
                    type="text" 
                    value={novoItem}
                    onChange={(e)=>{setNovoItem(e.target.value)}} 
                    placeholder="Adicione uma tarefa" 
                />
                <button className="add" type="submit">Add</button>
            </form>
            <div className="listaTarefas" >
                <div className='div-cont' style={{textAlign:'center'}}>
                {
                    lista.length < 1
                    ?
                    <img id='imagem' src={Icone}/>
                    :
                    lista.map((item, index)=>(
                        <div 
                        key={index}
                        className={item.isCompleted ? "item completo" :"item" }
                        >
                         <span onClick={()=>{clicou(index)}}>{item.text}</span>
                         <button onClick={()=>{deleta(index)}} className="del" >Deletar</button>
                    </div>
                    ))
                    
                }
                
                {
                    lista.length >0 &&
                    <button onClick={()=>{deletaTudo()}} className='deleteAll' >Deletar todas</button>
                }

                
                
                </div>

            </div>
        </div>
    )
}
export default TodoList