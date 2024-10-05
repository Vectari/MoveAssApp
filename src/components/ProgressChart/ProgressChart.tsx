import { collection, query, getDocs } from "firebase/firestore";
import { auth, db } from "../../library/firebaseConfig";
import { useEffect, useState } from "react";
import Chart from "chart.js/auto";

// Define an interface for your progress data
interface ProgressData {
  date: string; // Adjust the types based on your actual data structure
  dimensionA: string | null; // Change to the appropriate type
  dimensionB: string | null; // Change to the appropriate type
  dimensionC: string | null; // Change to the appropriate type
  dimensionD: string | null; // Change to the appropriate type
  weight: string | null; // Change to the appropriate type
}

export function ProgressChart() {
  const [data, setData] = useState<ProgressData[]>([]); // Use the interface for the state
  const [latestWeight, setLatestWeight] = useState<number>(0); // State to hold the latest weight value

  const weightTarget = 130;
  const currentWeight = latestWeight; // Use the latest weight if available, fallback to 150

  const weightProgressStatus =
    currentWeight - weightTarget > 0
      ? `Do schudnięcia: ${currentWeight - weightTarget} kg`
      : `${currentWeight - weightTarget} kg poniżej wagi docelowej `;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userId = user.uid;
        const q = query(collection(db, "users", userId, "progress"));
        try {
          const querySnapshot = await getDocs(q);

          const progressData: ProgressData[] = []; // Use the interface for temporary array

          querySnapshot.forEach((doc) => {
            const data = doc.data() as ProgressData; // Assert the type of the data
            progressData.push(data); // Push the typed data
          });

          setData(progressData); // Set the state with the array of data

          // Find the latest weight based on the date
          if (progressData.length > 0) {
            const latestEntry = progressData.reduce((latest, entry) => {
              return entry.date > latest.date ? entry : latest;
            });

            setLatestWeight(parseFloat(latestEntry.weight || "0")); // Parse and set the latest weight
          }
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

  // Create chart once data is loaded
  useEffect(() => {
    if (data.length > 0) {
      const ctx = document.getElementById("dim") as HTMLCanvasElement;
      new Chart(ctx, {
        type: "line",
        data: {
          labels: data.map(({ date }) => date), // Array of dates
          datasets: [
            {
              label: "DimensionA",
              backgroundColor: "rgba(108, 202, 124, 0.2)",
              borderColor: "#ebb236",
              borderWidth: 1,
              data: data.map(({ dimensionA }) =>
                dimensionA === "" || dimensionA === null ? null : dimensionA
              ),
            },
            {
              label: "DimensionB",
              backgroundColor: "rgba(108, 202, 124, 0.2)",
              borderColor: "#ebb236",
              borderWidth: 1,
              data: data.map(({ dimensionB }) =>
                dimensionB === "" || dimensionB === null ? null : dimensionB
              ),
            },
            {
              label: "DimensionC",
              backgroundColor: "rgba(108, 202, 124, 0.2)",
              borderColor: "#ebb236",
              borderWidth: 1,
              data: data.map(({ dimensionC }) =>
                dimensionC === "" || dimensionC === null ? null : dimensionC
              ),
            },
            {
              label: "DimensionD",
              backgroundColor: "rgba(108, 202, 124, 0.2)",
              borderColor: "#ebb236",
              borderWidth: 1,
              data: data.map(({ dimensionD }) =>
                dimensionD === "" || dimensionD === null ? null : dimensionD
              ),
            },
          ],
        },
        options: {
          responsive: true,
        },
      });
    }
  }, [data]); // Chart is created once data changes

  useEffect(() => {
    if (data.length > 0) {
      const ctx = document.getElementById("weight") as HTMLCanvasElement;

      // Plugin to draw a static line at the weight target value
      const staticLinePlugin = {
        id: "staticLine",
        afterDraw: (chart: Chart<"line">) => {
          const yScale = chart.scales["y"]; // Access the y-axis scale
          const yValue = yScale.getPixelForValue(weightTarget); // Convert value (weight target) to pixels

          const ctx = chart.ctx;
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(chart.chartArea.left, yValue);
          ctx.lineTo(chart.chartArea.right, yValue);
          ctx.strokeStyle = "rgba(255, 99, 132, 0.75)"; // Color of the line
          ctx.lineWidth = 3; // Width of the line
          ctx.stroke();
          ctx.restore();
        },
      };

      // Create the chart
      new Chart(ctx, {
        type: "line",
        data: {
          labels: data.map(({ date }) => date), // Array of dates
          datasets: [
            {
              label: "Weight",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
              data: data.map(({ weight }) =>
                weight === "" || weight === null ? null : weight
              ),
            },
            {
              label: `Weight Target: ${weightTarget} kg Status: ${weightProgressStatus}`,
              backgroundColor: "rgba(255, 99, 132, 0.75)",
              data: null,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true, // Ensures the chart starts at 0
            },
          },
        },
        plugins: [staticLinePlugin], // Add the custom static line plugin
      });
    }
  }, [data, weightProgressStatus]);

  return (
    <>
      <h1>Progress Chart</h1>
      <div>
        <canvas id="dim"></canvas>
      </div>
      <div>
        <canvas id="weight"></canvas>
      </div>
      <div>
        <p>
          Latest Weight:{" "}
          {latestWeight ? latestWeight + " kg" : "No data available"}
        </p>
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
