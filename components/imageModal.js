import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  modalSpace: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    width: 400,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
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

  const getLists = () => {
    const lists = JSON.parse(localStorage.getItem('lists'))

    const filteredListNames = lists
      .filter(list => list.members.find(i => i.id === image.id))
      .map(list => list.name)

      return filteredListNames
  }

  const addToList = () => {
    const lists = JSON.parse(localStorage.getItem('lists'))
    const list = lists.find(list => list.name === listName)

    if (list) {
      if (!list.members.find(i => i.id === image.id)) {
        list.members.push(image)
      }
    } else {
      lists.push({ name: listName, members: [image] })
    }

    localStorage.setItem('lists', JSON.stringify(lists))
  }

  const onListNameChange = event => {
    setListName(event.target.value)
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

        <div>
          <Typography variant="h6">Lists</Typography>
          {getLists().map(listName => <Typography key={listName}>{listName}</Typography>)}
        </div>

        <div>
          <TextField
            variant="filled"
            onChange={onListNameChange}
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