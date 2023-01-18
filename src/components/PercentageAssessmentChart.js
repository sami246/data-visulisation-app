import React, {useContext} from 'react'
import Chart from "chart.js/auto";
import { DataContext } from '../context/DataContext';
// import randomColor from "randomcolor";

function PercentageAssessmentChart({student, allStudentData}) {
    const {isChild, color, lightColor} = useContext(DataContext);

    (async function () {
    
    const labels_radar = [];
    const datasets = []

    allStudentData.forEach((element1) => {
        if (element1.first_name + "_" + element1.last_name === student || !isChild) {
            const temp = element1.assessment_scores
            const tempdata = []
            for (var key in temp) {
                
                if(key !== "total"){
                    // Only want to get labels once
                    if(element1.first_name + "_" + element1.last_name === student){
                        labels_radar.push(key)
                    }
                    for (var key2 in temp[key].default){                       
                        //Value
                        if(key2 === "score_decimal"){
                            tempdata.push(temp[key].default[key2]*100)
                        }
                    }
                    
 
                }
             
            }
            datasets.push({
                label: element1.first_name + " " + element1.last_name,
                data: tempdata,
                fill: true,
                backgroundColor: element1.first_name + "_" + element1.last_name === student ? color : lightColor,
                borderColor: element1.first_name + "_" + element1.last_name === student ? color : lightColor,
                pointBackgroundColor: element1.first_name + "_" + element1.last_name === student ? color : lightColor,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'black',
            })
        }


    });

    const radar_data = {
        labels: labels_radar,
        datasets: datasets
    };

    const radar_config = {
        type: 'radar',
        data: radar_data,
        options: {
        elements: {
            line: {
            borderWidth: 3
            }
        }
        },
    };

    new Chart(document.getElementById("radar"), radar_config);
    })();
    

  return (
    <div>
        <canvas
        id="radar"
        ></canvas>
    </div>
  )
}

export default PercentageAssessmentChart