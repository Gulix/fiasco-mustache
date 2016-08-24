/* Describes a Section displayed in the editor, like the Sections, but also the Introduction, the Insta-Setup, ...*/
function displayedSectionVM(title, code, isVisible) {
  var self = this;

  self.title = ko.observable(title);
  self.code = ko.observable(code);
  self.isVisible = ko.observable(isVisible)

  self.displayedTitle = ko.pureComputed(function() {
    if (self.title().length == 0)
    {
      return "Section #" + self.code();
    }
    return self.title();
  });

  self.show = function() {
    if (self.hideOthers != undefined) {
      self.hideOthers();
      self.isVisible(true);
    }
  }
}
