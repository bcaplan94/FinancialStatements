import { UUID } from "crypto";

export interface financialItem {
  id: UUID;
  as_of_date: Date |string;
  parent: UUID | null ,
  item: string,
  amount: number,
  notes: string,
  itemOrder: number,
  treeHeight: number
}
  
export interface financialItemCompare {
  item: string,
  amount1: number,
  notes1: string,
  amount2: number,
  notes2: string,
  treeHeight: number
}