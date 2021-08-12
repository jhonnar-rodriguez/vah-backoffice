import { FC } from 'react';
import { useSelector } from "react-redux";
import { Redirect, Route } from 'react-router-dom';
import { AppState } from '../../../store';
import Loading from "../../components/loading/Loading";
import useLoadAuthentication from '../../hooks/auth/useLoadAuthentication';
import useSetNavigation from '../../hooks/navigation/useSetNavigation';

type RouteWithLayoutProps = {
  path: string,
  exact?: boolean,
  layout: FC,
  component: FC,
  pageTitle: string,
}

const RouteWithLayout: FC<RouteWithLayoutProps> = ({
  path,
  layout: Layout,
  component: Component,
  pageTitle,
  exact = true,
}) => {
  const { httpRequestReducer, authReducer } = useSelector((state: AppState) => state);

  const { isAuthenticated, loadingUser } = authReducer;
  const { isLoading } = httpRequestReducer;

  useLoadAuthentication();
  useSetNavigation(pageTitle);

  return (
    <Route
      path={path}
      exact={exact}
      render={(matchProps: any) => (
        !loadingUser && !isAuthenticated ?
          <Redirect to="/auth/login" /> :
          <Layout>
            {isLoading && <Loading />}
            <Component {...matchProps} pageTitle={pageTitle} />
          </Layout>
      )}
    />
  );
};

export default RouteWithLayout;
