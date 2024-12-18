import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { HotelPage } from "./pages/HotelPage";
import { CityPage } from "./pages/CityPage";
import { CountryPage } from "./pages/CountryPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/hotels/:id",
      element: <HotelPage />,
    },
    {
      path: "/cities/:id",
      element: <CityPage />,
    },
    {
      path: "/countries/:id",
      element: <CountryPage />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
