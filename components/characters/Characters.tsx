import { StyleSheet, View, Text, Alert, ScrollView, Image } from 'react-native'
import { useEffect, useState } from 'react'

import {
  Modal,
  Portal,
  Button,
  Checkbox,
  TextInput,
  IconButton,
} from 'react-native-paper'
import DropDownPicker from 'react-native-dropdown-picker'

import appLogo from '../../assets/images/athena-favicon-color.png'

import CharacterCard from './CharacterCard'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'

import { fetchThunkCharacters } from '../../redux/characters/characterSlice'

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
    'sort-alphabetical-ascending'
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

  const filterByUniverse = (universe) => {
    const filter = characters.characterList.filter(
      (character) => character.universe === universe
    )
    setCurrentFilteredCharacters(filter)
  }

  const sortByDate = (order: 'asc' | 'desc') => {
    let sortedArray
    if (order === 'asc') {
      sortedArray = [...currentFilteredCharacters].sort(
        (a, b) => b.dateAdded - a.dateAdded
      )
      setCurrentSortType('sort-calendar-ascending')
    } else if (order === 'desc') {
      sortedArray = [...currentFilteredCharacters].sort(
        (a, b) => a.dateAdded - b.dateAdded
      )
      setCurrentSortType('sort-calendar-descending')
    }
    setCurrentFilteredCharacters(sortedArray)
    hideSortModal()
  }

  const sortByName = (order: 'asc' | 'desc') => {
    let sortedArray
    if (order === 'asc') {
      sortedArray = [...currentFilteredCharacters].sort((a, b) => {
        if (a.name < b.name) {
          return -1
        }
        if (a.name > b.name) {
          return 1
        }
        return 0
      })
      setCurrentSortType('sort-alphabetical-ascending')
    } else if (order === 'desc') {
      sortedArray = [...currentFilteredCharacters].sort((a, b) => {
        if (a.name < b.name) {
          return 1
        }
        if (a.name > b.name) {
          return -1
        }
        return 0
      })
      setCurrentSortType('sort-alphabetical-descending')
    }
    setCurrentFilteredCharacters(sortedArray)
    hideSortModal()
  }

  const showFilterModal = () => setFilterVisible(true)
  const hideFilterModal = () => setFilterVisible(false)
  const showSortModal = () => setSortVisible(true)
  const hideSortModal = () => setSortVisible(false)

  const clearFilters = () => {
    setChecked(false)
    setSearch('')
    setCurrentFilteredCharacters(characters.characterList)
  }

  const handleCheck = () => {
    setChecked(!checked)
    setSearch('')
  }

  const handleFilterSubmit = () => {
    filterByUniverse(value)
    hideFilterModal()
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image style={styles.logo} source={appLogo} />
        <Text style={styles.title}>Characters</Text>
      </View>
      <Checkbox.Item
        status={checked ? 'checked' : 'unchecked'}
        onPress={handleCheck}
        uncheckedColor="black"
        color="#5a712c"
        label={`${current.title} Characters`}
        rippleColor="#5a712c"
        position="leading"
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={search}
          mode="outlined"
          label="Search for character"
          autoCapitalize="none"
          onChangeText={(text) => setSearch(text)}
          selectionColor="#171D0B"
          outlineColor="#DBE2CC"
          activeOutlineColor="#5a712c"
          textColor="#171D0B"
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
            <Button onPress={() => sortByDate('asc')}>Newest first</Button>
            <Button onPress={() => sortByDate('desc')}>Oldest first</Button>
            <Button onPress={() => sortByName('asc')}>Alphabetical ↓</Button>
            <Button onPress={() => sortByName('desc')}>Alphabetical ↑</Button>
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
  input: {
    fontSize: 20,
    flex: 1,
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
})
