import { Client, Storage } from "appwrite";

const client = new Client()
    .setEndpoint("https://sgp.cloud.appwrite.io/v1")
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
   // .setKey(process.env.APPWRITE_API_KEY); 

export const storage = new Storage(client);

