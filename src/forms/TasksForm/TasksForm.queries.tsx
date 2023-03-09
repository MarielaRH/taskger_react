import { gql } from "@apollo/client";
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


export const CREATE_TASK_MUTATION = gql`
  mutation CreateTask ($input: CreateTaskInput!){
  createTask(input: $input){
    assignee {
    id
      avatar
      email
      fullName
  }
    createdAt
    creator{
      id
      avatar
      email
      fullName
    }
    dueDate
    id
    name
    pointEstimate
    status
    tags
  }
}
`;