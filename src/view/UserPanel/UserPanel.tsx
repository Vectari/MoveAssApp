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
  atomWeightTarget,
} from "../../atoms/atoms";
import { useAtom } from "jotai";
import { Loader } from "../../components/Loader/Loader";
import { WeightInfo } from "../../components/WeightInfo/WeightInfo";

export function UserPanel() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [dailyKcal, setDailyKcal] = useState<string>("");
  const [weightTarget, setWeightTarget] = useAtom<number>(atomWeightTarget);
  const [isPortalOpen, setIsPortalOpen] = useState<boolean>(false);

  const [showDailyKcal, setShowDailyKcal] = useAtom<boolean>(atomShowDailyKcal);
  const [showDailyKcalStreak, setShowDailyKcalStreak] = useAtom<boolean>(
    atomShowDailyKcalStreak
  );
  const [showWeightTarget, setShowWeightTarget] =
    useAtom<boolean>(atomShowWeightTarget);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (auth.currentUser === null) {
        navigate("/login");
      } else {
        setUser(user);
        const userId = auth.currentUser.uid;
        const userDocRef = doc(db, "users", user!.uid);

        const userDoc = await getDoc(userDocRef);

        const userShowDailyKcalDoc = await getDoc(
          doc(db, "users", userId, "show_hide", "showDailyKcal")
        );

        const userShowDailyKcalStrekDoc = await getDoc(
          doc(db, "users", userId, "show_hide", "showDailyKcalStreak")
        );

        const userShowWeightTargetDoc = await getDoc(
          doc(db, "users", userId, "show_hide", "showWeightTarget")
        );

        if (userShowDailyKcalDoc.exists()) {
          const showDailyKcalData = userShowDailyKcalDoc.data();
          setShowDailyKcal(showDailyKcalData?.showDailyKcal);
          setLoaded(true);
        }

        if (userShowDailyKcalStrekDoc.exists()) {
          const showDailyKcalStrekData = userShowDailyKcalStrekDoc.data();
          setShowDailyKcalStreak(showDailyKcalStrekData?.showDailyKcalStreak);
          setLoaded(true);
        }

        if (userShowWeightTargetDoc.exists()) {
          const showWeightTargetData = userShowWeightTargetDoc.data();
          setShowWeightTarget(showWeightTargetData?.showWeightTarget);
          setLoaded(true);
        }

        if (userDoc.exists()) {
          const userId = auth.currentUser.uid;

          const userKcalDoc = await getDoc(
            doc(db, "users", userId, "daily_kcal", "dailyKcal")
          );

          const kcalData = userKcalDoc.data();
          setDailyKcal(kcalData?.dailyKcal || "");
          setLoaded(true);

          const userWeightDoc = await getDoc(
            doc(db, "users", userId, "weight_target", "weightTarget")
          );

          const weightData = userWeightDoc.data();
          setWeightTarget(weightData?.weightTarget || "");
          setLoaded(true);
        }
      }
    });

    return () => unsubscribe();
  }, [navigate, setShowDailyKcal, setShowDailyKcalStreak, setShowWeightTarget, setWeightTarget]);

  return (
    <>
      <Loader description={"user data"} toCheck={loaded} />
      <NavBar />
      <h1>Hello {user?.displayName} !</h1>
      {showDailyKcal && (
        <div>
          Daily kcal: <span>{dailyKcal}</span>
        </div>
      )}
      {showDailyKcalStreak && <KcalStreak />}
      {showWeightTarget && (
        <div>
          Weight target: <span>{weightTarget}</span>
        </div>
      )}

      <button onClick={() => setIsPortalOpen(true)}>Open Portal</button>
      {isPortalOpen && (
        <Portal onClose={() => setIsPortalOpen(false)}>
          <AddProgress />
        </Portal>
      )}
      <hr />
      <WeightInfo />
      <hr />
      <ProgressChart />
    </>
  );
}
