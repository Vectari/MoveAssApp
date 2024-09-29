import { useState } from "react";
import { auth, db } from "../../library/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

// Utility function to get current date in 'YYYY-MM-DD' format
const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export function AddProgress() {
  const [weight, setWeight] = useState<string>("");
  const [dimensionA, setDimensionA] = useState<string>("");
  const [dimensionB, setDimensionB] = useState<string>("");
  const [dimensionC, setDimensionC] = useState<string>("");
  const [dimensionD, setDimensionD] = useState<string>("");

  const handleAddProgress = async () => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;

      // Get current date in 'YYYY-MM-DD' format
      const currentDate = getCurrentDate();

      // Reference to the "progress" subcollection, with each document named by the current date
      const progressRef = doc(db, "users", userId, "progress", currentDate);

      // Save the weight and dimensions along with the current date
      await setDoc(
        progressRef,
        {
          weight,
          dimensionA,
          dimensionB,
          dimensionC,
          dimensionD,
          date: currentDate,
        },
        { merge: true }
      );

      console.log("Progress added!");
    }
  };

  return (
    <>
      <h2>Add Progress</h2>
      <div>
        <label htmlFor="dailyWeight">Weight: </label>
        <input
          type="number"
          id="dailyWeight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="dimensionA">Dimension A: </label>
        <input
          type="number"
          id="dimensionA"
          value={dimensionA}
          onChange={(e) => setDimensionA(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="dimensionB">Dimension B: </label>
        <input
          type="number"
          id="dimensionB"
          value={dimensionB}
          onChange={(e) => setDimensionB(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="dimensionC">Dimension C: </label>
        <input
          type="number"
          id="dimensionC"
          value={dimensionC}
          onChange={(e) => setDimensionC(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="dimensionD">Dimension D: </label>
        <input
          type="number"
          id="dimensionD"
          value={dimensionD}
          onChange={(e) => setDimensionD(e.target.value)}
        />
      </div>
      <button onClick={(handleAddProgress)}>Save</button>
    </>
  );
}
