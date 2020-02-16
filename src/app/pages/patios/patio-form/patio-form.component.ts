import { Component, Injector } from '@angular/core';
import { BaseComponenteFormComponent } from 'src/app/compartilhado/componentes/base-component/base-componente-form.component';
import { Patio } from 'src/app/compartilhado/model/patio.model';
import { PatiosService } from 'src/app/compartilhado/services/patios.service';
import { Validators } from '@angular/forms';

/**
 * Componente de formulario da entidade patio
 * @author Djeison 14 de fev de 2020 
 */
@Component({
  selector: 'app-patio-form',
  templateUrl: './patio-form.component.html',
  styleUrls: ['./patio-form.component.scss']
})
export class PatioFormComponent extends BaseComponenteFormComponent<Patio> {

  imaskConfig ={
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  }

  constructor(protected injector: Injector, protected service: PatiosService) {
    super(injector, new Patio(), service, Patio.fromJson);
  }

  protected gerarForm() {
    this.form = this.fb.group({
      id: [null],
      descricao: [null,[Validators.required, Validators.minLength(2)]],
      numVagas: [null,[Validators.required]],
      valorHora: [null,[Validators.required]]
    });
  }

  protected createPageTitle(): string {
    return 'Novo Patio';
  }

  protected edtiPageTitle(): string {
    const nomeEntidade = this.entidade.descricao || '';
    return 'Editando Patio: '+nomeEntidade;
  }

  protected carregarDados(entidade: Patio) {
    this.entidade = entidade;           
    this.form.patchValue(this.service.converterPatioToPatioForm(entidade));
    this.setPageTitle();    
  }  
}
