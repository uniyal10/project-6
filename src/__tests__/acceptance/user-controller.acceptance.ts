import {Client, expect} from '@loopback/testlab';
import {UserDataApplication} from '../..';
import {setupApplication} from './test-helper';

describe('UserController', () => {
  let app: UserDataApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop()
  });

  it('invokes GET  /users/count', async () => {
    const res = await client.get('/users/count').expect(200);
    expect(res.body).to.containEql({count:14});
  });
  
  it('invokes GET USER BY ID /users/{id}', async () => {
    const res = await client.get('/users/2').expect(200);
    expect(res.body.id).to.be.equal(2)
    expect(res.body.firstname).to.be.equal('SACHIN')
  });
});