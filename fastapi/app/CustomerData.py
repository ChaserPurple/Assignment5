from pydantic import BaseModel

class CustomerData(BaseModel):
    lname: str
    fname: str
    address: str
    city: str
    state: str
    zip: int
    email: str
