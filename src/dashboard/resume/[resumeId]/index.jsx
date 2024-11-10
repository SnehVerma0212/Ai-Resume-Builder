import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from './components/FormSection';
import ResumPreview from './components/ResumPreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import dummy from '@/data/dummy';

function EditResume() {
    const params=useParams();
    const [resumeInfo,setResumeInfo]=useState();
    useEffect(()=>{
        setResumeInfo(dummy);
    },[])

  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
    <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
        {/* Form Section  */}
            <FormSection/>
        {/* Preview Section  */}
            <ResumPreview/>
    </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume