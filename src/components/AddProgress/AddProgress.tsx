import { useState } from "react";
import { auth, db } from "../../library/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useTranslation } from "../../hooks/useTranslation";
import { useAtom } from "jotai";
import {
  atomDimensionA,
  atomDimensionB,
  atomDimensionC,
  atomDimensionD,
} from "../../atoms/atoms";

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
  const [dimensionA, setDimensionA] = useAtom(atomDimensionA);
  const [dimensionB, setDimensionB] = useAtom(atomDimensionB);
  const [dimensionC, setDimensionC] = useAtom(atomDimensionC);
  const [dimensionD, setDimensionD] = useAtom(atomDimensionD);
  const [addedStatus, setAddedStatus] = useState<boolean>(false);
  const [weightStatus, setWeightStatus] = useState<boolean>(false);
  const [dimensionStatus, setDimensionStatus] = useState<boolean>(false);

  // Helper function to check if the value is valid
  const isValidInput = (value: string) => {
    const regex = /^\d*\.?\d{0,1}$/; // Allows numbers with at most one decimal place
    return regex.test(value);
  };

  const handleWeightInput = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (isValidInput(value)) {
      setWeight(value);
    }
  };

  const handleDimensionAInput = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (isValidInput(value)) {
      setDimensionA(value);
    }
  };

  const handleDimensionBInput = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (isValidInput(value)) {
      setDimensionB(value);
    }
  };

  const handleDimensionCInput = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (isValidInput(value)) {
      setDimensionC(value);
    }
  };

  const handleDimensionDInput = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (isValidInput(value)) {
      setDimensionD(value);
    }
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

    // Validate dimensions
    if (
      dimensionA !== "" &&
      dimensionB !== "" &&
      dimensionC !== "" &&
      dimensionD !== ""
    ) {
      setDimensionStatus(false);
    } else {
      setDimensionStatus(true);
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
          type="number" // Change to number to allow manual input control
          id="dailyWeight"
          value={weight}
          step="0.1"
          onInput={handleWeightInput}
        />
      </div>
      <div>
        <label htmlFor="dimensionA">
          {dimensionA === ""
            ? translate("AddProgress", "dimensionA")
            : dimensionA}
          {": "}
        </label>
        <input
          type="number" // Change to number to allow manual input control
          id="dimensionA"
          value={dimensionA}
          step="0.1"
          onInput={handleDimensionAInput}
        />
      </div>
      <div>
        <label htmlFor="dimensionB">
          {dimensionB === ""
            ? translate("AddProgress", "dimensionB")
            : dimensionB}
          {": "}
        </label>
        <input
          type="number" // Change to number to allow manual input control
          id="dimensionB"
          value={dimensionB}
          step="0.1"
          onInput={handleDimensionBInput}
        />
      </div>
      <div>
        <label htmlFor="dimensionC">
          {dimensionC === ""
            ? translate("AddProgress", "dimensionC")
            : dimensionC}
          {": "}
        </label>
        <input
          type="number" // Change to number to allow manual input control
          id="dimensionC"
          value={dimensionC}
          step="0.1"
          onInput={handleDimensionCInput}
        />
      </div>
      <div>
        <label htmlFor="dimensionD">
          {dimensionD === ""
            ? translate("AddProgress", "dimensionD")
            : dimensionD}
          {": "}
        </label>
        <input
          type="number" // Change to number to allow manual input control
          id="dimensionD"
          value={dimensionD}
          step="0.1"
          onInput={handleDimensionDInput}
        />
      </div>
      {addedStatus ? <p>Progress added!</p> : null}
      {weightStatus ? <p>Add weight!</p> : null}
      {dimensionStatus ? <p>Please fill in all dimensions!</p> : null}
      <button onClick={handleAddProgress}>Save</button>
    </>
  );
}
