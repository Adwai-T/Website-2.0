import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @ViewChild('contactForm') public contactForm!: NgForm;

  constructor() {}

  ngOnInit(): void {}

  public onSubmit(): void {
//--- console.log(this.contactForm.form.value);
  }
}
