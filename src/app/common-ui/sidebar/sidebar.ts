import { Component, Input } from '@angular/core';
import { Category } from '../../models/categories.model';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  @Input() category!: Category[];

}
