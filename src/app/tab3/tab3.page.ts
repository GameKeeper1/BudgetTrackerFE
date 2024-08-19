import { Component, OnInit } from '@angular/core';
import { FormArray,FormBuilder,FormGroup, Validators } from '@angular/forms';
import { BudgetinputService } from '../service/budgetinput.service';
import { AlertController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  
  budgetForm1!: FormGroup
 
 constructor( private fb:FormBuilder,private budgetinputService:BudgetinputService, private toastCtrl: ToastController,private alertController: AlertController) { }
  
 ngOnInit(): void {
    this.budgetForm1 = this.fb.group({
         dailyexpenses: this.fb.array([this.createDailyExpense()]),    
    })
  }

  createDailyExpense(): FormGroup{
    return this.fb.group({
      description:['',Validators.required],
      dexpense:['',Validators.required]
    });
  }
   
  get dailyexpenses(): FormArray{
    return this.budgetForm1.get('dailyexpenses') as FormArray
  }


  addDailyExpense(){
    this.dailyexpenses.push(this.createDailyExpense());
  }

  removeDailyExpense(index:number){
    this.dailyexpenses.removeAt(index);
  }

  //toasts, messages that disappears
    
  async showToast() {
      const toast = await this.toastCtrl.create({
        message: 'The Daily Expense(s) has been added to the Database ',
        duration: 3000,
        position: 'top'
      });
     await toast.present();
    }
    async showToastInvalid() {
    
      const toast = await this.toastCtrl.create({
        message: 'Please enter valid Inputs',
        duration: 3000,
        position: 'top'
      });
     await toast.present();
    }

// alerts that is used in the FAB button
  async AlertDashboard1() {
      const alert = await this.alertController.create({
       header: 'Daily Expenses Explained',
       message: 'Add any day to day costs for Groceries,Entertaintment, Transportation etc... here ',
       buttons: ['Okay']
      });
      await alert.present();
    }
  
    //Function that activates when the form is submitted
  onSubmit(){
    if(this.budgetForm1.valid){
      
      this.budgetinputService.addDailyExpense(this.budgetForm1.value.dailyexpenses).subscribe(response => {
        if(this.budgetForm1.value.dailyexpenses != 0){
          this.showToast();
        console.log('Expense Added successfully')
        }
     })
    }
    else{
      this.showToastInvalid();

    }
  }


}
