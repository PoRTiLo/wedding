import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { } from '@types/googlemaps';

type MapType = 'church' | 'feast' | 'route';

// position of church
const CHURCH_LAT_LNG = new google.maps.LatLng(49.610413, 17.739728);
// position of feast
const FEAST_LAT_LNG = new google.maps.LatLng(49.587395, 17.800759);

@Component({
  selector: 'rt-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class RtMapsComponent implements OnInit {

  @ViewChild('gmap') gMapElement: ElementRef;
  map: google.maps.Map;
  marker: google.maps.Marker;
  mapType: MapType = 'church';

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  private directionResult: google.maps.DirectionsResult;

  ngOnInit(): void {
    this.initMaps();
    this.initDisplayRoute();
  }

  private initMaps() {
    const latLang = this.mapType === 'church' ? CHURCH_LAT_LNG : FEAST_LAT_LNG;
    // disable name of business (company names)
    const styledMapType: google.maps.MapTypeStyle[] =
        [{
          featureType: 'poi.business',
          stylers: [{visibility: 'off'}]
        }
        ];

    const mapOptions = {
      // required fields
      center: new google.maps.LatLng(latLang.lat(), latLang.lng()),
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      // optional fields
      streetViewControl: false,
      fullscreenControl: false,
      styles: styledMapType
    };

    // create map for the above options
    this.map = new google.maps.Map(this.gMapElement.nativeElement, mapOptions);

    // create marker
    this.marker = new google.maps.Marker({
      position: new google.maps.LatLng(latLang.lat(), latLang.lng()),
      icon: '',
      label: {
        fontFamily: 'Fontawesome',
        text: '\uf51d'
      },
      map: this.map
    });

    this.directionsDisplay.setMap(this.map);
  }

  activeMap(mapType: MapType) {
    this.mapType = mapType;

    switch (mapType) {
      case 'route':
        this.directionsDisplay.setMap(this.map);
        this.directionsDisplay.setDirections(this.directionResult);
//        this.marker.
        break;
        default:
          this.directionsDisplay.setMap(null);
          const latLang = this.mapType === 'church' ? CHURCH_LAT_LNG : FEAST_LAT_LNG;
          this.map.setCenter(new google.maps.LatLng(latLang.lat(), latLang.lng()));
          this.map.setZoom(11);
          this.marker.setPosition(new google.maps.LatLng(latLang.lat(), latLang.lng()));
          break;
    }
  }

  private initDisplayRoute() {
    const request: google.maps.DirectionsRequest = {
      origin: CHURCH_LAT_LNG,
      destination: FEAST_LAT_LNG,
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.directionsService.route(request, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionResult = response;
          console.log(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
}
