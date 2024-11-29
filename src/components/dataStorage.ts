import { User } from "../interfaces/Candidate.interface";

export function storeData(user: User): void {
    const key = "favourites";
  
    // Retrieve existing favorites or initialize with an empty array
    const existingData: User[] = retrieveData();
  
    console.log('Existing data:', existingData);
  
    // Ensure existingData is an array before using array methods
    if (!Array.isArray(existingData)) {
      console.error('Data retrieved is not an array:', existingData);
      return; // Exit the function to prevent further errors
    }
  
    // Check if the user is already in the favorites
    const userExists = existingData.some((fav) => fav.id === user.id);
    if (!userExists) {
      existingData.push(user); // Add new user
      localStorage.setItem(key, JSON.stringify(existingData)); // Save updated array
      console.log(`User added to favourites:`, user);
    } else {
      console.log(`User already exists in favourites:`, user);
    }
  }
  
  export function retrieveData(): User[] {
    const key = "favourites";
    const data = localStorage.getItem(key);
  
    // Parse data if it exists; otherwise, return an empty array
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        // Ensure parsed data is an array before returning
        if (Array.isArray(parsedData)) {
          return parsedData;
        } else {
          console.error('Parsed data is not an array:', parsedData);
          return []; // Return an empty array if data is invalid
        }
      } catch (error) {
        console.error(`Error parsing localStorage data for key ${key}:`, error);
        return []; // Return an empty array if JSON is invalid
      }
    } else {
      return []; // Return an empty array if no data exists
    }
  }
  
