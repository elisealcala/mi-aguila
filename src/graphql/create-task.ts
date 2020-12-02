import { gql } from '@apollo/client'

export const CREATE_TASK_MUTATION = gql`
  mutation createTask($name: String) {
    insert_tasks_one(object: {name: $name}) {
      id
      name
      completed
      __typename
    }
  }
`