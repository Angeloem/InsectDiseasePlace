import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor() {
  }

  getDataForDisplay(input): any {
    // get the underlying data and the keys of the JSON object
    const dimensions = input.metaData.dimensions.dx;
    const names = input.metaData.names;
    const rows = input.rows;
    const placeObject = {
      key: '',
      name: ''
    };

    // get the second value in inner row of the rows array
    rows.forEach((row) => {
      // only one place detected, using a single variable for that
      placeObject.key = row[1];
    });

    // find the name of the key from the names object
    for (const namesKey in names) {
      if (namesKey === placeObject.key) {
        placeObject.name = names[namesKey];
      }
    }


    // initialize a new object to carry dimensions and names
    const nameAndDimensionArr = [];

    // assign the object with empty values right now
    dimensions.forEach(dimension => {
      const nameAndDimensions = {key: ''};
      nameAndDimensions.key = dimension;
      nameAndDimensionArr.push(nameAndDimensions);
    });


    // populating the nameDimensionArr objects with the names from the name object
    nameAndDimensionArr.forEach((nameDimension) => {
      // an individual object here, looping inside to expose the object key
      // tslint:disable-next-line:forin
      for (const name in names) {
        if (nameDimension.key === name) {
          nameDimension.name = names[name];
        }
      }

    });


    // looping the first time in the rows array so as to get the individual arrays in it
    rows.forEach(row => {
      // its a multidimensional array, hence we loop again
      row.forEach(internalRow => {
        // loop into the nameAndDimensions object to find the key
        nameAndDimensionArr.forEach(nameAndDimension => {
          if (internalRow === nameAndDimension.key) {
            // we are accessing the value of the row array(upper level)
            // index 2 which is the value of the given data
            nameAndDimension.value = row[2];
          }
        });
      });
    });

    // sort the name and dimensions according to the value
    nameAndDimensionArr.sort((firstValue, secondValue) => secondValue.value - firstValue.value);

    // add the name of the place into the returned object and return it
    return {
      place: placeObject.name,
      data: nameAndDimensionArr
    };
  }
}
