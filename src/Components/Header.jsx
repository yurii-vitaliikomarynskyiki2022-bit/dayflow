import { useState } from 'react'

export default function Header({ username, onSaveName }) {
  const [input, setInput] = useState('')

  const now = new Date()
  const h = now.getHours()
  let greet
  if      (h >= 5  && h < 12) greet = 'Доброго ранку'
  else if (h >= 12 && h < 17) greet = 'Гарного дня'
  else if (h >= 17 && h < 22) greet = 'Доброго вечора'
  else                          greet = 'Доброї ночі 🌙'

  const days   = ['неділя','понеділок','вівторок','середа','четвер','п\'ятниця','субота']
  const months = ['січня','лютого','березня','квітня','травня','червня',
                  'липня','серпня','вересня','жовтня','листопада','грудня']
  const dateLine = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`

  const handleSave = () => {
    if (input.trim()) onSaveName(input.trim())
  }

  return (
    <header>
      <div className="greeting">
        {greet}{username ? `, ${username}` : ''} 👋
      </div>
      <div className="date-line">{dateLine}</div>

      {!username && (
        <div className="username-row">
          <input
            className="username-input"
            placeholder="Введіть ваше ім'я..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSave()}
          />
          <button className="username-btn" onClick={handleSave}>
            Зберегти
          </button>
        </div>
      )}
    </header>
  )
}