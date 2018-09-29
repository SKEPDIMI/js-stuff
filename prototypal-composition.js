/**
 * COMPOSITION:
 * The act of creating an object from a collection
 * of other objects. (OLOO)
 * 
 * JavaScript favors prototypal inheritance over
 * classical inheritance
 */

// helpers
var __slice = [].slice
var log = m => console.log(m)

/**
 * Concatenative
 */

// MIXINS

function extend() {
  var consumer = arguments[0],
      // the behaviour we want to mix in
      providers = __slice.call(arguments, 1),
      key,
      i,
      provider;

  for(i = 0; i < providers.length; i++) {
    provider = providers[i];
    for (key in provider) {
      if (provider.hasOwnProperty(key)) {
        consumer[key] = provider[key]
      }
    }
  }

  return consumer
}

var me = {
  firstName: 'john',
  lastName: 'diaz'
}

var person = {
  rename(firstName, lastName) {
    if (firstName) this.firstName = firstName
    if (lastName) this.lastName = lastName

    return this
  },
  greet() {
    log(`hello! my name is ${this.firstName}`)
  }
}

var worker = {
  work() {
    let profit = Math.random() * 100
    
    log(`${this.firstName} generated $${profit}`)
    return profit
  }
}

var john = extend(me, person, worker);

john.greet()
john.work()

// OBJECT.ASSIGN

// animal sub-classes
const dog = state => ({
  bark() {
    log(`bark! (translation: Hello! I'm "${state.name}")`)
  },
  bite() {
    log(`${state.name} just bit! ouch!`)
  }
});

const cat = state => ({
  meow() {
    log(`meow! (translation: Hi! I'm "${state.name}")`)
  },
  scratch() {
    log(`${state.name} just scratched! ouch!`)
  }
});

// robot sub-classes
const driver = state => ({
  drive(distance) {
    state.position += distance
    log(state.name + ' just moved to ' + state.position)
  }
});

const killer = state => ({
  kill() {
    log(`${state.name}: EXTERMINATE!!`)
  }
});

// our object

const drivingKillerRobotDog = name => {
  let state = {
    name,
    speed: 10,
    position: 0
  }

  return Object.assign(
    {},
    killer(state),
    dog(state),
    driver(state)
  )
};

const myPet = drivingKillerRobotDog('peck');
myPet.drive(5);
myPet.bark();
myPet.kill();

/**
 * FUNCTIONAL
 */

const Dog = function(name) {
  this.name = name
}

Dog.prototype.bark = function () {
  console.log(`Bark! I'm ${this.name}`)
}

const fido = new Dog('fido');
fido.bark();

/**
 * DELEGATION
 */
