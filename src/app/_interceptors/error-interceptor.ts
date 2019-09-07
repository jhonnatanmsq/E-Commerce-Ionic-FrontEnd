import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageService } from '../_services/storage.service';
import { throwError } from 'rxjs';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    constructor (private storage : StorageService){}

    intercept(req : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>>{
        return next.handle(req)
        .pipe(catchError((error, caught) => {

            let errorObj = error;
            if(errorObj.error){
                errorObj = errorObj.error;
            }

            if(!errorObj.status){
                errorObj = JSON.parse(errorObj);
            }

            console.log(errorObj);

            switch(errorObj.status){
                case 403:
                    this.handle403();
                    break;
            }

            return throwError(errorObj);
         })
        ) as any;
    }

    handle403(){
        this.storage.setLocalUser(null);
    }
}

export const ErrorInterceptorProvider = {
    provide : HTTP_INTERCEPTORS,
    useClass : ErrorInterceptor,
    multi : true
}