import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {AcademicDatasourceDataSource} from '../datasources';
import {Professor, ProfessorRelations, Subject} from '../models';
import {SubjectRepository} from './subject.repository';

export class ProfessorRepository extends DefaultCrudRepository<
  Professor,
  typeof Professor.prototype.id,
  ProfessorRelations
> {

  public readonly subjects: HasManyRepositoryFactory<Subject, typeof Professor.prototype.id>;

  constructor(
    @inject('datasources.academicDatasource') dataSource: AcademicDatasourceDataSource, @repository.getter('SubjectRepository') protected subjectRepositoryGetter: Getter<SubjectRepository>,
  ) {
    super(Professor, dataSource);
    this.subjects = this.createHasManyRepositoryFactoryFor('subjects', subjectRepositoryGetter,);
    this.registerInclusionResolver('subjects', this.subjects.inclusionResolver);
  }
}
