import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommAPIService } from 'src/app/services/comm-api.service';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css']
})
export class OfertaComponent implements OnInit {

  private dataOffer: Array<any>

  constructor(
    private _comApiSrv: CommAPIService,
    private _router: Router,
    private _actdRoute: ActivatedRoute
    ) {
      this.dataOffer = new Array<any>()
     }

  ngOnInit(): void {
    this.getDataOfferID(this._actdRoute.snapshot.paramMap.get('id')!)
  }

  getDataOffer(value: number): string {
    return this.dataOffer[value]
  }

  //Suscripción
  getDataOfferID(id: string): void{
    this._comApiSrv.getDataOfferID(id).subscribe(
      response =>{
        Object.entries(response).forEach(
          ([key, value]) => this.dataOffer.push(value)
        )
      },
      error => {
        this.dataOffer = error
      }
    )
  }

  goToHome(): void {
    this._router.navigate(['/home'])
  }

}
