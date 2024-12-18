import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cow } from './cow.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CowService {

  private apiUrl = 'http://localhost:3000/api/cows';

  cows: Cow[] = [];
  cowSelectedEvent = new EventEmitter<Cow>();
  cowChangedEvent = new EventEmitter<Cow[]>();
  cowListChangedEvent = new Subject<Cow[]>();

  maxCowId: number;

  constructor(private http: HttpClient) { 
    this.maxCowId = this.getMaxId();
  }

    getMaxId(): number {

    var maxId = 0;

    for (const cow of this.cows) {
      var currentId = parseInt(cow.id);
      
      if (currentId > maxId)
        maxId = currentId;
    }
    return maxId;
  }
  
  // Fetch cows from the backend (MongoDB)
  getCows(): Observable<Cow[]> {
    const cows = this.http.get<Cow[]>(this.apiUrl);
    console.log(cows);
    return cows;
  }

  // Fetch a single cow by id from the backend
  getCow(id: string): Observable<Cow> {
    const cow = this.http.get<Cow>(`${this.apiUrl}/${id}`)
    console.log(cow);
    return cow;
  }

  // Add a new cow to MongoDB
  addCow(newCow: Cow) {
    if (!newCow) {
      return;
    }

    // Call the API to add the cow to MongoDB
    this.http.post<Cow>(this.apiUrl, newCow).subscribe(
      (cow: Cow) => {
        this.cows.push(cow);
        const cowsClone: Cow[] = this.cows.slice();
        this.cowListChangedEvent.next(cowsClone);
      },
      error => {
        console.error('Error adding cow:', error);
      }
    );
  }

  // Update an existing cow in MongoDB
  updateCow(originalCow: Cow, newCow: Cow) {
    if (!originalCow || !newCow) {
      return;
    }

    const pos = this.cows.findIndex(cow => cow.id === originalCow.id);

    if (pos < 0) {
      return;
    }

    newCow.id = originalCow.id;

    // Call the API to update the cow in MongoDB
    this.http.put<Cow>(`${this.apiUrl}/${originalCow.id}`, newCow).subscribe(
      (updatedCow: Cow) => {
        this.cows[pos] = updatedCow;
        const cowsClone: Cow[] = this.cows.slice();
        this.cowListChangedEvent.next(cowsClone);
      },
      error => {
        console.error('Error updating cow:', error);
      }
    );
  }

  // Delete a cow from MongoDB
  deleteCow(id: string) {

    const cowToDelete = this.http.get<Cow>(`${this.apiUrl}/${id}`)
  
    // Call the API to delete the cow from MongoDB
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(
      () => {
        this.cows.splice(1);
        const cowsClone: Cow[] = this.cows.slice();
        this.cowListChangedEvent.next(cowsClone);
      },
      error => {
        console.error('Error deleting cow:', error);
      }
    );
  }
}



//My prev file 
// import { Injectable, EventEmitter } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Cow } from './cow.model';
// import { MOCKCOWS } from './MOCKCOWS';
// import { Subject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class CowService {

//   private apiUrl = 'http://localhost:3000/api/cows';

//   cows : Cow[] = [];

//   cowSelectedEvent = new EventEmitter<Cow>();
//   cowChangedEvent = new EventEmitter<Cow[]>();
//   cowListChangedEvent = new Subject<Cow[]>();

//   maxCowId : number;

//   constructor(private http: HttpClient) { 
//     this.cows = MOCKCOWS;
//     this.maxCowId = this.getMaxId();
//   }

//   getCows(): Observable<Cow[]> {
//     return this.http.get<Cow[]>(this.apiUrl);
//   }

//   getCow(id: string): Cow {
//     // find id that matches from the list 
//     for (const cow of this.cows) {
//       if (cow.id == id)
//         return cow;
//     }
//     throw new Error(Cow with id ${id} not found); // Throw an error if not found
//   }

//   getMaxId(): number {

//     var maxId = 0;

//     for (const cow of this.cows) {
//       var currentId = parseInt(cow.id);
      
//       if (currentId > maxId)
//         maxId = currentId;
//     }
//     return maxId;
//   }

//   addCow(newCow: Cow) {
//     if (!newCow) {
//       return;
//     }

//     this.maxCowId++;

//     newCow.id = this.maxCowId.toString();

//     this.cows.push(newCow);
//     const cowsClone: Cow[] = this.cows.slice();

//     this.cowListChangedEvent.next(cowsClone);
//   }

//   updateCow(originalCow: Cow, newCow: Cow) {
//     if (!originalCow || !newCow)
//         return;

//     const pos = this.cows.indexOf(originalCow);

//     if (pos < 0)
//         return;

//     newCow.id = originalCow.id;
//     this.cows[pos] = newCow;
//     const cowsClone : Cow[] = this.cows.slice();
//     this.cowListChangedEvent.next(cowsClone);
//   }
  
//   deleteCow(cow: Cow) {
//     if (!cow) {
//        return;
//     }
//     const pos = this.cows.indexOf(cow);
//     if (pos < 0) {
//        return;
//     }
//     this.cows.splice(pos, 1);
//     const cowsClone : Cow[] = this.cows.slice();
//     this.cowListChangedEvent.next(cowsClone);
//  }
 
// }