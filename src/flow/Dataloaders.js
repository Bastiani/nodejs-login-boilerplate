import type Dataloader from "dataloader";
import type { ObjectId } from "mongoose";

import User from "../modules/User/UserLoader";

export type DataLoaderKey = ObjectId | string;

export type Dataloaders = {
  UserLoader: Dataloader<DataLoaderKey, User>
};
