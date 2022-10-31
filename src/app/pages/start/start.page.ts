/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
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

  constructor(public navCtrl: NavController, public storage: StorageService) {

  }

  set_list: Set[] = [];
  current_workout = [];
  myArray = [];
  
  set_num = 1;
  reps = 0;
  weight = 135;
  excercise = '';

  async add_to_db(){
    await this.storage.set('my_workout', data_json);
    this.myArray.push();
    this.set_list.push();
  }

  add_rep(){
    this.reps += 1;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
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

  reset(){
    this.reps = 0;
    this.weight = 135;
    this.set_num = 1;
    this.set_list = [];
    this.excercise = '';
  }

  print_log(){
    const obj = this.storage.get;
    console.log(this.storage.get('my_workout'));
  }
  go_to_add_workout(){
    this.navCtrl.navigateForward(['/add-workout']);
  }
  date_time: Date;
  ngOnInit() {
    this.date_time = new Date();
  }
  add_to_set_list(){
    const new_set = new Set();
    new_set.Excercise = this.excercise;
    new_set.Set = this.set_num;
    new_set.Reps = this.reps;
    new_set.Weight = this.weight;
    this.set_list.push(new_set);
    this.add_set();
  }
  subtract_from_set_list(){
    if(this.set_list.length != 0){
    this.set_list.pop();
    this.subtract_set();
    }
  }
  push_to_current_workout(){
    if(this.set_list.length != 0){
    this.current_workout.push(this.set_list);
    const new_set: Set = this.current_workout[0];
    console.log(new_set);
    console.log("From PTCW" + this.current_workout[0][0].Excercise)
    this.reset();
    }
    else{
      console.log("No Sets Added!");
    }
  }
  add_set(){
    this.set_num += 1;
  }

  subtract_set(){
    if(this.set_num != 0){
      this.set_num -= 1;
    }
  }

  handle_Change(e){
    this.excercise = e.detail.value;
    console.log(typeof this.excercise);
  }

}
class Set {
  Excercise: string;
  Set: number;
  Reps: number;
  Weight: number;

}
