import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ContactService } from 'src/app/services/contact.service';
import { ErrorsService } from 'src/app/services/errors.service';
import { ServerResponse } from 'src/app/interface/interfaces';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit, OnDestroy {
  @ViewChild('contactForm') public contactForm!: NgForm;

  private sendSubscription!: Subscription;
  private sendBottonPressed: boolean = false;

  constructor(private contact: ContactService, private errors: ErrorsService) {}

  ngOnInit(): void {}

  public onSubmit(): void {
    if (this.sendBottonPressed) {
      this.errors.addError({
        code: 0,
        message: 'Please wait sending message.',
      });
      return;
    } else this.sendBottonPressed = true;

    let feedback = this.contactForm.form.value;

    this.sendSubscription = this.contact.send(feedback).subscribe(
      (message: ServerResponse) => {
        this.errors.addError(message);
        this.sendBottonPressed =false;
      },
      (err: any) => {
        this.errors.addError({
          code: 0,
          message: 'Sorry message could note be save, please try again.',
        });
        this.sendBottonPressed = false;
      },
      () => {
        this.sendBottonPressed = false;
      }
    );
  }

  public ngOnDestroy(): void {
    this.sendSubscription?.unsubscribe();
  }
}
