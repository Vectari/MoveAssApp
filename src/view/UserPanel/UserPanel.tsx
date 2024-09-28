import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../../library/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../../components/NavBar/NavBar";
import { doc, getDoc } from "firebase/firestore";

export function UserPanel() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState<string>("");
  const [dailyKcal, setDailyKcal] = useState<string>("");

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
          setDailyKcal(userDoc.data().dailyKcal || "");
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <>
      <NavBar />
      <h1>User panel</h1>
      <div>Name: {displayName}</div>
      <div>Mail: {user?.email}</div>
      <div>Daily kcal: {dailyKcal}</div>
    </>
  );
}
