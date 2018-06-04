import {Component, Input, OnInit} from '@angular/core';

// https://demo.onlinesvatba.cz
@Component({
  selector: 'rt-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements OnInit {

  @Input() icon: string;
  @Input() frontKey: string;
  @Input() backKey: string;

  ngOnInit(): void {
  }

}
