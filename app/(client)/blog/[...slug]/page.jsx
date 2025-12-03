import React from 'react'
//thapa YT
 const Blog = async (props) => {
    const {slug} = await props.params
    console.log(slug)
  return (
    <div>blog</div>
  )
}
export default Blog