import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Customer, CustomerRelations, User} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';

export class CustomerRepository extends DefaultCrudRepository<
  Customer,
  typeof Customer.prototype.id,
  CustomerRelations
> {

  public readonly users: HasManyRepositoryFactory<User, typeof Customer.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Customer, dataSource);
    this.users = this.createHasManyRepositoryFactoryFor('users', userRepositoryGetter,);
    this.registerInclusionResolver('users', this.users.inclusionResolver);
  }
}
