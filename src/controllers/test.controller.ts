import { Controller } from '../utils/decorators';
import { BaseController } from './base.controller';

@Controller('/test')
export class TestController extends BaseController {
  constructor() {
    super();
  }
}
