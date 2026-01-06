# gluestack-ui Reference Guide

> **Source:** [gluestack.io/ui](https://gluestack.io/ui/docs/components/all-components)
> **Version:** v3
> **Last Updated:** January 2026

---

## Overview

gluestack-ui is a universal UI component library for React Native and web applications. It provides:

- **30+ components** ready to use
- **NativeWind/Tailwind CSS** styling
- **Accessibility** built-in (WAI-ARIA)
- **Universal** - works on iOS, Android, and Web
- **Dark mode** support
- **TypeScript** support

---

## Installation

### Initialize gluestack-ui

```bash
npx gluestack-ui init
```

### Add Individual Components

```bash
npx gluestack-ui add <component-name>

# Examples:
npx gluestack-ui add heading
npx gluestack-ui add text
npx gluestack-ui add box
npx gluestack-ui add button card input modal toast
```

### Import Pattern

All components are installed to `@/components/ui/`:

```tsx
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
```

---

## All Components

### Typography

| Component | Install Command | Description |
|-----------|-----------------|-------------|
| `Heading` | `npx gluestack-ui add heading` | Semantic headings (h1-h6) |
| `Text` | `npx gluestack-ui add text` | Body text with formatting |

### Layout

| Component | Install Command | Description |
|-----------|-----------------|-------------|
| `Box` | `npx gluestack-ui add box` | Basic container (div/View) |
| `Center` | `npx gluestack-ui add center` | Centers content |
| `Divider` | `npx gluestack-ui add divider` | Horizontal/vertical divider |
| `HStack` | `npx gluestack-ui add hstack` | Horizontal flex container |
| `VStack` | `npx gluestack-ui add vstack` | Vertical flex container |
| `Grid` | `npx gluestack-ui add grid` | CSS Grid layout (alpha) |

### Feedback

| Component | Install Command | Description |
|-----------|-----------------|-------------|
| `Alert` | `npx gluestack-ui add alert` | Alert messages |
| `Progress` | `npx gluestack-ui add progress` | Progress bars |
| `Spinner` | `npx gluestack-ui add spinner` | Loading spinners |
| `Toast` | `npx gluestack-ui add toast` | Toast notifications |

### Data Display

| Component | Install Command | Description |
|-----------|-----------------|-------------|
| `Badge` | `npx gluestack-ui add badge` | Status badges |
| `Card` | `npx gluestack-ui add card` | Card containers |
| `Table` | `npx gluestack-ui add table` | Data tables (alpha) |

### Forms

| Component | Install Command | Description |
|-----------|-----------------|-------------|
| `Button` | `npx gluestack-ui add button` | Buttons with variants |
| `Checkbox` | `npx gluestack-ui add checkbox` | Checkboxes |
| `FormControl` | `npx gluestack-ui add form-control` | Form field wrapper |
| `Input` | `npx gluestack-ui add input` | Text inputs |
| `Link` | `npx gluestack-ui add link` | Hyperlinks |
| `Pressable` | `npx gluestack-ui add pressable` | Touchable wrapper |
| `Radio` | `npx gluestack-ui add radio` | Radio buttons |
| `Select` | `npx gluestack-ui add select` | Dropdowns |
| `Slider` | `npx gluestack-ui add slider` | Range sliders |
| `Switch` | `npx gluestack-ui add switch` | Toggle switches |
| `Textarea` | `npx gluestack-ui add textarea` | Multi-line text input |

### Overlay

| Component | Install Command | Description |
|-----------|-----------------|-------------|
| `AlertDialog` | `npx gluestack-ui add alert-dialog` | Confirmation dialogs |
| `Drawer` | `npx gluestack-ui add drawer` | Side drawers |
| `Menu` | `npx gluestack-ui add menu` | Dropdown menus |
| `Modal` | `npx gluestack-ui add modal` | Modal dialogs |
| `Popover` | `npx gluestack-ui add popover` | Popovers |
| `Portal` | `npx gluestack-ui add portal` | Portal rendering |
| `Tooltip` | `npx gluestack-ui add tooltip` | Tooltips |

### Disclosure

| Component | Install Command | Description |
|-----------|-----------------|-------------|
| `Actionsheet` | `npx gluestack-ui add actionsheet` | Bottom action sheets |
| `Accordion` | `npx gluestack-ui add accordion` | Expandable sections |
| `BottomSheet` | `npx gluestack-ui add bottomsheet` | Bottom sheets (alpha) |

### Media And Icons

| Component | Install Command | Description |
|-----------|-----------------|-------------|
| `Avatar` | `npx gluestack-ui add avatar` | User avatars |
| `Image` | `npx gluestack-ui add image` | Optimized images |
| `Icon` | `npx gluestack-ui add icon` | Icon component |

### Others

| Component | Install Command | Description |
|-----------|-----------------|-------------|
| `Fab` | `npx gluestack-ui add fab` | Floating action button |
| `Skeleton` | `npx gluestack-ui add skeleton` | Loading skeletons (alpha) |

---

## Component Deep Dives

### Heading

> [Documentation](https://gluestack.io/ui/docs/components/heading)

**Platform Rendering:**
| Size | Web Element | Native Element |
|------|-------------|----------------|
| `5xl`, `4xl`, `3xl` | `<h1>` | H1 |
| `2xl` | `<h2>` | H2 |
| `xl` | `<h3>` | H3 |
| `lg` | `<h4>` | H4 |
| `md` | `<h5>` | H5 |
| `sm`, `xs` | `<h6>` | H6 |

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `5xl` \| `4xl` \| `3xl` \| `2xl` \| `xl` \| `lg` \| `md` \| `sm` \| `xs` | `md` | Heading size |
| `isTruncated` | boolean | false | Truncate with ellipsis |
| `bold` | boolean | false | Bold text |
| `underline` | boolean | false | Underline text |
| `strikeThrough` | boolean | false | Strikethrough |
| `italic` | boolean | false | Italic text |
| `highlight` | boolean | false | Highlight background |
| `sub` | boolean | false | Subscript style |

**Usage:**
```tsx
import { Heading } from '@/components/ui/heading';

// Large title
<Heading size="3xl" bold>
  Liquidate Your Clutter
</Heading>

// Section heading
<Heading size="xl" className="text-purple-400">
  AI Analysis Complete
</Heading>

// Small heading
<Heading size="sm" className="text-gray-500">
  Price History
</Heading>
```

---

### Text

> [Documentation](https://gluestack.io/ui/docs/components/text)

**Platform Rendering:**
| Platform | Renders |
|----------|---------|
| Web | `<span>` |
| Native | `<Text>` |

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `2xs` \| `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `2xl` \| `3xl` \| `4xl` \| `5xl` \| `6xl` | `md` | Text size |
| `isTruncated` | boolean | false | Truncate with ellipsis |
| `bold` | boolean | false | Bold text |
| `underline` | boolean | false | Underline text |
| `strikeThrough` | boolean | false | Strikethrough |
| `italic` | boolean | false | Italic text |
| `highlight` | boolean | false | Yellow highlight background |
| `sub` | boolean | false | Subscript style |

**Usage:**
```tsx
import { Text } from '@/components/ui/text';

// Regular text
<Text size="md">Regular body text</Text>

// Bold emphasis
<Text bold size="lg">Important information</Text>

// Muted secondary text
<Text size="sm" className="text-gray-400">
  Last updated 2 hours ago
</Text>

// Truncated long text
<Text isTruncated className="max-w-[200px]">
  This is a very long text that will be truncated with an ellipsis...
</Text>

// Formatted text
<Text italic underline>Styled text</Text>
```

---

### Box

> [Documentation](https://gluestack.io/ui/docs/components/box)

**Platform Rendering:**
| Platform | Renders |
|----------|---------|
| Web | `<div>` |
| Native | `<View>` |

**Usage:**
```tsx
import { Box } from '@/components/ui/box';

// Basic container
<Box className="p-4">
  <Text>Content</Text>
</Box>

// Styled card
<Box className="p-6 bg-slate-800 rounded-2xl shadow-lg border border-slate-700">
  <Heading size="lg">Card Title</Heading>
  <Text>Card content here</Text>
</Box>

// Flex container
<Box className="flex flex-row items-center gap-4">
  <Box className="w-12 h-12 bg-purple-500 rounded-full" />
  <Text>Label</Text>
</Box>

// Gradient background (use with LinearGradient)
<Box className="overflow-hidden rounded-xl">
  <LinearGradient colors={['#6366f1', '#8b5cf6']} className="p-6">
    <Text className="text-white">Gradient content</Text>
  </LinearGradient>
</Box>
```

---

## Hooks

### useBreakPointValue

Responsive values based on screen size.

```tsx
import { useBreakPointValue } from '@gluestack-ui/themed';

const columns = useBreakPointValue({
  base: 1,
  sm: 2,
  md: 3,
  lg: 4,
});
```

### useMediaQuery

Media query detection.

```tsx
import { useMediaQuery } from '@gluestack-ui/themed';

const [isLargeScreen] = useMediaQuery({
  minWidth: 768,
});
```

---

## Theme Configuration

### Default Tokens

gluestack-ui uses NativeWind/Tailwind tokens by default:
- Colors: slate, gray, zinc, neutral, stone, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose
- Spacing: 0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96
- Border Radius: none, sm, md, lg, xl, 2xl, 3xl, full

### Customizing Theme

Edit `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          // ... 200-800
          900: '#4c1d95',
        },
      },
    },
  },
};
```

### Dark Mode

Use Tailwind's `dark:` prefix:

```tsx
<Box className="bg-white dark:bg-slate-900">
  <Text className="text-black dark:text-white">
    Adapts to theme
  </Text>
