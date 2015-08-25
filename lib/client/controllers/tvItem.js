Template.tvItem.helpers({
  'first': function () {
    return this.index == 0;
  },
  'posterExists' : function () {
    return this.poster_path != "";
  }
})
