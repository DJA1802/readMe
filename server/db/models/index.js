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

Publication.belongsTo(PublicationType);
PublicationType.hasMany(Publication);

Publication.belongsTo(Topic, { as: 'defaultTopic' });

Article.belongsTo(Topic);

Article.belongsTo(Publication);
Publication.hasMany(Article);

Article.belongsTo(User);
User.hasMany(Article);

Article.belongsTo(Author);
Author.hasMany(Article);

Article.belongsToMany(Tag, { through: 'article_tag' });
Tag.belongsToMany(Article, { through: 'article_tag' });

module.exports = {
  User,
  Article,
  Tag,
  Topic,
  Author,
  Publication,
  PublicationType,
  Interaction
};
