import { useNavigate } from "react-router-dom";
import { NavBar } from "../../components/NavBar/NavBar";
import { useEffect, useState } from "react";
import { auth, db } from "../../library/firebaseConfig"; // Add Firestore (db) import
import { onAuthStateChanged, User, updateProfile } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; // Firestore functions
import { LanguageSelect } from "../../components/LanguageSelect/LanguageSelect";
import { useAtom } from "jotai";
import {
  atomShowDailyKcal,
  atomShowDailyKcalStreak,
  atomShowWeightInfo,
  atomShowDimChart,
  atomShowWeightChart,
  atomWeightTarget,
} from "../../atoms/atoms";
import { Loader } from "../../components/Loader/Loader";

export function Settings() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState<string>("");
  const [dailyKcal, setDailyKcal] = useState<string>("");
  const [weightTarget, setWeightTarget] = useAtom<string>(atomWeightTarget);
  const [loaded, setLoaded] = useState<boolean>(false);

  const [showDailyKcal, setShowDailyKcal] = useAtom<boolean>(atomShowDailyKcal);
  const [showDailyKcalStreak, setShowDailyKcalStreak] = useAtom<boolean>(
    atomShowDailyKcalStreak
  );
  const [showWeightInfo, setShowWeightInfo] =
    useAtom<boolean>(atomShowWeightInfo);
  const [showDimChart, setShowDimChart] = useAtom<boolean>(atomShowDimChart);
  const [showWeightChart, setShowWeightChart] =
    useAtom<boolean>(atomShowWeightChart);

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

        const userShowDailyKcalStrekDoc = await getDoc(
          doc(db, "users", userId, "show_hide", "showDailyKcalStreak")
        );

        const userShowWeightInfoDoc = await getDoc(
          doc(db, "users", userId, "show_hide", "showWeightInfo")
        );

        const userShowDimChartDoc = await getDoc(
          doc(db, "users", userId, "show_hide", "showDimChart")
        );

        const userShowWeightChartDoc = await getDoc(
          doc(db, "users", userId, "show_hide", "showWeightChart")
        );

        if (userDoc.exists()) {
          setDisplayName(userDoc.data().displayName || "");
          setLoaded(true);
        }

        if (userKcalDoc.exists()) {
          const kcalData = userKcalDoc.data();
          setDailyKcal(kcalData?.dailyKcal || ""); // Ensure kcalData is defined before accessing dailyKcal
          setLoaded(true);
        }

        if (userWeightDoc.exists()) {
          const weightData = userWeightDoc.data();
          setWeightTarget(weightData?.weightTarget || ""); // Ensure kcalData is defined before accessing dailyKcal
          setLoaded(true);
        }

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

        if (userShowWeightInfoDoc.exists()) {
          const showWeightInfoData = userShowWeightInfoDoc.data();
          setShowWeightInfo(showWeightInfoData?.showWeightInfo);
          setLoaded(true);
        }

        if (userShowDimChartDoc.exists()) {
          const showDimChartData = userShowDimChartDoc.data();
          setShowDimChart(showDimChartData?.showDimChart);
          setLoaded(true);
        }

        if (userShowWeightChartDoc.exists()) {
          const showWeightChartData = userShowWeightChartDoc.data();
          setShowWeightChart(showWeightChartData?.showWeightChart);
          setLoaded(true);
        }
      }
    });

    return () => unsubscribe();
  }, [navigate, setShowDailyKcal, setShowDailyKcalStreak, setShowDimChart, setShowWeightChart, setShowWeightInfo, setWeightTarget]);

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

  const handleShowDailyKcalStreak = async (checked: boolean) => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;

      const showDailyKcalStreakRef = doc(
        db,
        "users",
        userId,
        "show_hide",
        "showDailyKcalStreak"
      );

      await setDoc(
        showDailyKcalStreakRef,
        { showDailyKcalStreak: checked },
        { merge: true }
      );
      console.log("Show Daily Kcal Streak updated!");
    }
  };

  const handleShowWeightInfo = async (checked: boolean) => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;

      const showWeightInfoRef = doc(
        db,
        "users",
        userId,
        "show_hide",
        "showWeightInfo"
      );

      await setDoc(
        showWeightInfoRef,
        { showWeightInfo: checked },
        { merge: true }
      );
      console.log("Show Weight Target updated!");
    }
  };

  const handleShowDimChart = async (checked: boolean) => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;

      const showDimChrtRef = doc(
        db,
        "users",
        userId,
        "show_hide",
        "showDimChart"
      );

      await setDoc(showDimChrtRef, { showDimChart: checked }, { merge: true });
      console.log("Show Dim Chart updated!");
    }
  };

  const handleShowWeightChart = async (checked: boolean) => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;

      const showWeightChrtRef = doc(
        db,
        "users",
        userId,
        "show_hide",
        "showWeightChart"
      );

      await setDoc(
        showWeightChrtRef,
        { showWeightChart: checked },
        { merge: true }
      );
      console.log("Show Weight Chart updated!");
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

  const handleShowDailyKcalStreakCheckBoxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = e.target.checked;
    setShowDailyKcalStreak(checked);
    handleShowDailyKcalStreak(checked);
  };

  const handleShowWeightInfoCheckBoxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = e.target.checked;
    setShowWeightInfo(checked);
    handleShowWeightInfo(checked);
  };

  const handleShowDimChartCheckBoxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = e.target.checked;
    setShowDimChart(checked);
    handleShowDimChart(checked);
  };

  const handleShowWeightChartCheckBoxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = e.target.checked;
    setShowWeightChart(checked);
    handleShowWeightChart(checked);
  };

  return (
    <>
      <Loader description={"settings"} toCheck={loaded} />
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
        <input
          type="checkbox"
          id="showDailyKcalStreak"
          checked={showDailyKcalStreak}
          onChange={handleShowDailyKcalStreakCheckBoxChange}
        />
        <label htmlFor="showDailyKcalStreak">showDailyKcalStreak</label>
        <br />
        <input
          type="checkbox"
          id="showWeightInfo"
          checked={showWeightInfo}
          onChange={handleShowWeightInfoCheckBoxChange}
        />
        <label htmlFor="showWeightInfo">showWeightInfo</label>
        <br />
        <input
          type="checkbox"
          id="showDimChart"
          checked={showDimChart}
          onChange={handleShowDimChartCheckBoxChange}
        />
        <label htmlFor="showDimChart">showDimChart</label>
        <br />
        <input
          type="checkbox"
          id="showWeightChart"
          checked={showWeightChart}
          onChange={handleShowWeightChartCheckBoxChange}
        />
        <label htmlFor="showWeightChart">showWeightChart</label>
      </div>
    </>
  );
}
