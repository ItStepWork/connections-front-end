'use client'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const MyProgressBar = () => {
  return(
    <>
    <ProgressBar
          height="4px"
          color="#0f6fec"
          options={{ showSpinner: false }}
          shallowRouting />  
    </>
  )
}

export default MyProgressBar;