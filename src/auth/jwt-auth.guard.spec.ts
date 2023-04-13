import { JwtAuthGuard } from './jwt-auth.guard';
import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;
  let mockContext: ExecutionContext;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtAuthGuard,
        {
          provide: Reflector,
          useValue: {},
        },
        {
          provide: JwtService,
          useValue: {
            verify: jest.fn().mockReturnValue({
              id: 1,
              username: 'john',
            }),
          },
        },
      ],
    }).compile();

    guard = module.get<JwtAuthGuard>(JwtAuthGuard);

    mockContext = {
      getClass: jest.fn(),
      getHandler: jest.fn(),
      getArgs: jest.fn(),
      getArgByIndex: jest.fn(),
      switchToHttp: jest.fn().mockReturnThis(),
      getRequest: jest.fn().mockReturnThis(),
    } as any;
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should return true if the token is valid', () => {
    (jest.spyOn as any)(mockContext, 'getRequest').mockReturnValue({
      headers: {
        authorization: 'Bearer valid_token',
      },
    });

    expect(guard.canActivate(mockContext)).toBeTruthy();
  });

  it('should throw an exception if the token is not valid', () => {
    (jest.spyOn as any)(mockContext, 'getRequest').mockReturnValue({
      headers: {
        authorization: 'invalid_token',
      },
    });

    expect(() => guard.canActivate(mockContext)).toThrowError(
      new UnauthorizedException('Not Auth'),
    );
  });
});