import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.page.html',
  styleUrls: ['./add-workout.page.scss'],
})
export class AddWorkoutPage implements OnInit {

  constructor(public navCrtl:NavController) { }
  go_back(){
    this.navCrtl.navigateBack(['/start'])
  }

  add_workout(){
    
  }

  ngOnInit() {
  }

}
