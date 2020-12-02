import { gql } from '@apollo/client'

export const UPDATE_TASK_MUTATION = gql`
  mutation updateTask($id: Int!, $name: String, $completed: Boolean) {
    update_tasks_by_pk(pk_columns: {id: $id}, _set: {name: $name, completed: $completed}) {
      id
      completed
      name
      __typename
    }
  }
`