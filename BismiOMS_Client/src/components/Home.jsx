import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  useEffect(()=>{
    const data = localStorage.getItem('token');
    if(data){
console.log('helooo ')
    }else{
      navigate('/login')
    }
  })
  return (
    <div>
      <h1>home</h1>
    </div>
  )
}

export default Home
