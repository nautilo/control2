import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { SQLiteService } from './sqlite.service';
import { DataBaseService } from './data-base.service';

@Injectable()
export class InitializeAppService {
  isAppInit: boolean = false;
  platform!: string;

  constructor(
    private sqliteService: SQLiteService,
    private storageService: DataBaseService,
    private authService: AuthService) { }

  async inicializarAplicacion() {
    await this.sqliteService.inicializarPlugin().then(async (ret) => {
      this.platform = this.sqliteService.platform;
      try {
        if( this.sqliteService.platform === 'web') {
          await this.sqliteService.inicializarAlmacenamientoWeb();
        }
        await this.storageService.inicializarBaseDeDatos();
        if( this.sqliteService.platform === 'web') {
          await this.sqliteService.guardarNombreBaseDeDatos();
        }
        this.authService.inicializarAutenticacion();
        this.isAppInit = true;
      } catch (error) {
        console.log(`inicializarAplicacionError: ${error}`);
      }
    });
  }

}
