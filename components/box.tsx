import { Doc } from '@/convex/_generated/dataModel'
import React from 'react'

export default function Box(props: { goal: Doc<"goals">}) {
  return (
    <div className='my-4 py-4 mx-4 h-full w-auto border border-indigo-300' >
      <p>{props.goal.title}</p>
    </div>
  )
}




