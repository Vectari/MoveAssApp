import { useAtom } from "jotai";
import { atomLatestWeight, atomWeightTarget } from "../../atoms/atoms";

export function WeightInfo() {
  const [weightTarget] = useAtom(atomWeightTarget);
  const [latestWeight] = useAtom(atomLatestWeight);

  return (
    <>
      <h3>Weight Info</h3>
      <p>Weight Target: {weightTarget}</p>
      <p>Latest Weight: {latestWeight}</p>
      <p>Weight to lose: {latestWeight - weightTarget}</p>
    </>
  );
}
