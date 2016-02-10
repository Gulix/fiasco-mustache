/****************************
**  JSON related functions **
****************************/

/**
 * Get the JSON data from what has been set in the UI
 * @param  {boolean} withDescriptionParts      - Is the description splitted in parts ?
 * @param  {boolean} withDescriptionParagraphs - Is the description splitted in paragraphs ?
 * @return {json} Playset in JSON format
 */
function get_json_fromUI(withDescriptionParts, withDescriptionParagraphs)
{
  var jsonData = { };

  // Generic elements
  jsonData.title = $('#input_title').val();
  jsonData.subtitle = $('#input_subtitle').val();
  jsonData.teaser = $('#input_teaser').val();

  // Description is one field
  json_set_description(jsonData, withDescriptionParts, withDescriptionParagraphs);

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

/**
 * Fill the "Description" part of the Json playset, from the UI
 * @param {json} jsonData - The JSON data for the Playset, which will be completed
 * @param {boolean} withParts - Is the description splitted in parts ? (Presentation, Movie Night, Advices, ...)
 * @param {boolean} withParagraphs - Is the text splitted in paragraphs ? (Each line is a json data object)
 */
function json_set_description(jsonData, withParts, withParagraphs)
{
  jsonData.description = $('#input_description').val();

  if (withParts)
  {
    json_set_description_parts(jsonData);
  }

  if (withParagraphs)
  {
    json_set_description_paragraphs(jsonData);
  }
}

/**
 * Add a "description_parts" object to JSON
 * The Description part is split in objects {keys, value} (title, content)
 * @param {json} jsonData The json playset object
 */
function json_set_description_parts(jsonData)
{
  jsonData["description_parts"] = { };
  var arrayOfLines = jsonData.description.match(/[^\r\n]+/g);
  // Lines starting with '#' represent the "Parts"
  // The subsequent lines are the content of these Parts, until anoter "Part" is found
  var currentPart = ' ';
  var currentContent = '';
  var existingParts = [ ];
  for (var iLine = 0; iLine < arrayOfLines.length; iLine++)
  {
    var sLine = arrayOfLines[iLine];
    // Is this line the start of a new part ?
    if (sLine.substring(0, 1) === '#')
    {
      json_add_description_part(jsonData.description_parts, currentPart, currentContent);

      currentContent = '';
      currentPart = sLine.substring(1).trim();
    }
    else // Or is this a new line of content ?
    {
      if (currentContent.length > 0)
      {
        currentContent += '\n';
      }
      currentContent += sLine;
    }
  }
  json_add_description_part(jsonData.description_parts, currentPart, currentContent);
}

/**
 * Add a part of the description
 * @param {json} jsonDescriptionParts   json object which will contain the parts
 * @param {string} part                 Name of the part (Presentation, Movie Night, ...)
 * @param {string} content              Content to be put in the part
 */
function json_add_description_part(jsonDescriptionParts, part, content)
{
  if ((part.length > 0) && (content.length > 0))
  {
    while (jsonDescriptionParts.hasOwnProperty(part))
    {
      part += '-';
    }
    jsonDescriptionParts[part] = content;
  }
}

function json_set_description_paragraphs(jsonData)
{
  jsonData["description_paragraphs"] = [ ];
  var arrayOfLines = jsonData.description.match(/[^\r\n]+/g);
  for (var iLine = 0; iLine < arrayOfLines.length; iLine++)
  {
    var sLine = arrayOfLines[iLine];
    // Is this line a Title (starts with #)
    if (sLine.substring(0, 1) === '#')
    {
      jsonData.description_paragraphs.push({ "content": sLine.substring(1).trim(), "type": "title" });
    }
    else // Or is this a new line of content ?
    {
      jsonData.description_paragraphs.push({ "content": sLine, "type": "paragraph" });
    }
  }
}
