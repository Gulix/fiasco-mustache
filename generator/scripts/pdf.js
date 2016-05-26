/**
 * Generate the PDF from the current playset
 */
function generate_pdf(playsetVM)
{
  var docDefinition = {
    content: [ ],
    styles: get_pdf_style()
  };

  pdf_add_description(docDefinition.content, playsetVM);

  // Generation of the Sections (Relationships, Needs, Locations, Objects)
  for(var iSection = 0; iSection < playsetVM.sections().length; iSection++)
  {
    var currentSection = playsetVM.sections()[iSection];
    pdf_add_section(docDefinition.content, currentSection, playsetVM.playsetTeaser());
  }

  var customFilename = "Fiasco Playset - " + playsetVM.playsetTitle() + ".pdf";
  pdfMake.createPdf(docDefinition).download(customFilename);
}

/**
 * [pdf_add_introduction description]
 * @param {[type]} content     [description]
 * @param {[type]} jsonPlayset [description]
 */
function pdf_add_description(content, playsetVM)
{
  // Title page with credits
  content.push({ text: playsetVM.playsetTitle(), style: 'title', pageOrientation: 'portrait'});
  content.push({ text: 'Credits', style: 'subTitle'});
  content.push({ text: playsetVM.playsetCredits(), style: 'description'});
  content.push({ text: 'Boilerplate', style: 'subTitle'});
  content.push({ text: playsetVM.playsetCredits(), style: 'description', pageBreak: 'after'});

  // Description page
  content.push({ text: playsetVM.playsetSubtitle(), style: 'title', pageOrientation: 'portrait'});
  var descriptionBlocks = get_description_paragraphs(playsetVM);
  for(var iBlock = 0; iBlock < descriptionBlocks.length; iBlock++)
  {
    var blockStyle = 'description';
    switch(descriptionBlocks[iBlock].type)
    {
      case 'title':
        blockStyle = 'subTitle';
        break;
      case 'paragraph':
        blockStyle = 'description';
        break;
    }

    content.push({ text: descriptionBlocks[iBlock].content, style: blockStyle });
  }
}

/**
 * Add the Sections part for the PDF generation
 * @param {json} content       Json data for pdfmake generation
 * @param {json} jsonSection   Json data for the Section description
 * @param {string} playsetTeaser Teaser (bottom description) for the playset
 */
function pdf_add_section(content, sectionVM, playsetTeaser)
{
  content.push({ text: sectionVM.title() + " ...", style: 'sectionHeader', pageBreak: 'before', pageOrientation: 'landscape' });

  var columns = [ ];
  var iColumn = 0;
  // For each category of the page, add the 6 Details and put it in the right column
  for (var iCategory = 0; iCategory < sectionVM.categories().length; iCategory++)
  {
    if ((iCategory % 3) == 0)
    {
      columns.push([ ]);
      iColumn = columns.length - 1;
    }

    var currentCategory = sectionVM.categories()[iCategory];
    columns[iColumn].push({ text: (iCategory + 1) + " - " + currentCategory.title(), style: 'category' } );
    // Chaque élément de la catégorie
    for (var iDetail = 0; iDetail < currentCategory.items().length; iDetail++)
    {
      var currentDetail = currentCategory.items()[iDetail];
      columns[iColumn].push({ text: (iDetail + 1) + " - " + currentDetail.textValue(), style: 'details' });
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
			marginBottom: 6,
      alignment: 'justify'
    }
  };
  return styles;
}
