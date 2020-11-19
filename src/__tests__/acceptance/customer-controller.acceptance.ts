import {Client, expect} from '@loopback/testlab';
import {UserDataApplication} from '../..';
import {setupApplication} from './test-helper';

describe('CustomerController', () => {
  let app: UserDataApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop()
  });

  it('invokes GET  CUSTOMERS /customers/count', async () => {
    const res = await client.get('/customers/count').expect(200);
    expect(res.body).to.containEql({count:4});
  });
  
  it('invokes GET CUSTOMER BY ID /customers/{id}', async () => {
    const res = await client.get('/customers/8').expect(200);
    expect(res.body.id).to.be.equal(8)
    expect(res.body.name).to.be.equal('FACEBOOK')
  });

  
});