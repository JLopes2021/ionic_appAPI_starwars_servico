/* eslint-disable prefer-const */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { retry, catchError }  from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  films: Observable<any>;

  constructor(private router: Router, private api: ApiService,
    public toastController: ToastController) { }

  ngOnInit() {
    this.films = this.api.getFilms();
  }

  async exibirErro(erro) {
    const toast = await this.toastController.create({
      message: `Erro ao consultar a API: ${erro.message}`,
      duration: 4000,
      color: 'danger',
      position: 'middle'
    });
    console.log(erro);
    toast.present();
    return null;
  }

  openDetails(film) {
    let split = film.url.split('/');
    let filmId = split[split.length-2];
    this.router.navigateByUrl(`/filme-detalhe/${filmId}`);
  }
}

