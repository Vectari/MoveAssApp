import { useState } from "react";
import { auth, db } from "../../library/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useTranslation } from "../../hooks/useTranslation";
import { useAtom } from "jotai";
import {
  atomDimensionAName,
  atomDimensionBName,
  atomDimensionCName,
  atomDimensionDName,
} from "../../atoms/atoms";
import { SaveButton } from "../SaveButton/SaveButton";

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
  const [dimensionAName] = useAtom(atomDimensionAName);
  const [dimensionBName] = useAtom(atomDimensionBName);
  const [dimensionCName] = useAtom(atomDimensionCName);
  const [dimensionDName] = useAtom(atomDimensionDName);
  const [dimensionA, setDimensionA] = useState("");
  const [dimensionB, setDimensionB] = useState("");
  const [dimensionC, setDimensionC] = useState("");
  const [dimensionD, setDimensionD] = useState("");
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
      <h2>{translate("AddProgress", "title")}</h2>
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
          {dimensionAName === ""
            ? translate("AddProgress", "dimensionA")
            : dimensionAName}
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
          {dimensionBName === ""
            ? translate("AddProgress", "dimensionB")
            : dimensionBName}
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
          {dimensionCName === ""
            ? translate("AddProgress", "dimensionC")
            : dimensionCName}
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
          {dimensionDName === ""
            ? translate("AddProgress", "dimensionD")
            : dimensionDName}
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
      {addedStatus ? <p>{translate("AddProgress", "addedStatus")}</p> : null}
      {weightStatus ? <p>{translate("AddProgress", "weightStatus")}</p> : null}
      {dimensionStatus ? (
        <p>{translate("AddProgress", "dimensionStatus")}</p>
      ) : null}
      <SaveButton click={handleAddProgress} />
    </>
  );
}
