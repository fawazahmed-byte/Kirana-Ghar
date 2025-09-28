import { useState, useEffect } from 'react'
import { productsAPI } from '../services/api'

export const useProducts = (filters = {}) => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 1,
    total: 0,
    limit: 20
  })

  const fetchProducts = async (queryParams = {}) => {
    setLoading(true)
    setError(null)
    
    try {
      const params = {
        ...filters,
        ...queryParams
      }
      
      const data = await productsAPI.getProducts(params)
      setProducts(data.products)
      setPagination(data.pagination)
    } catch (err) {
      setError(err.message || 'Failed to fetch products')
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const cats = await productsAPI.getCategories()
      setCategories(cats)
      return cats
    } catch (err) {
      console.error('Error fetching categories:', err)
      return []
    }
  }

  const fetchProduct = async (id) => {
    try {
      return await productsAPI.getProduct(id)
    } catch (err) {
      console.error('Error fetching product:', err)
      throw err
    }
  }

  return {
    products,
    categories,
    loading,
    error,
    pagination,
    fetchProducts,
    fetchCategories,
    fetchProduct
  }
}
