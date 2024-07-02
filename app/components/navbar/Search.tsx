"use client"
import { useState } from 'react';

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search = ({ onSearch }: SearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className="border flex flex-1 rounded-full items-center px-2 ml-5 ">
      <input
        type="text"
        placeholder="Ürün ara..."
        className="px-2 py-1 flex-1"
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default Search;
