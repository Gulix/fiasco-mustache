/****************************
**  JSON related functions **
****************************/

/* Get the JSON data from the ViewModel */
function get_json_fromPlaysetVM(playsetVM, withDescriptionParts, withDescriptionParagraphs)
{
  var jsonData = { };

  // Generic elements
  jsonData.title = playsetVM.playsetTitle();
  jsonData.subtitle = playsetVM.playsetSubtitle();
  jsonData.teaser = playsetVM.playsetTeaser();
  jsonData.cover = playsetVM.playsetCover();

  // Description is one field
  json_set_description(jsonData, playsetVM.playsetDescription(), withDescriptionParts, withDescriptionParagraphs);

  jsonData.credits = playsetVM.playsetCredits();

  // Tables of elements
  jsonData.sections = [];
  // Each section
  for(var iSection = 0; iSection < playsetVM.sections().length; iSection++) {
      var currentSection = playsetVM.sections()[iSection];
      var jsonSection = { label: currentSection.title() };
      // A unique property for the label
      jsonData["section"+(iSection + 1)] = jsonSection.label;
      jsonSection.categories = [];
      // Each category
      for (var iCategory = 0; iCategory < currentSection.categories().length; iCategory++) {
          var currentCategory = currentSection.categories()[iCategory];
          var jsonCategory = { label: currentCategory.title() };
          // A unique property for the label
          jsonData["section"+(iSection+1)+"_category"+(iCategory+1)] = jsonCategory.label;
          jsonCategory.details = [];
          // Each detail
          for (var iDetail = 0; iDetail < currentCategory.items().length; iDetail++) {
              var currentDetail = currentCategory.items()[iDetail];
              var jsonDetail = { label: currentDetail.textValue() };
              jsonCategory.details.push(jsonDetail);
              // A unique property for the label
              jsonData["section"+(iSection+1)+"_category"+(iCategory+1)+"_detail"+(iDetail+1)] = currentDetail.textValue();
          }
          jsonSection.categories.push(jsonCategory);
      }
      jsonData.sections.push(jsonSection);
  }

  // All elements with a single property
  jsonData.instasetup = get_instasetup_json(playsetVM);

  return jsonData;
}

/**
 * Get the Insta-Setup informations
 * @return {json} the data in json format
 */
function get_instasetup_json(playsetVM)
{
  return playsetVM.instasetup().toJson();
}

/**
 * Fill the "Description" part of the Json playset, from the UI
 * @param {json} jsonData - The JSON data for the Playset, which will be completed
 * @param {boolean} withParts - Is the description splitted in parts ? (Presentation, Movie Night, Advices, ...)
 * @param {boolean} withParagraphs - Is the text splitted in paragraphs ? (Each line is a json data object)
 */
function json_set_description(jsonData, description, withParts, withParagraphs)
{
  jsonData.description = description;

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

/*
  Returns text divided into 'blocks', being either 'title' (starts with #) or 'paragraph' (everything else)
  Used for generating the PDF
 */
function divideText_intoBlocks_titleParagraph(text)
{
  var blocks = [ ];
  if ((text != null) && (text.length > 0))
  {
    var arrayOfLines = text.match(/[^\r\n]+/g);
    for (var iLine = 0; iLine < arrayOfLines.length; iLine++)
    {
      var sLine = arrayOfLines[iLine];
      // Is this line a Title (starts with #)
      if (sLine.substring(0, 1) === '#')
      {
        blocks.push({ "content": sLine.substring(1).trim(), "type": "title" });
      }
      else // Or is this a new line of content ?
      {
        blocks.push({ "content": sLine, "type": "paragraph" });
      }
    }
  }
  return blocks;
}
