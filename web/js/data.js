const DAYS = [
  {id:"day-1",code:"J1",title:"Jour 1 - Variables & types",sub:"let, const, types primitifs et objets",
    why:"Une mauvaise declaration et tout casse. La base de tout JS moderne.",
    tags:["variables","types","let","const"],
    sections:[
      {h:"let, const, var",
        blocks:[
          {p:"En JS moderne, on utilise <code>const</code> par defaut et <code>let</code> si la valeur doit changer. <strong>Oublie <code>var</code></strong> (scope confus, hoisting bizarre)."},
          {code:"// const : ne peut PAS etre reassigne\nconst PI = 3.14;\n// PI = 3.14159;  // ❌ TypeError\n\n// let : reassignable\nlet count = 0;\ncount = 1; // ✅\n\n// const + objet : l'objet peut etre mute (sa REFERENCE est fixe)\nconst user = { name: 'Alice' };\nuser.name = 'Bob';  // ✅ OK (mute le contenu)\n// user = { name: 'Charlie' };  // ❌ reaffectation"},
          {tip:"Convention : <code>const</code> par defaut, <code>let</code> quand tu vas reassigner. Reduit les bugs de 50%."}
        ]
      },
      {h:"Les 7 types primitifs",
        blocks:[
          {code:"typeof 'hello'      // 'string'\ntypeof 42           // 'number'\ntypeof 12n          // 'bigint'\ntypeof true         // 'boolean'\ntypeof undefined    // 'undefined'\ntypeof null         // 'object' (bug historique de JS)\ntypeof Symbol('s')  // 'symbol'\n\n// Objets : tout le reste\ntypeof {}           // 'object'\ntypeof []           // 'object'\ntypeof function(){} // 'function'"},
          {warn:"<code>typeof null === 'object'</code> est un bug officiel de JS, jamais corrige pour compatibilite. Pour tester null : <code>x === null</code>."}
        ]
      },
      {h:"Template literals",
        blocks:[
          {code:"const name = 'Alice';\nconst age = 28;\n\n// Backticks + ${} = template literal\nconst msg = `${name} a ${age} ans.`;\n\n// Multi-lignes natif\nconst html = `\n  <div>\n    <h1>${name}</h1>\n  </div>\n`;\n\n// Expressions dans ${}\nconsole.log(`L'an prochain : ${age + 1}`);"}
        ]
      },
      {h:"Destructuration + spread",
        blocks:[
          {code:"// Object destructuring\nconst user = { name: 'Bob', age: 30, role: 'admin' };\nconst { name, age } = user;\n\n// Avec rename\nconst { name: userName } = user;\n\n// Avec defaut\nconst { theme = 'dark' } = user;\n\n// Array destructuring\nconst [first, second, ...rest] = [1, 2, 3, 4, 5];\n// first=1, second=2, rest=[3,4,5]\n\n// Spread\nconst merged = { ...user, age: 31 };  // copie + override\nconst arr = [...arr1, ...arr2];        // concat"}
        ]
      }
    ],
    quiz:[
      {q:"Que retourne <code>typeof null</code> ?",opts:["<code>'null'</code>","<code>'object'</code>","<code>'undefined'</code>","Erreur"],correct:"b",
        expl:"Bug historique de JS. Pour tester null : <code>x === null</code>."},
      {q:"<code>const arr = []; arr.push(1);</code> :",
        opts:["OK","TypeError","Const fige tout","Seulement avec let"],correct:"a",
        expl:"<code>const</code> empeche de REASSIGNER arr, mais pas de muter son contenu."},
      {q:"Quel mot-cle JS moderne (post-ES6) ?",opts:["<code>var</code>","<code>let</code>","Les deux","Aucun"],correct:"b",
        expl:"<code>let</code> a un scope de bloc proprement, <code>var</code> de fonction."}
    ],
    exercises:[
      {num:1,diff:"easy",title:"Declarations modernes",desc:"3 variables : nom (string), age (number), actif (boolean).",
        sol:"const nom = 'Alice';\nconst age = 28;\nconst actif = true;"},
      {num:2,diff:"easy",title:"Template literal",desc:"Affiche 'Bonjour Alice, tu as 28 ans.' avec un template literal.",
        sol:"const nom = 'Alice';\nconst age = 28;\nconsole.log(`Bonjour ${nom}, tu as ${age} ans.`);"},
      {num:3,diff:"easy",title:"Typeof check",desc:"Affiche le type de 42, '42', true, et null.",
        sol:"console.log(typeof 42);    // number\nconsole.log(typeof '42');  // string\nconsole.log(typeof true);  // boolean\nconsole.log(typeof null);  // object"},
      {num:4,diff:"medium",title:"Destructuration",desc:"Extrait name et age de l'objet user.",
        sol:"const user = { name: 'Bob', age: 30, role: 'admin' };\nconst { name, age } = user;\nconsole.log(name, age);"},
      {num:5,diff:"medium",title:"Spread operator",desc:"Fusionne 2 objets en un seul.",
        sol:"const base = { a: 1, b: 2 };\nconst extra = { c: 3, d: 4 };\nconst merged = { ...base, ...extra };"},
      {num:6,diff:"medium",title:"Copie d'array",desc:"Cree une COPIE d'un tableau sans modifier l'original.",
        sol:"const arr = [1, 2, 3];\nconst copy = [...arr];\ncopy.push(4);\nconsole.log(arr);   // [1,2,3]\nconsole.log(copy);  // [1,2,3,4]"},
      {num:7,diff:"hard",title:"Default value",desc:"Destructure avec defaut : si user.theme absent, utilise 'light'.",
        sol:"const user = { name: 'Bob' };\nconst { theme = 'light' } = user;\nconsole.log(theme); // 'light'"}
    ]
  },

  {id:"day-2",code:"J2",title:"Jour 2 - Operateurs & control flow",sub:"if, switch, ternaire, ===, ??",
    why:"Les egalites en JS sont piegeuses. Apprends === maintenant.",
    tags:["operators","equality","conditions"],
    sections:[
      {h:"L'egalite : === et non ==",
        blocks:[
          {code:"// == fait de la coercition (conversion implicite)\n0 == '0'        // true   😱\n0 == ''         // true   😱\nnull == undefined // true \nfalse == '0'    // true   😱\n\n// === compare type ET valeur (STRICT)\n0 === '0'       // false  ✅\n0 === ''        // false  ✅\nnull === undefined // false ✅"},
          {warn:"Utilise TOUJOURS <code>===</code>. <code>==</code> a des regles de coercition que personne ne memorise vraiment."}
        ]
      },
      {h:"Ternaire et nullish",
        blocks:[
          {code:"// Ternaire (condition ? si-vrai : si-faux)\nconst label = age >= 18 ? 'majeur' : 'mineur';\n\n// || : utilise la droite si gauche est FALSY (0, '', false, null, undefined, NaN)\nconst port1 = 0 || 3000;    // 3000  (mais 0 etait valide!)\n\n// ?? : utilise droite SEULEMENT si gauche est null/undefined\nconst port2 = 0 ?? 3000;    // 0     ✅\nconst port3 = null ?? 3000; // 3000  ✅\n\n// Optional chaining\nconst city = user?.address?.city;  // undefined si user ou address est null\nconst first = arr?.[0];\nconst result = fn?.(arg);"},
          {tip:"<code>??</code> et <code>?.</code> sont les meilleures additions a JS depuis 5 ans. Apprends-les."}
        ]
      },
      {h:"if / else if / switch",
        blocks:[
          {code:"if (age < 18) {\n  console.log('mineur');\n} else if (age < 65) {\n  console.log('adulte');\n} else {\n  console.log('senior');\n}\n\n// switch (compare avec ===)\nswitch (role) {\n  case 'admin':\n  case 'owner':         // fall-through volontaire\n    canEdit = true;\n    break;\n  case 'viewer':\n    canEdit = false;\n    break;\n  default:\n    canEdit = false;\n}"}
        ]
      },
      {h:"Boucles",
        blocks:[
          {code:"// for classique\nfor (let i = 0; i < arr.length; i++) { ... }\n\n// for...of (valeurs)\nfor (const item of arr) { console.log(item); }\n\n// for...in (cles d'objet — A EVITER pour arrays)\nfor (const key in obj) { console.log(key, obj[key]); }\n\n// Methods array (preferees)\narr.forEach(item => console.log(item));\nconst doubled = arr.map(n => n * 2);\nconst evens = arr.filter(n => n % 2 === 0);\nconst sum = arr.reduce((acc, n) => acc + n, 0);\nconst found = arr.find(u => u.id === 5);"}
        ]
      }
    ],
    quiz:[
      {q:"Que vaut <code>0 == false</code> ?",opts:["<code>true</code>","<code>false</code>","Erreur","<code>NaN</code>"],correct:"a",
        expl:"<code>==</code> fait coercition : <code>false</code> devient 0, donc <code>0 == 0</code> = true. Avec <code>===</code> ce serait false."},
      {q:"Difference entre <code>||</code> et <code>??</code> :",
        opts:["Aucune","<code>||</code> rejette les falsy, <code>??</code> juste null/undefined","<code>??</code> rejette les falsy","<code>||</code> est strict"],correct:"b",
        expl:"<code>||</code> : OR logique. <code>??</code> : utilise la droite seulement si gauche est null/undefined."},
      {q:"Pour iterer les VALEURS d'un tableau :",
        opts:["<code>for...in</code>","<code>for...of</code>","<code>foreach</code>","<code>each</code>"],correct:"b",
        expl:"<code>for...of</code> = valeurs. <code>for...in</code> = cles."}
    ],
    exercises:[
      {num:1,diff:"easy",title:"Pair ou impair",desc:"Fonction arrow qui retourne 'pair' ou 'impair'.",
        sol:"const parite = n => n % 2 === 0 ? 'pair' : 'impair';"},
      {num:2,diff:"easy",title:"Default avec ??",desc:"Retourne le port s'il est valide (meme 0), sinon 3000.",
        sol:"const getPort = config => config.port ?? 3000;"},
      {num:3,diff:"medium",title:"Optional chaining",desc:"Acces sur user.address.city sans crasher si null.",
        sol:"const city = user?.address?.city ?? 'inconnu';"},
      {num:4,diff:"medium",title:"Filter + map",desc:"Sur [1,2,3,4,5,6], retourne les pairs doubles : [4,8,12].",
        sol:"const result = [1,2,3,4,5,6]\n  .filter(n => n % 2 === 0)\n  .map(n => n * 2);"},
      {num:5,diff:"medium",title:"Reduce somme",desc:"Somme d'un tableau avec reduce.",
        sol:"const sum = arr.reduce((acc, n) => acc + n, 0);"},
      {num:6,diff:"hard",title:"Find user",desc:"Trouve le premier user dont l'age > 30.",
        sol:"const adult = users.find(u => u.age > 30);"},
      {num:7,diff:"hard",title:"Group by",desc:"Groupe un tableau d'objets par leur champ 'role'.",
        sol:"const byRole = users.reduce((acc, u) => {\n  (acc[u.role] = acc[u.role] || []).push(u);\n  return acc;\n}, {});"}
    ]
  },

  {id:"day-3",code:"J3",title:"Jour 3 - Fonctions & closures",sub:"declarations, arrow, this, scope",
    why:"Les fonctions sont les briques de JS. Closures = piege n1 en entretien.",
    tags:["functions","closures","arrow","scope"],
    sections:[
      {h:"3 facons de declarer",
        blocks:[
          {code:"// 1. Function declaration (hoisted)\nfunction add(a, b) {\n  return a + b;\n}\n\n// 2. Function expression\nconst sub = function(a, b) {\n  return a - b;\n};\n\n// 3. Arrow function (le plus moderne)\nconst mul = (a, b) => a * b;\nconst greet = name => `Bonjour ${name}`;\nconst noop = () => {};\nconst returnObj = () => ({ a: 1 });  // () autour de l'objet"}
        ]
      },
      {h:"Arrow vs function : <code>this</code>",
        blocks:[
          {p:"Arrow function n'a PAS son propre <code>this</code> — elle herite de la portee parente. Crucial pour les callbacks."},
          {code:"class Timer {\n  constructor() {\n    this.count = 0;\n\n    // ❌ function classique : this devient undefined dans setInterval\n    // setInterval(function() { this.count++; }, 1000);\n\n    // ✅ arrow : this reste lie a l'instance Timer\n    setInterval(() => { this.count++; }, 1000);\n  }\n}"}
        ]
      },
      {h:"Default params + rest",
        blocks:[
          {code:"// Default parameters\nfunction greet(name = 'invite', greeting = 'Bonjour') {\n  return `${greeting} ${name}`;\n}\n\n// Rest operator : capture les args restants\nfunction sum(...nums) {\n  return nums.reduce((a, b) => a + b, 0);\n}\nsum(1, 2, 3, 4); // 10"}
        ]
      },
      {h:"Closures",
        blocks:[
          {p:"Une closure = une fonction qui CAPTURE des variables de son scope parent. La variable reste accessible meme apres que le parent ait fini."},
          {code:"function makeCounter() {\n  let count = 0;   // capture par la closure\n  return {\n    inc: () => ++count,\n    dec: () => --count,\n    get: () => count\n  };\n}\n\nconst counter = makeCounter();\ncounter.inc(); // 1\ncounter.inc(); // 2\ncounter.get(); // 2\n// count est INACCESSIBLE depuis l'exterieur"},
          {tip:"Closures = facon de creer du \"prive\" en JS (avant les classes avec #private)."}
        ]
      }
    ],
    quiz:[
      {q:"Une arrow function a-t-elle son propre <code>this</code> ?",opts:["Oui","Non, elle herite","Seulement dans une classe","Cela depend"],correct:"b",
        expl:"Arrow function = pas de <code>this</code> propre. C'est sa difference majeure avec <code>function</code>."},
      {q:"<code>...args</code> en parametre signifie :",opts:["Spread","Rest","Optional","Decorateur"],correct:"b",
        expl:"Dans la SIGNATURE : REST (collecte). Dans un APPEL : SPREAD (etale)."},
      {q:"Que retourne <code>(() => ({ a: 1 }))()</code> ?",
        opts:["<code>undefined</code>","<code>{ a: 1 }</code>","Erreur","<code>1</code>"],correct:"b",
        expl:"Arrow qui retourne un objet : il faut entourer l'objet de () pour que JS ne le confonde pas avec un bloc."}
    ],
    exercises:[
      {num:1,diff:"easy",title:"Arrow simple",desc:"Arrow qui double un nombre.",
        sol:"const double = n => n * 2;"},
      {num:2,diff:"easy",title:"Arrow multi-args",desc:"Arrow qui additionne 2 nombres.",
        sol:"const add = (a, b) => a + b;"},
      {num:3,diff:"medium",title:"Default param",desc:"Greeter avec parametre 'name' qui vaut 'visiteur' par defaut.",
        sol:"const greet = (name = 'visiteur') => `Bonjour ${name}`;"},
      {num:4,diff:"medium",title:"Rest args",desc:"Fonction max qui prend un nombre quelconque d'args.",
        sol:"const max = (...nums) => Math.max(...nums);"},
      {num:5,diff:"medium",title:"Closure counter",desc:"Fonction qui retourne un compteur incrementant a chaque appel.",
        sol:"function makeCounter() {\n  let count = 0;\n  return () => ++count;\n}\n\nconst c = makeCounter();\nc(); // 1\nc(); // 2"},
      {num:6,diff:"hard",title:"Closure memoize",desc:"Memoize : cache le resultat d'une fonction par argument.",
        sol:"function memoize(fn) {\n  const cache = new Map();\n  return (arg) => {\n    if (cache.has(arg)) return cache.get(arg);\n    const result = fn(arg);\n    cache.set(arg, result);\n    return result;\n  };\n}"}
    ]
  },

  {id:"day-4",code:"J4",title:"Jour 4 - Arrays & objects",sub:"Methodes essentielles, immutabilite",
    why:"95% du code JS manipule arrays et objets. Maitrise leurs methodes.",
    tags:["arrays","objects","immutability"],
    sections:[
      {h:"Methodes essentielles d'array",
        blocks:[
          {table:[
            ["Methode","Retourne","Mute ?"],
            ["<code>map(fn)</code>","Nouveau array","Non"],
            ["<code>filter(fn)</code>","Nouveau array","Non"],
            ["<code>reduce(fn, init)</code>","Valeur","Non"],
            ["<code>find(fn)</code>","Premier match","Non"],
            ["<code>some(fn)</code>","Boolean","Non"],
            ["<code>every(fn)</code>","Boolean","Non"],
            ["<code>includes(val)</code>","Boolean","Non"],
            ["<code>sort(fn)</code>","Le tableau","<strong>OUI</strong>"],
            ["<code>reverse()</code>","Le tableau","<strong>OUI</strong>"],
            ["<code>push/pop/shift/unshift</code>","Element","<strong>OUI</strong>"]
          ]},
          {tip:"Prefere les methodes IMMUABLES (map, filter, reduce). Les mutables casssent souvent du code partage."}
        ]
      },
      {h:"Sort tricky",
        blocks:[
          {code:"// ❌ Sans fonction : compare en string\n[10, 2, 1, 30].sort(); // [1, 10, 2, 30] 😱\n\n// ✅ Avec comparateur\n[10, 2, 1, 30].sort((a, b) => a - b); // [1, 2, 10, 30]\n\n// Tri d'objets\nusers.sort((a, b) => a.age - b.age);\nusers.sort((a, b) => a.name.localeCompare(b.name));\n\n// Copie immuable :\nconst sorted = [...arr].sort((a,b) => a - b);"}
        ]
      },
      {h:"Objects: keys, values, entries",
        blocks:[
          {code:"const user = { name: 'Alice', age: 28 };\n\nObject.keys(user);     // ['name', 'age']\nObject.values(user);   // ['Alice', 28]\nObject.entries(user);  // [['name', 'Alice'], ['age', 28]]\n\n// Iterer\nfor (const [key, value] of Object.entries(user)) {\n  console.log(key, value);\n}\n\n// Object from entries (reverse)\nconst obj = Object.fromEntries([['a', 1], ['b', 2]]);\n// { a: 1, b: 2 }\n\n// Clone shallow\nconst copy = { ...user };\nconst copy2 = Object.assign({}, user);\n\n// Clone deep (simple cas, sans fonctions)\nconst deep = structuredClone(user);  // moderne"}
        ]
      }
    ],
    quiz:[
      {q:"<code>[10, 2, 1].sort()</code> retourne :",opts:["[1, 2, 10]","[10, 2, 1]","[1, 10, 2]","[2, 10, 1]"],correct:"c",
        expl:"Sans comparateur, sort compare en STRING : '10' &lt; '2' alphabetiquement."},
      {q:"<code>map</code> mute-t-il le tableau original ?",opts:["Oui","Non, retourne un nouveau","Selon les cas","Seulement avec arrow"],correct:"b",
        expl:"<code>map</code> est IMMUABLE : il retourne un nouveau tableau."},
      {q:"Pour obtenir les paires [cle, valeur] d'un objet :",
        opts:["<code>Object.keys</code>","<code>Object.values</code>","<code>Object.entries</code>","<code>Object.pairs</code>"],correct:"c",
        expl:"<code>Object.entries(obj)</code> retourne <code>[[k, v], ...]</code>."}
    ],
    exercises:[
      {num:1,diff:"easy",title:"Double tous les nombres",desc:"Map sur [1,2,3] -> [2,4,6].",
        sol:"const doubled = [1,2,3].map(n => n * 2);"},
      {num:2,diff:"easy",title:"Filtrer les pairs",desc:"Garde uniquement les nombres pairs.",
        sol:"const evens = [1,2,3,4,5,6].filter(n => n % 2 === 0);"},
      {num:3,diff:"medium",title:"Tri numerique",desc:"Trie [3, 30, 2, 10] en ordre croissant numerique.",
        sol:"[3, 30, 2, 10].sort((a, b) => a - b); // [2, 3, 10, 30]"},
      {num:4,diff:"medium",title:"Object iteration",desc:"Affiche chaque cle/valeur d'un objet.",
        sol:"const obj = { name: 'Alice', age: 28 };\nfor (const [k, v] of Object.entries(obj)) {\n  console.log(`${k}: ${v}`);\n}"},
      {num:5,diff:"hard",title:"Comptage de chars",desc:"Compte l'occurrence de chaque caractere dans 'hello'.",
        sol:"const count = 'hello'.split('').reduce((acc, c) => {\n  acc[c] = (acc[c] || 0) + 1;\n  return acc;\n}, {});\n// { h: 1, e: 1, l: 2, o: 1 }"}
    ]
  },

  {id:"day-5",code:"J5",title:"Jour 5 - DOM & events",sub:"querySelector, addEventListener, manipulation",
    why:"C'est ce qui rend une page interactive. Indispensable.",
    tags:["DOM","events","interactivity"],
    sections:[
      {h:"Selectionner",
        blocks:[
          {code:"// Un seul element\nconst el = document.getElementById('main');\nconst btn = document.querySelector('.btn');\nconst submit = document.querySelector('button[type=\"submit\"]');\n\n// Plusieurs\nconst links = document.querySelectorAll('a.nav-link');\nlinks.forEach(a => a.classList.add('active'));"},
          {tip:"<code>querySelector</code> = fonctionne avec n'importe quel selecteur CSS. C'est devenu le standard."}
        ]
      },
      {h:"Modifier",
        blocks:[
          {code:"// Texte\nel.textContent = 'Nouveau texte';   // safe (no HTML parsing)\nel.innerHTML = '<b>HTML brut</b>';   // ⚠️ risque XSS\n\n// Attributs\nel.setAttribute('data-id', '42');\nel.dataset.id = '42';                // shortcut data-*\nel.classList.add('actif');\nel.classList.remove('inactif');\nel.classList.toggle('open');\nel.classList.contains('actif');      // boolean\n\n// Style (inline)\nel.style.color = 'red';\nel.style.cssText = 'color:red; font-size:20px';\n\n// Visibilite\nel.hidden = true;\nel.style.display = 'none';"},
          {warn:"<code>innerHTML</code> avec du contenu utilisateur = faille XSS. Utilise <code>textContent</code> ou sanitize."}
        ]
      },
      {h:"Events",
        blocks:[
          {code:"btn.addEventListener('click', (e) => {\n  e.preventDefault();   // empeche le comportement par defaut\n  e.stopPropagation();  // empeche la remontee\n  console.log(e.target);  // l'element clique\n});\n\n// Delegation (un seul listener pour tous les enfants)\nlist.addEventListener('click', (e) => {\n  if (e.target.matches('.item')) {\n    console.log('Item clique :', e.target);\n  }\n});\n\n// Remove\nconst handler = (e) => console.log('hi');\nbtn.addEventListener('click', handler);\nbtn.removeEventListener('click', handler);"},
          {tip:"Delegation = un listener sur le parent au lieu de N listeners sur N enfants. Meilleur pour la perf et pour les elements ajoutes dynamiquement."}
        ]
      },
      {h:"Creer / inserer / supprimer",
        blocks:[
          {code:"// Creer\nconst div = document.createElement('div');\ndiv.className = 'card';\ndiv.textContent = 'Hello';\n\n// Inserer\nparent.appendChild(div);                  // a la fin\nparent.prepend(div);                       // au debut\nparent.insertBefore(div, parent.firstChild);\n\n// Supprimer\ndiv.remove();                              // moderne\nparent.removeChild(div);                   // ancien\n\n// Vider un container\nwhile (parent.firstChild) parent.removeChild(parent.firstChild);\nparent.replaceChildren();                  // moderne"}
        ]
      }
    ],
    quiz:[
      {q:"Plus sur : <code>innerHTML</code> ou <code>textContent</code> ?",opts:["innerHTML","textContent","Les deux","Aucun"],correct:"b",
        expl:"<code>textContent</code> ne parse pas HTML, donc pas de risque XSS."},
      {q:"<code>e.preventDefault()</code> :",
        opts:["Stop la remontee","Empeche le comportement par defaut","Supprime l'element","Bloque le scroll"],correct:"b",
        expl:"<code>preventDefault</code> = empeche le defaut (submit form, navigation lien). <code>stopPropagation</code> = stop la remontee."},
      {q:"Pour ajouter un listener qui reste actif sur des elements futurs :",
        opts:["Event delegation","Re-binder a chaque ajout","Impossible","MutationObserver"],correct:"a",
        expl:"Delegation : listener sur le parent stable + check <code>e.target.matches</code>."}
    ],
    exercises:[
      {num:1,diff:"easy",title:"Hide and show",desc:"Bouton qui cache/montre un element au clic.",
        sol:"document.querySelector('#toggle').addEventListener('click', () => {\n  const box = document.querySelector('#box');\n  box.hidden = !box.hidden;\n});"},
      {num:2,diff:"easy",title:"Class toggle",desc:"Toggle la classe 'active' sur le body au clic d'un bouton.",
        sol:"document.querySelector('button').addEventListener('click', () => {\n  document.body.classList.toggle('active');\n});"},
      {num:3,diff:"medium",title:"Create + append",desc:"Cree un <li> 'Hello' et l'ajoute a une <ul>.",
        sol:"const li = document.createElement('li');\nli.textContent = 'Hello';\ndocument.querySelector('ul').appendChild(li);"},
      {num:4,diff:"medium",title:"Form sans submit",desc:"Empeche le submit et affiche les valeurs en console.",
        sol:"document.querySelector('form').addEventListener('submit', (e) => {\n  e.preventDefault();\n  const data = Object.fromEntries(new FormData(e.target));\n  console.log(data);\n});"},
      {num:5,diff:"hard",title:"Delegation",desc:"Un listener qui detecte le clic sur n'importe quel <li> d'une <ul>.",
        sol:"document.querySelector('ul').addEventListener('click', (e) => {\n  if (e.target.tagName === 'LI') {\n    console.log('clic sur', e.target.textContent);\n  }\n});"}
    ]
  },

  {id:"day-6",code:"J6",title:"Jour 6 - Async, Promises, fetch",sub:"async/await, fetch, gestion erreurs",
    why:"Toute appli web parle au serveur. Sans async, ca freeze l'UI.",
    tags:["async","promises","fetch","await"],
    sections:[
      {h:"Promises",
        blocks:[
          {code:"// Une Promise = une valeur future\nconst p = new Promise((resolve, reject) => {\n  setTimeout(() => resolve('done'), 1000);\n});\n\np.then(value => console.log(value))\n .catch(err => console.error(err))\n .finally(() => console.log('cleanup'));\n\n// Promise.all : attend toutes\nconst [a, b, c] = await Promise.all([fetchA(), fetchB(), fetchC()]);\n\n// Promise.race : la premiere finie gagne\nconst first = await Promise.race([slow, fast]);\n\n// Promise.allSettled : attend toutes, succes ou echec\nconst results = await Promise.allSettled([...]);"}
        ]
      },
      {h:"async / await",
        blocks:[
          {code:"async function loadUser(id) {\n  try {\n    const res = await fetch(`/api/users/${id}`);\n    if (!res.ok) throw new Error('HTTP ' + res.status);\n    const data = await res.json();\n    return data;\n  } catch (err) {\n    console.error('Echec :', err);\n    return null;\n  }\n}\n\n// Utilisation\nconst user = await loadUser(42);"},
          {warn:"<code>await</code> ne fonctionne QUE dans une fonction <code>async</code> (ou au top-level d'un module ES2022+). Sinon : SyntaxError."}
        ]
      },
      {h:"fetch en pratique",
        blocks:[
          {code:"// GET\nconst res = await fetch('/api/users');\nconst users = await res.json();\n\n// POST JSON\nconst res = await fetch('/api/users', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({ name: 'Alice' })\n});\n\n// Avec FormData (upload, multipart)\nconst form = new FormData();\nform.append('photo', fileInput.files[0]);\nform.append('name', 'Alice');\nawait fetch('/upload', { method: 'POST', body: form });\n\n// AbortController (annuler une requete)\nconst ctrl = new AbortController();\nfetch('/long', { signal: ctrl.signal });\nsetTimeout(() => ctrl.abort(), 5000);"}
        ]
      }
    ],
    quiz:[
      {q:"On peut utiliser <code>await</code> :",opts:["Partout","Dans une fonction async","Apres un setTimeout","Dans un if"],correct:"b",
        expl:"<code>await</code> n'est valide que dans une fonction marquee <code>async</code> (ou top-level module)."},
      {q:"Une <code>fetch</code> rejette si :",
        opts:["Status HTTP 404","Status HTTP 500","Erreur reseau","Toutes les erreurs HTTP"],correct:"c",
        expl:"<code>fetch</code> ne rejette QUE pour les erreurs reseau. Pour 4xx/5xx, c'est <code>res.ok === false</code>."},
      {q:"<code>Promise.all</code> :",
        opts:["Attend toutes","S'arrete a la 1ere","Ignore les erreurs","Aleatoire"],correct:"a",
        expl:"<code>Promise.all</code> = attend toutes ; rejette des qu'une rejette."}
    ],
    exercises:[
      {num:1,diff:"easy",title:"Fetch users",desc:"Recupere la liste des users a /api/users en JSON.",
        sol:"async function getUsers() {\n  const res = await fetch('/api/users');\n  return await res.json();\n}"},
      {num:2,diff:"medium",title:"Post JSON",desc:"Envoie {name:'Bob'} en POST a /api/users.",
        sol:"async function createUser() {\n  const res = await fetch('/api/users', {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify({ name: 'Bob' })\n  });\n  return await res.json();\n}"},
      {num:3,diff:"medium",title:"Gestion erreur",desc:"Fetch avec try/catch + check de status.",
        sol:"async function safe(url) {\n  try {\n    const res = await fetch(url);\n    if (!res.ok) throw new Error('HTTP ' + res.status);\n    return await res.json();\n  } catch (e) {\n    console.error(e);\n    return null;\n  }\n}"},
      {num:4,diff:"hard",title:"Parallel fetch",desc:"Fetch 3 endpoints en PARALLELE.",
        sol:"const [users, posts, comments] = await Promise.all([\n  fetch('/api/users').then(r => r.json()),\n  fetch('/api/posts').then(r => r.json()),\n  fetch('/api/comments').then(r => r.json())\n]);"},
      {num:5,diff:"hard",title:"Debounce search",desc:"Lance la requete 300ms apres le dernier input.",
        sol:"let timer;\ninput.addEventListener('input', (e) => {\n  clearTimeout(timer);\n  timer = setTimeout(() => {\n    fetch(`/search?q=${e.target.value}`);\n  }, 300);\n});"}
    ]
  },

  {id:"day-7",code:"J7",title:"Jour 7 - ES6+ avance & projet",sub:"Modules, classes, Map/Set, Optional Chaining, projet",
    why:"Le JS moderne en 2026 = ce qui suit. Indispensable pour le code pro.",
    tags:["ES6","modules","classes","project"],
    sections:[
      {h:"Modules (import/export)",
        blocks:[
          {code:"// utils.js\nexport const add = (a, b) => a + b;\nexport const sub = (a, b) => a - b;\nexport default function multiply(a, b) { return a * b; }\n\n// app.js\nimport multiply, { add, sub } from './utils.js';\n// Avec rename\nimport { add as plus } from './utils.js';\n// Tout\nimport * as utils from './utils.js';"},
          {tip:"Les modules sont <code>strict mode</code> par defaut, scope isole, et <code>this</code> top-level est undefined (pas window)."}
        ]
      },
      {h:"Classes",
        blocks:[
          {code:"class User {\n  // Champs prives (avec #)\n  #password;\n\n  constructor(name, email) {\n    this.name = name;\n    this.email = email;\n  }\n\n  // Methode d'instance\n  greet() {\n    return `Bonjour ${this.name}`;\n  }\n\n  // Static (sur la classe, pas l'instance)\n  static fromJSON(json) {\n    const data = JSON.parse(json);\n    return new User(data.name, data.email);\n  }\n\n  // Getter/setter\n  get displayName() {\n    return this.name.toUpperCase();\n  }\n}\n\n// Heritage\nclass Admin extends User {\n  constructor(name, email, perms) {\n    super(name, email);\n    this.perms = perms;\n  }\n  canEdit() { return this.perms.includes('edit'); }\n}\n\nconst u = new User('Alice', 'a@x.fr');\nu.greet();              // 'Bonjour Alice'\nu.displayName;          // 'ALICE'\nUser.fromJSON('{...}'); // Static"}
        ]
      },
      {h:"Map et Set",
        blocks:[
          {code:"// Map : objet-like mais cles de n'importe quel type\nconst m = new Map();\nm.set('key', 'value');\nm.set(42, 'num key');\nm.set({ id: 1 }, 'object key');\nm.get('key');         // 'value'\nm.has(42);            // true\nm.size;\nm.delete('key');\n\nfor (const [k, v] of m) { ... }\n\n// Set : valeurs uniques\nconst s = new Set([1, 2, 2, 3]);  // {1, 2, 3}\ns.add(4);\ns.has(2);\ns.size;\n[...s];               // back to array"}
        ]
      },
      {h:"Projet final : TODO list",
        blocks:[
          {list:[
            "<strong>HTML</strong> : input + bouton ajouter + liste de tasks",
            "<strong>Add</strong> : valider le champ, creer un objet { id, text, done }, ajouter au DOM + en memoire",
            "<strong>Toggle</strong> : checkbox qui marque done -> ligne barree",
            "<strong>Delete</strong> : bouton x sur chaque task",
            "<strong>Persistence</strong> : sauvegarde en localStorage",
            "<strong>Filter</strong> : 3 boutons (all / actives / done)",
            "<strong>Counter</strong> : '3 taches restantes'",
            "<strong>Bonus</strong> : drag-and-drop pour reordonner, animations CSS"
          ]}
        ]
      }
    ],
    quiz:[
      {q:"Pour rendre un champ de classe prive :",opts:["<code>private name</code>","<code>#name</code>","<code>__name</code>","<code>_name</code>"],correct:"b",
        expl:"<code>#field</code> = champ prive natif (depuis ES2022). <code>_name</code> est juste une CONVENTION non appliquee."},
      {q:"Un <code>Set</code> autorise les doublons ?",opts:["Oui","Non","Selon le type","Avec une option"],correct:"b",
        expl:"<code>Set</code> = valeurs UNIQUES. Ajouter un doublon ne fait rien."}
    ],
    exercises:[
      {num:1,diff:"easy",title:"Export named",desc:"Module qui exporte add et sub.",
        sol:"// utils.js\nexport const add = (a, b) => a + b;\nexport const sub = (a, b) => a - b;"},
      {num:2,diff:"medium",title:"Classe Counter",desc:"Class avec count, methodes inc/dec/get.",
        sol:"class Counter {\n  #count = 0;\n  inc() { return ++this.#count; }\n  dec() { return --this.#count; }\n  get value() { return this.#count; }\n}"},
      {num:3,diff:"medium",title:"Set unique",desc:"Dedupe un tableau avec Set.",
        sol:"const unique = [...new Set([1, 2, 2, 3, 3, 3])];\n// [1, 2, 3]"},
      {num:4,diff:"hard",title:"Heritage Admin",desc:"Class Admin qui hertie de User avec methode canEdit.",
        sol:"class User {\n  constructor(name) { this.name = name; }\n  greet() { return `Bonjour ${this.name}`; }\n}\nclass Admin extends User {\n  constructor(name, perms) {\n    super(name);\n    this.perms = perms;\n  }\n  canEdit() { return this.perms.includes('edit'); }\n}\n\nconst a = new Admin('Alice', ['edit', 'view']);\na.canEdit();  // true\na.greet();    // 'Bonjour Alice'"}
    ]
  }
];

