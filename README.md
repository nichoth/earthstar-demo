# earthstar demo
Doing this: https://github.com/earthstar-project/earthstar/blob/master/src/readme-example.ts

This part doesn't work. Keypair1 sets work fine, but this returns `undefined`. 

```js
storage.set(keypair2, {
    format: 'es.4',
    path: '/wiki/Strawberry',
    content: 'barrrrrr'
})
var res = storage.getContent('wiki/Strawberry') // --> 'Yum'
console.log(res)
```

