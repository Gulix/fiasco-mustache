/**
 * Generate the PDF from the current playset
 */
function generate_pdf(playsetVM)
{
  var docDefinition = {
    content: [ ],
    styles: get_pdf_style()
  };

  if (playsetVM.isCoverLoaded())
  {
    pdf_add_cover(docDefinition.content, playsetVM.playsetCover());
  }

  pdf_add_description(docDefinition.content, playsetVM);

  // Generation of the Sections (Relationships, Needs, Locations, Objects)
  for(var iSection = 0; iSection < playsetVM.sections().length; iSection++)
  {
    var currentSection = playsetVM.sections()[iSection];
    pdf_add_section(docDefinition.content, currentSection, playsetVM.playsetTeaser(), playsetVM.playsetTitle());
  }

  pdf_add_instasetup(docDefinition.content, playsetVM);

  pdf_add_cards(docDefinition.content);

  var customFilename = "Fiasco Playset - " + playsetVM.playsetTitle() + ".pdf";
  console.log(JSON.stringify(docDefinition));
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
  var creditsBlocks = divideText_intoBlocks_titleParagraph(playsetVM.playsetCredits());
  for(var iBlock = 0; iBlock < creditsBlocks.length; iBlock++)
  {
    var block = { "style": "description", "text": creditsBlocks[iBlock].content };
    if (creditsBlocks[iBlock].type == 'title') {
      block.style = 'subTitle';
    }
    content.push(block);
  }

  // Description page
  content.push({ text: playsetVM.playsetSubtitle(), style: 'title', pageOrientation: 'portrait', pageBreak: 'before' });
  var descriptionBlocks = divideText_intoBlocks_titleParagraph(playsetVM.playsetDescription());
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
    if (descriptionBlocks[iBlock].type == 'pageBreaker') {
      content.push({ text: '', pageBreak: "after", pageOrientation: "portrait" });
    } else {
      content.push({ text: descriptionBlocks[iBlock].content, style: blockStyle });
    }
  }
}

function pdf_add_cover(content, dataUrl)
{
  content.push({ image: dataUrl, width: 500, pageBreak: 'after' });
}

/**
 * Add the Sections part for the PDF generation
 * @param {json} content       Json data for pdfmake generation
 * @param {json} jsonSection   Json data for the Section description
 * @param {string} playsetTeaser Teaser (bottom description) for the playset
 */
