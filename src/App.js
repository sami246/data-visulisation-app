import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Students from "./pages/Students";
import AssessmentData from "./pages/AssessmentData";
import AssessmentScore from "./pages/AssessmentScore";
import LearningData from "./pages/LearningData";
import LibraryData from "./pages/LibraryData";
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
              <Route path="/" element={<AssessmentData />} />
              <Route path="students" element={<Students />} />
              <Route path="assessment_data" element={<AssessmentData />} />

              <Route
                path=":student/assessment_score"
                element={<AssessmentScore />}
              />
              <Route path=":student/learning_data" element={<LearningData />} />
              <Route path=":student/library_data" element={<LibraryData />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
