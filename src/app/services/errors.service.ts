import { EventEmitter, Injectable } from '@angular/core';

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
    this.errorsEvent.emit(this.errors);
    return returnString;
  }

  public clearAllErrors(): void {
    this.errorsEvent.emit(this.errors);
    this.errors = [];
  }

  public clearErrorAtIndex(index: number): void {
    this.errors = this.errors.filter((value, i) => i !== index);
    this.errorsEvent.emit(this.errors);
  }
}
