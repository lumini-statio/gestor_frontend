import React, { useState } from 'react'
import { useEffect } from 'react'
import { getAllMeses } from '../api/meses.api'
import { useNavigate } from 'react-router-dom'

const Elements = () => {

  const [meses, setMeses] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    async function cargarMeses() {
      const res = await getAllMeses()
      setMeses(res.data)
    }
    cargarMeses()
  }, [])

  const cards = document.querySelectorAll(".card");

  window.addEventListener("mousemove", (ev) => {
    cards.forEach((e) => {
      const blob = e.querySelector(".blob");
      const fblob = e.querySelector(".fakeblob");
      const rec = fblob.getBoundingClientRect();
  
      const mouseX = ev.clientX - rec.left - rec.width / 2;
      const mouseY = ev.clientY - rec.top - rec.height / 2;
  
      blob.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  
      e.addEventListener("mouseenter", function () {
        blob.style.opacity = "1";
      });
  
      e.addEventListener("mouseleave", function () {
        blob.style.opacity = "0";
      });
    });
  });

  return (
    <div className='flex'>
      <div className='grid'>
        {meses.map(mes => (
          <div className='card card-container'>
            <div className='blob'></div>
            <div className='inner' key={mes.id}  onClick={()=>{navigate(`/mes/${mes.id}`)}}>
              <h1> {mes.nombre} </h1>
              <h3> {mes.sueldo_total} </h3>
              <h4> {mes.resto} </h4>
            </div>
            <div className='fakeblob'></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Elements
