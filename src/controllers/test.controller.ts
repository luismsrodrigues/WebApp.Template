import { BaseController, Controller, Get, Authorize, ValidationError } from '@/lib';
import { DatabaseContext } from "@/database/contex";

@Controller('/test')
export class TestController extends BaseController {
  private _database = DatabaseContext.CommunityCsGoServers();

  @Get("/123")
  public TestMethod(): any {
    return { Test: 222, ts: Date.now() };
  }

  @Get("/db")
  public async DB(): Promise<[]> {
    const result = await this._database.query("SELECT * FROM sotaos WHERE id = ?", [2]);
    return result;
  }

  @Get("/1")
  @Authorize()
  public Test(): any {
    return { Test: 222, ts: Date.now() };
  }

  @Get("/2")
  public Method2(): any {
    throw new ValidationError("Este código não é válido.").AddValue({
      field: "Username",
      message: "Campo obrigatório"
    });
  }
}
