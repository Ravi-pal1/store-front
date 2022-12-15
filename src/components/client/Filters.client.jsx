import {useServerProps} from '@shopify/hydrogen'
export const filters = [
  {
    id: 1,
    handle: 'BEST_SELLING',
    title: 'Best Selling'
  }, {
    id: 2,
    handle: 'PRICE',
    title: 'Price (Low to High)'
  }, {
    id: 3,
    handle: 'CREATED_AT',
    title: 'Latest'
  }, {
    id: 4,
    handle: 'TITLE',
    title: 'Alphabetically (A-Z)'
  }
]
export default function Filter() {
  const {setServerProps} = useServerProps()
  return(
    <div>
      <select 
        onChange={(e)=>setServerProps("filter", e.target.value)}
        className = "border rounded py-1"
      >
        <option value="">Default</option>
        {
          filters.map(filter=> 
            <option value={filter.handle} key={filter}>{filter.title}</option>
          )
        }
      </select>
    </div>
  )
}
