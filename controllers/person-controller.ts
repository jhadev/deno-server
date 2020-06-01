import { Person } from '../models/person.ts';

export let people: Person[] = [
  {
    name: 'Ian',
    age: 30,
  },
  {
    name: 'Ryan',
    age: 28,
  },
];

export const getPeople = ({ response }: { response: any }) => {
  response.body = people;
};

export const getPerson = ({
  params,
  response,
}: {
  params: {
    name: string;
  };
  response: any;
}) => {
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
  const body = await request.body();
  const { name, age }: { name: string; age: number } = body.value;
  people.push({
    name: name,
    age: age,
  });

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
  const temp = people.find(
    (person: Person) => person.name.toLowerCase() === params.name
  );
  const body = await request.body();
  const { age }: { age: number } = body.value;

  if (temp) {
    temp.age = age;
    response.status = 200;
    response.body = { msg: 'OK', data: temp };
    return;
  }

  response.status = 400;
  response.body = { msg: `Cannot find person ${params.name}` };
};

export const removePerson = ({
  params,
  response,
}: {
  params: {
    name: string;
  };
  response: any;
}) => {
  const lengthBefore = people.length;
  people = people.filter(
    (person: Person) => person.name.toLowerCase() !== params.name
  );

  if (people.length === lengthBefore) {
    response.status = 400;
    response.body = { msg: `Cannot find person ${params.name}` };
    return;
  }

  response.body = { msg: 'OK', data: people };
  response.status = 200;
};
