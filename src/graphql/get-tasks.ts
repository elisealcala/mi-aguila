import { gql } from '@apollo/client'

export const GET_TASKS_QUERY = gql`
  query getTasksQuery {
    tasks {
      id
      name
      completed
      __typename
    }
  }
`