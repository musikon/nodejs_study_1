import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {Test, TestingModule} from "@nestjs/testing";
import {JwtAuthGuard} from "./jwt-auth.guard";
import {JwtService} from "@nestjs/jwt";
import {UsersService} from "../users/users.service";
import {CreateUserDto} from "../users/dto/create-user.dto";


describe('UserService', () => {
  let controller: AuthController;
  let service: AuthService
  let mockAuth = {
    login: jest.fn(),
    registration: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuth
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
    it('should return a token', async () => {
      const userDto: CreateUserDto = { email: "test@mail.com", password: "password12345" };
      const token = "token"
      mockAuth.login.mockReturnValue(token);
      const result = await service.login(userDto);

      expect(mockAuth.login).toHaveBeenCalledWith(userDto);
      expect(result).toEqual(token);
    });
  });
  describe('registration', () => {
    it('should create user and return a token', async () => {
      const userDto: CreateUserDto = { email: "test@mail.com", password: "password12345" };
      const token = "token"
      mockAuth.registration.mockReturnValue(token);
      const result = await service.registration(userDto);

      expect(mockAuth.registration).toHaveBeenCalledWith(userDto);
      expect(result).toEqual(token);
    });
  });
});