import { AbstractControl } from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
        const password = AC.get('newPassword').value;
        const confirmPassword = AC.get('verifyPassword').value;
        if (password !== confirmPassword) {
            AC.get('verifyPassword').setErrors({ MatchPassword: true });
        } else {
            return null;
        }
    }
}
