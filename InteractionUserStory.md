_User: Grayson, our favorite hipster._

Grayson is a Brooklynite who takes the subway to work. He knows he’ll want to read on his FAVORITE app, ReadMe, so he...

1.  Opens the article he wishes to read on his laptop while he is still at home and has an internet connection.

When he opens the article, ReadMe checks if `readmeIacts` is a property on `localStorage`. In this case it is not, so that property is created - the property is an array, containing one `interaction` referring to the current article. The `startDate` and `endDate` are initially the same.

```js
/* PRE-STRINGIFY */
localStorage: {
  readmeIacts: [
    {
      startTime:'2018-05-10T16:58:55.283Z',
      endTime:'2018-05-10T16:58:58.288Z'
      articleId: 1
    }
  ]
}
```

Because `localStorage` accepts only strings as keys and values, the object needs to be stringified before being set on `localStorage`.

```js
localStorage: {
  readmeIacts: "[{'articleId':2,'startTime':'2018-05-10T16:58:55.283Z','endTime':'2018-05-10T16:58:58.288Z'}]";
}
```

2.  ReadMe sets an interval so that every second, `while (articleIsVisible and userIsNotIdle)` (**This is not done yet!**), the `endDate` is updated.

3.  Grayson puts his laptop to sleep, so the interval stops executing.

4.  Grayson settles into his subway seat and reopens his laptop. The browser window is open and intervals resume. The previous `endTime` is way more than 1 second prior, so ReadMe creates a new interaction instead of updating the `endTime` of the current interaction. (**This is not done yet!**)

```js
localStorage: {
  readmeIacts: [
    { startTime:'2018-05-10T16:58:55.283Z',endTime:'2018-05-10T16:58:58.288Z' articleId: 1 },
    { startTime:'2018-05-10T17:12:55.283Z',endTime:'2018-05-10T17:15:58.288Z' articleId: 1 }]
}
```

5.  While he reads, the interaction endDate continues to update every second.

6.  He decides he's done reading at the end of the subway ride, and, rather than put his laptop to sleep, he actually closes the tab with his story on it.

7.  When `Article` unmounts, it commits all interactions in `localStorage` to the database and then clears `localStorage`. Unfortunately, there's still no internet connection - the POST fails, therefore `localStorage` is not cleared.

8.  Grayson opens his laptop at lunch with a Wi-Fi connection and navigates to ReadMe. Upon mounting, the `Routes` component is trained to look at `localStorage` and commit all interactions to the database, then clear `localStorage`.
