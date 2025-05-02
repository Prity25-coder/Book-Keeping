// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import ENV_CONFIG from "./env.config.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { v4 as uuidv4 } from "uuid";

import {
  ref,
  getStorage,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const firebaseConfig = ENV_CONFIG;

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

// Storage image and delete

const uploadImage = async (file, folderPath = "uploads") => {
  try {
    // Generate a unique filename
    const fileExtension = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const filePath = `${folderPath}/${fileName}`;

    // Create a reference to the storage location
    const storageRef = ref(storage, filePath);

    // Upload the file
    await uploadBytes(storageRef, file);

    // Get the download URL
    const url = await getDownloadURL(storageRef);

    return { url, filePath };
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

const deleteImage = async (filePath) => {
  try {
    // Create a reference to the file to delete
    const fileRef = ref(storage, filePath);

    // Delete the file
    await deleteObject(fileRef);
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};

export { uploadImage, deleteImage };
