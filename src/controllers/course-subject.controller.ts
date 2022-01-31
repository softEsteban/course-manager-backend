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
  Course,
  Subject,
} from '../models';
import {CourseRepository} from '../repositories';

export class CourseSubjectController {
  constructor(
    @repository(CourseRepository) protected courseRepository: CourseRepository,
  ) { }

  @get('/courses/{id}/subjects', {
    responses: {
      '200': {
        description: 'Array of Course has many Subject',
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
    return this.courseRepository.subjects(id).find(filter);
  }

  @post('/courses/{id}/subjects', {
    responses: {
      '200': {
        description: 'Course model instance',
        content: {'application/json': {schema: getModelSchemaRef(Subject)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Course.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Subject, {
            title: 'NewSubjectInCourse',
            exclude: ['id'],
            optional: ['courseId']
          }),
        },
      },
    }) subject: Omit<Subject, 'id'>,
  ): Promise<Subject> {
    return this.courseRepository.subjects(id).create(subject);
  }

  @patch('/courses/{id}/subjects', {
    responses: {
      '200': {
        description: 'Course.Subject PATCH success count',
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
    return this.courseRepository.subjects(id).patch(subject, where);
  }

  @del('/courses/{id}/subjects', {
    responses: {
      '200': {
        description: 'Course.Subject DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Subject)) where?: Where<Subject>,
  ): Promise<Count> {
    return this.courseRepository.subjects(id).delete(where);
  }
}
