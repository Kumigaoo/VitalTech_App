import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumTranslate',
})
export class EnumTranslatePipe implements PipeTransform {
  private translationMap: { [key: string]: string } = {
    MedicoGeneral: 'Médico General',
    Cardiologo: 'Cardiólogo',
    Dermatologo: 'Dermatólogo',
    Ginecologo: 'Ginecólogo',
    Neumologo: 'Neumólogo',
    Neurologo: 'Neurólogo',
    Oncologo: 'Oncólogo',
    Pediatra: 'Pediatra',
    Psiquiatra: 'Psiquiatra',
    Radiologo: 'Radiólogo',
    Traumatologo: 'Traumatólogo',
    Urologo: 'Urólogo',
    Anestesiologo: 'Anestesiólogo',
    Oftalmologo: 'Oftalmólogo',
    Otorrinolaringologo: 'Otorrinolaringólogo',
    CirujanoGeneral: 'Cirujano general',
    CirujanoCardiovascular: 'Cirujano cardiovascular',
    CirujanoPlastico: 'Cirujano plástico',
    Neurocirujano: 'Neurocirujano',
    EnfermeroGeneral: 'Enfermero general',
    EnfermeroPediatrico: 'Enfermero pediátrico',
    EnfermeroGeriatrico: 'Enfermero geriátrico',
    EnfermeroPsiquiatrico: 'Enfermero psiquiátrico',
    EnfermeroQuirurgico: 'Enfermero quirúrgico',
    EnfermeroDeEmergencias: 'Enfermero de Emergencias',
    EnfermeroDeCuidadosIntensivos: 'Enfermero de Cuidados Intensivos',
  };

  transform(value: string): string {
    return this.translationMap[value] || value;
  }
}
