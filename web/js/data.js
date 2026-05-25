const DAYS = [
  {id:"day-1",code:"J1",title:"Jour 1 - Variables, types, operations",sub:"let, const, types primitifs, templates, destructuration",
    why:"Une mauvaise declaration et tout casse. La base de tout JS moderne.",
    tags:["variables","types","let","const","destructuring"],
    sections:[
      {h:"let, const, var — quoi choisir",
        blocks:[
          {p:"En JS moderne, <code>const</code> par defaut et <code>let</code> si la valeur doit changer. <strong>Oublie <code>var</code></strong> (scope confus, hoisting bizarre, source de bugs)."},
          {code:"// const : ne peut PAS etre reassigne\nconst PI = 3.14;\n// PI = 3.14159;  // ❌ TypeError\n\n// let : reassignable\nlet count = 0;\ncount = 1; // ✅\n\n// const + objet : l'objet peut etre mute (sa REFERENCE est fixe)\nconst user = { name: 'Alice' };\nuser.name = 'Bob';  // ✅ OK (mute le contenu)\n// user = { name: 'Charlie' };  // ❌ reaffectation\n\n// Scope\nif (true) {\n  let x = 1;  // bloc { } seulement\n  var y = 2;  // fonction entiere (a eviter)\n}\nconsole.log(typeof x); // undefined\nconsole.log(typeof y); // number (leak!)"},
          {table:[
            ["","var","let","const"],
            ["Scope","fonction","bloc","bloc"],
            ["Reassign","oui","oui","non"],
            ["Re-declare","oui","non","non"],
            ["Hoisted","oui (undef)","oui (TDZ)","oui (TDZ)"]
          ]},
          {tip:"Convention : <code>const</code> par defaut, <code>let</code> quand tu vas reassigner. Reduit les bugs de 50%."}
        ]
      },
      {h:"Les 7 types primitifs",
        blocks:[
          {code:"typeof 'hello'      // 'string'\ntypeof 42           // 'number'\ntypeof 12n          // 'bigint'\ntypeof true         // 'boolean'\ntypeof undefined    // 'undefined'\ntypeof null         // 'object' (bug historique de JS)\ntypeof Symbol('s')  // 'symbol'\n\n// Objets : tout le reste\ntypeof {}           // 'object'\ntypeof []           // 'object'\ntypeof function(){} // 'function'\n\n// Tester un array\nArray.isArray([]);  // true\nArray.isArray({});  // false\n\n// Tester null\nx === null;\n// PAS typeof x === 'null' (n'existe pas)"},
          {warn:"<code>typeof null === 'object'</code> est un bug officiel de JS, jamais corrige pour compatibilite. Pour tester null : <code>x === null</code>."}
        ]
      },
      {h:"Conversions de type",
        blocks:[
          {code:"// String <-> Number\nNumber('42');        // 42\nNumber('42abc');     // NaN\nparseInt('42abc');   // 42 (parse jusqu'au non-chiffre)\nparseFloat('3.14');  // 3.14\n\nString(42);          // '42'\n(42).toString();     // '42'\n(42).toFixed(2);     // '42.00'\n\n// Boolean\nBoolean(0);          // false\nBoolean('');         // false\nBoolean(null);       // false\nBoolean('false');    // true (string non vide !)\nBoolean([]);         // true (objet)\n\n// Coercion implicite (souvent piege)\n'5' + 3      // '53'  (string wins)\n'5' - 3      // 2     (number wins pour -)\n'5' * '2'    // 10\n+'42'        // 42    (raccourci)\n!!42         // true  (raccourci)"},
          {table:[
            ["Valeur","Truthy ?","Pourquoi"],
            ["<code>0</code>","false","Zero"],
            ["<code>NaN</code>","false","Not a Number"],
            ["<code>''</code>","false","String vide"],
            ["<code>null</code>","false",""],
            ["<code>undefined</code>","false",""],
            ["<code>false</code>","false","Evidemment"],
            ["<code>'0'</code>","<strong>true</strong>","String non vide"],
            ["<code>[]</code>","<strong>true</strong>","Objet (meme vide)"],
            ["<code>{}</code>","<strong>true</strong>","Objet"]
          ]}
        ]
      },
      {h:"Template literals",
        blocks:[
          {code:"const name = 'Alice';\nconst age = 28;\n\n// Backticks + ${} = template literal\nconst msg = `${name} a ${age} ans.`;\n\n// Multi-lignes natif\nconst html = `\n  <div>\n    <h1>${name}</h1>\n  </div>\n`;\n\n// Expressions dans ${}\nconsole.log(`L'an prochain : ${age + 1}`);\nconsole.log(`Statut : ${age >= 18 ? 'majeur' : 'mineur'}`);\n\n// Tagged template (avance)\nfunction html(strings, ...values) {\n  return strings.reduce((acc, str, i) => {\n    return acc + str + (values[i] ?? '');\n  }, '');\n}\nconst out = html`<p>${name}</p>`;"}
        ]
      },
      {h:"Destructuration + spread",
        blocks:[
          {code:"// Object destructuring\nconst user = { name: 'Bob', age: 30, role: 'admin' };\nconst { name, age } = user;\n\n// Avec rename\nconst { name: userName } = user;\n\n// Avec defaut\nconst { theme = 'dark' } = user;\n\n// Imbrique\nconst data = { user: { name: 'Bob', address: { city: 'Paris' } } };\nconst { user: { address: { city } } } = data;\n\n// Array destructuring\nconst [first, second, ...rest] = [1, 2, 3, 4, 5];\n// first=1, second=2, rest=[3,4,5]\n\n// Skip elements\nconst [, , third] = [1, 2, 3];\n\n// Swap\nlet a = 1, b = 2;\n[a, b] = [b, a];\n\n// Spread\nconst merged = { ...user, age: 31 };  // copie + override\nconst arr = [...arr1, ...arr2];        // concat\nconst clone = [...arr];                 // shallow copy\n\n// Spread dans args de fonction\nMath.max(...[1, 2, 3]);  // 3"}
        ]
      }
    ],
    quiz:[
      {q:"Que retourne <code>typeof null</code> ?",opts:["<code>'null'</code>","<code>'object'</code>","<code>'undefined'</code>","Erreur"],correct:"b",
        expl:"Bug historique. Pour tester null : <code>x === null</code>."},
      {q:"<code>const arr = []; arr.push(1);</code> :",opts:["OK","TypeError","Const fige","Que avec let"],correct:"a",
        expl:"const empeche REASSIGNER, pas muter."},
      {q:"<code>'5' + 3</code> retourne :",opts:["8","'53'","Erreur","NaN"],correct:"b",
        expl:"String wins avec +. Coercion -> concatenation."},
      {q:"<code>Boolean('false')</code> :",opts:["true","false","NaN","Erreur"],correct:"a",
        expl:"String non vide = truthy. Seul '' est falsy."},
      {q:"<code>[a, b] = [b, a]</code> fait :",opts:["Plantage","Swap","Copie","Concat"],correct:"b",
        expl:"Swap natif via destructuring."}
    ],
    exercises:[
      {num:1,diff:"easy",title:"Declarations modernes",desc:"3 variables : nom (string), age (number), actif (boolean).",
        sol:"const nom = 'Alice';\nconst age = 28;\nconst actif = true;"},
      {num:2,diff:"easy",title:"Template literal",desc:"Affiche 'Bonjour Alice, tu as 28 ans.' avec template literal.",
        sol:"const nom = 'Alice';\nconst age = 28;\nconsole.log(`Bonjour ${nom}, tu as ${age} ans.`);"},
      {num:3,diff:"easy",title:"Convertir",desc:"Convertit la string '42' en number.",
        sol:"const n = Number('42');\n// ou : +'42'\n// ou : parseInt('42')"},
      {num:4,diff:"easy",title:"Typeof check",desc:"Type de 42, '42', true, null.",
        sol:"console.log(typeof 42);    // number\nconsole.log(typeof '42');  // string\nconsole.log(typeof true);  // boolean\nconsole.log(typeof null);  // object"},
      {num:5,diff:"medium",title:"Destructuration",desc:"Extrait name et age de user.",
        sol:"const user = { name: 'Bob', age: 30, role: 'admin' };\nconst { name, age } = user;\nconsole.log(name, age);"},
      {num:6,diff:"medium",title:"Rename + default",desc:"Destructure user.theme vers theme avec defaut 'light'.",
        sol:"const user = { name: 'Bob' };\nconst { theme: theme = 'light' } = user;\n// ou plus simple :\nconst { theme = 'light' } = user;"},
      {num:7,diff:"medium",title:"Array swap",desc:"Echange la valeur de a et b sans variable temp.",
        sol:"let a = 1, b = 2;\n[a, b] = [b, a];\n// a = 2, b = 1"},
      {num:8,diff:"medium",title:"Spread objets",desc:"Fusionne 2 objets.",
        sol:"const base = { a: 1, b: 2 };\nconst extra = { c: 3, d: 4 };\nconst merged = { ...base, ...extra };"},
      {num:9,diff:"medium",title:"Copie array",desc:"Cree une copie d'un array sans muter l'original.",
        sol:"const arr = [1, 2, 3];\nconst copy = [...arr];\ncopy.push(4);\nconsole.log(arr);   // [1,2,3]\nconsole.log(copy);  // [1,2,3,4]"},
      {num:10,diff:"medium",title:"Rest dans params",desc:"Fonction qui prend n arguments et retourne leur somme.",
        sol:"const sum = (...nums) => nums.reduce((a, b) => a + b, 0);\nsum(1, 2, 3, 4);  // 10"},
      {num:11,diff:"hard",title:"Destructure profond",desc:"Extrais city depuis user.address.city.",
        sol:"const data = { user: { address: { city: 'Paris' } } };\nconst { user: { address: { city } } } = data;\nconsole.log(city);  // 'Paris'"},
      {num:12,diff:"hard",title:"Round 2 decimales",desc:"Arrondi 3.14159 a 2 decimales en string.",
        sol:"const pi = 3.14159;\nconst rounded = pi.toFixed(2);  // '3.14'\n// Si tu veux un number :\nconst num = +pi.toFixed(2);"},
      {num:13,diff:"hard",title:"Tagged template",desc:"Fonction tag <code>highlight</code> qui entoure les valeurs interpolees de **...**.",
        sol:"function highlight(strings, ...values) {\n  return strings.reduce((acc, s, i) => {\n    const v = values[i] !== undefined ? `**${values[i]}**` : '';\n    return acc + s + v;\n  }, '');\n}\nconsole.log(highlight`Hello ${name}!`); // Hello **Alice**!"}
    ]
  },

  {id:"day-2",code:"J2",title:"Jour 2 - Operateurs, conditions, boucles",sub:"==, ===, ??, ?:, if, switch, for, while",
    why:"Les egalites en JS sont piegeuses. Apprends === maintenant.",
    tags:["operators","equality","conditions","loops"],
    sections:[
      {h:"L'egalite : === et non ==",
        blocks:[
          {code:"// == fait de la coercition (conversion implicite)\n0 == '0'        // true   😱\n0 == ''         // true   😱\nnull == undefined // true \nfalse == '0'    // true   😱\n[] == false     // true   😱😱\n\n// === compare type ET valeur (STRICT)\n0 === '0'       // false  ✅\n0 === ''        // false  ✅\nnull === undefined // false ✅\nNaN === NaN     // false (toujours !)\n\n// Pour tester NaN :\nNumber.isNaN(NaN);     // true\nNumber.isNaN('abc');   // false (cf isNaN global qui converti)\nObject.is(NaN, NaN);   // true"},
          {warn:"Utilise TOUJOURS <code>===</code>. <code>==</code> a des regles que personne ne memorise."}
        ]
      },
      {h:"Operateurs logiques",
        blocks:[
          {code:"// && et || : court-circuit\nconst x = a && b;   // si a falsy, retourne a ; sinon b\nconst y = a || b;   // si a truthy, retourne a ; sinon b\n\n// Patterns courants\nconst name = user.name || 'Invite';   // defaut si falsy\nconst valid = user && user.email;     // safe access\n\n// Negation\n!truthy        // false\n!!truthy       // true (double neg pour caster en boolean)\n\n// Assignment logique (moderne)\nx ||= defaultValue;    // x = x || defaultValue\nx ??= defaultValue;    // x = x ?? defaultValue\nx &&= newValue;        // x = x && newValue"}
        ]
      },
      {h:"Nullish coalescing (??) et optional chaining (?.)",
        blocks:[
          {code:"// || : utilise droite si FALSY (0, '', false, null, undefined)\nconst port1 = 0 || 3000;    // 3000  (mais 0 etait valide!)\n\n// ?? : utilise droite SEULEMENT si null/undefined\nconst port2 = 0 ?? 3000;    // 0     ✅\nconst port3 = null ?? 3000; // 3000  ✅\n\n// Optional chaining ?.\nconst city = user?.address?.city;    // undefined si chemin coupe\nconst first = arr?.[0];               // safe array access\nconst result = fn?.(arg);             // safe call\n\n// Avec ??\nconst city2 = user?.address?.city ?? 'Inconnu';"},
          {tip:"<code>??</code> et <code>?.</code> sont les meilleures additions a JS depuis 5 ans. Apprends-les."}
        ]
      },
      {h:"Ternaire et if",
        blocks:[
          {code:"// Ternaire\nconst label = age >= 18 ? 'majeur' : 'mineur';\n\n// Ternaire chaine (a eviter au-dela de 2 niveaux)\nconst category = age < 18 ? 'mineur'\n               : age < 65 ? 'adulte'\n               : 'senior';\n\n// if classique\nif (age < 18) {\n  console.log('mineur');\n} else if (age < 65) {\n  console.log('adulte');\n} else {\n  console.log('senior');\n}\n\n// Pattern guard early return\nfunction process(user) {\n  if (!user) return null;\n  if (!user.email) return null;\n  // ... logique principale\n}"}
        ]
      },
      {h:"switch + match (proposal)",
        blocks:[
          {code:"// switch (compare avec ===)\nswitch (role) {\n  case 'admin':\n  case 'owner':         // fall-through volontaire\n    canEdit = true;\n    break;\n  case 'viewer':\n    canEdit = false;\n    break;\n  default:\n    canEdit = false;\n}\n\n// Pattern : object map (souvent mieux que switch)\nconst permissions = {\n  admin: true,\n  owner: true,\n  viewer: false\n};\nconst canEdit = permissions[role] ?? false;"}
        ]
      },
      {h:"Boucles : 6 facons d'iterer",
        blocks:[
          {code:"const arr = [1, 2, 3];\n\n// 1. for classique\nfor (let i = 0; i < arr.length; i++) { ... }\n\n// 2. for...of (valeurs)\nfor (const item of arr) { console.log(item); }\n\n// 3. for...in (cles d'OBJET — A EVITER pour arrays)\nfor (const key in obj) { console.log(key, obj[key]); }\n\n// 4. forEach (no break possible)\narr.forEach((item, i) => console.log(i, item));\n\n// 5. while\nwhile (condition) { ... }\n\n// 6. do...while (execute au moins 1 fois)\ndo { ... } while (condition);\n\n// Methods array fonctionnelles (le plus moderne)\narr.map(n => n * 2);          // transformer\narr.filter(n => n > 1);        // filtrer\narr.reduce((a, b) => a + b, 0);// reduire\narr.find(n => n === 2);        // premier match\narr.some(n => n > 2);          // au moins un\narr.every(n => n > 0);         // tous\n\n// break, continue\nfor (const n of arr) {\n  if (n === 2) continue;  // saute cet element\n  if (n === 5) break;     // sortie totale\n}"}
        ]
      }
    ],
    quiz:[
      {q:"<code>0 == false</code> :",opts:["true","false","Erreur","NaN"],correct:"a",
        expl:"== fait coercition : false -> 0, donc 0 == 0 = true."},
      {q:"Diff entre || et ?? :",opts:["Aucune","|| rejette falsy, ?? juste null/undef","Inverse","|| strict"],correct:"b",
        expl:"|| court-circuite tous les falsy (0, '', false). ?? juste null/undefined."},
      {q:"<code>NaN === NaN</code> :",opts:["true","false","Erreur","Indefini"],correct:"b",
        expl:"NaN n'est jamais egal a NaN. Utilise <code>Number.isNaN()</code>."},
      {q:"Pour iterer les VALEURS :",opts:["for...in","for...of","forEach","for"],correct:"b",
        expl:"for...of = valeurs. for...in = cles."},
      {q:"<code>x ??= 5</code> equivaut a :",opts:["<code>x = 5</code>","<code>x = x ?? 5</code>","<code>x = x || 5</code>","<code>x ?? 5</code>"],correct:"b",
        expl:"Assigne 5 seulement si x est null/undefined."}
    ],
    exercises:[
      {num:1,diff:"easy",title:"Pair ou impair",desc:"Arrow qui retourne 'pair' ou 'impair'.",
        sol:"const parite = n => n % 2 === 0 ? 'pair' : 'impair';"},
      {num:2,diff:"easy",title:"Default ??",desc:"Port = config.port s'il est valide (meme 0), sinon 3000.",
        sol:"const getPort = config => config.port ?? 3000;"},
      {num:3,diff:"easy",title:"Optional chaining",desc:"city = user.address.city sans crasher si null.",
        sol:"const city = user?.address?.city ?? 'inconnu';"},
      {num:4,diff:"easy",title:"Negation double",desc:"Caste valeur en boolean strict via !!.",
        sol:"const isValid = !!value;"},
      {num:5,diff:"medium",title:"Categorie age",desc:"Mineur (<18), Adulte (<65), Senior. Avec ternaire.",
        sol:"const cat = age < 18 ? 'mineur'\n          : age < 65 ? 'adulte'\n          : 'senior';"},
      {num:6,diff:"medium",title:"Filter + map",desc:"De [1,2,3,4,5,6], retourne les pairs doubles : [4,8,12].",
        sol:"const result = [1,2,3,4,5,6]\n  .filter(n => n % 2 === 0)\n  .map(n => n * 2);"},
      {num:7,diff:"medium",title:"Reduce somme",desc:"Somme d'un array avec reduce.",
        sol:"const sum = arr.reduce((acc, n) => acc + n, 0);"},
      {num:8,diff:"medium",title:"Reduce max",desc:"Max d'un array avec reduce.",
        sol:"const max = arr.reduce((m, n) => n > m ? n : m, -Infinity);"},
      {num:9,diff:"medium",title:"Find user",desc:"Premier user dont age > 30.",
        sol:"const adult = users.find(u => u.age > 30);"},
      {num:10,diff:"medium",title:"Some + every",desc:"True si TOUS les nombres sont positifs.",
        sol:"const allPositive = arr.every(n => n > 0);"},
      {num:11,diff:"hard",title:"FizzBuzz",desc:"1-30 : Fizz si %3, Buzz si %5, FizzBuzz les 2.",
        sol:"for (let i = 1; i <= 30; i++) {\n  if (i % 15 === 0) console.log('FizzBuzz');\n  else if (i % 3 === 0) console.log('Fizz');\n  else if (i % 5 === 0) console.log('Buzz');\n  else console.log(i);\n}"},
      {num:12,diff:"hard",title:"Group by reduce",desc:"Groupe array d'objets par champ 'role'.",
        sol:"const byRole = users.reduce((acc, u) => {\n  (acc[u.role] = acc[u.role] || []).push(u);\n  return acc;\n}, {});"},
      {num:13,diff:"hard",title:"Compter occurrences",desc:"Compte chaque caractere dans 'hello'.",
        sol:"const count = 'hello'.split('').reduce((acc, c) => {\n  acc[c] = (acc[c] || 0) + 1;\n  return acc;\n}, {});\n// { h: 1, e: 1, l: 2, o: 1 }"},
      {num:14,diff:"hard",title:"Permission map",desc:"Sans switch, retourne true si role est admin ou owner.",
        sol:"const perms = { admin: true, owner: true, viewer: false };\nconst canEdit = perms[role] ?? false;"}
    ]
  },

  {id:"day-3",code:"J3",title:"Jour 3 - Fonctions & closures",sub:"declarations, arrow, this, scope, closures",
    why:"Les fonctions sont les briques de JS. Closures = piege n1 en entretien.",
    tags:["functions","closures","arrow","scope","this"],
    sections:[
      {h:"3 facons de declarer",
        blocks:[
          {code:"// 1. Function declaration (hoisted)\nfunction add(a, b) {\n  return a + b;\n}\n\n// 2. Function expression\nconst sub = function(a, b) {\n  return a - b;\n};\n\n// 3. Arrow function (le plus moderne)\nconst mul = (a, b) => a * b;\nconst greet = name => `Bonjour ${name}`;\nconst noop = () => {};\nconst returnObj = () => ({ a: 1 });  // () autour de l'objet pour ne pas confondre avec un bloc"},
          {table:[
            ["","function declaration","function expression","arrow"],
            ["Hoisted","oui","non","non"],
            ["<code>this</code>","propre","propre","herite"],
            ["<code>arguments</code>","oui","oui","non (utilise ...rest)"],
            ["Peut etre methode","oui","oui","mauvaise idee"],
            ["Peut etre constructeur","oui","oui","non"]
          ]}
        ]
      },
      {h:"Arrow vs function : <code>this</code>",
        blocks:[
          {p:"Arrow function n'a PAS son propre <code>this</code> — elle herite du parent. Crucial pour les callbacks."},
          {code:"class Timer {\n  constructor() {\n    this.count = 0;\n\n    // ❌ function classique : this devient undefined dans setInterval\n    // setInterval(function() { this.count++; }, 1000);\n\n    // ✅ arrow : this reste lie a l'instance Timer\n    setInterval(() => { this.count++; }, 1000);\n  }\n}\n\n// Methode classique vs arrow\nconst obj = {\n  name: 'Alice',\n  greet: function() { return this.name; },  // ✅ this = obj\n  greetArrow: () => this.name               // ❌ this = parent\n};"}
        ]
      },
      {h:"Default params + rest",
        blocks:[
          {code:"// Default parameters\nfunction greet(name = 'invite', greeting = 'Bonjour') {\n  return `${greeting} ${name}`;\n}\n\n// Rest operator : capture les args restants\nfunction sum(...nums) {\n  return nums.reduce((a, b) => a + b, 0);\n}\nsum(1, 2, 3, 4); // 10\n\n// Combinaison\nfunction log(level, ...messages) {\n  console.log(`[${level}]`, ...messages);\n}\n\n// Destructuring de l'objet en argument (pattern populaire)\nfunction createUser({ name, age = 18, role = 'viewer' } = {}) {\n  return { name, age, role };\n}\ncreateUser({ name: 'Alice' });\ncreateUser();  // { name: undefined, age: 18, role: 'viewer' }"}
        ]
      },
      {h:"Closures",
        blocks:[
          {p:"Une closure = fonction qui CAPTURE des variables de son scope parent. La variable reste accessible meme apres que le parent ait fini."},
          {code:"function makeCounter() {\n  let count = 0;   // capture par la closure\n  return {\n    inc: () => ++count,\n    dec: () => --count,\n    get: () => count\n  };\n}\n\nconst counter = makeCounter();\ncounter.inc(); // 1\ncounter.inc(); // 2\ncounter.get(); // 2\n// count est INACCESSIBLE depuis l'exterieur — c'est prive\n\n// Pattern factory avec closure\nfunction makeMultiplier(factor) {\n  return (n) => n * factor;\n}\nconst double = makeMultiplier(2);\nconst triple = makeMultiplier(3);\ndouble(5);  // 10\ntriple(5);  // 15"},
          {tip:"Closures = facon de creer du \"prive\" en JS (avant les classes avec #private)."}
        ]
      },
      {h:"Higher-order functions",
        blocks:[
          {code:"// Une fonction qui prend une fonction\nfunction repeat(n, fn) {\n  for (let i = 0; i < n; i++) fn(i);\n}\nrepeat(3, i => console.log(i));\n\n// Une fonction qui retourne une fonction\nfunction debounce(fn, delay) {\n  let timer;\n  return function(...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}\n\nconst search = debounce((q) => fetch('/api?q=' + q), 300);\nsearch('php');  // ne fire qu'apres 300ms d'inactivite\n\n// Compose\nconst compose = (...fns) => x => fns.reduceRight((acc, f) => f(acc), x);\nconst addOneThenDouble = compose(n => n * 2, n => n + 1);\naddOneThenDouble(5);  // 12"}
        ]
      },
      {h:"IIFE (Immediately Invoked Function Expression)",
        blocks:[
          {code:"// Execute immediatement\n(function() {\n  // code isole\n})();\n\n// Avec parametres\n(function(name) {\n  console.log(`Hello ${name}`);\n})('Alice');\n\n// Variante arrow\n(() => {\n  console.log('hi');\n})();\n\n// Usage moderne : surtout dans modules pour init"},
          {note:"Avant ES6, IIFE = scope isole (pas de pollution globale). Aujourd'hui, les <code>modules</code> font ca nativement."}
        ]
      }
    ],
    quiz:[
      {q:"Arrow a-t-elle son propre <code>this</code> ?",opts:["Oui","Non, herite","Selon le cas","Cela depend"],correct:"b",
        expl:"Arrow = pas de this propre. Difference cle avec function."},
      {q:"<code>...args</code> en parametre :",opts:["Spread","Rest","Optional","Decorateur"],correct:"b",
        expl:"Signature = REST (collecte). Appel = SPREAD (etale)."},
      {q:"Que retourne <code>(() => ({ a: 1 }))()</code> ?",opts:["<code>undefined</code>","<code>{ a: 1 }</code>","Erreur","<code>1</code>"],correct:"b",
        expl:"() autour de l'objet pour ne pas confondre avec un bloc."},
      {q:"Closure permet de :",opts:["Plus rapide","Capturer scope parent","Etre async","Polymorphisme"],correct:"b",
        expl:"La fonction capture les vars du scope parent et les retient."},
      {q:"Pour debouncer (retarder) un appel :",opts:["setTimeout","setInterval","Closure + clearTimeout","throttle"],correct:"c",
        expl:"Pattern : closure garde un timer, on clearTimeout a chaque appel."}
    ],
    exercises:[
      {num:1,diff:"easy",title:"Arrow simple",desc:"Arrow qui double un nombre.",
        sol:"const double = n => n * 2;"},
      {num:2,diff:"easy",title:"Arrow 2 args",desc:"Arrow qui additionne 2 nombres.",
        sol:"const add = (a, b) => a + b;"},
      {num:3,diff:"easy",title:"Sans param",desc:"Arrow sans argument qui retourne 'Hello'.",
        sol:"const hi = () => 'Hello';"},
      {num:4,diff:"easy",title:"Return objet",desc:"Arrow qui retourne { a: 1 }.",
        sol:"const f = () => ({ a: 1 });"},
      {num:5,diff:"medium",title:"Default param",desc:"Greeter avec 'visiteur' par defaut.",
        sol:"const greet = (name = 'visiteur') => `Bonjour ${name}`;"},
      {num:6,diff:"medium",title:"Rest args",desc:"Fonction max(...nums).",
        sol:"const max = (...nums) => Math.max(...nums);"},
      {num:7,diff:"medium",title:"Destructure params",desc:"Fonction createUser({name, age=18, role='user'}).",
        sol:"const createUser = ({ name, age = 18, role = 'user' } = {}) => ({ name, age, role });"},
      {num:8,diff:"medium",title:"Closure counter",desc:"Compteur qui s'incremente a chaque appel.",
        sol:"function makeCounter() {\n  let count = 0;\n  return () => ++count;\n}\n\nconst c = makeCounter();\nc(); // 1\nc(); // 2"},
      {num:9,diff:"medium",title:"Multiplier factory",desc:"makeMultiplier(2) retourne une fonction qui double.",
        sol:"const makeMultiplier = (factor) => (n) => n * factor;\nconst double = makeMultiplier(2);\ndouble(5);  // 10"},
      {num:10,diff:"hard",title:"Memoize",desc:"Cache le resultat d'une fonction par argument.",
        sol:"function memoize(fn) {\n  const cache = new Map();\n  return (arg) => {\n    if (cache.has(arg)) return cache.get(arg);\n    const result = fn(arg);\n    cache.set(arg, result);\n    return result;\n  };\n}"},
      {num:11,diff:"hard",title:"Debounce",desc:"Debounce une fonction (retarde l'execution).",
        sol:"function debounce(fn, delay) {\n  let timer;\n  return function(...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}"},
      {num:12,diff:"hard",title:"Throttle",desc:"Throttle une fonction (max 1x par delay).",
        sol:"function throttle(fn, delay) {\n  let lastCall = 0;\n  return function(...args) {\n    const now = Date.now();\n    if (now - lastCall >= delay) {\n      lastCall = now;\n      fn(...args);\n    }\n  };\n}"},
      {num:13,diff:"hard",title:"Compose",desc:"compose(f, g, h)(x) = f(g(h(x))).",
        sol:"const compose = (...fns) => x => fns.reduceRight((acc, f) => f(acc), x);\nconst add1 = x => x + 1;\nconst double = x => x * 2;\nconst fn = compose(add1, double);\nfn(5);  // (5*2)+1 = 11"}
    ]
  },

  {id:"day-4",code:"J4",title:"Jour 4 - Arrays & objects",sub:"Methods, immutabilite, JSON",
    why:"95% du code JS manipule arrays et objets. Maitrise leurs methodes.",
    tags:["arrays","objects","immutability","json"],
    sections:[
      {h:"Methodes essentielles d'array",
        blocks:[
          {table:[
            ["Methode","Retourne","Mute ?"],
            ["<code>map(fn)</code>","Nouveau array","Non"],
            ["<code>filter(fn)</code>","Nouveau array","Non"],
            ["<code>reduce(fn, init)</code>","Valeur","Non"],
            ["<code>find(fn)</code>","Premier match","Non"],
            ["<code>findIndex(fn)</code>","Index","Non"],
            ["<code>some(fn)</code>","Boolean","Non"],
            ["<code>every(fn)</code>","Boolean","Non"],
            ["<code>includes(val)</code>","Boolean","Non"],
            ["<code>indexOf(val)</code>","Index ou -1","Non"],
            ["<code>flat()</code>","Aplatit","Non"],
            ["<code>flatMap(fn)</code>","Map + flat","Non"],
            ["<code>concat(arr)</code>","Nouveau","Non"],
            ["<code>slice(s, e)</code>","Sous-array","Non"],
            ["<code>sort(fn)</code>","Le tableau","<strong>OUI</strong>"],
            ["<code>reverse()</code>","Le tableau","<strong>OUI</strong>"],
            ["<code>push/pop</code>","Element","<strong>OUI</strong>"],
            ["<code>shift/unshift</code>","Element","<strong>OUI</strong>"],
            ["<code>splice(s, n)</code>","Supprimes","<strong>OUI</strong>"]
          ]},
          {tip:"Prefere les methodes IMMUABLES (map, filter, reduce). Les mutables cassent souvent du code partage."}
        ]
      },
      {h:"Sort tricky",
        blocks:[
          {code:"// ❌ Sans fonction : compare en string\n[10, 2, 1, 30].sort(); // [1, 10, 2, 30] 😱\n\n// ✅ Avec comparateur\n[10, 2, 1, 30].sort((a, b) => a - b); // [1, 2, 10, 30]\n\n// Tri d'objets\nusers.sort((a, b) => a.age - b.age);\nusers.sort((a, b) => a.name.localeCompare(b.name));\n\n// Tri multi-critere\nusers.sort((a, b) => {\n  if (a.role !== b.role) return a.role.localeCompare(b.role);\n  return a.age - b.age;\n});\n\n// Copie immuable (sort mute !)\nconst sorted = [...arr].sort((a,b) => a - b);\n\n// toSorted (ES2023) : copie + tri en une fois\nconst sorted2 = arr.toSorted((a, b) => a - b);"}
        ]
      },
      {h:"Methodes immuables modernes (ES2023)",
        blocks:[
          {code:"// Anciennes (mutent)\narr.sort()\narr.reverse()\narr.splice(0, 1)\n\n// Nouvelles (copies)\narr.toSorted()\narr.toReversed()\narr.toSpliced(0, 1)\narr.with(0, 'new value')  // remplace index 0\n\n// Avant on faisait :\nconst sorted = [...arr].sort();\n// Maintenant :\nconst sorted = arr.toSorted();"}
        ]
      },
      {h:"Objects: keys, values, entries",
        blocks:[
          {code:"const user = { name: 'Alice', age: 28 };\n\nObject.keys(user);     // ['name', 'age']\nObject.values(user);   // ['Alice', 28]\nObject.entries(user);  // [['name', 'Alice'], ['age', 28]]\n\n// Iterer\nfor (const [key, value] of Object.entries(user)) {\n  console.log(key, value);\n}\n\n// Object from entries (reverse)\nconst obj = Object.fromEntries([['a', 1], ['b', 2]]);\n// { a: 1, b: 2 }\n\n// Filtrer un objet via entries + filter + fromEntries\nconst onlyStrings = Object.fromEntries(\n  Object.entries(obj).filter(([k, v]) => typeof v === 'string')\n);\n\n// Clone shallow\nconst copy = { ...user };\nconst copy2 = Object.assign({}, user);\n\n// Clone deep (moderne)\nconst deep = structuredClone(user);"}
        ]
      },
      {h:"Computed property + shorthand",
        blocks:[
          {code:"const key = 'name';\nconst value = 'Alice';\n\n// Cle dynamique\nconst obj = { [key]: value };  // { name: 'Alice' }\n\n// Shorthand\nconst name = 'Alice';\nconst age = 28;\nconst user = { name, age };    // { name: 'Alice', age: 28 }\n\n// Methode shorthand\nconst api = {\n  get(url) { ... },          // au lieu de get: function(url) {...}\n  async post(url, body) { ... }\n};"}
        ]
      },
      {h:"JSON",
        blocks:[
          {code:"// Object -> string\nconst json = JSON.stringify(user);\nconst pretty = JSON.stringify(user, null, 2);  // indented\n\n// Avec replacer (filter keys)\nJSON.stringify(user, ['name', 'age']);\n\n// Avec fonction replacer\nJSON.stringify(user, (key, value) => {\n  if (key === 'password') return undefined;\n  return value;\n});\n\n// String -> object\nconst obj = JSON.parse(json);\n\n// Avec reviver (transform au parse)\nJSON.parse(json, (key, value) => {\n  if (key === 'date') return new Date(value);\n  return value;\n});\n\n// Pieges\nJSON.stringify(undefined);     // undefined (pas une string !)\nJSON.stringify(new Date());    // '\"2026-05-25T...\"' (string)\nJSON.stringify({a: undefined}); // '{}' (cle skippee)\nJSON.stringify({a: function(){}}); // '{}' (fonction skippee)"}
        ]
      }
    ],
    quiz:[
      {q:"<code>[10, 2, 1].sort()</code> :",opts:["[1,2,10]","[10,2,1]","[1,10,2]","[2,10,1]"],correct:"c",
        expl:"Sans comparateur, sort en STRING : '10' &lt; '2'."},
      {q:"<code>map</code> mute ?",opts:["Oui","Non, retourne nouveau","Selon","Que sur primitives"],correct:"b",
        expl:"map est IMMUABLE."},
      {q:"Pour [cle, valeur] d'un objet :",opts:["Object.keys","Object.values","Object.entries","Object.pairs"],correct:"c",
        expl:"<code>Object.entries(obj)</code>."},
      {q:"Pour deep clone :",opts:["...obj","Object.assign","structuredClone","JSON.*"],correct:"c",
        expl:"<code>structuredClone</code> moderne. JSON perd fonctions/dates."},
      {q:"<code>arr.toSorted()</code> :",opts:["Mute arr","Erreur","Retourne copie triee","Comme sort"],correct:"c",
        expl:"toSorted (ES2023) = sort sans muter l'original."}
    ],
    exercises:[
      {num:1,diff:"easy",title:"Double les nombres",desc:"Map sur [1,2,3] -> [2,4,6].",
        sol:"const doubled = [1,2,3].map(n => n * 2);"},
      {num:2,diff:"easy",title:"Filtrer pairs",desc:"Garde les nombres pairs.",
        sol:"const evens = [1,2,3,4,5,6].filter(n => n % 2 === 0);"},
      {num:3,diff:"easy",title:"Includes",desc:"True si 5 est dans [1,5,9].",
        sol:"[1, 5, 9].includes(5);  // true"},
      {num:4,diff:"easy",title:"Flat",desc:"Aplatit [[1,2],[3,4],[5]].",
        sol:"[[1,2],[3,4],[5]].flat();  // [1,2,3,4,5]"},
      {num:5,diff:"medium",title:"Tri numerique",desc:"Trie [3,30,2,10] croissant.",
        sol:"[3, 30, 2, 10].sort((a, b) => a - b);"},
      {num:6,diff:"medium",title:"Tri objets",desc:"Trie users par age.",
        sol:"users.sort((a, b) => a.age - b.age);"},
      {num:7,diff:"medium",title:"Object iter",desc:"Affiche chaque cle/valeur d'un objet.",
        sol:"for (const [k, v] of Object.entries(obj)) {\n  console.log(`${k}: ${v}`);\n}"},
      {num:8,diff:"medium",title:"Filter objet",desc:"Garde uniquement les paires dont la valeur est number.",
        sol:"const onlyNums = Object.fromEntries(\n  Object.entries(obj).filter(([k, v]) => typeof v === 'number')\n);"},
      {num:9,diff:"medium",title:"Sum reduce",desc:"Somme d'un array d'objets sur .price.",
        sol:"const total = items.reduce((acc, item) => acc + item.price, 0);"},
      {num:10,diff:"medium",title:"JSON pretty",desc:"Stringify un user avec indentation 2 espaces.",
        sol:"const json = JSON.stringify(user, null, 2);"},
      {num:11,diff:"hard",title:"Comptage chars",desc:"Compte chaque caractere dans 'hello'.",
        sol:"const count = 'hello'.split('').reduce((acc, c) => {\n  acc[c] = (acc[c] || 0) + 1;\n  return acc;\n}, {});"},
      {num:12,diff:"hard",title:"Dedupe par cle",desc:"Dedupe users par .email (garder le 1er).",
        sol:"const seen = new Set();\nconst unique = users.filter(u => {\n  if (seen.has(u.email)) return false;\n  seen.add(u.email);\n  return true;\n});"},
      {num:13,diff:"hard",title:"Group + sum",desc:"Pour un panier, somme par categorie.",
        sol:"const byCat = items.reduce((acc, item) => {\n  acc[item.category] = (acc[item.category] || 0) + item.price;\n  return acc;\n}, {});"},
      {num:14,diff:"hard",title:"Deep clone safe",desc:"Clone profond un objet contenant date, array, sous-objet.",
        sol:"const clone = structuredClone(obj);"}
    ]
  },

  {id:"day-5",code:"J5",title:"Jour 5 - DOM & events",sub:"querySelector, addEventListener, manipulation, delegation",
    why:"C'est ce qui rend une page interactive. Indispensable.",
    tags:["DOM","events","interactivity"],
    sections:[
      {h:"Selectionner",
        blocks:[
          {code:"// Un seul element\nconst el = document.getElementById('main');\nconst btn = document.querySelector('.btn');\nconst submit = document.querySelector('button[type=\"submit\"]');\n\n// Plusieurs (NodeList — iterable)\nconst links = document.querySelectorAll('a.nav-link');\nlinks.forEach(a => a.classList.add('active'));\n\n// Remonter vers un parent\nconst card = btn.closest('.card');\n\n// Naviguer dans le DOM\nel.children;            // HTMLCollection des enfants directs\nel.firstElementChild;\nel.lastElementChild;\nel.nextElementSibling;\nel.parentElement;"},
          {tip:"<code>querySelector</code> = n'importe quel selecteur CSS. Standard universel."}
        ]
      },
      {h:"Modifier le contenu",
        blocks:[
          {code:"// Texte (safe)\nel.textContent = 'Nouveau texte';\n\n// HTML brut (RISQUE XSS)\nel.innerHTML = '<b>HTML brut</b>';\n\n// Texte rendu visible (respecte CSS)\nel.innerText = 'Texte';\n\n// Attributs\nel.setAttribute('data-id', '42');\nel.getAttribute('data-id');\nel.removeAttribute('data-id');\nel.dataset.id = '42';            // shortcut data-*\nel.hasAttribute('disabled');\n\n// Properties (boolean directs)\nel.hidden = true;\nel.disabled = true;\nel.checked = true;\n\n// Class manipulation\nel.classList.add('actif');\nel.classList.remove('inactif');\nel.classList.toggle('open');\nel.classList.toggle('open', condition);  // force\nel.classList.contains('actif');\nel.classList.replace('old', 'new');\n\n// Style (inline)\nel.style.color = 'red';\nel.style.cssText = 'color:red; font-size:20px';\nel.style.setProperty('--accent', '#6366f1');  // CSS variable"},
          {warn:"<code>innerHTML</code> avec du contenu utilisateur = faille XSS. Utilise <code>textContent</code> ou sanitize avec DOMPurify."}
        ]
      },
      {h:"Creer / inserer / supprimer",
        blocks:[
          {code:"// Creer\nconst div = document.createElement('div');\ndiv.className = 'card';\ndiv.textContent = 'Hello';\n\n// Inserer\nparent.appendChild(div);                       // a la fin\nparent.prepend(div);                            // au debut (moderne)\nparent.append(div, span);                       // plusieurs a la fin (moderne)\nparent.insertBefore(div, parent.firstChild);\nel.before(newEl);                               // juste avant el (moderne)\nel.after(newEl);                                // juste apres el (moderne)\nel.replaceWith(newEl);\n\n// Insertion HTML rapide\nparent.insertAdjacentHTML('beforeend', '<p>...</p>');\n// Positions : beforebegin | afterbegin | beforeend | afterend\n\n// Supprimer\ndiv.remove();                                   // moderne\nparent.removeChild(div);                        // ancien\n\n// Vider un container\nparent.replaceChildren();                       // moderne et rapide"}
        ]
      },
      {h:"Events",
        blocks:[
          {code:"btn.addEventListener('click', (e) => {\n  e.preventDefault();   // empeche le comportement par defaut\n  e.stopPropagation();  // empeche la remontee\n  console.log(e.target);       // element clique reellement\n  console.log(e.currentTarget); // element sur lequel le listener est attache\n});\n\n// Once : auto-remove apres 1er trigger\nbtn.addEventListener('click', handler, { once: true });\n\n// Passive (perf scroll)\nwindow.addEventListener('scroll', handler, { passive: true });\n\n// Capture phase (rare)\nel.addEventListener('click', handler, { capture: true });\n\n// AbortController : remove plusieurs listeners en 1 fois\nconst ctrl = new AbortController();\nbtn.addEventListener('click', h1, { signal: ctrl.signal });\nbtn.addEventListener('mouseover', h2, { signal: ctrl.signal });\nctrl.abort();  // remove TOUS les listeners avec ce signal"},
          {tip:"<code>once: true</code> et <code>passive: true</code> sont sous-utilises. Eviter de re-binder, gagner en perf scroll."}
        ]
      },
      {h:"Event delegation",
        blocks:[
          {code:"// Au lieu de N listeners sur N enfants...\n// ❌ Inefficient\nlist.querySelectorAll('.item').forEach(item => {\n  item.addEventListener('click', handle);\n});\n\n// ✅ Un seul listener sur le parent (delegation)\nlist.addEventListener('click', (e) => {\n  const item = e.target.closest('.item');\n  if (!item) return;\n  // logique commune ici, qui aussi pour les .item ajoutes plus tard\n});\n\n// Avec data-action pattern\nlist.addEventListener('click', (e) => {\n  const action = e.target.dataset.action;\n  if (action === 'delete') ...\n  if (action === 'edit') ...\n});"},
          {tip:"Delegation = meilleur pour la perf ET pour les elements ajoutes dynamiquement (pas besoin de re-binder)."}
        ]
      },
      {h:"Forms et FormData",
        blocks:[
          {code:"const form = document.querySelector('form');\n\nform.addEventListener('submit', (e) => {\n  e.preventDefault();\n\n  // FormData = recupere tous les champs\n  const data = new FormData(form);\n\n  // Iterer\n  for (const [key, value] of data) {\n    console.log(key, value);\n  }\n\n  // Convertir en objet\n  const obj = Object.fromEntries(data);\n\n  // Envoyer en JSON\n  fetch('/api', {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify(obj)\n  });\n\n  // Ou tel quel (multipart, support upload)\n  fetch('/api', { method: 'POST', body: data });\n});\n\n// Validation\nform.checkValidity();\nformInput.setCustomValidity('Email deja pris');\nformInput.reportValidity();"}
        ]
      }
    ],
    quiz:[
      {q:"Plus sur : innerHTML ou textContent ?",opts:["innerHTML","textContent","Egal","Aucun"],correct:"b",
        expl:"textContent ne parse pas HTML, pas de XSS."},
      {q:"<code>e.preventDefault()</code> :",opts:["Stop remontee","Empeche defaut","Supprime","Bloque scroll"],correct:"b",
        expl:"preventDefault empeche le comportement par defaut. stopPropagation arrete la remontee."},
      {q:"Pour element ajoute dynamiquement :",opts:["Delegation","Re-binder","Impossible","MutationObserver"],correct:"a",
        expl:"Listener sur parent stable + check e.target."},
      {q:"FormData :",opts:["Lit/serialise un form","Cree un form","Valide","Stocke"],correct:"a",
        expl:"<code>new FormData(form)</code> = collecte tous les name/value."},
      {q:"<code>{ once: true }</code> :",opts:["Erreur","Listener supprime apres 1er trigger","Capture","Passive"],correct:"b",
        expl:"Listener auto-removed apres 1er event."}
    ],
    exercises:[
      {num:1,diff:"easy",title:"Hide and show",desc:"Bouton qui cache/montre un element au clic.",
        sol:"document.querySelector('#toggle').addEventListener('click', () => {\n  const box = document.querySelector('#box');\n  box.hidden = !box.hidden;\n});"},
      {num:2,diff:"easy",title:"Class toggle",desc:"Toggle 'active' sur body au clic.",
        sol:"document.querySelector('button').addEventListener('click', () => {\n  document.body.classList.toggle('active');\n});"},
      {num:3,diff:"easy",title:"Set text",desc:"Au clic, change textContent d'un h1 a 'Bonjour'.",
        sol:"document.querySelector('button').addEventListener('click', () => {\n  document.querySelector('h1').textContent = 'Bonjour';\n});"},
      {num:4,diff:"easy",title:"CSS variable",desc:"Met la variable --accent a 'red' au clic.",
        sol:"document.querySelector('button').addEventListener('click', () => {\n  document.documentElement.style.setProperty('--accent', 'red');\n});"},
      {num:5,diff:"medium",title:"Create + append",desc:"Cree un <li> 'Hello' et l'ajoute a une <ul>.",
        sol:"const li = document.createElement('li');\nli.textContent = 'Hello';\ndocument.querySelector('ul').appendChild(li);"},
      {num:6,diff:"medium",title:"Replace children",desc:"Vide une <ul> et la remplit avec ['a','b','c'].",
        sol:"const ul = document.querySelector('ul');\nul.replaceChildren();\n['a', 'b', 'c'].forEach(text => {\n  const li = document.createElement('li');\n  li.textContent = text;\n  ul.appendChild(li);\n});"},
      {num:7,diff:"medium",title:"Form sans submit",desc:"Empeche le submit et affiche les valeurs.",
        sol:"document.querySelector('form').addEventListener('submit', (e) => {\n  e.preventDefault();\n  const data = Object.fromEntries(new FormData(e.target));\n  console.log(data);\n});"},
      {num:8,diff:"medium",title:"Closest parent",desc:"Au clic sur n'importe quoi dans une .card, recupere la .card parente.",
        sol:"document.addEventListener('click', (e) => {\n  const card = e.target.closest('.card');\n  if (card) console.log('Card:', card);\n});"},
      {num:9,diff:"hard",title:"Delegation",desc:"Listener sur <ul> qui detecte clic sur n'importe quel <li>.",
        sol:"document.querySelector('ul').addEventListener('click', (e) => {\n  if (e.target.tagName === 'LI') {\n    console.log('clic sur', e.target.textContent);\n  }\n});"},
      {num:10,diff:"hard",title:"Data action",desc:"Pattern : sur clic, lire data-action sur l'element clique et dispatch.",
        sol:"document.addEventListener('click', (e) => {\n  const action = e.target.dataset.action;\n  if (!action) return;\n  if (action === 'delete') deleteItem(e.target.dataset.id);\n  if (action === 'edit') editItem(e.target.dataset.id);\n});"},
      {num:11,diff:"hard",title:"AbortController cleanup",desc:"3 listeners qui partagent un AbortController.",
        sol:"const ctrl = new AbortController();\nconst sig = { signal: ctrl.signal };\n\nbtn1.addEventListener('click', h1, sig);\nbtn2.addEventListener('click', h2, sig);\nwindow.addEventListener('scroll', h3, sig);\n\n// Cleanup en 1 fois :\nctrl.abort();"},
      {num:12,diff:"hard",title:"Validation form custom",desc:"Bloque le submit si email contient 'spam'.",
        sol:"const email = document.querySelector('#email');\nemail.addEventListener('input', () => {\n  if (email.value.includes('spam')) {\n    email.setCustomValidity('Email invalide');\n  } else {\n    email.setCustomValidity('');\n  }\n});"}
    ]
  },

  {id:"day-6",code:"J6",title:"Jour 6 - Async, Promises, fetch",sub:"async/await, fetch, errors, AbortController",
    why:"Toute appli web parle au serveur. Sans async, ca freeze l'UI.",
    tags:["async","promises","fetch","await"],
    sections:[
      {h:"Le concept : sync vs async",
        blocks:[
          {p:"JS est <strong>single-threaded</strong> : une seule chose a la fois. Tout ce qui prend du temps (reseau, fichier, timer) DOIT etre asynchrone, sinon ca bloque l'UI."},
          {code:"// ❌ Mauvais : si loadUser() prenait 2s en sync, la page freeze 2s\nconst user = loadUser(42);  // freeze\nrender(user);\n\n// ✅ Bon : async, le navigateur continue\nloadUser(42).then(user => render(user));\n\n// Encore mieux : async/await\nconst user = await loadUser(42);\nrender(user);"}
        ]
      },
      {h:"Promises",
        blocks:[
          {code:"// Une Promise = une valeur future\nconst p = new Promise((resolve, reject) => {\n  setTimeout(() => resolve('done'), 1000);\n});\n\np.then(value => console.log(value))\n .catch(err => console.error(err))\n .finally(() => console.log('cleanup'));\n\n// Une promise a 3 etats : pending, fulfilled, rejected\n\n// Promise.all : attend toutes — rejette des qu'une echoue\nconst [a, b, c] = await Promise.all([fetchA(), fetchB(), fetchC()]);\n\n// Promise.race : la premiere finie gagne\nconst first = await Promise.race([slow, fast]);\n\n// Promise.allSettled : attend toutes, succes ou echec, retourne le statut\nconst results = await Promise.allSettled([...]);\n// results = [{ status: 'fulfilled', value: ... }, { status: 'rejected', reason: ... }]\n\n// Promise.any : premier fulfilled gagne (ignore rejets)\nconst first = await Promise.any([...]);"}
        ]
      },
      {h:"async / await",
        blocks:[
          {code:"// async function = retourne TOUJOURS une Promise\nasync function loadUser(id) {\n  try {\n    const res = await fetch(`/api/users/${id}`);\n    if (!res.ok) throw new Error('HTTP ' + res.status);\n    const data = await res.json();\n    return data;\n  } catch (err) {\n    console.error('Echec :', err);\n    return null;\n  }\n}\n\n// Utilisation\nconst user = await loadUser(42);\n\n// Top-level await (modules ES2022+)\n// dans un module .mjs ou type=\"module\" :\nconst data = await fetch('/api').then(r => r.json());"},
          {warn:"<code>await</code> ne fonctionne QUE dans une fonction <code>async</code> (ou au top-level d'un module). Sinon : SyntaxError."}
        ]
      },
      {h:"fetch en pratique",
        blocks:[
          {code:"// GET\nconst res = await fetch('/api/users');\nif (!res.ok) throw new Error('HTTP ' + res.status);\nconst users = await res.json();\n\n// POST JSON\nconst res = await fetch('/api/users', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({ name: 'Alice' })\n});\n\n// Avec FormData (upload, multipart) — pas de Content-Type a mettre\nconst form = new FormData();\nform.append('photo', fileInput.files[0]);\nform.append('name', 'Alice');\nawait fetch('/upload', { method: 'POST', body: form });\n\n// Avec credentials (cookies)\nfetch('/api', { credentials: 'include' });\n\n// AbortController (annuler une requete)\nconst ctrl = new AbortController();\nfetch('/long', { signal: ctrl.signal });\nsetTimeout(() => ctrl.abort(), 5000);\n\n// Timeout via signal (ES2022)\nfetch('/api', { signal: AbortSignal.timeout(5000) });\n\n// Streaming reponse\nconst res = await fetch('/big');\nconst reader = res.body.getReader();\nwhile (true) {\n  const { value, done } = await reader.read();\n  if (done) break;\n  // value = Uint8Array chunk\n}"},
          {warn:"<code>fetch</code> ne rejette QUE pour erreur reseau, PAS pour 4xx/5xx. Toujours verifier <code>res.ok</code>."}
        ]
      },
      {h:"Patterns frequents",
        blocks:[
          {code:"// Retry avec backoff exponentiel\nasync function fetchRetry(url, retries = 3) {\n  for (let i = 0; i < retries; i++) {\n    try {\n      const res = await fetch(url);\n      if (res.ok) return res;\n    } catch (e) {}\n    await new Promise(r => setTimeout(r, 2 ** i * 1000));\n  }\n  throw new Error('All retries failed');\n}\n\n// Parallel fetch d'une liste\nconst users = await Promise.all(\n  ids.map(id => fetch(`/api/users/${id}`).then(r => r.json()))\n);\n\n// Sequentiel quand l'ordre compte\nfor (const id of ids) {\n  const user = await loadUser(id);\n  process(user);\n}\n\n// Debounce d'un search\nlet timer;\ninput.addEventListener('input', (e) => {\n  clearTimeout(timer);\n  timer = setTimeout(() => {\n    fetch(`/search?q=${e.target.value}`);\n  }, 300);\n});"}
        ]
      }
    ],
    quiz:[
      {q:"<code>await</code> fonctionne :",opts:["Partout","Dans async","Apres setTimeout","Dans if"],correct:"b",
        expl:"async required (ou top-level module)."},
      {q:"<code>fetch</code> rejette :",opts:["404","500","Erreur reseau","Toutes erreurs"],correct:"c",
        expl:"4xx/5xx : <code>res.ok === false</code>."},
      {q:"<code>Promise.all</code> :",opts:["Attend toutes","Premiere finie","Ignore erreurs","Aleatoire"],correct:"a",
        expl:"Attend toutes, rejette des qu'une rejette."},
      {q:"<code>Promise.allSettled</code> diff de <code>all</code> :",opts:["Identique","Renvoie tout meme rejet","Plus rapide","Plus stricte"],correct:"b",
        expl:"allSettled n'echoue jamais. Toujours toutes les promesses avec leur statut."},
      {q:"Annuler une requete :",opts:["fetch.cancel()","AbortController","timeout()","clearTimeout"],correct:"b",
        expl:"<code>new AbortController(); fetch(url, { signal: ctrl.signal })</code>."}
    ],
    exercises:[
      {num:1,diff:"easy",title:"Fetch users",desc:"Recupere /api/users en JSON.",
        sol:"async function getUsers() {\n  const res = await fetch('/api/users');\n  return await res.json();\n}"},
      {num:2,diff:"easy",title:"Sleep 1s",desc:"Helper sleep(ms) qui attend.",
        sol:"const sleep = ms => new Promise(r => setTimeout(r, ms));\nawait sleep(1000);"},
      {num:3,diff:"medium",title:"Post JSON",desc:"POST {name:'Bob'} a /api/users.",
        sol:"async function createUser() {\n  const res = await fetch('/api/users', {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify({ name: 'Bob' })\n  });\n  return await res.json();\n}"},
      {num:4,diff:"medium",title:"Gestion erreur",desc:"Fetch avec try/catch + check status.",
        sol:"async function safe(url) {\n  try {\n    const res = await fetch(url);\n    if (!res.ok) throw new Error('HTTP ' + res.status);\n    return await res.json();\n  } catch (e) {\n    console.error(e);\n    return null;\n  }\n}"},
      {num:5,diff:"medium",title:"Upload photo",desc:"Upload une photo via FormData.",
        sol:"async function upload(file) {\n  const fd = new FormData();\n  fd.append('photo', file);\n  const res = await fetch('/upload', { method: 'POST', body: fd });\n  return await res.json();\n}"},
      {num:6,diff:"medium",title:"Timeout 5s",desc:"Fetch avec timeout de 5s.",
        sol:"async function fetchTimeout(url, ms = 5000) {\n  const ctrl = new AbortController();\n  const timer = setTimeout(() => ctrl.abort(), ms);\n  try {\n    const res = await fetch(url, { signal: ctrl.signal });\n    return await res.json();\n  } finally {\n    clearTimeout(timer);\n  }\n}\n\n// Ou plus simple :\n// fetch(url, { signal: AbortSignal.timeout(5000) })"},
      {num:7,diff:"hard",title:"Parallel fetch",desc:"3 endpoints en PARALLELE.",
        sol:"const [users, posts, comments] = await Promise.all([\n  fetch('/api/users').then(r => r.json()),\n  fetch('/api/posts').then(r => r.json()),\n  fetch('/api/comments').then(r => r.json())\n]);"},
      {num:8,diff:"hard",title:"Debounce search",desc:"Lance la requete 300ms apres dernier input.",
        sol:"let timer;\ninput.addEventListener('input', (e) => {\n  clearTimeout(timer);\n  timer = setTimeout(() => {\n    fetch(`/search?q=${encodeURIComponent(e.target.value)}`);\n  }, 300);\n});"},
      {num:9,diff:"hard",title:"Retry avec backoff",desc:"Retry 3x avec delai exponentiel.",
        sol:"async function fetchRetry(url, retries = 3) {\n  for (let i = 0; i < retries; i++) {\n    try {\n      const res = await fetch(url);\n      if (res.ok) return await res.json();\n    } catch (e) {}\n    await new Promise(r => setTimeout(r, 2 ** i * 1000));\n  }\n  throw new Error('All retries failed');\n}"},
      {num:10,diff:"hard",title:"Race avec timeout",desc:"Promise.race fetch + timeout 3s.",
        sol:"async function fetchRace(url) {\n  const result = await Promise.race([\n    fetch(url).then(r => r.json()),\n    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 3000))\n  ]);\n  return result;\n}"}
    ]
  },

  {id:"day-7",code:"J7",title:"Jour 7 - Modules, classes, ES6+ avance",sub:"import/export, classes, Map/Set, projet TODO",
    why:"Le JS moderne en 2026 = ce qui suit. Indispensable pour le code pro.",
    tags:["ES6","modules","classes","project"],
    sections:[
      {h:"Modules (import/export)",
        blocks:[
          {code:"// utils.js — named exports\nexport const add = (a, b) => a + b;\nexport const sub = (a, b) => a - b;\n\n// Default export (1 max par module)\nexport default function multiply(a, b) { return a * b; }\n\n// Re-export\nexport { add as plus } from './utils.js';\nexport * from './utils.js';\n\n// app.js — imports\nimport multiply, { add, sub } from './utils.js';\n\n// Avec rename\nimport { add as plus } from './utils.js';\n\n// Tout (namespace)\nimport * as utils from './utils.js';\nutils.add(1, 2);\n\n// Dynamic import (lazy load)\nconst module = await import('./heavy.js');\nmodule.bigFunction();\n\n// Dans le navigateur\n<script type=\"module\" src=\"app.js\"></script>"},
          {tip:"Les modules sont <code>strict mode</code> par defaut, scope isole, et <code>this</code> top-level est undefined (pas window)."}
        ]
      },
      {h:"Classes",
        blocks:[
          {code:"class User {\n  // Champs publics\n  name;\n  email;\n\n  // Champs prives (avec #)\n  #password;\n\n  // Champs static\n  static count = 0;\n\n  constructor(name, email) {\n    this.name = name;\n    this.email = email;\n    User.count++;\n  }\n\n  // Methode d'instance\n  greet() {\n    return `Bonjour ${this.name}`;\n  }\n\n  // Static (sur la classe)\n  static fromJSON(json) {\n    const data = JSON.parse(json);\n    return new User(data.name, data.email);\n  }\n\n  // Getter/setter\n  get displayName() {\n    return this.name.toUpperCase();\n  }\n  set displayName(v) {\n    this.name = v.toLowerCase();\n  }\n\n  // Methode privee\n  #hash(pw) {\n    return /* ... */;\n  }\n\n  setPassword(pw) {\n    this.#password = this.#hash(pw);\n  }\n}\n\n// Heritage\nclass Admin extends User {\n  constructor(name, email, perms) {\n    super(name, email);   // OBLIGATOIRE en 1er\n    this.perms = perms;\n  }\n  canEdit() {\n    return this.perms.includes('edit');\n  }\n}\n\nconst u = new User('Alice', 'a@x.fr');\nu.greet();              // 'Bonjour Alice'\nu.displayName;          // 'ALICE'\nUser.fromJSON('{...}'); // Static\nUser.count;             // nb d'instances"}
        ]
      },
      {h:"Map et Set",
        blocks:[
          {code:"// Map : cles de N'IMPORTE QUEL type (vs objet : que strings/symbols)\nconst m = new Map();\nm.set('key', 'value');\nm.set(42, 'num key');\nm.set({ id: 1 }, 'object key');  // cle = objet !\nm.get('key');         // 'value'\nm.has(42);            // true\nm.size;\nm.delete('key');\n\nfor (const [k, v] of m) { ... }\n\n// Init depuis un array de paires\nconst m2 = new Map([['a', 1], ['b', 2]]);\n\n// Set : valeurs UNIQUES\nconst s = new Set([1, 2, 2, 3]);  // {1, 2, 3}\ns.add(4);\ns.has(2);\ns.size;\n[...s];               // back to array\n\n// WeakMap / WeakSet : cles weakly held (libere par GC)\nconst wm = new WeakMap();\nwm.set(domElement, metadata);  // si domElement disparait, l'entree aussi"},
          {tip:"<code>Set</code> = facon rapide de dedup un array : <code>[...new Set(arr)]</code>."}
        ]
      },
      {h:"Iterators & generators",
        blocks:[
          {code:"// Iterator : objet avec .next() qui retourne { value, done }\n// Tous les iterables (array, string, map, set) ont [Symbol.iterator]\n\n// Generator : fonction qui retourne un iterator\nfunction* range(start, end, step = 1) {\n  for (let i = start; i < end; i += step) {\n    yield i;\n  }\n}\n\nfor (const n of range(0, 10, 2)) {\n  console.log(n);  // 0, 2, 4, 6, 8\n}\n\n[...range(0, 5)];  // [0, 1, 2, 3, 4]\n\n// Generator infini\nfunction* ids() {\n  let i = 1;\n  while (true) yield i++;\n}\nconst gen = ids();\ngen.next().value;  // 1\ngen.next().value;  // 2"}
        ]
      },
      {h:"Error handling",
        blocks:[
          {code:"// Custom error\nclass ValidationError extends Error {\n  constructor(message, field) {\n    super(message);\n    this.name = 'ValidationError';\n    this.field = field;\n  }\n}\n\ntry {\n  if (!email) throw new ValidationError('Email manquant', 'email');\n} catch (e) {\n  if (e instanceof ValidationError) {\n    console.log('Champ:', e.field);\n  } else {\n    throw e;  // re-throw inconnu\n  }\n}\n\n// Cause (ES2022)\nthrow new Error('Failed to load', { cause: originalError });"}
        ]
      },
      {h:"Projet final : TODO list (Vanilla JS)",
        blocks:[
          {list:[
            "<strong>HTML</strong> : input + bouton ajouter + liste de tasks + filtres",
            "<strong>Add</strong> : valider le champ, creer un objet { id, text, done }, ajouter au DOM + en memoire",
            "<strong>Toggle</strong> : checkbox qui marque done -> ligne barree",
            "<strong>Delete</strong> : bouton x sur chaque task (event delegation)",
            "<strong>Persistence</strong> : sauvegarde en localStorage (charge au load)",
            "<strong>Filter</strong> : 3 boutons (all / actives / done)",
            "<strong>Counter</strong> : 'N taches restantes'",
            "<strong>Clear done</strong> : bouton pour supprimer toutes les done",
            "<strong>Bonus</strong> : edit inline (double-click), drag-and-drop, animations CSS"
          ]}
        ]
      }
    ],
    quiz:[
      {q:"Champ prive natif :",opts:["<code>private name</code>","<code>#name</code>","<code>__name</code>","<code>_name</code>"],correct:"b",
        expl:"<code>#field</code> depuis ES2022."},
      {q:"<code>Set</code> autorise les doublons ?",opts:["Oui","Non","Selon","Avec option"],correct:"b",
        expl:"Set = valeurs uniques."},
      {q:"<code>super()</code> dans constructor :",opts:["Optionnel","Obligatoire en 1er si extends","Apres this","Jamais"],correct:"b",
        expl:"Doit etre la 1ere ligne du constructor si <code>extends</code>."},
      {q:"Import dynamic :",opts:["<code>require()</code>","<code>import()</code> retourne Promise","<code>load()</code>","Impossible"],correct:"b",
        expl:"<code>const mod = await import('./file.js')</code>."},
      {q:"Generator fonction signature :",opts:["<code>async function</code>","<code>function*</code>","<code>generator function</code>","<code>function&amp;</code>"],correct:"b",
        expl:"<code>function*</code> avec etoile."}
    ],
    exercises:[
      {num:1,diff:"easy",title:"Export named",desc:"Module qui exporte add et sub.",
        sol:"// utils.js\nexport const add = (a, b) => a + b;\nexport const sub = (a, b) => a - b;"},
      {num:2,diff:"easy",title:"Import default",desc:"Import default + named de utils.",
        sol:"import multiply, { add, sub } from './utils.js';"},
      {num:3,diff:"easy",title:"Set dedup",desc:"Dedupe un tableau avec Set.",
        sol:"const unique = [...new Set([1, 2, 2, 3, 3, 3])];\n// [1, 2, 3]"},
      {num:4,diff:"easy",title:"Map basics",desc:"Map qui stocke 3 paires cle/valeur.",
        sol:"const m = new Map();\nm.set('name', 'Alice');\nm.set('age', 28);\nm.set('admin', true);"},
      {num:5,diff:"medium",title:"Classe Counter",desc:"Class avec #count prive, methodes inc/dec/get.",
        sol:"class Counter {\n  #count = 0;\n  inc() { return ++this.#count; }\n  dec() { return --this.#count; }\n  get value() { return this.#count; }\n}"},
      {num:6,diff:"medium",title:"Getter / Setter",desc:"Classe Rectangle avec getter area.",
        sol:"class Rectangle {\n  constructor(w, h) { this.w = w; this.h = h; }\n  get area() { return this.w * this.h; }\n}\nconst r = new Rectangle(3, 4);\nr.area;  // 12"},
      {num:7,diff:"medium",title:"Static factory",desc:"User.fromString('Alice|28') retourne new User.",
        sol:"class User {\n  constructor(name, age) {\n    this.name = name;\n    this.age = age;\n  }\n  static fromString(s) {\n    const [name, age] = s.split('|');\n    return new User(name, +age);\n  }\n}"},
      {num:8,diff:"hard",title:"Heritage Admin",desc:"Admin qui herite de User avec canEdit.",
        sol:"class User {\n  constructor(name) { this.name = name; }\n  greet() { return `Bonjour ${this.name}`; }\n}\nclass Admin extends User {\n  constructor(name, perms) {\n    super(name);\n    this.perms = perms;\n  }\n  canEdit() { return this.perms.includes('edit'); }\n}"},
      {num:9,diff:"hard",title:"Custom error",desc:"Class ValidationError extends Error.",
        sol:"class ValidationError extends Error {\n  constructor(message, field) {\n    super(message);\n    this.name = 'ValidationError';\n    this.field = field;\n  }\n}\n\ntry {\n  throw new ValidationError('Champ vide', 'email');\n} catch (e) {\n  console.log(e.field);  // 'email'\n}"},
      {num:10,diff:"hard",title:"Generator range",desc:"function* range(start, end, step).",
        sol:"function* range(start, end, step = 1) {\n  for (let i = start; i < end; i += step) {\n    yield i;\n  }\n}\n\n[...range(0, 10, 2)];  // [0, 2, 4, 6, 8]"},
      {num:11,diff:"hard",title:"TODO mini",desc:"Class TodoList avec add, toggle, remove, filter('done'|'active').",
        sol:"class TodoList {\n  #items = [];\n  add(text) {\n    this.#items.push({ id: Date.now(), text, done: false });\n  }\n  toggle(id) {\n    const item = this.#items.find(i => i.id === id);\n    if (item) item.done = !item.done;\n  }\n  remove(id) {\n    this.#items = this.#items.filter(i => i.id !== id);\n  }\n  filter(type) {\n    if (type === 'done') return this.#items.filter(i => i.done);\n    if (type === 'active') return this.#items.filter(i => !i.done);\n    return this.#items;\n  }\n}"}
    ]
  }
];

