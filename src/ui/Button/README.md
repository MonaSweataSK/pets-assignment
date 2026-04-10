# Button Component

The `Button` component is the primary interactive element in the PetGallery design system. It is heavily styled using `styled-components` to match the project's premium, dynamic aesthetic.

## Features

- **Variants**: Includes `primary`, `secondary`, `ghost`, and a dedicated `cta` variant with gradient styling.
- **Sizing**: Available in `sm`, `md`, and `lg` to fit various layout contexts.
- **Icons**: Supports optional `leftIcon` and `rightIcon` injections.
- **Loading State**: Built-in `isLoading` state which automatically disables the button and spins a loader in place of the left icon.

## Props

- `variant?: 'primary' | 'secondary' | 'ghost' | 'cta'` (Default: 'primary')
- `size?: 'sm' | 'md' | 'lg'` (Default: 'md')
- `isLoading?: boolean`
- `leftIcon?: ReactNode`
- `rightIcon?: ReactNode`
- *(Inherits all standard HTML button attributes)*

## Example Usage

```tsx
import { Button } from '../ui/Button/Button';

// Standard Primary Button
<Button onClick={() => console.log('Clicked')}>Submit</Button>

// Large CTA with Loading State
<Button variant="cta" size="lg" isLoading={isSubmitting}>
  Download Selected
</Button>

// Ghost Button with trailing icon
<Button variant="ghost" rightIcon={<ArrowRight />}>
  Learn More
</Button>
```
