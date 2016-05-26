function instasetupVM(playset) {

  self.playsetVM = ko.observable(playset);

  /* First section of the Insta-Setup */
  self.firstSection = ko.observable(playset.sections()[0]);
  self.firstSectionChoice1 = ko.observable(self.firstSection().details()[0]);
  self.firstSectionChoice2 = ko.observable(self.firstSection().details()[6]);
  self.firstSectionChoice3 = ko.observable(self.firstSection().details()[12]);
  self.firstSectionChoice4 = ko.observable(self.firstSection().details()[18]);
  self.firstSectionChoice5 = ko.observable(self.firstSection().details()[24]);

  /* Second section of the Insta-Setup */
  self.secondSection = ko.observable(playset.sections()[1]);
  self.secondSectionChoice1 = ko.observable(self.secondSection().details()[0]);
  self.secondSectionChoice2 = ko.observable(self.secondSection().details()[6]);

  /* Third section of the Insta-Setup */
  self.thirdSection = ko.observable(playset.sections()[2]);
  self.thirdSectionChoice1 = ko.observable(self.thirdSection().details()[0]);
  self.thirdSectionChoice2 = ko.observable(self.thirdSection().details()[6]);

  /* Fourth section of the Insta-Setup */
  self.fourthSection = ko.observable(playset.sections()[3]);
  self.fourthSectionChoice1 = ko.observable(self.fourthSection().details()[0]);
}
