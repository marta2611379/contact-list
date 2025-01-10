import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-three-dots-menu',
  imports: [],
  templateUrl: './three-dots-menu.component.html',
  styleUrl: './three-dots-menu.component.scss',
})
export class ThreeDotsMenuComponent {
  @Input({ required: true }) menuId!: number;
  @Input({ required: true }) activeMenu!: number | null;
  @Output() menuOpened = new EventEmitter<number | null>();
  @Output() edit = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();
  @Output() info = new EventEmitter<void>();

  public get isMenuOpen(): boolean {
    return this.activeMenu === this.menuId;
  }

  public toggleMenu(event: MouseEvent): void {
    event.stopPropagation();
    if (this.isMenuOpen) {
      this.menuOpened.emit(null);
    } else {
      this.menuOpened.emit(this.menuId);
    }
  }
}
