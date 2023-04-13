import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";

describe('UserService', () => {
  let service: UsersService;
  let roleService: RolesService
  let mockUserModel = {
    createUser: jest.fn(),
    getAllUsers: jest.fn(),
    getUserByEmail: jest.fn(),
    deleteUserById: jest.fn(),
    addRole: jest.fn().mockImplementation(() => null)
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: UsersService, useValue: mockUserModel },
        { provide: RolesService, useValue: { getRoleById: jest.fn() } }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    roleService = module.get<RolesService>(RolesService);
  });

  it('should be defined UserService', () => {
    expect(service).toBeDefined();
  });
  describe('createUser', () => {
    it('should create and return a user', async () => {
      const userDto: CreateUserDto = { email: "test@mail.com", password: "password12345" };
      const mockUser = { id: 1, ...userDto, roles: [], age: undefined };
      mockUserModel.createUser.mockReturnValue(mockUser);
      const result = await service.createUser(userDto);

      expect(mockUserModel.createUser).toHaveBeenCalledWith(userDto);
      expect(result).toEqual(mockUser);
    });
  });
  describe('getAllUsers', () => {
    it('should create and return a all users', async () => {
      const mockUsers = [{ id: 1, email: "test@mail.com", password: "password12345", roles: [], age: undefined }];
      mockUserModel.getAllUsers.mockReturnValue(mockUsers);
      const result = await service.getAllUsers();

      expect(mockUserModel.getAllUsers).toHaveBeenCalledWith();
      expect(result).toEqual(mockUsers);
    });
  });
  describe('getUserByEmail', () => {
    it('find user by email and return user', async () => {
      const email: string = 'test@mail.com';
      const mockUser = { id: 1, email, password: "password12345", roles: [], age: undefined };
      mockUserModel.getUserByEmail.mockReturnValue(mockUser);
      const result = await service.getUserByEmail(email);

      expect(mockUserModel.getUserByEmail).toHaveBeenCalledWith(email);
      expect(result).toEqual(mockUser);
    });
  });
  describe('deleteUserById', () => {
    it('should delete user by id and return success', async () => {
      const id = 1;
      const success = { success: 'User deleted' };
      mockUserModel.deleteUserById.mockReturnValue(success);
      const result = await service.deleteUserById(id);

      expect(mockUserModel.deleteUserById).toHaveBeenCalledWith(id);
      expect(result).toEqual(success);
    });
  });
});