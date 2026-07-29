import { Component, OnInit } from '@angular/core';

import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

import { CrudPageComponent } from '../../shared/crud-page/crud-page';

import { UsersService } from './services/users.service';

import { UserInterface } from '../../core/models/user.model';
import { SearchUserDto } from '../../core/models/searchUserDTO';



@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CrudPageComponent],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class UsersComponent implements OnInit {

  users: UserInterface[] = [];

  total = 0;

  loading = false;

  searchDto: SearchUserDto = {

    page: 1,

    limit: 10,

    keyword: '',

    sortBy: '',

    sortOrder: 'asc',

  };

  columns = [

    {
      key: 'MATRICULE',
      title: 'Matricule',
    },

    {
      key: 'NOM_USER',
      title: 'Nom',
    },

    {
      key: 'PRENOM_USER',
      title: 'Prénom',
    },

    {
      key: 'ACTIVE',
      title: 'Etat',
    },

  ];

  constructor(
    private readonly usersService: UsersService,
  ) {}

  ngOnInit(): void {

    this.loadUsers();

  }

  loadUsers() {

    this.loading = true;

    this.usersService.searchUsers(this.searchDto).subscribe({

      next: (res) => {

        this.users = res.data;

        this.total = res.total;

        this.loading = false;

      },

      error: (err) => {

        console.error(err);

        this.loading = false;

      },

    });

  }

  onSearch(keyword: string) {

    this.searchDto.keyword = keyword;

    this.searchDto.page = 1;

    this.loadUsers();

  }

  onPage(event: PageEvent) {

    this.searchDto.page = event.pageIndex + 1;

    this.searchDto.limit = event.pageSize;

    this.loadUsers();

  }

  onSort(event: Sort) {

    this.searchDto.sortBy = event.active;

    this.searchDto.sortOrder =
      event.direction === 'desc'
        ? 'desc'
        : 'asc';

    this.loadUsers();

  }

  create() {

    console.log('Créer');

  }

  edit(user: UserInterface) {

    console.log(user);

  }

  delete(user: UserInterface) {

    console.log(user);

  }

}