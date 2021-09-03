import * as core from "express-serve-static-core";

export interface RequestBody<TBody> {
    data: TBody
}

export interface RequestParams<TParams> {
    params: TParams
}


export interface RequestQuery<TQuery> {
    values: TQuery
}