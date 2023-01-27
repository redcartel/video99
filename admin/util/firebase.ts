import { firebaseConfig } from '@shared/util/firebase';
import { initializeApp } from "firebase/app";

const firebase = initializeApp(firebaseConfig);

export default firebase;