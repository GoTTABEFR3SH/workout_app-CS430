import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { StorageService } from 'src/app/services/storage-service.service';
import { AddWorkoutPageRoutingModule } from '../add-workout/add-workout-routing.module';
import { AddWorkoutPage } from '../add-workout/add-workout.page';
import data_json from 'src/assets/data.json';
@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
  providers:[StorageService]
})
export class StartPage implements OnInit {
 
  constructor(public navCtrl: NavController, public storage:StorageService) {
   
  }
 
  myArray = [];
  reps = 0;
  weight = 135;

  async add_to_db(){
    await this.storage.set('my_workout', data_json);
    this.myArray.push();
  }
  
  add_rep(){
    this.reps += 1;
  }
 
  subtract_rep(){
    if(this.reps != 0){
      this.reps -= 1;
    }
  }

  add_weight(){
    this.weight += 5;
  }

  subtract_weight(){
    if(this.weight != 0){
      this.weight -= 5;
    }
  }

  reset_count(){
    this.reps = 0;
    this.weight = 135;
  }
  
  print_log(){
    var obj = this.storage.get
    console.log(this.storage.get('my_workout'))
  }
  go_to_add_workout(){
    this.navCtrl.navigateForward(['/add-workout'])
  }
  date_time:Date
  ngOnInit() {
    this.date_time = new Date()
  }

}
