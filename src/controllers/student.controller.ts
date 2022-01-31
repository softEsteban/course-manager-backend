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
import {Student} from '../models';
import {StudentRepository} from '../repositories';

export class StudentController {
  constructor(
    @repository(StudentRepository)
    public studentRepository : StudentRepository,
  ) {}

  @post('/students')
  @response(200, {
    description: 'Student model instance',
    content: {'application/json': {schema: getModelSchemaRef(Student)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Student, {
            title: 'NewStudent',
            exclude: ['id'],
          }),
        },
      },
    })
    student: Omit<Student, 'id'>,
  ): Promise<Student> {
    return this.studentRepository.create(student);
  }

  @get('/students/count')
  @response(200, {
    description: 'Student model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Student) where?: Where<Student>,
  ): Promise<Count> {
    return this.studentRepository.count(where);
  }

  @get('/students')
  @response(200, {
    description: 'Array of Student model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Student, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Student) filter?: Filter<Student>,
  ): Promise<Student[]> {
    return this.studentRepository.find(filter);
  }

  @patch('/students')
  @response(200, {
    description: 'Student PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Student, {partial: true}),
        },
      },
    })
    student: Student,
    @param.where(Student) where?: Where<Student>,
  ): Promise<Count> {
    return this.studentRepository.updateAll(student, where);
  }

  @get('/students/{id}')
  @response(200, {
    description: 'Student model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Student, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Student, {exclude: 'where'}) filter?: FilterExcludingWhere<Student>
  ): Promise<Student> {
    return this.studentRepository.findById(id, filter);
  }

  @patch('/students/{id}')
  @response(204, {
    description: 'Student PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Student, {partial: true}),
        },
      },
    })
    student: Student,
  ): Promise<void> {
    await this.studentRepository.updateById(id, student);
  }

  @put('/students/{id}')
  @response(204, {
    description: 'Student PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() student: Student,
  ): Promise<void> {
    await this.studentRepository.replaceById(id, student);
  }

  @del('/students/{id}')
  @response(204, {
    description: 'Student DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.studentRepository.deleteById(id);
  }
}
