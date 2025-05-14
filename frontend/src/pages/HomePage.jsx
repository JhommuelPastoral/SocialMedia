import React from 'react'
import useAuthUser from '../hooks/useAuthUser.js'
export default function HomePage() {
  const {authData} = useAuthUser();

  return (
    <div className='w-full h-[2000px]'>
      padsasd
    </div>
  )
}
