import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private _http:HttpClient) { }
  addItem(data:any):Observable<any>{
    return this._http.post('http://localhost:3000/item',data)
  }
 editItem(id:number,data:any):Observable<any>{
    return this._http.put(`http://localhost:3000/item/${id}`,data)
  }
  getItemlist():Observable<any>{
    return this._http.get('http://localhost:3000/item')
  }
  deleteItem(id:number):Observable<any>{
    return this._http.delete(`http://localhost:3000/item/${id}`)
  }
}
