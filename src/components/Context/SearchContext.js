import React from 'react'

const SearchContext = React.createContext({
  searchInput: '',
  changeInput: () => {},
})

export default SearchContext
