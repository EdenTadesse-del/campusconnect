function SearchFilter({ search, setSearch }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search students..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchFilter;