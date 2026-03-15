// src/context/AuthContext.jsx

import { useState } from 'react'
import authService from '@/services/authService'
import { AuthContext } from '@/context/AuthContext'

const getInitialUser = () => {
    const token = localStorage.getItem('token')
    const saved = localStorage.getItem('user')
    return token && saved ? JSON.parse(saved) : null
}

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => getInitialUser())

    const saveSession = (data) => {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        setCurrentUser(data.user)
    }

    const login = async (credentials) => {
        const data = await authService.login(credentials)
        saveSession(data)
    }

    const register = async (credentials) => {
        const data = await authService.register(credentials)
        saveSession(data)
    }

    const logout = async () => {
        await authService.logout()
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setCurrentUser(null)
    }

    return (
        <AuthContext.Provider
        value={{
            currentUser,
            login,
            register,
            logout,
            isAuthenticated: !!currentUser,
        }}
        >
        {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
