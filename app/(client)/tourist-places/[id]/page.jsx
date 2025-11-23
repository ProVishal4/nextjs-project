"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react'



export default function FieldPage() {
    const [cards, setCards] = useState([])


    useEffect(()=>{
        axios.get('/api/blog')
        .then((res)=>{
            setCards(res.data);
        })
        .catch((err)=>{
            console.log("Error in fetching articles Cards", err)
        })
    },[])
  return (
    <div>
        <h1>below all articls cards</h1>
        {
            cards.map((item, id) =>(
                <div key={id._id} className='border rounded-2xl'>
                    <h1>{item.title}</h1>
                </div>
            ))
        }
    </div>
  )
}
