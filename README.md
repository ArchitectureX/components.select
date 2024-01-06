# @architecturex/components.select

## Select

Select is a customizable select dropdown component built with React and Tailwind CSS. It supports features like searching, custom styles, and automatic text truncation with ellipsis.

### Installation

`npm install @architecturex/components.select`

### Usage

```javascript
import React from 'react'
import Select from '@architecturex/components.select'

const App = () => {
  const options = [
    { label: 'Option 1', value: '1', selected: false },
    { label: 'Option 2', value: '2', selected: true },
    { label: 'Option 3', value: '3', selected: false }
  ]

  const handleSelectionChange = (value) => {
    console.log('Selected:', value)
  }

  return (
    <SelectComponent
      label="Select an Option"
      options={options}
      onSelectionChange={handleSelectionChange}
    />
  )
}

export default App
```

### Props

- **label (string):** Optional. Label for the select component.
- **options (Array of Option objects):** Required. Options for the dropdown.
- **placeholder (string):** Optional. Placeholder text for the select button.
- **onSelectionChange (function):** Optional. Callback function when an option is selected.
- **style (CSSProperties):** Optional. Custom styles for the select component.
- **ellipsisLength (number):** Optional. Maximum length of option text before truncation. Default is 14.
- **searchable (boolean):** Optional. Enables a search input to filter options.

### Contribution

Feel free to suggest improvements, report issues, or contribute to enhancing this component. Your feedback and contributions are welcome!
