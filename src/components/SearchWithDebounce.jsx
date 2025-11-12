import React, { useEffect, useState } from 'react'

function SearchWithDebounce() {
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);


    // Step 1: Debounce logic
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500); // wait 500ms

        return () => {
            clearTimeout(handler); // clear previous timeout
        };
    }, [search]);

    // Step 2: Fetch data when debounced value changes
    useEffect(() => {
        if (debouncedSearch.trim() === '') {
            setResults([]);
            return;
        }

        const fetchUsers = async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    `https://jsonplaceholder.typicode.com/users`
                );
                const data = await res.json();
                // Filter users by name
                const filtered = data.filter(user =>
                    user.name.toLowerCase().includes(debouncedSearch.toLowerCase())
                );
                setResults(filtered);
            } catch (err) {
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [debouncedSearch]);


    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h2>🔍 Debounced Search</h2>
            <input
                type="text"
                value={search}
                placeholder="Search users by name..."
                onChange={(e) => setSearch(e.target.value)}
                style={{ padding: '8px', width: '300px' }}
            />

            {loading && <p>Loading...</p>}

            <ul>
                {results.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
                {debouncedSearch && !loading && results.length === 0 && (
                    <li>No users found.</li>
                )}
            </ul>
        </div>
    )
}

export default SearchWithDebounce