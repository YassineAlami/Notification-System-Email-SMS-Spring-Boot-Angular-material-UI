import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import {Sector} from "./Sector";

/*@Entity('actor')*/
export class Actor {
  /*@PrimaryGeneratedColumn('increment')*/
  id!: number;

  /*@Unique(['username'])
  @IsNotEmpty()
  @IsString()*/
  username!: string;

  /*@IsNotEmpty()
  @IsString()*/
  password!: string;

  /*@Unique(['email'])
  @IsNotEmpty()
  @IsEmail()*/
  email!: string;

  /*@IsOptional()
  @IsString()*/
  phoneNumber!: string;

  sector!: Sector;
}

