import React, { useState } from 'react'
import { useQuery, useMutation, gql } from '@apollo/client';
import Image from 'next/image'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { GET_TASKS_QUERY, CREATE_TASK_MUTATION } from '../graphql'

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 600px;
  margin: 30px auto;

  >form {
    width: 100%;
  }
`

const StyledInput = styled.input`
  border-width: 0 0 2px 0;
  border-color: #DFE0EB;
  width: 100%;
  font-size: 34px;
  font-weight: 300;
  font-family: Montserrat;
  margin-bottom: 40px;

  &:focus {
    border-width: 0 0 2px 0;
    border-color: #DFE0EB;
    outline: none;
  }
`

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  > * {
    margin-bottom: 20px;
  }
`

const Task = styled.div`
  padding: 10px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  font-size:  14px;
  cursor: default;
  & svg {
    display: none;
  }
  &:hover {
    box-shadow: 0px 2px 6px rgba(92, 84, 122, 0.2);
    & svg {
      display: block;
    }
  }
`

type TaskType = {
  id: number;
  name: string;
  completed: boolean;
}

const TaskScreen = () => {
  const [value, setValue] = useState('')

  const { data, loading } = useQuery(GET_TASKS_QUERY)

  const [createTask] = useMutation(CREATE_TASK_MUTATION)

  if (loading) {
    return (
      <Container>
        <Image src="/loading.gif" width="150" height="150" />
      </Container>
    )
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    createTask({
      variables: {
        name: value,
      },
      update(cache, { data: { insert_tasks_one } }) {
        cache.modify({
          fields: {
            tasks(existingTasks = []) {
              const newTodoRef = cache.writeFragment({
                data: insert_tasks_one,
                fragment: gql`
                  fragment NewTask on tasks {
                    id
                    name
                    completed
                    __typename
                  }
                `
              });
              return [...existingTasks, newTodoRef];
            }
          }
        });
      }
    })

    setValue('')
  }

  const isEmptyTasks = data.tasks.length === 0

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <StyledInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ingresa una tarea"
        />
      </form>
      {isEmptyTasks ? (
        <span>No existen tareas creadas, agrega una</span>
      ) : (
          <TaskList>
            {data.tasks.map((task: TaskType) => (
              <Task key={task.id}>
                <span>{task.name}</span>
                <FontAwesomeIcon icon={faTrash} />
              </Task>
            ))}
          </TaskList>
        )}
    </Container>
  )
}

export default TaskScreen