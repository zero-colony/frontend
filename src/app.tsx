import { Fragment } from 'react';
import { store } from '@redux/store';
import GlobalStyle from '@root/features/global/styles/global.styles';
import { AppRouter } from '@root/router';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';
import { UpdateEarnedProvider } from '@root/features/global/providers';
import { MobileNavigation } from './components/MobileNavigation';

// Enabling the debug mode flag is useful during implementation,
// but it's recommended you remove it for production

export const App = () => (
  <ToastProvider
    autoDismiss
    autoDismissTimeout={10000}
    placement="bottom-right"
  >
    <UpdateEarnedProvider>
      <Provider store={store}>
        <Fragment>
          <AppRouter />
          <GlobalStyle />
          <MobileNavigation />
        </Fragment>
      </Provider>
    </UpdateEarnedProvider>
  </ToastProvider>
);
