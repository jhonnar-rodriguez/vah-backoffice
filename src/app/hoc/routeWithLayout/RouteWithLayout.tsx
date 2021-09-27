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
  forRoles?: string[],
}

const RouteWithLayout: FC<RouteWithLayoutProps> = ({
  path,
  layout: Layout,
  component: Component,
  pageTitle,
  exact = true,
  forRoles = [],
}) => {
  useLoadAuthentication();

  const { httpRequestReducer, authReducer } = useSelector((state: AppState) => state);

  const { isAuthenticated, loadingUser, auth } = authReducer;
  const { isLoading } = httpRequestReducer;

  useSetNavigation(pageTitle);

  const userCanViewPage = (): boolean => {
    if (forRoles.length > 0) {
      const roleName = typeof auth.user.role === 'string' ? auth.user.role : auth.user.role.name;

      return forRoles.includes(roleName.toLowerCase());
    }

    return true;
  }

  return (
    <Route
      path={path}
      exact={exact}
      render={(matchProps: any) => (
        !loadingUser && !isAuthenticated ?
          <Redirect to='/auth/login' /> :
          <>
            {
              !loadingUser && !userCanViewPage() ?
                <Redirect to={{ pathname: '/unauthorized', state: { from: path } }} /> :
                <Layout>
                  {isLoading && <Loading />}
                  <Component {...matchProps} pageTitle={pageTitle} />
                </Layout >
            }
          </>
      )}
    />
  );
};

export default RouteWithLayout;
