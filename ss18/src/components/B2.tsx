
import React, { useMemo } from 'react';
export default function B2() {
  const users = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 17 },
    { id: 3, name: 'Charlie', age: 30 },
    { id: 4, name: 'David', age: 16 },
    { id: 5, name: 'Eve', age: 22 },
  ];

  const adultUsers = useMemo(() => {
    console.log('Filtering adult users...');
    return users.filter(user => user.age >= 18);
  }, [users]);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {adultUsers.map(user => (
          <li key={user.id}>
            {user.name} (Age: {user.age})
          </li>
        ))}
      </ul>
    </div>
  );
}
