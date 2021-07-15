import React from 'react';
import { Route } from 'react-router-dom';
import { FC } from 'react';

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
  return (
    <Route
      path={path}
      exact={exact}
      render={(matchProps: any) => (
        <Layout>
          <Component {...matchProps} pageTitle={pageTitle} />
        </Layout>
      )}
    />
  );
};

export default RouteWithLayout;
