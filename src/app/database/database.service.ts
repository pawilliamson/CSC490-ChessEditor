import {Injectable} from '@angular/core';
import {Connection, ConnectionOptions, createConnection} from 'typeorm/browser';
import {User} from '../../entities/user.entity';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    public connection: Promise<Connection>;
    private readonly options: ConnectionOptions;

    constructor() {
        this.options = {
            type: 'mysql',
            host: 'mysql.stackcp.com',
            port: 52454,
            database: 'senior-project-3137330131',
            username: 'senior-project-3137330131',
            password: 'chess123',
            synchronize: true
        };
        this.connection = createConnection(this.options);
    }

    addUser (user:User) {
        this.connection.then (async connected => {

          console.log("Inserting a new user into the database...");
          await connected.manager.save(user);
          console.log("Saved a new user with id: " + user.userID);
      
          console.log("Loading users from the database...");
          const users = await connected.manager.find(User);
          console.log("Loaded users: ", users);
      
          console.log("Here you can setup and run express/koa/any other framework.");
      
      }).catch (err => console.log ("uh oh, " + err.message));
    }
}