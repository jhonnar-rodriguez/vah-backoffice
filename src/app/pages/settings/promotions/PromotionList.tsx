import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper, Typography } from '@material-ui/core';
import { AppState } from '../../../../store';
import { startResetStateAction } from '../../../../store/actions/httpRequest/HttpRequestActions';
import SnackBar from '../../../components/snackBar/SnackBar';
import ApplicationTable from '../../../components/table/ApplicationTable';
// import SearchBar from '../../../components/searchBar/SearchBar';
import IProcessFilter from '../../../contracts/filter/IProcessFilter';
import { promotionInitialState } from '../../../data/promotions';
import IPromotion from '../../../contracts/promotion/IPromotion';
import { initialFilters } from '../../../data/filters';
import {
  startCreatePromotionAction,
  startRemovePromotionAction,
  startUpdatePromotionAction,
} from '../../../../store/actions/promotion/PromotionActions';
import useLoadPromotions from '../../../hooks/settings/promotions/useLoadPromotions';
import columns from './partials/TableColumns';
import PromotionForm from './partials/PromotionForm';
import { GeneralHelper } from '../../../helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: '75vh',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
}));

const ProductList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loadPromotions] = useLoadPromotions();

  const { promotionReducer, httpRequestReducer } = useSelector((state: AppState) => state)
  const { data: promotions, totalItems, nextPage, prevPage } = promotionReducer;
  const { success } = httpRequestReducer;

  const [openForm, setOpenForm] = useState<boolean>(false);
  const [createPromotion, setCreatePromotion] = useState<boolean>(true);
  const [promotionToUpdate, setPromotionToUpdate] = useState<IPromotion>(promotionInitialState);
  const [filtersApplied, setFiltersApplied] = useState<IProcessFilter>(initialFilters);

  const handleDeletePromotionAction = (promotionId: string) => {
    const dispatcher = () => dispatch(startRemovePromotionAction(promotionId));
    dispatcher();
  };

  const resetSuccessMessage = () => {
    const dispatcher = () => dispatch(startResetStateAction());
    dispatcher();
  };

  const handleFormClose = (promotion?: IPromotion) => {
    setOpenForm(false);
    setCreatePromotion(true);
    setPromotionToUpdate(promotionInitialState);

    if (typeof promotion?.segment === 'undefined') {
      return;
    }

    const formattedData: IPromotion = {
      ...promotion,
      details: typeof promotion.details === 'string' ? promotion.details.split(';') : promotion.details,
    }

    let dispatcher = () => dispatch(startCreatePromotionAction(formattedData));

    if (!createPromotion) {
      dispatcher = () => dispatch(startUpdatePromotionAction(formattedData));
    }

    dispatcher();
  };

  const handleEditPromotionForm = (promotion: IPromotion) => {
    setCreatePromotion(false);
    setPromotionToUpdate({
      ...promotion,
      details: GeneralHelper.formatPromotionDetail(promotion.details),
    });
    setOpenForm(true);
  }

  // const handleSearchSubmit = (filter: IProcessFilter, event?: FormEvent<HTMLFormElement>, resetFilters: boolean = false): void => {
  //   if (resetFilters) {
  //     loadPromotions();
  //     setFiltersApplied(initialFilters);

  //     return;
  //   }

  //   if (typeof event !== 'undefined') {
  //     event.preventDefault();
  //   }

  //   loadPromotions(filter);
  //   setFiltersApplied(filter);
  // }

  const handlePageChange = (gotForward: boolean | undefined, limit: number): void => {
    loadPromotions({
      ...filtersApplied,
      page: typeof gotForward === 'undefined' ? 1 : gotForward ? nextPage : prevPage,
      limit,
    });
  }

  return (
    <>
      <Paper className={classes.root}>
        <div className={classes.buttonContainer}>
          <Typography variant='h4' style={{ padding: '5px' }}>
            Listado de promociones
          </Typography>

          <Button
            variant='contained'
            color='primary'
            onClick={() => setOpenForm(true)}
            className={classes.button}
          >
            Crear
          </Button>
        </div>

        {/* <SearchBar
          onSubmit={handleSearchSubmit}
          optionsToFilter={productsFilterableOptions}
        /> */}

        <ApplicationTable
          columns={columns}
          elements={promotions}
          totalElements={totalItems}
          handlePageChange={handlePageChange}
          handleEditAction={handleEditPromotionForm}
          handleConfirmDeleteAction={handleDeletePromotionAction}
        />

        {
          typeof success !== 'undefined' &&
          success.message.length > 0 &&
          <SnackBar
            message={success.message}
            onDismiss={resetSuccessMessage}
          />
        }
      </Paper>

      {
        openForm &&
        <PromotionForm
          open={openForm}
          action={createPromotion ? 'Crear' : 'Actualizar'}
          handleClose={handleFormClose}
          promotionToUpdate={promotionToUpdate}
        />
      }
    </>
  );
};

export default ProductList;
