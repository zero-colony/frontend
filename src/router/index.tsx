import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import DataProvider from '@features/globus/hocs/dataProvider';
import MapPage from '@pages/MapPage';
import ROUTES from '@root/router/routes';

const generateRoutes = (flags: Record<string, boolean>) => {
  const routes = [
    { route: ROUTES.root, element: <MapPage /> },
    { route: ROUTES.lands, element: <MapPage /> },
  ];

  return routes.map(({ element, route }) => (
    <Route
      path={route}
      element={<DataProvider>{element}</DataProvider>}
      key={route}
    />
  ));
};

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {generateRoutes({})}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};
