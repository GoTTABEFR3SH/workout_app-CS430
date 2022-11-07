/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { key } from 'localforage-cordovasqlitedriver';
import { FbService, Setty } from 'src/app/services/fb.service';



@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})


export class StartPage implements OnInit {
  constructor(public navCtrl: NavController, private fb: FbService) {

  }

  setty_list:Setty[] = [];
  current_setty_workout = [];
  g: Setty; 

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
    })
    this.reset();
  }
  else{
    console.log("Setty list empty my friend!")
  };
  }

 
  
  async remove_set_from_fb(key, id, index){
    console.log("Key: " + key + " Id:" + id + " Index: " + index);
    this.fb.deleteDate(id, key);
    this.current_setty_workout.splice(index,1);

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
        }
        else{
          this.current_setty_workout = [];
          console.log("Chetyy list empty");
        }
      })), 500);
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
    this.setty_list = [];
    this.excercise = '';
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
    this.add_set();
  }
  
  subtract_from_setty_list(){
    if(this.setty_list.length != 0){
      this.setty_list.pop()
      this.set_num -= 1;
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
