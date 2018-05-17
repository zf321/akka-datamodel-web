import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET } from "@angular/router";
import "rxjs/add/operator/filter";

export interface IBreadcrumb {
  label: string;
  params?: Params;
  url: string;
}

@Component({
  selector: "bread-crumb",
  template: `
    <p-breadcrumb [model]="breadcrumbs"></p-breadcrumb>
  `
})
export class BreadCrumbComponent implements OnInit {

  public breadcrumbs: IBreadcrumb[];

  ROUTE_DATA_BREADCRUMB: string = "title";
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.breadcrumbs = [];
  }

  ngOnInit() {

    // subscribe to the NavigationEnd event
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {

      // set breadcrumbs
      let root: ActivatedRoute = this.activatedRoute.root;
      this.breadcrumbs = this.getBreadcrumbs(root);
      // console.log(this.breadcrumbs);

    });
  }

  private getBreadcrumbs(route: ActivatedRoute, url: string = "#", breadcrumbs: IBreadcrumb[] = []): IBreadcrumb[] {

    // get the child routes
    let children: ActivatedRoute[] = route.children;

    // return if there are no more children
    if (children.length === 0) {
      return breadcrumbs;
    }

    // iterate over each children
    for (let child of children) {
      // verify primary route
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      // // verify the custom data property "breadcrumb" is specified on the route
      // if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
      //     return this.getBreadcrumbs(child, url, breadcrumbs);
      // }

      // get the route's URL segment
      let routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");

      // append route URL to URL
      url += `/${routeURL}`;

      // add breadcrumb
      let breadcrumb: IBreadcrumb = {
        label: child.snapshot.data[this.ROUTE_DATA_BREADCRUMB] ? child.snapshot.data[this.ROUTE_DATA_BREADCRUMB] : routeURL,
        params: child.snapshot.params,
        url: child.children.length > 0 ? url : ""
      };
      if (breadcrumbs.length > 0 && breadcrumbs[breadcrumbs.length - 1].label === breadcrumb.label) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }
      breadcrumbs.push(breadcrumb);


      // recursive
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }

    // we should never get here, but just in case
    return breadcrumbs;
  }

}
