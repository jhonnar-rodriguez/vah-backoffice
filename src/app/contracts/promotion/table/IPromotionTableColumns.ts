import IBaseTableColumns from '../../table/IBaseTableColumns';

interface IPromotionTableColumns extends IBaseTableColumns {
  id: 'segment' | 'details' | 'description' | 'actions';
}

export default IPromotionTableColumns;
