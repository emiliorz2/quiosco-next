

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function getImagePath(image: string) {
  const cloudinaryBaseURL = `https://res.cloudinary.com`
  if (image.startsWith(cloudinaryBaseURL)) {
    return image
  }else {
    return `/products/${image}.jpg`
  }
}