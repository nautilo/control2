import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
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

  constructor(private bd: DataBaseService) { }

  ngOnInit() {
  }

  recuperarContrasena(){
    this.bd.leerUsuario(this.correo);
  }

}
