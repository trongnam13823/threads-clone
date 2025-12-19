import { createBrowserRouter, RouterProvider } from "react-router";
import routes from "./configs/routes";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";
import { HistoryProvider } from "./contexts/history";

const App = () => {
  return (
    <HistoryProvider>
      <ReduxProvider store={store}>
        <RouterProvider router={createBrowserRouter(routes)} />
      </ReduxProvider>
    </HistoryProvider>
  );
};

export default App;
