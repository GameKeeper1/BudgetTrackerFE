import { Component, OnInit } from '@angular/core';
import { FormArray,FormBuilder,FormGroup, Validators } from '@angular/forms';
import { BudgetinputService } from '../service/budgetinput.service';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  budgetForm!: FormGroup
  budgetincomes: any[]= [];
 
  constructor( private fb:FormBuilder,private budgetinputService:BudgetinputService,private alertController: AlertController,private toastCtrl: ToastController) { }
  ngOnInit(): void {

      this.budgetForm = this.fb.group({
      budgetinputs: this.fb.array([this.createBudgetInput()]),
      budgetexpenses: this.fb.array([this.createBudgetExpense()]),
    
    })

    this.budgetinputService.getBudgetInputs().subscribe(data1=>{
    this.budgetincomes=data1;
    
  })
}


//methods for income inputs
  createBudgetInput(): FormGroup{
    return this.fb.group({
      description:['',Validators.required],
      income:['',Validators.required]

    });
  }
   
  get budgetinputs(): FormArray{
    return this.budgetForm.get('budgetinputs') as FormArray
  }


  addBudgetInput(){
    this.budgetinputs.push(this.createBudgetInput());
  }

  removeBudgetInput(index:number){
    this.budgetinputs.removeAt(index);
  }

  populateincome(index:number){
  return this.budgetinputs.at(index).value.income;
 }


  ////methods for expense inputs

  createBudgetExpense(): FormGroup{
    return this.fb.group({
      description:['',Validators.required],
      expense:['',Validators.required]

    });
  }

  get budgetexpenses(): FormArray{
    return this.budgetForm.get('budgetexpenses') as FormArray
  }


  addBudgetExpense(){
    this.budgetexpenses.push(this.createBudgetExpense());
  }

  removeBudgetExpense(index:number){
    this.budgetexpenses.removeAt(index);
  }

  //toasts, messages that disappears
  async showToastIncome() {
    const toast = await this.toastCtrl.create({
      message: 'The income(s) has been added to the Database ',
      duration: 3000,
      position: 'top'
    });
   await toast.present();
  }
  async showToastExpense() {
    
    const toast = await this.toastCtrl.create({
      message: 'The Expense(s) has been added to the Database ',
      duration: 3000,
      position: 'top'
    });
   await toast.present();
  }
  async showToastBoth() {
    
    const toast = await this.toastCtrl.create({
      message: 'The Expense(s) and Income(s) has been added to the Database ',
      duration: 3000,
      position: 'top'
    });
   await toast.present();
  }

  async showToastInvalid() {
    
    const toast = await this.toastCtrl.create({
      message: 'Please enter Valid Inputs',
      duration: 3000,
      position: 'top'
    });
   await toast.present();
  }
 //Alerts used in the FAB button with question mark
  async AlertDashboard1() {
    const alert = await this.alertController.create({
     header: 'Monthly Income Explained',
     message: 'Add any Monthly income sources that you have obtained for the current month here',
     buttons: ['Okay']
    });
    await alert.present();
  }

  async AlertDashboard2() {
    const alert = await this.alertController.create({
     header: 'Monthly Expenses Explained',
     message: 'Add any Monthly Expenses that you will be paying for like Credit Card payments, Insurance, Loans, subscriptions etc... here',
     buttons: ['Okay']
    });
    await alert.present();
  }


  onSubmit(){
    if(this.budgetForm.valid){

      if (this.budgetForm.value.budgetinputs.length != 0 &&this.budgetForm.value.budgetexpenses.length != 0)
      {
        this.showToastBoth();
      }
      this.budgetinputService.addBudgetInput(this.budgetForm.value.budgetinputs).subscribe(response => {
        if(this.budgetForm.value.budgetinputs.length != 0 &&this.budgetForm.value.budgetexpenses.length == 0){
        console.log('Income Added successfully');
        this.showToastIncome();
        }
      })
      this.budgetinputService.addBudgetExpense(this.budgetForm.value.budgetexpenses).subscribe(response => {
        if(this.budgetForm.value.budgetexpenses.length != 0 && this.budgetForm.value.budgetinputs.length == 0){
        console.log('Expense Added successfully');
        this.showToastExpense();
        }
     })
    }
    else{
      this.showToastInvalid();

    }
  }

}

