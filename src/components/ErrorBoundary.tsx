import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback: React.ElementType;
}

interface State {
  hasError: boolean;
  error: Error | null;
}
const initialState: State = {
  hasError: false,
  error: null,
};

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public render() {
    const { hasError, error } = this.state;

    if (hasError) {
      return <this.props.fallback error={error} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
