import { Registration } from "../../models/registration";

export class GetRegistrations {
    static readonly type = '[Registrations] Get all'
}

export class AddOntime {
    static readonly type = '[Ontime] Add'
    constructor(public registration: Registration){}
}
export class RemoveOntime {
    static readonly type = '[Ontime] Remove'
    constructor(public registration: Registration){}
}




export class AddPending{
    static readonly type = '[Pending] Add'
    constructor(public registration: Registration){}
}
export class RemovePending{
    static readonly type = '[Pending] Remove'
    constructor(public registration: Registration){}
}


export class AddCompleted{
    static readonly type = '[Completed] Add'
    constructor(public registration: Registration){}
}
export class RemoveCompleted{
    static readonly type = '[Completed] Remove'
    constructor(public registration: Registration){}
}