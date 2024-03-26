import { Card } from '@mui/material'
import { CartProvider } from 'src/@core/context/CartProvider'
import Checkout from 'src/layouts/components/Devices/AddToCarts/Checkout'
import DeviceItems from 'src/layouts/components/Devices/DeviceItem'

export default function App() {
  // const [cart, setCart] = useState([])
  // const [showDeviceItems, setShowDeviceItems] = useState(false)
  // const updateCart = (newCart) => {
  //   setCart(newCart);
  // };

  return (
    <CartProvider>
      {/* <DeviceItems cart={cart} setCart={setCart} />
      <Checkout cart={cart} /> */}

      <DeviceItems />
      <Card>
        <Checkout />
      </Card>
    </CartProvider>
  )
}
