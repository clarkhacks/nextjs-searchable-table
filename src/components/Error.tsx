export type ErrorProps = {
  error: React.ReactNode;
  onRetry?: () => void;
};

export const Error = ({ error, onRetry }: ErrorProps) => (
  <div className="flex flex-col items-center">
    <div>{error}</div>

    {onRetry && (
      <div>
        <button onClick={onRetry}>{"Retry"}</button>
      </div>
    )}
  </div>
);
