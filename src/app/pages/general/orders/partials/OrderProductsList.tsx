import { FC } from "react";
import {
  Paper,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
} from "@material-ui/core";
import { CurrencyHelper, GeneralHelper } from "../../../../helpers";
import { IProductInCart } from "../../../../contracts/general/cart/ICart";

type ProductsListProps = {
  products: IProductInCart[],
  cartTotal: number,
  cartTotalDiscount: number,
}

const OrderProductsList: FC<ProductsListProps> = ({ products, cartTotal, cartTotalDiscount }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="products in order">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Detalle
            </TableCell>
            <TableCell align="right">Precios</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Descripción</TableCell>
            <TableCell align="right">SKU</TableCell>
            <TableCell align="right">Cantidad</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            products
              .map((product: IProductInCart) => (
                <TableRow key={product.productId}>
                  <TableCell>{GeneralHelper.strLimit(product.name, 40)}</TableCell>
                  <TableCell align="right">{product.sku || product.name.slice(0, 5).toUpperCase()}</TableCell>
                  <TableCell align="right">{product.quantity}</TableCell>
                  <TableCell align="right">{CurrencyHelper.formatTotal(product.price)}</TableCell>
                  <TableCell align="right">{CurrencyHelper.formatTotal(product.total)}</TableCell>
                </TableRow>
              ))
          }

          <TableRow>
            <TableCell colSpan={3} />
            <TableCell>Total Descuento</TableCell>
            <TableCell align="right">
              {CurrencyHelper.formatTotal(cartTotalDiscount)}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan={3} />
            <TableCell>Total</TableCell>
            <TableCell align="right">
              {CurrencyHelper.formatTotal(cartTotal)}
            </TableCell>
          </TableRow>

        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OrderProductsList;
