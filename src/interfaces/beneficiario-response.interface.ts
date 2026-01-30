export interface BeneficiarioResponse {
    id:                   number;
    nombres:              string;
    apellidos:            string;
    numeroDocumento:      string;
    fechaNacimiento:      Date;
    sexo:                 Sexo;
    documentoIdentidadId: number;
}

type Sexo = 'F' | 'M';
