import { Component , ViewChild, ElementRef} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation , Device } from 'ionic-native';


declare var BMap;
declare var baidu_location;

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

 @ViewChild('container') mapElement: ElementRef;

  container: any;
  plat:any;
  constructor(public navCtrl: NavController) {
  	// alert(Device.device.platform)
  	this.plat=Device.device.platform;
  }

   demoBaiduMap() {
   	alert(this.plat)
   	if(this.plat=="Android") {
   		var map = new BMap.Map(this.mapElement.nativeElement);          // 创建地图实例
	    var point = new BMap.Point(120.77212439999998, 31.310937799999998);  // 创建点坐标
   		(<any>baidu_location).getCurrentPosition((successCallback) => {
   			alert(successCallback.longitude)
	   	//	let data=JSON.parse(successCallback);
	   		let lon=successCallback.longitude;
	   		let lat=successCallback.latitude;	    
		    var pt = new BMap.Point(lon, lat);
		    map.centerAndZoom(pt,15);               // 初始化地图，设置中心点坐标和地图级别
		    var marker2 = new BMap.Marker(pt);  // 创建标注
		    map.addOverlay(marker2);              // 将标注添加到地图中

	   	}, (failedCallback) => {
	   		alert(failedCallback)
	   		console.log('failed');
	   	});
   	}else{
   		//地图初始化
		var map = new BMap.Map(this.mapElement.nativeElement);   
		var point = new BMap.Point(120.77212439999998, 31.310937799999998);  // 创建点坐标
    	map.centerAndZoom(point, 13);   
  		Geolocation.getCurrentPosition().then(pos => {
	    	console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
	    	var lat = pos.coords.latitude;
	    	var lon = pos.coords.longitude;
	    	var ggPoint = new BMap.Point(lon,lat);
	    	//坐标转换完之后的回调函数
			var translateCallback = function (data){
			    if(data.status === 0) {
			        var marker = new BMap.Marker(data.points[0]);
			        map.addOverlay(marker);
			        // var label = new BMap.Label("转换后的百度坐标（正确）",{offset:new BMap.Size(20,-10)});
			        // marker.setLabel(label); //添加百度label
			        map.setCenter(data.points[0]);
			    }
			}

			setTimeout(function(){
			    var convertor = new BMap.Convertor();
			    var pointArr = [];
			      pointArr.push(ggPoint);
			      convertor.translate(pointArr, 1, 5, translateCallback)
			}, 1000);
  		});	
   	}
   	 	
    
  }
  // dingwei(){
  // 	var map = new BMap.Map(this.mapElement.nativeElement);          // 创建地图实例
  //   var point = new BMap.Point(120.77212439999998, 31.310937799999998);  // 创建点坐标
  //   map.centerAndZoom(point, 15);   
  //    	Geolocation.getCurrentPosition().then(pos => {
	 //    	console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
	 //    	var lat = pos.coords.latitude;
	 //    	var lon = pos.coords.longitude;
	 //    	console.log(lat);
		// 	var new_point = new BMap.Point(lon,lat);
		// 	 map.centerAndZoom(new_point,12); 
		// 	var marker = new BMap.Marker(new_point);  // 创建标注
		// 	map.addOverlay(marker);              // 将标注添加到地图中
		// 	map.panTo(new_point); 

  // 		});

  // }
  // zhuan(){
	 //  	//地图初始化
		// var map = new BMap.Map(this.mapElement.nativeElement);   
		// var point = new BMap.Point(120.77212439999998, 31.310937799999998);  // 创建点坐标
  //   	map.centerAndZoom(point, 15);   
  // 		Geolocation.getCurrentPosition().then(pos => {
	 //    	console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
	 //    	var lat = pos.coords.latitude;
	 //    	var lon = pos.coords.longitude;
	 //    	 var ggPoint = new BMap.Point(lon,lat);
	    	 
	 //   //  	 	map.centerAndZoom(ggPoint, 15);
		// 		// map.addControl(new BMap.NavigationControl());
		// 	 //    //添加gps marker和label
		// 	 //    var markergg = new BMap.Marker(ggPoint);
		// 	 //    map.addOverlay(markergg); //添加GPS marker
		// 	 //    var labelgg = new BMap.Label("未转换的GPS坐标（错误）",{offset:new BMap.Size(20,-10)});
		// 	 //    markergg.setLabel(labelgg); //添加GPS label

		// 	    //坐标转换完之后的回调函数
		// 	    var translateCallback = function (data){
		// 	      if(data.status === 0) {
		// 	        var marker = new BMap.Marker(data.points[0]);
		// 	        map.addOverlay(marker);
		// 	        // var label = new BMap.Label("转换后的百度坐标（正确）",{offset:new BMap.Size(20,-10)});
		// 	        // marker.setLabel(label); //添加百度label
		// 	        map.setCenter(data.points[0]);
		// 	      }
		// 	    }

		// 	    setTimeout(function(){
		// 	        var convertor = new BMap.Convertor();
		// 	        var pointArr = [];
		// 	        pointArr.push(ggPoint);
		// 	        convertor.translate(pointArr, 1, 5, translateCallback)
		// 	    }, 1000);
  // 		});	

  // }

}
