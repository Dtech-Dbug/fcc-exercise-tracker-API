# [Exercise Tracker](https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker)

## Schema Design

```js
//user schema
let userSchema = Schema({
  username: String,
});

//exercise schema
let exerciseSchema = new Schema({
  username: String,
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: String,
});

//logs schema
let logsSchema = new Schema({
  username: String,
  count: Number,
  log: [
    {
      _id: false,
      description: String,
      duration: Number,
      date: String,
    },
  ],
});
```

## Endpoints and Responses

### Create User

- endpoint: `"/api/users"`
- method: **POST**

### Get Users

- endpoint: `"/api/users"`
- method: GET
- response 👇

```js
[
  {
    _id: "61980e4e3fa3d93818ee5f4d",
    username: "Dtech-Dbug",
  },
  {
    _id: "61980e573fa3d93818ee5f4f",
    username: "scorpiohnoo",
  },
];
```

### Create Exercise

- endpoint: `"/api/users/:id/exercises"`
- method: POST

### Get Exercises based on users

- endpoint: `"/api/users/:id/exercises"`
- method: GET
- response 👇

```js
[
  {
    _id: "61982245e6b2750c9df084ad",
    username: "scorpiohnoo",
    description: "sleep",
    duration: 7,
    date: "Fri Nov 19 2021",
    __v: 0,
  },
  {
    _id: "61994ee86500318eb70e2a95",
    username: "scorpiohnoo",
    description: "code",
    duration: 60,
    date: "Sat Nov 20 2021",
    __v: 0,
  },
];
```

### Get user specific Logs

- endpoint: `/api/users/:id/logs`
- method: GET
- response 👇

```js
{
  "username": "scorpiohnoo",
  "count": 3,
  "log": [
    {
      "description": "sleep",
      "duration": 7,
      "date": "function toDateString() { [native code] }"
    },
    {
      "description": "sleep",
      "duration": 7,
      "date": "Fri Nov 19 2021"
    },
    {
      "description": "code",
      "duration": 60,
      "date": "Sat Nov 20 2021"
    }
  ],
  "_id": "619963a366ea8ac7270995bc",
  "__v": 0
}
```

---

<h4>Find the hosted link to Replit:(https://fcc-exercisetracker.dwaipayanchakro.repl.co) </h4>

<h4>Find the Replit:(https://replit.com/@DwaipayanChakro/fcc-exercisetracker#server.js)</h4>
