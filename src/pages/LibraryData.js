import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { allStudentData } from "../data/allStudentData";
// import { AllAssessmentScores } from "../assets/interview_assets/AllAssessmentScores";
import '../pages/Pages.css'
import BarChartHorziontal from "../components/BarChartHorziontal";
import RadarChart from "../components/RadarChart";
import { DataContext } from '../context/DataContext';

function LibraryData() {
  const { student } = useParams();
  const {isChild, lightColor, color} = useContext(DataContext);
  
  const [name, setName] = useState(null);
  const [studentInfo, setStudentInfo] = useState(null);

  var bookTitles = [];
  var readCounts = [];
  var feedbackValues = [];
  var feedbackTimestamps = [];

  useEffect(() => {
    allStudentData.forEach((element) => {
      // Find student looking at
      if (element.first_name + "_" + element.last_name === student) {
        setStudentInfo(element);
        setName(element.first_name + " " + element.last_name);
        for (var key1 in element.library_data) {
          if(key1 === "book_session"){
              console.log("sssss", key1)
              for (var key2 in element.library_data[key1]){
                console.log({key2})
                
              }
              readCounts.push(element.library_data[key1].read_count);
              feedbackValues.push(element.library_data[key1].last_feedback_value);
              feedbackTimestamps.push(element.library_data[key1].last_started_timestamp);
          }

      }
      }
      console.log(readCounts)
    });



  }, []);
  

  return (
    <div>
      <h1 className="studentName">{name} - Library Data</h1>
      <h2>{isChild ? "Child View" : "Gaurdian/Teacher View"}</h2>
      <div className="boxContainer">

        <div className="box">
          <h3 className="boxTitle">
            {name}
            <br></br>
            Total Score: {studentInfo?.assessment_scores.total.score} /{" "}
            {studentInfo?.assessment_scores.total.max_possible_score}
          </h3>
          
          
        </div>

        <div className="box">
          <h4 className="boxTitle">
            Percentage Score Achieved in Each Assessment:
          </h4>
          
        </div>
      </div>
    </div>
  );
}

export default LibraryData;

