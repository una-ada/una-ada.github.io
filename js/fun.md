---
author: una
title: fun scripts
layout: pixel
---

<style>
  div.article pre[class*="language-"] {
    border: 0;
    margin: 0;
    padding: 0;
  }
  ul#markdown-toc {
    column-count: 3;
  }
</style>

- toc
{:toc}

# good stuff

## buildMatrix
```javascript
// Generate an m x n matrix with elements filled in order
const buildMatrix = (m, n) => {
  for(var a=[], i = 0; i < m * n;)
    (a[~~(i / m)] || (a[~~(i / m)] = []))[~~(i % m)] = ++i;
  return a
}
```

## chronogram
```javascript
// Check the chronogram value (total of all roman numerals) of a string
const chronogram = t =>
  [['i',1],['v',5],['x',10],['l',50],['c',100],['d',500],['m',1000]]
  .reduce((a, [l, v]) => a + [...t.matchAll(new RegExp(l, 'gi'))].length * v, 0)
```

## getUnicode
```javascript
// Get codepoints from a list of characters, e.g. `a, b, c`
const getUnicode = (l, d, s) =>
  [...new Set(l.split(d))]
  .flatMap(c => c ? [...c] : "")
  .map(c => c ? (p => [p, `U+${p.toString(16)}`, c])(c.codePointAt(0)) : "")
  .sort((a,b) => s ? a[0] - b[0] : -1)
  .map(c => c.slice(1))

// Get codepoints from a list of strings, e.g. `ab, cd, ef`
const getUnicode2 = (l, d) =>
  [...new Set(l.split(d))]
  .map(c => c ? [c, [...c].reduce((a, i) => a + `\\u${
    (n => '0'.repeat(4 - n.length) + n)(''+i.codePointAt(0).toString(16))
  }`, '')]: "")
```

## maxValue
```javascript
// Maximum value in a multidemnsional array
const maxValue = a => Math.max(...[].concat(...a));
```

## randomColors
```javascript
// Set random elements on the page to random colors
setInterval(_ => {
  r = _ => Math.random(),
  d = document.querySelectorAll('*');
  d[~~(r() * d.length)].style.background=`hsl(${r()*360},80%,60%)`
  }, 10
);
```

## substringSwap
```javascript
// Swap substrings per a list of swaps, e.g. [[a, b], [c, d]]
const substringSwap = (string, swaps) => 
  swaps.reduce(
    (r, [i, j]) => r.replace(RegExp(`(${i}|${j})`), $1 => $1 == i ? j : i),
    string
  );
```

# dumb bullshit

## clamp
```javascript
const clamp = (val, min, max) => {
  let j = (a, b, h) => {
    if(a == b) return a;
    let [c, d] = [a, b].map(v => v >> 31 == -1);
    if(c != d) return h ? b : a;
    for(let i = 30, e, f, g; i >=0; i--){
      if((e = a >> i & 1) == (f = b >> i & 1)) continue;
      return e != f && e ? h ? a : b : h ? b : a ;
    }
  };
  return j(j(val, max, 0), min, 1);
}
```

## fizzbuzz
```javascript
var a = n => [...Array(n).keys()].map(x =>++x),
    c = x => new Array(x.length).fill(0),
  m4m = (A, B) => c(A).map((r, i) => c(B[0])
          .map((v, j) => A[i]
            .reduce((s, e, k) => s + (e * B[k][j]), 0)
          )
        ),
    z = [70, 105, 122, 122, 32, 66, 117, 122, 122],
    y = n => (m => c(z).map((r, i) => c(z).map((v, j)=> i == j ? m[i] : 0)))(
          [3, 3, 15, 15, 15, 5, 5, [3, 5], [3, 5]]
            .map( x => Array.isArray(x)
              ? +(n % x[0] < 1 || n % x[1] < 1)
              : +(n % x < 1)
            )
        ),
    f = n => a(n).map(x => (l => l.length ? String.fromCodePoint(...l) : x)(
          m4m([z], y(x))[0].filter(v => v)
        ));
f(100).forEach(i => console.log(i));
```

