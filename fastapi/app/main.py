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

DATABASE_URL = "mysql+mysqlconnector://root:supersecretpassw0rd@localhost/sakila"

engine = create_engine(DATABASE_URL)

Session = sessionmaker(engine)

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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


# def executeSelect(query: str):
#     with engine.connect() as conn:
#         rows = conn.execute(text(query))
#         conn.commit()
#         return [for r in rows]

def executeInsert(query: str):
    with engine.connect() as conn:
        rows = conn.execute(text(query))
        conn.commit()
        row = rows.lastrowid
        return row

@app.get("/")
async def root():
    return {"message": "Howdy"}


@app.get("/getCanadianCustomers")
def getCanadianCustomers():
    query: str = """
        SELECT customer.first_name, customer.last_name, customer.email, city.city
        FROM customer
        JOIN address ON customer.address_id = address.address_id
        JOIN city ON address.city_id = city.city_id
        JOIN country ON city.country_id = country.country_id
        WHERE country.country = 'Canada'
        ORDER BY city.city
    """
    return executeSelect(query)
        

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
    return getSingleCustomer(fname, lname, phone)


@app.get("/getFilms")
def getFilms():
    result = executeSelect('film', ['film_id', 'title', 'release_year', 'rating', 'rental_rate'])
    query: str = """
        SELECT film.film_id, film.title, film.release_year, film.length, film.rating, film.rental_rate
        from film
    """
    # result = executeSelect(query)
    print(result)
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
    district = data['district']
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

        