import { Component ,ApplicationRef} from '@angular/core';
import { AlertController, App, Platform, Events } from 'ionic-angular';
import { CodePush, SyncStatus, InstallMode, DownloadProgress } from 'ionic-native';
import { NavController } from 'ionic-angular';
import { Map } from '../map/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	messageText: string;
	downloadProgress: DownloadProgress;

  constructor( public alertCtrl : AlertController,
		        public app : App,
		        public platform : Platform,
		        public appRef : ApplicationRef,
		        public events : Events,
		        public navCtrl : NavController) {

  }
  dingwei(){
      this.navCtrl.push(Map);
  }
   checkForUpdate() {
        this.platform.ready().then(() => {
            try {
                this.messageText = 'begin to demo CodePush... ';
                CodePush.checkForUpdate().then((update) => {
                    if (!update) {
                        this.messageText = 'The app is up to date.';
                        let newalert = this.alertCtrl.create({
                            title: '当前版本最新，无需跟新！',
                        });
                        newalert.addButton({
                            text: '确定'
                        });
                        newalert.present();
                    } else {
                        this.messageText = 'An update is available! Should we download it?' + update.appVersion;
                        let oldalert = this.alertCtrl.create({
                            title: '存在较新版本，是否确认跟新？',
                            buttons: [
                                '取消'
                            ]
                        });
                        oldalert.addButton({
                            text: '确定',
                            handler: data => {
                                this.sync();
                            }
                        });
                        oldalert.present();
                    }
                }, (error) => {
                    this.messageText = 'checkForUpdate error: ' + error;
                });
            } catch (exception) {
                this.messageText = 'CodePush is not available!';
            }
        });
    }
sync() {
        CodePush.sync({
            installMode: InstallMode.IMMEDIATE
        },
            (progress) => this.updateDownloadProgress(progress)).subscribe((syncStatus) => {
                console.log('Sync Status: ', syncStatus);
                switch (syncStatus) {
                    case SyncStatus.UP_TO_DATE:
                        this.messageText = 'Up-to-date';
                        break;
                    case SyncStatus.UPDATE_INSTALLED:
                        this.messageText = 'Update Installed';
                        break;
                    case SyncStatus.UPDATE_IGNORED:
                        this.messageText = 'Update Ignored';
                        break;
                    case SyncStatus.ERROR:
                        this.messageText = 'Error';
                        break;
                    case SyncStatus.IN_PROGRESS:
                        this.messageText = 'In Progress';
                        break;
                    case SyncStatus.CHECKING_FOR_UPDATE:
                        this.messageText = 'Checking for Update';
                        break;
                    case SyncStatus.AWAITING_USER_ACTION:
                        this.messageText = 'Awaiting User Action';
                        break;
                    case SyncStatus.DOWNLOADING_PACKAGE:
                        this.messageText = 'Downloading Package';
                        break;
                    case SyncStatus.INSTALLING_UPDATE:
                        this.messageText = 'Installing Update';
                        break;
                }
                this.appRef.tick();
            });
    }

    updateDownloadProgress(progress: DownloadProgress) {
        this.downloadProgress = progress;
        this.appRef.tick();
    }


}
