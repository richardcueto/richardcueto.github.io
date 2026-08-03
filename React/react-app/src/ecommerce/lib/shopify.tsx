// Reemplazo de process.env por import.meta.env para Vite
const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_STORE_FRONT_ACCESS_TOKEN
const collection = import.meta.env.VITE_SHOPIFY_COLLECTION

async function callShopify(query) {
  if (!domain || !storefrontAccessToken) {
    console.error("❌ Faltan las variables de entorno de Shopify. Revisa tu archivo .env y reinicia el servidor Vite.")
    throw new Error("Missing Shopify environment variables")
  }

  const fetchUrl = `https://${domain}/api/2021-01/graphql.json`

  const fetchOptions = {
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  }

  try {
    const response = await fetch(fetchUrl, fetchOptions)
    const data = await response.json()

    if (data.errors) {
      console.error("Shopify GraphQL API Errors:", data.errors)
    }

    return data
  } catch (error) {
    console.error("Fetch Error:", error)
    throw new Error("Could not fetch products!")
  }
}

export async function getAllProductsInCollection() {
  const query = `{
    collectionByHandle(handle: "${collection}") {
      id
      title
      products(first: 250) {
        edges {
          node {
            id
            title
            description
            handle
            images(first: 250) {
              edges {
                node {
                  id
                  originalSrc
                  height
                  width     
                  altText             
                }
              }
            }
            variants(first: 250) {
              edges {
                node {
                  id
                  title
                  price                
                }
              }
            }
          }
        }
      }
    }
  }`

  const response = await callShopify(query)

  const allProducts = response?.data?.collectionByHandle?.products?.edges
    ? response.data.collectionByHandle.products.edges
    : []

  return allProducts
}

export async function getProductSlugs() {
  const query = `{
    collectionByHandle(handle: "${collection}") {
      products(first: 250) {
        edges {
          node {
            handle              
          }
        }
      }
    }
  }`

  const response = await callShopify(query)

  const slugs = response?.data?.collectionByHandle?.products?.edges
    ? response.data.collectionByHandle.products.edges
    : []

  return slugs
}

export async function getProduct(handle) {
  const query = `{
    productByHandle(handle: "${handle}") {
      id
      title
      handle
      description
      images(first: 250) {
        edges {
          node {
            id
            originalSrc
            height
            width     
            altText             
          }
        }
      }
      variants(first: 250) {
        edges {
          node {
            id
            title
            price                
          }
        }
      }
    }
  }`

  const response = await callShopify(query)

  const product = response?.data?.productByHandle
    ? response.data.productByHandle
    : null

  return product
}

export async function createCheckout(id, quantity) {
  const query = `mutation {
    checkoutCreate(input: {
      lineItems: [{ variantId: "${id}", quantity: ${quantity} }]
    }) {
      checkout {
        id
        webUrl
        lineItems(first: 250) {
          edges {
            node {
              id
              title
              quantity
            }
          }
        }
      }
    }
  }`

  const response = await callShopify(query)

  const checkout = response?.data?.checkoutCreate?.checkout
    ? response.data.checkoutCreate.checkout
    : null

  return checkout
}

export async function updateCheckout(id, lineItems) {  
  const formattedLineItems = lineItems.map(item => {
    return `{
      variantId: "${item.variantId}",
      quantity: ${item.quantity}
    }`
  })

  const query = `mutation {
    checkoutLineItemsReplace(lineItems: [${formattedLineItems.join(', ')}], checkoutId: "${id}") {
      checkout {
        id
        webUrl
        lineItems(first: 250) {
          edges {
            node {
              id
              title
              quantity
            }
          }
        }
      }
    }
  }`

  const response = await callShopify(query)

  const checkout = response?.data?.checkoutLineItemsReplace?.checkout
    ? response.data.checkoutLineItemsReplace.checkout
    : null

  return checkout
}