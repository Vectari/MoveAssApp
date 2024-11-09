import Chart from "chart.js/auto";
import { collection, query, getDocs, getDoc, doc } from "firebase/firestore";
import { auth, db } from "../../library/firebaseConfig";
import { useEffect, useState } from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { useAtom } from "jotai";
import {
  atomLatestWeight,
  atomShowDimChart,
  atomShowWeightChart,
  atomDimensionAName,
  atomDimensionBName,
  atomDimensionCName,
  atomDimensionDName,
} from "../../atoms/atoms";
interface ProgressData {
  date: string;
  dimensionA: string | null;
  dimensionB: string | null;
  dimensionC: string | null;
  dimensionD: string | null;
  weight: string | null;
}

export function ProgressChart() {
  const { translate } = useTranslation();
  const [data, setData] = useState<ProgressData[]>([]);
  const [weightTarget, setWeightTarget] = useState<number>(0);
  const [latestWeight, setLatestWeight] = useAtom<number>(atomLatestWeight);

  const [showDimChart, setShowDimChart] = useAtom<boolean>(atomShowDimChart);
  const [showWeightChart, setShowWeightChart] =
    useAtom<boolean>(atomShowWeightChart);

  const [dimensionAName, setDimensionAName] = useAtom(atomDimensionAName);
  const [dimensionBName, setDimensionBName] = useAtom(atomDimensionBName);
  const [dimensionCName, setDimensionCName] = useAtom(atomDimensionCName);
  const [dimensionDName, setDimensionDName] = useAtom(atomDimensionDName);

  const weightProgressStatus =
    latestWeight - weightTarget > 0
      ? `${translate("ProgressChart", "toLose")}: ${(
          latestWeight - weightTarget
        ).toFixed(1)} kg`
      : `${(latestWeight - weightTarget).toFixed(1)} kg ${translate(
          "ProgressChart",
          "below"
        )}`;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userId = user.uid;
        const q = query(collection(db, "users", userId, "progress"));

        const userWeightDoc = await getDoc(
          doc(db, "users", userId, "weight_target", "weightTarget")
        );

        const weightData = userWeightDoc.data();
        setWeightTarget(weightData?.weightTarget || "");

        const userShowDimChartDoc = await getDoc(
          doc(db, "users", userId, "show_hide", "showDimChart")
        );

        const userShowWeightChartDoc = await getDoc(
          doc(db, "users", userId, "show_hide", "showWeightChart")
        );

        const dimensionsName = [
          "dimensionA",
          "dimensionB",
          "dimensionC",
          "dimensionD",
        ];

        const dimensionsNamePromises = dimensionsName.map((setting) =>
          getDoc(doc(db, "users", userId, "dimensions_name", setting))
        );

        const dimensionsNameDocs = await Promise.all(dimensionsNamePromises);

        dimensionsNameDocs.forEach((doc, index) => {
          if (doc.exists()) {
            const key = dimensionsName[index];
            const value = doc.data()[key];
            if (key === "dimensionA") setDimensionAName(value);
            if (key === "dimensionB") setDimensionBName(value);
            if (key === "dimensionC") setDimensionCName(value);
            if (key === "dimensionD") setDimensionDName(value);
          }
        });

        if (userShowDimChartDoc.exists()) {
          const showDimChartData = userShowDimChartDoc.data();
          setShowDimChart(showDimChartData?.showDimChart);
        }

        if (userShowWeightChartDoc.exists()) {
          const showWeightChartData = userShowWeightChartDoc.data();
          setShowWeightChart(showWeightChartData?.showWeightChart);
        }

        try {
          const querySnapshot = await getDocs(q);
          const progressData: ProgressData[] = [];

          querySnapshot.forEach((doc) => {
            const data = doc.data() as ProgressData;
            progressData.push(data);
          });

          setData(progressData);

          if (progressData.length > 0) {
            const latestEntry = progressData.reduce((latest, entry) => {
              return entry.date > latest.date ? entry : latest;
            });

            setLatestWeight(parseFloat(latestEntry.weight || "0"));
          }
        } catch (error) {
          console.error("Error fetching progress data: ", error);
        }
      } else {
        console.log("ERROR!! No user logged in");
      }
    });

    return () => unsubscribe();
  }, [
    setDimensionAName,
    setDimensionBName,
    setDimensionCName,
    setDimensionDName,
    setLatestWeight,
    setShowDimChart,
    setShowWeightChart,
  ]);

  useEffect(() => {
    if (showDimChart) {
      if (data.length > 0) {
        const ctx = document.getElementById(
          "dimension_chart"
        ) as HTMLCanvasElement;
        new Chart(ctx, {
          type: "line",
          data: {
            labels: data.map(({ date }) => date),
            datasets: [
              {
                label: `${
                  dimensionAName === ""
                    ? translate("AddProgress", "dimensionA")
                    : dimensionAName
                }`,
                backgroundColor: "rgba(108, 202, 124, 0.2)",
                borderColor: "#ebb236",
                borderWidth: 1,
                data: data.map(({ dimensionA }) =>
                  dimensionA === "" || dimensionA === null ? null : dimensionA
                ),
              },
              {
                label: `${
                  dimensionBName === ""
                    ? translate("AddProgress", "dimensionB")
                    : dimensionBName
                }`,
                backgroundColor: "rgba(108, 202, 124, 0.2)",
                borderColor: "#ebb236",
                borderWidth: 1,
                data: data.map(({ dimensionB }) =>
                  dimensionB === "" || dimensionB === null ? null : dimensionB
                ),
              },
              {
                label: `${
                  dimensionCName === ""
                    ? translate("AddProgress", "dimensionC")
                    : dimensionCName
                }`,
                backgroundColor: "rgba(108, 202, 124, 0.2)",
                borderColor: "#ebb236",
                borderWidth: 1,
                data: data.map(({ dimensionC }) =>
                  dimensionC === "" || dimensionC === null ? null : dimensionC
                ),
              },
              {
                label: `${
                  dimensionDName === ""
                    ? translate("AddProgress", "dimensionD")
                    : dimensionDName
                }`,
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
            responsive: false,
          },
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (showWeightChart) {
      if (data.length > 0) {
        const ctx = document.getElementById(
          "weight_chart"
        ) as HTMLCanvasElement;

        const staticLinePlugin = {
          id: "staticLine",
          afterDraw: (chart: Chart<"line">) => {
            const yScale = chart.scales["y"];
            const yValue = yScale.getPixelForValue(weightTarget);

            const ctx = chart.ctx;
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(chart.chartArea.left, yValue);
            ctx.lineTo(chart.chartArea.right, yValue);
            ctx.strokeStyle = "rgba(255, 99, 132, 0.75)";
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.restore();
          },
        };

        new Chart(ctx, {
          type: "line",
          data: {
            labels: data.map(({ date }) => date),
            datasets: [
              {
                label: `${translate("AddProgress", "weight")}`,
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
                data: data.map(({ weight }) =>
                  weight === "" || weight === null ? null : weight
                ),
              },
              {
                label: `${translate(
                  "ProgressChart",
                  "weightChartInfo"
                )}: ${weightTarget} kg 
                ${translate(
                  "ProgressChart",
                  "weightChartStatus"
                )}: ${weightProgressStatus}`,
                backgroundColor: "rgba(255, 99, 132, 0.75)",
                data: null,
              },
            ],
          },
          // 
          // 
          // 
          // 
          // 
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: false,
              },
            },
          },
          plugins: [staticLinePlugin],
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, weightProgressStatus]);

  return (
    <>
      {showDimChart && (
        <div>
          <h3>{translate("ProgressChart", "dimChart")}</h3>
          <canvas id="dimension_chart"></canvas>
        </div>
      )}
      {showWeightChart && (
        <div>
          <h3>{translate("ProgressChart", "weightChart")}</h3>
          <canvas id="weight_chart"></canvas>
        </div>
      )}
      {/* <div>
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
      </div> */}
    </>
  );
}
