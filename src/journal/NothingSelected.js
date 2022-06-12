import React from 'react'

export const NothingSelected = () => {
  return (
    <div className='nothing__main-content '>
        <p className='animate__animated animate__headShake'>
            Select something<br />
            Create a new Entry!
        </p>
        <i className='fa fa-star fa-4x mt-5'></i>
    </div>
  )
}
