'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

const debounce = (fn: Function, ms = 1000) => {
  let timer: void | NodeJS.Timeout = void 0
  return (arg: string) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn(arg)
    }, ms)
    return
  }
}

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const debounceSearch = debounce(function handleSearch(term: string) {
    console.log(`Searching... ${term}`)

    const params = new URLSearchParams(searchParams)
    console.log(term)
    params.set('page', '1')
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  })

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        onChange={(e) => debounceSearch(e.target.value)}
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  )
}
