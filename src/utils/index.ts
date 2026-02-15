

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function getImagePath(image?: string | null) {
  const fallback = '/products/placeholder.svg'
  if (!image) return fallback

  const cloudinaryBaseURL = `https://res.cloudinary.com`
  if (image.startsWith(cloudinaryBaseURL)) {
    return image
  } else if (image.startsWith('http://') || image.startsWith('https://')) {
    return image
  } else if (image.startsWith('/')) {
    return image
  } else if (/\.[a-z0-9]+$/i.test(image)) {
    return `/products/${image}`
  } else {
    return `/products/${image}.jpg`
  }
}
