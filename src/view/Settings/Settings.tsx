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
        const userId = auth.currentUser.uid;

        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, "users", userId));
        const userKcalDoc = await getDoc(
          doc(db, "users", userId, "daily_kcal", "dailyKcal")
        );
        const userWeightDoc = await getDoc(
          doc(db, "users", userId, "weight_target", "weightTarget")
        );

        // Fetch visibility settings
        const visibilitySettings = [
          "showDailyKcal",
          "showDailyKcalStreak",
          "showWeightInfo",
          "showDimChart",
          "showWeightChart",
        ];
        const visibilityPromises = visibilitySettings.map((setting) =>
          getDoc(doc(db, "users", userId, "show_hide", setting))
        );

        const visibilityDocs = await Promise.all(visibilityPromises);

        // Set state based on fetched data
        if (userDoc.exists()) {
          setDisplayName(userDoc.data().displayName || "");
        }
        if (userKcalDoc.exists()) {
          setDailyKcal(userKcalDoc.data()?.dailyKcal || "");
        }
        if (userWeightDoc.exists()) {
          setWeightTarget(userWeightDoc.data()?.weightTarget || "");
        }
        visibilityDocs.forEach((doc, index) => {
          if (doc.exists()) {
            const key = visibilitySettings[index];
            const value = doc.data()[key];
            if (key === "showDailyKcal") setShowDailyKcal(value);
            if (key === "showDailyKcalStreak") setShowDailyKcalStreak(value);
            if (key === "showWeightInfo") setShowWeightInfo(value);
            if (key === "showDimChart") setShowDimChart(value);
            if (key === "showWeightChart") setShowWeightChart(value);
          }
        });
        setLoaded(true);
      }
    });

    return () => unsubscribe();
  }, [
    navigate,
    setShowDailyKcal,
    setShowDailyKcalStreak,
    setShowDimChart,
    setShowWeightChart,
    setShowWeightInfo,
    setWeightTarget,
  ]);

  const handleSaveDisplayName = async () => {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName });
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await setDoc(userDocRef, { displayName }, { merge: true });
      console.log("Display Name updated!");
    }
  };

  const handleSaveDailyKcal = async () => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
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

  const handleVisibilityChange = async (setting: string, checked: boolean) => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const visibilityRef = doc(db, "users", userId, "show_hide", setting);
      await setDoc(visibilityRef, { [setting]: checked }, { merge: true });
      console.log(`${setting} updated!`);
    }
  };

  // Input validation for dailyKcal and weightTarget
  const handleDailyKcalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^\d*\.?\d{0,1}$/; // Match numbers with up to two decimal places
    if (value === "" || regex.test(value)) {
      setDailyKcal(value);
    }
  };

  const handleWeightTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^\d*\.?\d{0,1}$/; // Match numbers with up to two decimal places
    if (value === "" || regex.test(value)) {
      setWeightTarget(value);
    }
  };

  // Checkbox change handlers
  const handleShowDailyKcalCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = e.target.checked;
    setShowDailyKcal(checked);
    handleVisibilityChange("showDailyKcal", checked);
  };

  const handleShowDailyKcalStreakCheckBoxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = e.target.checked;
    setShowDailyKcalStreak(checked);
    handleVisibilityChange("showDailyKcalStreak", checked);
  };

  const handleShowWeightInfoCheckBoxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = e.target.checked;
    setShowWeightInfo(checked);
    handleVisibilityChange("showWeightInfo", checked);
  };

  const handleShowDimChartCheckBoxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = e.target.checked;
    setShowDimChart(checked);
    handleVisibilityChange("showDimChart", checked);
  };

  const handleShowWeightChartCheckBoxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = e.target.checked;
    setShowWeightChart(checked);
    handleVisibilityChange("showWeightChart", checked);
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
          onChange={handleDailyKcalChange} // Updated to use the new validation function
        />
        <button onClick={handleSaveDailyKcal}>Save</button>
      </div>
      <div>
        <label htmlFor="weightTarget">Weight target: </label>
        <input
          type="number"
          id="weightTarget"
          value={weightTarget}
          onChange={handleWeightTargetChange} // Updated to use the new validation function
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
        <label htmlFor="showDailyKcal">Show Daily Kcal</label>
        <br />
        <input
          type="checkbox"
          id="showDailyKcalStreak"
          checked={showDailyKcalStreak}
          onChange={handleShowDailyKcalStreakCheckBoxChange}
        />
        <label htmlFor="showDailyKcalStreak">Show Daily Kcal Streak</label>
        <br />
        <input
          type="checkbox"
          id="showWeightInfo"
          checked={showWeightInfo}
          onChange={handleShowWeightInfoCheckBoxChange}
        />
        <label htmlFor="showWeightInfo">Show Weight Info</label>
        <br />
        <input
          type="checkbox"
          id="showDimChart"
          checked={showDimChart}
          onChange={handleShowDimChartCheckBoxChange}
        />
        <label htmlFor="showDimChart">Show Dim Chart</label>
        <br />
        <input
          type="checkbox"
          id="showWeightChart"
          checked={showWeightChart}
          onChange={handleShowWeightChartCheckBoxChange}
        />
        <label htmlFor="showWeightChart">Show Weight Chart</label>
      </div>
      <hr />
      {/* 
      //
       //
        // 
        //
         //
          */}
      <div>
        <label htmlFor="dimenstionA">Dimension A: </label>
        <input
          type="string"
          id="dimenstionA"
          value={dimenstionA}
          onChange={handleDimenstionAChange} // Updated to use the new validation function
        />
        <button onClick={handleSaveDimenstionA}>Save</button>
      </div>
      <div>
        <label htmlFor="dimenstionB">Dimension B: </label>
        <input
          type="string"
          id="dimenstionB"
          value={dimenstionB}
          onChange={handleDimenstionBChange} // Updated to use the new validation function
        />
        <button onClick={handleSaveDimenstionB}>Save</button>
      </div>
      <div>
        <label htmlFor="dimenstionC">Dimension C: </label>
        <input
          type="string"
          id="dimenstionC"
          value={dimenstionC}
          onChange={handleDimenstionCChange} // Updated to use the new validation function
        />
        <button onClick={handleSaveDimenstionC}>Save</button>
      </div>
      <div>
        <label htmlFor="dimenstionD">Dimension D: </label>
        <input
          type="string"
          id="dimenstionD"
          value={dimenstionD}
          onChange={handleDimenstionDChange} // Updated to use the new validation function
        />
        <button onClick={handleSaveDimenstionD}>Save</button>
      </div>
    </>
  );
}
