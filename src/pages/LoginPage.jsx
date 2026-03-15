import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'

const LoginPage = () => {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        try {
            await login(form)
            navigate('/dashboard')
        } catch (err) {
            setError(err.message)
        }
        setLoading(false)
    }

    return (
        <>
            <div className='min-h-screen bg-muted/40 flex items-center justify-center p-4'>
                <div className='w-full max-w-sm'>

                    {/* Logo */}
                    <div className='text-center mb-6'>
                        <div className='inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 mb-3'>
                            <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
                                <path d='M4 6h12M4 10h8M4 14h10' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round'/>
                            </svg>
                        </div>
                        <h1 className='text-lg font-medium'>Book Club</h1>
                        <p className='text-sm text-muted-foreground mt-1'>Sign in to your account</p>
                    </div>

                    <Card>
                        <CardContent className='pt-6'>
                            <form onSubmit={handleSubmit} className='space-y-4'>
                                <div className='space-y-1.5'>
                                    <Label htmlFor='email'>Email</Label>
                                    <Input
                                        id='email'
                                        name='email'
                                        type='email'
                                        placeholder='email@example.com'
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className='space-y-1.5'>
                                    <Label htmlFor='password'>Password</Label>
                                    <Input
                                        id='password'
                                        name='password'
                                        type='password'
                                        placeholder='••••••••'
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {error && (
                                    <p className='text-sm text-destructive'>{error}</p>
                                )}

                                <Button type='submit' className='w-full' disabled={loading}>
                                    {loading ? 'Signing in...' : 'Sign in'}
                                </Button>

                                <p className='text-center text-sm text-muted-foreground'>
                                    Don&apos;t have an account?{' '}
                                    <Link to='/register' className='text-primary hover:underline'>
                                        Sign up
                                    </Link>
                                </p>
                            </form>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </>
    )
}

export default LoginPage