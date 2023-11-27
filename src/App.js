import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MainApp from "./components/MainApp";
import { RouterProvider } from "react-router-dom";
import route from "./routes";
import { Suspense } from "react";
function App() {
  return (
    <div className="App container">
      <Suspense fallback={<span>loading</span>}>
        <RouterProvider router={route} />
      </Suspense>
    </div>
  );
}

export default App;
