import React from 'react'
import useAuthUser from '../hooks/useAuthUser.js'

export default function HomePage() {
  const {authData} = useAuthUser();
  return (
    <div className='w-[800px] mx-auto h-[2000px] bg-base-200'>
    </div>
  )
}
