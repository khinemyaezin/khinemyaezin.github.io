"use client";

import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "2rem",
            textAlign: "center",
            fontFamily: "var(--font-primary)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-title)",
              fontSize: "clamp(1.5rem, 4cqi, 3rem)",
              marginBottom: "1rem",
              color: "var(--color-primary)",
            }}
          >
            Something went wrong
          </h2>
          <p
            style={{
              color: "#9ca3af",
              marginBottom: "2rem",
              maxWidth: "600px",
            }}
          >
            We&apos;re sorry, but something unexpected happened. Please try refreshing the page.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            style={{
              background: "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
              border: "none",
              padding: "0.75rem 2rem",
              borderRadius: "0.5rem",
              cursor: "pointer",
              fontFamily: "var(--font-title)",
              fontSize: "1rem",
              textTransform: "uppercase",
              color: "#111827",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(137, 247, 254, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
