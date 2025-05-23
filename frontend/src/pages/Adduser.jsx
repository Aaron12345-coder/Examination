import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Adduser() {

    const [Activite,setActivite] = useState('')
    const [Time,setTime] = useState('')
    const [Achieved,setAchieved] = useState('')
    const navigate = useNavigate()
    const Submit=(e)=>{
        e.preventDefault();
    
     axios.post("http://localhost:8000/revision",{
        Activite,
        Time,
        Achieved
     }).then((res=>{
        console.log(res.data);
        navigate("/revision")
     }))
     .catch((err=>{
        console.log(err);
        
     }))   
    }
  return (
    <div>
        <form onSubmit={Submit}>
            <h1>Adduser</h1>
            <label htmlFor="activite">Activite</label><br />
            <input type="text" value={Activite} name="activite"  className ="border-1" id="activite" placeholder='Enter Activite To Do' required onChange={(e)=>{setActivite(e.target.value)}}/><br />
            <label htmlFor="time">Time</label><br />
            <input type="time" value={Time} name="time" id="time" className='border-1 w-46' placeholder='Enter Time' required onChange={(e)=>{setTime(e.target.value)}}/><br />
            <label htmlFor="achieved">Achieved</label><br />
            <input type="text" value={Achieved} name="achieved" className='border-1' id="achieved" placeholder='Enter Achieved' required onChange={(e)=>{setAchieved(e.target.value)}}/><br />
          <button type='submit' className='bg-green-400 mt-2 w-46'>Save</button>
        </form>
    </div>
  )
}

export default Adduser