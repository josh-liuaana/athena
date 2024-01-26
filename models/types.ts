export interface Person {
  affiliations: string[]
  aliases: string[]
  books: string[]
  city: string
  ethnicity: string
  id: string
  name: string
  relationships: Record<string, string>
  universe: string
}

export interface Location {
  id: string
  location: string
  nation: string
  region: string
  universe: string
  world: string
}

export interface BookData {
  title: string
  author: string
  isCurrent: boolean
  universe?: string
  userId: string
}

export interface Book extends BookData {
  id: string
}

export interface BookStore {
  bookList: Book[]
  current: Book
}
