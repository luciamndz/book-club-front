import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'

const AddBookModal = ({ onSubmit, onClose }) => {
  const [form, setForm]       = useState({ title: '', author: '', genre: '', synopsis: '' })
  const [cover, setCover]     = useState(null)
  const [error, setError]     = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    setCover(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Build FormData — required for file uploads
      const formData = new FormData()
      formData.append('book[title]',    form.title)
      formData.append('book[author]',   form.author)
      formData.append('book[genre]',    form.genre)
      formData.append('book[synopsis]', form.synopsis)
      if (cover) formData.append('book[cover]', cover)

      await onSubmit(formData)
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()} className='w-full max-w-lg px-4'>
        <Card>
          <CardContent className='pt-6 space-y-4'>

            <div>
              <h2 className='text-base font-medium'>Add a book</h2>
              <p className='text-sm text-muted-foreground mt-1'>
                Add a book to the club library.
              </p>
            </div>

            <form onSubmit={handleSubmit} className='space-y-4'>

              {/* Title + Author */}
              <div className='grid grid-cols-2 gap-3'>
                <div className='space-y-1.5'>
                  <Label htmlFor='title'>Title</Label>
                  <Input
                    id='title'
                    name='title'
                    placeholder='Book title'
                    value={form.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='space-y-1.5'>
                  <Label htmlFor='author'>Author</Label>
                  <Input
                    id='author'
                    name='author'
                    placeholder='Author name'
                    value={form.author}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Genre + Cover */}
              <div className='grid grid-cols-2 gap-3'>
                <div className='space-y-1.5'>
                  <Label htmlFor='genre'>Genre</Label>
                  <Input
                    id='genre'
                    name='genre'
                    placeholder='Fantasy'
                    value={form.genre}
                    onChange={handleChange}
                  />
                </div>
                <div className='space-y-1.5'>
                  <Label htmlFor='cover'>Cover image</Label>
                  <Input
                    id='cover'
                    name='cover'
                    type='file'
                    accept='image/*'
                    onChange={handleFileChange}
                    className='cursor-pointer'
                  />
                </div>
              </div>

              {/* Synopsis */}
              <div className='space-y-1.5'>
                <Label htmlFor='synopsis'>Synopsis</Label>
                <textarea
                  id='synopsis'
                  name='synopsis'
                  placeholder='A short description...'
                  value={form.synopsis}
                  onChange={handleChange}
                  rows={3}
                  className='w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-ring'
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
                  {loading ? 'Adding...' : 'Add book'}
                </Button>
              </div>

            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AddBookModal