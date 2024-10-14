import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { atomShowWeightTarget } from "../../atoms/atoms";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../library/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export function WeightInfo() {
  // const [user, setUser] = useState<User | null>(null);
  // const [loaded, setLoaded] = useState<boolean>(false);
  const [weightTarget, setWeightTarget] = useState<string>("");
  const [showWeightTarget, setShowWeightTarget] =
    useAtom<boolean>(atomShowWeightTarget);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (auth.currentUser !== null) {
        // setUser(user);
        const userId = auth.currentUser.uid;
        const userDocRef = doc(db, "users", user!.uid);

        const userDoc = await getDoc(userDocRef);

        const userShowWeightTargetDoc = await getDoc(
          doc(db, "users", userId, "show_hide", "showWeightTarget")
        );

        if (userShowWeightTargetDoc.exists()) {
          const showWeightTargetData = userShowWeightTargetDoc.data();
          setShowWeightTarget(showWeightTargetData?.showWeightTarget);
          // setLoaded(true);
        }

        if (userDoc.exists()) {
          const userId = auth.currentUser.uid;

          const userWeightDoc = await getDoc(
            doc(db, "users", userId, "weight_target", "weightTarget")
          );

          const weightData = userWeightDoc.data();
          setWeightTarget(weightData?.weightTarget || "");
          // setLoaded(true);
        }
      }
    });

    return () => unsubscribe();
  }, [setShowWeightTarget]);

  return (
    <>
      <h3>Weight Info:</h3>
      {showWeightTarget && (
        <div>
          Weight target: <span>{weightTarget}</span>
        </div>
      )}
      <p>latest weight</p>
      <p>weight to loose</p>
    </>
  );
}
