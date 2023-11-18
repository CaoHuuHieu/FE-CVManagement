import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthChildGuard implements CanActivateChild {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const role = localStorage.getItem('role');
    const { routeConfig } = route;
    const { path } = routeConfig as Route;

    if (path?.includes('cv') && role == null) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }

    if (role == null) {
      this.router.navigateByUrl('/login');
      return false;
    }

    if (
      (path?.includes('hr') ||
        path?.includes('account/create') ||
        path?.includes('hr/view')) &&
      role === 'HrManager'
    ) {
      return true;
    }

    if (
      (path?.includes('customer') ||
        path?.includes('upload-file') ||
        path?.includes('customer/view')) &&
      (role === 'HrManager' || role === 'Hr')
    ) {
      return true;
    }

    if (
      path?.includes('cv') &&
      (role === 'HrManager' || role === 'Hr' || role === 'Customer')
    ) {
      return true;
    }
    this.router.navigateByUrl('/forbidden');
    return false;
  }
}
