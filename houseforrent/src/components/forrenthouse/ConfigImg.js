import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyD5uEiEkrPNrywNgKVNm7XLGYu4q0JREVg",
  authDomain: "imgupload-7f147.firebaseapp.com",
  projectId: "imgupload-7f147",
  storageBucket: "imgupload-7f147.appspot.com",
  messagingSenderId: "849552071403",
  appId: "1:849552071403:web:6652f6678713d7cfa2bcae"
};
const app = initializeApp(firebaseConfig);
export const imgUpload = getStorage(app)