# code golfing

## evilNumbersLong

```javascript
//  n = m^(m*2)
    a=[];for(m=-1;m++<2e3;a.push(m^(m*2)));for(n=-1;n++<1e3;~a.indexOf(n)&&
    print(n));
//  bit counting
    for(i=0;i<=1e3;[...(i++).toString(2)].filter(v=>+v).length%2||print(i-1));
//  a(n) << 1 = n
    i=0;do{print(x=(i<<1)+((f=n=>n&&(1&n)+f(n>>1))(i++)%2))}while(x<1e3)
//  n = m^(m*2), m > n
    a=[];for(n=-1;n++<1e3;a.push(n^(n*2))&&~a.indexOf(n)&&print(n));
//  bit counting helper, see codegolf.stackexchange.com/a/47896
    for(i=-1;i++<1e3;(f=n=>n&&(1&n)+f(n>>1))(i)%2||print(i));
//  aside: illegible thue-morse sequence
    [...''+[][[]]].reduce((a,t)=>{t=a[0];a[0]+=a[1];a[1]+=t;return a;},
    ['0','1'])[0]
```

## fizzBuzz

```javascript
//  .forEach
    Array(100).fill().forEach((_,i)=>(t=>print(i%5?t||i:t+'Buzz'))(++i%3?
    '':'Fizz'))
//  .forEach
    Array(100).fill().forEach((_,i)=>{t=++i%3?'':'Fizz';print(i%5?t||i:t
    +'Buzz')})
//  [][i%n]
    for(i=0;i++-100;)print([i,'Fizz','Buzz','FizzBuzz'][!(i%3)+!(i%5)*2])
//  i%n helper --Ryan
    f=(m,s)=>i%m?'':s;for(i=0;i++-100;)print(f(3,'Fizz')+f(5,'Buzz')||i)
//  recursion
    (f=i=>{t=i%3?'':'Fizz';print(i%5?t||i:t+'Buzz');i<100&&f(i+1)})(1)
//  .slice codegolf.stackexchange.com/a/58636
    for(i=0;i++-100;)print('FizzBuzz'.slice(i%3&&4,i%5?4:8)||i)
//  i%n?: concat codegolf.stackexchange.com/a/58636
    for(i=0;i++-100;)print((i%3?'':'Fizz')+(i%5?'':'Buzz')||i)
//  t=i%3?: codegolf.stackexchange.com/a/62697
    for(i=0;i++-100;print(i%5?t||i:t+'Buzz'))t=i%3?'':'Fizz'
```

## rijndaelSBox

```javascript
//  do...while from wikipedia
    function r(n,d){return ((n<<d)|(n>>(8-d)))&0xFF;}var s=[],p=1,q=1;do{p=(p^
    (p<<1)^(p&0x80?0x1B:0))&0xFF;q^=(q<<1)&0xFF;q^=(q<<2)&0xFF;q^=(q<<4)&0xFF;
    q^=(q&0x80?0x09:0)&0xFF;let t=q^r(q,1)^r(q,2)^r(q,3)^r(q,4);s[p]=((t^0x63)&
    0xFF).toString(16);}while(p!=1);s[0]='63';print(s.reduce((a,v,i)=>a+(v[1]?''
    :'0')+v+(i==255?'':(i+1)%16?' ':'\n'),''));
//  for loop
    r=(n,d)=>((n<<d)|(n>>(8-d)))&255;for(p=1,q=1,s=['63'];(p!=1||!s[p])&&(p=(p^
    (p<<1)^(p&128?27:0))&255);){q^=(q<<1)&255;q^=(q<<2)&255;q^=(q<<4)&255;q^=(q&
    128?9:0)&255;let t=q^r(q,1)^r(q,2)^r(q,3)^r(q,4);s[p]=((t^99)&255).toString
    (16);}print(s.reduce((a,v,i)=>a+(v[1]?'':'0')+v+(i==255?'':(i+1)%16?'':'\n'
    ),''));
//  infer newlines
    r=(n,d)=>((n<<d)|(n>>(8-d)))&255;for(p=1,q=1,s=['63'];(p!=1||!s[p])&&(p=(p^
    (p<<1)^(p&128?27:0))&255);){q^=(q<<1)&255;q^=(q<<2)&255;q^=(q<<4)&255;q^=(q&
    128?9:0)&255;let t=q^r(q,1)^r(q,2)^r(q,3)^r(q,4);s[p]=((t^99)&255).toString
    (16);}s.forEach((v,i)=>((i+1)%16?write:print)((v[1]?'':'0')+v+' '));
```

