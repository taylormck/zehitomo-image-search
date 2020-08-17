import Head from 'next/head'

import Layout from '../components/layout'
import FavoritesLists from '../components/favoritesLists'

export default function Home() {
  return (
    <Layout>
      <FavoritesLists />
    </Layout>
  )
}
