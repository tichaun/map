import { Component , ViewChild, ElementRef} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation , Device } from 'ionic-native';

declare var BMap;
declare var baidu_location;
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class Map {
	@ViewChild('container') mapElement: ElementRef;

  container: any;
  plat:any;
   map:any;
   watch:any;
  constructor(public navCtrl: NavController) {
  	this.plat=Device.device.platform;
  	if(this.plat=="Android") {
  		(<any>baidu_location).watchPosition((successCallback) => {
	   		let lon=successCallback.longitude;
	   		let lat=successCallback.latitude;	    
		    this.ionViewDidLoad();
		    this.android_map(lon,lat);

	   	}, (failedCallback) => {
	   		alert(failedCallback)
	   		console.log('failed');
	   	},5);
  	}else{
  		this.watch = Geolocation.watchPosition();
			this.watch.subscribe((data) => {
			 var da=<any>data;
			 var lat = da.coords.latitude;
	    	var lon = da.coords.longitude;
	    	this.ionViewDidLoad();
	    	this.ios_map(lon,lat);
		});

  	}
  }

  ionViewDidLoad() {
    	this.map = new BMap.Map(this.mapElement.nativeElement);          // 创建地图实例
	    
  }

  android_map(lon,lat){
  	var pt = new BMap.Point(lon, lat);
	this.map.centerAndZoom(pt,15);               // 初始化地图，设置中心点坐标和地图级别
	var marker2 = new BMap.Marker(pt);  // 创建标注
	this.map.addOverlay(marker2);              // 将标注添加到地图中

  }
  ios_map(lon,lat){
  	var new_point = new BMap.Point(lon,lat);
			this.map.centerAndZoom(new_point, 13); 
			//坐标转换完之后的回调函数
			var translateCallback = function (data){
			    if(data.status === 0) {
			        var marker = new BMap.Marker(data.points[0]);
			        this.map.addOverlay(marker);
			        // var label = new BMap.Label("转换后的百度坐标（正确）",{offset:new BMap.Size(20,-10)});
			        // marker.setLabel(label); //添加百度label
			        this.map.setCenter(data.points[0]);
			    }
			}

		setTimeout(function(){
			var convertor = new BMap.Convertor();
			var pointArr = [];
			pointArr.push(new_point);
			convertor.translate(pointArr, 1, 5, translateCallback)
		}, 1000);

  }
  stopmap(){
  	if(this.plat=="Android") {
  		baidu_location.clearWatch((successCallback)=>{
  			alert(successCallback)
  		}, (failedCallback)=>{
  			alert(failedCallback)
  		});

  	}else{
  		this.watch.unsubscribe();
  	}
  }


}
