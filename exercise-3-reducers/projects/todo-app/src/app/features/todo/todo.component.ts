import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  addTodoWithId,
  cancelEditTodo,
  editTodo,
  filterTodos,
  removeDoneTodos,
  removeTodo,
  toggleTodo,
  updateTodo
} from './state/todo.actions';

import { Todo, TodoFilter } from './state/todo.model';
import { selectTodosView } from '../../../../../../../exercise-finished/projects/todo-app/src/app/features/todo/state/todo.selectors';

@Component({
  selector: 'todo-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  view$ = this.store.select(selectTodosView);

  newTodoTitle: string;

  constructor(private store: Store) {}

  addTodo(form: NgForm) {
    if (form.valid) {
      this.store.dispatch(addTodoWithId(this.newTodoTitle));
      this.newTodoTitle = '';
      form.resetForm();
      form.reset();
    }
  }

  toggleTodo(id: string) {
    this.store.dispatch(toggleTodo({ id }));
  }

  editTodo(id: string) {
    this.store.dispatch(editTodo({ id }));
  }

  cancelEditTodo() {
    this.store.dispatch(cancelEditTodo());
  }

  saveEditTodo(todo: Todo) {
    this.store.dispatch(updateTodo({ todo }));
  }

  removeTodo(id: string) {
    this.store.dispatch(removeTodo({ id }));
  }

  removeDoneTodos() {
    this.store.dispatch(removeDoneTodos());
  }

  setTodoFilter(filter: TodoFilter) {
    this.store.dispatch(filterTodos({ filter }));
  }
}
