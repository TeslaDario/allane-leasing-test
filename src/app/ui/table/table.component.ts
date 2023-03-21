import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TableData } from '../models';

@Component({
  selector: 'app-table',
  templateUrl: 'table.component.html',
  styleUrls: ['table.component.scss'],
})
export class TableComponent implements AfterViewInit {
  @Input()
  set data(value: TableData<any>['data']) {
    if (value?.length) {
      this.displayedColumns = [...Object.keys(value[0]), 'actions'];
      this.dataSource = new MatTableDataSource<TableData<any>['data'][]>(
        value.map((v) => ({ ...v, actions: true }))
      );
    }
  }
  @Input() loading: boolean = false;
  @Input() page: number = 0;
  @Input() size: number = 10;
  @Input() total: number = 0;
  @Output() pageEvent = new EventEmitter<PageEvent>();
  @Output() rowClick = new EventEmitter<any>();
  @Output() rowDelete = new EventEmitter<any>();

  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<TableData<any>['data'][]> =
    new MatTableDataSource<TableData<any>['data'][]>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onDelete(event: Event, row: any) {
    event.stopPropagation();
    this.rowDelete.emit(row);
  }
}
