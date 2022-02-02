from dataclasses import dataclass
from datetime import date

from config import pachient, db


@dataclass
class Patient:
    id: int
    type: int
    unrz: int
    date: date
    snils: str
    polis: str
    fio: str
    epid: str
    epid_type: str
    birthday: date
    passport: str
    adress: str
    comment: str
    start_observation: date
    end_observation: date
    telefon: str
    doctor: str
    work: str
    start_ill: date
    start_petition: date
    identificator: int

    async def find(identificator: int, snils):
        query = pachient.select(pachient.c.identificator == identificator and pachient.c.snils == snils)
        res = await db.fetch_one(query)
        if res is None:
            return 0
        return res

    async def create(self, pch) -> bool:
        found = await self.find(pch.identificator, pch.snils)
        if not found == 0:
            return False
        query = pachient.insert().values(**pch)
        await db.execute(query)
        return True

    async def update(self, patient) -> bool:
        found = await self.find(patient.identificator, patient.snils)
        if not found:
            return False
        # update
        return True

    async def delete(self, patient) -> bool:
        found = await self.find(patient.identificator, patient.snils)
        if not found:
            return False
        # delete
        return True
