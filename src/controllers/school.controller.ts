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
import {School} from '../models';
import {SchoolRepository} from '../repositories';

export class SchoolController {
  constructor(
    @repository(SchoolRepository)
    public schoolRepository : SchoolRepository,
  ) {}

  @post('/schools')
  @response(200, {
    description: 'School model instance',
    content: {'application/json': {schema: getModelSchemaRef(School)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(School, {
            title: 'NewSchool',
            exclude: ['id'],
          }),
        },
      },
    })
    school: Omit<School, 'id'>,
  ): Promise<School> {
    return this.schoolRepository.create(school);
  }

  @get('/schools/count')
  @response(200, {
    description: 'School model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(School) where?: Where<School>,
  ): Promise<Count> {
    return this.schoolRepository.count(where);
  }

  @get('/schools')
  @response(200, {
    description: 'Array of School model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(School, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(School) filter?: Filter<School>,
  ): Promise<School[]> {
    return this.schoolRepository.find(filter);
  }

  @patch('/schools')
  @response(200, {
    description: 'School PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(School, {partial: true}),
        },
      },
    })
    school: School,
    @param.where(School) where?: Where<School>,
  ): Promise<Count> {
    return this.schoolRepository.updateAll(school, where);
  }

  @get('/schools/{id}')
  @response(200, {
    description: 'School model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(School, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(School, {exclude: 'where'}) filter?: FilterExcludingWhere<School>
  ): Promise<School> {
    return this.schoolRepository.findById(id, filter);
  }

  @patch('/schools/{id}')
  @response(204, {
    description: 'School PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(School, {partial: true}),
        },
      },
    })
    school: School,
  ): Promise<void> {
    await this.schoolRepository.updateById(id, school);
  }

  @put('/schools/{id}')
  @response(204, {
    description: 'School PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() school: School,
  ): Promise<void> {
    await this.schoolRepository.replaceById(id, school);
  }

  @del('/schools/{id}')
  @response(204, {
    description: 'School DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.schoolRepository.deleteById(id);
  }
}
