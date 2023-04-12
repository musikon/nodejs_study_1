import { Test, TestingModule } from '@nestjs/testing';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { getModelToken } from '@nestjs/sequelize';
import { Role } from './role.model';

describe('RolesController', () => {
  let controller: RolesController;
  let service: RolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        RolesService,
        {
          provide: getModelToken(Role),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<RolesController>(RolesController);
    service = module.get<RolesService>(RolesService);
  });

  it('should create a role', async () => {
    const role = { value: 'test' };
    jest.spyOn(service, 'createRole').mockResolvedValueOnce(role as any);

    const result = await controller.create(role as any);

    expect(result).toBe(role);
  });

  it('should get a role by value', async () => {
    const role = { id: 1, value: 'test' };
    jest.spyOn(service, 'getRoleById').mockResolvedValueOnce(role as any);

    const result = await controller.getByValue('test');

    expect(result).toBe(role);
  });
});