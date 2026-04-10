# Dropdown Component

The `Dropdown` component provides a customized select interface with powerful features such as internal text search, icon support, and a fully stylized dropdown portal, surpassing native HTML `<select>` capabilities.

## Features

- **Searchable**: Internal search bar to quickly filter options when dealing with long lists (`isSearchable=true`).
- **Icons**: Supports rendering global `leftIcon`/`rightIcon` on the trigger, as well as specific localized icons per-option.
- **Click-Away**: Built-in event listeners to automatically close the dropdown when clicking outside its bounds.
- **Custom Portal Overlay**: Animated entrance for the option list that hovers cleanly over other elements.

## Props

- `options: DropdownOption[]` - Array of options with `{ label, value, icon? }`
- `value: string` - The currently selected matched value
- `onChange: (value: string) => void` - Callback fired when a new value is selected
- `placeholder?: string`
- `width?: string` - Custom width override (e.g. `'240px'`)
- `leftIcon?: ReactNode` 
- `rightIcon?: ReactNode`
- `isSearchable?: boolean` - Enables the text-filter input inside the dropdown portal

## Example Usage

```tsx
import { Dropdown } from '../ui/Dropdown/Dropdown';

const sortOptions = [
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'date-new', label: 'Newest First' }
];

const MyHeader = () => {
    const [sort, setSort] = useState('name-asc');

    return (
        <Dropdown 
            options={sortOptions}
            value={sort}
            onChange={(val) => setSort(val)}
            isSearchable={true}
            placeholder="Sort by..."
        />
    )
}
```
