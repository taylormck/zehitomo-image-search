import React, { useState } from 'react'

import { saveAs } from 'file-saver'

import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Fade from '@material-ui/core/Fade'

import Modal from './imageModal'

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
}))

export default function Image ({ image }) {
  const classNames = useStyles()

  const [hover, setHover] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const onMouseEnter = () => {
    setHover(true)
  }

  const onMouseLeave = () => {
    setHover(false)
  }

  const onDownload = event => {
    const fileType = image.urls.full.match(/fm=(\w+)/)[1]

    saveAs(image.urls.full, `${image.id}.${fileType}`)
  }

  const onSave = event => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
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

      <Modal image={image} modalOpen={modalOpen} closeModal={closeModal} />
    </div>
  )
}
