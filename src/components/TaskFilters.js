import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './ui';

const TaskFilters = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedPriority,
  setSelectedPriority,
  categories,
  onClearFilters
}) => (
  <div style={{
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    flexWrap: 'wrap'
  }}>
    <input
      type="text"
      placeholder="Search tasks..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{
        padding: '8px 12px',
        border: '1px solid #ced4da',
        borderRadius: '4px',
        minWidth: '200px',
      }}
    />
    <select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      style={{
        padding: '8px 12px',
        border: '1px solid #ced4da',
        borderRadius: '4px',
      }}
    >
      <option value="">All Categories</option>
      {categories.map(cat => (
        <option key={cat.id} value={cat.id}>{cat.name}</option>
      ))}
    </select>
    <select
      value={selectedPriority}
      onChange={(e) => setSelectedPriority(e.target.value)}
      style={{
        padding: '8px 12px',
        border: '1px solid #ced4da',
        borderRadius: '4px',
      }}
    >
      <option value="">All Priorities</option>
      <option value="high">High</option>
      <option value="medium">Medium</option>
      <option value="low">Low</option>
    </select>
    <Button onClick={onClearFilters}>
      Clear Filters
    </Button>
  </div>
);

TaskFilters.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
  selectedPriority: PropTypes.string.isRequired,
  setSelectedPriority: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  onClearFilters: PropTypes.func.isRequired,
};

export default TaskFilters;