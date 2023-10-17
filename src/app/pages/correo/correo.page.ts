import { FormsModule } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';


@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CorreoPage implements OnInit {

  public usuario: Usuario;
  
  constructor(private router: Router, private toastController: ToastController) {
    this.usuario = new Usuario('', '', '', '', '')
  }

  public ngOnInit(): void {
  }

  public recuperarContrasena(): void {
    if (this.usuario) {
      const mensajeError = this.usuario.validarCorreo();
      if (mensajeError) {
        this.mostrarMensaje(mensajeError);
        return;
      } else {
        this.router.navigate(['/incorrecto']);
      }
      const usu: Usuario | undefined = this.usuario.buscarUsuarioPorCorreo(this.usuario.correo);
      
      if (usu) {
        const navigationExtras: NavigationExtras = {
          state: {
            usuario: usu
          }
        };
        this.router.navigate(['/pregunta'], navigationExtras);
      }
    }
  }

  async mostrarMensaje(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }
}