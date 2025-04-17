
import { user } from './db/schema';
import {db} from './db';
  
// const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  // const u: typeof user.$inferInsert = {
  //   fullname: 'John',
  //   email: 'john@example.com',
  // };

  // await db.insert(user).values(u);
  // console.log('New user created!')

  const users = await db.select().from(user);
  console.log('Getting all users from the database: ', users)
  /*
  const users: {
    id: number;
    name: string;
    age: number;
    email: string;
  }[]
  */

  // await db
  //   .update(user)
  //   .set({
  //     age: 31,
  //   })
  //   .where(eq(user.email, user.email));
  // console.log('User info updated!')

  // await db.delete(user).where(eq(user.email, user.email));
  // console.log('User deleted!')
}

main();
