from pydantic import BaseModel

class CustomerData(BaseModel):
    lname: str
    fname: str
    address: str
    city: str
    state: str
    zip_code: str
    email: str
