import React, { useEffect, useState } from 'react'
import useDebounce from './Hooks/useDebounce'

function SearchUser() {

    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce(query, 600);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!debouncedQuery) {
            setUsers([]);
            return;
        }

        const fetchUsers = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://api.github.com/search/users?q=${debouncedQuery}`);
                if (!response.ok) throw new Error('Error fetching users');
                const data = await response.json();
                setUsers(data.items || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [debouncedQuery])

    return (
        <>
            <div>SearchUser</div>
            <div style={{ maxWidth: 400, margin: '0 auto', padding: 20 }}>
                <input
                    type="text"
                    placeholder="Search GitHub users"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    style={{ width: '100%', padding: 8, fontSize: 16 }}
                />

                {loading && <p>Loading...</p>}
                {error && <p style={{ color: 'red' }}>Error: {error}</p>}

                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                                <img src={user.avatar_url} alt={user.login} width={30} style={{ marginRight: 8 }} />
                                {user.login}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default SearchUser