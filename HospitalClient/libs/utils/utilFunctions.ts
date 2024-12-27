import { map, Observable } from 'rxjs';
import { UsuarioService } from './../services/usuario.service';
import { MatTableDataSource } from '@angular/material/table';
import { Usuari } from '../interfaces/usuari.interface';

//Función de
export function obtenerNombreUsuario(
  id: number,
  usuarios: MatTableDataSource<Usuari>
): string | null {
  const user = usuarios.data.find((p) => p.id == id);
  if (user == null) {
    return null;
  }
  return user?.username;
}

export function obtenerUsuariosDisponibles(
  rolId: string,
  personal: any[],
  usuarioService: UsuarioService): Observable<Usuari[]> {
  return usuarioService.getAll().pipe(
    map((data: Usuari[]) => {
      let usuaris = data.filter((usuari) => usuari.rolId === rolId);
      return usuaris.filter(
        (usuari) => !personal.some((persona) => persona.usuariId == usuari.id)
      );
    })
  );
}
