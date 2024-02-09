import './App.css'
import {useState, useEffect} from 'react'

import Home from './components/Home'
// write your code here
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}
const categories = [
  'Salads and Soup',
  'From The Barnyard',
  'From the Hen House',
  'Fresh From The Sea',
  'Biryani',
  'Fast Food',
]
const App = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [restaurantData, setRestaurantData] = useState({})

  useEffect(() => {
    const getApi = async () => {
      setApiStatus(apiStatusConstants.inProgress)
      const url = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
      const response = await fetch(url)
      const data = await response.json()
      if (response.ok) {
        const formatedTableMenuList = data[0].table_menu_list.map(each => ({
          menuCategory: each.menu_category,
          categoryId: each.menu_category_id,
          categoryDishes: each.category_dishes,
        }))

        const formatedData = {
          restaurantName: data[0].restaurant_name,
          tableMenuList: formatedTableMenuList,
        }
        console.log(data)
        setRestaurantData(formatedData)
        setApiStatus(apiStatusConstants.success)
      }
    }
    getApi()
  }, [])

  return (
    <>
      {console.log('lo', restaurantData)}
      <Home tableMenuData={restaurantData.tableMenuList} />
    </>
  )
}

export default App
//
//
