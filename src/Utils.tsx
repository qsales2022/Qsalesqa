export function formatPrice(price: number): string {
    const priceStr = price.toString();
  
    if (price % 1 === 0) {
      return priceStr.split('.')[0];
    } else {
      return priceStr;
    }
  }