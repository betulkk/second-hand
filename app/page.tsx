"use client"
import React, { useState } from 'react';
import Category from './components/home/Category';
import Banner from './components/home/Banner';
import Products from './components/home/Products';
import Filter from './components/general/Filter';
import Search from './components/navbar/Search'; // Import the Search component
import SortButton from './components/general/SortButton'; // Import the SortButton component
import getProducts from './actions/getProducts';


const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [sortOrder, setSortOrder] = useState<'ascending' | 'descending'>('ascending');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  const handleFilters = (newFilters: Record<string, any>) => {
    setFilters(newFilters);
  };

  const handleSort = (newSortOrder: 'ascending' | 'descending') => {
    setSortOrder(newSortOrder);
  };

  return (
    <div style={{ backgroundColor: 'white' }}>
      <Search onSearch={handleSearch} />
      <Category onSelectCategory={handleCategorySelect} />
      
      <Banner />
      <div className='flex ml-5 mr-5 gap-3'>
        <Filter onApplyFilters={handleFilters} />
        <SortButton onSort={handleSort} />
      </div>
      <Products
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        filters={filters}
        sortOrder={sortOrder}
      />
    </div>
  );
}

export default Home;
