/* Describes a Section of the Playset (like Relationships, Needs, Objets, Locations, ...) */
function sectionVM(title, number) {
  var self = this;

  self.title = ko.observable(title);
  self.number = ko.observable(number);
  self.titleValue = ko.pureComputed({
    read: function() { return self.title(); },
    write: function(value) {
      self.title(value);
      if (self.displayedSection != undefined) {
        self.displayedSection().title(value);
      }
    }
  });

  /* Displaying the section */
  self.displayedSection = ko.observable(new displayedSectionVM(self.title(), self.number(), false));
  self.isVisible = ko.pureComputed(function()
    {
       return self.displayedSection().isVisible();
    }, self);

  /* Categories of the Section */
  self.categories = ko.observableArray([]);
  for (var i = 1; i <= 6; i++) {
    self.categories.push(new categoryVM(i, 'Category #' + i));
  }

  /* Details of the Section (by Category) */
  self.details = ko.pureComputed(function() {
    var listDetails = [];
    for (var iCategory = 0; iCategory < self.categories().length; iCategory++) {
      var category = self.categories()[iCategory];
      for (var iDetail = 0; iDetail < category.items().length; iDetail++) {
        listDetails.push(category.items()[iDetail]);
      }
    }
    return listDetails;
  }, self);

  /* Getting an Item of the Section from JSON object */
  self.getItemFromJson = function(json) {
    for (var iDetail = 0; iDetail < self.details().length; iDetail++) {
      var detail = self.details()[iDetail];
      if ((detail.number() == json.number) && (detail.categoryVM().number() == json.category))
      {
        return detail;
      }
    }
    return null;
  }
}
