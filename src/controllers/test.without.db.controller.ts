import { DatabaseContext } from '@/database/contex';
import { BaseController, Controller, Get } from '@/lib';
import { Request, Response } from "express";

@Controller('/out')
export class TestWithoutDbController extends BaseController {
    private _database = DatabaseContext.CommunityCsGoServers();

    @Get("/123")
    public async TestMethod($: this, request: Request, response: Response): Promise<void> {
        const result = await $._database.query("SELECT * FROM sotaos2 WHERE id = ?", [2]);
        response.json({ ts: Date.now(), t: "out", result: result });
    }
}
