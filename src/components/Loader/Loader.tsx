import { useTranslation } from "../../hooks/useTranslation";
import { LoaderWrapper } from "./Loader.styled";

interface LoaderProps {
  description: string;
  toCheck: boolean;
}

export function Loader({ description, toCheck }: LoaderProps) {
  const { translate } = useTranslation();
  if (toCheck) return null;

  return (
    <LoaderWrapper>
      <div>
        {translate("Loader", "loadingStatus")} {description}...
      </div>
    </LoaderWrapper>
  );
}
