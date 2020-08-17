import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import {
  getFavoritesLists,
  getListByName,
  getListsByImage,
  addImageToList,
} from '../utils/favorites'

const useStyles = makeStyles((theme) => ({
  modalSpace: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    width: 400,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modalArea: {
    padding: 10,
  },
  textField: {
    padding: 5,
  },
}))

const modalStyle = {
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
}

export default function ImageModal ({ image, modalOpen, closeModal }) {
  const classNames = useStyles()

  const [listName, setListName] = useState('')
  const [listDescription, setListDescription] = useState('')

  const getListsNames = () => {
    return getListsByImage(image).map(({ name }) => name)
  }

  const [joinedLists, setJoinedLists] = useState(getListsNames)

  const addToList = () => {
    addImageToList(listName, listDescription, image)
    setJoinedLists(getListsNames())
  }

  const onListNameChange = event => {
    setListName(event.target.value)
  }

  const onListDescriptionChange = event => {
    setListDescription(event.target.value)
  }

  return (
    <Modal
      open={modalOpen}
      onClose={closeModal}
      aria-labelledby="simple-modal-description"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={classNames.modalSpace}>
        <Typography id="simple-modal-description" variant="h4">
          {image.description}
        </Typography>

        <img
          src={image.urls.small}
          alt={image.alt_description}
        />

        <div className={classNames.modalArea}>
          <Typography variant="h6">Lists</Typography>
          {getListsNames().map(listName => <Typography key={listName}>{listName}</Typography>)}
        </div>

        <div className={classNames.modalArea}>
          <Typography variant="h6">Add to an existing list or create a new one</Typography>
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
            onClick={addToList}
          >
            Add to List
          </Button>
        </div>
      </div>
    </Modal>
  )
}