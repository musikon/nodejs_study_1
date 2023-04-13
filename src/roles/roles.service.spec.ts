import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from './roles.service';
import { Role } from './role.model';
import { getModelToken } from '@nestjs/sequelize';

describe('RolesService', () => {
  let service: RolesService;
  let mockRoleModel = {
    findOne: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: getModelToken(Role),
          useValue: mockRoleModel
        }
      ],
    }).compile();

    service = module.get<RolesService>(RolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createRole', () => {
    it('should create and return a role', async () => {
      const mockRole = {
        id: 1,
        value: 'admin'
      };
      const mockCreateRoleDto = {
        value: 'admin'
      };
      mockRoleModel.create = jest.fn().mockReturnValue(mockRole);
      const result = await service.createRole(mockCreateRoleDto);
      expect(mockRoleModel.create).toHaveBeenCalledWith(mockCreateRoleDto);
      expect(result).toEqual(mockRole);
    });
  });

  describe('getRoleById', () => {
    it('should return a role by id', async () => {
      const mockRole = {
        id: 1,
        value: 'admin'
      };
      const mockRoleId = '1';
      mockRoleModel.findOne = jest.fn().mockReturnValue(mockRole);
      const result = await service.getRoleById(mockRoleId);
      expect(mockRoleModel.findOne).toHaveBeenCalledWith({ where: { value: mockRoleId } });
      expect(result).toEqual(mockRole);
    });
  });
});