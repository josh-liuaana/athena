import { collection, getDocs, getFirestore } from 'firebase/firestore'

export async function fetchLocations() {
  console.log('fetching locations...')
  const db = getFirestore()
  const locationCol = collection(db, 'places')
  const locationSnapshot = await getDocs(locationCol)
  const locationList = []

  locationSnapshot.docs.map((doc) =>
    locationList.push({ ...doc.data(), id: doc.id })
  )
  console.log('retrieved locations')
  return locationList
}
