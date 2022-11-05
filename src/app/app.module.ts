import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'
import {IonicStorageModule} from '@ionic/storage-angular';
import { Drivers, Storage } from '@ionic/storage';

import { AngularFireModule } from '@angular/fire/compat';  
import { SETTINGS, AngularFirestoreModule } from '@angular/fire/compat/firestore';  
import { environment } from 'src/environments/environment';  
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AngularFireModule.initializeApp(environment.firebase),AngularFirestoreModule, 
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    IonicStorageModule.forRoot({
      name:'_mydb',
      driverOrder:[CordovaSQLiteDriver._driver,Drivers.IndexedDB, Drivers.LocalStorage]

    })],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {}
