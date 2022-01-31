import {Entity, model, property} from '@loopback/repository';

@model()
export class Subject extends Entity {
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

  @property({
    type: 'string',
  })
  courseId?: string;

  @property({
    type: 'string',
  })
  professorId?: string;

  constructor(data?: Partial<Subject>) {
    super(data);
  }
}

export interface SubjectRelations {
  // describe navigational properties here
}

export type SubjectWithRelations = Subject & SubjectRelations;
