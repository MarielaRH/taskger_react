import { ReactNode } from "react";

export type ErrorBoundaryProps = {
  children: ReactNode;
};

export type ErrorBoundaryState = {
  hasError: boolean;
};

// types for change dashboard view
export type Options = "LIST" | "COLUMNS";

// types use for fields form
export type status_type = "TODO" | "IN_PROGRESS" | "BACKLOG" | "CANCELLED" | "DONE";
export type PointEstimate_type = "EIGHT" | "FOUR" | "ONE" | "TWO" | "ZERO";