import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  NgZone
} from '@angular/core';

import WebMap from '@arcgis/core/WebMap';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Bookmarks from '@arcgis/core/widgets/Bookmarks';
import Expand from '@arcgis/core/widgets/Expand';
import config from '@arcgis/core/config.js';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit, OnDestroy {


  private view: any = null;

  // The <div> where we will place the map
  @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;

  title = 'ng-cli';

  constructor(private zone: NgZone) { }

  initializeMap(): Promise<any> {
    const container = this.mapViewEl.nativeElement;

    // const webmap = new WebMap({
    //   portalItem: {
    //     id: 'aa1d3f80270146208328cf66d022e09c',
    //   },
    // });
 
  

    const lavaLayer = new FeatureLayer({
      url: "https://services.arcgis.com/hkQNLKNeDVYBjvFE/arcgis/rest/services/perimetro_dron_04102021_17h/FeatureServer/0/",
   
    })


    const housesLayer = new FeatureLayer({
      url: "https://services9.arcgis.com/4RxTGB2fxcbFrzj3/ArcGIS/rest/services/urbanizated_llanos/FeatureServer/0"
    });

    const bananaLayer = new FeatureLayer({
      url: "https://services9.arcgis.com/4RxTGB2fxcbFrzj3/ArcGIS/rest/services/banana_trees/FeatureServer/0"
    });


    const myBananaPlantations = new FeatureLayer({
      url: "https://services9.arcgis.com/4RxTGB2fxcbFrzj3/ArcGIS/rest/services/my_banana_plantations/FeatureServer/0"
    });
  
 
   
    const myMap = new Map({
      basemap: "satellite",
      layers: [lavaLayer,myBananaPlantations]
    });

    const view = new MapView({
      container,
      map: myMap,
      zoom: 15,
      center: [-17.90, 28.61]
    });





    // const bookmarks = new Bookmarks({
    //   view,
    //   // allows bookmarks to be added, edited, or deleted
    //   editingEnabled: true,
    // });

    // const bkExpand = new Expand({
    //   view,
    //   content: bookmarks,
    //   expanded: true,
    // });

    // Add the widget to the top-right corner of the view
    // view.ui.add(bkExpand, 'top-right');

    // bonus - how many bookmarks in the webmap?
    // webmap.when(() => {
    //   if (webmap.bookmarks && webmap.bookmarks.length) {
    //     console.log('Bookmarks: ', webmap.bookmarks.length);
    //   } else {
    //     console.log('No bookmarks in this webmap.');
    //   }
    // });

    this.view = view;
    return this.view.when();
  }

  ngOnInit(): any {

    // Set this property when using routes in order to resolve the /assets correctly.
    // IMPORTANT: the directory path may be different between your product app and your dev app
    // config.assetsPath = "/assets";
    config.assetsPath = 'assets/';

    this.zone.runOutsideAngular(() => {
      // Initialize MapView and return an instance of MapView
      this.initializeMap().then(() => {
        // The map has been initialized
        this.zone.run(() => {
          console.log('mapView ready: ');
        });
      });

    });
  }

  ngOnDestroy(): void {
    if (this.view) {
      // destroy the map view
      this.view.destroy();
    }
  }
}
