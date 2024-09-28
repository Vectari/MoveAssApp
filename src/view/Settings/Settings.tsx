import { useNavigate } from "react-router-dom";
import { NavBar } from "../../components/NavBar/NavBar";
import { useEffect, useState } from "react";
import { auth, db } from "../../library/firebaseConfig"; // Add Firestore (db) import
import { onAuthStateChanged, User, updateProfile } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; // Firestore functions

export function Settings() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState<string>("");
  const [dailyKcal, setDailyKcal] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (auth.currentUser === null) {
        navigate("/login");
      } else {
        setUser(user);
        // Fetch the displayName from Firestore if available
        const userId = auth.currentUser.uid;

        // Get user document
        const userDoc = await getDoc(doc(db, "users", userId));
        // Get daily kcal document
        const userKcalDoc = await getDoc(
          doc(db, "users", userId, "daily_kcal", "dailyKcal")
        );

        if (userDoc.exists()) {
          setDisplayName(userDoc.data().displayName || "");
        }

        if (userKcalDoc.exists()) {
          const kcalData = userKcalDoc.data();
          setDailyKcal(kcalData?.dailyKcal || ""); // Ensure kcalData is defined before accessing dailyKcal
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSaveDisplayName = async () => {
    if (auth.currentUser) {
      // Update the displayName in Firebase Authentication
      await updateProfile(auth.currentUser, { displayName });

      // Save the displayName to Firestore
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await setDoc(userDocRef, { displayName }, { merge: true });

      console.log("Display Name updated!");
    }
  };

  const handleSaveDailyKcal = async () => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;

      // Reference to the "daily_kcal" subcollection under the user's document
      const dailyKcalDocRef = doc(
        db,
        "users",
        userId,
        "daily_kcal",
        "dailyKcal"
      );

      await setDoc(dailyKcalDocRef, { dailyKcal }, { merge: true });

      console.log("Daily Kcal updated!");
    }
  };

  return (
    <>
      <NavBar />
      <h1>Settings</h1>
      <h2>{user?.email}</h2>
      <div>
        <label htmlFor="displayName">Display Name: </label>
        <input
          type="text"
          id="displayName"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <button onClick={handleSaveDisplayName}>Save</button>
      </div>
      <div>
        <label htmlFor="dailyKcal">Daily kcal: </label>
        <input
          type="number"
          id="dailyKcal"
          value={dailyKcal}
          onChange={(e) => setDailyKcal(e.target.value)}
        />
        <button onClick={handleSaveDailyKcal}>Save</button>
      </div>
    </>
  );
}
