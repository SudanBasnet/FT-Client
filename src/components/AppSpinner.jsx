import Spinner from "react-bootstrap/Spinner";

export const AppSpinner = ({ label = "Loading...", compact = false }) => {
  if (compact) {
    return (
      <span className="d-inline-flex align-items-center justify-content-center gap-2">
        <Spinner animation="border" size="sm" aria-hidden="true" />
        <span>{label}</span>
      </span>
    );
  }

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center gap-3 py-5 text-primary"
      role="status"
      aria-live="polite"
    >
      <Spinner animation="border" />
      <span className="fw-semibold text-body-secondary">{label}</span>
    </div>
  );
};
