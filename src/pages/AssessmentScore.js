import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { allStudentData } from "../data/allStudentData";
// import { AllAssessmentScores } from "../assets/interview_assets/AllAssessmentScores";
import '../pages/Pages.css'
import BarChartHorziontal from "../components/BarChartHorziontal";
import RadarChart from "../components/RadarChart";
import { DataContext } from '../context/DataContext';

function AssessmentScore() {
  const { student } = useParams();
  const {isChild, color,lightColor} = useContext(DataContext);
  
  const [name, setName] = useState(null);
  const [studentInfo, setStudentInfo] = useState(null);



  // const [learningDataJson, setLearningDataJson] = useState(null);
  // const [assessmentScoreJson, setAssessmentScoreJson] = useState(null);
  // const [assessmentSubmission, setAssessmentSubmission] = useState(null);

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
      <h2>{isChild ? "Child View" : "Gaurdian/Teacher View"}</h2>
      <div className="boxContainer">

        <div className="box">
          <h3 className="boxTitle">
            {name}
            <br></br>
            Total Score: {studentInfo?.assessment_scores.total.score} /{" "}
            {studentInfo?.assessment_scores.total.max_possible_score}
          </h3>
          
          <BarChartHorziontal student={student} allStudentData={allStudentData}/>
        </div>

        <div className="box">
          <h4 className="boxTitle">
            Percentage Score Achieved in Each Assessment:
          </h4>
          <RadarChart student={student} allStudentData={allStudentData}/>
        </div>
      </div>
    </div>
  );
}

export default AssessmentScore;

