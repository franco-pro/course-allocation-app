import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnDestroy,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  takeUntil,
} from 'rxjs/operators';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import {
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';

import {
  MatSortModule,
  Sort,
} from '@angular/material/sort';

import { CrudColumn } from './models/crud-column';

@Component({
  selector: 'app-crud-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './crud-page.html',
  styleUrl: './crud-page.scss',
})
export class CrudPageComponent implements OnDestroy {

  @Input() title = '';

  @Input() subtitle = '';

  @Input() columns: CrudColumn[] = [];

  @Input() data: any[] = [];

  @Input() total = 0;

  @Input() page = 1;

  @Input() limit = 10;

  @Input() loading = false;

  @Input() searchDelay = 400;

  @Input() showAdd = true;

  @Input() showEdit = true;

  @Input() showDelete = true;

  @Input() showSubmit = false;

  @Input() showValidate = false;

  @Input() showReject = false;

  @Output() add = new EventEmitter<void>();

  @Output() edit = new EventEmitter<any>();

  @Output() delete = new EventEmitter<any>();

  @Output() submit = new EventEmitter<any>();

  @Output() validate = new EventEmitter<any>();

  @Output() reject = new EventEmitter<any>();

  @Output() searchChange = new EventEmitter<string>();

  @Output() pageChange = new EventEmitter<PageEvent>();

  @Output() sortChange = new EventEmitter<Sort>();

  search = '';

  private searchSubject = new Subject<string>();

  private destroy$ = new Subject<void>();

  constructor() {

    this.searchSubject
      .pipe(
        debounceTime(this.searchDelay),
        distinctUntilChanged(),
        takeUntil(this.destroy$),
      )
      .subscribe(value => {

        this.searchChange.emit(value);

      });

  }

  get displayedColumns(): string[] {

    return [

      ...this.columns.map(c => c.key),

      'actions',

    ];

  }

  onSearch(value: string) {

    this.searchSubject.next(value);

  }

  ngOnDestroy(): void {

    this.destroy$.next();

    this.destroy$.complete();

  }

}