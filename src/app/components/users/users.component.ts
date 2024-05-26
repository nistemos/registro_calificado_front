import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass'],
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  title = 'Lista de Usuarios';

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.listarUsuarios(1, 111);
  }

  listarUsuarios(page: number, limit: number): void {
    this.usersService.listar(page, limit).subscribe(
      (response) => {
        this.users = response.data.users;
      },
      (error) => {
        console.error('Error al listar usuarios:', error);
      }
    );
  }

  eliminarUsuario(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersService.eliminarUsuario(id).subscribe(
          (response) => {
            Swal.fire('Eliminado!', 'El usuario ha sido eliminado.', 'success');
            this.listarUsuarios(1, 111); // Actualiza la lista de usuarios
          },
          (error) => {
            Swal.fire(
              'Error!',
              'Hubo un problema al eliminar el usuario.',
              'error'
            );
          }
        );
      }
    });
  }

  actualizarUsuario(user: any): void {
    Swal.fire({
      title: 'Actualizar Usuario',
      html:
        `<input id="swal-input1" class="swal2-input" placeholder="Nombre" value="${user.fullname}">` +
        `<input id="swal-input2" class="swal2-input" placeholder="Email" value="${user.email}">` +
        `<select id="swal-input3" class="swal2-input">
          <option value="admin" ${
            user.role === 'admin' ? 'selected' : ''
          }>admin</option>
          <option value="teacher" ${
            user.role === 'teacher' ? 'selected' : ''
          }>teacher</option>
        </select>` +
        `<input id="swal-input4" class="swal2-input" type="password" placeholder="Clave" value="">`,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const clave = (
          document.getElementById('swal-input4') as HTMLInputElement
        ).value;
        if (clave.length < 6) {
          Swal.showValidationMessage(
            'La clave debe tener al menos 6 caracteres'
          );
          return false;
        }
        return {
          fullname: (document.getElementById('swal-input1') as HTMLInputElement)
            .value,
          email: (document.getElementById('swal-input2') as HTMLInputElement)
            .value,
          role: (document.getElementById('swal-input3') as HTMLInputElement)
            .value,
          clave: clave,
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersService.actualizarUsuario(user.id, result.value).subscribe(
          (response) => {
            Swal.fire(
              'Actualizado!',
              'El usuario ha sido actualizado.',
              'success'
            );
            this.listarUsuarios(1, 111); // Actualiza la lista de usuarios
          },
          (error) => {
            Swal.fire(
              'Error!',
              'Hubo un problema al actualizar el usuario.',
              'error'
            );
          }
        );
      }
    });
  }

  crearUsuario(): void {
    Swal.fire({
      title: 'Crear Usuario',
      html:
        `<input id="swal-input1" class="swal2-input" placeholder="Nombre">` +
        `<input id="swal-input2" class="swal2-input" placeholder="Email">` +
        `<select id="swal-input3" class="swal2-input">
          <option value="admin">admin</option>
          <option value="teacher">teacher</option>
        </select>` +
        `<input id="swal-input4" class="swal2-input" type="password" placeholder="Clave">`,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const clave = (
          document.getElementById('swal-input4') as HTMLInputElement
        ).value;
        if (clave.length < 6) {
          Swal.showValidationMessage(
            'La clave debe tener al menos 6 caracteres'
          );
          return false;
        }
        return {
          fullname: (document.getElementById('swal-input1') as HTMLInputElement)
            .value,
          email: (document.getElementById('swal-input2') as HTMLInputElement)
            .value,
          role: (document.getElementById('swal-input3') as HTMLInputElement)
            .value,
          clave: clave,
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersService.crearUsuario(result.value).subscribe(
          (response) => {
            Swal.fire('Creado!', 'El usuario ha sido creado.', 'success');
            this.listarUsuarios(1, 111); // Actualiza la lista de usuarios
          },
          (error) => {
            Swal.fire(
              'Error!',
              'Hubo un problema al crear el usuario.',
              'error'
            );
          }
        );
      }
    });
  }
}
