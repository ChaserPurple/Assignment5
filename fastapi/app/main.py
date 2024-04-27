from fastapi import FastAPI
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from pydantic import BaseModel
from typing import Dict, Any
from app.CustomerData import CustomerData
from fastapi import Request
from typing import Dict, Any
from fastapi.middleware.cors import CORSMiddleware

DATABASE_URL = "mysql+mysqlconnector://root:supersecretpassw0rd@localhost/sakila"


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def executeSelect(query: str):
    engine = create_engine(DATABASE_URL)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    session = SessionLocal()
    try:
        result = session.execute(text(query))
        return [dict(r._mapping) for r in result]
    finally:
        session.close()

def executeInsert(query: str):
    engine = create_engine(DATABASE_URL)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    session = SessionLocal()
    try:
        result = session.execute(text(query))
        return result
    finally:
        session.close()

@app.get("/")
async def root():
    return {"message": "Howdy"}

@app.get("/getCountry")
def getCountry():
    return executeSelect("SELECT * from country")

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
    query: str = f"select f.film_id, f.title, f.release_year, f.length, f.rating, f.rental_rate from (film as f inner join inventory as i on f.film_id=i.film_id) where i.store_id={store_id} and i.inventory_id not in (select distinct inventory_id from rental as r where r.return_date is null) group by f.film_id;"
    return executeSelect(query)
    

@app.post("/createCustomer")
def createCustomer():
    {
        "first_name": "",
        "last_name": "",

    }
    pass



@app.get("/getFilms")
def getFilms():
    query: str = """
        SELECT film.film_id, film.title, film.release_year, film.length, film.rating, film.rental_rate
        from film
    """
    return executeSelect(query)

def getCityID(city: str):
    query: str = f"select city_id from city where city='{city}'"
    return executeSelect(query)

def createAddress(address: str, city: str, state: str, zip_code: str):
    city_id = getCityID(city)
    if len(city_id) == 1:
        query: str = f"insert into address (address, district, city_id, postal_code, phone, )"

    

@app.post("/addCustomer")
async def addCustomer(payload: Request):
    jsn = await payload.json()
    print(jsn)
        