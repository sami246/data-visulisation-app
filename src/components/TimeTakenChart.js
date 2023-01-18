import React, {useContext} from 'react'
import Chart from "chart.js/auto";
import { DataContext } from '../context/DataContext';
// import randomColor from "randomcolor";

function TimeTakenChart({student, allStudentData}) {
    const {isChild, color, lightColor} = useContext(DataContext);

    (async function () {
    
    const labels_radar = [];
    const datasets = []
    
    var sections = [];
    var timeTaken = {};
    var correctAnswers = {};
    var totalAnswers = {};

    allStudentData.forEach((element) => {
        var isFocusedStudent = element.first_name + "_" + element.last_name === student
        if(isFocusedStudent){
        var data = element.assessment_submission
            for (var section in data.sections) {
                sections.push(section);
                timeTaken[section] = 0;
                correctAnswers[section] = 0;
                totalAnswers[section] = 0;
                for (var task in data.sections[section]) {
                    if(data?.sections[section][task]["default"]){
                        try{
                            timeTaken[section] += data?.sections[section][task]["default"]["time_taken"];
                            if (data.sections[section][task]["default"]["answered"]) {
                                totalAnswers[section]++;
                                if (data.sections[section][task]["default"]["correct"]) {
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
    });

    console.log("ddddddd", timeTaken)
    var barCtx = document.getElementById("timetaken").getContext("2d");
    var barChart = new Chart(barCtx, {
        type: "bar",
        data: {
            labels: sections,
            datasets: [{
                label: "Time Taken (ms)",
                data: Object.values(timeTaken),
                backgroundColor: color,
                borderColor: lightColor,
                borderWidth: 1
            },]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // var pieCtx = document.getElementById("correctanswers").getContext("2d");
    // var pieChart = new Chart(pieCtx, {
    //     type: "pie",
    //     data: {
    //         labels: sections,
    //         datasets: [{
    //             label: "Correct (%)",
    //             data: Object.keys(totalAnswers).map(function (section) {
    //                 return (correctAnswers[section] / totalAnswers[section]) * 100;
    //             }),
    //             backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"]
    //         }]
    //     }
    // });

    })();
    

  return (
    // <div>
    //     <div>
    //         <canvas
    //         id="timetaken"
    //         ></canvas>
    //     </div>
    //         <div>
    //         <canvas
    //         id="correctanswers"
    //         ></canvas>
    //     </div>
    // </div>
        <div>
            <canvas
            id="timetaken"
            ></canvas>
        </div>
  )
}

export default TimeTakenChart