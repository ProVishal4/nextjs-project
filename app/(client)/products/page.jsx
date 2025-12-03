import ProductList from "./ProductList"
// thapa YT
 const Products = async ({searchParams})=>{
    // const searchParam = await props.searchParams; (props)
    // console.log(searchParam)
     const catagory = searchParams?.category || "all";
     const sort = searchParams?.sort || "default";
     const page = searchParams?.page || 1;
    return (<div> <ProductList /> <h1>Search Params {catagory},{sort},{page}</h1></div>)
}

export default Products