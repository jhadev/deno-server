import { users } from '../server.ts';

export const getPeople = async ({ response }: { response: any }) => {
  response.body = await users.find({});
};

export const getPerson = async ({
  params,
  response,
}: {
  params: {
    id: string;
  };
  response: any;
}) => {
  const user = await users.findOne({ _id: { $oid: params.id } });

  if (user) {
    response.status = 200;
    response.body = user;
    return;
  }

  response.status = 400;
  response.body = { msg: `Cannot find user with ObjectId ${params.id}` };
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

  const newUser = await users.insertOne({
    name: name,
    age: age,
  });

  response.body = { msg: 'OK', data: newUser };
  response.status = 200;
};

export const updatePerson = async ({
  params,
  request,
  response,
}: {
  params: {
    id: string;
  };
  request: any;
  response: any;
}) => {
  const body = await request.body();
  const { name, age }: { name: string; age: number } = body.value;

  const updatedUser = await users.updateOne(
    { _id: { $oid: params.id } },
    { $set: { name: name, age: age } }
  );
  if (!updatedUser) {
    response.status = 400;
    response.body = { msg: `Cannot find user with ObjectId ${params.id}` };
    return;
  }

  response.status = 200;
  response.body = { msg: 'OK', data: updatedUser };
};

export const removePerson = async ({
  params,
  response,
}: {
  params: {
    id: string;
  };
  response: any;
}) => {
  const deletedUser = await users.deleteOne({ _id: params.id });
  if (!deletedUser) {
    response.status = 400;
    response.body = { msg: `Cannot find user with ObjectId ${params.id}` };
    return;
  }

  response.body = { msg: 'OK', data: deletedUser };
  response.status = 200;
};
