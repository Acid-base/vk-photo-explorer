import { HttpService }  from './http.service';
import { AuthService }  from './auth.service';
import { AuthGuard }    from './auth-guard.service';
import { UserService }  from './user.service';
import { ToastService } from './toast.service';
import { ToastConfig }  from './toast.service';
import { ToastOptions } from 'ng2-toastr';

export { HttpService };
export { AuthService };
export { AuthGuard };
export { UserService };
export { ToastService };

export const services = [
    HttpService,
    AuthService,
    AuthGuard,
    UserService,
    ToastService, { provide: ToastOptions, useClass: ToastConfig }
];
