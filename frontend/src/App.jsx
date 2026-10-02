import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import  Register from "./components/Register"
import Subget from './components/Subget'
import Product from './components/Product'
import Login from './components/Login'
import Header from './components/Header'
import Addsubcategory from './components/Addsubcategory'
import Addcategory from './components/Addcategory'
import Addget from './components/Addget'
// import Sget from './components/Sget'
import Pget from './components/Pget'
import Siteroutes from './components/Siteroutes'
import ProductDetail from './components/ProductDetail'
import Card from './components/Card'
import Ordersucessfully from './components/Ordersucessfully'
import Ordertracking from './components/Ordertracking'
import Wishlist from './components/Wishlist'
import Contextdata from './components/Contextdata'
import user_context from './components/Context'
import Adminheader from './components/Adminheader'
import Checkout from './components/Checkout'
import Footer from './components/Footer'
import AIShoppingAssistant from './components/AIShoppingAssistant'
function App() {
  const [count, setCount] = useState(0)
const[Rolee,setRolee]=useState()
  return (
    <>
{/* <Register/> */}
{/* <Subget/> */}
{/* <Product/> */}
{/* <Login/> */}
{/* <Header/> */}
{/* <Addsubcategory/> */}
{/* <Addcategory/> */}
{/* <Addget/> */}
{/* <Header/> */}
{/* <Product/> */}
{/* <Sget/> */}
{/* <Pget/> */}

{/* <ProductDetail/> */}
{/* <Card/> */}
{/* <Ordersucessfully/> */}
{/* <Ordertracking/> */}
{/* <Wishlist/> */}
{/* <Adminheader/> */}
{/* <Checkout/> */}
{/* <Payment/> */}
<user_context.Provider  value={{Rolee,setRolee}}>
  {Rolee=="admin"?<Adminheader/>:<Header/>}
  <Siteroutes/>
  <AIShoppingAssistant/>
  <Footer/>
</user_context.Provider>
    </>
  )
}

export default App