## sudoku
```javascript
//  error throwing recursion gist.github.com/p01/1230481
//  formatting destructuring helper codegolf.stackexchange.com/a/127009
try{(R=(a,i,j,m,g)=>{for(i=80;a[i];i--||A);for(m=10;g=a[i]=--m;g&&R(a))for(j in 
a)g*=j==i||a[j]^m||i%9^j%9&&i/9^j/9&&i/27^j/27|i%9/3^j%9/3})(x=[...arguments
.join('').replaceAll('_','0')].map(i=>+i))}catch(_){print(((n,r=(x,y)=>x+y+x+y
+x,q=s=>([u,w,x,y,z]=[...s[0]],u+r(r(w+w+w,x),y)+z+`
`))=>q`┏━┯┳┓`+n.reduce((o,v,i)=>o+"┃││"[i++%3]+` ${v||" "} `+(i%9?e:`┃
`+(i-27&&i-54?i<81?q`┠─┼╂┨`:e:q`┣━┿╋┫`)),e="")+q`┗━┷┻┛`)(x))}

//  recursion end on print
(R=(a,i,j,m,g)=>{for(i=80;a[i];i--||print(((n,r=(x,y)=>x+y+x+y+x,q=s=>([u,w,x,y,
z]=[...s[0]],u+r(r(w+w+w,x),y)+z+`
`))=>q`┏━┯┳┓`+n.reduce((o,v,i)=>o+"┃││"[i++%3]+` ${v||" "} `+(i%9?e:`┃
`+(i-27&&i-54?i<81?q`┠─┼╂┨`:e:q`┣━┿╋┫`)),e="")+q`┗━┷┻┛`)(x)));for(m=10;g=a[i]=
--m;g&&R(a))for(j in a)g*=j==i||a[j]^m||i%9^j%9&&i/9^j/9&&i/27^j/27|i%9/3^j%9/
3})(x=[...arguments.join('').replaceAll('_','0')].map(i=>+i))

//  no .map(i=>+i) or .replaceAll
(R=(a,i,j,m,g)=>{for(i=80;+a[i];i--||print(((n,r=(x,y)=>x+y+x+y+x,q=s=>([u,w,x,
y,z]=[...s[0]],u+r(r(w+w+w,x),y)+z+`
`))=>q`┏━┯┳┓`+n.reduce((o,v,i)=>o+"┃││"[i++%3]+` ${v||" "} `+(i%9?e:`┃
`+(i-27&&i-54?i<81?q`┠─┼╂┨`:e:q`┣━┿╋┫`)),e="")+q`┗━┷┻┛`)(x)));for(m=10;g=a[i]=
--m;g&&R(a))for(j in a)g*=j==i||+a[j]^m||i%9^j%9&&i/9^j/9&&i/27^j/27|i%9/3^j%9/
3})(x=[...arguments.join('')])

//  formatting destructuring no helper codegolf.stackexchange.com/a/128990
(c=(a,i,j,m,g)=>{for(i=80;+a[i];i--||print([0,...a].map((v,i)=>'│┃│'[i%3]+
` ${v} `+(i%9?'':`┃
${[u,w,x,y,z]=i%27?'┠─┼╂┨':i>80?'┗━┷┻┛':i?'┣━┿╋┫':'┏━┯┳┓',u+(y=(x=(w+=w+w)+x+w+x
+w)+y)+y+x+z}
`)).join``.slice(6)));for(m=10;g=a[i]=--m;g&&c(a))for(j in a)g*=j==i||+a[j]^m||
i%9^j%9&&i/9^j/9&&i/27^j/27|i%9/3^j%9/3})([...arguments.join``])
```

