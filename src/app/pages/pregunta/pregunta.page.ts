import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PreguntaPage implements OnInit {

  public usuario: Usuario;
  public respuestaSecreta: string = '';
  
  constructor(
    private activeroute: ActivatedRoute
  , private router: Router
  , private toastController: ToastController) {

    this.usuario = new Usuario();

    this.activeroute.queryParams.subscribe(params => { 
      const nav = this.router.getCurrentNavigation();
      if (nav) {
        if (nav.extras.state) {
          this.usuario = nav.extras.state['usuario'];
          return;
        }
      }
      this.router.navigate(['/ingreso']);
      });
  }
  public ngOnInit(): void {
  }

  public recuperarContrasena(): void {
    if (this.respuestaSecreta !== "") {
      if (this.usuario.respuestaSecreta === this.respuestaSecreta) {
        const navigationExtras: NavigationExtras = {
          state: {
            usuario: this.usuario
          }
        };
        this.router.navigate(['/correcto'], navigationExtras);
      }else{
        this.router.navigate(['/incorrecto']);
      }
    }else{
      this.mostrarMensaje("No has ingresado la respuesta.");
    }
  }

  ingreso(){
    this.router.navigate(['ingreso']);
  }

  async mostrarMensaje(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }
}
