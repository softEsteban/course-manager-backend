import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Professor,
  Subject,
} from '../models';
import {ProfessorRepository} from '../repositories';

export class ProfessorSubjectController {
  constructor(
    @repository(ProfessorRepository) protected professorRepository: ProfessorRepository,
  ) { }

  @get('/professors/{id}/subjects', {
    responses: {
      '200': {
        description: 'Array of Professor has many Subject',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Subject)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Subject>,
  ): Promise<Subject[]> {
    return this.professorRepository.subjects(id).find(filter);
  }

  @post('/professors/{id}/subjects', {
    responses: {
      '200': {
        description: 'Professor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Subject)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Professor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Subject, {
            title: 'NewSubjectInProfessor',
            exclude: ['id'],
            optional: ['professorId']
          }),
        },
      },
    }) subject: Omit<Subject, 'id'>,
  ): Promise<Subject> {
    return this.professorRepository.subjects(id).create(subject);
  }

  @patch('/professors/{id}/subjects', {
    responses: {
      '200': {
        description: 'Professor.Subject PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Subject, {partial: true}),
        },
      },
    })
    subject: Partial<Subject>,
    @param.query.object('where', getWhereSchemaFor(Subject)) where?: Where<Subject>,
  ): Promise<Count> {
    return this.professorRepository.subjects(id).patch(subject, where);
  }

  @del('/professors/{id}/subjects', {
    responses: {
      '200': {
        description: 'Professor.Subject DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Subject)) where?: Where<Subject>,
  ): Promise<Count> {
    return this.professorRepository.subjects(id).delete(where);
  }
}
