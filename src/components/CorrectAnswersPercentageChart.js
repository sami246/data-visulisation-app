import React, {useContext} from 'react'
import Chart from "chart.js/auto";
import { DataContext } from '../context/DataContext';


function CorrectAnswersPercentageChart({student, allStudentData}) {

    const {isChild, color, lightColor} = useContext(DataContext);

    (async function () {
    const labels = [];
    const colorsArray = []

    var books = [];
    var readCount = {};
    var feedbackValue = {};
    var sections = [];
    var timeTaken = {};
    var correctAnswers = {};
    var totalAnswers = {};

    allStudentData.forEach((element) => {
        var isFocusedStudent = element.first_name + "_" + element.last_name === student
        if(isFocusedStudent){        
                var sectionData = element.assessment_submission
                                
                for (var section in sectionData.sections) {
                    sections.push(section);
                    timeTaken[section] = 0;
                    correctAnswers[section] = 0;
                    totalAnswers[section] = 0;
                    for (var task in sectionData.sections[section]) {
                        if(sectionData?.sections[section][task]["default"]){
                            try{
                                timeTaken[section] += sectionData?.sections[section][task]["default"]["time_taken"];
                                if (sectionData.sections[section][task]["default"]["answered"]) {
                                    totalAnswers[section]++;
                                    if (sectionData.sections[section][task]["default"]["correct"]) {
                                        correctAnswers[section]++;
                                    }
                                }
                            }
                            catch(e){
                                console.log("Error at -> ", task, section, element)
                            }
                        }
                    }
                }
        }


    }); //END OF FOR EACH

    
    var stackedBarCtx = document.getElementById("correctChart").getContext("2d");
    var stackedBarChart = new Chart(stackedBarCtx, {
        type: "bar",
        data: {
            labels: sections,
            datasets: [{
                label: "Correct (%)",
                data: Object.keys(totalAnswers).map(function (section) {
                    return (correctAnswers[section] / totalAnswers[section] * 100);
                }),
                backgroundColor: color,
                borderColor: lightColor,
                borderWidth: 1
            },]
        },
        options: {
            scales: {
                y: [{
                    stacked: true,
                    beginAtZero: true,
                    max: 100
                }]
            }
        }
    });
})();

  return (
    <div>
        <div className="graphBox">
            <canvas
            id="correctChart"
            ></canvas>
        </div>

    </div>
  )
}

export default CorrectAnswersPercentageChart