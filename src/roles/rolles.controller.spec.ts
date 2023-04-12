import { Test, TestingModule } from '@nestjs/testing';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';

describe('RolesController', () => {
  let controller: RolesController;
  let service: RolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [RolesService],
    }).compile();

    controller = module.get<RolesController>(RolesController);
    service = module.get<RolesService>(RolesService);
  });

  describe('create', () => {
    it('should create a new role', async () => {
      const roleDto: CreateRoleDto = { value: 'test' };

      const result = await controller.create(roleDto);

      expect(result).toEqual({ id: '1', ...roleDto });
    });
  });

  describe('getByValue', () => {
    it('should get a role by its value', async () => {
      const role = { id: '1', value: 'test' };
      const value = 'test';

      const result = await controller.getByValue(value);

      expect(result).toEqual(role);
    });
  });
});