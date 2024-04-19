import { Timestamp } from "firebase/firestore"

export interface Brands {
  id: string
  label: string
  logo: string
  description: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

export interface Category {
  id: string
  label: string
  image: { url: string }[]
  description?: string
  subcategories?: { id: string; label: string }[]
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

export interface Product {
  id: string
  title: string
  image: { url: string }[]
  description: string
  brand: string
  brandId?: string
  category: string
  categoryId?: string
  price: number
  priceWithDiscount?: number
  createdAt?: Timestamp
  updatedAt?: Timestamp
}