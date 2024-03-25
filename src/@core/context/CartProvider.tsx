import React, { createContext, useContext, useState } from 'react'

export const CartContext = createContext<any[]>([])
export const CartProvider: React.FC = ({ children }) => {
  const [cart, setCart] = useState<any[]>([])

  return <CartContext.Provider value={[cart, setCart]}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
