_User: Grayson, our favorite hipster._

Grayson is a Brooklynite who takes the subway to work. He knows he’ll want to read on his FAVORITE app, ReadMe, so he...

1.  Opens the article he wishes to read on his laptop while he is still at home and has an internet connection.

When he opens the article, ReadMe checks if `readmeDJA` is a property on `localStorage`. In this case it is not, so that property is created - within that, an `interactions` property which is an array, containing one `interaction` referring to the current article. The `startDate` and `endDate` are initially the same.

```js
localStorage: {
  // other properties
  readmeDJA: {
    interactions: [{ startDate: 7777, endDate: 8888, articleId: 1 }];
  }
}
```

2.  ReadMe sets an interval so that every second, `while (isVisible and isNotIdle)`, the `endDate` is updated.

3.  Grayson puts his laptop to sleep, so the interval stops executing.

4.  Grayson settles into his subway seat and reopens his laptop. The browser window is open and intervals resume. The previous endTime is way more than 1 second prior, so ReadMe creates a new interaction instead. Keep in mind this is now happening with no internet connection.

```js
localStorage: {
  // other properties
  readmeIacts: [
    { startDate: "10:13AM", endDate: "10:14AM", articleId: 1 },
    { startDate: "10:35AM", endDate: "10:35AM", articleId: 1 }
  ];
}
```

5.  While he reads, the interaction endDate continues to update.

6.  He decides he's done reading at the end of the subway ride, and, rather than put his laptop to sleep, he actually closes the tab with his story on it.

7.  On close ReadMe is trained to commit all interactions in `localStorage` to the database and then clear `localStorage`. Unfortunately, there's still no internet connection - the POST fails, therefore `localStorage` is not cleared.

8.  Grayson opens his laptop at lunch with a Wi-Fi connection and navigates to ReadMe. Upon mounting, the `Routes` component is trained to look at `localStorage` and commit all interactions to the database, then clear `localStorage`.
