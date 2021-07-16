class CurrencyHelper {
  public static formatPrice(price: number, discount: number = 0): string {
    if (discount > 0) {
      const calculatedDiscount = price - ((discount / 100));
      return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(calculatedDiscount);
    }

    return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(price);
  }

  public static formatTotal(total: number): string {
    return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(total);
  }
}

export default CurrencyHelper;
