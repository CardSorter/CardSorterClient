import {StudyPageState} from "../reducers/studyPageReducer";
import writeXlsxFile from 'write-excel-file';

export default async (state: StudyPageState, title: string) => {

  // Participants Sheet
  const participantsRows = state.participants.data.map((p, i) => ({
    participantNo: p[0],
    timeTaken: p[1],
    cardsSorted: p[2],
    categoriesCreated: p[3]
  }));

  const participantsSchema = [
    {column: 'Participant no', type: String, value: (row: typeof participantsRows[0]) => row.participantNo},
    {column: 'Time taken', type: String, value: (row: typeof participantsRows[0]) => row.timeTaken},
    {column: 'Cards sorted', type: String, value: (row: typeof participantsRows[0]) => row.cardsSorted},
    {column: 'Categories created', type: Number, value: (row: typeof participantsRows[0]) => row.categoriesCreated}
  ];

  // Sorting Sheet
  const sortingRows = state.sorting.data.map(item => ({
    no: item.no,
    category: item.category,
    cards: (Array.isArray(item.cards) ? item.cards : []).join(", "),
    comment: item.comment
  }));

  const sortingSchema = [
    {column: 'Participant no', type: String, value: (row: typeof sortingRows[0]) => row.no},
    {column: 'Category', type: String, value: (row: typeof sortingRows[0]) => row.category},
    {column: 'Cards', type: String, value: (row: typeof sortingRows[0]) => row.cards},
    {column: 'Comment', type: String, value: (row: typeof sortingRows[0]) => row.comment}
  ];

  // Cards Sheet
  const cardsRows = state.cards.data.map((item) => ({
    card: item.name,
    categories_no: item.categories_no,
    category_names: (Array.isArray(item.category_names) ? item.category_names.join(", ") : item.category_names),
    frequencies: (Array.isArray(item.frequencies) ? item.frequencies.join(", ") : item.frequencies),
    description: item.description
  }));

  const cardsSchema = [
    {column: 'Card', type: String, value: (row: typeof cardsRows[0]) => row.card},
    {column: 'Categories No', type: Number, value: (row: typeof cardsRows[0]) => row.categories_no},
    {column: 'Categories', type: String, value: (row: typeof cardsRows[0]) => row.category_names},
    {column: 'Frequency', type: String, value: (row: typeof cardsRows[0]) => row.frequencies},
    {column: 'Description', type: String, value: (row: typeof cardsRows[0]) => row.description}
  ];

  // Categories Sheet
  const categoriesRows = state.categories.data.map((item) => ({
    category: item[0],
    cards_no: item[1],
    cards: (Array.isArray(item[2]) ? item[2].join(", ") : item[2]),
    frequency: (Array.isArray(item[3]) ? item[3].join(", ") : item[3]),
    participants: item[4]
  }));
  console.log(categoriesRows);

  const categoriesSchema = [
    {column: 'Category', type: String, value: (row: typeof categoriesRows[0]) => row.category},
    {column: 'Cards no', type: Number, value: (row: typeof categoriesRows[0]) => row.cards_no},
    {column: 'Cards', type: String, value: (row: typeof categoriesRows[0]) => row.cards},
    {column: 'Frequency', type: String, value: (row: typeof categoriesRows[0]) => row.frequency},
    {column: 'Participants', type: Number, value: (row: typeof categoriesRows[0]) => row.participants}
  ];

  // Export All Sheets
  // @ts-ignore
  await writeXlsxFile([participantsRows, sortingRows, cardsRows, categoriesRows], {
    schema: [participantsSchema, sortingSchema, cardsSchema, categoriesSchema],
    sheets: ["Participant", "Sorting", "cards", "categories"],
    fileName: `raw-data-${title}.xlsx`
  });
};