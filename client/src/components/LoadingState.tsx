import { memo } from 'react';

interface ILoadingStateProps {
  message?: string;
}

export const LoadingState = memo(({ message = 'Loading...' }: ILoadingStateProps) => (
  <div className="flex items-center justify-center py-12">
    <p className="text-muted-foreground">{message}</p>
  </div>
));

LoadingState.displayName = 'LoadingState';

interface IErrorStateProps {
  message: string;
}

export const ErrorState = memo(({ message }: IErrorStateProps) => (
  <div className="flex items-center justify-center py-12">
    <p className="text-destructive">{message}</p>
  </div>
));

ErrorState.displayName = 'ErrorState';

