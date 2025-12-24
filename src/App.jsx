import { createBrowserRouter, RouterProvider } from "react-router";
import routes from "./configs/routes";
import { Provider as ReduxProvider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "@/components/ui/sonner";
import paths from "./configs/paths";
import PageStackRouter from "./contexts/PageStack/components/PageStackRouter";

const router = createBrowserRouter([
  {
    path: "*",
    element: (
      <div className="h-svh w-svw">
        <PageStackRouter routes={routes} neverUnmount={[paths.home, paths.following]} />
      </div>
    ),
  },
]);

const App = () => {
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
        <Toaster richColors position="bottom-center" />
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
