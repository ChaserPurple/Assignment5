from fastapi import FastAPI
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from pydantic import BaseModel




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
        

@app.get("/getStoreFilms/")
def getStoreFilm(store_id: int = 1):
    query: str = f"select f.film_id, f.title, f.release_year, f.length, f.rating, f.rental_rate from (film as f inner join inventory as i on f.film_id=i.film_id) where i.store_id={store_id} and i.inventory_id not in (select distinct inventory_id from rental as r where r.return_date is null) group by f.film_id;"
    return executeSelect(query)

def getAddress():
    

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

        