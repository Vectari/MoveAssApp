import { LoaderWrapper } from "./Loader.styled";

interface LoaderProps {
  description: string;
  toCheck: boolean;
}

export function Loader({ description, toCheck }: LoaderProps) {
  if (toCheck) return null;

  return (
    <LoaderWrapper>
      <div>Loading {description}...</div>
    </LoaderWrapper>
  );
}
