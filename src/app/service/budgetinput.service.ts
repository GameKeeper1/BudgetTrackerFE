import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BudgetinputService {
  

  private apiUrl = 'http://localhost:3000/add-budgetinput';
  private getApiUrl='http://localhost:3000/budgetinputs';
  private deleteApiUrl='http://localhost:3000/budgetinputs/:id'

  private apiUrl2 = 'http://localhost:3000/add-budgetexpense';
  private getApiUrl2='http://localhost:3000/budgetexpenses';
  private deleteApiUrl2='http://localhost:3000/budgetexpenses/:id';

  private apiUrl3 = 'http://localhost:3000/add-dailyexpense';
  private getApiUrl3='http://localhost:3000/dailyexpenses';
  private deleteApiUrl3='http://localhost:3000/dailyexpenses/:id';

  constructor(private http: HttpClient) { }

  addBudgetInput(budgetinputs:any[]):Observable<any>{
    const headers=new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(this.apiUrl,{budgetinputs},{headers});
  }

  getBudgetInputs(): Observable<any>{
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.get<any>(this.getApiUrl);
  }
  
  deleteBudgetInput(index: number): Observable<any>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const url = this.deleteApiUrl.replace(':id', index.toString());
    return this.http.delete<any>(url, { headers });
  }

  //expenses

  addBudgetExpense(budgetexpenses:any[]):Observable<any>{
    const headers=new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(this.apiUrl2,{budgetexpenses},{headers});
  }

  getBudgetExpenses(): Observable<any>{
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.get<any>(this.getApiUrl2);
  }

  deleteBudgetExpense(index: number): Observable<any>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const url = this.deleteApiUrl2.replace(':id', index.toString());
    return this.http.delete<any>(url, { headers });
  }
// daily expense


  addDailyExpense(dailyexpenses:any[]):Observable<any>{
    const headers=new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(this.apiUrl3,{dailyexpenses},{headers});
  }

  getDailyExpenses(): Observable<any>{
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.get<any>(this.getApiUrl3);
  }

  deleteDailyExpense(index: number): Observable<any>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const url = this.deleteApiUrl3.replace(':id', index.toString());
    return this.http.delete<any>(url, { headers });
  
  }
  
}
