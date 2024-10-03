import { useState } from "react";
import { auth, db } from "../../library/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useTranslation } from "../../hooks/useTranslation";

// Utility function to get current date in 'YYYY-MM-DD' format
const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export function AddProgress() {
  const { translate } = useTranslation();
  const [weight, setWeight] = useState<string>("");
  const [dimensionA, setDimensionA] = useState<string>("");
  const [dimensionB, setDimensionB] = useState<string>("");
  const [dimensionC, setDimensionC] = useState<string>("");
  const [dimensionD, setDimensionD] = useState<string>("");
  const [addedStatus, setAddedStatus] = useState<boolean>(false);
  const [weightStatus, setWeightStatus] = useState<boolean>(false);

  const handleAddProgress = async () => {
    if (weight != "") {
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
        setWeightStatus(false);
        setAddedStatus(true);
        console.log("Progress added!");
        window.location.reload();
      }
    } else {
      setWeightStatus(true);
    }
  };

  return (
    <>
      <h2>Add Progress</h2>
      <div>
        <label htmlFor="dailyWeight">
          {translate("AddProgress", "weight")}:{" "}
        </label>
        <input
          type="number"
          id="dailyWeight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="dimensionA">
          {translate("AddProgress", "dimensionA")}:{" "}
        </label>
        <input
          type="number"
          id="dimensionA"
          value={dimensionA}
          onChange={(e) => setDimensionA(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="dimensionB">
          {translate("AddProgress", "dimensionB")}:{" "}
        </label>
        <input
          type="number"
          id="dimensionB"
          value={dimensionB}
          onChange={(e) => setDimensionB(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="dimensionC">
          {translate("AddProgress", "dimensionC")}:{" "}
        </label>
        <input
          type="number"
          id="dimensionC"
          value={dimensionC}
          onChange={(e) => setDimensionC(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="dimensionD">
          {translate("AddProgress", "dimensionD")}:{" "}
        </label>
        <input
          type="number"
          id="dimensionD"
          value={dimensionD}
          onChange={(e) => setDimensionD(e.target.value)}
        />
      </div>
      {addedStatus ? <p>Progress added!</p> : null}
      {weightStatus ? <p>Add weight!</p> : null}
      <button onClick={handleAddProgress}>Save</button>
    </>
  );
}
