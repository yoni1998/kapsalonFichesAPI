export interface ModificationNote {
  created_on: Date;
  info: String;
}

export const ModificationNote = {
  created_on: Date,
  info: String,
};

export enum response_status_codes {
  success = 200,
  bad_request = 400,
  not_found = 403,
  internal_server_error = 500,
}
