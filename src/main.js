(function () {
  new Fingerprint2().get(function(result){
      console.log(result);
      $.post('/identified', {'ident': result}, function(data) {
      });
  });
})();
