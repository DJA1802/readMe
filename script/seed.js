const db = require('../server/db');
const {
  User,
  Article,
  Publication,
  PublicationType,
  Topic,
  Interaction,
  Tag,
  Author
} = require('../server/db/models');

async function seed () {
  await db.sync({ force: true });
  console.log('db synced!');

  const user = await User.create({
    email: 'jeff@jeff.com',
    password: 'context'
  });

  const tags = await Promise.all([
    Tag.create({ name: 'feature' }),
    Tag.create({ name: 'long-form' })
  ]);

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

  const publicationType = await PublicationType.create({
    name: 'Magazine'
  });

  const publication = await Publication.create({
    name: 'The New Yorker'
  });

  const author = await Author.create({
    name: 'Ian Frazier'
  });

  await publication.setPublicationType(1);
  await publication.setDefaultTopic(1);

  const article = await Article.create({
    title: 'The Maraschino Mogul’s Secret Life',
    sourceUrl:
      'https://www.newyorker.com/magazine/2018/04/23/the-maraschino-moguls-secret-life',
    content:
      '<p>Arthur Mondella is mourned. Up until the moment of his death, on February 24, 2015, he ran his family’s company, Dell’s Maraschino Cherries, in the Red Hook section of Brooklyn. His daughters Dana Mondella Bentz and Dominique Mondella, who run the company now, miss him every day. They remember him in their prayers and wish he could see how they’ve done with the business. Their great-grandfather Arthur Mondella, senior, and their grandfather Ralph founded it in 1948. Dell’s Maraschino Cherries processes and sells nothing but cherries—about fourteen million pounds a year—from its single Red Hook factory. Dana, the president and C.E.O., is thirty, and Dominique, the vice-president, is thirty-two.</p>',
    publicationDate: '2018-05-03',
    wordCount: 116
  });

  await article.setUser(user.id);
  await article.setAuthor(author.id);
  await article.setPublication(publication.id);
  await article.setTopic(topics[0].id);
  await article.setTags(tags);

  const interaction = await Interaction.create({
    startTime: '2018-05-07T05:17:49.314Z',
    endTime: '2018-05-07T05:47:19.114Z',
    articleId: 1
  });

  const duration = await interaction.duration;

  console.log(`interaction duration VIRTUAL test:`, duration);
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
