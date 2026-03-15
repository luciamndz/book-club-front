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
      throw new Error(data.error || data.errors?.join(', ') || 'Something went wrong')
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