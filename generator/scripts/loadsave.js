/**
 * Save the Json data in a text file
 */
function save_json()
{
  var blob = new Blob([JSON.stringify(get_json_fromUI(false, false))], {type: "text/plain;charset=utf-8"});
  saveAs(blob, "fiasco_template_" + $('#input_title').val() + ".json");
}

/**
 * Load a JSON file inside the editor
 * @param  {[type]} evt - Event for the files that are loaded
 */
function load_json_file(evt) {

    if (evt.target.files.length == 1)
    {
      var file = evt.target.files[0];
      var reader = new FileReader();

      reader.onload = function (reader) {
        var data = JSON.parse(this.result);
        load_json_intoUI(data);
      };

      reader.readAsText(file);

      // Reset file input
      $("#file-load-form")[0].reset();
    }
}

/**
 * Load a JSON object into the UI
 * @param  {json} jsonData - Data to be loaded
 */
function load_json_intoUI(jsonData)
{
    // Introduction elements
    $('#input_title').val(jsonData.title);
    $('#input_subtitle').val(jsonData.subtitle);
    $('#input_teaser').val(jsonData.teaser);
    $('#input_description').val(jsonData.description);
    load_old_description_version(jsonData);
    $('#input_credits').val(jsonData.credits);

    // Elements from a section
    for(var iSection = 1; iSection <= 4; iSection++) {
      $('#sec'+iSection).val(jsonData.sections[iSection-1].label);
      // Each category
      for (var iCategory = 1; iCategory <= 6; iCategory++) {
          $('#sec' + iSection + '_cat' + iCategory).val(jsonData.sections[iSection-1].categories[iCategory-1].label);
          // Each detail
          for (var iDetail = 1; iDetail <= 6; iDetail++) {
              $('#sec' + iSection + '_cat' + iCategory + '_detail' + iDetail).val(
                  jsonData.sections[iSection-1].categories[iCategory-1].details[iDetail-1].label);
          }
      }
    }
    update_section_labels();

    load_instasetup_fromjson(jsonData.instasetup);
    instasetup_update_options_text();
}

/**
 * Load the Insta-Setup part of a JSON object into the UI
 * @param  {[type]} jsonIS [description]
 */
function load_instasetup_fromjson(jsonIS)
{
  if (jsonIS instanceof Array)
  {
    for (var iSection = 0; iSection < jsonIS.length; iSection++)
    {
      var selectSection = "#insta-setup-section-choice" + (iSection + 1);
      if ( $(selectSection).length) {
        $(selectSection).val(jsonIS[iSection].id);
        for (var iElement = 0; iElement < jsonIS[iSection].values.length; iElement++)
        {
          var selectElement = "#insta-setup-section-choice" + (iSection + 1) + "-element-choice" + (iElement + 1);
          if ($(selectElement).length) {
            $(selectElement).val(jsonIS[iSection].values[iElement]);
          }
        }
      }
    }
  }
}

/**
 * Load old & obsolete JSON values into UI (migrated to the new format)
 * @param  {[type]} jsonData [description]
 */
function load_old_description_version(jsonData)
{
  var migratedDescription = '';
  var blockSep = '';

  if (jsonData.hasOwnProperty("description") && (jsonData.description.length > 0))
  {
    migratedDescription += blockSep + jsonData.description;
    blockSep = '\n';
  }

  if (jsonData.hasOwnProperty("presentation") && (jsonData['presentation'].length > 0))
  {
    migratedDescription += blockSep + "# Presentation\n" + jsonData['presentation'];
    blockSep = '\n';
  }
  if (jsonData.hasOwnProperty("inspirations") && (jsonData['inspirations'].length > 0))
  {
    migratedDescription += blockSep + "# Inspirations\n" + jsonData['inspirations'];
    blockSep = '\n';
  }
  if (jsonData.hasOwnProperty("advices") && (jsonData['advices'].length > 0))
  {
    migratedDescription += blockSep + "# Advices\n" + jsonData['advices'];
    blockSep = '\n';
  }

  if (migratedDescription.length > 0)
  {
    $('#input_description').val(migratedDescription);
  }
}