# class assignments

## addChecker

```javascript
/* Prompt:    - Write a function called addChecker that accepts two arguments.
 *            - The first argument is an array containing at least two integers.
 *              The integers in the array are sorted in ascending order.
 *            - The second argument is an integer.
 *            - The addChecker function should return true if there are two
 *              integers in the array of integers (first argument) that when
 *              added together, equals the integer passed in as the second
 *              argument.
 *            - If there are no two integers in the array that sum up to equal
 *              the second argument, addChecker should return false.
 * Examples:    addChecker( [1, 2], 3 )                 // => true
 *              addChecker( [-3, 2], 9 )                // => false
 *              addChecker( [10, 15, 16, 22], 32 )      // => true
 *              addChecker( [10, 15, 16, 22], 19 )      // => false
 */
const addChecker = (ns, sum) =>
  (set =>                               // nesting function to avoid keywords
    !!ns.find(                          // find returns bool and breaks on true
      n  =>
        set.has(sum - n) ||             // return true if sum - n is in the set
        (set.add(n) &&                  // or add n to the set
          0)                            // and return 0 so the iterator moves on
    ))(
    new Set()                           // pass in a new set to work with
  ); 
```

## balancedBrackets

```javascript
/* Prompt:    - Write a function called balancedBrackets that accepts a single 
 *              string as argument.
 *            - The input string is composed entirely of parentheses, brackets 
 *              and/or curly braces, i.e.,  (), [] and/or {}. Referred to as 
 *              "braces" from this point forward...
 *            - The balancedBraces function should return true if the string's 
 *              braces are "balanced" and false if they are not.
 *            - The brackets are considered unbalanced if any closing bracket 
 *              does not close the same type of opening bracket, ignoring 
 *              already matched brackets between them.  Examples explain it 
 *              best...
 * Examples:    balancedBrackets('()')  // => true
 *              balancedBrackets('(]')  // => false
 *              balancedBrackets('[{}]')
 *              // => true
 *              balancedBrackets('[(])')
 *              // => false
 *              balancedBrackets('[({}[])]')
 *              // => true
 */
const balancedBrackets = s =>
  [...s].reduce(
    (a, char) =>                        // spread string and reduce it
      a.stack.push(char) &&             // push bracket to stack
      ~a.closers.indexOf(char) &&       // check if bracket is a closer
      a.stack.length > 1 &&             // make sure there are 2+ elements
      a.stack[a.stack.length - 2] ==    // check if previous char...
        a.openers[
          a.closers.indexOf(char)       // ... is the opener for current
        ]
        ? a.stack.splice(-2) && a       // if they match remove both brackets
        : a,                            // else just return current stack
    {                                   // initialize accumulator with:
      stack: [],                        // - stack
      openers: ['(', '[', '{'],         // - array of opening brackets
      closers: [')', ']', '}'],         // - array of closing brackets
    }
  ).stack.length == 0;                  // check if stack is empty
```

## charCount

```javascript
/* Prompt:    - Write a function named charCount that accepts a single string 
 *              argument and returns an object that represents the count of 
 *              each character in the string.
 *            - The returned object should have keys that represent the 
 *              character with its value set to the how many times the 
 *              character appears in the string argument.
 *            - Upper and lower case characters should be counted separately.
 *            - Space characters should be count too.
 * Examples:    charCount('hello')      // => { h: 1, e: 1, l: 2, o: 1 }
 *              charCount('Today is fantastic!')
 *              // => { T: 1, o: 1, d: 1, a: 3, y: 1, ' ': 2, i: 2, s: 2, f: 1, 
 *                      n: 1, t: 2, c: 1, '!': 1 }
 */
const charCount = str =>
  [...str]                              // spread string into array
    .reduce(                            // use reduce for its initializing!
      (obj, i) => ({                    // return the object on each iteration
        ...obj,                         // spread previous object
        [i]:
          obj[i] + 1 ||                 // if `obj[i]` is defined add one ...
          1,                            // ... or define it at 1
      }),
      {}                                // init with an empty object
    );
```

