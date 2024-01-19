import { FormControl, FormGroup, Validators } from "@angular/forms";

export class RegisterForm extends FormGroup {
    constructor() {
        super({
            firstName: new FormControl('', [ Validators.required ]),
            lastName: new FormControl('', [ Validators.required ]),
            country: new FormControl('', [ Validators.required ]),
            documentType: new FormControl('', [ Validators.required ]),
            documentNumber: new FormControl('', [ Validators.required ]),
            email: new FormControl('', [ Validators.required ]),
            userName: new FormControl('', [ Validators.required ]),
            password: new FormControl('', [ Validators.required ]),
            passwordConfirmation: new FormControl('', [ Validators.required ])
        });
    }

    passwordMatchEvaluation(): boolean {
        return this.controls['password'].value === 
            this.controls['passwordConfirmation'].value;
    }

    
}