const GIO = [
  {id:"w3-intro",code:"B1",level:"basic",title:"JS Intro",sub:"Qu'est-ce que JavaScript",tags:["intro","basics"],
    sections:[{h:"JS c'est quoi ?",blocks:[
      {p:"JavaScript = langage de PROGRAMMATION du web. Rend les pages interactives : reagir aux clics, animer, recuperer des donnees, valider des formulaires."},
      {p:"Tourne dans le navigateur (cote client) ET sur serveur (Node.js, Deno, Bun)."},
      {note:"JavaScript ≠ Java. Aucun rapport. Mauvais choix de nom des annees 90."}
    ]}],
    quiz:[{q:"JavaScript et Java :",opts:["Cousins proches","Aucun rapport","Le meme","Java appelle JS"],correct:"b",
      expl:"Aucun rapport technique."}]
  },
  {id:"w3-where",code:"B2",level:"basic",title:"JS Where To",sub:"Inline, internal, external, defer/async",tags:["basics"],
    sections:[{h:"3 facons",blocks:[
      {code:"<!-- Inline (eviter) -->\n<button onclick=\"alert('hi')\">Click</button>\n\n<!-- Internal -->\n<script>\n  console.log('hello');\n</script>\n\n<!-- External (recommande) -->\n<script src=\"app.js\" defer></script>"},
      {tip:"<code>defer</code> = apres parsing HTML (ordre preserve). <code>async</code> = des que dispo (pas d'ordre). UI : prefere <code>defer</code>."}
    ]}],
    quiz:[{q:"<code>defer</code> :",opts:["Apres parsing HTML","Des que dispo","Bloque","Synchrone"],correct:"a",
      expl:"defer = DOM pret avant execution."}]
  },
  {id:"w3-output",code:"B3",level:"basic",title:"JS Output",sub:"console.log, alert, innerHTML",tags:["basics"],
    sections:[{h:"4 moyens",blocks:[
      {code:"console.log('debug');               // ✅ TOUJOURS pour debug\nconsole.error('bug');               // rouge dans devtools\nconsole.warn('attention');\nconsole.table(arr);                  // tableau formate\nalert('Hello');                      // ⚠️ bloque l'UI\ndocument.getElementById('x').textContent = '...';\ndocument.write('...');               // ❌ JAMAIS UTILISER"}
    ]}],
    quiz:[{q:"Pour debugger :",opts:["alert","console.log","document.write","print"],correct:"b",
      expl:"console.log ne bloque pas."}]
  },
  {id:"w3-variables",code:"B4",level:"basic",title:"JS Variables",sub:"let, const, var",tags:["variables","basics"],
    sections:[{h:"3 mots-cles",blocks:[
      {code:"const x = 5;     // ✅ preferer (immutable ref)\nlet y = 10;      // ✅ si reassign\nvar z = 15;      // ❌ scope confus"}
    ]}],
    quiz:[{q:"Pour constante :",opts:["var","let","const","final"],correct:"c",
      expl:"const = pas de reassign."}]
  },
  {id:"w3-operators",code:"B5",level:"basic",title:"JS Operators",sub:"arithmetic, assignment, comparison",tags:["operators","basics"],
    sections:[{h:"Operateurs",blocks:[
      {code:"// Arithmetique\n+ - * / % **\n\n// Assignment (avec moderne ||= ??= &&=)\n=  +=  -=  *=  /=  ||=  ??=  &&=\n\n// Comparison (TOUJOURS strict)\n===  !==  >  <  >=  <=\n\n// Logique\n&&  ||  !  ??\n\n// Spread / rest\n...arr  ...args"}
    ]}],
    quiz:[{q:"<code>**</code> =",opts:["Multiplication","Puissance","Pointeur","Concat"],correct:"b",
      expl:"<code>2 ** 3 = 8</code>."}]
  },
  {id:"w3-data-types",code:"B6",level:"basic",title:"JS Data Types",sub:"primitive vs object",tags:["types","basics"],
    sections:[{h:"7 primitifs + objet",blocks:[
      {table:[
        ["Type","Exemple"],
        ["string","'hello'"],
        ["number","42, 3.14"],
        ["bigint","123n"],
        ["boolean","true, false"],
        ["undefined","undefined"],
        ["null","null"],
        ["symbol","Symbol('s')"],
        ["object","{}, [], function(){}"]
      ]}
    ]}],
    quiz:[{q:"<code>typeof []</code> :",opts:["array","object","list","iterable"],correct:"b",
      expl:"Array est un objet. Tester avec Array.isArray()."}]
  },
  {id:"w3-functions",code:"I1",level:"intermediate",title:"JS Functions",sub:"declaration, parametres, return",tags:["functions","intermediate"],
    sections:[{h:"Defaults & rest",blocks:[
      {code:"function greet(name = 'invite') {\n  return `Bonjour ${name}`;\n}\n\nfunction sum(...nums) {\n  return nums.reduce((a, b) => a + b, 0);\n}\nsum(1, 2, 3, 4);  // 10"}
    ]}],
    quiz:[{q:"<code>...nums</code> en param :",opts:["Spread","Rest","Optional","Decorateur"],correct:"b",
      expl:"Signature = REST. Appel = SPREAD."}]
  },
  {id:"w3-arrow",code:"I2",level:"intermediate",title:"JS Arrow Functions",sub:"=> shorthand",tags:["arrow","intermediate"],
    sections:[{h:"Syntaxe",blocks:[
      {code:"const f = () => 42;\nconst sq = x => x * x;\nconst add = (a, b) => a + b;\nconst many = (a, b) => {\n  const c = a + b;\n  return c * 2;\n};\nconst obj = () => ({ a: 1 });"}
    ]}],
    quiz:[{q:"Arrow propre <code>this</code> ?",opts:["Oui","Non, herite","Toujours window","Erreur"],correct:"b",
      expl:"Pas de this propre."}]
  },
  {id:"w3-arrays",code:"I3",level:"intermediate",title:"JS Arrays",sub:"map, filter, reduce, find, sort",tags:["arrays","intermediate"],
    sections:[{h:"Methods",blocks:[
      {code:"const arr = [1, 2, 3, 4, 5];\narr.map(n => n * 2);            // [2,4,6,8,10]\narr.filter(n => n > 2);          // [3,4,5]\narr.reduce((acc, n) => acc + n, 0); // 15\narr.find(n => n === 3);          // 3\narr.some(n => n > 4);            // true\narr.every(n => n > 0);           // true\narr.includes(3);                  // true\narr.flat();\narr.toSorted();   // ES2023, sans muter"}
    ]}],
    quiz:[{q:"Quelle method mute ?",opts:["map","filter","sort","find"],correct:"c",
      expl:"sort et reverse mutent."}]
  },
  {id:"w3-objects",code:"I4",level:"intermediate",title:"JS Objects",sub:"keys, values, entries, spread",tags:["objects","intermediate"],
    sections:[{h:"Utilites",blocks:[
      {code:"Object.keys(obj);\nObject.values(obj);\nObject.entries(obj);\nObject.fromEntries(pairs);\nObject.assign({}, a, b);\n{ ...a, ...b };\nstructuredClone(obj);"}
    ]}],
    quiz:[{q:"Clone profond :",opts:["...obj","Object.assign","structuredClone","JSON"],correct:"c",
      expl:"structuredClone = moderne."}]
  },
  {id:"w3-dom",code:"I5",level:"intermediate",title:"JS DOM",sub:"querySelector, classList, dataset",tags:["DOM","intermediate"],
    sections:[{h:"Interagir",blocks:[
      {code:"const el = document.querySelector('.card');\nel.classList.toggle('active');\nel.dataset.id = '42';\nel.textContent = 'safe';\nel.style.color = 'red';"}
    ]}],
    quiz:[{q:"Sans XSS :",opts:["innerHTML","textContent","innerText","html()"],correct:"b",
      expl:"textContent ne parse pas HTML."}]
  },
  {id:"w3-events",code:"I6",level:"intermediate",title:"JS Events",sub:"addEventListener, delegation",tags:["events","intermediate"],
    sections:[{h:"Listener moderne",blocks:[
      {code:"el.addEventListener('click', (e) => {\n  e.preventDefault();\n  e.stopPropagation();\n});\n\n// Delegation\nparent.addEventListener('click', (e) => {\n  if (e.target.matches('.btn')) { ... }\n});"}
    ]}],
    quiz:[{q:"Empecher submit defaut :",opts:["return false","preventDefault()","stopPropagation()","cancel()"],correct:"b",
      expl:"e.preventDefault()."}]
  },
  {id:"w3-async",code:"A1",level:"advanced",title:"JS Async / Promises",sub:"Promise, async/await, fetch",tags:["async","promises","advanced"],
    sections:[{h:"async / await",blocks:[
      {code:"async function loadUser(id) {\n  try {\n    const res = await fetch(`/api/users/${id}`);\n    if (!res.ok) throw new Error('HTTP ' + res.status);\n    return await res.json();\n  } catch (err) {\n    console.error(err);\n    return null;\n  }\n}"}
    ]}],
    quiz:[{q:"<code>await</code> dans :",opts:["Partout","Fonction async","Tout sauf if","Module"],correct:"b",
      expl:"async required (ou top-level module)."}]
  },
  {id:"w3-modules",code:"A2",level:"advanced",title:"JS Modules",sub:"import / export",tags:["modules","advanced"],
    sections:[{h:"ESM",blocks:[
      {code:"// math.js\nexport const PI = 3.14;\nexport function add(a, b) { return a + b; }\nexport default function multiply(a, b) { return a * b; }\n\n// app.js\nimport multiply, { PI, add } from './math.js';\n\n// Dynamique\nconst mod = await import('./heavy.js');"}
    ]}],
    quiz:[{q:"Combien d'export default ?",opts:["1","2","Illimite","0"],correct:"a",
      expl:"1 default par module."}]
  },
  {id:"w3-classes",code:"A3",level:"advanced",title:"JS Classes",sub:"class, extends, #private",tags:["classes","OOP","advanced"],
    sections:[{h:"Class complete",blocks:[
      {code:"class User {\n  #password;\n  constructor(name) { this.name = name; }\n  greet() { return `Bonjour ${this.name}`; }\n  static fromJSON(j) { return new User(JSON.parse(j).name); }\n}\n\nclass Admin extends User {\n  constructor(name, perms) {\n    super(name);\n    this.perms = perms;\n  }\n}"}
    ]}],
    quiz:[{q:"Prive natif :",opts:["private x","#x","__x","_x"],correct:"b",
      expl:"#field depuis ES2022."}]
  },
  {id:"w3-map-set",code:"A4",level:"advanced",title:"JS Map & Set",sub:"Map, Set, WeakMap",tags:["map","set","advanced"],
    sections:[{h:"Collections modernes",blocks:[
      {code:"const m = new Map();\nm.set('a', 1);\nm.get('a');  // 1\n\nconst s = new Set([1, 2, 2, 3]);\n[...s];  // [1, 2, 3]\n\nconst wm = new WeakMap();  // cles weakly held"}
    ]}],
    quiz:[{q:"Set autorise les doublons ?",opts:["Oui","Non","Selon","Option"],correct:"b",
      expl:"Valeurs uniques."}]
  },
  {id:"w3-strings",code:"B7",level:"basic",title:"JS Strings",sub:"length, methods, template literals",tags:["strings","basics"],
    sections:[{h:"Methods essentielles",blocks:[
      {code:"const s = 'Hello World';\n\ns.length;                    // 11\ns.toUpperCase();             // 'HELLO WORLD'\ns.toLowerCase();             // 'hello world'\ns.trim();                    // enleve espaces debut/fin\ns.trimStart();\ns.trimEnd();\ns.indexOf('o');              // 4\ns.lastIndexOf('o');          // 7\ns.includes('World');         // true\ns.startsWith('Hello');       // true\ns.endsWith('!');             // false\ns.slice(0, 5);               // 'Hello'\ns.substring(6);              // 'World'\ns.replace('World', 'JS');    // 'Hello JS'\ns.replaceAll('o', '0');      // 'Hell0 W0rld'\ns.split(' ');                // ['Hello', 'World']\ns.repeat(3);                 // 'Hello WorldHello World...'\ns.padStart(15, '*');         // '****Hello World'\ns.padEnd(15, '*');           // 'Hello World****'\ns.at(-1);                    // 'd' (negative index OK)\n\n// Template literals\nconst name = 'Alice';\n`Bonjour ${name}`;            // 'Bonjour Alice'"}
    ]}],
    quiz:[{q:"<code>'hello'.at(-1)</code> :",opts:["Erreur","'o'","'h'","-1"],correct:"b",
      expl:"<code>at()</code> accepte negatif (depuis ES2022)."}]
  },
  {id:"w3-numbers",code:"B8",level:"basic",title:"JS Numbers & Math",sub:"Number, Math, parseInt, NaN",tags:["numbers","math","basics"],
    sections:[{h:"Number methods",blocks:[
      {code:"(42).toString();        // '42'\n(42).toString(2);        // '101010' (binaire)\n(255).toString(16);      // 'ff' (hex)\n(3.14159).toFixed(2);    // '3.14'\n(1234.5).toLocaleString('fr-FR');  // '1 234,5'\n\n// Tests\nNumber.isInteger(42);    // true\nNumber.isFinite(Infinity); // false\nNumber.isNaN(NaN);       // true (vs isNaN global qui converti)\nNumber.MAX_SAFE_INTEGER; // 2^53 - 1\n\n// Parsing\nparseInt('42abc');       // 42\nparseInt('0xff', 16);    // 255\nparseFloat('3.14abc');   // 3.14\nNumber('42');            // 42\n+'42';                   // 42 (raccourci)"},
      {code:"// Math\nMath.PI;                 // 3.14159...\nMath.E;\nMath.abs(-5);            // 5\nMath.round(4.5);         // 5\nMath.floor(4.9);         // 4\nMath.ceil(4.1);          // 5\nMath.trunc(4.9);         // 4 (sans arrondi)\nMath.sign(-5);           // -1 (signe)\nMath.min(1, 2, 3);       // 1\nMath.max(1, 2, 3);       // 3\nMath.sqrt(16);           // 4\nMath.pow(2, 10);         // 1024 (ou 2 ** 10)\nMath.random();           // 0 a 1\n\n// Random entre 0 et 99\nMath.floor(Math.random() * 100);"}
    ]}],
    quiz:[{q:"Random entre 0 et 9 inclusif :",opts:["<code>Math.random() * 10</code>","<code>Math.floor(Math.random() * 10)</code>","<code>Math.round(Math.random() * 9)</code>","<code>Math.random(9)</code>"],correct:"b",
      expl:"<code>floor(random * 10)</code> donne 0-9 entiers."}]
  },
  {id:"w3-date",code:"B9",level:"basic",title:"JS Date",sub:"new Date, getDate, format",tags:["date","basics"],
    sections:[{h:"Date moderne",blocks:[
      {code:"const now = new Date();\n\n// Get\nnow.getFullYear();       // 2026\nnow.getMonth();          // 0-11 ! (Jan = 0)\nnow.getDate();           // 1-31\nnow.getDay();            // 0-6 (Sun = 0)\nnow.getHours();\nnow.getMinutes();\nnow.getSeconds();\nnow.getTime();           // ms depuis 1970\n\n// Set\nnow.setFullYear(2027);\nnow.setMonth(11);        // decembre\n\n// Construire\nnew Date(2026, 4, 25);   // 25 mai 2026 (mois = 4 !)\nnew Date('2026-05-25');\nnew Date('2026-05-25T14:30:00');\nDate.now();              // timestamp ms\n\n// Format moderne\nnow.toISOString();       // '2026-05-25T14:30:00.000Z'\nnow.toLocaleDateString('fr-FR');     // '25/05/2026'\nnow.toLocaleString('fr-FR', {\n  dateStyle: 'full',\n  timeStyle: 'short'\n});\n// 'lundi 25 mai 2026 a 14:30'\n\n// Diff entre dates\nconst diffMs = date2 - date1;\nconst diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));"},
      {warn:"<code>getMonth()</code> retourne 0-11 ! Janvier = 0, decembre = 11. Source de bugs."}
    ]}],
    quiz:[{q:"<code>new Date(2026, 0, 1)</code> :",opts:["1 jan 2026","1 fev 2026","Erreur","1 dec 2026"],correct:"a",
      expl:"Mois 0 = janvier (0-indexe)."}]
  },
  {id:"w3-regex",code:"B10",level:"basic",title:"JS RegExp",sub:"Pattern matching",tags:["regex","basics"],
    sections:[{h:"Regex en JS",blocks:[
      {code:"// 2 syntaxes\nconst r1 = /^abc$/;\nconst r2 = new RegExp('^abc$');\n\n// Flags\n/abc/i        // insensible casse\n/abc/g        // global (toutes occurrences)\n/abc/m        // multiline\n/abc/s        // dot matches newline\n/abc/u        // unicode\n\n// Tester\n/^[a-z]+$/.test('hello');   // true\n\n// Matcher\n'phone: 0612345678'.match(/\\d+/);  // ['0612345678']\n'1-2-3'.match(/\\d/g);              // ['1', '2', '3']\n\n// Capture groups\nconst m = 'John 1990'.match(/(\\w+)\\s+(\\d+)/);\n// m[0] = full, m[1] = 'John', m[2] = '1990'\n\n// Named groups\nconst { groups } = 'John 1990'.match(/(?<name>\\w+)\\s+(?<year>\\d+)/);\ngroups.name;   // 'John'\ngroups.year;   // '1990'\n\n// Replace\n'hello world'.replace(/world/, 'JS');\n'a-b-c'.replace(/-/g, '_');\n'JOHN'.replace(/(\\w)(\\w+)/, (_, first, rest) =>\n  first + rest.toLowerCase());"},
      {table:[
        ["Pattern","Sens"],
        ["<code>.</code>","N'importe quel char (sauf newline)"],
        ["<code>\\d</code>","Chiffre [0-9]"],
        ["<code>\\w</code>","Alphanumeric + _"],
        ["<code>\\s</code>","Espace"],
        ["<code>^</code> / <code>$</code>","Debut / fin"],
        ["<code>*</code>","0 ou plus"],
        ["<code>+</code>","1 ou plus"],
        ["<code>?</code>","0 ou 1"],
        ["<code>{n,m}</code>","entre n et m"],
        ["<code>(...)</code>","Groupe de capture"],
        ["<code>[abc]</code>","Un des chars"]
      ]}
    ]}],
    quiz:[{q:"Flag pour insensible casse :",opts:["c","i","u","s"],correct:"b",
      expl:"<code>/abc/i</code>"}]
  },
  {id:"w3-errors",code:"I7",level:"intermediate",title:"JS Errors",sub:"try/catch/finally, custom errors",tags:["errors","intermediate"],
    sections:[{h:"Gestion d'erreurs",blocks:[
      {code:"// try/catch/finally\ntry {\n  riskyOperation();\n} catch (err) {\n  console.error(err.message);\n  console.error(err.stack);\n} finally {\n  cleanup();   // toujours execute\n}\n\n// Throw\nthrow new Error('Quelque chose a casse');\nthrow new TypeError('Mauvais type');\nthrow new RangeError('Hors limite');\n\n// Custom error\nclass ValidationError extends Error {\n  constructor(message, field) {\n    super(message);\n    this.name = 'ValidationError';\n    this.field = field;\n  }\n}\n\ntry {\n  if (!email) throw new ValidationError('Email manquant', 'email');\n} catch (e) {\n  if (e instanceof ValidationError) {\n    console.log('Champ:', e.field);\n  } else {\n    throw e;   // re-throw inconnu\n  }\n}\n\n// Cause (ES2022)\ntry { fetch('...') }\ncatch (orig) {\n  throw new Error('Load failed', { cause: orig });\n}"}
    ]}],
    quiz:[{q:"<code>finally</code> :",opts:["Si erreur uniquement","Si pas d'erreur","TOUJOURS","Jamais"],correct:"c",
      expl:"Execute toujours, erreur ou pas."}]
  },
  {id:"w3-storage",code:"I8",level:"intermediate",title:"JS Web Storage",sub:"localStorage, sessionStorage",tags:["storage","intermediate"],
    sections:[{h:"Stockage cote client",blocks:[
      {code:"// Persistant\nlocalStorage.setItem('theme', 'dark');\nconst theme = localStorage.getItem('theme');\nlocalStorage.removeItem('theme');\nlocalStorage.clear();\nlocalStorage.length;\nlocalStorage.key(0);\n\n// Session only\nsessionStorage.setItem('search', 'php');\n\n// Stocker objet (JSON obligatoire)\nlocalStorage.setItem('user', JSON.stringify(user));\nconst user = JSON.parse(localStorage.getItem('user') || '{}');\n\n// Helper safe\nfunction safeGet(key, fallback = null) {\n  try {\n    const v = localStorage.getItem(key);\n    return v ? JSON.parse(v) : fallback;\n  } catch {\n    return fallback;\n  }\n}\n\n// Listener cross-tab\nwindow.addEventListener('storage', (e) => {\n  if (e.key === 'theme') applyTheme(e.newValue);\n});"},
      {warn:"~5MB max. Pas de chiffrement. Pas pour les secrets."}
    ]}],
    quiz:[{q:"Diff localStorage / sessionStorage :",opts:["Aucune","local persistant, session = onglet","Inverse","local + chiffre"],correct:"b",
      expl:"sessionStorage = vide a la fermeture de l'onglet."}]
  },
  {id:"w3-cookies",code:"I9",level:"intermediate",title:"JS Cookies",sub:"document.cookie",tags:["cookies","intermediate"],
    sections:[{h:"Cookies en JS",blocks:[
      {code:"// Set\ndocument.cookie = 'name=John; max-age=86400; path=/; SameSite=Lax';\n\n// Get (string contenant TOUS les cookies)\nconsole.log(document.cookie);\n// 'name=John; theme=dark'\n\n// Parser\nfunction getCookie(name) {\n  const match = document.cookie.match(\n    new RegExp('(?:^|; )' + name + '=([^;]*)')\n  );\n  return match ? decodeURIComponent(match[1]) : null;\n}\n\n// Delete (set expire dans le passe)\ndocument.cookie = 'name=; max-age=0; path=/';\n\n// Flags importants\n// Secure       : HTTPS seulement\n// HttpOnly     : pas accessible JS (cote serveur seulement)\n// SameSite     : Lax / Strict / None\n// max-age      : duree en secondes\n// expires      : date GMT"},
      {tip:"En 2026, prefere localStorage pour les preferences client. Cookies = pour les sessions cote serveur (avec HttpOnly)."}
    ]}],
    quiz:[{q:"<code>document.cookie</code> retourne :",opts:["Tableau","Objet","String avec tous","Le dernier"],correct:"c",
      expl:"String contenant tous les cookies, separes par '; '."}]
  },
  {id:"w3-iterables",code:"I10",level:"intermediate",title:"JS Iterables & Generators",sub:"Symbol.iterator, yield",tags:["iterables","generators","intermediate"],
    sections:[{h:"Iterables custom",blocks:[
      {code:"// Tout iterable a un [Symbol.iterator]\nconst arr = [1, 2, 3];\nconst it = arr[Symbol.iterator]();\nit.next();  // { value: 1, done: false }\nit.next();  // { value: 2, done: false }\nit.next();  // { value: 3, done: false }\nit.next();  // { value: undefined, done: true }\n\n// Custom iterable\nconst range = {\n  from: 1,\n  to: 5,\n  [Symbol.iterator]() {\n    let i = this.from;\n    return {\n      next: () => i <= this.to\n        ? { value: i++, done: false }\n        : { value: undefined, done: true }\n    };\n  }\n};\nfor (const n of range) console.log(n);  // 1, 2, 3, 4, 5\n\n// Generator (plus simple)\nfunction* genRange(start, end) {\n  for (let i = start; i <= end; i++) yield i;\n}\n[...genRange(1, 5)];   // [1, 2, 3, 4, 5]\n\n// Generator infini\nfunction* ids() {\n  let i = 1;\n  while (true) yield i++;\n}"}
    ]}],
    quiz:[{q:"<code>function*</code> :",opts:["Erreur","Generator","Async","Multiplication"],correct:"b",
      expl:"function* = generator."}]
  },
  {id:"w3-bom",code:"A5",level:"advanced",title:"JS Window & BOM",sub:"window, location, history",tags:["window","BOM","advanced"],
    sections:[{h:"Browser Object Model",blocks:[
      {code:"// window est le global\nwindow.innerWidth;\nwindow.innerHeight;\nwindow.scrollY;\nwindow.scrollTo({ top: 0, behavior: 'smooth' });\n\n// Location\nlocation.href;            // URL complete\nlocation.pathname;        // '/blog/article'\nlocation.search;          // '?id=42'\nlocation.hash;            // '#section'\nlocation.host;            // 'site.fr:8080'\nlocation.protocol;        // 'https:'\nlocation.assign('/new');  // navigue\nlocation.reload();\nlocation.replace('/x');   // sans historique\n\n// History API (SPA)\nhistory.pushState({}, '', '/new-url');\nhistory.replaceState({}, '', '/x');\nhistory.back();\nhistory.forward();\nwindow.addEventListener('popstate', (e) => {\n  // back/forward presse\n});\n\n// URL parsing\nconst u = new URL('https://site.fr/path?id=42#sec');\nu.pathname;     // '/path'\nu.searchParams.get('id');   // '42'\nu.searchParams.set('q', 'php');"}
    ]}],
    quiz:[{q:"Pour parser une URL :",opts:["new URL(str)","location.parse(str)","String.parseUrl","JSON.parse"],correct:"a",
      expl:"<code>new URL(str)</code> parse et expose pathname/search/hash."}]
  },
  {id:"w3-web-apis",code:"A6",level:"advanced",title:"JS Web APIs",sub:"Geolocation, Notification, Clipboard",tags:["apis","advanced"],
    sections:[{h:"APIs natives utiles",blocks:[
      {code:"// Geolocation\nnavigator.geolocation.getCurrentPosition(\n  (pos) => console.log(pos.coords.latitude, pos.coords.longitude),\n  (err) => console.error(err)\n);\n\n// Notifications\nif ('Notification' in window) {\n  await Notification.requestPermission();\n  new Notification('Hello!', { body: 'Texte', icon: '/icon.png' });\n}\n\n// Clipboard\nawait navigator.clipboard.writeText('Hello');\nconst text = await navigator.clipboard.readText();\n\n// Share (mobile)\nif (navigator.share) {\n  await navigator.share({\n    title: 'Mon site',\n    text: 'Regarde ca',\n    url: location.href\n  });\n}\n\n// Intersection Observer (lazy load, scroll spy)\nconst io = new IntersectionObserver((entries) => {\n  entries.forEach(e => {\n    if (e.isIntersecting) e.target.classList.add('visible');\n  });\n});\ndocument.querySelectorAll('.fade-in').forEach(el => io.observe(el));"}
    ]}],
    quiz:[{q:"Pour detecter element visible au scroll :",opts:["addEventListener('scroll')","IntersectionObserver","Element.visible","getBoundingClientRect en boucle"],correct:"b",
      expl:"IntersectionObserver = API moderne, performante."}]
  },
  {id:"w3-strict",code:"A7",level:"advanced",title:"JS Strict Mode & Best Practices",sub:"'use strict', modules",tags:["strict","best-practices","advanced"],
    sections:[{h:"Strict mode",blocks:[
      {code:"// En haut d'un fichier\n'use strict';\n\n// Ou en haut d'une fonction\nfunction strict() {\n  'use strict';\n  // ...\n}\n\n// AUTO activates en :\n// - Modules ES (import/export)\n// - Classes\n// - <script type=\"module\">\n\n// Ce que strict mode change :\n// 1. Variables non declarees lancent ReferenceError\nx = 5;  // ❌ en strict\n\n// 2. this dans fonctions normales = undefined (pas window)\nfunction f() { console.log(this); }\nf();  // undefined en strict, window sinon\n\n// 3. Suppression interdite\ndelete Object.prototype;  // ❌ en strict\n\n// 4. Octals interdits\nconst n = 0123;  // ❌ en strict (mais 0o123 OK)"},
      {tip:"En 2026, tout le monde utilise des modules ES, donc strict est partout par defaut."}
    ]}],
    quiz:[{q:"Strict mode auto dans :",opts:["Toutes fonctions","Modules ES + classes","Que script type=text/javascript","Jamais"],correct:"b",
      expl:"Modules ES et classes sont strict par defaut."}]
  }
];

const ALL_LESSONS = [...DAYS, ...GIO];
const TOTAL = ALL_LESSONS.length;
const TOTAL_EXERCISES = DAYS.reduce((sum, d) => sum + (d.exercises ? d.exercises.length : 0), 0);