## countTheBits

```javascript
/* Prompt:    - Write a function called countTheBits that accepts a single
 *              numeric argument that will be an integer.
 *            - The function should return the number of bits that are set to 1
 *              in the number's binary representation.
 * Examples:    countTheBits(0)         // => 0
 *              countTheBits(13)        // => 3
 *              countTheBits(256)       // => 1
 *              countTheBits(255)       // => 8
 *              countTheBits(65535)     // => 16
 */
const countTheBits = n =>
  [...n.toString(2)]                    // convert number to binary string
    .filter(v => +v)                    // `+` converts to int, 1 coerces true
    .length;                            // count the array of ones
```

## flatten

```javascript
/* Prompt:    - Write a function named flatten that accepts a single array that 
 *              may contain nested arrays and returns a new "flattened" array.
 *            - A flattened array is an array that contains no nested arrays.
 *            - Arrays maybe nested at any level.
 *            - If any of the arrays have duplicate values those duplicate 
 *              values should be present in the returned array.
 *            - The values in the new array should maintain their ordering as 
 *              shown in the examples below.
 * Examples:    flatten([1, [2, 3]])
 *              // => [1, 2, 3]  (a new array) 
 *              flatten([1, [2, [3, [4]]], 1, 'a', ['b', 'c']]);
 *              // => [1, 2, 3, 4, 1, 'a', 'b', 'c']
 */
const flatten = arr =>
  arr.reduce(
    (acc, v) =>
      acc.concat(
        Array.isArray(v)                // concat to accumulator
          ? flatten(v)                  // if is array then recursion ...
          : [v]                         // ... else concat literal array
      ), 
    []                                  // initialize new array
  );
```

## fromPairs

```javascript
/* Prompt:    - Write a function named fromPairs that creates an object from an 
 *              array containing nested arrays.
 *            - Each nested array will have two elements representing key/value 
 *              pairs used to create key/value pairs in an object to be 
 *              returned by the function.
 *            - If a key appears in multiple pairs, the rightmost pair should 
 *              overwrite previous the previous entry in the object.
 * Examples:    fromPairs([ ['a', 1], ['b', 2], ['c', 3] ])
 *              // => { a: 1, b: 2, c: 3 }
 *              fromPairs([ ['name', 'Sam"], ['age', 24], ['name', 'Sally'] ])
 *              //=> { name: "Sally", age: 24 }
 */
const fromPairs = arr => arr.reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
```

## getNumForIP

```javascript
/* Prompt:    - Write a function called getNumForIP that accepts a single string
 *              as argument.
 *            - The input string is formatted as an IP address, such as
 *              '192.156.99.15'.  IP addresses are used in networking and are
 *              actually 32-bit integers.  However, those that work with
 *              networks find it more convenient to work with these numbers as
 *              four 8-bit integers, separated by a 'dot' character.
 *            - The getNumForIP function should return the numeric value of the
 *              string IP address being passed in as an argument.
 * Examples:    getNumForIP('0.0.0.1')  // => 1
 *              getNumForIP('0.0.2.0')  // => 512
 *              getNumForIP('192.156.99.15') // => 3231474447
 */
const getNumForIP = ip =>
  ip
    .split('.')                         // get each 8-bit number
    .reverse()                          // indices should be least to greatest
    .reduce(
      (num, v, i) =>                    // needs index `i`
        num + v * 256 ** i,             // add shifted value
      0                                 // init num as zero
    );
```

## gridTrip