</Box>
```

---

## LOOP App Component Mapping

| Feature | Components Needed |
|---------|-------------------|
| **Home Screen** | `Box`, `Heading`, `Text`, `Button`, `Card` |
| **Liquidation Flow** | `Box`, `VStack`, `Button`, `Input`, `Progress`, `Modal` |
| **Item Cards** | `Card`, `Image`, `Badge`, `Text`, `Heading` |
| **Price Display** | `Box`, `Heading`, `Text` with custom styling |
| **Courier Modal** | `Modal`, `Button`, `Text`, `Spinner` |
| **Success Toast** | `Toast` |
| **User Profile** | `Avatar`, `Box`, `Heading`, `Text` |
| **Settings** | `Switch`, `Select`, `FormControl` |
| **History List** | `Box`, `FlatList`, `Card`, `Badge` |

---

## Quick Install for LOOP

```bash
# Initialize
npx gluestack-ui init

# Add all needed components
npx gluestack-ui add heading text box button card input modal toast progress spinner badge avatar switch select form-control vstack hstack center actionsheet
```

---

## Best Practices

1. **Use semantic components** - `Heading` for titles, `Text` for body
2. **Leverage NativeWind classes** - Style with Tailwind utilities
3. **Compose with Box** - Build complex layouts with Box + flex classes
4. **Use VStack/HStack** - Simpler than manual flex styling
5. **Dark mode first** - Design with `dark:` variants
6. **Consistent spacing** - Use Tailwind spacing scale (p-4, gap-2, etc.)
7. **Accessibility** - Components have built-in ARIA support

---

## Resources

- [Official Docs](https://gluestack.io/ui/docs)
- [All Components](https://gluestack.io/ui/docs/components/all-components)
- [Theme Tokens](https://gluestack.io/ui/docs/theme-configuration/default-tokens)
- [Dark Mode Guide](https://gluestack.io/ui/docs/theme-configuration/dark-mode)
- [Kitchensink App](https://gluestack.io/ui/docs/apps/kitchensink-app) - See all components in action
- [Starter Kit](https://gluestack.io/ui/docs/apps/starter-kit)
