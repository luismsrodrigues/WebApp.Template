import { BaseController, Controller, Get, Post, RequestQuery, RequestParams, RequestBody } from '@/lib';

export class RequestTest {
    public test: string
}

@Controller('/out')
export class TestWithoutDbController extends BaseController {

    @Get("/123/:test")
    public async TestParamOnRoute(Params: RequestParams<any>): Promise<any> {
        return Params;
    }

    @Get("/123")
    public async TestQueryString(Query: RequestQuery<any>): Promise<any> {
        return Query;
    }

    @Post("/123")
    public async PostTestBody(Body: RequestBody<RequestTest>): Promise<any> {
        return {
            instance: this,
            Body
        };
    }
}
