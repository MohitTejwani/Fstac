import { faker } from "@faker-js/faker";

export const generateUsers = (count) => {
  const users = [];

  for (let i = 0; i < count; i++) {
    users.push({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      address: faker.location.streetAddress(),
      age: faker.number.int({ min: 18, max: 90 }),
      phoneNumber: faker.phone.number(),
      email: faker.internet.email(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      country: faker.location.country(),
    });
  }

  return users;
};
