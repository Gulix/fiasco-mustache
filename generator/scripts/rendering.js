/*
  Render via a Mustache Template the recurring sections html code
  Return the HTML code to be put inside the page
*/
function render_sections(template)
{
  var view = {
    sections: []
  };
  for(var iSection=1; iSection<=4; iSection++) {
    var section = {
      categories: [],
      sectionIdx: iSection
    };
    for(var iCategory=1; iCategory<=6; iCategory++)
    {
      var category = {
        details: [],
        categoryIdx: iCategory
      };
      for(var iDetail=1; iDetail<=6; iDetail++)
      {
        category.details.push(iDetail);
      }
      section.categories.push(category);
    }

    view.sections.push(section);
  }

  // Render the four "dice" sections, all the same
  return Mustache.render(template, view);
}

/*
  Code to Show / Hide a section
*/
function showhide_section(sectionIdx)
{
  var lsIdx = [0, 1, 2, 3, 4, 5, 90, 99];
  for(var idx=0; idx<=lsIdx.length; idx++)
  {
    var sectionName = '#section' + lsIdx[idx];
    var sectionTab = '#select_section_' + lsIdx[idx];
    if (lsIdx[idx] == sectionIdx)
    {
      // Showing the section
      $(sectionName).show();
      $(sectionTab).parent().addClass('active');
    }
    else
    {
      // Hiding the section
      $(sectionName).hide();
      $(sectionTab).parent().removeClass('active');
    }
  }
}


function update_section_labels()
{
   for(var iSection=1; iSection <= 4; iSection++)
   {
      // Designation from the field, or standard value
      var designation = getSectionName(iSection);

      // The section designation goes to the tab
      $('#select_section_' + iSection).html(designation);

      // Insta-setup select need to be changed/loaded too
      $('.section-option' + iSection).each(function() {
        $(this).html(designation);
      });
   }
}

function getSectionName(iSection)
{
    var designation = $('#sec'+iSection).val();
    if (designation.length == 0)
        designation = 'Section #' + iSection;

    return designation;
}

function getCategoryName(iSection, iCategory)
{
    var designation = $('#sec' + iSection + '_cat' + iCategory).val();
    if (designation.length == 0)
        designation = 'Category #' + iCategory;

    return designation;
}

function getDetailName(iSection, iCategory, iDetail)
{
    var designation = $('#sec' + iSection + '_cat' + iCategory + '_detail' + iDetail).val();
    if (designation.length == 0)
        designation = 'Detail #' + iDetail;

    return designation;
}

function fill_details_options()
{
    $('.element-selection').each(function() {
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

function update_details_options()
{
  $('.element-selection').each(function() {

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
    var sectionDesignation = getSectionName(iSection);
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
