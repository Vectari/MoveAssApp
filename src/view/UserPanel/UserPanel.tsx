import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../../library/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../../components/NavBar/NavBar";
import { doc, getDoc } from "firebase/firestore";
import { ProgressChart } from "../../components/ProgressChart/ProgressChart";
import { KcalStreak } from "../../components/KcalStreak/KcalStreak";
import { atomShowDailyKcal, atomShowDailyKcalStreak } from "../../atoms/atoms";
import { useAtom } from "jotai";
import { Loader } from "../../components/Loader/Loader";
import { WeightInfo } from "../../components/WeightInfo/WeightInfo";
import { useTranslation } from "../../hooks/useTranslation";
import { UserPanelWrapper } from "./UserPanel.styled";

export function UserPanel() {
  const { translate } = useTranslation();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [dailyKcal, setDailyKcal] = useState<string>("");
  const [showDailyKcal, setShowDailyKcal] = useAtom<boolean>(atomShowDailyKcal);
  const [showDailyKcalStreak, setShowDailyKcalStreak] = useAtom<boolean>(
    atomShowDailyKcalStreak
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (auth.currentUser === null) {
        navigate("/login");
      } else {
        setUser(user);
        const userId = auth.currentUser.uid;
        const userDocRef = doc(db, "users", user!.uid);

        const userDoc = await getDoc(userDocRef);

        // const userShowWeightInfo = await getDoc(
        //   doc(db, "users", userId, "show_hide", "showDailyInfo")
        // );

        const userShowDailyKcalDoc = await getDoc(
          doc(db, "users", userId, "show_hide", "showDailyKcal")
        );

        const userShowDailyKcalStrekDoc = await getDoc(
          doc(db, "users", userId, "show_hide", "showDailyKcalStreak")
        );

        // if (userShowWeightInfo.exists()) {
        //   const showWeightInfoData = userShowWeightInfo.data();
        //   setShowWeightInfo(showWeightInfoData?.showWeightInfo);
        //   setLoaded(true);
        // }

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

        if (userDoc.exists()) {
          const userId = auth.currentUser.uid;

          const userKcalDoc = await getDoc(
            doc(db, "users", userId, "daily_kcal", "dailyKcal")
          );

          const kcalData = userKcalDoc.data();
          setDailyKcal(kcalData?.dailyKcal || "");
          setLoaded(true);
        }
      }
    });

    return () => unsubscribe();
  }, [navigate, setShowDailyKcal, setShowDailyKcalStreak]);

  return (
    <>
      <Loader
        description={translate("Loader", "descriptionUserData")}
        toCheck={loaded}
      />
      <UserPanelWrapper>
        <NavBar />
        <h1>
          {translate("UserPanel", "hello")} {user?.displayName} !
        </h1>
        {showDailyKcal && (
          <div>
            {translate("UserPanel", "dailyKcal")}: <span>{dailyKcal}</span>
          </div>
        )}
        {showDailyKcalStreak && <KcalStreak />}
        <WeightInfo />
        <ProgressChart />
      </UserPanelWrapper>
    </>
  );
}
