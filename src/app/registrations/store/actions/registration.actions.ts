import { Registration } from '../../models/registration';

export class GetRegistrations {
    static readonly type = '[Registrations] Get all';
}

export class UpdateRegistration {
    static readonly type = '[UpdateRegistration] On time';
    constructor(public registration: Registration) { }
}

export class PendingRegistration {
    static readonly type = '[UpdateRegistration] Pending';
    constructor(public registration: Registration) { }
}

export class CompletedRegistration {
    static readonly type = '[UpdateRegistration] Completed';
    constructor(public registration: Registration) { }
}

export class OnTimeRegistration {
    static readonly type = '[UpdateRegistration] On time';
    constructor(public registration: Registration) { }
}
