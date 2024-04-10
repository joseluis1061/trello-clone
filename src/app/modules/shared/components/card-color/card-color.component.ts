import { Component, Input } from '@angular/core';
import { Colors, COLORS } from '@models/color.model';

@Component({
  selector: 'app-card-color',
  templateUrl: './card-color.component.html'
})
export class CardColorComponent {

  @Input() color: Colors = 'sky';

  mapColors = COLORS;

  get colors(){
    const classes = this.mapColors[this.color];
    if(classes){
      return classes;
    }
    return {};
  }
}
