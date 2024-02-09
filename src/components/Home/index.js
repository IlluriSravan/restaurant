import './index.css'
import {useState} from 'react'
import {IoCartOutline} from 'react-icons/io5'
import FoodItem from '../FoodItem'
import CategoryItem from '../CategoryItem'

const categories = [
  'Salads and Soup',
  'From The Barnyard',
  'From the Hen House',
  'Fresh From The Sea',
  'Biryani',
  'Fast Food',
]

const Home = props => {
  const {apiData} = props
  console.log('api', apiData)
  // const menuItems = apiData.map(each => each.menuCategory)
  const newObj = {}
  apiData.forEach(menuItem => {
    const {menuCategory, categoryDishes} = menuItem
    const formatedCategoryDishes = categoryDishes.map(ve => ({
      dishId: ve.dish_id,
      dishName: ve.dish_name,
      dishPrice: ve.dish_price,
      dishImage: ve.dish_image,
      dishCurrency: ve.dish_currency,
      dishCalories: ve.dish_calories,
      dishType: ve.dish_Type,
      dishDescription: ve.dish_description,
      dishAvailabiity: ve.dish_Availability,
      addonCat: ve.addonCat,
      quantity: 0,
    }))
    newObj[menuCategory] = formatedCategoryDishes
  })

  const [cart, setCart] = useState(0)
  const [active, setActive] = useState(categories[0])
  const [foodItems, setFoodItems] = useState(newObj)

  const increment = id => {
    console.log('incr', id)
    const updatedCatgoryDishes = foodItems[active].categoryDishes.map(each => {
      if (each.dishId === id) {
        return {
          ...each,
          quantity: each.quantity + 1,
        }
      }
      return each
    })
    const updated = {...foodItems}
    updated[active] = updatedCatgoryDishes
    setFoodItems(updatedCatgoryDishes)
    setCart(prev => prev + 1)
  }

  const decrement = id => {
    const updatedCatgoryDishes = foodItems[active].categoryDishes.map(each => {
      if (each.dishId === id) {
        if (each.quantity !== 0) {
          setCart(prev => (prev === 0 ? 0 : prev - 1))
        }
        return {
          ...each,
          quantity: each.quantity === 0 ? 0 : each.quantity - 1,
        }
      }
      return each
    })
    const updated = {...foodItems}
    updated[active] = updatedCatgoryDishes
    setFoodItems(updatedCatgoryDishes)
  }

  const onClickItem = act => {
    setActive(act)
  }

  return (
    <>
      <div className="header">
        <h1>UNI Resto Cafe</h1>
        <div className="head-right">
          <p>My Orders</p>
          <IoCartOutline />
          <div className="cartno">{cart}</div>
        </div>
      </div>
      <ul className="categories">
        {categories.map(each => (
          <CategoryItem
            details={each.menuCategory}
            onClickItem={onClickItem}
            isSelected={active}
            key={each.menuCategoryId}
          />
        ))}
      </ul>
      <ul className="body">
        {foodItems.map(each => (
          <FoodItem
            key={each.dishId}
            details={each}
            increment={increment}
            decrement={decrement}
          />
        ))}
      </ul>
    </>
  )
}
export default Home
//
