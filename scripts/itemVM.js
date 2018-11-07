/* Describes an item inside a Category of a Section */
function itemVM(number, text, categoryVM) {
  var self = this;

  self.textValue = ko.observable(text);
  self.number = ko.observable(number);
  self.categoryVM = ko.observable(categoryVM);

  self.titleWithCategory = ko.pureComputed(function() {
    return self.categoryVM().number() + ". " + self.categoryVM().title() + " - " + self.textValue();
  }, self);
}
