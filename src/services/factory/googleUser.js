import Chance from 'chance';
import { Factory } from 'rosie';

const chance = new Chance();

export default Factory.define('user')
  .attr('id', `${chance.integer({ min: 100, max: 100000 })}`)
  .attr('name', { familyName: chance.last(), givenName: chance.first() })
  .attr('emails', [{ value: chance.email({ domain: 'example.com' }) }])
  .attr('provider', 'google');
