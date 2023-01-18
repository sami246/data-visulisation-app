import React, {useContext} from 'react'
import Chart from "chart.js/auto";
import { DataContext } from '../context/DataContext';


function TotalScoreChart({student, allStudentData}) {

    const {isChild, color, lightColor} = useContext(DataContext);

    (async function () {
    const labels_bar = [];
    const backgroundColor_bar = [];
    const data_bar = [];

    allStudentData.forEach((element) => {
        // For BAR CHART
        if(isChild){
            if (element.first_name + "_" + element.last_name === student) {
                backgroundColor_bar.push(color);
                labels_bar.push(element.first_name + " " + element.last_name);
                data_bar.push(element.assessment_scores.total.score);
                }
        }
        else{
            labels_bar.push(element.first_name + " " + element.last_name);
            data_bar.push(element.assessment_scores.total.score);
            // Find student looking at
                if (element.first_name + "_" + element.last_name === student) {
                backgroundColor_bar.push(color);
                } else {
                backgroundColor_bar.push(lightColor);
                }
        }


    });


    const bar_data = {
        labels: labels_bar,
        datasets: [
        {
            axis: "y",
            label: "Scores from the Assessment",
            data: data_bar,
            fill: false,
            backgroundColor: backgroundColor_bar,
            borderWidth: 1,
        },
        ],
    };

    const bar_config = {
        type: "bar",
        data: bar_data,
        options: {
        indexAxis: "y",
        },
    };

    new Chart(document.getElementById("bar"), bar_config);
    })();


  return (
    <div className="graphBox">
        <canvas
        id="bar"
        ></canvas>
    </div>
  )
}

export default TotalScoreChart