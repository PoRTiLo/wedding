import {Component, OnInit, ViewChild} from '@angular/core';
import { } from '@types/googlemaps';

@Component({
  selector: 'rt-maps',
  templateUrl: './maps.component.html',
//  styleUrls: ['./maps.component.scss']
})
export class RtMapsComponent implements OnInit {

  @ViewChild('gmap') gMapElement: any;
  map: google.maps.Map;
  marker: google.maps.Marker;

  ngOnInit(): void {
    // disable name of business (company names)
    const styledMapType: google.maps.MapTypeStyle[] =
    [{
      featureType: 'poi.business',
      stylers: [{visibility: 'off'}]
      }
    ];

    const mapOptions = {
      // required fields
      center: new google.maps.LatLng(49.610413, 17.739728),
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
      position: new google.maps.LatLng(49.610413, 17.739728),
      map: this.map
    });

  }
}
