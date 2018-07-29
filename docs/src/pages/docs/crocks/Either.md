---
title: "Either"
description: "Either Crock"
layout: "guide"
functions: ["firsttoeither", "lasttoeither", "maybetoeither", "resulttoeither"]
weight: 40
---

```haskell
Either c a = Left c | Right a
```

[OVERALL DESC]

```javascript
import Either from 'crocks/Either'

import compose from 'crocks/helpers/compose'
import ifElse from 'crocks/logic/ifElse'
import isNumber from 'crocks/predicates/isNumber'
import map from 'crocks/pointfree/map'

const { Left, Right } = Either

// err :: a -> String
const err = val =>
  `${typeof val} is not an accepted type`

// add :: Number -> Number -> Number
const add =
  x => y => x + y

// validate :: a -> Either String Number
const validate = ifElse(
  isNumber,
  Right,
  compose(Left, err)
)

// flow :: a -> Either String Number
const flow = compose(
  map(add(10)),
  validate
)

flow(32)
//=> Right 42

flow('32')
//=> Left "string is not an accepted type"

flow(true)
//=> Left "boolean is not an accepted type"
```

<article id="topic-implements">

## Implements
`Setoid`, `Semigroup`, `Functor`, `Alt`, `Apply`, `Traversable`, `Chain`, `Applicative`, `Monad`

</article>

<article id="topic-construction">

## Construction

```haskell
Either :: a -> Either c a
```

[ CONSTRUCTOR DESC]

```javascript
import Either from 'crocks/Either'
import equals from 'crocks/pointfree/equals'

Either(90)
//=> Right 90

Either.of(90)
//=> Right 90

Either.Right(90)
//=> Right 90

equals(
  Either.Right([ 1, 2, 3 ]),
  Either.of([ 1, 2, 3 ])
)
//=> true

equals(
  Either.of({ a: 100 }),
  Either({ a: 100 })
)
//=> true
```

</article>

<article id="topic-constructor">

## Constructor Methods

#### Left

```haskell
Either.Left :: c -> Either c a
```

[FUNC DESC]

```javascript
import Either from 'crocks/Either'

import chain from 'crocks/pointfree/chain'
import compose from 'crocks/helpers/compose'
import isString from 'crocks/predicates/isString'
import ifElse from 'crocks/logic/ifElse'

const { Left, Right } = Either

// yell :: String -> String
const yell =
  x => `${x.toUpperCase()}!`

// safeYell :: a -> Either a String
const safeYell =  ifElse(
  isString,
  compose(Right, yell),
  Left
)

Right('excite')
  .map(yell)
//=> Right "EXCITE!"

Left('whisper')
  .map(yell)
//=> Left "whisper"

chain(safeYell, Right('outside voice'))
//=> Right "OUTSIDE VOICE!"

chain(safeYell, Left({ level: 'inside voice' }))
//=> Left { level: 'inside voice' }
```

#### Right

```haskell
Either.Right :: a -> Either c a
```

[FUNC DESC]

```javascript
import Either from 'crocks/Either'

import compose from 'crocks/helpers/compose'
import composeK from 'crocks/helpers/composeK'
import ifElse from 'crocks/logic/ifElse'
import isNumber from 'crocks/predicates/isNumber'

const { Left, Right } = Either

// validate :: (b -> Boolean) -> Either c a
const validate = pred =>
  ifElse(pred, Right, Left)

// add10 :: Number -> Number
const add10 =
  x => x + 10

Right(10)
  .map(add10)
//=> Right 20

Left('Not A Number')
  .map(add10)
//=> Left "Not A Number"

// validNumber :: b -> Either c Number
const validNumber =
  validate(isNumber)

validNumber('60')
//=> Left "60"

validNumber(null)
//=> Left null

validNumber(60)
//=> Right 60

// safeAdd10 :: b -> Either c Number
const safeAdd10 = composeK(
  compose(Right, add10),
  validNumber
)

safeAdd10([ 7 ])
//=> Left [ 7 ]

safeAdd10(null)
//=> Left null

safeAdd10(5)
//=> Right 15

// isLarge :: Number -> Either Number Number
const isLarge =
  validate(x => x >= 10)

// isLargeNumber :: b -> Either c Number
const isLargeNumber =
  composeK(isLarge, validNumber)

// add10ToLarge :: b -> Either c Number
const add10ToLarge =
  composeK(safeAdd10, isLargeNumber)

add10ToLarge()
//=> Left undefined

add10ToLarge('40')
//=> Left "40"

add10ToLarge(5)
//=> Left 5

add10ToLarge(10)
//=> Right 20
```

