import React from 'react'

export default async function DataFetchServer(props) {
  const searchParams = await props.searchParams;
const movieName = searchParams.movie
if (movieName.length === "") {
  return <div>Please Enter Movie Name</div>
}
if(!movieName){
  return <div>No Movie Name Found!</div>
}
  const res = await fetch(`http://localhost:5000/api/search?movie=${movieName}`);
  const data = await res.json();
  console.log(data)
  return (
   <div>Data Fetching in server:-  {movieName}</div>
  )
}
