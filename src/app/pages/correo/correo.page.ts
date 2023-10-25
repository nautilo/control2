import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { DataBaseService } from 'src/app/services/data-base.service';
@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CorreoPage implements OnInit {
  public correo: string = 'atorres@duocuc.cl';
  public usuario: Usuario;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private databaseService: DataBaseService
  ) {
    this.usuario = new Usuario();
  }

  ngOnInit() {}

  async recuperarContrasena() {
    if (!this.correo) {
      this.mostrarMensaje('Ingresa un correo válido');
      return;
    }

    // Buscar un usuario con el correo ingresado
    const usu = await this.databaseService.leerUsuario(this.correo);

    if (usu) {
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: usu
        }
      };
      this.router.navigate(['/pregunta'], navigationExtras);
    } else {
      this.router.navigate(['/incorrecto']);
    }
  }

  async mostrarMensaje(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: duracion ? duracion : 2000
    });
    toast.present();
  }
}
