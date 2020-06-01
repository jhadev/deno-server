import { Person } from '../models/person.ts';
import { readJson, writeJson } from 'https://deno.land/std/fs/mod.ts';

const db = './db.json';

export const getPeople = async ({ response }: { response: any }) => {
  console.log(await readJson(db));
  response.body = await readJson(db);
};

export const getPerson = async ({
  params,
  response,
}: {
  params: {
    name: string;
  };
  response: any;
}) => {
  const people = (await readJson(db)) as Person[];
  const person = people.find(
    (person: Person) => person.name.toLowerCase() === params.name
  );
  if (person) {
    response.status = 200;
    response.body = person;
    return;
  }

  response.status = 400;
  response.body = { msg: `Cannot find person ${params.name}` };
};

export const addPerson = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  const people = (await readJson(db)) as Person[];
  const body = await request.body();
  const { name, age }: { name: string; age: number } = body.value;

  people.push({
    name: name,
    age: age,
  });

  await writeJson(db, people, { spaces: 2 });

  response.body = { msg: 'OK', data: people };
  response.status = 200;
};

export const updatePerson = async ({
  params,
  request,
  response,
}: {
  params: {
    name: string;
  };
  request: any;
  response: any;
}) => {
  const people = (await readJson(db)) as Person[];
  const body = await request.body();
  const { age }: { age: number } = body.value;

  if (!people.length) {
    response.status = 400;
    response.body = { msg: `Cannot find person ${params.name}` };
    return;
  }

  const updated = people.map((person: Person) => {
    if (person.name.toLowerCase() === params.name) {
      person.age = age;
    }
    return person;
  });

  let res = updated.filter(
    (person: Person) => person.name.toLowerCase() === params.name
  );

  await writeJson(db, updated, { spaces: 2 });
  response.status = 200;
  response.body = { msg: 'OK', data: res };
};

export const removePerson = async ({
  params,
  response,
}: {
  params: {
    name: string;
  };
  response: any;
}) => {
  let people = (await readJson(db)) as Person[];
  const lengthBefore = people.length;
  people = people.filter(
    (person: Person) => person.name.toLowerCase() !== params.name
  );

  if (people.length === lengthBefore) {
    response.status = 400;
    response.body = { msg: `Cannot find person ${params.name}` };
    return;
  }

  await writeJson(db, people, { spaces: 2 });
  response.body = { msg: 'OK', data: people };
  response.status = 200;
};
