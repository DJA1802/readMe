# Test PLANS

## Redux Store

```js
describe('The article piece of state') {

  describe('The getArticle action creator') {
    it ('Creates an action with type GET_ARTICLE') {}
    it ('Creates an action with the expected payload') {}
  }

  describe('The fetchArticle thunk creator') {
    it ('makes a GET request to api/articles') {}
    it ('on response from server, dispatches GET_ARTICLE action') {}
    it ('on error, logs the error')
  }

  describe('The article reducer') {
    it ('returns the article corresponding to the currently displayed article')
    it ('returns an object')
    it ('puts the lotion on its skin or else it gets the hose again')
  }

}

describe('The articlesAll ...')
describe('The user ...')
```

## DB Models

```js
describe('The Article model') {

  describe('validations') {
    it('throws an error if title is null')
    it('throws an error if sourceUrl is null')
    it('ensures that sourceUrl value is a valid URL')
    it('throws an error if content is null')
  }

  describe('associations') {
    it('has a userId column')
    it('has a setUser method')
    /* and other IDs */
  }
}
```

## Back-end/API routes

```js
describe('articles routes') {

}
```
