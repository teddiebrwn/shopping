// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import adminRoutes from "./routes/routes";

function App() {
  return (
    <Router>
      <Routes>
        {adminRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
