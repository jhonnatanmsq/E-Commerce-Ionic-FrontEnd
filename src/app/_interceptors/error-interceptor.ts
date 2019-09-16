import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FieldMessage } from '../_models/field_message';
import { StorageService } from '../_services/storage.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private storage: StorageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(catchError((error, caught) => {

                let errorObj = error;
                if (errorObj.error) {
                    errorObj = errorObj.error;
                }

                if (!errorObj.status) {
                    errorObj = JSON.parse(errorObj);
                }

                console.log(errorObj);

                switch (errorObj.status) {
                    case 403:
                        this.handle403();
                        break;
                    case 401:
                        this.handle401();
                        break;
                    case 422:
                        this.handle422(errorObj);
                        break;
                    default:
                        this.handleDefault(errorObj);
                        break
                }

                return throwError(errorObj);
            })
            ) as any;
    }

    handle403() {
        this.storage.setLocalUser(null);
    }
    handle401() {
        alertify.error("E-mail ou Senha incorretos!");
    }
    handle422(errorObj) {
        alertify.alert('Erro 422: Formulário Inválido',
            this.listErrors(errorObj.errors),
            function () {
                alertify.error('Corrija os campos e tente novamente');
            }
        );

    }
    private listErrors(messages: FieldMessage[]): String {
        let s: String = '';
        for (var i = 0; i < messages.length; i++) {
            s = s + '<p><strong>' + messages[i].fieldName + "</strong>: " + messages[i].message + "</p>"
        }
        return s;
    }
    handleDefault(errorObj) {
        alertify.error(`Erro ${errorObj.status}: ${errorObj.error}`);
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
}