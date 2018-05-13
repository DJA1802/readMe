const router = require('express').Router();
module.exports = router;
const cors = require('cors');

router.use(cors());

router.use('/articles', require('./articles').router);
router.use('/users', require('./users'));
router.use('/interactions', require('./interactions'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
