import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../../library/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../../components/NavBar/NavBar";
import { doc, getDoc } from "firebase/firestore";
import { Portal } from "../../components/Portal/Portal";
import { AddProgress } from "../../components/AddProgress/AddProgress";
import { ProgressChart } from "../../components/ProgressChart/ProgressChart";
import { KcalStreak } from "../../components/KcalStreak/KcalStreak";
import {
  atomShowDailyKcal,
  atomShowDailyKcalStreak,
  atomShowWeightTarget,
} from "../../atoms/atoms";
import { useAtom } from "jotai";

export function UserPanel() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState<string>("");
  const [dailyKcal, setDailyKcal] = useState<string>("");
  const [weightTarget, setWeightTarget] = useState<string>("");
  const [isPortalOpen, setIsPortalOpen] = useState<boolean>(false);

  const [showDailyKcal] = useAtom(atomShowDailyKcal);
  const [showDailyKcalStreak] = useAtom(atomShowDailyKcalStreak);
  const [showWeightTarget] = useAtom(atomShowWeightTarget);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (auth.currentUser === null) {
        navigate("/login");
      } else {
        setUser(user);
        const userDocRef = doc(db, "users", user!.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setDisplayName(userDoc.data().displayName || "");

          const userId = auth.currentUser.uid;

          const userKcalDoc = await getDoc(
            doc(db, "users", userId, "daily_kcal", "dailyKcal")
          );
          const kcalData = userKcalDoc.data();
          setDailyKcal(kcalData?.dailyKcal || "");

          const userWeightDoc = await getDoc(
            doc(db, "users", userId, "weight_target", "weightTarget")
          );
          const weightData = userWeightDoc.data();
          setWeightTarget(weightData?.weightTarget || "");
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <>
      <NavBar />
      <h1>Have a nice day {displayName} !</h1>
      <div>Mail: {user?.email}</div>
      {showDailyKcal && <div>Daily kcal: {dailyKcal}</div>}
      {showDailyKcalStreak && <KcalStreak />}
      {showWeightTarget && <div>Weight target: {weightTarget}</div>}

      <button onClick={() => setIsPortalOpen(true)}>Open Portal</button>
      {isPortalOpen && (
        <Portal onClose={() => setIsPortalOpen(false)}>
          <AddProgress />
        </Portal>
      )}
      <ProgressChart />
    </>
  );
}
