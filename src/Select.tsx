import React, { useState, useRef, useEffect, FC, CSSProperties } from 'react'

import { styles } from './styles'

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
  ellipsisLength?: number
  searchable?: boolean
}

const SelectComponent: FC<SelectComponentProps> = ({
  label,
  options,
  placeholder = 'Select option',
  onSelectionChange,
  style = {},
  ellipsisLength = 14,
  searchable = false
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
    const truncatedLabel = truncateText(option.label, ellipsisLength)

    setSelectedOption({ ...option, label: truncatedLabel })
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

  const truncateText = (text: string, maxLength: number): string => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
  }

  return (
    <div data-component="Select" className="relative" style={style}>
      {label && <label className={styles.label}>{label}</label>}{' '}
      <div ref={dropdownRef} className="mt-1">
        <button
          className={styles.button}
          onClick={toggleDropdown}
          style={{ height: '42px', color: selectedOption ? 'black' : undefined }}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </button>
        {isOpen && (
          <div className={styles.openDiv}>
            {' '}
            {searchable && (
              <input
                className={styles.input}
                placeholder="Search..."
                value={filter}
                onChange={handleFilterChange}
              />
            )}
            <ul>
              {filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className={`${styles.li} ${
                    selectedOption?.value === option.value ? 'bg-gray-300 dark:bg-gray-600' : ''
                  }`}
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
