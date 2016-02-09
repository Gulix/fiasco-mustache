/**
 * Initialization of the Insta-Setup part
 */
function instasetup_init()
{
  // Fill the Section selectors with the right options
  $('.section-selection').each(function() {
    for(var idx = 1; idx <= 4; idx++)
    {
        var selectedValue = '';
        if ($(this).attr('id') == ('insta-setup-section-choice' + idx))
            selectedValue = ' selected';
        $(this).append("<option value='cat" + idx + "' class='section-option" + idx + "' " + selectedValue + " />");
    }
  });

  // Fill the Details selectors with the right options
  instasetup_create_details_options();
  update_section_labels();
  instasetup_update_options_text();

  // Change Category in Insta-Setup
  $('.section-selection').change(function() {
    instasetup_update_options_text();
  });

  $('#randomize-insta-setup').click(function() {
    instasetup_randomize();
  })
}

/**
 * Update the text for all the options of the Insta-Setup
 */
function instasetup_update_options_text()
{
  $('.instasetup-element-selection').each(function() {

    // Section of the details
    var iSection = 0;
    for(var iSectionChoice=1; iSectionChoice <= 4; iSectionChoice++)
    {
       if ($(this).hasClass('element-selection-section-choice' + iSectionChoice))
       {
         iSection = $('#insta-setup-section-choice' + iSectionChoice + ' option:selected').val();
         iSection = iSection.substring(3);
         iSection = parseInt(iSection);
       }
    }

    // Filling all the Categories/Details from the section
    for (var iCategory=1; iCategory <= 6; iCategory++)
    {
        var categoryDesignation = getCategoryName(iSection, iCategory);
        for (var iDetail=1; iDetail <= 6; iDetail++)
        {
            var detailDesignation = getDetailName(iSection, iCategory, iDetail);
            $(this).children('.cat' + iCategory + '_det' + iDetail).html(categoryDesignation + ' : ' + detailDesignation);
        }
    }
  });
}

/**
 * Create the "Options" for the "Select" of each element of the Insta-Setup.
 * Each options is a Detail from a Category
 */
function instasetup_create_details_options()
{
    $('.instasetup-element-selection').each(function() {
        for (var iCategory=1; iCategory <= 6; iCategory++)
        {
            for (var iDetail=1; iDetail <= 6; iDetail++)
            {
                var idCatDet = "cat" + iCategory + "_det" + iDetail;
                $(this).append("<option value='" + idCatDet + "' class='" + idCatDet + "' />");
            }
        }
    });
}

/**
 * Randomize the Insta-Setup selections
 */
function instasetup_randomize()
{
  $('.instasetup-element-selection').each(function() {
    var $options = $(this).find('option');
    var random = ~~(Math.random() * $options.length);
    $options.eq(random).prop('selected', true);
  });

}
