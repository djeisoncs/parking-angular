import { Injectable, Injector } from '@angular/core';
import { BaseService } from './base.service';
import { Patio } from '../model/patio.model';
import { PatioForm } from '../model/Patio-form.model';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';


/**
 * Classe responsável por fazer a comunicação com o recurso da entidade patio e conter regras negocio relacionadas a esta entidade
 * @author Djeison 13 de fev de 2020 
 */
@Injectable({
  providedIn: 'root'
})
export class PatiosService extends BaseService<Patio> {

  constructor(
    protected injector: Injector
  ) {
    super('patios', injector);
  }
  
  /**
   * Método responsável por converter a entidade patio para patioForm
   * @author Djeison 13 de fev de 2020 
   * @param patio
   * @returns patioForm
  */
  converterPatioToPatioForm(patio: Patio): PatioForm {
    let patioForm: PatioForm = new PatioForm();
    patioForm.id = patio.id;
    patioForm.descricao = patio.descricao;
    patioForm.numVagas = patio.numVagas;
    patioForm.valorHora = this.formatarValor(patio.valorHora);
    return patioForm;
  }

  /**
   * Método responsável pesquisar patios por descricao
   * @author Djeison 13 de fev de 2020 
   * @param descricao
   * @returns patios
  */
  getByDescricao(descricao: string): Observable<Patio[]> {
    const url = `${env.baseApiUrl+'patios'+'/descricao'}/${descricao}`;
    return this.http.get(url).pipe(
        catchError(this.handleError),
        map(this.jsonDataToEntidades)
    );
  }

  jsonDataToEntidades(jsonData: any[]): Patio[] {     
    return jsonData['Patio'] as Patio[];
  }
  
  jsonDataToEntidade(jsonData: any): Patio {
    return jsonData['Patio'] as Patio;
  }
}
