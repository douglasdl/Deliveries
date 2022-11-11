# Backend

## 1) Project Structure

1. Create the project (package.json) configuration
```sh
npm init -y
```

2. Install the development dependencies ([Prisma](https://www.prisma.io/), Typescript, Bcrypt, JsonWebToken, Express, ts-node-dev):
```sh
npm i prisma typescript ts-node-dev @types/express @types/jsonwebtoken @types/bcrypt -D
```

3. Install the dependencies:
```sh
npm i express bcrypt jsonwebtoken @prisma/client
npm i express-async-errors
```

4. Install globally the tsc-init:
```sh
npm install tsc-init -g
```

5. Add the script command into the packaje.json file:
```json
"scripts": {
    "tsc": "tsc --init"
},
```

6. Create the typescript configuration file (tsconfig.json):
```sh
npm run tsc
```

7. Change the typescript configuration contents to:
```json
{
  "compilerOptions": {
    "sourceMap": true,
    "outDir": "dist",
    "strict": true,
    "lib": ["esnext"],
    "esModuleInterop": true
  }
}
```

## 2) Tables Structure

deliveryman
    id          uuid(PK)
    username    string
    password    string

clients
    id          uuid(PK)
    username    string
    password    string

deliveries
    id              uuid(PK)
    item_name       string
    id_client       uuid(FK)
    id_deliveryman  uuid(FK)
    created_at      DateTime
    end_at          DateTime

1. Create prisma databse schema:
```sh
# npx prisma init --datasource-provider sqlite
npx prisma init
```

2. Config the database (.env) file:
```sh
DATABASE_URL="postgresql://admin:admin@localhost:5432/prisma_deliveries?schema=public"
```

3. Create the database schema (schema.prisma):
```sh
model Deliveryman {
  id       String @id @default(uuid())
  username String @unique
  password String
}
```

4. Generate the database migration to create the table:
```sh
npx prisma migrate dev
```

5. Open the Prisma Studio to see the database:
```sh
npx prisma studio
```

6. Create the other tables and relations and migrate them;
```sh
# npx prisma format
```

7. Create the Express Server

## 3) Client

## 4) Deliveryman

## 5) Deliveries



## PostgreSQL Server

Switch the user:
```sh
sudo su - postgres
```

Start the PostgreSQL utility:
```sh
psql
```

Close the PostgreSQL utility:
```sh
\q
```

Create a new PostgreSQL user:
```sh
sudo su - postgres -c "createuser admin"
```

Create a new PostgreSQL database:
```sh
sudo su - postgres -c "createdb prisma_deliveries"
```

Connect to the PostgreSQL database:
```sh
sudo -u postgres psql
```

Grant the user access to the PostgreSQL database:
```sh
GRANT ALL PRIVILEGES ON DATABASE prisma_deliveries TO admin;
```

Change the settings to listen all addresses:
```sh
sudo nano /etc/postgresql/15/main/postgresql.conf
```
```sh
#------------------------------------------------------------------------------
# CONNECTIONS AND AUTHENTICATION
#------------------------------------------------------------------------------

# - Connection Settings -

listen_addresses = '*'     # what IP address(es) to listen on;
```

Restart the PostgreSQL service:
```sh
sudo service postgresql restart
```

Verify the changes with ss utility:
```sh
ss -nlt | grep 5432
```

Change the settings to allow remote connections:
```sh
sudo nano /etc/postgresql/15/main/pg_hba.conf
```




- [Beekeeper Studio](https://www.beekeeperstudio.io/): SQL Editor and Database Manager.
- [MD5 Hash Generator](https://www.md5hashgenerator.com/)