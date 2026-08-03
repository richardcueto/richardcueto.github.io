import { createCheckout, updateCheckout } from '../lib/shopify'

// Definimos la clave de almacenamiento con fallback por si no existe en el .env
const STORAGE_KEY = import.meta.env.VITE_LOCAL_STORAGE_NAME || 'shopify_local_store'

export function saveLocalData(cart, checkoutId, checkoutUrl) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([cart, checkoutId, checkoutUrl]))
  } catch (error) {
    console.error('Error al guardar datos en localStorage:', error)
  }
}

function getLocalData() {
  try {
    const item = localStorage.getItem(STORAGE_KEY)
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.error('Error al parsear datos de localStorage:', error)
    return null
  }
}

export function setLocalData(setCart, setCheckoutId, setCheckoutUrl) {
  const localData = getLocalData()

  if (localData && Array.isArray(localData)) {
    if (Array.isArray(localData[0])) {
      setCart([...localData[0]])
    } else if (localData[0]) {
      setCart([localData[0]])
    }

    if (localData[1]) setCheckoutId(localData[1])
    if (localData[2]) setCheckoutUrl(localData[2])
  }
}

export async function createShopifyCheckout(newItem) {
  const data = await createCheckout(newItem['variantId'], newItem['variantQuantity'])  
  return data
}

export async function updateShopifyCheckout(updatedCart, checkoutId) {
  const lineItems = updatedCart.map(item => {
    return {
      variantId: item['variantId'],
      quantity: item['variantQuantity']
    }
  })
  await updateCheckout(checkoutId, lineItems)
}

export function getCartSubTotal(cart) {
  if (!cart || cart.length === 0) {
    return 0
  } else {
    let totalPrice = 0
    cart.forEach(item => {
      totalPrice += parseInt(item.variantQuantity, 10) * parseFloat(item.variantPrice)
    })
    return Math.round(totalPrice * 100) / 100
  }
}