import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { allStudentData } from "../data/allStudentData";
import Chart from "chart.js/auto";
// import { AllAssessmentScores } from "../assets/interview_assets/AllAssessmentScores";

function AssessmentScore() {
  const { student } = useParams();
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

  (async function () {
    const labels = [];
    const backgroundColor = [];
    const data1 = [];

    allStudentData.forEach((element) => {
      labels.push(element.first_name + " " + element.last_name);
      data1.push(element.assessment_scores.total.score);
      // Find student looking at
      if (element.first_name + "_" + element.last_name === student) {
        backgroundColor.push("rgba(137, 196, 284, 1)");
      } else {
        backgroundColor.push("rgba(137, 196, 244, 0.3)");
      }
    });

    console.log({ labels });
    const scores_data = {
      labels: labels,
      datasets: [
        {
          axis: "y",
          label: "Scores from the Assessment",
          data: data1,
          fill: false,
          backgroundColor: backgroundColor,
          borderWidth: 1,
        },
      ],
    };

    const scores_config = {
      type: "bar",
      data: scores_data,
      options: {
        indexAxis: "y",
      },
    };

    new Chart(document.getElementById("scores"), scores_config);
  })();

  return (
    <div>
      <h1 className="studentName">{name} - Assessment Score</h1>
      <div>

        <div className="boxContainer">
          <h3>
            Total Score: {studentInfo?.assessment_scores.total.score} /{" "}
            {studentInfo?.assessment_scores.total.max_possible_score}
          </h3>
          <div>
            <canvas
              width="1250vw"
              height="600"
              className="center-canvas"
              id="scores"
            ></canvas>
          </div>
        </div>

        <div className="boxContainer">
          <h3>
            Total Score: {studentInfo?.assessment_scores.total.score} /{" "}
            {studentInfo?.assessment_scores.total.max_possible_score}
          </h3>
          <div>
            <canvas
              width="1250vw"
              height="600"
              className="center-canvas"
              id="scores"
            ></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssessmentScore;
