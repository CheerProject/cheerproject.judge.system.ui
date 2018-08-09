import { Registration } from './../../models/registration';
import { Component, OnInit, Input } from '@angular/core';
import { RegistrationStatus } from '../../enums/registration-status.enum';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  @Input()
  registrations: Registration[];

  onTime: RegistrationStatus = RegistrationStatus.OnTime;

  constructor() {}

  ngOnInit() {}
}
