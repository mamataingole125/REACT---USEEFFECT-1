import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

const Counter = () => {
    const [count1,setCount1]=useState(0);
    const [count2,setCount2]=useState(0);


fetch("https://localhost:3001/todos")
.then((res)=>res.json())
.then((data)=>{
    console.log(data)
})




    useEffect(()=>{
        console.log("inside",count1,count2);
    },[])
//in the above line if we do not take empty array then it will 
//change dom everytime to prevent this we write [] there
  return (
    <div>
        <div className='App' onClick={()=>setCount1(count1+1)}>
            Counter 1 :{count1}
        </div>
        <div className='App' onClick={()=>setCount2(count2+1)}>
            Counter 2 :{count2}
        </div>
    </div>
  )
}

export default Counter