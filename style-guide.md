<img src="./assets/images/athena-favicon-color.png" width=60 height=60> 

# Athena Convention Guide 

Info and tips regarding the best practices, styling and syntax of Athena

## Import Organisation
Order of import commands

```ts
// * import core packages
import { useEffect, useState } from 'react'

// * import third party
import DropDownPicker from 'react-native-dropdown-picker'

// * import assets
import appLogo from '../assets/images/logo-no-background.png'

// * import components
import BookCard from './BookCard'

// * import config variables
import { auth } from '../firebaseConfig'

// * import state management (redux)
import { useAppDispatch, useAppSelector } from '../../hooks/redux'

// * import apis/redux functions
import { postThunkBook, updateThunkBook } from '../../redux/books/booksSlice'

// * import types
import type { Book } from '../../models/types'
```

## Colour Management
TODO - set up style folder with an index to define app colours

## Typography
TODO - define font variables and where to use different fonts for consistency

## Naming conventions
- camelCase to be used as default for variable naming
- PascalCase to be used when naming components and interface/types
- SCREAMING_SNAKE_CASE to be used when defining environment variables, such as colour variables 
- Function names - clearly indicate their purpose
  - At the root level of a file use explicit function declaration
    - `async function functionName() {}`
  - Within a function (component) use variable declaration
    - `const functionName = async () => {}`
  - Include `...API()` `...thunk()` in those files to make distinction easier
  - use `handle...` in components when dealing with handlers
- Object names - clearly indicate object data
  - Include `...Data` when handling input data, will be without an `id` field

## Component Structure

Example of goof component structure

```tsx
export default function FileName({ props }) {
  // * Define state management and hooks
  const dispatch = useAppDispatch()
  const books = useAppSelector((state) => state.books.bookList)

  // * Local state
  const [focus, setFocus] = useState(null)

  // * Define constants/variables
  const user = auth.currentUser

  // * useEffects
  useEffect(() => {
    dispatch(fetchThunkBooks())
  }, [])

  // * Event Handler & functions
  const handleDelete = () => {
    dispatch(deleteThunkBook(id))
    Alert.alert('book deleted')
    navigation.navigate('Books', { paramPropKey: 'paramPropValue' })
  }

  // * Rendered data
  return (
    <View>
      <Text>Hello World</Text>
    </View>
  )

  // * Styles
  const styles = StyleSheet.create({
  })
}
```

## Documentation
Use JSDoc for practising summarising what a functions purpose is, and defining its parameters and the return value

Include comments on potentially ambiguous functions or variables to explain. Multi line where some more information may be required

Keep [`README.md`](./README.md) up to date, with any implemented technologies and important app-level information

## Code Splitting/Refactoring

Use folders to keep different component in clearly marked section

Separate `models/types.ts` and utilities `models/utils.ts` into different files

Define styles into a separate folder/file structure (might need to be plain js objects though with react-native)

Any defined hooks in their own file/folder (`hooks/...`)

## Typescript

Where possible always define clear and concise types, and avoid `any` unless necessary

Use union types for data that may hold different types

```ts
  const [user, setUser] = useState<User | null>(null)
```

Interfaces for all Object types. Avoid inline definitions for objects. Refrain from using a `?` for optional parameters and instead use a `...Data` interface for raw data, or a Partial/Omit for when certain keys do not exist ( see universe in code block below )

```ts
export interface Book {
  id: string
  title: string
  author: string
  isCurrent: boolean
  universe?: string // Avoid if possible
}
```

Keep types simple where possible to avoid overcomplicating code, and make sure type definitions are clear and obvious in their role