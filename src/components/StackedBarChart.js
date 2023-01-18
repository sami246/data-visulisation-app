import React, {useContext} from 'react'
import Chart from "chart.js/auto";
import { DataContext } from '../context/DataContext';


function StackedBarChart({student, allStudentData}) {

    const {isChild, color, lightColor} = useContext(DataContext);

    (async function () {
    var books = [];
    var readCount = {};
    var feedbackValue = {};

    allStudentData.forEach((element) => {
        var isFocusedStudent = element.first_name + "_" + element.last_name === student
        if(isFocusedStudent){        
                var bookData = element.library_data
                
                for (var book in bookData.book_session) {
                    books.push(book);
                    readCount[book] = bookData.book_session[book]["read_count"];
                    feedbackValue[book] = bookData.book_session[book]["last_feedback_value"];
                }
            
        }
    }); //END OF FOR EACH

    var stackedBarCtx = document.getElementById("stackedBarChart").getContext("2d");
    var stackedBarChart = new Chart(stackedBarCtx, {
        type: "bar",
        data: {
            labels: books,
            datasets: [{
                label: "Read Count",
                data: Object.values(readCount),
                backgroundColor: color,
                borderColor: color,
                borderWidth: 1
            }, {
                label: "Feedback Value",
                data: Object.values(feedbackValue),
                backgroundColor: lightColor,
                borderColor: lightColor,
                borderWidth: 1
            }]
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
            id="stackedBarChart"
            ></canvas>
        </div>

    </div>
  )
}

export default StackedBarChart