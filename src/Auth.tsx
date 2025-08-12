import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import './components/css/Auth.css'
import type { User } from '@supabase/supabase-js'

interface AuthProps {
  onLogin: (user: User | null) => void
}

export default function Auth({ onLogin }: AuthProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function testConnection() {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .limit(1);

      if (error) {
        console.error('Ошибка подключения к Supabase:', error.message);
      } else {
        console.log('Подключение к Supabase успешно! Данные:', data);
      }
    }

    testConnection()
  }, [])

  const handleLogin = async (type: 'signIn' | 'signUp') => {
    setLoading(true)
    const { data, error } = type === 'signUp'
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password })

    if (error) alert(error.message)
    else if (data?.user) onLogin(data.user)
    else alert('Перевірте пошту!')

    setLoading(false)
  }

  const handleGitHubLogin = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'github' })
    if (error) alert(error.message)
    setLoading(false)
  }

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://bogdankatryn.github.io/ToDo-Finance/'
      }
    });

    if (error) {
      console.error('Ошибка входа через Google:', error.message);
    }}

  return (
    <div>
      <h2 className='div-form'>ToDo Finance</h2>
      <div className='div-form'>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className='input-email'/>

        <input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} className='input-password'/>

        <button onClick={() => handleLogin('signIn')} disabled={loading} className='singIn'>
          Увійти
        </button>

        <button onClick={() => handleLogin('signUp')} disabled={loading} className='singUp' >
          Реєстрація
        </button>

        <button onClick={signInWithGoogle} disabled={loading} className='singIn-google'>
        <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" />
          Увійти через Google
        </button>
         
        <button onClick={handleGitHubLogin} disabled={loading} className='singIn-github'>
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" />
          Увійти через GitHub
        </button>
      </div>
    </div>
  )
}
