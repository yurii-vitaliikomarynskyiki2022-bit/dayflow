import { useState } from 'react'

export default function TaskList() {
  const [tasks, setTasks] = useState(
    () => JSON.parse(localStorage.getItem('dayflow_tasks') || '[]')
  )
  const [input, setInput]   = useState('')
  const [filter, setFilter] = useState('all')

  const save = (t) => {
    setTasks(t)
    localStorage.setItem('dayflow_tasks', JSON.stringify(t))
  }

  const addTask = () => {
    if (!input.trim()) return
    const newTasks = [{
      id: Date.now(),
      text: input.trim(),
      done: false,
      time: new Date().toLocaleTimeString('uk', { hour: '2-digit', minute: '2-digit' })
    }, ...tasks]
    save(newTasks)
    setInput('')
  }

  const toggleTask = (id) => save(tasks.map(t => t.id === id ? {...t, done: !t.done} : t))
  const deleteTask = (id) => save(tasks.filter(t => t.id !== id))
  const clearDone  = ()   => save(tasks.filter(t => !t.done))

  const filtered = tasks.filter(t =>
    filter === 'all' ? true : filter === 'done' ? t.done : !t.done
  )
  const doneCount = tasks.filter(t => t.done).length

  return (
    <>
      <div className="tasks-header">
        <span className="tasks-title">Завдання</span>
        <span className="tasks-count">{doneCount}/{tasks.length} виконано</span>
      </div>

      <div className="input-row">
        <input
          className="task-input"
          placeholder="Додати нове завдання..."
          maxLength={120}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTask()}
        />
        <button className="add-btn" onClick={addTask}>+</button>
      </div>

      <div className="filters">
        {['all','active','done'].map(f => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'Всі' : f === 'active' ? 'Активні' : 'Виконані'}
          </button>
        ))}
      </div>

      <div className="task-list">
        {filtered.length === 0 ? (
          <div className="empty">
            <div className="empty-icon">✅</div>
            {filter === 'done' ? 'Немає виконаних завдань' : 'Додай перше завдання!'}
          </div>
        ) : filtered.map(t => (
          <div key={t.id} className={`task-item ${t.done ? 'done' : ''}`}>
            <div className="task-check" onClick={() => toggleTask(t.id)} />
            <span className="task-text">{t.text}</span>
            <span className="task-time">{t.time}</span>
            <button className="task-del" onClick={() => deleteTask(t.id)}>✕</button>
          </div>
        ))}
      </div>

      <button className="clear-btn" onClick={clearDone}>
        Очистити виконані
      </button>
    </>
  )
}