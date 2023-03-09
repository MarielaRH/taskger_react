export interface User {
  avatar: string;
  createdAt: string;
  email: string;
  fullName: string;
  id: string;
  type: string;
  updatedAt: string;
}

export const Status = {
  BACKLOG: "BACKLOG",
  CANCELLED: "CANCELLED",
  DONE: "DONE",
  IN_PROGRESS: "IN_PROGRESS",
  TODO: "TODO",
};

export type PointEstimate_type = "EIGHT" | "FOUR" | "ONE" | "TWO" | "ZERO";

export const PointEstimate = [
  {
    value: "ZERO",
    label: "0 Points",
  },
  {
    value: "ONE",
    label: "1 Point",
  },
  {
    value: "TWO",
    label: "2 Points",
  },

  {
    value: "FOUR",
    label: "4 Points",
  },

  {
    value: "EIGHT",
    label: "8 Points",
  },
];

export const TaskTag = ["ANDROID", "IOS", "NODE_JS", "RAILS", "REACT"];

export interface queryset {
  data: Data;
  error: any;
  loading: boolean;
}

export interface Data {
  tasks: Task[];
}

export interface Task {
  createdAt: string;
  assignee: Assignee;
  creator: Assignee;
  dueDate: string;
  id: string;
  name: string;
  pointEstimate: PointEstimate_type;
  position: number;
  status: string;
  tags: string[];
}

export interface Assignee {
  avatar: string;
  email: string;
  fullName: string;
  id: string;
}
