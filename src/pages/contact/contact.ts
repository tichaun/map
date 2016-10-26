import { Component } from '@angular/core';
import { Geolocation, Device } from 'ionic-native';
import { NavController } from 'ionic-angular';

declare var baidu_location;

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
	str:any;
	a:any;
	plat:any;
  constructor(public navCtrl: NavController) {
  		this.plat=Device.device.platform;

  }
  mapclick(){
	let i=1;
  	alert(this.plat)
  	if(this.plat=="Android") {
  		setInterval(function(){
  		i++;
  		(<any>baidu_location).getCurrentPosition((successCallback) => {
	   		let data=JSON.parse(successCallback);
	   		let lon=data.lontitude;
	   		let lat=data.latitude;
	   		this.str='lon'+lon+"="+lat;
	   		localStorage.setItem('item'+i,this.str);

	   	}, (failedCallback) => {
	   		alert(failedCallback)
	   		console.log('failed');
	   	});
  		
  	},5000)
  	}else{
  		setInterval(function(){
  		i++;
  		Geolocation.getCurrentPosition().then(pos => {
	    	console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
	    	let tiem = pos.timestamp;
	    	var newDate = new Date();
	   		newDate.setTime(tiem* 1000);
	    	alert(newDate.toTimeString());
	   		this.str+='lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude;
	   		localStorage.setItem('item'+i,this.str); 	
  		});
  		
  	},5000)
  	}
  		
  	
  	
  	
  }
  getshuju(){
  	console.log(localStorage.length+"长度")
  	for (var i = 1;i<localStorage.length; i++) {
  		this.a=localStorage.getItem('item'+i)
  		this.str+=this.a;
  	}
  }

 qingkong(){
  	localStorage.clear();
  	this.str=" ";
  }
}
