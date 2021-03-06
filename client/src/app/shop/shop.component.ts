import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { IBrand } from '../shared/models/Brands';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productTypes';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})

export class ShopComponent implements OnInit {
  @ViewChild('search', {static: true})  searchTerm : ElementRef;

  products : IProduct[];
  brands : IBrand[];
  types : IType[];

  shopParams = new ShopParams();
  totalCount : number;

  sortOptions = [
    {name : 'Alphabetical', value: 'name'},
    {name : 'Price: Low to High', value: 'priceAsc'},
    {name : 'Price: High to Low', value: 'priceDesc'}
  ];
  
  constructor(private shopServices: ShopService) {     
  }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  /**--------------------------------------------------------------------------------
   * 
   ----------------------------------------------------------------------------------*/
  getProducts(){    
    this.shopServices.getProducts(this.shopParams).subscribe(response =>{
      this.products = response.data;  
      this.totalCount = response.count;
      this.shopParams.pageNumber = response.pageIndex;
      this.shopParams.pageSize = response.pageSize;

    }, error=>{
      console.log(error);
    }) 
  }

  getBrands(){
    this.shopServices.getBrands().subscribe(response =>{
      this.brands = [{id: 0, name: 'All'}, ...response];
    }, error=>{
      console.log(error);
    }) 
  }

  getTypes(){
    this.shopServices.getTypes().subscribe(response =>{
      this.types = [{id: 0, name: 'All'}, ...response];
    }, error=>{
      console.log(error);
    }) 
  }

  onBrandSelected(brandId : number){    
    //console.log("===>" + brandId);
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId : number){
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sort : string){
    //console.log('===>' + sort);
    this.shopParams.sort = sort;    
    this.getProducts();
  }

  onPageChanged(event: any){
    if (this.shopParams.pageNumber !== event){
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch(){
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset(){
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
