import { Routes, Route, Navigate } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import DashboardPage from '@/pages/DashboardPage'
import ProtectedRoute from '@/components/shared/ProtectedRoute'
import AppLayout from '@/components/shared/AppLayout'
import BookClubDetailPage from '@/pages/BookClubDetailPage'

const App = () => {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      <Route
        path='/login'
        element={isAuthenticated ? <Navigate to='/dashboard' replace /> : <LoginPage />}
      />
      <Route
        path='/register'
        element={isAuthenticated ? <Navigate to='/dashboard' replace /> : <RegisterPage />}
      />
      <Route
        path='/dashboard'
        element={
          <ProtectedRoute>
            <AppLayout>
              <DashboardPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/book_clubs/:id'
        element={
          <ProtectedRoute>
            <AppLayout>
              <BookClubDetailPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/book_clubs/:id'
        element={
          <ProtectedRoute>
            <AppLayout>
              <BookClubDetailPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route path='*' element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />} />
    </Routes>
  )
}

export default App