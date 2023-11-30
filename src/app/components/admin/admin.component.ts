import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { showAlertDUOC } from 'src/app/tools/message-routines';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
  providers: [HttpClient, HttpClientModule],
  standalone: true,
})
export class AdminComponent implements OnInit  {

  @ViewChild("topOfPage") topOfPage!: ElementRef;
  listaUsuarios: Usuario[] = [];
  usuario = new Usuario();


  constructor(private authService: AuthService,private bd: DataBaseService) { 
  }

  async ngOnInit() {
    this.bd.getListaUsuarios().subscribe(usuarios => {
      this.listaUsuarios = usuarios;
    });
    const usu = await this.authService.leerUsuarioAutenticado();
    this.usuario = usu!;
  }

  eliminarUsuario(usu: any) {
    if (usu.correo == 'admin@duocuc.cl') {
      showAlertDUOC('No se puede eliminar el usuario administrador.');
      return;
    } else {
      this.bd.eliminarUsuarioUsandoCorreo(usu.correo);
      showAlertDUOC(`Se ha eliminado el usuario ${usu.nombre} ${usu.apellido}.`)
    }
  }
}
