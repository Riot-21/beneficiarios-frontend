import z from 'zod';

export const sexoOptions = ['F', 'M'] as const;

const documentoMap: Record<number, { longitud: number; soloNumeros: boolean }> = {
  1: { longitud: 8, soloNumeros: true },   // DNI
  2: { longitud: 9, soloNumeros: false },  // Pasaporte
  3: { longitud: 12, soloNumeros: false }, // Carnet de extranjeria
};

export const beneficiarioSchema = z.object({
    nombres: z.string().nonempty('El nombre es obligatorio'),
    apellidos: z.string().nonempty('El nombre es obligatorio'),
    documentoIdentidadId: z.number().int().positive('Selecciona un tipo de documento de identidad'),
    numeroDocumento: z.string()
        .nonempty('El numero de documento es obligatorio'),
    fechaNacimiento: z.date('La fecha de nacimiento es obligatorio'),
    sexo: z.enum(sexoOptions, { error: 'Escoge un valor valido' }),
}).refine((data) => {
    const doc = documentoMap[data.documentoIdentidadId];
    if(!doc) return false;

    if(data.numeroDocumento.length !== doc.longitud) return false;
    if(doc.soloNumeros) return /^\d+$/.test(data.numeroDocumento);

    return true;
}, {
    error: 'El numero de documento no tiene la longitud y/o formato esperado',
    path: ['numeroDocumento']
});

export type BeneficiarioForm = z.infer<typeof beneficiarioSchema>;
