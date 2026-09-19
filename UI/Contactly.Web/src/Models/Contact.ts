export interface Contact {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  favorite: boolean;
}

export type ContactInput = Omit<Contact, 'id'>;

