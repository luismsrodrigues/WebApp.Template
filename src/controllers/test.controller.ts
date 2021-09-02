import { Controller, Get, Authorize } from '@/utils/decorators';
import { BaseController } from './base.controller';
import { Request, Response, NextFunction } from "express";

@Controller('/test')
export class TestController extends BaseController {

  @Get("/123")
  @Authorize()
  public TestMethod($: this, request: Request, response: Response, next: NextFunction): void {
    response.json({ Test: $.BasePath, ts: Date.now() });
  }

  @Get("/1")
  public Test($: this, request: Request, response: Response, next: NextFunction): void {
    response.json({ Test: 123123123, ts: Date.now() });
  }
}
