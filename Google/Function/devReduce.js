var array = [{
  cfo: 'илья',
  sum: 1
}, {
  cfo: 'семья',
  sum: 2
}, {
  cfo: 'илья',
  sum: 2
}]
var reducers = {
  ilya: function (sum, array) {
    if (array.cfo == 'илья') {
      sum += array.sum
    }
    return sum
  },
  family: function (sum, array) {
    if (array.cfo == 'семья') {
      sum += array.sum
    }
    return sum
  }
}

combineReducers = function (reducers) {
  return function(state, item) {
    return Object.keys(reducers).reduce(function(nextState, key) {
      reducers[key](state, item);
      return state;
    }, {});
  }
};
var priceReducer = combineReducers(reducers)
var total = array.reduce(priceReducer, {
  ilya: 0, 
  family: 0, 
})
console.log(total)