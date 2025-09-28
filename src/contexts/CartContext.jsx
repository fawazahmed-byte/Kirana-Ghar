import React, { createContext, useContext, useReducer, useEffect } from 'react'
import axios from 'axios'

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      // Handle backend response format { items: [], totalAmount: 0 }
      return {
        items: action.payload.items || [],
        totalAmount: action.payload.totalAmount || 0
      }
    case 'ADD_TO_CART':
      return {
        ...state,
        items: [...state.items, action.payload]
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.productId !== action.payload)
      }
    case 'UPDATE_QUANTITY':
      const updatedItems = state.items.map(item =>
        item.productId === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      )
      return {
        ...state,
        items: updatedItems,
        totalAmount: updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0)
      }
    case 'CLEAR_CART':
      return { items: [], totalAmount: 0 }
    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, { items: [], totalAmount: 0 })
  const [loading, setLoading] = React.useState(false)

  // Load cart from API on component mount
  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:5000/api/cart')
      dispatch({ type: 'SET_CART', payload: response.data })
    } catch (error) {
      console.error('Error loading cart:', error)
      // Set empty cart on error
      dispatch({ type: 'SET_CART', payload: { items: [], totalAmount: 0 } })
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (productId, quantity = 1) => {
    try {
      setLoading(true)
      const response = await axios.post('http://localhost:5000/api/cart/add', {
        productId: productId,
        quantity: quantity
      })
      
      // Update cart with response from backend
      dispatch({ type: 'SET_CART', payload: response.data })
      return { success: true, message: 'Item added to cart successfully' }
    } catch (error) {
      console.error('Error adding to cart:', error)
      return { success: false, message: 'Failed to add item to cart' }
    } finally {
      setLoading(false)
    }
  }

  const removeFromCart = async (productId) => {
    try {
      setLoading(true)
      const response = await axios.delete('http://localhost:5000/api/cart/remove', {
        data: { productId }
      })
      
      // Update cart with response from backend
      dispatch({ type: 'SET_CART', payload: response.data })
      return { success: true, message: 'Item removed from cart successfully' }
    } catch (error) {
      console.error('Error removing from cart:', error)
      return { success: false, message: 'Failed to remove item from cart' }
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (productId, quantity) => {
    try {
      setLoading(true)
      const response = await axios.put('http://localhost:5000/api/cart/update', {
        productId,
        quantity
      })
      
      // Update cart with response from backend
      dispatch({ type: 'SET_CART', payload: response.data })
      return { success: true, message: 'Cart updated successfully' }
    } catch (error) {
      console.error('Error updating cart:', error)
      // Fallback to local update
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } })
      return { success: false, message: 'Failed to update cart' }
    } finally {
      setLoading(false)
    }
  }

  const clearCart = async () => {
    try {
      setLoading(true)
      const response = await axios.delete('http://localhost:5000/api/cart/clear')
      dispatch({ type: 'SET_CART', payload: response.data })
      return { success: true, message: 'Cart cleared successfully' }
    } catch (error) {
      console.error('Error clearing cart:', error)
      // Fallback to local clear
      dispatch({ type: 'CLEAR_CART' })
      return { success: false, message: 'Failed to clear cart' }
    } finally {
      setLoading(false)
    }
  }

  const getCartTotal = () => {
    return cart.totalAmount || 0
  }

  const getCartCount = () => {
    if (!cart.items || !Array.isArray(cart.items)) {
      return 0
    }
    return cart.items.reduce((count, item) => count + item.quantity, 0)
  }

  const value = {
    cart,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    loadCart,
    getCartTotal,
    getCartCount
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
