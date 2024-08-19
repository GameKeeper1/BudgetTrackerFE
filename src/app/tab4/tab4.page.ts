import { Component, OnInit } from '@angular/core';
import { BudgetinputService } from '../service/budgetinput.service';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  budgetincomes: any[]= [];
  budgetexpenses: any[]=[];
  dailyexpenses: any[]=[];

  constructor(private budgetinputService:BudgetinputService,private toastCtrl: ToastController,private alertController: AlertController) { }

  ngOnInit(): void { 
    
    this.budgetinputService.getBudgetInputs().subscribe(data1=>{
    this.budgetincomes=data1;
    
    this.loadBudgetData();

  })
  this.budgetinputService.getBudgetExpenses().subscribe(data2=>{
    this.budgetexpenses=data2;
  })



  this.budgetinputService.getDailyExpenses().subscribe(data3=>{
    this.dailyexpenses=data3;
  
})


  
}
  loadBudgetData():void {
    this.budgetinputService.getBudgetInputs().subscribe(
      data1 => this.budgetincomes = data1,
      error => console.error('Error loading budget incomes', error)
    );  
  }

onDeleteBudgetInput(index: number): void {
  this.budgetinputService.deleteBudgetInput(index).subscribe(
    () => {
      this.budgetincomes.splice(index, 1); // Remove the item from the array after deletion
    },
    error => console.error('Error deleting budget input', error)
  );

  this.showToastIncome();
  console.log("Delete Pressed")
}

onDeleteBudgetExpense(index: number): void {
  this.budgetinputService.deleteBudgetExpense(index).subscribe(
    () => {
      this.budgetexpenses.splice(index, 1); // Remove the item from the array after deletion
    },
    error => console.error('Error deleting budget expense', error)
  );
  this.showToastExpense();
  console.log("Delete Pressed")
}

onDeleteDailyExpense(index: number): void {
  this.budgetinputService.deleteDailyExpense(index).subscribe(
    () => {
      this.dailyexpenses.splice(index, 1); // Remove the item from the array after deletion
    },
    error => console.error('Error deleting daily expesne', error)
  );
  this.showToastDailyExpense();
  console.log("Delete Pressed")
}

 //toasts, messages that disappears
 async showToastIncome() {
  const toast = await this.toastCtrl.create({
    message: 'The Income value has been removed from the Database, Refresh the page to see the changes ',
    duration: 3000,
    position: 'top'
  });
 await toast.present();
}
async showToastExpense() {
  const toast = await this.toastCtrl.create({
    message: 'The Expense value has been removed from the Database, Refresh the page to see the changes ',
    duration: 3000,
    position: 'top'
  });
 await toast.present();
}
// alerts used in the FAb button
async showToastDailyExpense() {
  const toast = await this.toastCtrl.create({
    message: 'The Daily Expense value has been removed from the Database, Refresh the page to see the changes ',
    duration: 3000,
    position: 'top'
  });
 await toast.present();
}

async AlertDashboard1() {
  const alert = await this.alertController.create({
   header: 'Monthly Budget Explained',
   message: 'This Page shows all the inputs from Budget Calculator page and Expense report. The data will be completly deleted from the database, if delete is pressed',
   buttons: ['Okay']
  });
  await alert.present();
}






}

