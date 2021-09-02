import { Controller, Get, Authorize } from '@/utils/decorators';
import { BaseController } from './base.controller';
import { Request, Response } from "express";

@Controller('/test')
export class TestController extends BaseController {
  private varTest = 'asd';

  @Get("/123")
  public TestMethod($: this, request: Request, response: Response): void {
    response.json({ Test: 111, ts: Date.now() });
  }

  @Get("/1")
  @Authorize()
  public Test($: this, request: Request, response: Response): void {
    response.json({ Test: 123123123, ts: Date.now() });
  }

  @Get("/2")
  public Method2($: this, request: Request, response: Response): void {
    response.json({ Test: $.BasePath, ts: Date.now() });
  }
}
