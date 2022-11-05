/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { key } from 'localforage-cordovasqlitedriver';
import { element } from 'protractor';
import { DataService } from 'src/app/services/data.service';
import { FbService, Setty } from 'src/app/services/fb.service';
import { StorageService } from 'src/app/services/storage-service.service';


@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
  providers:[StorageService]
})


export class StartPage implements OnInit {
  constructor(public navCtrl: NavController, public storage: StorageService, private fb: FbService) {

  }

  set_list: Set[] = [];
  current_workout = [];
  myArray = [];
  setty_list:Setty[] = [];
  current_setty_workout = [];
  g: Setty = {
    Excercise: 'Bench', Set: 5,Reps: 8, Weight: 4
  };

  date_time: Date; 
  set_num = 1;
  reps = 0;
  weight = 135;
  excercise = '';

  add_to_setty(){
    this.g = {
      Excercise: this.excercise, 
      Set: this.set_num,
      Reps: this.reps, 
      Weight: this.weight
  };
  this.setty_list.push(this.g)
  this.add_set();
  }
  push_to_current_setty_workout(){
    if(this.setty_list.length != 0){
    this.current_setty_workout.push(this.setty_list)
  }
  else{
    console.log("Setty List is empty");
  }
}
  add_to_fb(date, set: Setty){
    this.fb.add_set(set,date);
  }

  it_setty_list(){
    if(this.setty_list.length != 0){
      this.setty_list.forEach((element) =>{
      this.add_to_fb(this.date_time.toDateString(), element);
      this.current_setty_workout.push(element);
      console.log("Went off....");
      console.log("L of setty: " + this.current_setty_workout.length);
    })
    this.reset();
  }
  else{
    console.log("Setty list empty my friend!")
  };
  }

  async add_to_db(set, date){
    console.log("Trying to add to fb..");
    this.it_setty_list();
    console.log("before push" + this.current_workout);
    console.log("Length of current_workout:" + this.current_workout);
    await this.storage.set(date, JSON.stringify(set));
    this.push_to_current_workout();
    console.log("After push: " + this.current_workout);
  }
  
  async remove_set_from_fb(key, id, index){
    console.log("Key: " + key + " Id:" + id + " Index: " + index);
    this.fb.deleteDate(id, key);
    this.current_setty_workout.splice(index,1);

  }
  
  
  async remove_set_from_db(date, index){
    this.current_workout.splice(index,1);
    console.log(this.current_workout);

    if(this.current_workout.length === 0){
      console.log("Empty as fuck");
      this.storage.remove_key_set(date);
    }
    else{
      this.add_to_db(date, JSON.stringify(this.current_workout));
    }
  }
  clear_entire_database(){
    this.storage.clear();
  }
  async get_workout_from_db(date){
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve( this.fb.getData(date).then((val)=>{
        if(val.length != 0 && val != null){
        this.current_setty_workout = [];
        console.log(val.length);
        val.forEach((element) =>{
          this.current_setty_workout.push(element);
          console.log("Went off get_workout_db....");
        })
        let f = this.current_setty_workout;
        console.log(f + "ASSCHEEKS");
        }
        else{
          this.current_setty_workout = [];
          console.log("current setty list length:" + this.current_setty_workout.length)
          console.log("Chetyy list empty");
        }
      })), 1200);
    });
      
   
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
    this.setty_list = [];
    this.excercise = '';
  }

  print_log(){
    const obj = this.storage.get;
    console.log(this.storage.get('my_workout'));
  }
  go_to_add_workout(){
    this.navCtrl.navigateForward(['/add-workout']);
  }

  resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 2000);
    });
  }

  async asyncCall(){
    console.log("Trying...");
    const result = await this.resolveAfter2Seconds();
    console.log(result);
  }
  
  async ngOnInit() {
    this.date_time = new Date();
    this.get_workout_from_db(this.date_time.toDateString());
  }
 
  subtract_date(){
  this.date_time.setDate(this.date_time.getDate() - 1);
  let new_date_time = document.getElementById('date');
  new_date_time.innerHTML = this.date_time.toDateString();
  this.get_workout_from_db(this.date_time.toDateString())
  console.log(this.current_setty_workout.length + " h");

  console.log(this.date_time);
  }
  add_date(){
    this.date_time.setDate(this.date_time.getDate() + 1);
    let new_date_time = document.getElementById('date');
    new_date_time.innerHTML = this.date_time.toDateString();
    console.log(this.date_time);
    this.get_workout_from_db(this.date_time.toDateString());
  }
  get_date_time(){
    return this.date_time;
  }

  add_to_set_list(){
    const new_set = new Set();
    this.g = {
        Excercise: this.excercise, 
        Set: this.set_num,
        Reps: this.reps, 
        Weight: this.weight
    };
    this.setty_list.push(this.g)
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
      this.current_setty_workout.push(this.setty_list);
      this.current_workout.push(this.set_list);
      console.log(this.set_list);
      
      console.log(this.current_workout);
      this.reset();
    }
    else{
      console.log('No Sets Added!');
    }
  }

  pop_current_workout(set){
    let index = this.current_workout.indexOf(set)
    if(this.current_workout.length > 0){
      this.current_workout.splice(index, 1);
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
