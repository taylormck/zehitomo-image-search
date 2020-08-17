/**
 * @file Some utilities to make getting favorites easier.
 * 
 * Ideally, this logic should be moved out to a proper database, but for now,
 * it's all done in localStorage
 */

export function getFavoritesLists () {
  const lists = JSON.parse(localStorage.getItem('lists'))

  return lists
}

export function getListByName (listName) {
  const lists = getFavoritesLists()
  const list = lists.find(list => list.name === listName)

  return list
}

export function getListsByImage (image) {
  const lists = getFavoritesLists()
  const filteredLists = lists.filter(list => list.members.find(({ id }) => id === image.id))

  return filteredLists
}

function updateLists (lists) {
  localStorage.setItem('lists', JSON.stringify(lists))
}

export function addImageToList (listName, listDescription, image) {
  const lists = getFavoritesLists()

  const list = lists.find(({ name }) => name === listName)

  if (list) {
    if (list.members.find(({ id }) => id === image.id)) {
      return
    }

    list.members.push(image)
  } else {
    const newList = {
      name: listName,
      description: listDescription,
      members: [image]
    }

    lists.push(newList)
  }

  updateLists(lists)
}

export function editListInfo (oldName, { name, description }) {
  const lists = getFavoritesLists()
  const list = lists.find(list => list.name === oldName)

  if (!list) {
    return
  }

  list.name = name
  list.description = description

  updateLists(lists)
}


export default {
  getFavoritesLists,
  getListByName,
  getListsByImage,
  addImageToList,
  editListInfo,
}