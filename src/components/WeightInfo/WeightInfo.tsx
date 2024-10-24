import { useAtom } from "jotai";
import {
  atomLatestWeight,
  atomShowWeightInfo,
  atomWeightTarget,
} from "../../atoms/atoms";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../library/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useTranslation } from "../../hooks/useTranslation";

export function WeightInfo() {
  const { translate } = useTranslation();
  const [weightTarget, setWeightTarget] = useAtom(atomWeightTarget);
  const [latestWeight] = useAtom(atomLatestWeight);
  // const [showWeightInfo] = useAtom(atomShowWeightInfo);

  const [showWeightInfo, setShowWeightInfo] =
    useAtom<boolean>(atomShowWeightInfo);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async () => {
      if (auth.currentUser !== null) {
        const userId = auth.currentUser.uid;

        const userShowWeightInfo = await getDoc(
          doc(db, "users", userId, "show_hide", "showWeightInfo")
        );

        const userWeightDoc = await getDoc(
          doc(db, "users", userId, "weight_target", "weightTarget")
        );

        if (userShowWeightInfo.exists()) {
          const showWeightInfoData = userShowWeightInfo.data();
          setShowWeightInfo(showWeightInfoData?.showWeightInfo);
          // setLoaded(true);
        }

        const weightData = userWeightDoc.data();
        setWeightTarget(weightData?.weightTarget || "");
      }
    });

    return () => unsubscribe();
  });

  return (
    <>
      {showWeightInfo && (
        <>
          <hr />
          <h3>{translate("WeightInfo", "title")}</h3>
          <p>
            {translate("WeightInfo", "weightTarget")}: {weightTarget} kg
          </p>
          <p>
            {translate("WeightInfo", "latestWeight")}: {latestWeight} kg
          </p>
          <p>
            {parseFloat((latestWeight - Number(weightTarget)).toFixed(1)) >= 0
              ? `${translate("WeightInfo", "weightToLose")}: ${parseFloat(
                  (latestWeight - Number(weightTarget)).toFixed(1)
                )} kg`
              : `${translate("WeightInfo", "belowTarget")}: ${parseFloat(
                  (latestWeight - Number(weightTarget)).toFixed(1)
                )} kg`}
          </p>
          <hr />
        </>
      )}
    </>
  );
}
