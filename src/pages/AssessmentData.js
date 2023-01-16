import React from 'react'
import assessment_data from '../assets/interview_assets/assessment_data.json'

function AssessmentData() {
  return (
    <div>
      AssessmentData
      <div>
        {assessment_data.title}
      </div>  
    </div>

  )
}

export default AssessmentData