const GIO = [
  {id:"w3-intro",code:"B1",level:"basic",title:"JS Intro",sub:"Qu'est-ce que JavaScript",tags:["intro","basics"],
    sections:[{h:"JS c'est quoi ?",blocks:[
      {p:"JavaScript est le langage de PROGRAMMATION du web. Il rend les pages interactives : reagir aux clics, animer, recuperer des donnees, valider des formulaires."},
      {p:"Tourne dans le navigateur (cote client) ET sur serveur (Node.js)."},
      {note:"JavaScript ≠ Java. Aucun rapport. C'est juste un mauvais choix de nom des annees 90."}
    ]}],
    quiz:[{q:"JavaScript et Java :",opts:["Cousins proches","Aucun rapport","Le meme","Java appelle JS"],correct:"b",
      expl:"Aucun rapport technique."}]
  },
  {id:"w3-where",code:"B2",level:"basic",title:"JS Where To",sub:"Inline, internal, external",tags:["basics"],
    sections:[{h:"3 facons",blocks:[
      {code:"<!-- Inline (a eviter) -->\n<button onclick=\"alert('hi')\">Click</button>\n\n<!-- Internal -->\n<script>\n  console.log('hello');\n</script>\n\n<!-- External (recommande) -->\n<script src=\"app.js\" defer></script>"},
      {tip:"<code>defer</code> = execute apres parsing du HTML (preserve l'ordre). <code>async</code> = des que dispo (pas d'ordre garanti). Pour l'UI : <code>defer</code>."}
    ]}],
    quiz:[{q:"<code>defer</code> dans <code>&lt;script&gt;</code> :",opts:["Execute apres parsing HTML","Execute des que dispo","Bloque le parsing","Synchrone"],correct:"a",
      expl:"<code>defer</code> attend que le DOM soit pret avant d'executer le script."}]
  },
  {id:"w3-output",code:"B3",level:"basic",title:"JS Output",sub:"console.log, alert, document.write, innerHTML",tags:["basics"],
    sections:[{h:"4 moyens",blocks:[
      {code:"console.log('debug');               // ✅ TOUJOURS pour debug\nalert('Hello');                     // ⚠️ bloque l'UI\ndocument.getElementById('x').innerHTML = '...';  // modifier le DOM\ndocument.write('...');              // ❌ NE JAMAIS UTILISER"}
    ]}],
    quiz:[{q:"Pour debugger :",opts:["<code>alert</code>","<code>console.log</code>","<code>document.write</code>","<code>print</code>"],correct:"b",
      expl:"<code>console.log</code> ne bloque pas et s'integre dans le devtools."}]
  },
  {id:"w3-variables",code:"B4",level:"basic",title:"JS Variables",sub:"let, const, var",tags:["variables","basics"],
    sections:[{h:"3 mots-cles",blocks:[
      {code:"const x = 5;     // ✅ non reassignable (preferer)\nlet y = 10;      // ✅ reassignable\nvar z = 15;      // ❌ scope confus (a eviter)"}
    ]}],
    quiz:[{q:"Pour une constante :",opts:["<code>var</code>","<code>let</code>","<code>const</code>","<code>final</code>"],correct:"c",
      expl:"<code>const</code> = pas de reassignation."}]
  },
  {id:"w3-operators",code:"B5",level:"basic",title:"JS Operators",sub:"Arithmetic, assignment, comparison",tags:["operators","basics"],
    sections:[{h:"Operateurs",blocks:[
      {code:"// Arithmetique\n+ - * / % **\n\n// Assignment\n=  +=  -=  *=  /=  ||=  ??=\n\n// Comparison (TOUJOURS strict)\n===  !==  >  <  >=  <=\n\n// Logique\n&&  ||  !  ??\n\n// Spread / rest\n...arr  ...args"}
    ]}],
    quiz:[{q:"<code>**</code> =",opts:["Multiplication","Puissance","Pointeur","Concat"],correct:"b",
      expl:"<code>2 ** 3 = 8</code>. Equivalent a <code>Math.pow(2, 3)</code>."}]
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
    quiz:[{q:"<code>typeof []</code> retourne :",opts:["'array'","'object'","'list'","'iterable'"],correct:"b",
      expl:"En JS, tous les arrays sont des objects. Pour tester : <code>Array.isArray(x)</code>."}]
  },
  {id:"w3-functions",code:"I1",level:"intermediate",title:"JS Functions",sub:"declaration, parametres, return",tags:["functions","intermediate"],
    sections:[{h:"Defaults & rest",blocks:[
      {code:"function greet(name = 'invite') {\n  return `Bonjour ${name}`;\n}\n\nfunction sum(...nums) {\n  return nums.reduce((a, b) => a + b, 0);\n}\nsum(1, 2, 3, 4); // 10"}
    ]}],
    quiz:[{q:"<code>...nums</code> en parametre =",opts:["Spread","Rest","Optional","Decorateur"],correct:"b",
      expl:"Signature = REST. Appel = SPREAD."}]
  },
  {id:"w3-arrow",code:"I2",level:"intermediate",title:"JS Arrow Functions",sub:"=> shorthand",tags:["arrow","intermediate"],
    sections:[{h:"Syntaxe",blocks:[
      {code:"const f = () => 42;\nconst sq = x => x * x;\nconst add = (a, b) => a + b;\nconst many = (a, b) => {\n  const c = a + b;\n  return c * 2;\n};\nconst obj = () => ({ a: 1 });  // ()"}
    ]}],
    quiz:[{q:"Arrow function a son propre <code>this</code> ?",opts:["Oui","Non, herite","Toujours window","Erreur"],correct:"b",
      expl:"Arrow = pas de this propre. Difference cle avec function."}]
  },
  {id:"w3-arrays",code:"I3",level:"intermediate",title:"JS Arrays",sub:"map, filter, reduce, find",tags:["arrays","intermediate"],
    sections:[{h:"Methodes essentielles",blocks:[
      {code:"const arr = [1, 2, 3, 4, 5];\narr.map(n => n * 2);            // [2,4,6,8,10]\narr.filter(n => n > 2);          // [3,4,5]\narr.reduce((acc, n) => acc + n, 0); // 15\narr.find(n => n === 3);          // 3\narr.some(n => n > 4);            // true\narr.every(n => n > 0);           // true\narr.includes(3);                  // true"}
    ]}],
    quiz:[{q:"Quelle methode mute l'array ?",opts:["<code>map</code>","<code>filter</code>","<code>sort</code>","<code>find</code>"],correct:"c",
      expl:"<code>sort</code> et <code>reverse</code> MUTENT. Pour eviter : <code>[...arr].sort()</code>."}]
  },
  {id:"w3-objects",code:"I4",level:"intermediate",title:"JS Objects",sub:"keys, values, entries, spread",tags:["objects","intermediate"],
    sections:[{h:"Utilites",blocks:[
      {code:"Object.keys(obj);\nObject.values(obj);\nObject.entries(obj);\nObject.fromEntries(pairs);\nObject.assign({}, a, b);\n{ ...a, ...b };\nstructuredClone(obj);  // deep clone moderne"}
    ]}],
    quiz:[{q:"Pour clone profond :",opts:["<code>...obj</code>","<code>Object.assign</code>","<code>structuredClone</code>","<code>JSON.parse(JSON.stringify())</code>"],correct:"c",
      expl:"<code>structuredClone</code> = standard moderne. JSON.* perd les fonctions/dates."}]
  },
  {id:"w3-dom",code:"I5",level:"intermediate",title:"JS DOM",sub:"querySelector, classList, dataset",tags:["DOM","intermediate"],
    sections:[{h:"Interagir",blocks:[
      {code:"const el = document.querySelector('.card');\nel.classList.toggle('active');\nel.dataset.id = '42';\nel.textContent = 'safe';\nel.style.color = 'red';"}
    ]}],
    quiz:[{q:"Pour modifier du texte sans risque XSS :",opts:["<code>innerHTML</code>","<code>textContent</code>","<code>innerText</code>","<code>html()</code>"],correct:"b",
      expl:"<code>textContent</code> ne parse pas le HTML."}]
  },
  {id:"w3-events",code:"I6",level:"intermediate",title:"JS Events",sub:"addEventListener, delegation",tags:["events","intermediate"],
    sections:[{h:"Listener moderne",blocks:[
      {code:"el.addEventListener('click', (e) => {\n  e.preventDefault();\n  e.stopPropagation();\n});\n\n// Delegation\nparent.addEventListener('click', (e) => {\n  if (e.target.matches('.btn')) { ... }\n});"}
    ]}],
    quiz:[{q:"Pour empecher le submit par defaut :",opts:["<code>return false</code>","<code>preventDefault()</code>","<code>stopPropagation()</code>","<code>cancel()</code>"],correct:"b",
      expl:"<code>e.preventDefault()</code>."}]
  },
  {id:"w3-async",code:"A1",level:"advanced",title:"JS Async / Promises",sub:"Promise, async/await, fetch",tags:["async","promises","advanced"],
    sections:[{h:"async / await",blocks:[
      {code:"async function loadUser(id) {\n  try {\n    const res = await fetch(`/api/users/${id}`);\n    if (!res.ok) throw new Error('HTTP ' + res.status);\n    return await res.json();\n  } catch (err) {\n    console.error(err);\n    return null;\n  }\n}"}
    ]}],
    quiz:[{q:"<code>await</code> fonctionne dans :",opts:["Partout","Une fonction async","Tout sauf if","Que dans module"],correct:"b",
      expl:"<code>async</code> requise (ou top-level d'un module)."}]
  },
  {id:"w3-modules",code:"A2",level:"advanced",title:"JS Modules",sub:"import / export",tags:["modules","advanced"],
    sections:[{h:"Syntaxe ESM",blocks:[
      {code:"// math.js\nexport const PI = 3.14;\nexport function add(a, b) { return a + b; }\nexport default function multiply(a, b) { return a * b; }\n\n// app.js\nimport multiply, { PI, add } from './math.js';"},
      {note:"Dans le navigateur : <code>&lt;script type=\"module\"&gt;</code> pour activer ESM."}
    ]}],
    quiz:[{q:"Combien d'export <code>default</code> par module ?",opts:["1","2","Illimite","0"],correct:"a",
      expl:"Un seul default par module."}]
  },
  {id:"w3-classes",code:"A3",level:"advanced",title:"JS Classes",sub:"class, extends, #private",tags:["classes","OOP","advanced"],
    sections:[{h:"Class complete",blocks:[
      {code:"class User {\n  #password;  // prive\n  constructor(name) {\n    this.name = name;\n  }\n  greet() { return `Bonjour ${this.name}`; }\n  static fromJSON(j) { return new User(JSON.parse(j).name); }\n}\n\nclass Admin extends User {\n  constructor(name, perms) {\n    super(name);\n    this.perms = perms;\n  }\n}"}
    ]}],
    quiz:[{q:"Champs prives natifs :",opts:["<code>private x</code>","<code>#x</code>","<code>__x</code>","<code>_x</code>"],correct:"b",
      expl:"<code>#field</code> depuis ES2022."}]
  }
];

const ALL_LESSONS = [...DAYS, ...GIO];
const TOTAL = ALL_LESSONS.length;
const TOTAL_EXERCISES = DAYS.reduce((sum, d) => sum + (d.exercises ? d.exercises.length : 0), 0);
