// app/components/SearchInput.jsx
'use client'; // This component needs to be a Client Component to handle user input

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce'; // Install 'use-debounce'

export default function SearchInput() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(window.location.search);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    router.replace(`?${params.toString()}`);
  }, 300);

  const handleChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    handleSearch(term);
  };

  return (
    <input
      type="search"
      placeholder="Search..."
      value={searchTerm}
      onChange={handleChange}
    />
  );
}

// app/page.jsx (or any page where you want search results)
import SearchInput from './components/SearchInput';

export default async function HomePage({ searchParams }) {
  const query = searchParams?.query || '';

  // Fetch data based on 'query' on the server
  const data = await fetchData(query); // Replace with your actual data fetching logic

  return (
    <div>
      <SearchInput />
      {/* Display search results based on 'data' */}
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}