import { createBrowserRouter, RouterProvider } from "react-router";
import routes from "./configs/routes";
import { Provider as ReduxProvider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "@/components/ui/sonner";

const App = () => {
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={createBrowserRouter(routes)} />
        <Toaster richColors position="bottom-center" />
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
