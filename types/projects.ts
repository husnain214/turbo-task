export interface ProjectData {
  title: string;
  description: string;
}

export interface ProjectResponse {
  errors?: Partial<Record<keyof ProjectData, string[] | undefined>>;
  payload: { [key in keyof ProjectData]: string };
}
