import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UploadLineUpForm from './components/UploadLineUpForm'
import UploadPlaybookForm from './components/UploadPlayBookForm'

function App() {
  return (
    <>
      <UploadPlaybookForm/>
      <br></br>
      -------------------
      <UploadLineUpForm/>
    </>
  )
}

export default App
