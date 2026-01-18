import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyCZwMV1DuW6W-QAU3ImqQ_vCoyHB-W-aEo",
authDomain: "undangan-pertunangan.firebaseapp.com",
projectId: "undangan-pertunangan",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.saveRSVP=(name)=>{
addDoc(collection(db,"rsvp"),{
nama:name,
tanggal:new Date()
});
}
