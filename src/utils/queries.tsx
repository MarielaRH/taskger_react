import { gql } from "@apollo/client";

export const PROFILE_QUERY = gql`
 query Profile{
 profile {
    id
    fullName
    email
    type
    avatar
  }
}
`;

export const USERS_TASKS_QUERY = gql`
  query {
    users {
      id
      avatar
      createdAt
      email
      type
      updatedAt
      fullName
    }
  }
`;

export const TAGS_TASKS_QUERY = gql`
  query {
    users {
      id
      avatar
      createdAt
      email
      type
      updatedAt
      fullName
    }
  }
`;

export const TASKS_QUERY = gql`
  query {
    tasks(input: { ownerId: "88133bbc-2e37-40b9-8e4a-d4005226d556" }) {
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
`;

export const CREATE_TASK_MUTATION = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
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
`;

export const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
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
`;

export const DELETE_TASKS_QUERY = gql`
 mutation DeleteTask($input: DeleteTaskInput!){
  deleteTask(input: $input){
    id
    name
    pointEstimate
    status
    tags
  }
}
`;
