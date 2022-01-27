from dataclasses import dataclass
import datetime
from config import  pachient, db

@dataclass
class pch:
    id : int
    type : int
    unrz : int
    date : datetime.date
    snils : str
    polis : str
    fio   : str
    epid : str
    epid_type : str
    birthday : datetime.date
    passport : str
    adress : str
    comment : str
    start_observation : datetime.date
    end_observation : datetime.date
    telefon : str
    doctor : str
    work : str
    start_ill : datetime.date
    start_petition : datetime.date
    identificator : int

    async def find_pachient(identificator:int, snils):
        query = pachient.select().where(pachient.c.identificator==identificator and pachient.c.snils==snils)
        pch = await db.fetch_one(query)
        if pch is None:
            return 0
        else:
            return pch 
    
    async def save_pachient(pch) -> bool:
        cheak = await find_pachient(pch.identificator, pch.snils)
        if not cheak == 0:
            return 0
        else:
            query = pachient.insert().values(**pch)
            await db.execute(query)
            return 1
 
