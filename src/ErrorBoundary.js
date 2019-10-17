import React from 'react';

class ErrorBoundary extends React.Component{
  state = {
    hasError: false
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if(this.state.hasError) {
      return(
        <h2>Sorry, something went wrong</h2>
      );
    }
    return(
      this.props.children
    )
  }
}

export default ErrorBoundary;