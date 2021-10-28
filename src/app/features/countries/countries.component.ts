import { Component, OnInit } from '@angular/core';

import { CountriesService } from '@services/countries/countries.service';
import { ModalService } from '@services/modal/modal.service';

@Component({
  selector: 'pqrv-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

  listContinents: string[] = [];
  continents;
  continentsFilter;
  textFilter = '';
  selectFilter = '';
  country;
  favorite: string[];

  constructor(
    private countriesService: CountriesService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {

    // fill favorite list
    this.favorite = JSON.parse(localStorage.getItem('favorite')) || [];
    // get data
    this.countriesService.get().subscribe((resp) => {
      // console.log(resp);
      this.continents = resp;
      // format data
      this.setFilter();
      // fill continent list
      this.filllistContinents();
    });
  }

  // add favorite
  addFavorite(name: string): void {
    this.favorite.push(name);
    // update localStorage
    localStorage.setItem('favorite', JSON.stringify(this.favorite));
  }

  // remove favorite
  removeFavorite(name: string): void {

    this.favorite = this.favorite.filter(x => x !== name);

    // update localStorage
    localStorage.setItem('favorite', JSON.stringify(this.favorite));
    this.setFilter();
  }

  isFavorite(name: string): boolean{
    return (this.favorite.indexOf(name) >= 0);
  }

  filllistContinents(): void {
    this.continentsFilter.forEach(element => this.listContinents.push(element.name) );
  }

  setFilter(): void {

    const key = 'region';
    const resp = [];
    let objcontinents = this.continents;

    // filter for continents or favorite
    if (this.selectFilter){
        if (this.selectFilter === 'Favorites'){
          objcontinents = objcontinents.filter(continents => this.favorite.indexOf(continents.name.common) >= 0);
        }
        else {
          objcontinents = objcontinents.filter(continents => continents.region === this.selectFilter);
        }
    }

    // filter for country names
    if (this.textFilter){
      objcontinents = objcontinents.filter(continents => continents.name.common.toLowerCase()
      .indexOf(this.textFilter.toLowerCase()) > -1);
    }

    // group by continents
    objcontinents = objcontinents.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, {});

    // create a new array with name(continent) and Countries(Country lists)
    for (const property in  objcontinents) {

      if (objcontinents.hasOwnProperty(property)) {

        // order the country lists
        objcontinents[property].sort((a: any, b: any) => {
          if (a.name.common > b.name.common) {
            return 1;
          }
          if (a.name.common < b.name.common) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });

        resp.push({ name: property, Countries: objcontinents[property] });
      }
    }

    // order the continent lists
    resp.sort((a: any, b: any) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    this.continentsFilter = resp;

  }

  // get list of currency from object
  getCurrencies(currencies): string {
    const resp = [];

    for (const property in  currencies) {
      if (currencies.hasOwnProperty(property)) {
        resp.push( currencies[property].name );
      }
    }

    return resp.join(', ');

  }

  // get list of language from object
  getlanguage(languages): string {
    const resp = [];

    for (const property in  languages) {
      if (languages.hasOwnProperty(property)) {
        resp.push( languages[property] );
      }
    }

    return resp.join(', ');

  }

    // get list of borders(full name) from object
  getborders(borders): string {
    const resp = [];
    borders?.forEach(element => {
      resp.push(this.continents.filter(continents => continents.cca3 === element)[0]?.name?.common);
    });

    return resp.join(', ');

  }

  openModal(country): void {
    this.country = country;
    this.modalService.open('modal1');
  }

  closeModal(id: string): void {
      this.modalService.close(id);
  }

}
