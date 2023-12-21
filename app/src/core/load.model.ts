export enum LoadBoardColumns {
  ID = "id",
  ORIGIN = "origin",
  DESTINATION = "destination",
  RATE = "rate",
  RATE_PER_MILE = "rate_per_mile",
  DISTANCE = "distance",
  DEADHEAD = "deadhead",
  BOOK_BUTTON = "book_button",
  DAYS_UNTIL_PAYMENT = "days_until_payment",
  IS_FACTORABLE = "is_factorable",
}

export interface TableDataShape {
  headers: { key: LoadBoardColumns; text: string }[];
  rows: LoadData[];
}

export interface LoadData {
  [LoadBoardColumns.ID]: string;
  [LoadBoardColumns.ORIGIN]: string;
  [LoadBoardColumns.DESTINATION]: string;
  [LoadBoardColumns.RATE]: number;
  [LoadBoardColumns.DISTANCE]: number;
  [LoadBoardColumns.DEADHEAD]: number;
  [LoadBoardColumns.IS_FACTORABLE]: boolean;
}
