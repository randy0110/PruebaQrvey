import { Component, OnInit } from '@angular/core';

import { CountriesService } from '@services/countries/countries.service';
import { ModalService } from '@services/modal/modal.service';

@Component({
  selector: 'pqrv-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

  listContinents: String[] = [];
  continents;
  continentsFilter;
  textFilter = "";
  selectFilter = "";
  country;
  favorite: String[];
  continentsFilterEmpty = false;

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
  addFavorite(name:string){
    this.favorite.push(name);
    // update localStorage
    localStorage.setItem('favorite', JSON.stringify(this.favorite));
  }

  // remove favorite
  removeFavorite(name:string){
    let pos = this.favorite.indexOf(name);
    this.favorite.splice(pos, 1);
    // update localStorage
    localStorage.setItem('favorite', JSON.stringify(this.favorite));
  }

  
  isFavorite(name:string): boolean{     
    return (this.favorite.indexOf(name) >= 0); 
  }

  filllistContinents(){

    this.continentsFilter.forEach(element => this.listContinents.push(element.name) );
    

  }

  setFilter(){

    const key = "region";
    let resp = [];
    let objcontinents = this.continents;

    // filter for continents or favorite
    if (this.selectFilter){
        if(this.selectFilter == "Favorites"){
          objcontinents = objcontinents.filter(continents => this.favorite.indexOf(continents.name.common) >= 0);
        }
        else {
          objcontinents = objcontinents.filter(continents => continents.region == this.selectFilter);          
        }
    }
    
    // filter for country names
    if(this.textFilter){
      objcontinents = objcontinents.filter(continents => continents.name.common.toLowerCase().indexOf(this.textFilter.toLowerCase()) > -1)      
    }
    
    // group by continents
    objcontinents = objcontinents.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, {})

    // create a new array with name(continent) and Countries(Country lists)
    for (const property in  objcontinents) {
      
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

      // order the continent lists
      resp.sort((a: any, b: any) => {
        if (a["name"] > b["name"]) {
          return 1;
        }
        if (a["name"] < b["name"]) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });

    this.continentsFilter = resp;
    this.continentsFilterEmpty = (this.continentsFilter.length === 0)
    
  }

  // get list of currency from object
  getCurrencies(currencies){
    let resp = [];
    
    for (const property in  currencies) {
      resp.push( currencies[property].name );
      }

      return resp.join(", ");

  }

  // get list of language from object
  getlanguage(languages){
    let resp = [];
    
    for (const property in  languages) {
      resp.push( languages[property] );
      }

      return resp.join(", ");

  }

    // get list of borders(full name) from object
  getborders(borders){
    let resp = [];
    borders?.forEach(element => {
      resp.push(this.continents.filter(continents => continents.cca3 == element)[0]?.name?.common);
    });
    
      return resp.join(", ");

  }

  openModal(country) {
    this.country = country;
    this.modalService.open("modal1");
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }

}
