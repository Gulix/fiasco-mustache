/*****************************************
  JSON related functions
/*****************************************/

function get_generated_json()
{
  var jsonData = { };

  // Generic elements
  jsonData.title = $('#input_title').val();
  jsonData.subtitle = $('#input_subtitle').val();
  jsonData.teaser = $('#input_teaser').val();
  jsonData.presentation = $('#input_presentation').val();
  jsonData.inspirations = $('#input_inspirations').val();
  jsonData.advices = $('#input_advices').val();
  jsonData.credits = $('#input_credits').val();

  // Tables of elements
  jsonData.sections = [];
  // Each section
  for(var iSection = 1; iSection <= 4; iSection++) {
      var jsonSection = { label: $('#sec'+iSection).val() };
      // A unique property for the label
      jsonData["section"+iSection] = jsonSection.label;
      jsonSection.categories = [];
      // Each category
      for (var iCategory = 1; iCategory <= 6; iCategory++) {
          var jsonCategory = { label: $('#sec' + iSection + '_cat' + iCategory).val() };
          // A unique property for the label
          jsonData["section"+iSection+"_category"+iCategory] = jsonCategory.label;
          jsonCategory.details = [];
          // Each detail
          for (var iDetail = 1; iDetail <= 6; iDetail++) {
              jsonCategory.details[iDetail - 1] = { label: $('#sec' + iSection + '_cat' + iCategory + '_detail' + iDetail).val() };
              // A unique property for the label
              jsonData["section"+iSection+"_category"+iCategory+"_detail"+iDetail] = jsonCategory.details[iDetail - 1].label;
          }
          jsonSection.categories[iCategory - 1] = jsonCategory;
      }
      jsonData.sections[iSection-1] = jsonSection;
  }

  // All elements with a single property


  jsonData.instasetup = get_instasetup_json();

  return jsonData;
}

/**
 * Get the Insta-Setup informations
 * @return {json} the data in json format
 */
function get_instasetup_json()
{
  var jsonIS = [];
  for (var iSection = 1; iSection <= 4; iSection++)
  {
    if ( $("#insta-setup-section-choice" + iSection).length) {
      var jsonSectionIS = { };
      jsonSectionIS.id = $("#insta-setup-section-choice" + iSection).val();
      jsonSectionIS.values = [];
      for (var iElement = 1; iElement <= 4; iElement++)
      {
        if ($("#insta-setup-section-choice" + iSection + "-element-choice" + iElement).length) {
          jsonSectionIS.values.push($("#insta-setup-section-choice" + iSection + "-element-choice" + iElement).val());
        }
      }

      jsonIS.push(jsonSectionIS);
    }
  }
  return jsonIS;
}
