interface IColumn {
  id: "name" | "sku" | "summary" | "price" | "quantity" | "stockStatus" | "delete";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: any) => string;
  generateLink?: boolean;
}

export default IColumn;
