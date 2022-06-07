import { EventEmitter, Injectable } from '@angular/core';

export interface Error{
  code:number;
  message:string;
  title?:string;
  source?:string;
  icon?:string;
  timeActive?:number;
}

@Injectable({
  providedIn: 'root',
})
export class ErrorsService {
  private errors: Error[] = [];

  public errorsEvent: EventEmitter<Error[]> = new EventEmitter();

  constructor() {}

  public getAllErrors():Error[] {
    return this.errors;
  }

  public addError(error: Error): void {
    this.errors.push(error);
    this.errorsEvent.emit(this.errors);
  }

  public removeFirstError(): Error | undefined {
    let returnString: Error | undefined = this.errors.shift();
    return returnString;
  }

  public clearAllErrors(): void {
    this.errors = [];
  }

  public removeErrorAtIndex(index: number): void {
    this.errors = this.errors.filter((value, i) => i !== index);
  }
}
