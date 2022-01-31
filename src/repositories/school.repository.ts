import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {AcademicDatasourceDataSource} from '../datasources';
import {School, SchoolRelations, Course} from '../models';
import {CourseRepository} from './course.repository';

export class SchoolRepository extends DefaultCrudRepository<
  School,
  typeof School.prototype.id,
  SchoolRelations
> {

  public readonly courses: HasManyRepositoryFactory<Course, typeof School.prototype.id>;

  constructor(
    @inject('datasources.academicDatasource') dataSource: AcademicDatasourceDataSource, @repository.getter('CourseRepository') protected courseRepositoryGetter: Getter<CourseRepository>,
  ) {
    super(School, dataSource);
    this.courses = this.createHasManyRepositoryFactoryFor('courses', courseRepositoryGetter,);
    this.registerInclusionResolver('courses', this.courses.inclusionResolver);
  }
}
