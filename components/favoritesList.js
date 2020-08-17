import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'

import {
  editListInfo,
} from '../utils/favorites'


const useStyles = makeStyles((theme) => ({
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
  listInfoBar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  editButton: {
    float: 'right',
    margin: 5,
  },
  modalSpace: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    width: 400,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  modalArea: {
    padding: 10,
  },
}))

const modalStyle = {
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
}

export default function FavoritesList ({ i, list, onEdit }) {
  const classNames = useStyles()

  const key = `${i} - ${list.name}`

  const [modal, setModal] = useState(false)
  const [editListName, setEditListName] = useState(list.name)
  const [editListDescription, setEditListDescription] = useState(list.description)

  const showModal = () => {
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
  }

  const onListNameChange = event => {
    setEditListName(event.target.value)
  }

  const onListDescriptionChange = event => {
    setEditListDescription(event.target.value)
  }

  const saveChanges = () => {
    editListInfo(list.name, {
      name: editListName,
      description: editListDescription,
    })

    closeModal()

    onEdit()
  }

  return (
    <div className={classNames.list}>
      <div className={classNames.listInfoBar}>
        <div>
          <Typography variant="h4">{list.name}</Typography>
          <Typography variant="subtitle1">{list.description}</Typography>
        </div>

        <Button
          variant="contained"
          color="primary"
          className={classNames.editButton}
          onClick={showModal}
        >
          Edit list info
        </Button>
      </div>

      <div className={classNames.gridRoot}>
        <GridList
          className={classNames.gridList}
          col={2.5}
          cellHeight={400}
        >
          {list.members.map(image =>
            <GridListTile key={`${key} -  ${image.id}`}>
              <img
                // We're starting with the largest resolution and working our way down,
                // as a backup, just in case
                src={image.urls.raw || image.urls.full || image.urls.regular}
                alt={image.description}
              />
            </GridListTile>
          )}
      </GridList>
    </div>

    <Modal
      open={modal}
      onClose={closeModal}
      aria-labelledby="simple-modal-description"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={classNames.modalSpace}>
        <Typography id="simple-modal-description" variant="h4">
          Edit list info:
        </Typography>

        <TextField
          variant="filled"
          label="List Name"
          className={classNames.textField}
          onChange={onListNameChange}
        />

        <TextField
          variant="filled"
          label="List Description"
          className={classNames.textField}
          onChange={onListDescriptionChange}
        />

        <Button
          variant="contained"
          color="primary"
          className={classNames.overlayButton}
          onClick={saveChanges}
        >
          Save changes
        </Button>
      </div>
    </Modal>
  </div>
  )
}
