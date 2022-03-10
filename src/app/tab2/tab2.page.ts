import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { cuenta } from '../interfaces/cuenta'
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  @Input() id:string='';
  constructor(private  cuentaService: DatabaseService,  private cd: ChangeDetectorRef, private alertCtrl: AlertController, private modalCtrl: ModalController,
    private router: Router,public tostada: ToastController) {

  }
  ngOnInit():void{
    if(this.id!=''){
     this.cuentaService.getCuentaById(this.id).subscribe({
     next:resp=>{
      this.cuenta=resp;
     },
     error:async error=>{
      const toast = await this.tostada.create({
        header: 'Error al cargar la cuenta',
        icon: 'information-circle',
        position: 'bottom',
        buttons: [{
            text: 'oK',
            role: 'acept'
          }
        ],
        color:'red'
      });
      await toast.present();
     }
   })}
  }


  cuenta:cuenta={
    id:'',
    titulo:'',
    ingresos:0,
    gastos:0,
    iva:false,
    irpf:false,
    is:false
  }
  antesImp:number=0;
  despuesImp:number=0;


  antesImpuestos(){
    this.antesImp=this.cuenta.ingresos-this.cuenta.gastos;
  }

  despuesImpuestos(){
     let antes:number=+this.antesImp;
     var final=antes;
  if(this.cuenta.iva==true){
    final=final-(antes*0.21);
  }
  if(this.cuenta.irpf==true){
    final=final-(antes*0.25)
  }
  if(this.cuenta.is==true){
    final=final-(antes*0.25)
  }
  this.despuesImp=final;
  }

  calcular(){
    this.antesImpuestos();
    this.despuesImpuestos();
  }
  async editaCuenta(){
    this.cuentaService.updateCuenta(this.cuenta);
    const toast = await this.tostada.create({
      header: 'Cuenta Guardada',
      icon: 'information-circle',
      position: 'bottom',
      buttons: [{
          text: 'oK',
          role: 'acept'
        }
      ]
    });
    await toast.present();

  }
    

  async guardar(){//Obligatorio completar campos
   if(this.compruebaCampos()){
     if(this.cuenta.id!=''){this.editaCuenta()}
     else{
      this.cuentaService.addCuenta(this.cuenta)
      const toast = await this.tostada.create({
        header: 'Cuenta Guardada',
        icon: 'information-circle',
        position: 'bottom',
        buttons: [{
            text: 'oK',
            role: 'acept'
          }
        ]
      });
      await toast.present();
      this.cuenta.titulo='';
      this.cuenta.id='';
      this.cuenta.ingresos=0;
      this.cuenta.gastos=0;
      this.cuenta.irpf=false;
      this.cuenta.is=false;
      this.cuenta.iva=false;
      this.router.navigateByUrl("tabs/tab1");
     }
    
    }
   

   }
  

  compruebaCampos(){
    const c=this.cuenta;
    var respuesta=false;
    if(c.ingresos<1 || c.gastos<1 || c.ingresos>1000000 || c.gastos>1000000){
      alert("Ingresos y gastos debe estar entre 1 y 1M");
      return respuesta
    }
   if(c.titulo.length<2){
     alert("Introduzca un titulo valido")
     return respuesta
   }
   respuesta=true;
    return respuesta;
  }

  borrar(){
    console.log(this.cuenta);
    this.cuentaService.deleteCuenta(this.cuenta).then(async ()=>{
      const toast = await this.tostada.create({
        header: 'Cuenta Borrada',
        icon: 'information-circle',
        position: 'bottom',
        buttons: [{
            text: 'oK',
            role: 'accept'
          }
        ]
      });
      this.modalCtrl.dismiss()
      await toast.present();
      
    })
  }



}
