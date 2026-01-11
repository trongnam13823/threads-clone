import { createBrowserRouter, RouterProvider } from 'react-router';
import routes from './configs/routes';
import { Provider as ReduxProvider } from 'react-redux';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from './components/theme/ThemeProvider';

const App = () => {
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider>
          <RouterProvider router={createBrowserRouter(routes)} />
        </ThemeProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
