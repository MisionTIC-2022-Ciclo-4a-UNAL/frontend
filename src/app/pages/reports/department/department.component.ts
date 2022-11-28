import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../../services/reports.service';

@Component({
  selector: 'ngx-departments',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
  template: `
    <chart type="horizontalBar" [data]="data" [options]="options"></chart>
  `,
})
export class DepartmentComponent implements OnInit {

  columnNames: string[] = ['Nombre', 'Inscrpciones']
  results: any;
  data: Object;

  constructor(private reportsService: ReportsService) {
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [{
          label: 'Dataset 1',
          backgroundColor: '#550099',
          borderWidth: 1,
          data: [5, 6, 3, 4, 5, 7],
        },
      ],
    };
  }

  ngOnInit(): void {
    this.getDepartmentsResult();
  }

  getDepartmentsResult(): void{
    this.reportsService.deparmentsReport().subscribe(
      data => {
        this.results = data;
      },  
      error => {
        console.log(error);
      }
    );
  }
}
