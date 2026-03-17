import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'

const CreateBookClubModal = ({ onSubmit, onClose }) => {
  const [form, setForm]       = useState({ name: '', description: '' })
  const [error, setError]     = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await onSubmit(form)
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    // Backdrop
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'
      onClick={onClose}
    >
      {/* Modal — stop click from bubbling to backdrop */}
      <div onClick={(e) => e.stopPropagation()} className='w-full max-w-md px-4'>
        <Card>
          <CardContent className='pt-6 space-y-4'>

            <div>
              <h2 className='text-base font-medium'>Create a book club</h2>
              <p className='text-sm text-muted-foreground mt-1'>
                You'll become the admin automatically.
              </p>
            </div>

            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='space-y-1.5'>
                <Label htmlFor='name'>Name</Label>
                <Input
                  id='name'
                  name='name'
                  placeholder='Sci-Fi Readers'
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='space-y-1.5'>
                <Label htmlFor='description'>Description</Label>
                <Input
                  id='description'
                  name='description'
                  placeholder='A short description of your club'
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

              {error && (
                <p className='text-sm text-destructive'>{error}</p>
              )}

              <div className='flex gap-2 justify-end'>
                <Button type='button' variant='outline' onClick={onClose}>
                  Cancel
                </Button>
                <Button type='submit' disabled={loading}>
                  {loading ? 'Creating...' : 'Create club'}
                </Button>
              </div>
            </form>

          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CreateBookClubModal