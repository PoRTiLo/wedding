import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { } from '@types/googlemaps';

type MapType = 'fiance' | 'church' | 'feast' | 'route';

// position of church
const CHURCH_LAT_LNG = new google.maps.LatLng(49.610413, 17.739728);
const FEAST_LAT_LNG = new google.maps.LatLng(49.587395, 17.800759);
const BRIDE_LAT_LNG = new google.maps.LatLng(49.5596389, 17.7302739);
const GROOM_LAT_LNG = new google.maps.LatLng(49.5593917, 17.7368614);

// icon
const CHURCH_ICON = '\uf51d';
const FEAST_ICON = '\uf2e7';
const BRIDE_ICON = '\uf182';
const GROOM_ICON = '\uf183';
// description of marker
const CHURCH_INFO_CONTENT: string = `<div id="content">
    <div id="siteNotice">
    </div>
    <h1 id="firstHeading" class="firstHeading">Místo obřadu</h1>
    <div id="bodyContent">
    <p><b>KOSTEL SV. MATOUŠE</b> byl zbudován  a vysvěcen v r. 1822 namísto starobylého, sešlého kostelíka na hřbitově. Původně empírová stavba, pozdější úpravy byly provedeny v novorománském stylu. Největšími změnami prošel koncem minulého století. </p>
    <p>Parkoviště je vedle kostela. </p>
    </div>
    </div>`;
// Místo hostiny.
const FEAST_INFO_CONTENT: string = `Místo hostiny. Zde bude probíhat celé veselí :).`;
// Bydliště a přípravna Verči.
const BRIDE_INFO_CONTENT: string = `Bydliště a přípravna Verči.`;
// Bydliště a přípravna Jardy.
const GROOM_INFO_CONTENT: string = `Bydliště a přípravna Jardy.`;

@Component({
  selector: 'rt-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class RtMapsComponent implements OnInit {

  @ViewChild('gmap') gMapElement: ElementRef;
  map: google.maps.Map;
  marker: google.maps.Marker;
  marker2: google.maps.Marker;
  infoWindow: google.maps.InfoWindow;
  infoWindow2: google.maps.InfoWindow;
  mapType: MapType = 'fiance';
  address: string;

  private directionsService = new google.maps.DirectionsService;
  private directionsDisplay = new google.maps.DirectionsRenderer;
  private directionResult: google.maps.DirectionsResult;

  ngOnInit(): void {
    this.initMaps();
    this.initDisplayRoute();
  }

  private initMaps() {
    const latLang = BRIDE_LAT_LNG;
    const latLang2 = GROOM_LAT_LNG;
    // disable name of business (company names)
    const styledMapType: google.maps.MapTypeStyle[] = [{featureType: 'poi.business', stylers: [{visibility: 'off'}]}];

    const mapOptions = {
      // required fields
      center: new google.maps.LatLng(latLang.lat(), latLang.lng()),
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      // optional fields
      streetViewControl: false,
      fullscreenControl: false,
      styles: styledMapType
    };

    // create map for the above options
    this.map = new google.maps.Map(this.gMapElement.nativeElement, mapOptions);

    // create info popup
    this.infoWindow = new google.maps.InfoWindow({
        content: BRIDE_INFO_CONTENT
    });
    this.infoWindow2 = new google.maps.InfoWindow({
      content: GROOM_INFO_CONTENT
    });

    // create marker
    this.marker = new google.maps.Marker({
      position: new google.maps.LatLng(latLang.lat(), latLang.lng()),
      icon: '',
      label: {
        fontFamily: '"Font Awesome 5 Free"',
        text: BRIDE_ICON,
        color: 'black'
      },
      map: this.map,
        optimized: false
    });
    // create marker
    this.marker2 = new google.maps.Marker({
      position: new google.maps.LatLng(latLang2.lat(), latLang2.lng()),
      icon: '',
      label: {
        fontFamily: '"Font Awesome 5 Free"',
        text: GROOM_ICON,
        color: 'black'
      },
      map: this.map,
      optimized: false
    });
    // register info popup
    this.marker.addListener('click', () => {
        this.infoWindow.open(this.map, this.marker);
    });
    // register info popup
    this.marker2.addListener('click', () => {
      this.infoWindow2.open(this.map, this.marker2);
    });

    this.directionsDisplay.setMap(this.map);
  }

  activeMap(mapType: MapType) {
    this.mapType = mapType;

    switch (mapType) {
      case 'route':
        this.directionsDisplay.setMap(this.map);
        this.directionsDisplay.setDirections(this.directionResult);
        this.marker.setMap(null);
        this.marker2.setMap(null);
        break;
      default:
        if (this.mapType === 'fiance') {
          // verca
          const latLang = BRIDE_LAT_LNG;
          this.map.setCenter(new google.maps.LatLng(latLang.lat(), latLang.lng()));
          this.marker.setPosition(new google.maps.LatLng(latLang.lat(), latLang.lng()));
          this.marker.getLabel().text = BRIDE_ICON;
          this.infoWindow.setContent(BRIDE_INFO_CONTENT);
          // ja
          const latLang2 = GROOM_LAT_LNG;
          this.marker2.setPosition(new google.maps.LatLng(latLang2.lat(), latLang2.lng()));
          this.marker2.getLabel().text = GROOM_ICON;
          this.infoWindow2.setContent(GROOM_INFO_CONTENT);
          this.marker2.setMap(this.map);
          // common
          this.map.setZoom(14);
        } else {
          const latLang = this.mapType === 'church' ? CHURCH_LAT_LNG : FEAST_LAT_LNG;
          this.map.setCenter(new google.maps.LatLng(latLang.lat(), latLang.lng()));
          this.marker.setPosition(new google.maps.LatLng(latLang.lat(), latLang.lng()));
          this.marker.getLabel().text = this.mapType === 'church' ? CHURCH_ICON : FEAST_ICON;
          this.infoWindow.setContent(this.mapType === 'church' ? CHURCH_INFO_CONTENT : FEAST_INFO_CONTENT);
          // clear me
          this.marker2.setMap(null);
          this.map.setZoom(11);
        }
        this.directionsDisplay.setMap(null);
        this.marker.setMap(this.map);
        this.infoWindow.close();
        this.infoWindow2.close();
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
