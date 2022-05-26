import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";
import styles from "./Todos.module.css"

const Todos = () => {
    const [todos,setTodos]=useState([])
    const [newTodo,setNewTodo]=useState("")
    const [page,setPage]=useState(1)
    const [limit,setLimit]=useState(5);
    const [totalcount,setTotalcount]=useState(0)



    //here if we do not use useeffect then fetch goes 
// into infinite loop so to prevent that we used useeffect
useEffect(()=>{
const getTodos=()=>{
  axios.get(`http://localhost:3001/todos?_page=${page}&_limit=${limit}`)
  .then((res)=>{
   console.log(res)
    setTodos(res.data)
    setTotalcount(Number(res.headers["x-total-count"]));
  })

}
getTodos()
},[page,limit])



const saveInfo = ()=>{


    fetch("http://localhost:3001/todos",{
        method:"POST",
        headers:{
            "content-type":"application/json",
        },
        body:JSON.stringify({
            text:newTodo,
            isCompleted:false,
        }),
    })
    .then((res)=>res.json())
    .then((data)=>{
     setTodos([...todos,data])
     setNewTodo("")
    });

}


  return (
    <div className={styles.APP}>TODO APP
   <div className={styles.pagination}>
   <button 
    disabled={page<=1}
    onClick={()=>setPage(page-1)}
    >{"<"}</button>

    <input 
    type="number" 
    value={limit}
    min={0}
    max={totalcount}
    onChange={(e)=>setLimit(Number(e.target.value))}
    />

    <button 
    disabled={totalcount< page*limit}
    onClick={()=>setPage(page+1)}
    >{">"}</button>
   </div>
        <div className={styles.middle}>
           <div>
           <input
           className={styles.inputbtn}
           placeholder="write here....."
            type="text" 
            value={newTodo}
            onChange={({target})=>setNewTodo(target.value)}
            />
            <button 
            className={styles.btn}
           onClick={saveInfo} >Save</button>
            
           </div>
            <div>
            {todos.map((todo)=>(
              <div key={todo.id}>{todo.text}
              {/* <edit></edit>
              <delete></delete> */}
              </div>
            ))}
            </div>
        </div>
    </div>
  );
};

export default Todos;