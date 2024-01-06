import React, { FC, MutableRefObject, ReactElement, useEffect, useRef, useState } from 'react'
import { styles } from './styles'

type Option = {
  option: string
  value: any
  selected: boolean
}

type Props = {
  children?: ReactElement
  className?: string
  color?: 'primary' | 'secondary'
  id?: string
  label?: string
  searchLabel?: string
  name?: string
  noWrapper?: boolean
  onClick(e: any): any
  options?: Option[]
  style?: any
  top?: string
  size?: 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge'
  searchable?: boolean
}

let count = -1

const SelectComponent: FC<Props> = ({
  color = 'primary',
  label = '',
  onClick,
  options = [],
  size = 'small',
  searchable = false,
  searchLabel = 'Start searching here...',
  ...selectProps
}) => {
  const inputReference = useRef<any>(null)

  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options)
  const [open, setOpen] = useState(false)
  const [selectedOption, setValue] = useState({ option: '', value: '' })
  const node = useRef() as MutableRefObject<HTMLInputElement>

  const selectOption = (option: string, value: string, keepItOpen = false) => {
    if (option) {
      setValue({
        option,
        value
      })

      onClick({ option, value })

      if (!keepItOpen && open) {
        setOpen(false)
      }
    }
  }
  const handleKeyDown = (e: any) => {
    const key = e.key.toLowerCase()
    const isKeyUp = key === 'arrowup'
    const isKeyDown = key === 'arrowdown'
    const isEnter = key === 'enter'
    const isArrowKey = isKeyUp || isKeyDown

    if (isEnter) {
      setOpen(false)
    }

    if (filteredOptions.length > 0) {
      let optionIndex = filteredOptions.findIndex((option) =>
        option.option.toLowerCase().startsWith(key)
      )

      let optionsCount = filteredOptions.filter((option) =>
        option.option.toLowerCase().startsWith(key)
      ).length

      if (optionIndex > optionsCount) {
        optionsCount += optionIndex
      }

      const currentSelectedOptionIndex = filteredOptions?.findIndex((option) => option.selected)
      const newOptions = [...filteredOptions]

      if (isKeyUp) {
        optionIndex = currentSelectedOptionIndex - 1
      }

      if (isKeyDown) {
        optionIndex = currentSelectedOptionIndex + 1
      }

      if (optionIndex > -1 && isArrowKey) {
        if (isKeyUp) {
          if (count === -1) {
            count = optionIndex
          } else if (count > 0) {
            count -= 1
          }
        } else if (isKeyDown) {
          if (count === -1) {
            count = optionIndex
          } else if (count < filteredOptions.length - 1) {
            count += 1
          }
        }

        if (currentSelectedOptionIndex > -1) {
          newOptions[currentSelectedOptionIndex].selected = false
        }

        newOptions[count].selected = true

        const { option, value } = newOptions[count]

        selectOption(option, value, true)
      }
    }
  }

  const handleClickOutside = (e: any) => {
    if (node.current.contains(e.target)) {
      return
    }

    setOpen(false)
  }

  const handleOpenOnClick = () => setOpen(!open)

  const handleSearch = (e: any) => {
    const text = e.target.value

    const newFilteredOptions = options.filter((option) =>
      option.option.toLowerCase().includes(text.toLowerCase())
    )

    setFilteredOptions(newFilteredOptions)
  }

  if (!options) {
    return null
  }

  const renderList = () => {
    const style: any = { display: open ? 'block' : 'none' }

    if (size === 'xSmall' || size === 'small') {
      style.maxHeight = '120px'
    }

    if (size === 'medium') {
      style.maxHeight = '150px'
    }

    if (size === 'large') {
      style.maxHeight = '300px'
    }

    if (size === 'xLarge') {
      style.maxHeight = '600px'
    }

    return (
      <ul className={styles.ul} style={style}>
        {searchable && (
          <input
            autoFocus
            className={styles.input}
            ref={inputReference}
            type="text"
            placeholder={searchLabel}
            onChange={handleSearch}
          />
        )}
        {filteredOptions.map(({ option, value, selected }: any) => {
          if (selected && selectedOption.value === '') {
            selectOption(option, value)
          }

          const style = {
            background: 'transparent',
            color: '#151515'
          }

          if (selectedOption.value === value) {
            style.background = `var(--palette-${color}-common-main)`
            style.color = `var(--palette-${color}-common-contrastText)`
          }

          return (
            <li
              key={`option-${value}`}
              onClick={(): void => selectOption(option, value)}
              style={style}
              className={styles.li}
            >
              {option}
            </li>
          )
        })}
      </ul>
    )
  }

  useEffect(() => {
    if (inputReference.current) {
      inputReference?.current?.focus()
    }

    if (open && typeof window !== 'undefined') {
      document.addEventListener('mousedown', handleClickOutside)
    } else if (typeof window !== 'undefined') {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    if (open && typeof window !== 'undefined') {
      node.current.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      if (typeof window !== 'undefined') {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [open])

  return (
    <div ref={node} style={{ marginTop: '5px', marginBottom: '20px' }}>
      <select data-component="Select" className={styles.select} {...selectProps}>
        <>
          <a onClick={handleOpenOnClick} role="button" tabIndex={0} className={styles.a}>
            <div>{selectedOption.option || label}</div>
            <div>
              &nbsp;
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10l5 5 5-5" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </a>
          {renderList()}
        </>
      </select>
    </div>
  )
}

export default SelectComponent