function pdf_add_section(content, sectionVM, playsetTeaser, playsetTitle)
{
  content.push({ text: playsetTitle, style: 'titleOnHeader', pageBreak: 'before', pageOrientation: 'landscape' });
  content.push({ text: sectionVM.title() + " ...", style: 'sectionHeader' });

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
 * Add the Insta-Setup Section part for the PDF generation
 * @param {json} content       Json data for pdfmake generation
 * @param {json} playsetVM     ViewModel of the Playset
 */
function pdf_add_instasetup(content, playsetVM)
{
  content.push({ text: playsetVM.playsetTitle(), style: 'titleOnHeader', pageBreak: 'before', pageOrientation: 'portrait' });
  content.push({ text: playsetVM.languageManager.current().instasetup_title, style: 'title' });

  // First section
  content.push({ text: playsetVM.instasetup().firstSection().title(), style: 'instaSetupSection' });
  content.push({ text: playsetVM.languageManager.current().instasetup_for3, style: 'category' });
  pdf_add_instasetup_detail(content, playsetVM.instasetup().firstSectionChoice1());
  pdf_add_instasetup_detail(content, playsetVM.instasetup().firstSectionChoice2());
  pdf_add_instasetup_detail(content, playsetVM.instasetup().firstSectionChoice3());
  content.push({ text: playsetVM.languageManager.current().instasetup_for4, style: 'category' });
  pdf_add_instasetup_detail(content, playsetVM.instasetup().firstSectionChoice4());
  content.push({ text: playsetVM.languageManager.current().instasetup_for5, style: 'category' });
  pdf_add_instasetup_detail(content, playsetVM.instasetup().firstSectionChoice5());

  // Second section
  content.push({ text: playsetVM.instasetup().secondSection().title(), style: 'instaSetupSection' });
  content.push({ text: playsetVM.languageManager.current().instasetup_for3, style: 'category' });
  pdf_add_instasetup_detail(content, playsetVM.instasetup().secondSectionChoice1());
  content.push({ text: playsetVM.languageManager.current().instasetup_for45, style: 'category' });
  pdf_add_instasetup_detail(content, playsetVM.instasetup().secondSectionChoice2());

  // Third section
  content.push({ text: playsetVM.instasetup().thirdSection().title(), style: 'instaSetupSection' });
  content.push({ text: playsetVM.languageManager.current().instasetup_for34, style: 'category' });
  pdf_add_instasetup_detail(content, playsetVM.instasetup().thirdSectionChoice1());
  content.push({ text: playsetVM.languageManager.current().instasetup_for5, style: 'category' });
  pdf_add_instasetup_detail(content, playsetVM.instasetup().thirdSectionChoice2());

  // Fourth section
  content.push({ text: playsetVM.instasetup().fourthSection().title(), style: 'instaSetupSection' });
  content.push({ text: playsetVM.languageManager.current().instasetup_forany, style: 'category' });
  pdf_add_instasetup_detail(content, playsetVM.instasetup().fourthSectionChoice1());

  content.push({ text: "... " + playsetVM.playsetTeaser(), style: 'sectionFooter' });
}

function pdf_add_instasetup_detail(content, detail)
{
  content.push({ text: detail.categoryVM().title() + " - " + detail.textValue(), style: 'details' });
}

/******************************************/
/*** Generating the Cards for Fiasco V2 ***/
/******************************************/
function pdf_add_cards(content)
{
  var staticCard = svgCard();
  var table = { table: { widths: [249, 249], heights: [178, 178, 178, 178], body: [ ] } };
  for(var iLine = 0; iLine < 4; iLine++)
  {
    var line = [ ];
    for(var iCol = 0; iCol < 2; iCol++)
    {
      var card = { svg: staticCard, fit: [249, 178 ] };
      line.push(card);
    }
    table.table.body.push(line);
  }

  content.push(table);
}

/*******************************/
/*** End for Fiasco v2 Cards ***/
/*******************************/

/**
 * Get the style for the pdfmake generation
 * @return {json} Json for pdfmake styling
 */
function get_pdf_style()
{
  var styles = {
    titleOnHeader: {
      fontSize: 10,
      font: "BowlbyOneSC",
      marginTop: 0,
      color: '#D08484',
      alignment: 'right'
    },
    sectionHeader: {
      fontSize: 26,
      font: "BowlbyOneSC",
      marginBottom: 8,
      marginTop: -10,
      color: '#8B1F1C'
    },
    sectionFooter: {
      fontSize: 22,
      font: "BowlbyOneSC",
      color: '#8B1F1C',
      alignment: 'right',
      marginTop: 5
    },
    instaSetupSection: {
      fontSize: 26,
      font: "BowlbyOneSC",
      marginBottom: 0,
      marginTop: 5,
      color: '#8B1F1C'
    },
    category: {
      fontSize: 16,
      font: "BowlbyOneSC",
      marginLeft: 10,
      marginTop: 5,
      marginBottom: 2,
    },
    details: {
      fontSize: 12,
      marginLeft: 22,
      marginTop: 1
    },
    title: {
      fontSize: 32,
      font: "BowlbyOneSC",
      marginBottom: 8,
      color: '#AA2222',
      alignment: 'center'
    },
		subTitle: {
			fontSize: 26,
			font: "BowlbyOneSC",
			marginLeft: 10,
      marginTop: 4
		},
    description: {
      fontSize: 16,
			marginBottom: 18,
      alignment: 'justify'
    }
  };
  return styles;
}
