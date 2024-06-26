import Product from "./Product";
import { useState, useEffect } from "react";
import productsData from "./data/productData.json";

const ProductList = () => {
  const [productState, setProductState] = useState("All Products");  
  const [searchItem, setSearchItem] = useState("");
  const [selectSortedby, setSelectSorteby] = useState("");
  const [displayProducts, setDisplayProducts] = useState(productsData)
  
 
  useEffect(() => {
    let filteredProducts = productsData

    if (searchItem.trim() !== '') {
      filteredProducts = productsData.filter((product) => {
      const productNameMatch = product.name.toLowerCase().includes(searchItem.toLowerCase());
      const productsDescriptionMatch = product.description.toLocaleLowerCase().includes(searchItem.toLowerCase());
      return productNameMatch || productsDescriptionMatch;
      })
    }

    if (productState !== "All Products") { 
      filteredProducts = filteredProducts.filter((product) => {
        if (productState === 'Shirts') return product.category === 'shirts';
        if(productState === 'Pants and Shirts') return product.category === 'pants' || product.category === 'skirts';
        if(productState === 'Jackets') return product.category ===  'jackets';
        return false;
      })
    }

      if (selectSortedby === "lowToHigh") {
        filteredProducts.sort((a,b) => a.price - b.price);
      } else if (selectSortedby === "highToLow") {
        filteredProducts.sort((a,b) => b.price - a.price)
      }

      setDisplayProducts(filteredProducts)

  }, [searchItem, productState, selectSortedby])




  const handleButtonClick = (productType) => {
    setProductState(productType)
    setSearchItem("");
    setSelectSorteby("")
  }

  const handleSortedChange = (event) => {
    setSelectSorteby(event.target.value);
  }
  

  return (
    <>
      <h1>Amy's clothing store</h1>
      <h3 className="text-center text-gray-600">You can buy everything you need to wear.</h3>
      <div className="filter-menu my-4 flex flex-rows flex-wrap">
        <h2 className="h-14 p-2 m-2">Filter</h2>
        <input
          className="h-14 p-2 m-2 border-2 border-gray-400 hover:border-blue-600" 
          value={searchItem} 
          onChange={(e) => setSearchItem(e.target.value)} 
          placeholder="search for a product" 
        />
        <button
          className="text-nowrap h-14 p-2 m-2 hover:bg-blue-600 border-2 border-gray-500 hover:border-blue-600 rounded-2xl" 
          onClick={() => handleButtonClick('All Products')}
        >
          All products
        </button>
        <button
          className="text-nowrap h-14 p-2 m-2 border-2 border-gray-500 hover:border-blue-600 rounded-2xl" 
          onClick={() => handleButtonClick('Shirts')}
        >
          Shirts
        </button>
        <button
          className="text-nowrap h-14 p-2 m-2 border-2 border-gray-500 hover:border-blue-600 rounded-2xl"  
          onClick={() => handleButtonClick('Pants and Shirts')}
        >
          Pants and Skirts
        </button>
        <button
          className="text-nowrap h-14 p-2 m-2 border-2 border-gray-500 hover:border-blue-600 rounded-2xl"  
          onClick={() => handleButtonClick('Jackets')}
        >
          Jackets
        </button>
        <select 
          id="Sorted" 
          value={selectSortedby} 
          onChange={handleSortedChange}
          className="h-14 m-2 border-2 border-gray-400 hover:border-blue-600"
        >
          <option value="" disabled>Sort by price:</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>
          <h5 className="px-4 m-2 px-2">You are search for:  <strong> {searchItem || productState}</strong></h5> 
      <div className="products-list">
        {displayProducts?.map((product, index) => (
          <Product 
            key={index}
            name={product.name}
            price={product.price}
            pic={product.pic}
            description={product.description}
          />
        ))}
      </div>
    </>
  ) 
}

export default ProductList;