#### of

```haskell
Either.of :: a -> Either c a
```

[FUNC DESC]

```javascript
import Either from 'crocks/Either'

const { Right } = Either

Either.of('some string')
//=> Right "some string"

Either.of(undefined)
//=> Right undefined

Either('some string')
//=> Right "some string"

Either(undefined)
//=> Right undefined

Right('some string')
//=> Right "some string"

Right(undefined)
//=> Right undefined
```

</article>

<article id="topic-instance">

## Instance Methods

#### equals

```haskell
Either c a ~> b -> Boolean
```

[ METHOD DESC ]

```javascript
```

#### concat

```haskell
Semigroup s => Either c s ~> Either c s -> Either c s
```

[ METHOD DESC ]

```javascript
```

#### map

```haskell
Either c a ~> (a -> b) -> Either c b
```

[ METHOD DESC ]

```javascript
```

#### alt

```haskell
Either c a ~> Either c a -> Either c a
```

[ METHOD DESC ]

```javascript
```

#### bimap

```haskell
Either c a ~> ((c -> d), (a -> b)) -> Either d b
```

[ METHOD DESC ]

```javascript
```

#### ap

```haskell
Either c (a -> b) ~> Either c a -> Either c b
```

[ METHOD DESC ]

```javascript
```

#### sequence

```haskell
Apply f => Either c (f a) ~> (b -> f b) -> f (Either c a)
Applicative f => Either c (f a) ~> TypeRep f -> f (Either c a)
```

[ METHOD DESC ]

```javascript
```

#### traverse

```haskell
Apply f => Either c a ~> (d -> f d), (a -> f b)) -> f Either c b
Applicative f => Either c a ~> (TypeRep f, (a -> f b)) -> f Either c b
```

[ METHOD DESC ]

```javascript
```

#### chain

```haskell
Either c a ~> (a -> Either c b) -> Either c b
```

[ METHOD DESC ]

```javascript
```

#### coalesce

```haskell
Either c a ~> ((c -> b), (a -> b)) -> Either c b
```

[ METHOD DESC ]

```javascript
```

#### swap

```haskell
Either c a ~> ((c -> d), (a -> b)) -> Either b d
```

[ METHOD DESC ]

```javascript
```

#### either

```haskell
Either c a ~> ((c -> b), (a -> b)) -> b
```

[ METHOD DESC ]

```javascript
```

</article>

<article id="topic-transformation">

## Transformation Functions

#### firstToEither

`crocks/Either/firstToEither`

```haskell
firstToEither :: c -> First a -> Either c a
firstToEither :: c -> (a -> First b) -> a -> Either c a
```

[TRANSFORMATION FUNCTION DESC]

```javascript
```

#### lastToEither

`crocks/Either/lastToEither`

```haskell
lastToEither :: c -> Last a -> Either c a
lastToEither :: c -> (a -> Last b) -> a -> Either c a
```

[TRANSFORMATION FUNCTION DESC]

```javascript
```

#### maybeToEither

`crocks/Either/maybeToEither`

```haskell
maybeToEither :: c -> Maybe a -> Either c a
maybeToEither :: c -> (a -> Maybe b) -> a -> Either c a
```

[TRANSFORMATION FUNCTION DESC]

```javascript
```

#### resultToEither

`crocks/Either/resultToEither`

```haskell
resultToEither :: Result e a -> Either e a
resultToEither :: (a -> Result e b) -> a -> Either e a
```

[TRANSFORMATION FUNCTION DESC]

```javascript
```

</article>
