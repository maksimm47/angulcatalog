import { Component } from '@angular/core';
import { Card } from "../../common-ui/card/card";
import { RouterModule} from '@angular/router';
import { Sidebar } from "../../common-ui/sidebar/sidebar";

@Component({
  selector: 'app-catalog-page',
  imports: [Card, RouterModule, Sidebar],
  templateUrl: './catalog-page.html',
  styleUrl: './catalog-page.css',
})
export class CatalogPage {}
