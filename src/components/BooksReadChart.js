import React, {useContext} from 'react'
import Chart from "chart.js/auto";
import { DataContext } from '../context/DataContext';


function BooksReadChart({student, allStudentData}) {

    function formatDate(inputDate) {
        let date, month, year;
      
        date = inputDate.getDate();
        month = inputDate.getMonth() + 1;
        year = inputDate.getFullYear();
      
          date = date
              .toString()
              .padStart(2, '0');
      
          month = month
              .toString()
              .padStart(2, '0');
      
        return `${date}/${month}/${year}`;
      }

    const {isChild, color, lightColor} = useContext(DataContext);

    (async function () {
    const labels = [];
    const readCounts = []
    const colorsArray = []
    const feedbackValuesArray = []
    const feedbackTimeArray = []
    const numTimeReadPerDate = []


    allStudentData.forEach((element) => {
        var bookData = element.library_data
        var studentName = element.first_name + " " + element.last_name 
        var isFocusedStudent = element.first_name + "_" + element.last_name === student
        var feedbackValues = []
        var feedbackTimestamps = []
        
        var countOfBooksRead = 0

        if(isChild){
            if (isFocusedStudent) {
                colorsArray.push(color);
                labels.push(studentName)
            }
        }
        else{
            labels.push(studentName)
            if (isFocusedStudent) {
                colorsArray.push(color);
            } else {
                 colorsArray.push(lightColor);
            }   
        }

        for (var book in bookData.book_session) {
            countOfBooksRead += 1
            feedbackValues.push(bookData.book_session[book].last_feedback_value);
            let timestamp = formatDate(new Date(bookData.book_session[book].last_started_timestamp))
            feedbackTimestamps.push(timestamp);
        }
        readCounts.push(countOfBooksRead)
        feedbackValuesArray.push(feedbackValues) 
        feedbackTimeArray.push(feedbackTimestamps) 


    });

    let dataset = [{
            label: "How Many Books Read",
            data: readCounts,
            backgroundColor: colorsArray,
            borderColor: colorsArray,
            borderWidth: 1
    }]

    
    var barCtx = document.getElementById('barChart').getContext('2d');
    var barChart = new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: dataset
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    // var lineCtx = document.getElementById('lineChart');
    // var lineChart = new Chart(lineCtx, {
    //     type: 'line',
    //     data: {
    //         labels: feedbackTimeArray,
    //         datasets: [{
    //             label: 'Last Started Times',
    //             data: feedbackValuesArray,
    //             backgroundColor: 'rgba(255, 99, 132, 0.2)',
    //             borderColor: 'rgba(255, 99, 132, 1)',
    //             borderWidth: 1
    //         }]
    //     },
    //     options: {
    //         scales: {
    //             y: {
    //                 beginAtZero: true,
    //             }
    //         }
    //     }
    // });
    })();


  return (
    <div>
        <div className="graphBox">
            <canvas
            id="barChart"
            ></canvas>
        </div>
        {/* <div className="graphBox">
            <canvas
            id="lineChart"
            ></canvas>
        </div> */}
    </div>
  )
}

export default BooksReadChart