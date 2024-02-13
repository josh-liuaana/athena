export function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

export function sortChar(sortTypeOrder, currentFilteredCharacters) {
  let sortedArray
  if (sortTypeOrder === 'date-asc') {
    sortedArray = [...currentFilteredCharacters].sort(
      (a, b) => b.dateAdded - a.dateAdded
    )
    return {
      sortedArray,
      sortType: 'sort-calendar-ascending',
    }
  }
  if (sortTypeOrder === 'date-desc') {
    sortedArray = [...currentFilteredCharacters].sort(
      (a, b) => a.dateAdded - b.dateAdded
    )
    return {
      sortedArray,
      sortType: 'sort-calendar-descending',
    }
  }
  if (sortTypeOrder === 'alpha-asc') {
    sortedArray = [...currentFilteredCharacters].sort((a, b) => {
      if (a.name < b.name) {
        return -1
      }
      if (a.name > b.name) {
        return 1
      }
      return 0
    })
    return { sortedArray, sortType: 'sort-alphabetical-ascending' }
  } else if (sortTypeOrder === 'alpha-desc') {
    sortedArray = [...currentFilteredCharacters].sort((a, b) => {
      if (a.name < b.name) {
        return 1
      }
      if (a.name > b.name) {
        return -1
      }
      return 0
    })
    return { sortedArray, sortType: 'sort-alphabetical-descending' }
  }
}
