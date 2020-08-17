import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import FavoritesList from './favoritesList'

import {
  getFavoritesLists,
} from '../utils/favorites'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
}))

export default function FavoritesLists(props) {
  const classNames = useStyles()

  const [lists, setLists] = useState([])

  const updateLists = () => {
    const newLists = getFavoritesLists()
    setLists(newLists)
  }

  useEffect(updateLists, [])

  const onEdit = () => {
    updateLists()
  }

  return (
    <div className={classNames.root}>
      {lists.map((list, i) => 
        <FavoritesList key={i} list={list} onEdit={onEdit} />
      )}
    </div>
  )
}
