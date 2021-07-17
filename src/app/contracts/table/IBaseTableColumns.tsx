interface IBaseTableColumns {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: any) => string;
  generateLink?: boolean;
}

export default IBaseTableColumns;
