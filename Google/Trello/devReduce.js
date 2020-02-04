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
  ilya: function (state, item) {
    if (item.cfo == 'илья') {
      state.ilya += item.sum
    }
    return state.ilya
  },
  family: function (state, item) {
    if (item.cfo == 'семья') {
      state.family += item.sum
    }
    return state.family
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