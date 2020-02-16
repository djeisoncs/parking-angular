import { BaseResourceModel } from './base-resource.model';

/**
 * Classe responsável por atributos da entidade patio
 * @author Djeison 13 de fev de 2020 
 */
export class PatioForm extends BaseResourceModel {

    /**
     * Método responsável por declarar atributos da entidade patio
     * @author Djeison 13 de fev de 2020 
     */        
    constructor(
        public descricao?: string,
        public numVagas?: number,
        public valorHora?: string
    ){
        super();
    }

}