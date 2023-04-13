import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {JwtService} from "@nestjs/jwt";
import {CreateUserDto} from "./dto/create-user.dto";
import {AddRoleDto} from "./dto/add-role.dto";

describe('UserController', () => {
  let controller: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            createUser: jest.fn(),
            getAllUsers: jest.fn(),
            deleteUserById: jest.fn(),
            addRole: jest.fn()
          }
        },
        {
          provide: JwtAuthGuard,
          useValue: jest.fn().mockImplementation(() => true)
        },
        {
          provide: JwtService,
          useValue: {}
        }
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call userService.createUser with the provided userDto', () => {
      const userDto: CreateUserDto = { email: "test@mail.com", password: "password12345" };
      const spy = jest.spyOn(userService, 'createUser');
      controller.create(userDto);
      expect(spy).toHaveBeenCalledWith(userDto);
    });
  });
  describe('getAllUsers', () => {
    it('should call userService.getAllUsers', () => {
      const spy = jest.spyOn(userService, 'getAllUsers');
      controller.getAllUsers();
      expect(spy).toHaveBeenCalled();
    });
  });
  describe('deleteUser', () => {
    it('should call userService.deleteUserById with the provided id', () => {
      const id = '1';
      const spy = jest.spyOn(userService, 'deleteUserById');
      controller.deleteUser(id);
      expect(spy).toHaveBeenCalledWith(Number(id));
    });
  });
  describe('addRole', () => {
    it('should call userService.addRole with the provided dto', () => {
      const dto: AddRoleDto = { value: "admin", userId: 1 };
      const spy = jest.spyOn(userService, 'addRole');
      controller.addRole(dto);
      expect(spy).toHaveBeenCalledWith(dto);
    });
  });
});