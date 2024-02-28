import Product from "./Product";
import { useState } from "react";

const productsData = [
  {
    name: "Leather Jacket",
    category: "jackets",
    description:
      "Whether it's to protect from wind or just to look super cool, this leather jacket has you covered.",
    price: 400,
    pic:"https://cdn.pixabay.com/photo/2016/11/29/01/34/man-1866572_1280.jpg"
  },
  {
    name: "Wool cardigan",
    category: "jackets",
    description:
      "Beautifully warm and soft, this cardigan will make you feel cosy on a cold day.",
    price: 80,
    pic:"https://cdn.pixabay.com/photo/2018/11/30/07/51/woman-3847209_960_720.jpg"
  },
  {
    name: "Striped business shirt",
    category: "shirts",
    description:
      "No ironing necessary to look professional every day with this striped shirt.",
    price: 50,
    pic:"https://myer-media.com.au/wcsstore/MyerCatalogAssetStore/images/40/400/3311/10/1/116559820/116559820_1_720x928.webp"
  },
  {
    name: "Short-sleeved polo shirt",
    category: "shirts",
    description: "The best shirt you can get for that business-casual look.",
    price: 30,
    pic:"https://myer-media.com.au/wcsstore/MyerCatalogAssetStore/images/40/406/3828/100/5/654520240/654520240_1_1_720x928.webp"
  },
  {
    name: "Plain business shirt",
    category: "shirts",
    description:
      "No ironing necessary to look professional every day with this plain business shirt.",
    price: 50,
    pic:"https://myer-media.com.au/wcsstore/MyerCatalogAssetStore/images/40/400/3311/10/1/116560090/116560090_1_720x928.webp"
  },
  {
    name: "Suit Jacket",
    category: "jackets",
    description: "Wear it with jeans or suit pants, it works with both!",
    price: 120,
    pic:"https://cdn.pixabay.com/photo/2015/01/16/15/01/fashion-601558_1280.jpg"
  },
  {
    name: "Suit Trousers",
    category: "pants",
    description:
      "Get 5 of these and you've got pants for every day of the week.",
    price: 100,
    pic:"https://myer-media.com.au/wcsstore/MyerCatalogAssetStore/images/40/400/3314/30/5/842203360/842203360_2_720x928.webp"
  },
  {
    name: "Denim Jeans",
    category: "pants",
    description:
      "A timeless classic, these denim jeans will never go out of style.",
    price: 80,
    pic:"https://cdn.pixabay.com/photo/2017/09/29/15/45/woman-2799490_1280.jpg"
  },
  {
    name: "Pencil Skirt",
    category: "skirts",
    description:
      "A classy work-ready skirt that will make you feel like a million bucks.",
    price: 100,
    pic:"https://myer-media.com.au/wcsstore/MyerCatalogAssetStore/images/70/706/2761/10/1/135525640/135525640_1_720x928.webp"
  },
  {
    name: "Cotton flowy skirt",
    category: "skirts",
    description:
      "For those warm summer days when you just need to feel the breeze on your legs.",
    price: 45,
    pic:"https://myer-media.com.au/wcsstore/MyerCatalogAssetStore/images/70/720/2547/100/1/793335070/793335070_1_720x928.webp"
  },
];

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