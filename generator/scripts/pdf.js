/**********************/
/*** PDF generation ***/
/**********************/
function generate_pdf()
{
  var jsonPlayset = get_generated_json();

  var docDefinition = {
    content: [ ],
    styles: {
      sectionHeader: {
        fontSize: 22,
        bold: true,
        marginBottom: 8
      },
      sectionFooter: {
        fontSize: 20,
        bold: true,
        alignment: 'right',
        marginTop: 5
      },
      category: {
        fontSize: 14,
        bold: true,
        marginLeft: 10,
        marginTop: 3,
        marginBottom: 2,
        background: '#AAAAAA'
      },
      details: {
        fontSize: 12,
        marginLeft: 22,
        marginTop: 1
      }
    }
  };

  // Generation of the Sections
  for(var iSection = 0; iSection < jsonPlayset.sections.length; iSection++)
  {
    var currentSection = jsonPlayset.sections[iSection];
    docDefinition.content.push({ text: currentSection.label + " ...", style: 'sectionHeader' });
    // Chaque catégorie de la page
    for (var iCategory = 0; iCategory < currentSection.categories.length; iCategory++)
    {
      var currentCategory = currentSection.categories[iCategory];
      docDefinition.content.push({ text: (iCategory + 1) + " - " + currentCategory.label, style: 'category' } );
      // Chaque élément de la catégorie
      for (var iDetail = 0; iDetail < currentCategory.details.length; iDetail++)
      {
        var currentDetail = currentCategory.details[iDetail];
        docDefinition.content.push({ text: (iDetail + 1) + " - " + currentDetail.label, style: 'details' });
      }
    }
    docDefinition.content.push({ text: "... " + jsonPlayset.teaser, style: 'sectionFooter', pageBreak: 'after' });
  }

  pdfMake.createPdf(docDefinition).download();
}