```javascript
/* Prompt:    - This challenge uses an imaginary grid where the x coordinate
 *              increases when you move 'up' and decreases when you move
 *              'down'. Similarly, the y coordinate increases when you move
 *              'right' and decreases when you move 'left'.
 *            - Write a function called gridTrip that accepts two arguments.
 *            - The first argument is an array containing two integers.  The
 *              first represents the starting x position on the grid.  The
 *              second integer in the array represents the starting y position.
 *            - The second argument is a string representing "moves" using the
 *              characters 'U', 'D', 'R' & 'L' to represent moving Up, Down,
 *              Right & Left respectively.  Each direction character will be
 *              followed by digits representing how many units to move in that
 *              direction.  For example, a string of 'D15R2U4' represents moving
 *              up 15 units, to the right 2 units, and finally, down 4 units.
 *              The direction characters will always be upper case.
 *            - The gridTrip function should return a new array of two integers:
 *              the final x position and the final y position.  Do not modify
 *              the array argument).
 * Examples:    gridTrip([0, 0], 'U2R1')                // => [2, 1]
 *              gridTrip([5, 10], 'D5L15U2')            // => [2, -5]
 *              gridTrip([-22, 100], 'L2L15D50U1D9')    // => [-80, 83]
 */
const gridTrip = ([x, y], moves) =>
  [...moves.matchAll(/(\w)(\d+)/g)]     // using matchAll to get groups
    .reduce(
      (acc, [, dir, dist]) => {         // doing some destructuring for fun
        acc[+!~['U', 'D'].indexOf(dir)] // if up or down: x, else: y
          += !~['L', 'D'].indexOf(dir)  // if NOT left or down
          ? +dist                       // ... add positive dist
          : -dist;                      // ... else add negative dist
        return acc;                     // continue with modified acc
      }, 
      [+x, +y]                          // init acc with starting position
    ); 
```

## hammingDistance

```javascript
/* Prompt:      In information theory, the hamming distance refers to the count 
 *              of the differences between two strings of equal length. It is 
 *              used in computer science for such things as implementing "fuzzy 
 *              search" capability.
 *              - Write a function named hammingDistance that accepts two 
 *                arguments which are both strings of equal length.
 *              - The function should return the count of the symbols 
 *                (characters, numbers, etc.) at the same position within each 
 *                string that are different.
 *              - If the strings are not of the same length, the function 
 *                should return NaN.
 * Examples:    hammingDistance('abc', 'abc')   // => 0
 *              hammingDistance('a1c', 'a2c')   // => 1
 *              hammingDistance('!!!!', '****') // => 4
 *              hammingDistance('abc', 'ab')    // => NaN
 */
const hammingDistance = (str1, str2) =>
  str1.length !== str2.length           // check string lengths
    ? NaN                               // return NaN if lengths different
    : [...str1]                         // spread string into array
        .reduce(
          (dist, char, i) =>
            dist + (char !== str2[i]),  // using some loose typing
          0                             // initialize distance as 0
        ); 
```

## intersection

```javascript
/* Prompt:    - Write a function named intersection that accepts two arguments 
 *              which are both arrays.  The array arguments may contain any 
 *              mixture of strings, numbers and/or booleans - but no reference 
 *              types, i.e., objects.
 *            - The function should return a new array containing all elements 
 *              in common, including repeating element values.
 *            - The ordering of the elements in the returned is not important.
 *            - If there are no elements in the arrays in common,  the 
 *              intersection function should return an empty array.
 *            - The function should not mutate (change) either argument.
 * Examples:    intersection(['a', 1], [])
 *              // => []
 *              intersection(['a', 1], [true, 'a', 15])
 *              // => ['a']
 *              intersection([1, 'a', true, 1, 1], [true, 1, 'b', 1])
 *              // => [1, true, 1]
 */
const intersection = (arr1, arr2) =>
  arr2.reduce(
    (acc, v) =>                         // loop thru arr2
      ~acc[0].indexOf(v)                // check if arr1 contains element
        ? acc[1].push(                  // push to intersect array
            acc[0].splice(              // move from arr1 copy to intersect
              acc[0].indexOf(v),        // splice at index of shared value
              1
            )[0]
          ) && acc                      // return updated acc
        : acc,                          // just return acc if not shared
    [[...arr1], []]                     // initialize acc as array
  )[1];                                 // return intersect array
```

## isPalindrome

