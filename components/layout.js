import Head from 'next/head'
import Link from 'next/link'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'stretch',
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    padding: 50,
    backgroundColor: theme.palette.background.default
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    padding: 50,
    marginTop: 'auto',
    backgroundColor: theme.palette.background.default
  },
  link: {
    paddingLeft: 20,
    paddingRight: 20,
  },
}))

export default function Layout ({ children }) {
  const classNames = useStyles()

  return (
    <div className={classNames.root}>
      <header className={classNames.header}>
        <Link href="/"><a className={classNames.link} ><Typography>Home/Search</Typography></a></Link>
        <Link href="/favorites"><a className={classNames.link} ><Typography>Favorites</Typography></a></Link>
      </header>

      {children}

      <footer className={classNames.footer}>
        <Typography>I hope you're liking the site so far!</Typography>
      </footer>
    </div>
  )
}
