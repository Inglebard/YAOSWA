module.exports = {
    round: function (value, accuracy, keep) {
      if (typeof value !== 'number') return value;

      var fixed = value.toFixed(accuracy);

      return keep ? fixed : +fixed;
    },
}
