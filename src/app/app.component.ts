import { Component,OnInit } from '@angular/core';
import{ WheatherService} from '../app/wheather.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

 searchValue:string;
 wheatherPopShow:boolean;
 WheatherPopError:boolean;
 wheatherData;
 cardsArray =[]
 emptyField:boolean = false;
 loading:boolean = false;
 addBtnShow:boolean =false;
 removeBtnShow:boolean = false;
 getCardIndex:number;

 constructor(private ws:WheatherService){}

  ngOnInit(){
   
  }

  onSearch(){

    if(!this.searchValue){
      this.emptyField = true;
      return;
    }

    this.loading = true;
    
    this.ws.getWheather(this.searchValue).subscribe(res => {    
      this.wheatherData = res;
      this.wheatherPopShow = true;
      this.addBtnShow = true;
      this.loading = false;
      this.emptyField = false;
           
    },(err) => {
      this.WheatherPopError = true;
      this.loading = false; 
      this.emptyField = false;   
    });

  }
  addCard(){
    this.cardsArray.unshift(this.wheatherData);
    this.wheatherPopShow = false;
    this.addBtnShow = false;  
    this.searchValue = ''
  }
  popClose(){
    this.wheatherPopShow = false;
    this.WheatherPopError = false;
    this.addBtnShow = false;
    this.removeBtnShow = false;
    this.emptyField = false;
    this.searchValue = '';
  }
  openCard(i){
    this.getCardIndex = i ;
    this.wheatherData = this.cardsArray[i];
    this.wheatherPopShow = true;
    this.removeBtnShow = true;
  }
  removeCard(){
    this.wheatherPopShow = false;
    this.removeBtnShow = false;
    this.cardsArray.splice(this.getCardIndex,1)
  }
}
