import { fetchImages } from './unsplash'

const IMAGE_COUNT = 12;

export default async function handler(req, res) {
  const { query } = req
  const { searchToken } = query

  const data = await fetchImages(searchToken, IMAGE_COUNT)

  res.status(200).json(data)
}