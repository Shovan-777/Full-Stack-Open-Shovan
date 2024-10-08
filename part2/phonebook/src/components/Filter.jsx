const Filter = ({ filter, onFilterChange }) => {
    return (
      <div>
        filter is shown with: <input value={filter} onChange={onFilterChange} />
      </div>
    );
  };
  
  export default Filter;
  
