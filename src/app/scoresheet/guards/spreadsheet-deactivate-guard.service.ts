import { Injectable, Inject } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ScoresheetComponent } from '../components/scoresheet/scoresheet.component';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { DeactivateDialogComponent } from '../components/deactivate-dialog/deactivate-dialog.component';
import { Store } from '@ngxs/store';
import { RegistrationState } from '../../registrations/store/state/registration.state';
import { AddPending } from '../../registrations/store/actions/registration.actions';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


@Injectable()
export class ConfirmDeactivateGuard implements CanDeactivate<ScoresheetComponent> {

    constructor(public dialog: MatDialog, private store: Store) { }

    canDeactivate(target: ScoresheetComponent): Observable<boolean> | boolean {
        if (!target.verify(target.result)) {

            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.width = '400px';
            dialogConfig.data = {
                pending: target.PENDING,
                cancel: target.CANCEL,
                quit: target.QUIT
            }
            const dialogRef = this.dialog.open(DeactivateDialogComponent, dialogConfig);

            return dialogRef.afterClosed().pipe(map((data) => {
                if (data === target.PENDING) {
                    this.store.dispatch([new AddPending(target.registration)]);
                    return true;
                }
                else if (data === target.QUIT) {
                    target.reset(target.scoreSheet);
                    return true;
                }
                else if (data === target.CANCEL) {
                    return false;
                }
            }));
        }
        return true;
    }

}