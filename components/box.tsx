import { Doc } from '@/convex/_generated/dataModel'
import React from 'react'

export default function Box(props: { goal: Doc<"goals">}) {
  return (
    <div className='my-4 py-4 mx-4 border border-[#05201D] dark:border-[#57E1C0] rounded' >
      <p className='text-center'>{props.goal.title}</p>
    </div>
  )
}




