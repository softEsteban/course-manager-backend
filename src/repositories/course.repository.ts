import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {AcademicDatasourceDataSource} from '../datasources';
import {Course, CourseRelations, Student, Subject} from '../models';
import {StudentRepository} from './student.repository';
import {SubjectRepository} from './subject.repository';

export class CourseRepository extends DefaultCrudRepository<
  Course,
  typeof Course.prototype.id,
  CourseRelations
> {

  public readonly students: HasManyRepositoryFactory<Student, typeof Course.prototype.id>;

  public readonly subjects: HasManyRepositoryFactory<Subject, typeof Course.prototype.id>;

  constructor(
    @inject('datasources.academicDatasource') dataSource: AcademicDatasourceDataSource, @repository.getter('StudentRepository') protected studentRepositoryGetter: Getter<StudentRepository>, @repository.getter('SubjectRepository') protected subjectRepositoryGetter: Getter<SubjectRepository>,
  ) {
    super(Course, dataSource);
    this.subjects = this.createHasManyRepositoryFactoryFor('subjects', subjectRepositoryGetter,);
    this.registerInclusionResolver('subjects', this.subjects.inclusionResolver);
    this.students = this.createHasManyRepositoryFactoryFor('students', studentRepositoryGetter,);
    this.registerInclusionResolver('students', this.students.inclusionResolver);
  }
}
