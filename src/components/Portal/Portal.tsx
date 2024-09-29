import { PortalWrapper } from "./Portal.styled";
import { createPortal } from "react-dom";

// Define props for the Portal component
interface PortalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export const Portal: React.FC<PortalProps> = ({ children, onClose }) => {
  return createPortal(
    <PortalWrapper>
      <div>
        <button id="close_button" onClick={onClose}>X</button>
        {children}
      </div>
    </PortalWrapper>,
    document.getElementById("portal-root") as HTMLElement // Ensure portal-root element exists
  );
};
