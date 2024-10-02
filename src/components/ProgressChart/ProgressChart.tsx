import { collection, query, getDocs } from "firebase/firestore";
import { auth, db } from "../../library/firebaseConfig";
import { useEffect, useState } from "react";

// Define an interface for your progress data
interface ProgressData {
  date: string; // Adjust the types based on your actual data structure
  dimensionA: number; // Change to the appropriate type
  dimensionB: number; // Change to the appropriate type
  dimensionC: number; // Change to the appropriate type
  dimensionD: number; // Change to the appropriate type
  weight: number; // Change to the appropriate type
}

export function ProgressChart() {
  const [data, setData] = useState<ProgressData[]>([]); // Use the interface for the state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userId = user.uid;
        const q = query(collection(db, "users", userId, "progress"));
        try {
          const querySnapshot = await getDocs(q);

          const progressData: ProgressData[] = []; // Use the interface for temporary array

          querySnapshot.forEach((doc) => {
            const docId = doc.id;

            if (docId >= "2023-10-01") {
              const data = doc.data() as ProgressData; // Assert the type of the data
              progressData.push(data); // Push the typed data
            }
          });

          setData(progressData); // Set the state with the array of data
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
      <div>
        {data.length > 0 ? (
          data.map(
            (
              { date, dimensionA, dimensionB, dimensionC, dimensionD, weight },
              index
            ) => (
              <div key={index}>
                <p>Date: {date}</p>
                <p>Dimension A: {dimensionA}</p>
                <p>Dimension B: {dimensionB}</p>
                <p>Dimension C: {dimensionC}</p>
                <p>Dimension D: {dimensionD}</p>
                <p>Weight: {weight}</p>
              </div>
            )
          )
        ) : (
          <p>No data available</p>
        )}
      </div>
    </>
  );
}
