import { AbstractControl } from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
        const password = AC.get('password').value;
        const confirmPassword = AC.get('password_confirmation').value;
        if (password !== confirmPassword) {
            AC.get('password_confirmation').setErrors({ MatchPassword: true });
        } else {
            return null;
        }
    }
}
