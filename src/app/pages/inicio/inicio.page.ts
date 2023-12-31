import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QrComponent } from 'src/app/components/qr/qr.component';
import { MiclaseComponent } from 'src/app/components/miclase/miclase.component';
import { ForoComponent } from 'src/app/components/foro/foro.component';
import { MisdatosComponent } from 'src/app/components/misdatos/misdatos.component';
import { DataBaseService } from 'src/app/services/data-base.service';
import { APIClientService } from 'src/app/services/apiclient.service';
import { AnimationController, NavController} from '@ionic/angular';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { Usuario } from 'src/app/model/usuario';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,
    QrComponent, MiclaseComponent, ForoComponent, MisdatosComponent, AdminComponent
  ],
})
export class InicioPage implements OnInit {
  @ViewChild('titulo',{read:ElementRef}) itemTitulo!: ElementRef;
  usuario = new Usuario();
  componente_actual = '';

  constructor(
    private authService: AuthService, 
    private bd: DataBaseService,
    private api: APIClientService,
    private animationController: AnimationController) { }

  async ngOnInit() {
    const usu = await this.authService.leerUsuarioAutenticado();
    this.usuario = usu!;
    if (this.usuario.correo !== 'admin'){
      this.componente_actual = 'qr';
    } else {
      this.componente_actual = 'foro';
    }
    this.bd.datosQR.next('');
  }
  public ngAfterViewInit(): void {
    if (this.itemTitulo) {
      const animation = this.animationController
        .create()
        .addElement(this.itemTitulo.nativeElement)
        .iterations(Infinity)
        .duration(6000)
        .fromTo('transform', 'translate(-30%)', 'translate(100%)')
        .fromTo('opacity', 0, 1);

      animation.play();
    }
  }

  cambiarComponente(nombreComponente: string) {
    this.componente_actual = nombreComponente;
    if (this.componente_actual === 'foro') this.api.cargarPublicaciones();
    if (this.componente_actual === 'misdatos') this.authService.leerUsuarioAutenticado();
  }

  cerrarSesion() {
    this.authService.logout();
  }

  esAdmin(): boolean {
    const usuario = this.authService.usuarioAutenticado.value;
    return !!usuario && usuario.correo === 'admin@duocuc.cl';
  }
  

}
