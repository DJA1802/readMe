/**
 * Async-await is a joy to use! Read more about it in the MDN docs:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 */
const db = require('../server/db');
const {
  User,
  Article,
  Publication,
  PublicationType,
  Topic,
  Interaction,
  Tag,
  Type,
  Author
} = require('../server/db/models');

async function seed () {
  await db.sync({ force: true });
  console.log('db synced!');

  const users = await Promise.all([
    User.create({ email: 'cody@email.com', password: '123' }),
    User.create({ email: 'murphy@email.com', password: '123' })
  ]);

  await Topic.create({
    name: 'Opinion'
  });

  await PublicationType.create({
    name: 'Blog'
  });

  const publication = await Publication.create({
    name: 'Crotchety'
  });

  await publication.setPublicationType(1);
  await publication.setTopic(1);

  await Article.create({
    title: 'The Case Against Puppies',
    sourceUrl: 'http://www.crotchety.com/',
    content: 'I think puppies are overrated.',
    publicationDate: '2018-05-03',
    wordCount: 5
  });

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
}

seed()
  .catch(err => {
    console.error(err.message);
    console.error(err.stack);
    process.exitCode = 1;
  })
  .then(() => {
    console.log('closing db connection');
    db.close();
    console.log('db connection closed');
  });

console.log('seeding...');
