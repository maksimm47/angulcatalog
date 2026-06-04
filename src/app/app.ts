import { Component, inject} from '@angular/core';
import { Card } from "./common-ui/card/card";
@Component({
  selector: 'app-root',
  imports: [Card],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
