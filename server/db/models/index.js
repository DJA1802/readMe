const User = require('./User');
const Article = require('./Article');
const Tag = require('./Tag');
const Topic = require('./Topic');
const Author = require('./Author');
const Publication = require('./Publication');
const PublicationType = require('./PublicationType');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Article,
  Tag,
  Topic,
  Author,
  Publication,
  PublicationType
};
