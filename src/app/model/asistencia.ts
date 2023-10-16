export class Asistencia {

    public bloqueInicio: number;
    public bloqueTermino: number;
    public dia: string;
    public horaFin: string;
    public horaInicio: string;
    public idAsistencia: string;
    public nombreAsistencia: string;
    public nombreProfesor: string;
    public seccion: string;
    public sede: string;
  
    constructor() {
      this.bloqueInicio = 0;
      this.bloqueTermino = 0;
      this.dia = '';
      this.horaFin = '';
      this.horaInicio = '';
      this.idAsistencia = '';
      this.nombreAsistencia = '';
      this.nombreProfesor = '';
      this.seccion = '';
      this.sede = '';
    }
  
    public setAsistencia(
      bloqueInicio: number,
      bloqueTermino: number,
      dia: string,
      horaFin: string,
      horaInicio: string,
      idAsistencia: string,
      nombreAsistencia: string,
      nombreProfesor: string,
      seccion: string,
      sede: string): void
    {
      this.bloqueInicio = bloqueInicio;
      this.bloqueTermino = bloqueTermino;
      this.dia = dia;
      this.horaFin = horaFin;
      this.horaInicio = horaInicio;
      this.idAsistencia = idAsistencia;
      this.nombreAsistencia = nombreAsistencia;
      this.nombreProfesor = nombreProfesor;
      this.seccion = seccion;
      this.sede = sede;
    }
  
  }