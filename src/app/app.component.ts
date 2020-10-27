import {Component, OnInit} from '@angular/core';
import {AppService} from './services/services.service';
import {DataToDisplay} from './models/display_data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayData: DataToDisplay[];
  place: string;

  constructor(private service: AppService) {
  }

  ngOnInit(): void {
    const placeValueData = {
      "headers": [
        {
          "id": "dx",
          "name": "Data"
        },
        {
          "id": "ou",
          "name": "Place"
        },
        {
          "id": "value",
          "name": "Value"
        }
      ],
      "metaData": {
        "names": {
          "hTUspcBc4Yn": "HIV Prevalence",
          "EzE8xZ31zfC": "Malaria Prevalence",
          "E31SemmmFGb": "TB Prevalence",
          "dx": "Data",
          "ou": "Place",
          "R7TPl8q81Ft": "Insect District"
        },
        "dimensions": {
          "dx": ["EzE8xZ31zfC", "hTUspcBc4Yn", "E31SemmmFGb"],
          "ou": ["R7TPl8q81Ft"]
        }
      },
      "rows": [
        ["EzE8xZ31zfC", "R7TPl8q81Ft", "47.0"],
        ["hTUspcBc4Yn", "R7TPl8q81Ft", "50.6"],
        ["E31SemmmFGb", "R7TPl8q81Ft", "7.8"]
      ]
    };

    const dataFromService = this.service.getDataForDisplay(placeValueData);

    this.displayData = dataFromService.data;
    this.place = dataFromService.place;
  }
}
