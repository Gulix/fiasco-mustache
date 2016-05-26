/* Describes a Category inside a Section of the Playset (there are 6 categories in a Section) */
function categoryVM(number, title) {
  var self = this;

  self.title = ko.observable(title);
  self.number = ko.observable(number);

  /* Items of the Category */
  self.items = ko.observableArray([]);
  for (var i = 1; i <= 6; i++) {
    self.items.push(new itemVM(i, 'Item #' + i, self));
  }

  /* Show / Hide items */
  self.showingItems = ko.observable(true);
  self.showItems = function() {
    self.showingItems(true);
  }
  self.hideItems = function() {
    self.showingItems(false);
  }
}
