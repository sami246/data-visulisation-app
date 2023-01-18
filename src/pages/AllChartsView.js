import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { allStudentData } from "../data/allStudentData";
// import { AllAssessmentScores } from "../assets/interview_assets/AllAssessmentScores";
import '../pages/Pages.css'
import TotalScoreChart from "../components/TotalScoreChart";
import PercentageAssessmentChart from "../components/PercentageAssessmentChart";
import { DataContext } from '../context/DataContext';
import BooksReadChart from "../components/BooksReadChart";
import StackedBarChart from "../components/StackedBarChart";
import CorrectAnswersPercentageChart from "../components/CorrectAnswersPercentageChart";
import TimeTakenChart from "../components/TimeTakenChart";

function AllChartsView() {
  const { student } = useParams();
  const {isChild, color,lightColor} = useContext(DataContext);
  
  const [name, setName] = useState(null);
  const [studentInfo, setStudentInfo] = useState(null);


  useEffect(() => {
    allStudentData.forEach((element) => {
      // Find student looking at
      if (element.first_name + "_" + element.last_name === student) {
        setStudentInfo(element);
        setName(element.first_name + " " + element.last_name);
      }
    });
  }, []);

  return (
    <div>
      <h1 className="studentName">{name} - Assessment Score</h1>
      <h2>{isChild ? "Child View" : "Parent/Teacher View"}</h2>
      <div className="boxContainer">

        <div className="box">
          <h3 className="boxTitle">
            Total Score: {studentInfo?.assessment_scores.total.score} /{" "}
            {studentInfo?.assessment_scores.total.max_possible_score}
          </h3>
          
          <TotalScoreChart student={student} allStudentData={allStudentData}/>
        </div>

        <div className="box">
          <h4 className="boxTitle">
            Percentage Score Achieved in Each Assessment:
          </h4>
          <PercentageAssessmentChart student={student} allStudentData={allStudentData}/>
        </div>

        <div className="box">
          <h4 className="boxTitle">
            How Many Books Read:
          </h4>
          <BooksReadChart student={student} allStudentData={allStudentData}/>
        </div>

        <div className="box">
          <h4 className="boxTitle">
            Read Count per book compared with/ Feeback:
          </h4>
          <StackedBarChart student={student} allStudentData={allStudentData}/>
        </div>

        <div className="box">
          <h4 className="boxTitle">
            Correct Answers Per Assessment:
          </h4>
          <CorrectAnswersPercentageChart student={student} allStudentData={allStudentData}/>
        </div>

        <div className="box">
          <h4 className="boxTitle">
            Time Taken per Task:
          </h4>
          <TimeTakenChart student={student} allStudentData={allStudentData}/>
        </div>

      </div>
    </div>
  );
}

export default AllChartsView;

