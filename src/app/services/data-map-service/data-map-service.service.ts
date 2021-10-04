import { Injectable } from '@angular/core';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Query from '@arcgis/core/tasks/support/Query';
import QueryTask from '@arcgis/core/tasks/QueryTask'
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DataMapServiceService {

  private bulma = new BehaviorSubject<string[]>([]);
  bulma$ = this.bulma.asObservable();
  dataToComponent;

  constructor() {
    const localProductLayer = new FeatureLayer({
      url: "https://services9.arcgis.com/4RxTGB2fxcbFrzj3/ArcGIS/rest/services/local_products/FeatureServer/0"
    });
    let query = localProductLayer.createQuery();
    // query.outFields = ["vegan", "eco", "gluten"];
    // query.where = '1=1';
    localProductLayer.queryFeatures(query)
      .then((response) => {
        const features = response.features;
        const attributes = features.map((feature) => feature.attributes);
        this.dataToComponent = attributes;
        this.bulma.next(this.dataToComponent);
      });
  }
}














