import { ColumnResizeDirective } from './../../directive/column-resize';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Person } from './../../interfaces/person.interface';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'agb-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, NgTemplateOutlet, ColumnResizeDirective]
})
export class TableComponent {

  /* The line `@Input() tableRows: Person[] = [];` is declaring an input property called `tableRows` in
  the `TableComponent` class. This property is used to pass an array of `Person` objects
  representing the rows of the table from the parent component to the `TableComponent` when it is
  used in the parent component's template. By default, the `tableRows` property is initialized as an
  empty array. */
  @Input() tableRows: Person[] = [];

 /* The line `@Input() tableHeaders: string[] = [];` is declaring an input property called
 `tableHeaders` in the `TableComponent` class. This property is used to pass an array of strings
 representing the headers of the table from the parent component to the `TableComponent` when it is
 used in the parent component's template. By default, the `tableHeaders` property is initialized as
 an empty array. */
  @Input() tableHeaders: string[] = [];

  /* The line `@Input() isFirstLevel = true;` is declaring an input property called `isFirstLevel` in
  the `TableComponent` class. This property is used to determine whether the table is at the first
  level or not. By default, it is set to `true`. The value of this property can be passed from the
  parent component to the `TableComponent` when it is used in the parent component's template. */
  @Input() isFirstLevel = true;

  /* The line `@Output() deleteRowClick = new EventEmitter<Person>();` is declaring an output property
  called `deleteRowClick` in the `TableComponent` class. */
  @Output() deleteRowClick = new EventEmitter<Person>();

  /* The line `@Output() deleteRowClick = new EventEmitter<Person>();` is declaring an output property
  called `deleteRowClick` in the `TableComponent` class. */
  @Output() deleteRowMultiples = new EventEmitter<any>();

  /* The line `@Output() editRowClick = new EventEmitter<number>();` is declaring an output property
  called `editRowClick` in the `TableComponent` class. */
  @Output() editRowClick = new EventEmitter<number>();

  /* The line `selectedRows: boolean[] = [];` is declaring a property called `selectedRows` in the
  `TableComponent` class. It is initializing `selectedRows` as an empty array of booleans. This
  property is used to keep track of the selected state of each row in the table. Each element in the
  `selectedRows` array corresponds to a row in the `tableRows` array, and the boolean value
  indicates whether the row is selected or not. */
  selectedRows: boolean[] = [];

  /* The line `hoveredRow: number | null = null;` is declaring a property called `hoveredRow` in the
  `TableComponent` class. */
  hoveredRow: number | null = null;

  /**
   * The function selects all rows in a table based on the checked state of a checkbox.
   * @param {Event} event - The event parameter is an object that represents the event that triggered
   * the function. It contains information about the event, such as the target element that triggered
   * the event.
   */
  selectAllRows(event: Event): void {
    this.selectedRows = this.tableRows.map(() => event.target['checked']);
  }

  /**
   * The function checks if any row is selected and returns a boolean value.
   * @returns A boolean value is being returned.
   */
  get isRowSelected(): boolean {
    return !!this.selectedRows.find((row) => row === true);
  }

  /**
   * The function toggles the expanded property of a Person object if it has children.
   * @param {Person} item - The parameter "item" is of type "Person".
   */
  toggleRow(item: Person): void {
    if(item.children && item.children.length > 0) {
      item.expanded = !item.expanded;
    }
  }

  /**
   * The function returns a CSS class name based on whether an item has children and whether it is
   * expanded.
   * @param {any} item - The `item` parameter is of type `any`, which means it can be any data type. It
   * represents an item in a tree structure that may have children.
   * @returns a string.
   */
  getRowIconClass(item: any): string {
    const hasChildren = item.children && item.children.length > 0;
    return hasChildren ? `bi bi-arrow-right-short${item.expanded ? ' rotated' : ''}` : '';
  }


  /**
   * The function sets the hoveredRow property to the given index.
   * @param {number} index - The index parameter is a number that represents the index of the row that is
   * being hovered over.
   */
  setHoveredRow(index: number): void {
    this.hoveredRow = index;
  }

  /**
   * The clearHoveredRow function sets the hoveredRow property to null.
   */
  clearHoveredRow(): void {
    this.hoveredRow = null;
  }

  /**
   * The function checks if a given index corresponds to a hovered row in a table.
   * @param {number} index - The `index` parameter is a number that represents the index of a row in a
   * table.
   * @returns a boolean value indicating whether the row at the given index is currently being hovered
   * over.
   */
  isFirstLevelRowHovered(index: number): boolean {
    return this.hoveredRow === index;
  }


}
