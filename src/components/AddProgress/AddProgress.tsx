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

  // Helper function to replace "," with "." and allow only one "."
  const sanitizeInput = (value: string) => {
    // Replace commas with dots
    value = value.replace(",", ".");

    // Allow only one "." in the value
    const dotCount = (value.match(/\./g) || []).length;
    return dotCount > 1 ? "" : value; // Return empty string if there are more than one "."
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(sanitizeInput(e.target.value));
  };

  const handleDimensionAChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDimensionA(sanitizeInput(e.target.value));
  };

  const handleDimensionBChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDimensionB(sanitizeInput(e.target.value));
  };

  const handleDimensionCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDimensionC(sanitizeInput(e.target.value));
  };

  const handleDimensionDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDimensionD(sanitizeInput(e.target.value));
  };

  const handleAddProgress = async () => {
    if (weight !== "") {
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
          step="0.1"
          onChange={handleWeightChange}
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
          step="0.1"
          onChange={handleDimensionAChange}
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
          step="0.1"
          onChange={handleDimensionBChange}
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
          step="0.1"
          onChange={handleDimensionCChange}
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
          step="0.1"
          onChange={handleDimensionDChange}
        />
      </div>
      {addedStatus ? <p>Progress added!</p> : null}
      {weightStatus ? <p>Add weight!</p> : null}
      <button onClick={handleAddProgress}>Save</button>
    </>
  );
}
