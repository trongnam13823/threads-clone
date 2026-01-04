import { createBrowserRouter, RouterProvider } from 'react-router';
import routes from './configs/routes';
import { Provider as ReduxProvider } from 'react-redux';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={createBrowserRouter(routes)} />
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
