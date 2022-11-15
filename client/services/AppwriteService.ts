import { Client, Account, ID } from 'appwrite';
import { throws } from 'assert';

class AppwriteService {
  client: Client;
  ID: typeof ID;
  account: Account;

  constructor() {
    const client = new Client().setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!).setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    this.client = client;
    this.ID = ID;
    this.account = new Account(this.client);
  }

}

export default AppwriteService;
