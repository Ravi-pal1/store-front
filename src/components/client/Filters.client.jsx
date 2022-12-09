import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { Link, useRouteParams } from '@shopify/hydrogen'

export const filters = [
  {
    id: 1,
    handle: '/products/filter/BEST_SELLING',
    title: 'Best Selling'
  }, {
    id: 2,
    handle: '/products/filter/PRICE',
    title: 'Price (Low to High)'
  }, {
    id: 3,
    handle: '/products/filter/CREATED_AT',
    title: 'Latest'
  }, {
    id: 4,
    handle: '/products/filter/TITLE',
    title: 'Alphabetically (A-Z)'
  }
]
export default function Filter() {
  const {handle} = useRouteParams()
  const filter = filters.find(item => item.handle.includes(handle))
  return(
  <div>
      <Listbox value={filters[0]}>
        <div className="relative mt-1">
          <Listbox.Button className="relative  cursor-default rounded-lg bg-gray-900 text-white py-2 pl-3 pr-10 shadow-md sm:text-sm">
            <span className="block truncate">{filter?.title || "filters"}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-40 mt-1 min-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg">
              {filters.map(filter => (
                <Listbox.Option
                  key={filter.id}
                  className={({ active }) =>
                    `relative cursor-default select-none px-4 py-2 ${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    }`
                  }
                  value={filter.title}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                      <Link to={filter.handle}>{filter.title}</Link>  
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
