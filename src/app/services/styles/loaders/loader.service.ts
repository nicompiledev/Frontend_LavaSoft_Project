import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loaderSubject = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.loaderSubject.asObservable();

  constructor() { }

  public showLoader() {
    this.loaderSubject.next(true);
  }

  public hideLoader() {
    this.loaderSubject.next(false);
  }

}
