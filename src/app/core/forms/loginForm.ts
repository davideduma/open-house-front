import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';

export class LoginForm extends FormGroup {
    constructor() {
        super({
            userName: new FormControl(''),
            password: new FormControl('')
        });
    }
}