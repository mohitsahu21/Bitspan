import React from 'react'

const TrainingVideo = () => {
  return (
    
    <div className='container-fluid my-5 py-5 d-flex justify-content-center align-items-center flex-column '>
        <div className='row'>
            <div className='col-12 '>
        <div className='d-flex justify-content-center mb-3' >
            <h1>Training Video</h1>
        </div>
        <div>
        <iframe   className='video' src="https://www.youtube.com/embed/noqlNjPLMgc?si=A-5Rlx2S9jxe59Ph" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
        </div>
        </div>
    </div>
  )
}

export default TrainingVideo