```javascript
/* Prompt:    - Write a function called isPalindrome that accepts a single 
 *              string argument, then returns true or false depending upon 
 *              whether or not the string is a palindrome.
 *            - A palindrome is a word or phrase that are the same forward or 
 *              backward.
 *            - Casing and spaces are not included when considering whether or 
 *              not a string is a palindrome.
 *            - If the length of the string is 0 or 1, return true.
 * Examples:    isPalindrome('sadge')   // => false
 *              isPalindrome('rotor')   // => true
 *              isPalindrome('A nut for a jar of tuna') // => true
 *              isPalindrome('')        // => true
 */
const isPalindrome = str =>
  [
    ...str                              // spread string into array
      .toLowerCase()                    // remove case sensitivity
      .replace(/[\W_]/g, ''),           // strip whitespace (regex)
  ].every((char, i, arr) =>             // check if true for all elements
      char === arr[arr.length - i - 1]  // compare letters
  );
```

## isPrime

```javascript
/* Prompt:    - Write a function named isPrime that returns true when the 
 *              integer argument passed to it is a prime number and false when 
 *              the argument passed to it is not prime.
 *            - A prime number is a whole number (integer) greater than 1 that 
 *              is evenly divisible by only itself.
 * Examples:    isPrime(2)              // => true
 *              isPrime(3)              // => true 
 *              isPrime(4)              // => false
 *              isPrime(29)             // => true
 *              isPrime(200)            // => false
 */
const isPrime = n =>
  n > 1 &&                              // primes are greater than 1
  ~~n == n &&                           // primes are whole numbers
  [
    ...Array(                           // create new array
      Math.max(
        0,                              // min length 0
        ~~Math.sqrt(n) - 1              // floor sqrt() and remove 1
      )
    ).keys(),
  ]                                     // get array of keys [0, ... length]
    .every(i => n % (i + 2));           // check divisibility from 2 to sqrt
```

## mergeObjects

```javascript
/* Prompt:    - Write a function named mergeObjects that accepts at least two 
 *              objects as arguments, merges the properties of the second 
 *              through n objects into the first object, then finally returns 
 *              the first object.
 *            - If any objects have the same property key, values from the 
 *              object(s) later in the arguments list should overwrite earlier 
 *              values.
 * Examples:    mergeObjects({}, {a: 1})
 *              // => {a: 1} (same object as first arg)
 *              mergeObjects({a: 1, b: 2, c: 3}, {d: 4})
 *              // => {a: 1, b: 2, c: 3, d: 4}
 *              mergeObjects({a: 1, b: 2, c: 3}, {d: 4}, {b: 22, d: 44})
 *              // => {a: 1, b: 22, c: 3, d: 44}
 */
const mergeObjects = (...os) => {
  os
    .slice(1)                           // get arguments without first object
    .forEach(                           // loop thru objects
      o =>
        Object.keys(o).forEach(         // loop thru object keys
          key => (os[0][key] = o[key])  // set value in first object
        )
    ); 
  return os[0];                         // return first object
};
```

## primeFactors

```javascript
/* Prompt:      Now that you have solved the last challenge of determining if a 
 *              whole number is prime, let's expand upon that concept to...
 *              - Write a function named primeFactors that accepts a whole 
 *                number greater than one (1) as an argument and returns an 
 *                array of that argument's prime factors.
 *              - The prime factors of a whole number are the prime numbers 
 *                that, when multiplied together, equals the whole number.
 *              - If the argument provided is not greater than 1, or not a 
 *                whole number, then primeFactors should return an empty array
 * Examples:    primeFactors(2)         // => [2]
 *              primeFactors(3)         // => [3]
 *              primeFactors(4)         // => [2, 2]
 *              primeFactors(18)        // => [2, 3, 3]
 *              primeFactors(29)        // => [29]
 *              primeFactors(105)       // => [3, 5, 7]
 *              primeFactors(200)       // => [2, 2, 2, 5, 5]
 */
const primeFactors = n =>
  n > 1 && ~~n == n                     // check > 1 and whole
    ? isPrime(n)                        // check if prime
      ? [n]                             // return primes
      : [
          [
            ...Array(                   // new array
              Math.max(
                0,                      // min length 0
                ~~Math.sqrt(n) - 1      // length floor sqrt - 1
              )
            ).keys(),                   // get array of keys [0, ... length]
          ]
            .map(i => i + 2)            // shift array [2, ... sqrt + 1]
            .find(i => n % i === 0),    // get first factor
        ] 
          .reduce(
            (acc, v, i, arr) =>
              arr.concat(               // concat factors
                primeFactors(n / v)     // get factors of n / factor
              ), 
            []                          // initialize reduce with empty array
          ) 
    : [];                               // return empty if not >1 and whole
```

