import React, { useEffect, useState } from 'react'

function SearchWithoutDebounce() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch data on every keystroke
  useEffect(() => {
    if (search.trim() === '') {
      setResults([]);
      return;
    }
    fetchData();
  }, [search]); // Triggers on every keystroke

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      const filtered = data.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase())
      );
      setResults(filtered);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>🔍 Instant Search (No Debounce)</h2>
      <input
        type="text"
        placeholder="Search users by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: '8px', width: '300px' }}
      />

      {loading && <p>Loading...</p>}

      <ul>
        {results.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
        {search && !loading && results.length === 0 && (
          <li>No users found.</li>
        )}
      </ul>
    </div>
  )
}

export default SearchWithoutDebounce    