import { collection, query, getDocs } from "firebase/firestore";
import { auth, db } from "../../library/firebaseConfig";
import { useEffect } from "react";

export function ProgressChart() {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userId = user.uid;
        const q = query(collection(db, "users", userId, "progress"));
        try {
          const querySnapshot = await getDocs(q);

          querySnapshot.forEach((doc) => {
            const docId = doc.id;

            if (docId >= "2023-10-01") {
              console.log(docId, " => ", doc.data());
              console.log(doc.data());
            }
          });
        } catch (error) {
          console.error("Error fetching progress data: ", error);
        }
      } else {
        console.log("ERROR!! No user logged in");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <>
      <h1>Progress Chart</h1>
    </>
  );
}
