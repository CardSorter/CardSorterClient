import {StudyPageState} from "../reducers/studyPageReducer";
import writeXlsxFile, {getSheetData} from 'write-excel-file/browser';

// Helper: builds a bold header cell
const getHeader = (text: string) => ({
  value: text,
  fontWeight: 'bold' as const
});

export default async (state: StudyPageState, title: string) => {

  // Participants Sheet
  const participantsRows = state.participants.data.map((p, i) => ({
    participantNo: p[0],
    timeTaken: p[1],
    cardsSorted: p[2],
    categoriesCreated: p[3]
  }));

  const participantsColumns = [
    {
      header: getHeader('Participant no'),
      cell: (row: typeof participantsRows[0]) => ({ value: row.participantNo, type: String })
    },
    {
      header: getHeader('Time taken'),
      cell: (row: typeof participantsRows[0]) => ({ value: row.timeTaken, type: String })
    },
    {
      header: getHeader('Cards sorted'),
      cell: (row: typeof participantsRows[0]) => ({ value: row.cardsSorted, type: String })
    },
    {
      header: getHeader('Categories created'),
      cell: (row: typeof participantsRows[0]) => ({ value: row.categoriesCreated, type: Number })
    }
  ];

  // Sorting Sheet
  const sortingRows = state.sorting.data.map(item => ({
    no: item.no,
    category: item.category,
    cards: (Array.isArray(item.cards) ? item.cards : []).join(", "),
    comment: item.comment
  }));

  const sortingColumns = [
    {
      header: getHeader('Participant no'),
      cell: (row: typeof sortingRows[0]) => ({ value: row.no, type: String })
    },
    {
      header: getHeader('Category'),
      cell: (row: typeof sortingRows[0]) => ({ value: row.category, type: String })
    },
    {
      header: getHeader('Cards'),
      cell: (row: typeof sortingRows[0]) => ({ value: row.cards, type: String })
    },
    {
      header: getHeader('Comment'),
      cell: (row: typeof sortingRows[0]) => ({ value: row.comment, type: String })
    }
  ];

  // Cards Sheet
  const cardsRows = state.cards.data.map((item) => ({
    card: item.name,
    categories_no: item.categories_no,
    category_names: (Array.isArray(item.category_names) ? item.category_names.join(", ") : item.category_names),
    frequencies: (Array.isArray(item.frequencies) ? item.frequencies.join(", ") : item.frequencies),
    description: item.description
  }));

  const cardsColumns = [
    {
      header: getHeader('Card'),
      cell: (row: typeof cardsRows[0]) => ({ value: row.card, type: String })
    },
    {
      header: getHeader('Categories No'),
      cell: (row: typeof cardsRows[0]) => ({ value: row.categories_no, type: Number })
    },
    {
      header: getHeader('Categories'),
      cell: (row: typeof cardsRows[0]) => ({ value: row.category_names, type: String })
    },
    {
      header: getHeader('Frequency'),
      cell: (row: typeof cardsRows[0]) => ({ value: row.frequencies, type: String })
    },
    {
      header: getHeader('Description'),
      cell: (row: typeof cardsRows[0]) => ({ value: row.description, type: String })
    }
  ];

  // Categories Sheet
  const categoriesRows = state.categories.data.map((item) => ({
    category: item[0],
    cards_no: item[1],
    cards: (Array.isArray(item[2]) ? item[2].join(", ") : item[2]),
    frequency: (Array.isArray(item[3]) ? item[3].join(", ") : item[3]),
    participants: item[4]
  }));

  const categoriesColumns = [
    {
      header: getHeader('Category'),
      cell: (row: typeof categoriesRows[0]) => ({ value: row.category, type: String })
    },
    {
      header: getHeader('Cards no'),
      cell: (row: typeof categoriesRows[0]) => ({ value: row.cards_no, type: Number })
    },
    {
      header: getHeader('Cards'),
      cell: (row: typeof categoriesRows[0]) => ({ value: row.cards, type: String })
    },
    {
      header: getHeader('Frequency'),
      cell: (row: typeof categoriesRows[0]) => ({ value: row.frequency, type: String })
    },
    {
      header: getHeader('Participants'),
      cell: (row: typeof categoriesRows[0]) => ({ value: row.participants, type: Number })
    }
  ];
  

  // Export All Sheets
  await writeXlsxFile([
    { data: getSheetData(participantsRows, participantsColumns), sheet: "Participant" },
    { data: getSheetData(sortingRows, sortingColumns),           sheet: "Sorting" },
    { data: getSheetData(cardsRows, cardsColumns),               sheet: "cards" },
    { data: getSheetData(categoriesRows, categoriesColumns),     sheet: "categories" },
  ]).toFile(`raw-data-${title}.xlsx`);
};