/**
 * Generate the PDF from the current playset
 */
function generate_pdf()
{
  var jsonPlayset = get_generated_json();

  var docDefinition = {
    content: [ ],
    styles: get_pdf_style()
  };

  pdf_add_introduction(docDefinition.content, jsonPlayset);

  // Generation of the Sections (Relationships, Needs, Locations, Objects)
  for(var iSection = 0; iSection < jsonPlayset.sections.length; iSection++)
  {
    var currentSection = jsonPlayset.sections[iSection];
    pdf_add_section(docDefinition.content, currentSection, jsonPlayset.teaser);
  }

  var customFilename = "Fiasco Playset - " + $('#input_title').val() + ".pdf";
  pdfMake.createPdf(docDefinition).download(customFilename);
}

function pdf_add_introduction(content, jsonPlayset)
{
  // Title
  content.push({ text: jsonPlayset.title, style: 'title', pageOrientation: 'portrait'});
  content.push({ text: 'Credits', style: 'subTitle'});
  content.push({ text: jsonPlayset.credits, style: 'description'});
  content.push({ text: 'Boilerplate', style: 'subTitle'});
  content.push({ text: jsonPlayset.credits, style: 'description'});
}

/**
 * Add the Sections part for the PDF generation
 * @param {json} content       Json data for pdfmake generation
 * @param {json} jsonSection   Json data for the Section description
 * @param {string} playsetTeaser Teaser (bottom description) for the playset
 */
function pdf_add_section(content, jsonSection, playsetTeaser)
{
  content.push({ text: jsonSection.label + " ...", style: 'sectionHeader', pageBreak: 'before', pageOrientation: 'landscape' });

  var columns = [ ];
  var iColumn = 0;
  // For each category of the page, add the 6 Details and put it in the right column
  for (var iCategory = 0; iCategory < jsonSection.categories.length; iCategory++)
  {
    if ((iCategory % 3) == 0)
    {
      columns.push([ ]);
      iColumn = columns.length - 1;
    }

    var currentCategory = jsonSection.categories[iCategory];
    columns[iColumn].push({ text: (iCategory + 1) + " - " + currentCategory.label, style: 'category' } );
    // Chaque élément de la catégorie
    for (var iDetail = 0; iDetail < currentCategory.details.length; iDetail++)
    {
      var currentDetail = currentCategory.details[iDetail];
      columns[iColumn].push({ text: (iDetail + 1) + " - " + currentDetail.label, style: 'details' });
    }
  }
  content.push({ columns: columns });
  content.push({ text: "... " + playsetTeaser, style: 'sectionFooter' });
}

/**
 * Get the style for the pdfmake generation
 * @return {json} Json for pdfmake styling
 */
function get_pdf_style()
{
  var styles = {
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
    },
    title: {
      fontSize: 32,
      bold: true,
      marginBottom: 8,
      color: '#AA2222',
      alignment: 'center'
    },
		subTitle: {
			fontSize: 26,
			bold: true,
			marginLeft: 10,
      marginTop: 16
		},
    description: {
      fontSize: 16,
			marginBottom: 6
    }
  };
  return styles;
}
