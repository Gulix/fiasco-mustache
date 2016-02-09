function save_json()
{
  var blob = new Blob([JSON.stringify(get_generated_json())], {type: "text/plain;charset=utf-8"});
  saveAs(blob, "fiasco_template_" + $('#input_title').val() + ".json");
}

function load_files(evt) {

    var files = evt.target.files;

    for (var i = 0, f; f = files[i]; i++) {
        var reader = new FileReader();

        reader.onload = function (reader) {
            var data = JSON.parse(this.result);
            load_from_json(data);
        };

        reader.readAsText(f);
    }

    // Reset file input
    $("#file-load-form")[0].reset();
}

function load_from_json(jsonData)
{
    // Introduction elements
    $('#input_title').val(jsonData.title);
    $('#input_subtitle').val(jsonData.subtitle);
    $('#input_teaser').val(jsonData.teaser);
    $('#input_presentation').val(jsonData.presentation);
    $('#input_inspirations').val(jsonData.inspirations);
    $('#input_advices').val(jsonData.advices);
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
