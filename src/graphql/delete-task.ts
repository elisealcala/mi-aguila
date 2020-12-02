import { gql } from '@apollo/client'

export const DELETE_TASK_MUTATION = gql`
  mutation deleteTask($id: Int!){
    delete_tasks_by_pk(id: $id){
      id
      name
      completed
      __typename
    }
  }
`