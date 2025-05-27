import {Client} from "pg";

const pgClient = new Client("postgresql://neondb_owner:npg_cyZMiPYV9wv2@ep-cool-frost-a1an21af-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require");

async function main() {
    await pgClient.connect();

    await pgClient.query('BEGIN');

    const response = await pgClient.query("SELECT * FROM USERS;");
    const USERNAME = "SHATADAL";
    const EMAIL = "SHATADAl@gmail.com";
    const PASSWORD = "12345678";

    const insertQuery = `INSERT INTO USERS (USERNAME, EMAIL, PASSWORD)
                         VALUES ($1, $2, $3) RETURNING id;`
    const userResult = await pgClient.query(insertQuery,[USERNAME,EMAIL,PASSWORD]);

    const userId = userResult.rows[0].id;
    console.log(userId)

    // Add address with the returned user_id
    const addressQuery = `INSERT INTO addresses(user_id, city, country, street, pincode)
                          VALUES($1, $2, $3, $4, $5)`;
    await pgClient.query(addressQuery, [userId, 'City', 'Country', 'Street', '123456']);

    await pgClient.query('COMMIT');
    console.log('User and address inserted successfully. User ID:', userId);
}

main();