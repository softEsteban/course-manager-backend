import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Subject} from '../models';
import {SubjectRepository} from '../repositories';

export class SubjectController {
  constructor(
    @repository(SubjectRepository)
    public subjectRepository : SubjectRepository,
  ) {}

  @post('/subjects')
  @response(200, {
    description: 'Subject model instance',
    content: {'application/json': {schema: getModelSchemaRef(Subject)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Subject, {
            title: 'NewSubject',
            exclude: ['id'],
          }),
        },
      },
    })
    subject: Omit<Subject, 'id'>,
  ): Promise<Subject> {
    return this.subjectRepository.create(subject);
  }

  @get('/subjects/count')
  @response(200, {
    description: 'Subject model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Subject) where?: Where<Subject>,
  ): Promise<Count> {
    return this.subjectRepository.count(where);
  }

  @get('/subjects')
  @response(200, {
    description: 'Array of Subject model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Subject, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Subject) filter?: Filter<Subject>,
  ): Promise<Subject[]> {
    return this.subjectRepository.find(filter);
  }

  @patch('/subjects')
  @response(200, {
    description: 'Subject PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Subject, {partial: true}),
        },
      },
    })
    subject: Subject,
    @param.where(Subject) where?: Where<Subject>,
  ): Promise<Count> {
    return this.subjectRepository.updateAll(subject, where);
  }

  @get('/subjects/{id}')
  @response(200, {
    description: 'Subject model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Subject, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Subject, {exclude: 'where'}) filter?: FilterExcludingWhere<Subject>
  ): Promise<Subject> {
    return this.subjectRepository.findById(id, filter);
  }

  @patch('/subjects/{id}')
  @response(204, {
    description: 'Subject PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Subject, {partial: true}),
        },
      },
    })
    subject: Subject,
  ): Promise<void> {
    await this.subjectRepository.updateById(id, subject);
  }

  @put('/subjects/{id}')
  @response(204, {
    description: 'Subject PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() subject: Subject,
  ): Promise<void> {
    await this.subjectRepository.replaceById(id, subject);
  }

  @del('/subjects/{id}')
  @response(204, {
    description: 'Subject DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.subjectRepository.deleteById(id);
  }
}
