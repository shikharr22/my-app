import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const config = {
  apiKey: "AIzaSyDlNvPQylTWYrnJv_e0Me3H-zhUVhkhyZ0",
  authDomain: "esp32-a8211.firebaseapp.com",
  databaseURL: "https://esp32-a8211-default-rtdb.firebaseio.com",
  projectId: "esp32-a8211",
  storageBucket: "esp32-a8211.appspot.com",
  messagingSenderId: "766640214047",
  appId: "1:766640214047:web:014670ad020b32809f052a",
  measurementId: "G-4PC2Y79D6W"
};

const app = initializeApp(config);

const database = getDatabase(app);

export default database;