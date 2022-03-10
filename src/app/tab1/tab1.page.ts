import { Component, ChangeDetectorRef } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { cuenta } from '../interfaces/cuenta';
import { DatabaseService } from '../services/database.service';
import { Tab2Page } from '../tab2/tab2.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  cuentas:cuenta[]=[];

  constructor(private  cuentaService: DatabaseService,  private cd: ChangeDetectorRef, private alertCtrl: AlertController, private modalCtrl: ModalController) {
    this.cuentaService.getCuentas().subscribe(resp => {
      this.cuentas = resp;
      this.cd.detectChanges();
    });

  }




 

  async abrirCuenta(cuenta:cuenta) { 
    const modal = await this.modalCtrl.create({
      component: Tab2Page,
      componentProps: { id: cuenta.id },
      breakpoints: [0,1],
      initialBreakpoint: 1
    });
 
    await modal.present();
  }

  
}
