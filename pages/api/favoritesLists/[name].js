import db from '../../../db/db'

const get = async (req, res) => {
  const {
    query: { name }
  } = req

  const favorites = await db('favorites_lists')
    .select('name', 'description')
    .where({ name })

  res.status(200).json(favorites)
}

export default async function handler(req, res) {
  const { method } = req

  switch (method) {
    case 'GET':
      get(req, res)
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} not allowed`)
  }
}