import { useState, useEffect } from 'react'
import Header from './components/Header'
import Weather from './components/Weather'
import TaskList from './components/TaskList'
import './index.css'

export default function App() {
  const [username, setUsername] = useState(
    () => localStorage.getItem('dayflow_username') || ''
  )

  const saveUsername = (name) => {
    setUsername(name)
    localStorage.setItem('dayflow_username', name)
  }

  return (
    <div className="container">
      <Header username={username} onSaveName={saveUsername} />
      <Weather />
      <TaskList />
    </div>
  )
}