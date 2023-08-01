import {Component, OnInit, ViewChild} from '@angular/core';
import {IonTabs} from "@ionic/angular";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  @ViewChild(IonTabs) tabs: IonTabs;
  selectedTab: any;

  constructor() {
  }

  ngOnInit() {
  }

  setSelectedTab() {
    this.selectedTab = this.tabs.getSelected();
  }
}
