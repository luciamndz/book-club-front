const BASE_URL = 'http://127.0.0.1:3000'

const getHeaders = () => {
    const token = localStorage.getItem('token')
    return {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
    }
}

const handleResponse = async (res) => {
    const data = await res.json()
    if (!res.ok) {
      // data.error → single string from service objects
      // data.errors → array from model validations OR string from some responses
      const message =
        data.error ||
        (Array.isArray(data.errors) ? data.errors.join(', ') : data.errors) ||
        'Something went wrong'
      throw new Error(message)
    }
    return data
  }

const apiClient = {
    get: (path) =>
        fetch(`${BASE_URL}${path}`, {
            method: 'GET',
            headers: getHeaders(),
        }).then(handleResponse),
    
    post: (path, body) =>
        fetch(`${BASE_URL}${path}`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(body),
        }).then(handleResponse),

    delete: (path) =>
        fetch(`${BASE_URL}${path}`, {
            method: 'DELETE',
            headers: getHeaders(),
        }).then(handleResponse),

    patch: (path, body) =>
        fetch(`${BASE_URL}${path}`, {
            method: 'PATCH',
            headers: getHeaders(),
            body: JSON.stringify(body),
        }).then(handleResponse),
}

export default apiClient