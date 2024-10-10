import { useEffect, useState } from "react";
import { auth, db } from "../../library/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export function KcalStreak() {
  const [kcalStreak, setKcalStreak] = useState<number>(0);
  const [resetStreak, setResetStreak] = useState<number>(0);
  const [kcalStrikeResetInfo, setKcalStrikeResetInfo] =
    useState<boolean>(false);
  const [lastClickTime, setLastClickTime] = useState<number | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async () => {
      if (auth.currentUser !== null) {
        const userId = auth.currentUser.uid;

        const kcalStreakRef = doc(
          db,
          "users",
          userId,
          "daily_kcal",
          "kcalStreak"
        );
        const docSnap = await getDoc(kcalStreakRef);

        if (docSnap.exists()) {
          const { kcalStreak, lastClickTime: storedLastClickTime } =
            docSnap.data();
          setKcalStreak(kcalStreak || 0);
          setLastClickTime(storedLastClickTime || null);

          // Check if the button should be disabled (i.e., if 24 hours have passed since last click)
          if (storedLastClickTime) {
            const currentTime = Date.now();
            const timeDifference = currentTime - storedLastClickTime;
            const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
            setIsButtonDisabled(timeDifference < oneDay);
          }
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddStreak = async () => {
    if (auth.currentUser && !isButtonDisabled) {
      const userId = auth.currentUser.uid;
      const currentTimestamp = Date.now();
      const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day

      // Check if enough time has passed since the last click
      if (!lastClickTime || currentTimestamp - lastClickTime >= oneDay) {
        const kcalStreakRef = doc(
          db,
          "users",
          userId,
          "daily_kcal",
          "kcalStreak"
        );

        // Increment the streak locally
        const newStreak = kcalStreak + 1;
        setKcalStreak(newStreak);

        // Update the backend with the new streak and the current timestamp
        await setDoc(
          kcalStreakRef,
          {
            kcalStreak: newStreak,
            lastClickTime: currentTimestamp, // Store the current timestamp
          },
          { merge: true }
        );

        // Disable the button for the rest of the day
        setIsButtonDisabled(true);
        setLastClickTime(currentTimestamp);

        console.log("Kcal Streak updated!");
      } else {
        console.log("You can only add +1 once per day.");
      }
    }
  };

  const handleResetStreak = async () => {
    if (auth.currentUser) {
      setResetStreak(resetStreak + 1);
      if (resetStreak === 0) {
        setKcalStrikeResetInfo(true);
      } else if (resetStreak === 2) {
        setResetStreak(0);
        setKcalStrikeResetInfo(false);
        const newStreak = 0;
        setKcalStreak(newStreak);
        const userId = auth.currentUser.uid;

        const kcalStreakRef = doc(
          db,
          "users",
          userId,
          "daily_kcal",
          "kcalStreak"
        );

        await setDoc(kcalStreakRef, { kcalStreak: newStreak }, { merge: true });
      }
    }
  };

  return (
    <>
      <p>Daily kcal Streak:</p>
      <p>{kcalStreak}</p>
      <button onClick={handleAddStreak} disabled={isButtonDisabled}>
        Add +1
      </button>
      <button onClick={handleResetStreak}>Reset</button>
      <p>{kcalStrikeResetInfo ? "Two more times..." : null}</p>
      {isButtonDisabled && <p>You can only add +1 once per day.</p>}
    </>
  );
}
