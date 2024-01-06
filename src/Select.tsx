import React, { useState, useRef, useEffect, FC, CSSProperties } from 'react'

type Option = {
  label: string
  value: string
  selected?: boolean
}

type SelectComponentProps = {
  label?: string
  options: Option[]
  placeholder?: string
  onSelectionChange?: (value: string) => void
  style?: CSSProperties
}

const SelectComponent: FC<SelectComponentProps> = ({
  label,
  options,
  placeholder = 'Select option',
  onSelectionChange,
  style = {}
}) => {
  const findSelectedOption = options.find((option) => option.selected)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<Option | null>(findSelectedOption || null)
  const [filter, setFilter] = useState('')
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(filter.toLowerCase())
  )
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => setIsOpen(!isOpen)

  const selectOption = (option: Option) => {
    setSelectedOption(option)
    setIsOpen(false)

    if (onSelectionChange) {
      onSelectionChange(option.value)
    }
  }

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div data-component="Select" className="relative" style={style}>
      {label && (
        <label className="block text-gray-700 text-sm font-bold mb-2 text-left dark:text-gray-300">
          {label}
        </label>
      )}{' '}
      <div ref={dropdownRef} className="mt-1">
        <button
          className="bg-gray-200 text-black border border-gray-300 px-4 p-2 rounded w-full text-left text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600" // Dark mode styles
          onClick={toggleDropdown}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </button>
        {isOpen && (
          <div className="absolute bg-white border border-gray-400 mt-1 rounded w-full z-10 dark:bg-gray-800 dark:border-gray-600">
            {' '}
            <input
              className="px-4 py-2 w-full text-sm dark:bg-gray-700 dark:text-gray-300"
              placeholder="Search..."
              value={filter}
              onChange={handleFilterChange}
            />
            <ul>
              {filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-left text-sm dark:hover:bg-gray-600 ${
                    selectedOption?.value === option.value ? 'bg-gray-300 dark:bg-gray-600' : ''
                  }`} // Dark mode styles
                  onClick={() => selectOption(option)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default SelectComponent
