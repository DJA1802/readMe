/*eslint-disable max-statements*/

require('../secrets.js');
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

const { createNewArticle } = require('../server/api/articles');

async function seed () {
  await db.sync({ force: true });
  console.log('db synced!');

  const users = await Promise.all([
    User.create({
      email: 'jeff@jeff.com',
      password: 'context'
    }),
    User.create({
      email: 'anu@anu.com',
      password: 'context2'
    })
  ]);

  const articles = await Promise.all([
    createNewArticle(
      1,
      'https://www.newyorker.com/magazine/2018/04/23/the-maraschino-moguls-secret-life'
    ),
    createNewArticle(
      1,
      'https://www.ribbonfarm.com/2018/05/03/the-art-of-longform/'
    ),
    createNewArticle(
      1,
      'https://www.smithsonianmag.com/science-nature/moral-cost-of-cats-180960505/'
    ),
    createNewArticle(
      1,
      'https://longreads.com/2018/05/11/is-new-york-the-most-corrupt-state-in-the-nation/'
    ),
    createNewArticle(
      1,
      'https://www.wired.com/2017/03/curse-bahia-emerald-giant-green-rock-wreaks-havoc-ruins-lives/'
    ),
    createNewArticle(
      1,
      'https://lithub.com/rebecca-solnit-the-loneliness-of-donald-trump/'
    ),
    createNewArticle(
      1,
      'https://www.newyorker.com/magazine/2017/01/30/doomsday-prep-for-the-super-rich'
    ),
    createNewArticle(1, 'https://www.guernicamag.com/nina-simone-in-liberia/'),
    createNewArticle(
      1,
      'https://www.wired.com/2016/05/the-perks-are-great-just-dont-ask-us-what-we-do/#.lzbhv2to7'
    ),
    createNewArticle(
      1,
      'https://www.newyorker.com/magazine/2017/02/27/why-facts-dont-change-our-minds'
    ),
    createNewArticle(
      1,
      'http://www.vulture.com/2017/09/the-ugliness-behind-hgtv-never-ending-fantasy-loop.html'
    ),
    createNewArticle(1, 'http://gothamist.com/2016/02/02/bialys_in_nyc.php'),
    createNewArticle(
      1,
      'https://www.buzzfeed.com/sapna/say-no-to-the-dress?utm_term=.xiEgWElRr#.xq3LWneqA'
    ),
    createNewArticle(
      1,
      'https://thebigroundtable.com/don-quixotes-classroom-80b3bfaaa2c3'
    ),
    createNewArticle(
      1,
      'https://www.thrillist.com/eat/nation/mothers-day-chain-restaurants-2018'
    ),
    createNewArticle(
      1,
      'http://gothamist.com/2016/03/31/stuy_town_affordable_housing.php'
    ),
    createNewArticle(
      1,
      'https://www.nationalgeographic.com/magazine/2017/06/dinosaur-nodosaur-fossil-discovery/'
    ),
    createNewArticle(
      1,
      'http://gothamist.com/2016/02/17/robert_caro_author_interview.php'
    ),
    createNewArticle(
      1,
      'https://www.wired.com/2017/03/humans-made-banana-perfect-soon-itll-gone/'
    ),
    createNewArticle(
      1,
      'https://www.nytimes.com/2016/11/18/books/review/michael-chabon-sandmeyer-reaction-short-story.html?smid=tw-nytbooks&smtyp=cur'
    ),
    createNewArticle(
      1,
      'https://www.newyorker.com/humor/daily-shouts/i-work-from-home'
    ),
    createNewArticle(
      1,
      'https://www.thrillist.com/news/nation/100-year-old-secret-long-life-guinness'
    ),
    createNewArticle(
      1,
      'http://gothamist.com/2016/07/27/gym-trification_frenchie.php'
    ),
    createNewArticle(
      1,
      'http://nymag.com/daily/intelligencer/2017/05/hillary-clinton-life-after-election.html'
    ),
    createNewArticle(
      1,
      'https://www.thecut.com/2017/04/fyre-festival-exumas-bahamas-disaster.html'
    ),
    createNewArticle(
      1,
      'http://nymag.com/daily/intelligencer/2017/07/climate-change-earth-too-hot-for-humans.html'
    ),
    createNewArticle(
      1,
      'https://thebigroundtable.com/consider-the-can-f5c5ebe7fb85'
    ),
    createNewArticle(
      1,
      'https://www.nationalgeographic.com/travel/destinations/north-america/united-states/happiest-cities-united-states-2017/'
    ),
    createNewArticle(
      1,
      'https://www.newyorker.com/magazine/2017/12/11/cat-person'
    )
  ]);

  // await createNewArticle(
  //   1,
  //   'https://www.newyorker.com/magazine/2018/04/23/the-maraschino-moguls-secret-life'
  // );
  // await createNewArticle(
  //   1,
  //   'https://www.ribbonfarm.com/2018/05/03/the-art-of-longform/'
  // );
  // await createNewArticle(
  //   1,
  //   'https://www.smithsonianmag.com/science-nature/moral-cost-of-cats-180960505/'
  // );
  // await createNewArticle(
  //   1,
  //   'https://longreads.com/2018/05/11/is-new-york-the-most-corrupt-state-in-the-nation/'
  // );
  // await createNewArticle(
  //   1,
  //   'https://www.wired.com/2017/03/curse-bahia-emerald-giant-green-rock-wreaks-havoc-ruins-lives/'
  // );
  // await createNewArticle(
  //   1,
  //   'https://lithub.com/rebecca-solnit-the-loneliness-of-donald-trump/'
  // );
  // await createNewArticle(
  //   1,
  //   'https://www.newyorker.com/magazine/2017/01/30/doomsday-prep-for-the-super-rich'
  // );
  // await createNewArticle(
  //   1,
  //   'https://www.guernicamag.com/nina-simone-in-liberia/'
  // );
  // await createNewArticle(
  //   1,
  //   'https://www.wired.com/2016/05/the-perks-are-great-just-dont-ask-us-what-we-do/#.lzbhv2to7'
  // );
  // await createNewArticle(
  //   1,
  //   'https://www.newyorker.com/magazine/2017/02/27/why-facts-dont-change-our-minds'
  // );
  // await createNewArticle(
  //   1,
  //   'http://www.vulture.com/2017/09/the-ugliness-behind-hgtv-never-ending-fantasy-loop.html'
  // );
  // await createNewArticle(
  //   1,
  //   'http://gothamist.com/2016/02/02/bialys_in_nyc.php'
  // );
  // await createNewArticle(
  //   1,
  //   'https://www.buzzfeed.com/sapna/say-no-to-the-dress?utm_term=.xiEgWElRr#.xq3LWneqA'
  // );
  // await createNewArticle(
  //   1,
  //   'https://thebigroundtable.com/don-quixotes-classroom-80b3bfaaa2c3'
  // );
  // await createNewArticle(
  //   1,
  //   'https://www.thrillist.com/eat/nation/mothers-day-chain-restaurants-2018'
  // );
  // await createNewArticle(
  //   1,
  //   'http://gothamist.com/2016/03/31/stuy_town_affordable_housing.php'
  // );
  // await createNewArticle(
  //   1,
  //   'https://www.nationalgeographic.com/magazine/2017/06/dinosaur-nodosaur-fossil-discovery/'
  // );
  // await createNewArticle(
  //   1,
  //   'http://gothamist.com/2016/02/17/robert_caro_author_interview.php'
  // );
  // await createNewArticle(
  //   1,
  //   'https://www.wired.com/2017/03/humans-made-banana-perfect-soon-itll-gone/'
  // );
  // await createNewArticle(
  //   1,
  //   'https://www.nytimes.com/2016/11/18/books/review/michael-chabon-sandmeyer-reaction-short-story.html?smid=tw-nytbooks&smtyp=cur'
  // );
  // await createNewArticle(
  //   1,
  //   'https://www.newyorker.com/humor/daily-shouts/i-work-from-home'
  // );
  // await createNewArticle(
  //   1,
  //   'https://www.thrillist.com/news/nation/100-year-old-secret-long-life-guinness'
  // );
  // await createNewArticle(
  //   1,
  //   'http://gothamist.com/2016/07/27/gym-trification_frenchie.php'
  // );
  // await createNewArticle(
  //   1,
  //   'http://nymag.com/daily/intelligencer/2017/05/hillary-clinton-life-after-election.html'
  // );
  // await createNewArticle(
  //   1,
  //   'https://www.thecut.com/2017/04/fyre-festival-exumas-bahamas-disaster.html'
  // );
  // await createNewArticle(
  //   1,
  //   'http://nymag.com/daily/intelligencer/2017/07/climate-change-earth-too-hot-for-humans.html'
  // );
  // await createNewArticle(
  //   1,
  //   'https://thebigroundtable.com/consider-the-can-f5c5ebe7fb85'
  // );
  // await createNewArticle(
  //   1,
  //   'https://www.nationalgeographic.com/travel/destinations/north-america/united-states/happiest-cities-united-states-2017/'
  // );
  // await createNewArticle(
  //   1,
  //   'https://www.newyorker.com/magazine/2017/12/11/cat-person'
  // );

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

  const interactions = await Promise.all([
    Interaction.create({
      startTime: '2018-05-07T05:17:49.314Z',
      endTime: '2018-05-07T05:47:19.114Z',
      articleId: 1
    }),
    Interaction.create({
      articleId: 1
    })
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
