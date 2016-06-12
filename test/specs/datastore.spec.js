import { Datastore } from '../../src/borax.js';
import chai from 'chai';
import sinon from "sinon";
import sinonChai from "sinon-chai";

chai.use(sinonChai);
chai.should();

describe('Borax', () => {
  describe('Datastore', () => {

    it('should exist', ()=>{
      Datastore.should.not.be.undefined;
    });

    it('should return a state using getState',()=>{
      Datastore.getState().should.not.be.undefined;
    });

  });
});
