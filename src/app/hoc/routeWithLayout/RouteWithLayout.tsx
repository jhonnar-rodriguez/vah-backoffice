import { FC } from 'react';
import { useSelector } from "react-redux";
import { Route } from 'react-router-dom';
import { AppState } from '../../../store';
import Loading from "../../components/loading/Loading";

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
  const { isLoading } = useSelector((state: AppState) => state.httpRequestReducer);

  return (
    <Route
      path={path}
      exact={exact}
      render={(matchProps: any) => (
        <Layout>
          {isLoading && <Loading />}
          <Component {...matchProps} pageTitle={pageTitle} />
        </Layout>
      )}
    />
  );
};

export default RouteWithLayout;
