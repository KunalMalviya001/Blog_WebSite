// Configuration file for Appwrite settings.
// This file centralizes all environment variables required for Appwrite integration.

const conf = {
  appwriteUrl: import.meta.env.VITE_APPWRITE_URL, // Appwrite API endpoint URL
  appwriteProjectId: import.meta.env.VITE_APPWRITE_PROJECT_ID, // Appwrite project ID
  appwriteDatabaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID, // Appwrite database ID
  appwriteCollectionId: import.meta.env.VITE_APPWRITE_COLLECTION_ID, // Appwrite collection ID
  appwriteBucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID, // Appwrite storage bucket ID
};

export default conf; // Export the configuration object for use across the application