import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { allStudentData } from "../data/allStudentData";
import { DataContext } from '../context/DataContext';

function Students() {
  const {isChild, setIsChild} = useContext(DataContext);

  return (
    <div>
      <h1>Students</h1>
      <h4>View The Student's Data as either: </h4>
      {/* <button class="button" style={{"background-color" : isChild ? "#ffd51c" : '#ecd779'}} onClick={() => {setIsChild(true)}}>Is Child</button>
      <button class="button" style={{"background-color" : !isChild ? "#ff9102" : '#f7a840'}} onClick={() => {setIsChild(false)}}>Is Guardian/Teacher</button> */}
      {allStudentData.map((item, index) => (
        <div key={`${item.first_name} ${item.last_name} EachStudent`}>
          <h2 className="studentName">
            {item.first_name} {item.last_name}
          </h2>
          
          <div className="linkBoxContainer">
              {/* <button  className="linkBox"> */}
              
                <Link
                  to={
                    "/" +
                    item.first_name +
                    "_" +
                    item.last_name +
                    "/data"
                  }
                  onClick={() => {setIsChild(true)}}
                >
                    <button className="linkBox" style={{"backgroundColor" : "#ffd51c"}}>
                    Child
                    </button>
                </Link>
              
              
                <Link
                  to={
                    "/" +
                    item.first_name +
                    "_" +
                    item.last_name +
                    "/data"
                  }
                  onClick={() => {setIsChild(false)}}
                >
                  <button className="linkBox" style={{"backgroundColor" : "#ff9102"}}>
                  Parent/Teacher
                  </button>
                </Link>
              
          </div>
        </div>
      ))}
    </div>
  );
}

export default Students;
