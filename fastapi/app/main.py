from fastapi import FastAPI
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from pydantic import BaseModel
from typing import Dict, Any

from app.CustomerData import CustomerData

DATABASE_URL = "mysql+mysqlconnector://root:supersecretpassw0rd@localhost/sakila"


app = FastAPI()

def executeSelect(query: str):
    engine = create_engine(DATABASE_URL)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    session = SessionLocal()
    try:
        result = session.execute(text(query))
        return [dict(r._mapping) for r in result]
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
        
@app.get("/getFilms")
def getFilms():
    query: str = """
        SELECT film.film_id, film.title, film.release_year, film.length, film.rating, film.rental_rate
        from film
    """
    return executeSelect(query)

@app.post("/addCustomer")
def addCustomer(data: Dict[Any, Any]):
    print(data)
        