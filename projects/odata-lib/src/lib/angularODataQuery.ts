import {map,filter,mergeMap,catchError} from 'rxjs/operators';

import {throwError as observableThrowError,  Observable } from 'rxjs';

import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';

import { ODataConfiguration } from './angularODataConfiguration';
import { ODataExecReturnType } from './angularODataEnums';
import { ODataOperation } from './angularODataOperation';
import { ODataPagedResult } from './angularODataPagedResult';
import { IODataResponseModel } from './angularODataResponseModel';

export class ODataQuery<T> extends ODataOperation<T> {

    // private _count: boolean;
    // private _paged: boolean;
    private _filter: string;
    private _top: number;
    private _skip: number;
    private _orderBy: string[] = [];
    private _apply: string[] = [];
    private _entitiesUri: string;

    constructor(typeName: string, config: ODataConfiguration, http: HttpClient) {
        super(typeName, config, http);

        this._entitiesUri = config.getEntitiesUri(this.typeName);
    }

    public Filter(filter: string): ODataQuery<T> {
        if (filter) {
            this._filter = filter;
        }
        return this;
    }

    public Top(top: number): ODataQuery<T> {
        this._top = top;
        return this;
    }

    public Skip(skip: number): ODataQuery<T> {
        this._skip = skip;
        return this;
    }

    public OrderBy(orderBy: string | string[]): ODataQuery<T> {
        if (orderBy) {
            this._orderBy = this.toStringArray(orderBy);
        }
        return this;
    }

    public Apply(apply: string | string[]): ODataQuery<T> {
        if (apply) {
            this._apply = this.toStringArray(apply);
        }
        return this;
    }

    public Exec(): Observable<T[]>;
    public Exec(returnType: ODataExecReturnType.Count): Observable<number>;
    public Exec(returnType: ODataExecReturnType.PagedResult): Observable<ODataPagedResult<T>>;
    public Exec(returnType?: ODataExecReturnType): Observable<T[] | ODataPagedResult<T> | number> {
        const requestOptions: {
            headers?: HttpHeaders;
            observe: 'response';
            params?: HttpParams;
            reportProgress?: boolean;
            responseType?: 'json';
            withCredentials?: boolean;
        } = this.getQueryRequestOptions(returnType === ODataExecReturnType.PagedResult);

        switch (returnType) {
            case ODataExecReturnType.Count:
                const countUrl = `${this._entitiesUri}/${this.config.keys.count}`;
                return this.http.get<number>(countUrl, requestOptions).pipe(
                    map(res => this.extractDataAsNumber(res, this.config))
                    ,catchError((err: any, caught: Observable<number>) => {
                        if (this.config.handleError) {
                            this.config.handleError(err, caught);
                        }
                        return observableThrowError(err);
                    }));

            case ODataExecReturnType.PagedResult:
                return this.http.get<IODataResponseModel<T>>(this._entitiesUri, requestOptions).pipe(
                    map(res => this.extractArrayDataWithCount(res, this.config))
                    ,catchError((err: any, caught: Observable<ODataPagedResult<T>>) => {
                        if (this.config.handleError) {
                            this.config.handleError(err, caught);
                        }
                        return observableThrowError(err);
                    }));

            default:
                return this.http.get<T[]>(this._entitiesUri, requestOptions).pipe(
                    map(res => this.extractPlainArrayData(res, this.config))
                    ,catchError((err: any, caught: Observable<Array<T>>) => {
                        if (this.config.handleError) {
                            this.config.handleError(err, caught);
                        }
                        return observableThrowError(err);
                    }));
        }
    }

    public ExecWithCount(): Observable<ODataPagedResult<T>> {
        return this.Exec(ODataExecReturnType.PagedResult);
    }

    private getQueryRequestOptions(odata4: boolean): {
        headers?: HttpHeaders;
        observe: 'response';
        params?: HttpParams;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    } {
        let params = super.getParams();

        if (this._filter) {
            params = params.append(this.config.keys.filter, this._filter);
        }

        if (this._top > 0) {
            params = params.append(this.config.keys.top, this._top.toString());
        }

        if (this._skip > 0) {
            params = params.append(this.config.keys.skip, this._skip.toString());
        }

        if (this._orderBy.length > 0) {
            params = params.append(this.config.keys.orderBy, this.toCommaString(this._orderBy));
        }

        if (this._apply.length > 0) {
            params = params.append(this.config.keys.apply, this.toCommaString(this._apply));
        }

        if (odata4) {
            params = params.append('$count', 'true'); // OData v4 only
        }

        const options = Object.assign({}, this.config.defaultRequestOptions);
        options.params = params;

        return options;
    }

    private extractDataAsNumber(res: HttpResponse<number>, config: ODataConfiguration): number {
        return config.extractQueryResultDataAsNumber(res);
    }

    private extractArrayData(res: HttpResponse<IODataResponseModel<T>>, config: ODataConfiguration): T[] {
        return config.extractQueryResultData(res);
    }

    private extractPlainArrayData(res: HttpResponse<T[]>, config: ODataConfiguration): T[] {
      return config.extractQueryResultPlainData(res);
  }
    private extractArrayDataWithCount(res: HttpResponse<IODataResponseModel<T>>, config: ODataConfiguration): ODataPagedResult<T> {
        return config.extractQueryResultDataWithCount(res);
    }
}
