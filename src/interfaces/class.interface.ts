import { Types } from "mongoose";

export interface IClass {
  name: string;
  department: string;
  enrollement_year: string;
  current_level: number;
  has_graduated: boolean;
  is_deleted: boolean;
  advisor_id: Types.ObjectId;
}