## range

```javascript
/* Prompt:    - Write a function called range that accepts two integers as 
 *              arguments and returns an array of integers starting with the 
 *              first argument up to one less than the second argument.
 *            - The range function must be called with the first argument less 
 *              than or equal to the second argument, otherwise return the 
 *              string "First argument must be less than second".
 * Examples:    range(1,4)              // => [1,2,3]
 *              range(-2, 3)            // => [-2,-1,0,1,2]
 *              range(1,1)              // => []
 *              range(5,2)              // => "First argument must be less than 
 *                                             second"
 */
const range = (a, b) =>
  b < a                                 // check if inputs are correct
    ? 'First argument must be less than second'
    : Array.from(                       // else return new array
        { length: b - a },              // ... of length `b - a`
        (_, i) => i + a                 // ... where each element is i + a 
      );
```

## toCamelCase

```javascript
/* Prompt:    - Write a function called toCamelCase that accepts a single string
 *              as argument.
 *            - The toCamelCase function should return the string as
 *              camel-cased, removing each _ or - characters and capitalizing
 *              the character following the _ or -.
 * Examples:    toCamelCase('wdi-rocks') // => 'wdiRocks'
 *              toCamelCase('banana_Turkey_potato') // => 'bananaTurkeyPotato'
 *              toCamelCase('Mama-mia') // => 'MamaMia'
 *              toCamelCase('A_b_c')    // => 'ABC'
 */
const toCamelCase = name =>
  name
    .match(/([A-Za-z0-9]+)/g)           // \w contains '_' so it can't be used
    .reduce(
      (acc, v, i) =>
        acc +                           // concatenate to the new string
        (i                              // if not first word...
          ? `${v[0].toUpperCase()       // ... uppercase the first character ...
            }${v.slice(1)}`             // ... keep the rest
          : v),                         // else use original word
      ''                                // initialize new string as ''
    ); 
/*
 * I decided to go with the template literal and string splitting here because
 * the other options is somewhat difficult to read:
 *   (([x, ...xs])=>[x.toUpperCase(), ...xs].join(''))(v)
 */
```

## totalTaskTime

```javascript
/* Prompt:    - Write a function called totalTaskTime that accepts two 
 *              arguments.
 *            - The first argument is an array of integers referred to as a
 *              "queue".  Each integer in the queue represents a "task", more
 *              specifically, the amount of time to complete that task.
 *            - The second argument is an integer representing the number of CPU
 *              "threads" available to process all of the tasks in the queue.
 *            - The totalTaskTime function should return an integer representing
 *              the total time it is going to take to complete all of the tasks
 *              in the queue.
 *            - You may mutate the "queue" array (first argument) if you wish
 * Examples:    totalTaskTime([], 1)                    // => 0
 *              totalTaskTime([4, 2, 5], 1)             // => 11
 *              totalTaskTime([5, 8], 2)                // => 8
 *              totalTaskTime([4, 2, 10], 2)            // => 12
 *              totalTaskTime([2, 2, 3, 3, 4, 4], 2)    // => 9
 *              totalTaskTime([5, 2, 6, 8, 7, 2], 3)    // => 12
 */
const totalTaskTime = (tasks, threads) =>
  Math.max(                             // get the longest thread
    ...tasks.reduce((acc, v) =>         // reduce on the list of task lengths
        (acc[
          acc.indexOf(                  // find the index of...
            Math.min(...acc)            // ... the shortest thread
          )
        ] += v) &&                      // ... then add length of next task
        acc,                            // return the accumulator
      Array(threads).fill(0)            // initialize threads all at 0
    )
  );
```
