import Head from 'next/head'
import Link from 'next/link'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-block',
    backgroundColor: theme.palette.background.paper,
  },
  header: {
    display: 'flex',
    justifyContent: 'left',
    verticalAlign: 'bottom',
    padding: 50,
    backgroundColor: theme.palette.background.default
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    verticalAlign: 'bottom',
    padding: 50,
    marginTop: 'auto',
    backgroundColor: theme.palette.background.default
  },
}))

export default function Layout ({ children }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <Link href="/"><a><Typography>Home/Search</Typography></a></Link>
        <Link href="/favorites"><a><Typography>Favorites</Typography></a></Link>
      </header>

      {children}

      <footer className={classes.footer}>
        <Typography>I hope you're liking the site so far!</Typography>
      </footer>
    </div>
  )
}
