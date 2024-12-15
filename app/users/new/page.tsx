'use client'

import { useState } from 'react'

const NewUserPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')

        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email }),
            });

            if (response.ok) {
                setMessage('User created successfully!')
                setName('')
                setEmail('')
            } else {
                const errorData = await response.json()
                setMessage(`Error: ${errorData.message}`)
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.')
            console.error(error)
        } finally {
            setLoading(false)
        }
    };

    return (
        <div>
            <h1>Create New User</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Creating...' : 'Create User'}
                    </button>
                </div>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default NewUserPage
