const Product = (props) => {

  return (
    <div className="product-descriptions">
      <h3>{props.name}</h3>
      <p>${props.price}</p>
      <p className="product-description" style={{width:500}}>{props.description}</p>
      <img src={props.pic} />
    </div>
  )
}

export default Product;