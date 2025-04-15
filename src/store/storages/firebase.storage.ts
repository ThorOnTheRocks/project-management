import { StateStorage, createJSONStorage } from "zustand/middleware";

const FIREBASE_URL="https://project-management-db-7ab5d-default-rtdb.europe-west1.firebasedatabase.app/people"


const storageApi: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    try {
      const data = await fetch(`${FIREBASE_URL}/${name}.json`).then(res => res.json());
      console.log({data});
      return JSON.stringify(data);
      
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  setItem: async function (name: string, value: string): Promise<void>{
    const data = await fetch(`${FIREBASE_URL}/${name}.json`, {
      method: "PUT",
      body: value
    });

    console.log({data});
    return;
  },
  removeItem: function (name: string): void | Promise<void> {
    console.log('remove item', name);
  }
}

export const firebaseStorage = createJSONStorage(() => storageApi);