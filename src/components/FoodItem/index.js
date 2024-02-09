import './index.css'

const FoodItem = props => {
  const {details, increment, decrement} = props
  const {
    dishId,
    dishName,
    dishPrice,
    dishImage,
    dishCurrency,
    dishCalories,
    dishType,
    dishDescription,
    dishAvailabiity,
    addonCat,
    quantity,
  } = details
  const dishTypeImage =
    dishType === 2
      ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Veg_symbol.svg/1200px-Veg_symbol.svg.png'
      : 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Non_veg_symbol.svg/2048px-Non_veg_symbol.svg.png'

  const onIncrement = () => {
    increment(dishId)
  }

  const onDecrement = () => {
    decrement(dishId)
  }

  return (
    <li className="dish-item">
      <div className="first">
        <img src={dishTypeImage} className="dish-type-image" />
      </div>
      <div className="second">
        <h1>{dishName}</h1>
        <div className="price">
          <p>
            {dishCurrency} {dishPrice}
          </p>
        </div>
        <p>{dishDescription}</p>
        <div className="count">
          <button type="button" className="count-button" onClick={onDecrement}>
            -
          </button>
          <p>{quantity}</p>
          <button type="button" className="count-button" onClick={onIncrement}>
            +
          </button>
        </div>
        {addonCat.length !== 0 && (
          <h1 className="custom">Customizations available</h1>
        )}
        {dishAvailabiity === false && <p className="custom">Not available</p>}
      </div>
      <div className="third">
        <p>{dishCalories} Calories</p>
      </div>
      <div className="fourth">
        <img src={dishImage} className="dish-img" />
      </div>
    </li>
  )
}
export default FoodItem
