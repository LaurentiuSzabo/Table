import { Directive, ElementRef, HostListener, Input } from '@angular/core';

/* The ColumnResizeDirective is a TypeScript directive that allows for resizing of columns by dragging
a handle element. */
@Directive({
  selector: '[columnResize]',
  standalone: true
})
export class ColumnResizeDirective {
  @Input('columnResize') minWidth: number;
  @Input() maxWidth: number;
  @Input() handleSelector: string;

  private handleElement: HTMLElement;

  constructor(private elementRef: ElementRef) {}

  /**
   * The ngAfterViewInit function assigns the handleElement variable to the element specified by the
   * handleSelector, or to the elementRef.nativeElement if no handleSelector is provided.
   */
  ngAfterViewInit(): void {
    if (this.handleSelector) {
      this.handleElement = this.elementRef.nativeElement.querySelector(this.handleSelector);
    } else {
      this.handleElement = this.elementRef.nativeElement;
    }
  }

  /* The `@HostListener('mousedown', [''])` decorator is used to listen for the 'mousedown' event
  on the host element of the directive. When the 'mousedown' event is triggered, the `onMouseDown`
  method is called. */
  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    if (this.handleElement && this.handleElement.contains(event.target as Node)) {
      event.preventDefault();
      const initialX = event.pageX;
      const initialWidth = this.elementRef.nativeElement.offsetWidth;

      /**
       * The onMouseMove function updates the width of an element based on the mouse movement, while
       * also checking for minimum and maximum width constraints.
       * @param {MouseEvent} moveEvent - The `moveEvent` parameter is of type `MouseEvent`. It
       * represents the event object that is triggered when the mouse moves. It contains information
       * about the mouse movement, such as the current position of the mouse cursor.
       */
      const onMouseMove = (moveEvent: MouseEvent) => {
        const delta = moveEvent.pageX - initialX;
        const newWidth = initialWidth + delta;

        if (this.minWidth && newWidth < this.minWidth) {
          this.elementRef.nativeElement.style.width = `${this.minWidth}px`;
        } else if (this.maxWidth && newWidth > this.maxWidth) {
          this.elementRef.nativeElement.style.width = `${this.maxWidth}px`;
        } else {
          this.elementRef.nativeElement.style.width = `${newWidth}px`;
        }
      };

      /**
       * The function removes event listeners for mousemove and mouseup events.
       */
      const onMouseUp = () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }
  }
}
