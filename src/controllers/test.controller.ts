import { BaseController, Controller, Get, Authorize, ValidationError } from '@/lib';
import { Request, Response } from "express";
import { DatabaseContext } from "@/database/contex";

@Controller('/test')
export class TestController extends BaseController {
  private _database = DatabaseContext.CommunityCsGoServers();

  @Get("/123")
  public TestMethod($: this, request: Request, response: Response): void {
    response.json({ Test: 222, ts: Date.now() });
  }

  @Get("/db")
  public async DB($: this, request: Request, response: Response): Promise<void> {
    const result = await $._database.query("SELECT * FROM sotaos WHERE id = ?", [2]);
    response.json({ result: result });
  }

  @Get("/1")
  @Authorize()
  public Test($: this, request: Request, response: Response): void {
    response.json({ Test: 123123123, ts: Date.now() });
  }

  @Get("/2")
  public Method2($: this, request: Request, response: Response, next): void {
    throw new ValidationError("Este código não é válido.").AddValue({
      field: "Username",
      message: "Campo obrigatório"
    });
  }
}
