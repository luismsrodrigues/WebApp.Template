import { BaseController, Controller, Get, Post, RequestBody, RequestParams, RequestQuery } from '@/lib';

class RequestTest {
    public test: string
}

class RequestQueryTest {
    public testQuery: string
}

@Controller('/out')
export class TestWithoutDbController extends BaseController {
    private t = "test";

    @Get("/123/:test")
    async TestParamOnRoute(@RequestParams Params: any): Promise<any> {
        return Params;
    }

    @Get("/123")
    async TestQueryString(@RequestQuery Query: any): Promise<any> {
        return Query;
    }

    @Post("/123")
    async PostTestBody(@RequestBody Body: RequestTest, @RequestQuery Query: RequestQueryTest): Promise<any> {
        return {
            instance: this,
            Body,
            Query
        };
    }
}
