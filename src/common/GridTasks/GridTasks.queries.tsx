import { gql } from "@apollo/client";

export const TODO_TASKS_QUERY = gql`
  query {
  tasks(input: {status: TODO}){
    createdAt
    assignee {
      avatar
      email
      fullName
      id
    }
    creator {
       avatar
      email
      fullName
      id
    }
    dueDate
    id
    name
    pointEstimate
    position
    status
    tags
  }
}
`

export const IN_PROGRESS_TASKS_QUERY = gql`
  query {
  tasks(input: {status: IN_PROGRESS}){
    createdAt
    assignee {
      avatar
      email
      fullName
      id
    }
    creator {
       avatar
      email
      fullName
      id
    }
    dueDate
    id
    name
    pointEstimate
    position
    status
    tags
  }
}
`

export const BACKLOG_TASKS_QUERY = gql`
  query {
  tasks(input: {status: BACKLOG}){
    createdAt
    assignee {
      avatar
      email
      fullName
      id
    }
    creator {
       avatar
      email
      fullName
      id
    }
    dueDate
    id
    name
    pointEstimate
    position
    status
    tags
  }
}
`

export const CANCELLED_TASKS_QUERY = gql`
  query {
  tasks(input: {status: CANCELLED}){
    createdAt
    assignee {
      avatar
      email
      fullName
      id
    }
    creator {
       avatar
      email
      fullName
      id
    }
    dueDate
    id
    name
    pointEstimate
    position
    status
    tags
  }
}
`

export const DONE_TASKS_QUERY = gql`
  query {
  tasks(input: {status: DONE}){
    createdAt
    assignee {
      avatar
      email
      fullName
      id
    }
    creator {
       avatar
      email
      fullName
      id
    }
    dueDate
    id
    name
    pointEstimate
    position
    status
    tags
  }
}
`