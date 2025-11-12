import React from 'react'

import useDataFetching from './Hooks/useDataFetching'; // assuming hook is in this path

function UserList() {

  const { data, loading, error } = useDataFetching('https://jsonplaceholder.typicode.com/users');

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users: {error.message}</p>;

  return (
    <div>
      <ul>
        {data && data.map(user => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  )
}

export default UserList