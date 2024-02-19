import { StyleSheet, View, Text, ScrollView, Image } from 'react-native'
import { useEffect, useState } from 'react'

import { Modal, Portal, Button, Checkbox, IconButton } from 'react-native-paper'
import DropDownPicker from 'react-native-dropdown-picker'

import appLogo from '../../assets/images/athena-favicon-color.png'

import { TextInputComp } from '../@shared/TextInputComp'

import CharacterCard from './CharacterCard'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'

import { fetchThunkCharacters } from '../../redux/characters/characterSlice'
import { sortChar } from '../../models/utils'

export default function Characters({ navigation, route }) {
  const dispatch = useAppDispatch()
  const characters = useAppSelector((state) => state.characters)
  const current = useAppSelector((state) => state.books.current)
  const books = useAppSelector((state) => state.books.bookList)

  const [filterVisible, setFilterVisible] = useState(false)
  const [sortVisible, setSortVisible] = useState(false)
  const [checked, setChecked] = useState(true)
  const [search, setSearch] = useState('')
  const [currentFilteredCharacters, setCurrentFilteredCharacters] = useState([])
  const [items, setItems] = useState([])
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(null)
  const [currentSortType, setCurrentSortType] = useState(
    'sort-calendar-ascending'
  )

  const dropdownArray = []
  const uniqueUniverse = []

  useEffect(() => {
    dispatch(fetchThunkCharacters())
    books.map((book) => {
      if (book.universe && uniqueUniverse.includes(book.universe) === false) {
        uniqueUniverse.push(book.universe)
        dropdownArray.push({ label: book.universe, value: book.universe })
      }
      setItems(items.concat(dropdownArray))
    })
  }, [dispatch, route])

  useEffect(() => {
    if (checked) {
      const filter = characters.characterList.filter((character) =>
        character.books.includes(current.title)
      )
      setCurrentFilteredCharacters(filter)
    } else {
      setCurrentFilteredCharacters(characters.characterList)
    }
  }, [checked])

  useEffect(() => {
    if (checked) {
      const filter = characters.characterList.filter(
        (character) =>
          character.books.includes(current.title) &&
          character.name.toLowerCase().includes(search.toLowerCase())
      )
      setCurrentFilteredCharacters(filter)
    } else {
      const filter = characters.characterList.filter((character) =>
        character.name.toLowerCase().includes(search.toLowerCase())
      )
      setCurrentFilteredCharacters(filter)
    }
  }, [search])

  const filterByUniverse = (universe: string): void => {
    const filter = characters.characterList.filter(
      (character) => character.universe === universe
    )
    setCurrentFilteredCharacters(filter)
  }

  const sort = (
    sortTypeOrder: 'date-asc' | 'date-desc' | 'alpha-asc' | 'alpha-desc'
  ): void => {
    const data = sortChar(sortTypeOrder, currentFilteredCharacters)
    setCurrentFilteredCharacters(data.sortedArray)
    setCurrentSortType(data.sortType)
    hideSortModal()
  }

  const showFilterModal = (): void => setFilterVisible(true)
  const hideFilterModal = (): void => setFilterVisible(false)
  const showSortModal = (): void => setSortVisible(true)
  const hideSortModal = (): void => setSortVisible(false)

  const clearFilters = (): void => {
    setChecked(false)
    setSearch('')
    setCurrentFilteredCharacters(characters.characterList)
  }

  const handleCheck = (): void => {
    setChecked(!checked)
    setSearch('')
  }

  const handleFilterSubmit = (): void => {
    filterByUniverse(value)
    hideFilterModal()
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image style={styles.logo} source={appLogo} />
        <Text style={styles.title}>Characters</Text>
      </View>

      {characters.characterList.length === 0 ? (
        <>
          <Text>These are not the droids you are looking for</Text>
          <View style={styles.getStartedContainer}>
            <Text>You need to</Text>
            <Text
              style={{ color: 'blue', marginHorizontal: 3 }}
              onPress={() => navigation.navigate('Lore')}
            >
              add a new character
            </Text>
            <Text>to get started</Text>
          </View>
        </>
      ) : (
        <>
          {current && (
            <Checkbox.Item
              status={checked ? 'checked' : 'unchecked'}
              onPress={handleCheck}
              uncheckedColor="black"
              color="#5a712c"
              label={`${current.title} Characters`}
              rippleColor="#5a712c"
              position="leading"
            />
          )}
          <View style={styles.inputContainer}>
            <TextInputComp
              func={(text) => setSearch(text)}
              value={search}
              label="Character search"
              style={{ flex: 1 }}
            />
            <IconButton
              icon={currentSortType}
              iconColor="#5a712c"
              size={35}
              style={styles.buttonCont}
              onPress={showSortModal}
            />
            {currentFilteredCharacters.length ===
            characters.characterList.length ? (
              <IconButton
                icon="filter-variant"
                iconColor="#5a712c"
                size={35}
                onPress={() => setFilterVisible(true)}
                style={styles.buttonCont}
              />
            ) : (
              <IconButton
                icon="filter-variant-remove"
                iconColor="#c70000"
                size={35}
                onPress={
                  currentFilteredCharacters.length !==
                  characters.characterList.length
                    ? () => clearFilters()
                    : () => showFilterModal()
                }
                style={styles.buttonCont}
              />
            )}
          </View>
          <Portal>
            <Modal
              visible={filterVisible}
              onDismiss={hideFilterModal}
              contentContainerStyle={styles.filterModal}
            >
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Filter by universe</Text>
                <DropDownPicker
                  open={open}
                  setOpen={setOpen}
                  items={items}
                  setItems={setItems}
                  value={value}
                  setValue={setValue}
                  placeholder="Choose a series..."
                  placeholderStyle={{ color: 'grey' }}
                  searchable={true}
                  searchPlaceholder="Search..."
                  closeAfterSelecting={true}
                />
                <View style={styles.modalButtonContainer}>
                  <Button onPress={handleFilterSubmit}>Filter</Button>
                  <Button onPress={hideFilterModal}>Close</Button>
                </View>
              </View>
            </Modal>

            <Modal
              visible={sortVisible}
              onDismiss={hideSortModal}
              contentContainerStyle={styles.sortModal}
            >
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Sort order</Text>
                <Button onPress={() => sort('date-asc')}>Newest first</Button>
                <Button onPress={() => sort('date-desc')}>Oldest first</Button>
                <Button onPress={() => sort('alpha-asc')}>
                  Alphabetical ↓
                </Button>
                <Button onPress={() => sort('alpha-desc')}>
                  Alphabetical ↑
                </Button>
                <View style={styles.modalButtonContainer}>
                  <Button onPress={hideSortModal}>Close</Button>
                </View>
              </View>
            </Modal>
          </Portal>
          <ScrollView style={styles.scrollContainer}>
            {currentFilteredCharacters &&
              currentFilteredCharacters.map((character) => (
                <CharacterCard
                  key={character.id}
                  characterInfo={character}
                  navigation={navigation}
                />
              ))}
          </ScrollView>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DBE2CC',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
  },

  filterModal: {
    backgroundColor: 'white',
    padding: 20,
    height: '25%',
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  sortModal: {
    backgroundColor: 'white',
    padding: 20,
    height: '35%',
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  modalContainer: {
    width: '100%',
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'caveat',
    fontSize: 40,
  },
  modalButtonContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  inputContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    flexDirection: 'row',
  },
  buttonCont: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
  },

  titleContainer: {
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 60,
    width: 60,
    margin: 10,
  },
  title: {
    fontFamily: 'vibes',
    fontSize: 70,
    letterSpacing: 5,
  },

  scrollContainer: {
    height: '52%',
    width: '100%',
  },
  getStartedContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
})
