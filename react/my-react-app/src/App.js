import * as React from "react";
import { useRoutes } from "react-router-dom";

import Home from "./Home";
// import Id from "./Id";

function App() {
  const element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
  ]);

  return element;
}

export default App;
