import {Entity, model, property, hasMany} from '@loopback/repository';
import {Course} from './course.model';

@model()
export class School extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @hasMany(() => Course)
  courses: Course[];

  constructor(data?: Partial<School>) {
    super(data);
  }
}

export interface SchoolRelations {
  // describe navigational properties here
}

export type SchoolWithRelations = School & SchoolRelations;
