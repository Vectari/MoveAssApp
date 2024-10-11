import { useNavigate } from "react-router-dom";
import { NavBar } from "../../components/NavBar/NavBar";
import { useEffect, useState } from "react";
import { auth, db } from "../../library/firebaseConfig"; // Add Firestore (db) import
import { onAuthStateChanged, User, updateProfile } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; // Firestore functions
import { LanguageSelect } from "../../components/LanguageSelect/LanguageSelect";

export function Settings() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState<string>("");
  const [dailyKcal, setDailyKcal] = useState<string>("");
  const [weightTarget, setWeightTarget] = useState<string>("");

  const [showDailyKcal, setShowDailyKcal] = useState<boolean>(Boolean);
  const [showDailyKcalStreak, setShowDailyKcalStreak] = useState<boolean>(true);
  const [showWeightTarget, setShowWeightTarget] = useState<boolean>(true);
  const [showDimChart, setShowDimChart] = useState<boolean>(true);
  const [showWeightChart, setShowWeightChart] = useState<boolean>(true);

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
        const userWeightDoc = await getDoc(
          doc(db, "users", userId, "weight_target", "weightTarget")
        );

        const userShowDailyKcalDoc = await getDoc(
          doc(db, "users", userId, "show_hide", "showDailyKcal")
        );

        if (userDoc.exists()) {
          setDisplayName(userDoc.data().displayName || "");
        }

        if (userKcalDoc.exists()) {
          const kcalData = userKcalDoc.data();
          setDailyKcal(kcalData?.dailyKcal || ""); // Ensure kcalData is defined before accessing dailyKcal
        }

        if (userWeightDoc.exists()) {
          const weightData = userWeightDoc.data();
          setWeightTarget(weightData?.weightTarget || ""); // Ensure kcalData is defined before accessing dailyKcal
        }

        if (userShowDailyKcalDoc.exists()) {
          const showDailyKcalData = userShowDailyKcalDoc.data();
          setShowDailyKcal(showDailyKcalData?.showDailyKcal);
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

  const handleSaveWeightTarget = async () => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;

      // Reference to the "daily_kcal" subcollection under the user's document
      const weightTargetRef = doc(
        db,
        "users",
        userId,
        "weight_target",
        "weightTarget"
      );

      await setDoc(weightTargetRef, { weightTarget }, { merge: true });

      console.log("Weight target updated!");
    }
  };

  const handleShowDailyKcal = async (checked: boolean) => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;

      const showDailyKcalRef = doc(
        db,
        "users",
        userId,
        "show_hide",
        "showDailyKcal"
      );

      await setDoc(
        showDailyKcalRef,
        { showDailyKcal: checked },
        { merge: true }
      );
      console.log("Show Daily Kcal updated!");
    }
  };

  // Checkbox change handler
  const handleShowDailyKcalCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = e.target.checked;
    setShowDailyKcal(checked);
    handleShowDailyKcal(checked);
  };

  return (
    <>
      <NavBar />
      <LanguageSelect />
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
      <div>
        <label htmlFor="weightTarget">Weight target: </label>
        <input
          type="number"
          id="weightTarget"
          value={weightTarget}
          onChange={(e) => setWeightTarget(e.target.value)}
        />
        <button onClick={handleSaveWeightTarget}>Save</button>
      </div>
      <div>
        <input
          type="checkbox"
          id="showDailyKcal"
          checked={showDailyKcal}
          onChange={handleShowDailyKcalCheckboxChange}
        />
        <label htmlFor="showDailyKcal">showDailyKcal</label>
        <br />
        <input type="checkbox" id="showDailyKcalStreak" />
        <label htmlFor="showDailyKcalStreak">showDailyKcalStreak</label>
        <br />
        <input type="checkbox" id="showWeightTarget" />
        <label htmlFor="showWeightTarget">showWeightTarget</label>
        <br />
        <input type="checkbox" id="showDimChart" />
        <label htmlFor="showDimChart">showDimChart</label>
        <br />
        <input type="checkbox" id="showWeightChart" />
        <label htmlFor="showWeightChart">showWeightChart</label>
      </div>
    </>
  );
}
