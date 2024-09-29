import React from "react";
import ReactDOM from "react-dom";
import { PortalWrapper } from "./Portal.styled";

// Define props for the Portal component
interface PortalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export const Portal: React.FC<PortalProps> = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <PortalWrapper>
      <div>
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </PortalWrapper>,
    document.getElementById("portal-root") as HTMLElement // Ensure portal-root element exists
  );
};
