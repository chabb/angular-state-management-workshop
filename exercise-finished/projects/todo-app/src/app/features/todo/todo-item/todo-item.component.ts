import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Todo } from '../state/todo.model';

@Component({
  selector: 'todo-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  @Input() todo: Todo;
  @Output() toggle = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();

  onToggle() {
    this.toggle.emit(this.todo.id);
  }

  onEdit() {
    this.edit.emit(this.todo.id);
  }

  onRemove() {
    this.remove.emit(this.todo.id);
  }
}
