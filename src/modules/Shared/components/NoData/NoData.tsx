import React from 'react'
import character from '../../../../assets/empty.svg'

export default function NoData() {
  return (
   <>
   <div className='text-center'>
   <img className='w-25' src={character} alt="" />
   <h3 className='m-2 fw-medium'>No Data !</h3>
   <p className='fw-light'>No items available at the moment. Please come back later!</p>
   </div>
  </>
  )
}
