import Product from "./Product";
import { useState } from "react";
import productsData from "./data/productData.json";

const ProductList = () => {
  const [productState, setProductState] = useState({
    isAllProducts: true,
    isShirts: false,
    isPantsnSkirts: false,
    isJackets: false
  });  

  const [searchItem, setSearchItem] = useState("");

  const [selectSortedby, setSelectSorteby] = useState("");

  const handleInputChange = (event) => {
    setSearchItem(event.target.value);
  }
  
  const searchProducts = () => {
    const filterSearchProducts = productsData.filter((product) => {
      const productNameMatch = product.name.toLowerCase().includes(searchItem.toLowerCase());
      const productsDescriptionMatch = product.description.toLocaleLowerCase().includes(searchItem.toLowerCase());
      return productNameMatch || productsDescriptionMatch;
    });
    return filterSearchProducts;
  }

  const handleButtonClick = (productType) => {
    console.log("click product category: " , productType);
    setSearchItem("");
    setProductState((prev) => ({
      ...prev,
      isAllProducts: productType==='isAllProducts',
      isShirts: productType==='isShirts',
      isPantsnSkirts:  productType==='isPantsnSkirts',
      isJackets: productType==='isJackets'
    }))
  }

  const handleSortedChange = (event) => {
    setSearchItem("");
    setSelectSorteby(event.target.value);
  }
  
  const sortedProducts = () => {
    let sorted = [...productsData];
    if (selectSortedby === "lowToHigh") {
      sorted.sort((a,b) => a.price - b.price);
    } else if (selectSortedby === "highToLow") {
        sorted.sort((a,b) => b.price - a.price)
    } 
    return sorted;
  }

  const filteredProducts = sortedProducts().filter((product) => {
    if (productState.isAllProducts) return true;
    if (productState.isShirts) return product.category === 'shirts';
    if(productState.isPantsnSkirts) return product.category === 'pants' || product.category === 'skirts';
    if(productState.isJackets) return product.category ===  'jackets';
    return false;
  })

  return (
    <>
      <h1>Amy's clothing store</h1>
      <h2>You can buy everything you need to wear.</h2>
      <div className="filter-menu">
        <h2 style={{padding: '15px'}}>Filter</h2>
        <input value={searchItem} onChange={handleInputChange} placeholder="search for a product" />
        <button onClick={() => handleButtonClick('isAllProducts')}>All products</button>
        <button onClick={() => handleButtonClick('isShirts')}>Shirts</button>
        <button onClick={() => handleButtonClick('isPantsnSkirts')}>Pants and Skirts</button>
        <button onClick={() => handleButtonClick('isJackets')}>Jackets</button>
        <select id="Sorted" value={selectSortedby} onChange={handleSortedChange}>
          <option value="" selected>Sorted by:</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>
          Your are search for: {searchItem}
      <div className="products-list">
        {(searchItem === "" ) ? (
          filteredProducts.map((product,index) => (
            <Product 
              key={index} 
              name={product.name} 
              price={product.price} 
              pic={product.pic}
              description={product.description} 
              />
         )))
         : (
          searchProducts().map((product, index) => (
            <Product 
              key={index} 
              name={product.name} 
              price={product.price} 
              pic={product.pic}
              description={product.description} 
            />
          ))
        )}
      </div>
    </>
  ) 
}

export default ProductList;