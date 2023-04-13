import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {Test, TestingModule} from "@nestjs/testing";
import {JwtAuthGuard} from "./jwt-auth.guard";
import {JwtService} from "@nestjs/jwt";
import {UsersService} from "../users/users.service";
import {CreateUserDto} from "../users/dto/create-user.dto";


describe('UserController', () => {
  let controller: AuthController;
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            registration: jest.fn()
          }
        },
        {
          provide: JwtAuthGuard,
          useValue: jest.fn().mockImplementation(() => true)
        },
        {
          provide: JwtService,
          useValue: {}
        },
        { provide: UsersService, useValue: {} },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('login', () => {
    it('should call authService.login with the provided userDto', () => {
      const userDto: CreateUserDto = { email: "test@mail.com", password: "password12345" };
      const spy = jest.spyOn(service, 'login');
      controller.login(userDto);
      expect(spy).toHaveBeenCalledWith(userDto);
    });
  });
  describe('registration', () => {
    it('should call authService.registration with the provided userDto', () => {
      const userDto: CreateUserDto = { email: "test@mail.com", password: "password12345" };
      const spy = jest.spyOn(service, 'registration');
      controller.registration(userDto);
      expect(spy).toHaveBeenCalledWith(userDto);
    });
  });
});