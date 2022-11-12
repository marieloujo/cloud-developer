import { TodosAccess } from './todosAcess'
/* import { AttachmentUtils } from './attachmentUtils'; */
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
/* import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger' */
import * as uuid from 'uuid'
/* import * as createError from 'http-errors' */
import { parseUserId } from '../auth/utils';
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest';

// TODO: Implement businessLogic

const todoAccess = new TodosAccess()

export async function getAllTodoItems(userId: string): Promise<TodoItem[]> {
  return todoAccess.getTodosByUserId(userId)
}

export async function getTodoById(todoId: string) {
    return todoAccess.getTodoById(todoId)
}

export async function createTodoItem(
  createTodoItemRequest: CreateTodoRequest,
  jwtToken: string
): Promise<TodoItem> {

  const itemId = uuid.v4()
  const userId = parseUserId(jwtToken)

  return await todoAccess.createTodo({
    ...createTodoItemRequest,
    userId: userId,
    todoId: itemId,
    createdAt: new Date().toISOString(),
    done: false,
    attachmentUrl: "",
  })
}

export async function deleteTodo(todoId: string, userId: string): Promise<String> {

    console.log('deleteTodo')
  
    const todo = {
      userId: userId,
      todoId: todoId
    }

    return todoAccess.deleteTodo(todo)

}

export async function updateTodo(todoRequest: UpdateTodoRequest, todoId: string, userId: string): Promise<String> {
  
    console.log('updateTodo')

    const todo = {
      userId: userId,
      todoId: todoId,
      ...todoRequest
    }
  
    return todoAccess.updateTodo(todo)
}

export async function generateUploadUrl(userId: string, todoId: string): Promise<String> {

    console.log('generateUploadUrl')

    const todo = {
      userId: userId,
      todoId: todoId
    }

    return todoAccess.generateUploadUrl(todo)
}

