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
          const { kcalStreak, lastClickTime, timeToMidnight } = docSnap.data();
          setKcalStreak(kcalStreak || 0);

          console.log(lastClickTime + timeToMidnight - Date.now());

          if (lastClickTime) {
            setIsButtonDisabled(Date.now() < lastClickTime + timeToMidnight);
          }
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const getMillisecondsUntilMidnight = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0); // Set time to midnight
    return midnight.getTime() - now.getTime();
  };

  const handleAddStreak = async () => {
    if (auth.currentUser && !isButtonDisabled) {
      const userId = auth.currentUser.uid;
      const currentTimestamp = Date.now();
      const millisecondsUntilMidnight = getMillisecondsUntilMidnight();

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

      // Update the backend with the new streak, last click time, and time to midnight
      await setDoc(
        kcalStreakRef,
        {
          kcalStreak: newStreak,
          lastClickTime: currentTimestamp,
          timeToMidnight: millisecondsUntilMidnight,
        },
        { merge: true }
      );

      // Disable the button until midnight
      setIsButtonDisabled(true);
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
      <p>
        Daily kcal Streak: <span>{kcalStreak}</span>
      </p>
      <button onClick={handleAddStreak} disabled={isButtonDisabled}>
        Add +1
      </button>
      <button onClick={handleResetStreak}>Reset</button>
      <p>{kcalStrikeResetInfo ? "Two more times..." : null}</p>
      {isButtonDisabled && <p>You can only add +1 once a day.</p>}
    </>
  );
}
