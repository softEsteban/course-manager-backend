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
import {Professor} from '../models';
import {ProfessorRepository} from '../repositories';

export class ProfessorController {
  constructor(
    @repository(ProfessorRepository)
    public professorRepository : ProfessorRepository,
  ) {}

  @post('/professors')
  @response(200, {
    description: 'Professor model instance',
    content: {'application/json': {schema: getModelSchemaRef(Professor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Professor, {
            title: 'NewProfessor',
            exclude: ['id'],
          }),
        },
      },
    })
    professor: Omit<Professor, 'id'>,
  ): Promise<Professor> {
    return this.professorRepository.create(professor);
  }

  @get('/professors/count')
  @response(200, {
    description: 'Professor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Professor) where?: Where<Professor>,
  ): Promise<Count> {
    return this.professorRepository.count(where);
  }

  @get('/professors')
  @response(200, {
    description: 'Array of Professor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Professor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Professor) filter?: Filter<Professor>,
  ): Promise<Professor[]> {
    return this.professorRepository.find(filter);
  }

  @patch('/professors')
  @response(200, {
    description: 'Professor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Professor, {partial: true}),
        },
      },
    })
    professor: Professor,
    @param.where(Professor) where?: Where<Professor>,
  ): Promise<Count> {
    return this.professorRepository.updateAll(professor, where);
  }

  @get('/professors/{id}')
  @response(200, {
    description: 'Professor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Professor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Professor, {exclude: 'where'}) filter?: FilterExcludingWhere<Professor>
  ): Promise<Professor> {
    return this.professorRepository.findById(id, filter);
  }

  @patch('/professors/{id}')
  @response(204, {
    description: 'Professor PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Professor, {partial: true}),
        },
      },
    })
    professor: Professor,
  ): Promise<void> {
    await this.professorRepository.updateById(id, professor);
  }

  @put('/professors/{id}')
  @response(204, {
    description: 'Professor PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() professor: Professor,
  ): Promise<void> {
    await this.professorRepository.replaceById(id, professor);
  }

  @del('/professors/{id}')
  @response(204, {
    description: 'Professor DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.professorRepository.deleteById(id);
  }
}
