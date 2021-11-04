import { Router } from '@angular/router';
import { CommAPIService } from 'src/app/services/comm-api.service';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormLogin } from 'src/app/Models/FormLogin'
import { FormNewOffer } from 'src/app/Models/FormNewOffer';
import { HomeComponent } from '../home/home.component';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [HomeComponent]
})
export class AdminComponent implements OnInit {

  constructor(
    private _router: Router,
    private _srvComApi: CommAPIService,
    private _home: HomeComponent
  ) {}

  //  Subscripción para solicitar todas las ofertas
  loginUser(value: FormLogin): void {
    this._srvComApi.postUserLogin(value).subscribe(
      response =>{
        this._srvComApi.saveToken(response.id_token)
        this.goToOffers()
      },
      error => {
        'TODO'
        console.log(error)
      }
    )
  }

  //  Suscripción para crear una nueva oferta
  newOffer(value: FormNewOffer): void {
    this._srvComApi.insertNewOffer(value).subscribe(
      response => {
        console.log(response)
        this.goToOffers()
      },
      error => {
        console.log(error)
      }
    )
  }

  ngOnInit(): void {
  }

  goToOffers(): void {
    this._router.navigate(['home/offers'])
  }

  gotToNewOffer(): void{
    this._router.navigate(['login/new_offer'])
  }

  //  Suscripción para eliminar una oferta
  deleteSelectedOffer(id: string): void {
    // if (this.getConfirmAdminLoged()){
    this._srvComApi.deleteOneOffer(id).subscribe(
      response => {
        this._home.getAllOffers()
      },
      error => {
        alert(error)

      }
    )
  }

}

