# Athena 

<img src="./assets/images/logo-color.png" width=150 height=150>

## Project Description

An application for keeping track of people and places in lore heavy novels

Do you ever get a little bit confused or overwhelmed when reading fantasy or science fiction and there is a thousand different characters, from hundreds of different species or realms? The goal of this app is provide a one stop shop for managing these relationships. A way to to keep track of who is from where, what they are, or who the are related to.

Simple input will allow the readers to input information they deem necessary

The peruse through the tomes of knowledge when some extra information is needed for understanding a certain person or relationship

[Project KanBan](https://github.com/users/josh-liuaana/projects/4)

[Firebase console](https://console.firebase.google.com/project/lore-81319/overview)

[Style Guide and Convention](./style-guide.md)

## Technologies

- TypeScript
- react-native
- Firebase
  - [Create / Update to firebase](https://firebase.google.com/docs/firestore/manage-data/add-data#web-modular-api "Firestore documentation")
- Expo
- [Vector Icons](https://oblador.github.io/react-native-vector-icons/)
- Redux Toolkit
  - [Redux Toolkit Docs](https://redux-toolkit.js.org/)
  - [Template](https://github.com/rahsheen/react-native-template-redux-typescript/tree/main)
- [react-native-dropdown-picker](https://hossein-zare.github.io/react-native-dropdown-picker-website/)
- [Bottom Tabs Navigator](https://reactnavigation.org/docs/bottom-tab-navigator/)

### Potential Future Tech
- [React Native Paper](https://reactnativepaper.com/)

## Styling

Palette
- Primary: #5a712c
- Background: #DBE2CC
- Dark:#171D0B

Fonts
- Caveat-Regular
- GreatVibes-Regular

## Redux - store shape

#### bookSlice

```
  booklist: Book[],
  current: Book
```
#### characterSlice

```
  characterList: Person[],
  activeCharacter: Person
```