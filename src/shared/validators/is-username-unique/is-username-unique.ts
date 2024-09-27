/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUsernameUniqueValidator implements ValidatorConstraintInterface {
  
  constructor(private moduleRef: ModuleRef) {}

  async validate(
    username: string,
    args: ValidationArguments
  ): Promise<boolean>  {
    const [serviceToken, methodName] = args.constraints;
    const service = this.moduleRef.get(serviceToken, { strict: false });

    if (!service || typeof service[methodName] !== 'function') {
      throw new Error(`Service with token ${serviceToken} not found or method ${methodName} does not exist.`);
    }
    
    const isUsernameAlreadyInUse = await service[methodName](username);
    if (isUsernameAlreadyInUse)
        return false;
    else 
        return true;
  };
  defaultMessage() {
    return 'Username already in use.';
  }
}

export function IsUsernameUnique(
serviceToken: string,         
  methodName: string, 
  validationOptions: ValidationOptions){
    return (object: Record<string, any>, property: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: property,
            options: validationOptions,
            constraints: [serviceToken, methodName],
            validator: IsUsernameUniqueValidator
        })
    }
}