import React, { Dimensions } from "react";
import { Link } from "react-router-dom";
import { allStudentData } from "../data/allStudentData";

function Students() {
  console.log(Dimensions);
  return (
    <div>
      <h1>Students</h1>
      {allStudentData.map((item, index) => (
        <div key={`${item.first_name} ${item.last_name} EachStudent`}>
          <h2 className="studentName">
            {item.first_name} {item.last_name}
          </h2>
          <div>
            <Link
              to={
                "/" +
                item.first_name +
                "_" +
                item.last_name +
                "/assessment_score"
              }
            >
              Their Assessment Score
            </Link>
          </div>
          <div>
            <Link
              to={
                "/" + item.first_name + "_" + item.last_name + "/learning_data"
              }
            >
              Their Learning Data
            </Link>
          </div>
          <div>
            <Link
              to={
                "/" + item.first_name + "_" + item.last_name + "/library_data"
              }
            >
              Their Library Data
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Students;
