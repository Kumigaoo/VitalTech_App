import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { PacienteService } from '../services/paciente.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  const oidcSecurityService = inject(OidcSecurityService);
  let token: any;

  oidcSecurityService.getAccessToken().subscribe((result) => {
    token = result;
  });

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(authReq);
  }

  return next(req);
};
