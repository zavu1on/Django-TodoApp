import { useState, useCallback } from 'react'


export const useHttp = () => {
  const [loading, setLoading] = useState(false)

  const request = useCallback(async (url, method='get', body=null, headers={}) => {
    setLoading(true)

    if (body) {
      body = JSON.stringify(body)
      headers['Content-Type'] = 'application/json'
    }

    const resp = body ? await fetch(url, {method, body, headers}) : await fetch(url, {method, headers})

    if (resp.status === 204) {
      setLoading(false)
      return {success: !!resp.ok}
    }
    const data = await resp.json()

    data['success'] = !!resp.ok
    setLoading(false)

    return data
  }, [])

  return {loading, request}
}