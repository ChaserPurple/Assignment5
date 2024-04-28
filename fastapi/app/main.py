from fastapi import FastAPI
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from pydantic import BaseModel
from typing import Dict, Any
from app.CustomerData import CustomerData
from fastapi import Request
from typing import Dict, Any
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select

DATABASE_URL = "mysql+mysqlconnector://root:supersecretpassw0rd@mysql/sakila"

engine = create_engine(DATABASE_URL)

Session = sessionmaker(engine)

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allows all origins
    allow_credentials=True,
    allow_methods=["*"], # Allows all methods
    allow_headers=["*"], # Allows all headers
)

def executeSelect(table: str, attributes: list[str], end: str = ""):
    query: str = "SELECT "

    for i in range(0, len(attributes)):
        query = f"{query}{attributes[i]}"
        if i < len(attributes) - 1:
            query = f"{query}, "
    
    query = f"{query} FROM {table} {end}"

    with engine.connect() as conn:
        rows = conn.execute(text(query))
        conn.commit()
        return [dict(zip(attributes, r)) for r in rows] 

def executeInsert(query: str):
    with engine.connect() as conn:
        rows = conn.execute(text(query))
        conn.commit()
        row = rows.lastrowid
        return row
        

@app.get("/getStoreFilms/")
def getStoreFilm(store_id: int = 1):
    s = statement = text("""SELECT * FROM film""")
    with engine.connect() as conn:
        rows = conn.execute(s)
        print(rows.all())
    

def getSingleCustomer(fname, lname, phone):
    result = executeSelect('customer join address on customer.address_id=address.address_id', ['customer_id'], f"where first_name='{fname}' and last_name='{lname}' and phone='{phone}'")
    row_id = -1
    if len(result) == 1:
        row_id = result[0]['customer_id']
    return row_id

@app.post("/getCustomer")
async def getCustomer(payload: Request):
    data = await payload.json()
    fname = data['fname']
    lname = data['lname']
    phone = data['phone']
    return {'customer_id': getSingleCustomer(fname, lname, phone)}

@app.post('/rentFilms')
async def rentFilm(payload: Request):
    data = await payload.json()
    inventory_ids: list = data['inventory_ids']
    customer_id = data['customer_id']
    date = data['date'][:10]

    print(date)

    for inventory in inventory_ids:
        query = f"insert into rental (rental_date, inventory_id, customer_id, staff_id) values(DATE('{date}'), {inventory}, {customer_id}, 1)"
        executeInsert(query)

@app.get("/getFilms/")
def getFilms(customer_id: str):
    store_ids = executeSelect('customer', ['store_id'], f"where customer_id={customer_id}")
    if len(store_ids) == 1:
        store_id = store_ids[0]['store_id']
        result = executeSelect(
            '(film as f inner join inventory as i on f.film_id=i.film_id)', 
            ['f.film_id', 'i.inventory_id', 'f.title', 'f.release_year', 'f.length', 'f.rating', 'f.rental_rate'],
            f'where i.store_id={store_id} and i.inventory_id not in (select distinct inventory_id from rental as r where r.return_date is null) group by f.film_id, i.inventory_id')
        return result


def getCityID(city: str):
    return executeSelect('city', ['city_id'], f"where city='{city}'")

def createAddress(address: str, cities: list, district: str, zip_code: str, phone_number: str):
    row = -1
    if len(cities) == 1:
        city_id = cities[0]['city_id']
        row = executeInsert(f"insert into address (address, district, city_id, postal_code, phone, location) values('{address}', '{district}', {city_id}, '{zip_code}', '{phone_number}', POINT('39.8333333','-98.585522'))")
    return row

@app.post("/addCustomer")
async def addCustomer(payload: Request):
    data = await payload.json()
    fname = data['fname']
    lname = data['lname']
    email = data['email']
    store = data['store_id']
    address = data['address']
    city = data['city']
    district = data['state']
    zip_code = data['zip_code']
    phone = data['phone']

    customer_id = getSingleCustomer(fname, lname, phone)
    if customer_id != -1:
        return False

    cities = getCityID(city)

    address_id = createAddress(address, cities, district, zip_code, phone)
    query = f"insert into customer (store_id, first_name, last_name, email, address_id) values({store},'{fname}','{lname}','{email}',{address_id})"
    customer_id = executeInsert(query)
    return customer_id

        