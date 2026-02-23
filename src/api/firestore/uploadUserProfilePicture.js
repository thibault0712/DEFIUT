import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage'
import { storage } from '@/api/firebaseApp.js'

async function uploadUserProfilePicture (profilePictureFile, profilePictureName) {
  if (!profilePictureFile || !profilePictureName) {
    console.error('No profile picture file or name provided')
    return
  }

  try {
    const path = `profilePictures/${profilePictureName}`
    const imgRef = storageRef(storage, path)
    await uploadBytes(imgRef, profilePictureFile)

    return await getDownloadURL(imgRef)
  } catch (error) {
    console.error(error)
    return null
  }
}

export default uploadUserProfilePicture
