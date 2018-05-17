/*eslint-disable max-statements*/
require('../secrets.js');

const db = require('../server/db');
const momentRandom = require('moment-random');
const { User, Topic, Interaction } = require('../server/db/models');
const { createNewArticle } = require('../server/api/articles');

/* "reflect" function slightly modified from:
https://stackoverflow.com/questions/31424561/wait-until-all-es6-promises-complete-even-rejected-promises */
function reflect (promise) {
  return promise.then(
    function (data) {
      return { data, status: 'resolved' };
    },
    function (error) {
      return { error, status: 'rejected' };
    }
  );
}

async function seed () {
  await db.sync({ force: true });
  console.log('db synced!');

  const users = await Promise.all([
    User.create({
      email: 'jgore00@gmail.com',
      password: 'context'
    }),
    User.create({
      email: 'anu@anu.com',
      password: 'context2'
    })
  ]);

  const articlePromises = [
    createNewArticle(
      1,
      'https://www.smithsonianmag.com/science-nature/moral-cost-of-cats-180960505/'
    ),
    createNewArticle(
      1,
      'https://www.wired.com/2017/03/curse-bahia-emerald-giant-green-rock-wreaks-havoc-ruins-lives/'
    ),
    createNewArticle(
      1,
      'https://www.newyorker.com/magazine/2017/01/30/doomsday-prep-for-the-super-rich'
    ),
    createNewArticle(
      1,
      'https://thebigroundtable.com/don-quixotes-classroom-80b3bfaaa2c3'
    ),
    createNewArticle(
      1,
      'https://www.nytimes.com/2016/11/18/books/review/michael-chabon-sandmeyer-reaction-short-story.html?smid=tw-nytbooks&smtyp=cur'
    )
  ];

  const articlesRaw = await Promise.all(articlePromises.map(reflect));

  // Show result of all createNewArticle() attempts
  console.log(articlesRaw);

  // Filter out failed attempts
  const articles = articlesRaw.filter(
    resultObj => resultObj.status === 'resolved'
  );

  const topics = await Promise.all([
    Topic.create({ name: 'U.S. News' }),
    Topic.create({ name: 'World News' }),
    Topic.create({ name: 'Politics' }),
    Topic.create({ name: 'Business' }),
    Topic.create({ name: 'Opinion' }),
    Topic.create({ name: 'Tech' }),
    Topic.create({ name: 'Science' }),
    Topic.create({ name: 'Health' }),
    Topic.create({ name: 'Sports' }),
    Topic.create({ name: 'Arts' }),
    Topic.create({ name: 'Food' }),
    Topic.create({ name: 'Travel' }),
    Topic.create({ name: 'Lifestyle' })
    // would be nice to have 'Local News' based on user's location
  ]);

  // get a random article id
  const randArticleId = () => Math.round(Math.random() * articles.length) + 1;

  // get a random duration under an hour in milliseconds
  const randDurationUnderAnHour = () => Math.round(Math.random() * 3600000);

  // get random start and end time for an interaction
  const randStartEnd = () => {
    const startDate = '2018-05-01',
      endDate = '2018-05-12';
    const startTime = momentRandom(endDate, startDate);
    const endTime = startTime + randDurationUnderAnHour();
    return { startTime, endTime };
  };

  // construct an interaction object with a random article, a random date, and a random duration under an hour
  const randInteraction = () => {
    const startEnd = randStartEnd();
    const article = { articleId: randArticleId() };
    return Object.assign(startEnd, article);
  };

  const interactions = await Promise.all([
    Interaction.create({
      startTime: new Date('2018-05-17T10:24:00'),
      endTime: new Date('2018-05-17T10:52:00'),
      articleId: 2
    }),
    Interaction.create(randInteraction()),
    Interaction.create(randInteraction()),
    Interaction.create(randInteraction()),
    Interaction.create(randInteraction()),
    Interaction.create(randInteraction()),
    Interaction.create(randInteraction()),
    Interaction.create(randInteraction()),
    Interaction.create(randInteraction()),
    Interaction.create(randInteraction()),
    Interaction.create(randInteraction()),
    Interaction.create(randInteraction()),
    Interaction.create(randInteraction()),
    Interaction.create(randInteraction()),
    Interaction.create(randInteraction()),
    Interaction.create(randInteraction()),
    Interaction.create(randInteraction()),
    Interaction.create(randInteraction()),
    Interaction.create(randInteraction()),
    Interaction.create(randInteraction()),
    Interaction.create(randInteraction()),
    Interaction.create(randInteraction()),
    Interaction.create(randInteraction()),
    Interaction.create(randInteraction()),
    Interaction.create(randInteraction()),
    Interaction.create(randInteraction()),
    Interaction.create(randInteraction()),
    Interaction.create(randInteraction()),
    Interaction.create(randInteraction()),
    Interaction.create(randInteraction()),
    Interaction.create(randInteraction()),
    Interaction.create(randInteraction()),
    Interaction.create(randInteraction()),
    Interaction.create(randInteraction()),
    Interaction.create(randInteraction()),
    Interaction.create(randInteraction()),
    Interaction.create(randInteraction())
  ]);

  console.log(`created ${users.length} users`);
  console.log(`created ${topics.length} topics`);
  console.log(`created ${articles.length} articles`);
  console.log(`created ${interactions.length} interactions`);
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
