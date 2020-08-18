import db from '../../db/db'

const get = async (req, res) => {
  const favorites = await db('favorites_lists')
    .select('name', 'description')

  res.status(200).json(favorites)
}

const post = async (req, res) => {
  const { name, description } = req.query
  await db('favorites_lists')
    .insert({ name, description })

  res.status(200).end()
}

// NOTE as fun as it is to define the API nested inside the page/api setup to
// take advantage of Next.js's auto-routing, we might want to look into
// Swagger (or alternatives) for a larger project.
export default async function handler(req, res) {
  const { method } = req

  switch (method) {
    case 'GET':
      get(req, res)
      break
    case 'POST':
      post(req, res)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} not allowed`)
  }
}