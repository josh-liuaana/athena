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

export interface Book {
  id: string
  title: string
  author: string
  isCurrent: boolean
  universe?: string
}
