import { Controller, Get } from '../utils/decorators';
import { BaseController } from './base.controller';
import { Request, Response, NextFunction } from "express";

@Controller('/test')
export class TestController extends BaseController {

  @Get("/123")
  public TestMethod($: this, request: Request, response: Response, next: NextFunction) : void{
    response.json({Test: $.BasePath, ts: Date.now()});
  }
}
