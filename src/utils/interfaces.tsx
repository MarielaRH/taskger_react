import { PointEstimate_type } from './types';
export interface SideBarItem {
  name: string;
  icon: string | null;
  iconActive: string | null;
  path: string;
}

export interface PropsSideBar {
    sideBarItem: SideBarItem,
    sideBarVisible: boolean
}

export interface PropsInputUsers {
  items: User[];
  name: string;
}

export interface PropsInputSelect {
  items: PointEstimate[];
  name: string;
}

export interface PointEstimate {
  value: string;
  label: string;
}

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

export interface User {
  avatar: string;
  createdAt: string;
  email: string;
  fullName: string;
  id: string;
  type: string;
  updatedAt: string;
}

export interface PropsActionsBar {
  setOpen: (showDialog: boolean) => void;
  setTaskDialog:  (task: Task|null) => void;
}

export interface PropsTags {
  tag: string;
}
