import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

function initialTheme() {
  if (typeof window === 'undefined') return 'light'
  return window.localStorage.getItem('research-theme') || 'light'
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(initialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('research-theme', theme)
  }, [theme])

  const next = theme === 'light' ? 'dark' : 'light'
  return (
    <button className="theme-toggle" type="button" onClick={() => setTheme(next)} aria-label={'Switch to ' + next + ' mode'}>
      {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
      <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
    </button>
  )
}
