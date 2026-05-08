import { LoaderCircle } from "lucide-react";

type LoadingOverlayProps = {
  title?: string;
};

const LoadingOverlay = ({ title = "Preparing synthesis" }: LoadingOverlayProps) => {
  return (
    <div className="loading-wrapper" role="status" aria-live="polite">
      <div className="loading-shadow-wrapper bg-white">
        <div className="loading-shadow">
          <LoaderCircle className="loading-animation size-12 text-[#663820]" />
          <p className="loading-title">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
