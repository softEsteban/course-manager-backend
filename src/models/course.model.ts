import {Entity, model, property, hasMany} from '@loopback/repository';
import {Student} from './student.model';
import {Subject} from './subject.model';

@model()
export class Course extends Entity {
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
  level: string;

  @property({
    type: 'string',
    required: true,
  })
  classroom: string;

  @property({
    type: 'string',
  })
  schoolId?: string;

  @hasMany(() => Student)
  students: Student[];

  @hasMany(() => Subject)
  subjects: Subject[];

  constructor(data?: Partial<Course>) {
    super(data);
  }
}

export interface CourseRelations {
  // describe navigational properties here
}

export type CourseWithRelations = Course & CourseRelations;
