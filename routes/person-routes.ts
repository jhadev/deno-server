import { Router } from 'https://deno.land/x/oak/mod.ts';
import {
  getPeople,
  getPerson,
  addPerson,
  updatePerson,
  removePerson,
} from './../controllers/person-controller.ts';

const router = new Router();
router
  .get('/people', getPeople)
  .get('/people/:id', getPerson)
  .post('/people', addPerson)
  .put('/people/:id', updatePerson)
  .delete('/people/:id', removePerson);

export default router;
