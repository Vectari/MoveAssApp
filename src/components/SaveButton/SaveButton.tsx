import { useTranslation } from "../../hooks/useTranslation";

interface SaveButton {
  click: React.MouseEventHandler<HTMLButtonElement>;
}

export function SaveButton({ click }: SaveButton) {
  const { translate } = useTranslation();

  return (
    <>
      <button onClick={click}>{translate("Interface", "saveButton")}</button>
    </>
  );
}
