import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Revision() {
    const [data,setData] = useState([])
     useEffect(()=>{
          axios.get("http://localhost:8000/revision").then((res=>{
        setData(res.data)
    }))
     },[])
   
  return (
    <div>

        <h1>Revision List</h1>
         <Link to="/adduser"><button className='bg-green-700 rounded'>Add User</button></Link>
        <table className='border-1 w-200'>
            <tr>
                <thead>
                    <th className='border-1 w-100'>ID</th>
                    <th className='border-1 w-100'>Activite</th>
                    <th className='border-1 w-100'>Time</th>
                    <th className='border-1 w-100'>Achieved</th>
                    <th className='border-1 w-100'>Action</th>
                </thead>
            </tr>
         {data.map((val,i)=>{
            return(
                 <tr>
                <tbody>
                    <td className='border-1 w-50'>{i++}</td>
                    <td className='border-1 w-69'>{val.Activite}</td>
                    <td className='border-1 w-69'>{val.Time}</td>
                    <td className='border-1 w-69'>{val.Achieved}</td>
                    <td className='border-1 w-69'><button className='mr-10 bg-green-500 rounded'>Update</button><button className='bg-red-500 rounded'>Delete</button></td>
                </tbody>
            </tr>
            )
         })}
        </table>
    </div>
  )
}

export default Revision