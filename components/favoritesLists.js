import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  list: {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'column nowrap',
    margin: 15
  },
  gridRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}))

export default function FavoritesLists(props) {
  const classNames = useStyles()
  const [lists, setLists] = useState([])

  useEffect(() => {
    const newLists = JSON.parse(localStorage.getItem('lists'))
    setLists(newLists)
  }, [])

  const editListName = (list, name) => {
    list.name = name
    localStorage.setItem('lists', JSON.stringify(lists))
  }

  return (
    <div className={classNames.root}>
      {lists.map((list, i) =>
        <div className={classNames.list} key={`${i} - ${list.name}`}>
          <div>
            <Typography variant="h4">{list.name}</Typography>
          </div>

          <div className={classNames.gridRoot}>
            <GridList className={classNames.gridList} col={2.5}>
                {list.members.map(image =>
                  <GridListTile key={`${i} - ${list.name} -  ${image.id}`}>
                    <img
                      src={image.urls.regular}
                      alt={image.description}
                    />
                  </GridListTile>
                )}
            </GridList>
          </div>
        </div>
      )}
    </div>
  )
}
