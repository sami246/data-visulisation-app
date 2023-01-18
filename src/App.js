import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Students from "./pages/Students";
import AllChartsView from "./pages/AllChartsView";
import { DataProvider} from './context/DataContext';
import NavBar from "./components/NavBar";

function App() {
  
  return (
    <DataProvider>
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Students />} />
              <Route path="students" element={<Students />} />
              <Route
                path=":student/data"
                element={<AllChartsView />}
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
