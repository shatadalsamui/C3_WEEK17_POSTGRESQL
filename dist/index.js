"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pgClient = new pg_1.Client("postgresql://neondb_owner:npg_cyZMiPYV9wv2@ep-cool-frost-a1an21af-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield pgClient.connect();
        yield pgClient.query('BEGIN');
        const response = yield pgClient.query("SELECT * FROM USERS;");
        const USERNAME = "SHATADAL";
        const EMAIL = "SHATADAl@gmail.com";
        const PASSWORD = "12345678";
        const insertQuery = `INSERT INTO USERS (USERNAME, EMAIL, PASSWORD)
                         VALUES ($1, $2, $3) RETURNING id;`;
        const userResult = yield pgClient.query(insertQuery, [USERNAME, EMAIL, PASSWORD]);
        const userId = userResult.rows[0].id;
        console.log(userId);
        // Add address with the returned user_id
        const addressQuery = `INSERT INTO addresses(user_id, city, country, street, pincode)
                          VALUES($1, $2, $3, $4, $5)`;
        yield pgClient.query(addressQuery, [userId, 'City', 'Country', 'Street', '123456']);
        yield pgClient.query('COMMIT');
        console.log('User and address inserted successfully. User ID:', userId);
    });
}
main();
