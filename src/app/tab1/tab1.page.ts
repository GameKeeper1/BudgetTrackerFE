import { Component, OnInit } from '@angular/core';
import { FormArray,FormBuilder,FormGroup, Validators } from '@angular/forms';
import { BudgetinputService } from '../service/budgetinput.service';
import { NavController,AlertController } from '@ionic/angular';
import { STRING_TYPE } from '@angular/compiler';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  
  budgetincome: any[]= [];
  budgetexpense: any[]=[];
  dailyexpense:any[]=[];
  sumincome=0;
  sumexpense=0;
  sumdailyexpense=0;
  monthlybudget=0;
  monthlyremainder=0;

  dailybudget=0;
  dailyremainder=0;
  daysRemaining=0;

  thisMonth='';

  

  

  


 
 
  constructor( private bi: BudgetinputService, private alertController: AlertController) { }
  ngOnInit(): void {

    this.bi.getBudgetInputs().subscribe(data1=>{
      this.budgetincome=data1;

          
      for(let i = 0;i<data1.length;i++){
      this.sumincome += data1[i].income;        
        
      }   
      
      this.updateMonthlyBudget(); 
      this.updateMonthlyRemainder();
      this.thismonthstring1();

    })

    this.bi.getBudgetExpenses().subscribe(data2=>{
      this.budgetexpense=data2;

     

      for(let j = 0;j<data2.length;j++){
        this.sumexpense += data2[j].expense; 


      
      }
      this.updateMonthlyBudget();
      this.updateMonthlyRemainder();
    })

    this.bi.getDailyExpenses().subscribe(data3=>{
      this.dailyexpense=data3;

      console.log(data3[1])

      for(let j = 0;j<data3.length;j++){
        this.sumdailyexpense += data3[j].dexpense; 


      
      }
      console.log(this.dailyexpense+'h');
      this.updateMonthlyRemainder();
    })
   
   

   
   
    }

    private updateMonthlyBudget(): void{

    this.monthlybudget = this.sumincome-this.sumexpense;
    this.dailybudget= this.monthlybudget/this.daysInThisMonth();
    // round the values
    this.monthlybudget=Math.round(this.monthlybudget);
    this.dailybudget=Math.round(this.dailybudget);

    }

    private updateMonthlyRemainder(): void{
      this.monthlyremainder =this.sumincome-this.sumexpense-this.sumdailyexpense;
      this.dailyremainder=this.monthlyremainder/this.daysRemainingMonth();
   //round the values
      this.monthlyremainder=Math.round(this.monthlyremainder);
      this.dailyremainder=Math.round(this.dailyremainder);

   


    }
    public thismonthstring1(){
      const monthNames = ['January','February','March','April','May','June','July','August','September','Octomber','November','December']; 
      const thisMonth = monthNames[(new Date()).getMonth()]; const nextMonth = monthNames[(new Date()).getMonth() + 1];
      
      return thisMonth;
    }

    private daysInThisMonth(){
      let now = new Date();
      console.log(now);
      const totalDaysInMonth= new Date(now.getFullYear(), now.getMonth()+1,0).getDate();

      const today = now.getDate(); // Today's date (day of the month)
      this.daysRemaining = totalDaysInMonth - today; // Calculate remaining days
      console.log(`Days remaining this month: ${this.daysRemaining}`);
      
      return totalDaysInMonth;

      
    }

    private daysRemainingMonth(){
      let now = new Date();
      
      const totalDaysInMonth= new Date(now.getFullYear(), now.getMonth()+1,0).getDate();

      const today = now.getDate(); // Today's date (day of the month)
      this.daysRemaining = totalDaysInMonth - today; // Calculate remaining days
      console.log(`Days remaining this month: ${this.daysRemaining}`);
      
      return this.daysRemaining;

      
    }

    
  //Alerts that are used in list FAB Button
    async AlertDashboard1() {
      const alert = await this.alertController.create({
       header: 'Monthly Budget Explained',
       message: 'Fixed value: Outputs the amount of money you have after all the expenses has been subtracted each month. Total Income - Total Expenses',
       buttons: ['Okay']
      });
      await alert.present();
    }

    async AlertDashboard2() {
      const alert = await this.alertController.create({
       header: 'Monthly Remainder Explained',
       message: 'Dynamic value: This value updates each time an expense report is submited. Monthly Budget - Total Daily Expenses ',
       buttons: ['Okay']
      });
      await alert.present();
    }

      async AlertDashboard3() {
        const alert = await this.alertController.create({
         header: 'Daily Budget Explained',
         message: 'Fixed Value: This value is Monthly budget devided by total number of days of the current month',
         buttons: ['Okay']
        });
        await alert.present();
      }

      async AlertDashboard4() {
        const alert = await this.alertController.create({
         header: 'Daily Remainder Explained',
         message: 'Dynamic Value: This value is (Monthly budget-Daily Expenses)/(Remaining Days of the current month)',
         buttons: ['Okay']
        });
        await alert.present();
      }

      async AlertDashboard5() {
        const alert = await this.alertController.create({
         header: 'Days Remaining of the current month Explained',
         message: 'Total Days of the current month - Current Day',
         buttons: ['Okay']
        });
        await alert.present();
      }
    }

    
    
  

 


