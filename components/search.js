import React, { useState, useEffect } from 'react'
import debounce from 'debounce-promise'

import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import ImageSearchIcon from '@material-ui/icons/ImageSearch'

import { makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'

import Image from '../components/image'

// Debouncing our fetcher helps us avoid excessive API calls.
const fetcher = url => fetch(url, { method: 'GET' }).then((res) => res.json())
const fetchImages = debounce(async token => fetcher(`/api/images?searchToken=${token}`), 1000)

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  searchBar: {
    width: '80%',
    padding: 50,
  },
  gridList: {
    width: '90%',
    display: 'flex',
    alignItems: 'flex-start',
  },
}))

export default function Search (props) {
  const classes = useStyles()

  const [searchToken, setSearchToken] = useState('')
  const [imageData, setImageData] = useState([])

  const onChange = event => {
    setSearchToken(event.target.value)
  }

  const updateSearch = () => {
    const fetchNewImages = async token => {
      const newImages = await fetchImages(token)
      setImageData(newImages)
    }

    fetchNewImages(searchToken)
  }

  useEffect(updateSearch, [searchToken])

  return (
    <div className={classes.root}>
      <TextField
        id="search-bar"
        label="Search"
        variant="filled"
        className={classes.searchBar}
        onChange={onChange}
        InputProps={{
          endAdornment: <InputAdornment position="end"><ImageSearchIcon /></InputAdornment>
        }}
      />

      <GridList className={classes.gridList} cellHeight={200} cols={3}>
        {imageData && imageData.map(image => (
          <GridListTile key={image.id} cols={image.cols || 1}>
            <Image image={image} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}
