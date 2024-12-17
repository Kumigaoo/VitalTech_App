import { MatTableDataSource } from "@angular/material/table";
import { Usuari } from "../interfaces/usuari.interface";

//Función de 
export function obtenerNombreUsuario(id: number, usuarios: MatTableDataSource<Usuari>): string | null {
  const user = usuarios.data.find((p) => p.id == id);
  if (user == null) {
      return null;
  }
  return user?.username;
}