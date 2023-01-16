import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Students from "./pages/Students";
import AssessmentData from "./pages/AssessmentData";
import AssessmentScore from "./pages/AssessmentScore";
import LearningData from "./pages/LearningData";
import LibraryData from "./pages/LibraryData";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="NavBar">
          <ul className="Nav">
            <li>
              <Link className="NavLink" to={"assessment_data"}>
                Assessment Data
              </Link>
            </li>
            <li>
              <Link className="NavLink" to={"students"}>
                Students
              </Link>
            </li>
          </ul>
        </div>
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
  );
}

export default App;
