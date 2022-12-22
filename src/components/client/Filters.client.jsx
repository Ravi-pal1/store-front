export default function Filter({filters, setFilter}) {
  return(
    <div>
      <select
        onChange={(e) => setFilter(e.target.value)}
        className="border rounded py-1"
      >
        {filters.map((filter) => (
          <option value={filter.handle} key={filter.id}>
            {filter.title}
          </option>
        ))}
      </select>
    </div>
  )
}
