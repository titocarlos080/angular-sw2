import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CertificadoService {

  private apiUrl = 'http://localhost:5000/generar_certificado';  // URL de tu servidor Flask

  constructor(private http: HttpClient) { }

  realizarCertificado(certificadoId: string): Observable<any> {
    const params = new HttpParams().set('certificadoId', certificadoId);
    return this.http.get<any>(this.apiUrl, { params });
  }
}
