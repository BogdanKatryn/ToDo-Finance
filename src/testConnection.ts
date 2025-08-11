import { supabase } from './supabaseClient'

export async function testConnection() {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .limit(1)

  if (error) {
    console.error('Ошибка подключения:', error.message)
  } else {
    console.log('Подключение успешно! Данные:', data)
  }
}
