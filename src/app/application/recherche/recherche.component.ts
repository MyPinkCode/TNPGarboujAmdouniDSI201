import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { ProduitService } from '../produit.service';
import { Produits } from '../produits';
import { element } from 'protractor';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {
  submitted:boolean = false;
  productForm:FormGroup;
  all:Produits[];
  show:boolean;
  maq:any;
  dre:any;
  


  onSubmit()
  {
    this.submitted =true;}
  constructor(private produitService:ProduitService,private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.dre = this.produitService.dress;
    this.maq = this.produitService.makeup;
    
    this.productForm = this.formBuilder.group(
      {
      type:['', Validators.required],
      nom:['', [Validators.required, Validators.minLength(5)]],
      prix:['', Validators.required],
      promo:['', Validators.required]
    }
      )
     
  }

  public get nom()
  { return this.productForm.controls.nom; }

  public get prix()
  { return this.productForm.controls.prix; }

  public get promo()
  { return this.productForm.controls.promo; }
  public get type()
  { return this.productForm.controls.type; }
  
  rechercheNom(t:number){
    this.submitted=true;

     switch (t) {
      case 1:{this.all=this.maq.filter(Produits => Produits.nom.includes(this.nom.value))}break;
      case 2:{this.all=this.dre.filter(Produits => Produits.nom.includes(this.nom.value));}break;
      default:this.all=this.dre.concat(this.maq);break;
    }
      
  }
  recherchePrix(t:number){
    this.submitted=true;

    switch (t) {
      case 1:{this.all=this.maq.filter(Produits => Produits.prix<=this.prix.value);}break;
      case 2:{this.all=this.dre.filter(Produits => Produits.prix<=this.prix.value);}break;
      default:this.all=this.dre.concat(this.maq);break;
    }
   
    


  }
  rechercheSolde(t:number){
    this.submitted=true;

    switch (t) {
      case 1:{this.all=this.maq.filter(Produits => Produits.promo==this.promo.value);}break;
      case 2:{this.all=this.dre.filter(Produits => Produits.promo==this.promo.value);}break;
      default:this.all=this.dre.concat(this.maq);break;
    }
    
     
    

    }
  showAll(){
    this.submitted=true;
    this.all=this.dre.concat(this.maq);
  }
  }
 
  
