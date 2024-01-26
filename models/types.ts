export interface Person {
  // ! DELETE WHEN UPDATED ALL NAMING
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

// --- Book types --- //

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

// --- Character types --- //

export interface RawCharacterData {
  city: string
  ethnicity: string
  name: string
  books: string[]
  universe?: string
  userId: string
}

export interface CharacterData extends RawCharacterData {
  affiliations: string[]
  aliases: string[]
  relationships: Record<string, string>
}

export type UpdateCharacterData = Pick<
  CharacterData,
  'affiliations' | 'aliases' | 'relationships'
>

export interface Character extends CharacterData {
  id: string
}

export interface CharacterStore {
  characterList: Character[]
  activeCharacter: Character
}
