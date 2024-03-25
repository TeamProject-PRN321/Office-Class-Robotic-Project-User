import { CartProvider } from 'src/@core/context/CartProvider'
import Checkout from 'src/layouts/components/Devices/AddToCarts/Checkout'
import DeviceItems from 'src/layouts/components/Devices/DeviceItem'

export default function App() {
  //const [cart, setCart] = useState([])

  return (
    <CartProvider>
      {/* <DeviceItems cart={cart} setCart={setCart} />
      <Checkout cart={cart} /> */}

      <DeviceItems />
      <Checkout />
    </CartProvider>
  )
}
