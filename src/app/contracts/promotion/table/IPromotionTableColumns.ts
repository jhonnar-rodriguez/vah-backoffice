import IBaseTableColumns from '../../table/IBaseTableColumns';

interface IPromotionTableColumns extends IBaseTableColumns {
  id: 'name' | 'rules' | 'description' | 'actions';
}

export default IPromotionTableColumns;
