from fastapi import FastAPI
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "mysql+mysqlconnector://root:supersecretpassw0rd@localhost/sakila"


app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Howdy"}


@app.get("/getCanadianCustomers")
def getCanadianCustomers():
    engine = create_engine(DATABASE_URL)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    session = SessionLocal()
    try:
        result = session.execute(text("""
            SELECT customer.first_name, customer.last_name, customer.email, city.city
            FROM customer
            JOIN address ON customer.address_id = address.address_id
            JOIN city ON address.city_id = city.city_id
            JOIN country ON city.country_id = country.country_id
            WHERE country.country = 'Canada'
            ORDER BY city.city
        """))
        customers = list(map(lambda row: {
            "first_name": row[0], 
            "last_name": row[1], 
            "email": row[2], 
            "city": row[3]
        }, result))
        # customers = [{"first_name": row[0], "last_name": row[1], "email": row[2], "city": row[3]} for row in result]
        return customers
    finally:
        session.close()
        
@app.get("/getFilms")
def getFilms():
    engine = create_engine(DATABASE_URL)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    session = SessionLocal()
    try:
        result = session.execute(text("""
            SELECT film.film_id, film.title, film.release_year, film.length, film.rating, film.rental_rate
            from film
        """))
        films = list(map(lambda row: {
            'film_id': row[0],
            'title': row[1],
            'release_year': row[2],
            'length': row[3],
            'rating': row[4],
            'rental_rate': row[5]
        }, result))
        return films
    finally:
        session.close()
        