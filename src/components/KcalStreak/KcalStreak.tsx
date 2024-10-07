import { useEffect, useState } from "react";
import { auth, db } from "../../library/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export function KcalStreak() {
  const [kcalStreak, setKcalStreak] = useState<number>(0);
  const [resetStreak, setResetStreak] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async () => {
      if (auth.currentUser !== null) {
        const userId = auth.currentUser.uid;

        const kcalStreakDoc = await getDoc(
          doc(db, "users", userId, "daily_kcal", "kcalStreak")
        );

        if (kcalStreakDoc.exists()) {
          const kcalStreakData = kcalStreakDoc.data();
          setKcalStreak(kcalStreakData?.kcalStreak || ""); // Ensure kcalData is defined before accessing dailyKcal
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddStreak = async () => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const kcalStreakRef = doc(
        db,
        "users",
        userId,
        "daily_kcal",
        "kcalStreak"
      );

      // Fetch the current value from backend
      const kcalStreakDoc = await getDoc(kcalStreakRef);
      const currentStreak = kcalStreakDoc.exists()
        ? kcalStreakDoc.data().kcalStreak
        : 0;
      setKcalStreak(currentStreak);

      // Increment the streak locally
      const newStreak = currentStreak + 1;
      setKcalStreak(newStreak);

      // Update the backend with the new streak
      await setDoc(kcalStreakRef, { kcalStreak: newStreak }, { merge: true });

      console.log("Kcal Streak updated!");
    }
  };

  const handleResetStreak = () => {
    setResetStreak(resetStreak + 1);
    console.log(resetStreak);
    if (resetStreak === 0) {
      console.log("Click two more times");
    } else if (resetStreak === 2) {
      setResetStreak(0);
      setKcalStreak(0);
      console.log(resetStreak);
      console.log("RESET!!!");
    }
  };

  return (
    <>
      <p>Daily kcal Streak:</p>
      <p>{kcalStreak}</p>
      <button onClick={handleAddStreak}>Add +1</button>
      <button onClick={handleResetStreak}>Reset</button>
    </>
  );
}
