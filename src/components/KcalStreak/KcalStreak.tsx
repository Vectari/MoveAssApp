import { useEffect, useState } from "react";
import { auth, db } from "../../library/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export function KcalStreak() {
  const [kcalStreak, setKcalStreak] = useState<number>(0);
  const [resetStreak, setResetStreak] = useState<number>(0);
  const [kcalStrikeResetInfo, setKcalStrikeResetInfo] =
    useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  // Function to calculate the number of milliseconds until midnight
  const getMillisecondsUntilMidnight = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0); // Set time to midnight
    return midnight.getTime() - now.getTime();
  };

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

          // Check if the button should be disabled based on the last click time
          if (storedLastClickTime) {
            const currentTime = Date.now();
            const millisecondsUntilMidnight = getMillisecondsUntilMidnight();
            const timeDifference = currentTime - storedLastClickTime;

            // Disable the button if the user has clicked today (before midnight)
            setIsButtonDisabled(timeDifference < millisecondsUntilMidnight);
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

      // Disable the button until midnight
      setIsButtonDisabled(true);

      console.log("Kcal Streak updated!");
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
      {isButtonDisabled && <p>You can only add +1 once a day.</p>}
    </>
  );
}
