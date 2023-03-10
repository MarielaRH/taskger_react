export const menuItem = [
    {
      name: 'DASHBOARD',
      key: 'dsh-1',
      icon: 'dashboard-icon.png',
      iconActive: 'dashboard-icon-red.png',
      path: '/taskger'
    },
     {
      name: 'MY TASKS',
      key: 'tsk-1',
      icon: 'tasks-icon.png',
      iconActive: 'tasks-icon-red.png',
      path: '/mytasks'
    }
    , {
      name: 'SETTINGS',
      key: 'stt-1',
      icon: null,
      iconActive: null,
      path: '/settings'
    }
  ]

  // configurations to inputLabel
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

// const
export const StatusList= [
  {
    value: "TODO",
    label: "Todo",
  },
  {
    value: "IN_PROGRESS",
    label: "In progress",
  },
  {
    value: "BACKLOG",
    label: "Backlog",
  },

  {
    value: "CANCELLED",
    label: "Cancelled",
  },

  {
    value: "DONE",
    label: "Done",
  },
];


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

export const headerColumns = [
  {
    label: "Todo",
    key: "column_todo",
  },
  {
    label: "In Progress",
    key: "column_in_progress",
  },
  {
    label: "Backlog",
    key: "column_backlog",
  },
  {
    label: "Cancelled",
    key: "column_cancelled",
  },
  {
    label: "Done",
    key: "column_done",
  },
];


export const TaskTag = ["ANDROID", "IOS", "NODE_JS", "RAILS", "REACT"];
