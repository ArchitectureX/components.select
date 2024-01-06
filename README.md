# @architecturex/components.select

## Button

A flexible and customizable button component for React applications built with Tailwind CSS.

### Installation

`npm install @architecturex/components.button`

### Features

- Supports various color schemes.
- **Three size options:** small, medium, and large.
- **Variants:** contained, outlined, and text.
- **Shapes:** regular, rounded, circle, and square.
- Supports both buttons and links.
- Loading and disabled states.

### Usage

```javascript
import Button from '@architecturex/components.button'

function App() {
  return (
    <Button color="primary" size="medium" variant="contained">
      Click me!
    </Button>
  )
}
```

### Props

- **color:** Sets the color scheme of the button. (default: 'primary')
- **size:** Determines the size of the button. (default: 'medium')
- **variant:** Sets the button style. (default: 'contained')
- **shape:** Defines the shape of the button. (default: 'regular')
- **href:** If provided, the button will be rendered as a link.
- **target:** Set the target attribute for the link button.
- **fullWidth:** If true, the button will take up the full width of its container.
- **disabled:** If true, the button will be disabled.
- **isLoading:** If true, the button will show a loading state.
- **loadingText:** Text to show during the loading state.

### Contribution

Feel free to suggest improvements, report issues, or contribute to enhancing these utilities. Your feedback and contributions are welcome!
