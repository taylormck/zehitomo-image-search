import React, { useState } from 'react'

import { saveAs } from 'file-saver'

import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Fade from '@material-ui/core/Fade'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({
  root: {
    flex: '1 1 auto',
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlayButtonRow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    margin: 3,
    display: 'flex',
    justifyContent: 'right',
  },
  overlayButton: {
    margin: 2,
  },
  usernameContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    margin: 2,
    backgroundColor: '#ffffff99',
    display: 'flex',
    justifyContent: 'center',
  },
  username: {
    margin: 2,
  },
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

export default function Image ({ image }) {
  const classNames = useStyles()

  const [hover, setHover] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [listName, setListName] = useState('')

  const onMouseEnter = () => {
    setHover(true)
  }

  const onMouseLeave = () => {
    setHover(false)
  }

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const onDownload = () => {
    const fileType = image.urls.full.match(/fm=(\w+)/)[1]

    saveAs(image.urls.full, `${image.id}.${fileType}`)
  }

  const onSave = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites'))

    if (!favorites.find(i => i.id === image.id)) {
      favorites.push(image)
      localStorage.setItem('favorites', JSON.stringify(favorites))
    }
  }

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
    <div className={classNames.root}>
      <img
        src={image.urls.small} 
        alt={image.alt_description}
      />

      <div
        className={classNames.overlayContainer}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={openModal}
       >
        <Fade in={hover}>
          <div>
            <div className={classNames.overlayButtonRow}>
              <Button
                variant="contained"
                color="primary"
                className={classNames.overlayButton}
                onClick={onDownload}
              >
                Download
              </Button>

              <Button
                variant="contained"
                color="primary"
                className={classNames.overlayButton}
                onClick={onSave}
              >
                Save
              </Button>
            </div>

            <div className={classNames.usernameContainer}>
              <div className={classNames.username}>
                <Typography>{image.user.username}</Typography>
              </div>
            </div>
          </div>
        </Fade>
      </div>

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
    </div>
  )
}
