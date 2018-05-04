const User = require('./User');
const Article = require('./Article');
const Tag = require('./Tag');
const Topic = require('./Topic');
const Author = require('./Author');
const Publication = require('./Publication');
const PublicationType = require('./PublicationType');
const Interaction = require('./Interaction');

Interaction.belongsTo(Article);
Article.hasMany(Interaction);

module.exports = {
  User,
  Article,
  Tag,
  Topic,
  Author,
  Publication,
  PublicationType
};
