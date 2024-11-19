import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import SummaryPreview from './preview/SummaryPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillsPreview from './preview/SkillsPreview'

function ResumPreview() {

    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)


  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]'
    style={{
        borderColor:resumeInfo?.themeColor 
    }}>
        {/* Personel Detail  */}
            <PersonalDetailPreview resumeInfo={resumeInfo} />
        {/* Summery */}
            <SummaryPreview resumeInfo={resumeInfo} />
        {/* Professional Experience */}
            <ExperiencePreview resumeInfo={resumeInfo} />
        {/* Educational */}
            <EducationalPreview resumeInfo={resumeInfo} />
        {/* Skills */}
            <SkillsPreview resumeInfo={resumeInfo} />
    </div>
  )
}

export default ResumPreview